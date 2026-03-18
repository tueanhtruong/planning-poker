import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]';

export const AppCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Step 1: flip mounted after first client render to avoid SSR mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 2: set up cursor tracking only after mount
  useEffect(() => {
    if (!mounted) return;

    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const dot = dotRef.current;
    const aura = auraRef.current;
    if (!dot || !aura) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let auraX = mouseX;
    let auraY = mouseY;
    let frameId = 0;
    let isInteractive = false;

    document.body.classList.add('cursor-enabled');

    const updateInteractiveState = (nextState: boolean) => {
      if (nextState === isInteractive) return;
      isInteractive = nextState;
      dot.classList.toggle('app-cursor-dot-active', isInteractive);
      aura.classList.toggle('app-cursor-aura-active', isInteractive);
    };

    const onMouseMove = (event: MouseEvent) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
      const target = event.target as HTMLElement | null;
      const overInteractive = Boolean(target?.closest(INTERACTIVE_SELECTOR));
      updateInteractiveState(overInteractive);
    };

    const onMouseLeave = () => {
      dot.classList.add('app-cursor-hidden');
      aura.classList.add('app-cursor-hidden');
    };

    const onMouseEnter = () => {
      dot.classList.remove('app-cursor-hidden');
      aura.classList.remove('app-cursor-hidden');
    };

    const animate = () => {
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      auraX += (mouseX - auraX) * 0.12;
      auraY += (mouseY - auraY) * 0.12;

      aura.style.left = `${auraX}px`;
      aura.style.top = `${auraY}px`;
      frameId = window.requestAnimationFrame(animate);
    };

    document.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    frameId = window.requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove('cursor-enabled');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      window.cancelAnimationFrame(frameId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return createPortal(
    <>
      <div
        className="app-cursor-dot app-cursor-hidden"
        ref={dotRef}
        aria-hidden="true"
      />
      <div
        className="app-cursor-aura app-cursor-hidden"
        ref={auraRef}
        aria-hidden="true"
      />
    </>,
    document.body,
  );
};
