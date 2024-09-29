import { LoginForm } from "@/features";

export const LoginPage = () => {
  return (
    <>
      <div className="w-full h-12 bg-white flex px-4">
        <p className="capitalize text-[#605DEC] text-xl font-semibold h-[32px] my-auto flex justify-center items-center">
          PAN PAL FRES
        </p>
      </div>

      <div
        style={{ height: "calc(100vh - 48px)" }}
        className="flex justify-center items-center bg-[#8b8c704d]"
      >
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-[#ebf2280f] rounded-md shadow-md">
          <div className="mt-20">
            <img
              src="\public\logo empresa.png"
              alt="Delicias"
              className="w-full h-auto rounded-md"
            />
          </div>
        </div>
        <div className="max-w-lg min-w-[500px] h-full max-h-[500px] bg-white rounded-md shadow-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
};
