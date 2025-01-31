import React, { useState } from "react";

import googleIcon from "../../assets/google.svg";

// External libraries import
import { ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

interface Props {
  onComplete: () => void;
}

export const UserRegistration: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState<"details" | "verification">("details");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    verificationCode: "",
  });

  // Function to handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // TODO: Implement user registration logic

      if (step === "details") {
        setStep("verification");
        toast.success("Verification code sent to your email");
      } else {
        toast.success("Account created successfully");
        onComplete();
      }

    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again");
    }
  };


  // Function to sign up with Google
  const signUpWithGoogle = async () => {
    try {
      // TODO: Implement Google sign-up logic
      throw new Error("Google sign-up not implemented");
    } catch (error) {
      console.error(error);
      toast.error("Google sign-up is not available at the moment");
    }
  };

  if (step === "verification") {
    return (
      <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
        <div className="max-w-md mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
            Verify your email
          </h2>
          <p className="text-gray-600 mb-6">
            We've sent a verification code to {formData.email}. Please enter it
            below to continue.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Verification Code
              </label>
              <input
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
                type="text"
                required
                value={formData.verificationCode}
                onChange={(e) =>
                  setFormData({ ...formData, verificationCode: e.target.value })
                }
                placeholder="Enter verification code"
              />
            </div>

            <div className="flex flex-col gap-4">
              {/* <Button type="submit" className="w-full" isLoading={loading}>
                Verify Email
                <ArrowRight className="w-4 h-4" />
              </Button> */}

              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center item gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
              >
                Verify Email
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setStep("details")}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Back to registration
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 md:p-8 rounded-lg shadow-sm">
      <div className="max-w-md mx-auto">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
          Create your account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
              type="text"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none border-gray-300"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>

          <div className="flex flex-col gap-4">
            <button
              type="submit"
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-300"
            >
              Create Account
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <button
              type="button"
              className="w-full px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 border-2 border-gray-200 hover:border-gray-300 disabled:border-gray-100"
              onClick={signUpWithGoogle}
            >
              <img src={googleIcon} alt="Google" className="w-5 h-5" />
              Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
