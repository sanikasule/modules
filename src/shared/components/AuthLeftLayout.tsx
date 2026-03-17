export default function AuthLeftPanel() {
  return (
    <div className="hidden lg:flex w-1/2 p-[24px]">
      <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[24px] bg-[#0F62FE] text-white">
        <div className="z-10 text-center">
          <h1 className="text-[32px] font-normal">
            Take Charge <br /> of Your{" "}
            <span className="text-[32px] font-bold">
              Investments with Us
            </span>
          </h1>
          <p className="mt-4 text-sm text-white font-normal">
            "Dummy message"
          </p>
        </div>

        <div className="mt-12">
          <img
            src="../src/assets/Group.svg"
            alt="Illustration"
            className="w-64"
          />
        </div>

        <div className="absolute bottom-10 flex gap-2">
          <div className="h-1.5 w-6 rounded-full bg-gray-400"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
        </div>
      </div>
    </div>
  );
}