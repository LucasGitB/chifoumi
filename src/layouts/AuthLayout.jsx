export const AuthLayout = ({ children }) => {
    return (
      <div className="flex flex-col gap-4 justify-center items-center h-dvh w-dvw bg-gray-50">
        <span className='bg-blue-900 px-1 py-2 max-h-16'>
            <img src="/assets/logo-chifoumi.png" alt='' className="h-full"/>
        </span>

        <div className="p-8 rounded-lg w-1/3 shadow-lg bg-white">
          {children}
        </div>
      </div>
    );
  };