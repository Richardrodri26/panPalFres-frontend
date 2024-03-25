import { RenderIfWithAnimate } from "@/components";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import useAnimatePresence from "@/hooks/useAnimatePresence";
import { cn } from "@/lib/utils";
import { useGeneral } from "@/stores";


/*---- config ----*/

const enterAnimation = { y: ['0%', '1000%', '-50%'], x: ['-50%', '-50%'], opacity: [0, 0, 1], scale: [0, 0.5, 1], transition: { duration: 0.2 } };
const exitAnimation = { y: ['-50%', '1000%', '0%'], x: ['-50%', '-50%'], opacity: [1, 0, 0], scale: [1, 0.5, 0], transition: { duration: 0.2 } };

/*---- components ----*/

export const Modal = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  // hooks
  const modalStatus = useGeneral(s => s.modalStatus);

  return (
    <RenderIfWithAnimate condition={Boolean(modalStatus)}>
      <ModalContent className={className}>{children}</ModalContent>
    </RenderIfWithAnimate>
  );
};

interface IModalContentProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalContent = ({ children, className }: IModalContentProps) => {
  // hooks
  const modalStatus = useGeneral(s => s.modalStatus);
  const { scope } = useAnimatePresence({ enterAnimation, exitAnimation, enterOptions: { ease: 'linear' }, exitOptions: { ease: 'linear' } });

  return (
    <Dialog open={Boolean(modalStatus)}>
      <DialogContent ref={scope} className={cn(className, 'max-w-7xl')}>
        {children}
      </DialogContent>
    </Dialog>
  );
};
