export default function Attempt() {
  return (
    <>
      {/* <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4"> */}
      {/* Circular card */}
      <div className="relative flex size-40 max-w-[90vw] overflow-hidden flex-col items-center justify-between rounded-full bg-white p-4 shadow-md md:w-48 lg:w-60 xl:w-72 2xl:w-80">
        {/* Name, birthdate, job */}
        <div className="flex flex-col items-center text-center">
          <h2 className="mb-1 wrap-break-word w-30 text-sm font-semibold text-gray-800 md:text-base lg:text-lg xl:text-xl">
            John Doe Asdfghrt
          </h2>
          <p className="mb-1 text-xs text-gray-600 md:text-sm lg:text-base">
            Born: January 1, 1990
          </p>
          <p className="text-xs text-gray-700 md:text-sm lg:text-base">
            Software Engineer
          </p>
        </div>

        {/* Image at bottom, cropped by circle */}
        <div className="absolute bottom-5 left-1/2 flex h-20 w-20 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full bg-gray-200 md:h-20 md:w-20 lg:h-24 lg:w-24 xl:h-28 xl:w-28 2xl:h-32 2xl:w-32">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
