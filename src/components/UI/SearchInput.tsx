import { motion } from 'framer-motion';

export default function SearchInput({ value, onChange, className }: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}) {
  return (
    <motion.input
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      type="text"
      placeholder="Поиск по заголовкам..."
      value={value}
      onChange={onChange}
      className={`w-full max-w-md p-3 border border-zinc-600 rounded-lg focus:outline-none focus:ring focus:ring-emerald-500 ${className}`}
    />
  );
}