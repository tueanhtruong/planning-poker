import { FlyingEmojiType } from '@/services';
import { FC, useEffect, useState } from 'react';

type FlyingEmojiProps = FlyingEmojiType & {
  onComplete: (id: string) => void;
};

export const FlyingEmoji: FC<FlyingEmojiProps> = ({
  id,
  emoji,
  fromUserId,
  toUserId,
  // fromX,
  // fromY,
  // toX,
  // toY,
  onComplete,
}) => {
  const [position, setPosition] = useState<{
    fromX: number;
    fromY: number;
    toX: number;
    toY: number;
  } | null>(null);
  const [shouldRemove, setShouldRemove] = useState(false);

  useEffect(() => {
    const myCardElement = document.getElementById(`player-card-${fromUserId}`);
    const targetCardElement = document.getElementById(
      `player-card-${toUserId}`,
    );
    if (!myCardElement || !targetCardElement) return;
    const myCardRect = myCardElement.getBoundingClientRect();
    const targetCardRect = targetCardElement.getBoundingClientRect();
    const fromX = myCardRect.left + myCardRect.width / 2;
    const fromY = myCardRect.top + myCardRect.height / 2;
    const toX = targetCardRect.left + targetCardRect.width / 2;
    const toY = targetCardRect.top + targetCardRect.height / 2;
    setPosition({ fromX, fromY, toX, toY });

    // Start animation after mount
    const timer = setTimeout(() => {
      setShouldRemove(true);
    }, 250);

    // Remove after animation completes
    const removeTimer = setTimeout(() => {
      onComplete(id);
    }, 1300); // Match animation duration

    return () => {
      clearTimeout(timer);
      clearTimeout(removeTimer);
    };
  }, [id, onComplete]);

  if (!position) {
    return null;
  }

  const { fromX, fromY, toX, toY } = position;

  return (
    <div
      className="flying-emoji"
      style={{
        position: 'fixed',
        left: `${fromX}px`,
        top: `${fromY}px`,
        fontSize: '32px',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: shouldRemove
          ? `translate(${toX - fromX}px, ${toY - fromY}px) scale(1.1)`
          : 'translate(0, 0) scale(1)',
        opacity: shouldRemove ? 0.6 : 1,
        transition: 'all 0.8s linear',
      }}
    >
      {emoji}
    </div>
  );
};
