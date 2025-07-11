import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg bg-zinc-900 border-emerald-500 border cursor-pointer text-white ${className}`}
    >
      {children}
    </motion.button>
  );
};