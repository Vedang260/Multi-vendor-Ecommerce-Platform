import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles

function SignupPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");

  const handleSendOtp = () => {
    if (phone) {
      setOtpSent(true);
      alert("OTP Sent to " + phone);
    } else {
      alert("Please enter a valid phone number.");
    }
  };

  const handleVerifyOtp = () => {
    if (otp === "1234") {
      alert("OTP Verified! Proceeding with Signup.");
    } else {
      alert("Invalid OTP. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-300">
          Or{" "}
          <a href="#" className="font-medium text-yellow-500 hover:text-yellow-400 transition">
            sign in to your account
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your email address"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                placeholder="Enter your password"
              />
            </div>

            {/* Phone Number with Country Code */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
                Phone Number
              </label>
              <PhoneInput
                country={"in"} // Default country (change if needed)
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="!bg-gray-700 !text-white !border-gray-600 !rounded-md !w-full" // Tailwind styling
                buttonClass="!bg-gray-700 !border-gray-600" // Dropdown button styling
              />
            </div>

            {/* OTP Section */}
            {otpSent && (
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-300">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="Enter OTP"
                />
              </div>
            )}

            {/* OTP Button */}
            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
              >
                Send OTP
              </button>
            ) : (
              <button
                type="button"
                onClick={handleVerifyOtp}
                className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              >
                Verify OTP
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
