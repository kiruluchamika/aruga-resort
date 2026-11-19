import { useEffect, useRef } from 'react';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog behaviour: locks page scroll, closes on Escape, keeps
 * keyboard focus inside the dialog and restores focus when it closes.
 * Returns a ref to attach to the dialog container.
 */
export function useDialog(open, onClose, { onKeyDown } = {}) {
  const ref = useRef(null);
  const onCloseRef = useRef(onClose);
  const onKeyRef = useRef(onKeyDown);
  onCloseRef.current = onClose;
  onKeyRef.current = onKeyDown;

  useEffect(() => {
    if (!open) return undefined;
    const previouslyFocused = document.activeElement;
    const { overflow, paddingRight } = document.body.style;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;

    const focusFirst = () => {
      const node = ref.current;
      if (!node) return;
      const target = node.querySelector('[data-autofocus]') || node.querySelector(FOCUSABLE) || node;
      target.focus({ preventScroll: true });
    };
    const raf = requestAnimationFrame(focusFirst);

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      onKeyRef.current?.(event);
      if (event.key !== 'Tab' || !ref.current) return;
      const items = [...ref.current.querySelectorAll(FOCUSABLE)].filter(
        (el) => el.offsetParent !== null || el === document.activeElement,
      );
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKey);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus({ preventScroll: true });
    };
  }, [open]);

  return ref;
}
