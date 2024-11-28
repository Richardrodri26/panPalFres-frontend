// Importaciones necesarias de librerías y componentes personalizados
import { AlertTypes, useShallowGeneralStore } from '@/stores'; // Tipos de alertas y el hook para acceder al estado global de alertas
import { AnimatePresence } from 'framer-motion'; // Componente para animaciones cuando los elementos entran o salen del DOM
import { Check, Info, LucideIcon } from 'lucide-react'; // Íconos para los diferentes tipos de alerta
import { RenderIf } from '..'; // Componente personalizado para renderizado condicional
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from '../ui/alert-dialog'; // Componentes del diálogo de alerta
import { cn } from '@/lib/utils'; // Utilidad para manejar clases condicionales
import { Button } from '../ui/button'; // Botón reutilizable

// Tipos de alerta que tienen íconos asociados
const alertTypesWithIcon: AlertTypes[] = ['error', 'info', 'success', 'warning'];

// Mapeo de tipos de alerta a íconos específicos
const AlertIcons: Record<Exclude<AlertTypes, 'custom'>, LucideIcon> = {
  info: Info,
  success: Check,
  error: Info, // Ícono por defecto (puede personalizarse)
  warning: Info, // Ícono por defecto (puede personalizarse)
};

// Componente principal que renderiza las alertas
export const AlertRoot = () => {
  // Uso de un estado global para obtener la alerta actual y la función para actualizarla
  const [currentAlert, setCurrentAlert] = useShallowGeneralStore(state => [
    state.currentAlert,
    state.setCurrentAlert,
  ]);

  // Determina si hay una alerta activa
  const hasAlert = Boolean(currentAlert);

  // Define el tipo actual de alerta, con un valor por defecto de 'info'
  const currentTypeAlert: Exclude<AlertTypes, 'custom'> =
    currentAlert?.type === 'custom' ? 'info' : currentAlert?.type || 'info';

  // Selecciona el ícono correspondiente al tipo de alerta actual
  const IconByCurrentType = AlertIcons[currentTypeAlert];

  return (
    // Proporciona animaciones al montar/desmontar la alerta
    <AnimatePresence>
      <RenderIf condition={hasAlert}>
        <AlertDialog open={hasAlert}>
          {/* Contenido principal del cuadro de diálogo */}
          <AlertDialogContent className="flex flex-col items-center justify-center p-14 z-[99999]">
            <AlertDialogHeader className="flex flex-col items-center">
              {/* Renderiza el ícono si el tipo de alerta incluye uno */}
              <RenderIf condition={alertTypesWithIcon.includes(currentAlert?.type!)}>
                <IconByCurrentType
                  className={cn(
                    'w-[40px] h-[40px]',
                    { 'fill-[#528B43] stroke-white': currentAlert?.type === 'success' },
                    { 'fill-[#1570EF] stroke-white': currentAlert?.type === 'info' },
                    { 'fill-red-500 stroke-white': currentAlert?.type === 'error' },
                    { 'fill-yellow-500 stroke-white': currentAlert?.type === 'warning' },
                  )}
                />
              </RenderIf>

              {/* Renderiza el título de la alerta si está definido */}
              <RenderIf condition={Boolean(currentAlert?.title)}>
                <AlertDialogTitle
                  className={cn(
                    "text-zinc-800 text-3xl text-center font-semibold font-['Montserrat'] leading-9",
                    { 'text-lime-700': currentAlert?.type === 'success' },
                    { 'text-[#1570EF]': currentAlert?.type === 'info' },
                    { 'text-red-500': currentAlert?.type === 'error' },
                    { 'text-yellow-500': currentAlert?.type === 'warning' },
                  )}
                >
                  {currentAlert?.title}
                </AlertDialogTitle>
              </RenderIf>

              {/* Renderiza la descripción de la alerta si está definida */}
              <RenderIf condition={Boolean(currentAlert?.description)}>
                <AlertDialogDescription
                  className="text-zinc-800 text-base font-normal font-['Work Sans'] leading-normal text-center"
                >
                  {currentAlert?.description}
                </AlertDialogDescription>
              </RenderIf>
            </AlertDialogHeader>

            {/* Footer del cuadro de diálogo con botones de acción */}
            <AlertDialogFooter className="flex items-center justify-center gap-2.5">
              {/* Botón de cancelación si está habilitado */}
              <RenderIf condition={Boolean(currentAlert?.showCancelButton)}>
                <AlertDialogCancel
                  asChild
                  onClick={() =>
                    currentAlert?.onCancel
                      ? currentAlert?.onCancel()
                      : setCurrentAlert(undefined)
                  }
                >
                  <Button variant={'secondary'}>
                    {currentAlert?.cancelButtonText || 'Cancelar'}
                  </Button>
                </AlertDialogCancel>
              </RenderIf>

              {/* Botón de confirmación siempre habilitado por defecto */}
              <RenderIf condition={Boolean(currentAlert?.showConfirmButton ?? true)}>
                <AlertDialogAction
                  asChild
                  onClick={() => {
                    currentAlert?.onConfirm();
                  }}
                >
                  <Button className="h-10" type="button">
                    {currentAlert?.confirmButtonText || 'Continuar'}
                  </Button>
                </AlertDialogAction>
              </RenderIf>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </RenderIf>
    </AnimatePresence>
  );
};
