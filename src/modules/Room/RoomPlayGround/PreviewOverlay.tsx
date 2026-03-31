import { useColorModeValue } from '@/components/ui/color-mode';
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';

type PreviewOverlayProps = {
  preview: boolean;
};

export const PreviewOverlay: FC<PreviewOverlayProps> = ({ preview }) => {
  const glowBase = useColorModeValue(
    'inset 0 0 80px 20px rgba(79, 70, 229, 0.2), inset 0 0 20px 4px rgba(109, 40, 217, 0.18)',
    'inset 0 0 80px 20px rgba(99, 102, 241, 0.12), inset 0 0 20px 4px rgba(139, 92, 246, 0.1)',
  );
  const glowPeak = useColorModeValue(
    'inset 0 0 100px 30px rgba(79, 70, 229, 0.3), inset 0 0 30px 8px rgba(109, 40, 217, 0.25)',
    'inset 0 0 100px 30px rgba(99, 102, 241, 0.18), inset 0 0 30px 8px rgba(139, 92, 246, 0.15)',
  );
  const cornerColor = useColorModeValue(
    'rgba(79, 70, 229, 0.55)',
    'rgba(99, 102, 241, 0.35)',
  );
  const scanlineGradient = useColorModeValue(
    'linear-gradient(90deg, transparent, rgba(79, 70, 229, 0.7), rgba(109, 40, 217, 0.7), transparent)',
    'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5), transparent)',
  );

  return (
    <AnimatePresence>
      {preview && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 9999,
          }}
        >
          {/* Animated glow border */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 0,
              boxShadow: glowBase,
              animation: 'previewPulse 3s ease-in-out infinite',
            }}
          />

          {/* Corner accents */}
          {(['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const).map(
            (corner) => {
              const isTop = corner.startsWith('top');
              const isLeft = corner.endsWith('Left');
              return (
                <div
                  key={corner}
                  style={{
                    position: 'absolute',
                    width: 60,
                    height: 60,
                    ...(isTop ? { top: 0 } : { bottom: 0 }),
                    ...(isLeft ? { left: 0 } : { right: 0 }),
                    borderStyle: 'solid',
                    borderColor: cornerColor,
                    borderWidth: 0,
                    ...(isTop
                      ? { borderTopWidth: 2 }
                      : { borderBottomWidth: 2 }),
                    ...(isLeft
                      ? { borderLeftWidth: 2 }
                      : { borderRightWidth: 2 }),
                    ...(isTop && isLeft
                      ? { borderTopLeftRadius: 0 }
                      : isTop && !isLeft
                        ? { borderTopRightRadius: 0 }
                        : !isTop && isLeft
                          ? { borderBottomLeftRadius: 0 }
                          : { borderBottomRightRadius: 0 }),
                    animation: 'previewCornerFade 3s ease-in-out infinite',
                  }}
                />
              );
            },
          )}

          {/* Top gradient bar */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: scanlineGradient,
              animation: 'previewScanline 4s ease-in-out infinite',
            }}
          />

          <style>{`
            @keyframes previewPulse {
              0%, 100% {
                box-shadow: ${glowBase};
              }
              50% {
                box-shadow: ${glowPeak};
              }
            }
            @keyframes previewCornerFade {
              0%, 100% { opacity: 0.5; }
              50% { opacity: 1; }
            }
            @keyframes previewScanline {
              0% { transform: scaleX(0); transform-origin: left; opacity: 0; }
              10% { opacity: 1; }
              50% { transform: scaleX(1); transform-origin: left; }
              51% { transform-origin: right; }
              90% { opacity: 1; }
              100% { transform: scaleX(0); transform-origin: right; opacity: 0; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
