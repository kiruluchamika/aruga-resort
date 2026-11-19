import { m } from 'framer-motion';

/** Fades and lifts its content into view once, as the visitor scrolls. */
export default function Reveal({ as = 'div', delay = 0, y = 30, margin = '-60px', className, children, ...rest }) {
  const Tag = m[as] || m.div;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}
