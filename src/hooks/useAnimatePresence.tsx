import { useAnimate, usePresence, type ValueAnimationTransition } from 'framer-motion';
import useShallowEffect from './useShallowEffect';

/*------ config ------*/

interface useAnimatePresenceProps {
  enterAnimation: any;
  exitAnimation: any;
  enterOptions?: ValueAnimationTransition<any>;
  exitOptions?: ValueAnimationTransition<any>;
}

/*------ hooks ------*/

const useAnimatePresence = ({ enterAnimation, exitAnimation, exitOptions, enterOptions }: useAnimatePresenceProps) => {
  // hooks
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useShallowEffect(() => {
    if (isPresent) {
      const enterAnimationFn = async () => {
        await animate(scope.current, enterAnimation, enterOptions);
      };
      enterAnimationFn();
    } else {
      const exitAnimationFn = async () => {
        await animate(scope.current, exitAnimation, exitOptions);
        safeToRemove();
      };

      exitAnimationFn();
    }
  }, [isPresent]);

  return {
    scope,
  };
};

export default useAnimatePresence;