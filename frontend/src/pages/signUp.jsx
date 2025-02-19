import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css"; // Import styles

function SignupPage() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [role, setRole] = useState("customer"); // Default role: customer
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  // Function to send OTP
  const handleSendOtp = async () => {
    if (email) {
      try {
        const response = await fetch("https://dummyapi.com/auth/send-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        if (response.ok) {
          setOtpSent(true);
          alert(data.message || "OTP Sent to " + email);
        } else {
          alert(data.error || "Failed to send OTP");
        }
      } catch (error) {
        alert("Error sending OTP");
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
        alert("OTP Verified! You are signing up as a " + role);
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
    if (!otpSent) {
      alert("Please verify your OTP first");
      return;
    }

    try {
      const response = await fetch("https://dummyapi.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phone, role }),
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
        <p className="mt-2 text-center text-sm text-gray-300">
          Or{" "}
          <a href="/login" className="font-medium text-yellow-500 hover:text-yellow-400 transition">
            sign in to your account
          </a>
        </p>
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

            <div>
              <label className="block text-sm font-medium text-gray-300">Phone Number</label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                inputClass="!bg-gray-700 !text-white !border-gray-600 !rounded-md !w-full"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300">Are you a:</label>
              <div className="mt-2 flex space-x-6">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={role === "customer"}
                    onChange={() => setRole("customer")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-yellow-500 rounded-full flex items-center justify-center peer-checked:border-yellow-400">
                    {role === "customer" && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                  </div>
                  <span className="ml-2 text-gray-300">Customer</span>
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="vendor"
                    checked={role === "vendor"}
                    onChange={() => setRole("vendor")}
                    className="sr-only peer"
                  />
                  <div className="w-5 h-5 border-2 border-yellow-500 rounded-full flex items-center justify-center peer-checked:border-yellow-400">
                    {role === "vendor" && <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>}
                  </div>
                  <span className="ml-2 text-gray-300">Vendor</span>
                </label>
              </div>
            </div>

            {/* OTP Section */}
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

            {/* OTP & Register Buttons */}
            {!otpSent ? (
              <button type="button" onClick={handleSendOtp} className="w-full py-2 px-4 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600">
                Send OTP
              </button>
            ) : (
              <button type="button" onClick={handleVerifyOtp} className="w-full py-2 px-4 bg-green-500 text-black font-medium rounded-md hover:bg-green-600">
                Verify OTP
              </button>
            )}

            {otpSent && (
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
