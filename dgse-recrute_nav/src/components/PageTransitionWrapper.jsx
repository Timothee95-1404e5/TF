
import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionWrapper({ children }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
