from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
import random
import datetime
from django.utils.timezone import now
class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, password=None, role='customer'):
        if not email:
            raise ValueError("Users must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, role=role)
        user.set_password(password)
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = [('customer', 'Customer'), ('vendor', 'Vendor'), ('admin', 'Admin')]

    email = models.EmailField(unique=True)
    name = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='customer')
    otp = models.CharField(max_length=6, blank=True, null=True)
    otp_created_at = models.DateTimeField(blank=True, null=True)
    failed_attempts = models.IntegerField(default=0)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def generate_otp(self):
        self.otp = str(random.randint(100000, 999999))  # Store as string
        self.otp_created_at = now()  # Use Django's timezone-aware function
        self.failed_attempts = 0
        self.save()
