import { Button, Dialog, Portal, Stack, Switch, Text } from '@chakra-ui/react';
import { useCallback, useState } from 'react';

type PreviewModeSwitchProps = {
  isPreview: boolean;
  onApplyToggle: (nextPreview: boolean) => void;
};

export const PreviewModeSwitch = ({
  isPreview,
  onApplyToggle,
}: PreviewModeSwitchProps) => {
  const [showPreviewConfirm, setShowPreviewConfirm] = useState(false);
  const handleTogglePreview = useCallback(() => {
    const nextPreview = !isPreview;
    if (nextPreview) {
      setShowPreviewConfirm(true);
    } else {
      onApplyToggle(false);
    }
  }, [isPreview, onApplyToggle]);

  return (
    <>
      <Switch.Root
        size={'lg'}
        checked={isPreview}
        onClick={handleTogglePreview}
        colorPalette={'blue'}
        marginBlockStart={4}
        marginInlineStart={4}
      >
        <Switch.HiddenInput />
        <Switch.Control />
        <Switch.Label
          style={{
            fontSize: '16px',
            color: 'var(--color-text-secondary)',
            whiteSpace: 'nowrap',
          }}
        >
          Preview Mode
        </Switch.Label>
      </Switch.Root>

      <Dialog.Root
        size={'sm'}
        open={showPreviewConfirm}
        onOpenChange={({ open }) => setShowPreviewConfirm(open)}
        placement={'center'}
      >
        <Portal>
          <Dialog.Backdrop />
          <Dialog.Positioner>
            <Dialog.Content
              style={{
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              <Dialog.Header>
                <Dialog.Title style={{ color: 'var(--color-text-primary)' }}>
                  Switch to Preview Mode?
                </Dialog.Title>
              </Dialog.Header>
              <Dialog.Body>
                <Text style={{ color: 'var(--color-text-secondary)' }}>
                  Switching to preview mode will clear your current vote. Are
                  you sure you want to continue?
                </Text>
              </Dialog.Body>
              <Dialog.Footer>
                <Stack direction={'row'} gap={3} justifyContent={'flex-end'}>
                  <Button
                    colorPalette={'blue'}
                    variant={'outline'}
                    onClick={() => setShowPreviewConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    colorPalette={'blue'}
                    onClick={() => {
                      setShowPreviewConfirm(false);
                      onApplyToggle(true);
                    }}
                  >
                    Confirm
                  </Button>
                </Stack>
              </Dialog.Footer>
            </Dialog.Content>
          </Dialog.Positioner>
        </Portal>
      </Dialog.Root>
    </>
  );
};
