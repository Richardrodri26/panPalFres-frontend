import Cookies from 'js-cookie'
import axios, { AxiosInstance } from "axios";
import { toast } from 'sonner';

// axios config -----------------------------------
export const axiosRest = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND,
    headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*'
    }
})


// Define la configuración base
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND, // URL base de la API
  timeout: 10000, // Tiempo de espera máximo para las peticiones
  headers: {
    "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Headers': '*'
}
});

// Interceptor de solicitud
axiosInstance.interceptors.request.use(
  (config) => {
    // Puedes añadir tokens u otra lógica antes de enviar la solicitud
    let userCookie = Cookies.get(import.meta.env.VITE_APP_KEY_COOKIE_SESSION)
    if (userCookie) {
      config.headers.Authorization = `Bearer ${userCookie}`;
    }

    config.baseURL = import.meta.env.VITE_APP_BACKEND

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor de respuesta
axiosInstance.interceptors.response.use(
  (response) => {
    // Puedes manejar la respuesta aquí
    return response;
  },
  (error) => {
    // Manejo de errores
    if (error.response?.status === 401) {
      // Redireccionar al login si la respuesta es 401 (No autorizado)

      // console.error(error.response.)

      if(error?.response?.data?.message) {
        const errMessage = error?.response?.data?.message
        console.error(errMessage)

        toast.error(errMessage)

      } else {
        toast.error('Oops, hubo un error')
      }


      // window.location.href = '/';
    }
    return Promise.reject(error);
  }
);


