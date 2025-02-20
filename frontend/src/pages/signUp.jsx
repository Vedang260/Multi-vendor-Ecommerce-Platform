import React, { useState } from "react";

function SignupPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otpVerified, setOtpVerified] = useState(false);

  // Function to generate OTP
  const handleGenerateOtp = async () => {
    if (email) {
      try {
        const response = await fetch("https://dummyapi.com/auth/generate-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          alert(data.message || "OTP Sent to " + email);
        } else {
          alert(data.error || "Failed to generate OTP");
        }
      } catch (error) {
        alert("Error generating OTP");
      }
    } else {
      alert("Please enter a valid email.");
    }
  };

  // Function to verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      alert("Please enter the OTP");
      return;
    }

    try {
      const response = await fetch("https://dummyapi.com/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      if (response.ok) {
        setOtpVerified(true);
        alert("OTP Verified!");
      } else {
        alert(data.error || "Invalid OTP. Try again.");
      }
    } catch (error) {
      alert("Error verifying OTP");
    }
  };

  // Function to register user
  const handleRegister = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      alert("Please verify your OTP first");
      return;
    }

    try {
      const response = await fetch("https://dummyapi.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("User registered successfully!");
      } else {
        alert(data.error || "Failed to register");
      }
    } catch (error) {
      alert("Error registering user");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a192f] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
          Create an account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label className="block text-sm font-medium text-gray-300">Full Name</label>
              <input
                type="text"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <input
                type="email"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* OTP Section */}
            <button type="button" onClick={handleGenerateOtp} className="w-full py-2 px-4 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600">
              Generate OTP
            </button>

            {otpSent && (
              <div>
                <label className="block text-sm font-medium text-gray-300">Enter OTP</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  placeholder="Enter OTP"
                />
              </div>
            )}

            {otpSent && (
              <button type="button" onClick={handleVerifyOtp} className="w-full py-2 px-4 bg-green-500 text-black font-medium rounded-md hover:bg-green-600">
                Verify OTP
              </button>
            )}

            {otpVerified && (
              <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
                Register
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
