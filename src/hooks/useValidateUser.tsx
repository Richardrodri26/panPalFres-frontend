import { axiosInstance } from "@/domain/api.config"
import { panPalFresEndpoints } from "@/domain/endpoints"
import { ValidateUserResponse } from "@/interfaces"
import { useGeneral } from "@/stores"
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useQuery } from "react-query"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

export const useValidateUser = () => {
  const setLoginUser = useGeneral(state => state.setLoginUser)
  const navigate = useNavigate()
  const userToken = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
  const { data, isError, isLoading } = useQuery({
    queryKey: ['validateUser', userToken],
    cacheTime: 0,
    staleTime: 0,
    queryFn: async () => {
      const { data } = await axiosInstance.get<ValidateUserResponse>(panPalFresEndpoints.VERIFY_USER + `?${userToken}`);

      return data
    },
    onSuccess(data) {
      if(data) {

        setLoginUser(data)
      }
    },
    onError: () => {
      navigate('/')
      toast.error("Oops, hubo un error para autenticar al usuario")
    },
    retry: 0
    // enabled: Boolean(userToken),

  });

  useEffect(() => {
    if(isError) {
      navigate('/')
      toast.error("Oops, hubo un error para autenticar al usuario")
    }
  }, [isError])


  return {
    data,
    isLoading: !data && isLoading
  }


}
