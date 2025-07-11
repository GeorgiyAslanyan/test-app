import { motion } from 'framer-motion';

export default function Loader({ className }: { className?: string }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      className={`w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full ${className}`}
    />
  );
}