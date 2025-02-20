import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);

  // Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/forgot-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      if (!response.ok) throw new Error("Failed to send OTP");
      alert("OTP sent successfully!");
      setStep(2);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  // Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/auth/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, new_password: newPassword })
      });

      if (!response.ok) throw new Error("Failed to reset password");
      alert("Password reset successful!");
      navigate("/login");
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Forgot Password
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {step === 1 ? (
            <form className="space-y-6" onSubmit={handleSendOTP}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter your email"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-600"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleResetPassword}>
              <div>
                <label className="block text-sm font-medium text-gray-300">Enter OTP</label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter OTP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">New Password</label>
                <input
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter new password"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md bg-yellow-500 hover:bg-yellow-600"
              >
                Reset Password
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
