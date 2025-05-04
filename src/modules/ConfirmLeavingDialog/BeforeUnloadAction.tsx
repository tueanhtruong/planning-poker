'use client';

import { FC, useEffect } from 'react';
import { useEffectEvent } from './useEffectEvent';

type BeforeUnloadActionProps = {
  onBeforeUnload?: () => void;
};

const InnerBeforeUnloadAction: FC<BeforeUnloadActionProps> = ({
  onBeforeUnload,
}) => {
  const beforeUnloadRef = useEffectEvent(() => onBeforeUnload?.());

  useEffect(() => {
    window.addEventListener('beforeunload', beforeUnloadRef);
    return () => {
      beforeUnloadRef();
      window.removeEventListener('beforeunload', beforeUnloadRef);
    };
  }, [beforeUnloadRef]);

  return null;
};

export const BeforeUnloadAction = InnerBeforeUnloadAction;
