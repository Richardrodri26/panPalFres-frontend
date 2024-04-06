import { AlertTypes, useShallowGeneralStore } from '@/stores';
import { AnimatePresence } from 'framer-motion';
import { Check, Info, LucideIcon } from 'lucide-react';
import { RenderIf } from '..';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../ui/alert-dialog';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

const alertTypesWithIcon: AlertTypes[] = ['error', 'info', 'success', 'warning'];

const AlertIcons: Record<Exclude<AlertTypes, 'custom'>, LucideIcon> = {
    info: Info,
    success: Check,
    error: Info,
    warning: Info,

}


export const AlertRoot = () => {
  const [currentAlert, setCurrentAlert] = useShallowGeneralStore(state => [state.currentAlert, state.setCurrentAlert]);

  const hasAlert = Boolean(currentAlert);

  const currentTypeAlert: Exclude<AlertTypes, 'custom'> = currentAlert?.type === 'custom' ? 'info' : (currentAlert?.type || 'info')

    const IconByCurrentType = AlertIcons[currentTypeAlert]

//   const onCancel

// console.log('alertTypesWithIcon.includes(currentAlert?.type ||)', alertTypesWithIcon.includes(currentAlert?.type || 'info'))

// console.log('currentAlert?.type', currentAlert?.type)
  return (
    <AnimatePresence>
      <RenderIf condition={hasAlert}>
        <AlertDialog open={hasAlert}>
          <AlertDialogContent className='flex flex-col items-center justify-center p-14 z-[99999]'>
            <AlertDialogHeader className='flex flex-col items-center'>

                <RenderIf condition={alertTypesWithIcon.includes(currentAlert?.type!)}>
                    <IconByCurrentType className={cn(
                        'w-[40px] h-[40px]',
                        { 'fill-[#528B43] stroke-white': (currentAlert?.type === 'success')  },
                        { 'fill-[#1570EF] stroke-white': (currentAlert?.type === 'info') },
                        { 'fill-red-500 stroke-white': (currentAlert?.type === 'error') },
                        { 'fill-yellow-500 stroke-white': (currentAlert?.type === 'warning') },
                    )} />
                </RenderIf>

              <RenderIf condition={Boolean(currentAlert?.title)}>
                <AlertDialogTitle className={cn(
                    "text-zinc-800 text-3xl text-center font-semibold font-['Montserrat'] leading-9", 
                    { 'text-lime-700': (currentAlert?.type === 'success') },
                    { 'text-[#1570EF]': (currentAlert?.type === 'info') },
                    { 'text-red-500': (currentAlert?.type === 'error') },
                    { 'text-yellow-500': (currentAlert?.type === 'warning') },
                )}>{currentAlert?.title}</AlertDialogTitle>
              </RenderIf>

              <RenderIf condition={Boolean(currentAlert?.description)}>
                <AlertDialogDescription className={cn(
                    "text-zinc-800 text-base font-normal font-['Work Sans'] leading-normal text-center"
                )}>{currentAlert?.description}</AlertDialogDescription>
              </RenderIf>
            </AlertDialogHeader>
            <AlertDialogFooter className='flex items-center justify-center gap-2.5'>
              <RenderIf condition={Boolean(currentAlert?.showCancelButton)}>
                <AlertDialogCancel asChild onClick={() => { currentAlert?.onCancel ?  currentAlert?.onCancel() : setCurrentAlert(undefined) }}>
                {/* <Button>{currentAlert?.cancelButtonText || 'Cancelar'}</Button> */}
                <Button variant={'secondary'}>{currentAlert?.cancelButtonText || 'Cancelar'}</Button>
                </AlertDialogCancel>
              </RenderIf>

              <RenderIf condition={Boolean(currentAlert?.showConfirmButton ?? true)}>
                <AlertDialogAction asChild onClick={() => { currentAlert?.onConfirm() }}>
                    <Button className='h-10' type='button'>{currentAlert?.confirmButtonText || 'Continuar'}</Button>
                </AlertDialogAction>
              </RenderIf>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </RenderIf>
    </AnimatePresence>
  );
};
