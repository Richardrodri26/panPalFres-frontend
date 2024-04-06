import { AnimatePresenceProps, AnimatePresence } from 'framer-motion';
import { Fragment } from 'react';

interface IRenderIfProps {
  condition: boolean;
  children: React.ReactNode;
}

export const RenderIf = ({ children, condition }: IRenderIfProps) => {
  return <Fragment>{condition ? children : null}</Fragment>;
};


export const RenderIfWithAnimate = ({ children, condition, ...animateProps }: IRenderIfProps & AnimatePresenceProps) => {
  return <AnimatePresence {...animateProps}>{condition ? children : null}</AnimatePresence>;
};


