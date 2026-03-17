// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import type { ValidateOtpData } from '../schemas/auth.schema';
// import { validateOTPSchema } from '../schemas/auth.schema';
// import { validateOTP } from '../api/auth.api';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { useState } from 'react';

// export default function ValidateOTP() {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const [formError, setFormError] = useState("");

//     const username = location.state?.username;

//     const {
//         register,
//         handleSubmit,
//         formState: { isSubmitting }
//     } = useForm<ValidateOtpData>({
//         resolver: zodResolver(validateOTPSchema),
//         defaultValues: {
//             username: username,
//             otp: "" as any
//         }
//     });

//    const onSubmit = async (data: ValidateOtpData) => {
//        setFormError("");
   
//        try {
//          const result = await validateOTP(data); //get data from api
//          navigate("/dashboard");
//        } catch (err: any) {
//          // API error
//          setFormError("Invalid OTP");
//        }
//      };
   
//      const onInvalid = () => {
//        setFormError("Invalid OTP");
//      };

//     return (
//     <form
//       onSubmit={handleSubmit(onSubmit, onInvalid)}
//       className="max-w-sm mx-auto mt-20 space-y-4"
//     >
//       <h2 className="text-xl font-semibold">Validate OTP</h2>

//       <input type="hidden" {...register("username")} />

//         {/* 2. Show the user who they are logged in as (Good UX) */}
//         {username && (
//             <p className="text-sm text-gray-500">Sent to: {username}</p>
//         )}

//       <input
//         {...register("otp")}
//         placeholder="OTP"
//         className="border p-2 w-full"
//       />

//       {formError && (
//         <p className="text-red-600 text-sm text-center">
//           {formError}
//         </p>
//       )}

//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="bg-blue-600 text-white p-2 w-full"
//       >
//         {isSubmitting ? "validating OTP..." : "Validate OTP"}
//       </button>
//     </form>
//   );
// }


import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ValidateOtpData } from '../schemas/auth.schema';
import { validateOTPSchema } from '../schemas/auth.schema';
import { validateOTP } from '../api/auth.api';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { TriangleAlert } from 'lucide-react';

export default function ValidateOTP() {
  const navigate = useNavigate();
  const location = useLocation();
  const [formError, setFormError] = useState("");
  const username = location.state?.username;

  // Create refs for the 6 OTP input boxes
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid }
  } = useForm<ValidateOtpData>({
    resolver: zodResolver(validateOTPSchema),
    mode: "onChange",
    defaultValues: {
      username: username,
      otp: "" as any
    }
  });

  const onSubmit = async (data: ValidateOtpData) => {
    setFormError("");
    try {
      const response = await validateOTP(data);
      localStorage.setItem("accessToken", response.jwtTokens.accessToken)
      navigate("/dashboard");
    } catch (err: any) {
      setFormError("Invalid OTP");
    }
  };

  // Helper to handle auto-focus and combining values into the hidden OTP field
  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (isNaN(Number(val))) return; // Only allow numbers

    if (val.length === 1 && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Combine all square values and update the main form state
    const currentOtp = inputRefs.current.map(input => input?.value || "").join("");
    setValue("otp", Number(currentOtp), { shouldValidate: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex h-screen w-full bg-white font-sans">
      {/* LEFT SIDE: Branding Card (Reused from LoginPage) */}
      <div className="hidden lg:flex w-1/2 p-[24px]">
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#0F62FE] text-white">
          <div className="z-10 text-center">
            <h1 className="text-[32px] font-normal">
              Take Charge <br /> of Your <span className="text-[32px] font-bold">Investments with Us</span>
            </h1>
            <p className="mt-4 text-sm text-white font-normal opacity-80">"Dummy message"</p>
          </div>
          <div className="mt-12">
            <img src="../src/assets/Group.svg" alt="Illustration" className="w-64" />
          </div>
          <div className="absolute bottom-10 flex gap-2">
            <div className="h-1.5 w-6 rounded-full bg-gray-400"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
            <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: OTP Form */}
      <div className="flex w-full flex-col items-center justify-center p-[24px] lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-6 flex flex-col items-start">
            <img src="../src/assets/Vector.svg" alt="Logo" className="mb-2 w-10" />
            <h2 className="text-xl font-semibold text[#2A2A2B]">
              Welcome to Nest app
            </h2>
            <h2 className="text-[16px] font-semibold text-[#2A2A2B] mt-12">Enter OTP</h2>
            {username && (
              <p className="mt-2 text-sm text-gray-500">
                Please enter the 4-digit code sent to <span className="font-semibold text-gray-700">{username}</span>
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 6 Square OTP Inputs */}
            <div className="flex justify-between">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  className={`w-15 h-15 text-center text-xl font-bold border rounded-lg outline-none transition-all ${formError ? "border-red-500 focus:ring-2 focus:ring-red-500/20 focus:border-red-500" : "border-gray-300 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 "} `}
                  onChange={(e) => {handleOtpChange(e, index); setFormError("")}}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
            {errors.otp?.message && 
              <p className="text-red-500 text-sm text-center">{errors.otp.message}</p>
            }

            {formError && 
              <div className="h-1/4 p-2">
                  <div className="flex bg-red-100 border-solid border-red-500 rounded-l p-2 space-x-2 place-content-center">
                    <TriangleAlert color="oklch(63.7% 0.237 25.331)" className="w-5 h-5" />
                    <span className="text-sm text-red-500">{formError}</span>
                  </div>
                </div>
            }

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full rounded-lg p-4 font-semibold text-[16px] transition-all duration-300 ${
                  isValid
                    ? "bg-[#0F62FE] text-white shadow-lg cursor-pointer hover:bg-blue-700"
                    : "bg-[#EAECEF] text-[#9EA3AE] cursor-not-allowed"
                }`}
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>

              <div className="text-center">
                <button type="button" className="text-sm font-semibold text-[#0F62FE] hover:underline">
                  Resend OTP
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}