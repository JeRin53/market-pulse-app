'use client';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type AnimatedSectionProps = HTMLMotionProps<'section'>;

export function AnimatedSection({ children, ...props }: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full py-20 md:py-24"
      {...props}
    >
      {children}
    </motion.section>
  );
}
