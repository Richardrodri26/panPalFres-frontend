import { BasicFormProvider, InputForm } from "@/composables";
import { registerSchema, registerSchemaType } from "..";
import { FormButton } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useGeneral } from "@/stores";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { axiosInstance } from "@/domain/api.config";
import { ValidateUserResponse } from "@/interfaces";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const setLoginUser = useGeneral((state) => state.setLoginUser);

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (dataForm: registerSchemaType) => {
      const { data } = await axiosInstance.post<ValidateUserResponse>('/auth/register', dataForm);

      if (data) {
        setLoginUser(data);
        Cookies.set(import.meta.env.VITE_APP_KEY_COOKIE_SESSION, data?.token);
        navigate("/dashboard");
      }
    }
  })


  // Función para manejar el submit del formulario
  const onSubmit = (data: registerSchemaType) => {
    mutateAsync(data); // Llamar a la función de registro
  };


  return (
    <BasicFormProvider submit={onSubmit} schema={registerSchema}>
      <p className="text-[#605DEC] text-xl font-semibold">
        Registro de usuario
      </p>


      <InputForm name="fullName" label="Nombre Completo" />
      <InputForm name="email" label="Correo electrónico" />
      <InputForm name="password" label="Contraseña" />

      <FormButton className="mt-5" disabled={isLoading}>
        {isLoading ? "Registrando..." : "Continuar"}
      </FormButton>

    </BasicFormProvider>
  );
};
