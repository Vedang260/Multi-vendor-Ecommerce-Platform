import random
import logging
from django.utils.timezone import now
from django.core.mail import send_mail
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
# import psycopg2
print("psycopg2 is installed!")

from .serializers import (
    RegisterSerializer, OTPVerifySerializer, LoginSerializer, 
    ForgotPasswordSerializer, ResetPasswordSerializer, UserProfileSerializer
)

logger = logging.getLogger(__name__)

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def perform_create(self, serializer):
        user = serializer.save()
        user.generate_otp()
        send_mail(
            'Your OTP Code',
            f'Your OTP code is {user.otp}',
            'noreply@example.com',
            [user.email],
            fail_silently=False,
        )
        return Response({"message": "User registered successfully. OTP sent to your email."}, status=status.HTTP_201_CREATED)


class OTPVerifyView(APIView):
    def post(self, request):
        serializer = OTPVerifySerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = serializer.validated_data['otp']

            user = CustomUser.objects.filter(email=email).first()
            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            if user.failed_attempts >= 3:
                return Response({"error": "Too many failed attempts. Try again later."}, status=status.HTTP_403_FORBIDDEN)

            if user.otp == otp and (now() - user.otp_created_at).seconds < 300:  # OTP valid for 5 mins
                refresh = RefreshToken.for_user(user)
                user.otp = None
                user.failed_attempts = 0
                user.save()
                return Response({"message": "OTP verified successfully. You can now log in."}, status=status.HTTP_200_OK)

            user.failed_attempts += 1
            user.save()
            return Response({"error": "Invalid OTP"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user = CustomUser.objects.filter(email=email).first()

            if user and user.check_password(password):
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh)
                }, status=status.HTTP_200_OK)

            return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ForgotPasswordView(APIView):
    def post(self, request):
        serializer = ForgotPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = CustomUser.objects.filter(email=email).first()

            if not user:
                return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

            otp = str(random.randint(100000, 999999))
            user.otp = otp
            user.otp_created_at = now()
            user.save()

            send_mail(
                "Password Reset OTP",
                f"Your OTP for password reset is {otp}",
                "noreply@example.com",
                [user.email],
                fail_silently=False,
            )

            return Response({"message": "OTP sent to your email."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetPasswordView(APIView):
    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            print('email: ', email)
            otp = serializer.validated_data['otp']
            print('otp: ', otp)
            new_password = serializer.validated_data['new_password']

            user = CustomUser.objects.get(email=email)
            print('user: ', user)
            print("user otp", user.otp)

            if not user or user.otp != otp or (now() - user.otp_created_at).seconds > 300:
                return Response({"error": "Invalid OTP or OTP expired"}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)
            user.otp = None
            user.failed_attempts = 0
            user.save()

            return Response({"message": "Password has been reset successfully."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"message": "User logged out successfully."}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": "Invalid refresh token"}, status=status.HTTP_400_BAD_REQUEST)
