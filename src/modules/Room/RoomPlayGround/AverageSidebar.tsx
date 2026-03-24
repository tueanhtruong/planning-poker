import { Tooltip } from '@/components/ui/tooltip';
import { useConfig } from '@/modules/Config';
import { useUser } from '@/modules/User';
import { SessionType } from '@/services';
import { Icon } from '@chakra-ui/react/icon';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { LuChartColumn, LuMessageCircleWarning, LuX } from 'react-icons/lu';
import { getLastVote } from './helpers';

type AverageSidebarProps = {
  participants: SessionType['participants'];
  revealed: boolean;
};

export const AverageSidebar: FC<AverageSidebarProps> = ({
  participants,
  revealed,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: configData } = useConfig();

  const { average, totalVoters, numericVoters } = useMemo(() => {
    const participantsData = Object.values(participants).filter(Boolean);

    const totalVoters = participantsData.filter(
      (p) => getLastVote(p.votes) !== null,
    ).length;

    const numericVotes = participantsData
      .map((p) => getLastVote(p.votes))
      .filter(
        (v): v is string =>
          v !== null && !isNaN(parseFloat(v)) && isFinite(Number(v)),
      )
      .map((v) => parseFloat(v));

    const numericConfigCards = (configData?.cards ?? [])
      .map((card) => Number(card))
      .filter((value) => isFinite(value));

    const rawAverage =
      numericVotes.length > 0
        ? numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length
        : null;

    const average =
      rawAverage !== null && numericConfigCards.length > 0
        ? numericConfigCards.reduceRight((closest, cardValue) => {
            const closestDistance = Math.abs(closest - rawAverage);
            const currentDistance = Math.abs(cardValue - rawAverage);
            return currentDistance < closestDistance ? cardValue : closest;
          }, numericConfigCards[0])
        : rawAverage;

    return {
      average,
      totalVoters,
      numericVoters: numericVotes.length,
    };
  }, [participants, configData?.cards]);

  const previewParticipantIds = useMemo(() => {
    return Object.entries(participants)
      .filter(([_, participant]) => participant?.preview)
      .map(([participantId]) => participantId);
  }, [participants]);

  const SidebarContent = (
    <div className="average-sidebar-content">
      <div className="average-sidebar-header">
        <span className="average-sidebar-title">Results</span>
        <button
          className="average-sidebar-close"
          onClick={() => setIsOpen(false)}
          aria-label="Close results panel"
        >
          <LuX size={16} />
        </button>
      </div>

      {revealed ? (
        <>
          <div className="average-sidebar-avg-block">
            <span className="average-sidebar-avg-label">Average</span>
            <span className="average-sidebar-avg-value gradient-text">
              {average !== null ? average.toString() : '—'}
            </span>
            <span className="average-sidebar-avg-sub">
              {numericVoters} numeric vote{numericVoters !== 1 ? 's' : ''} ·{' '}
              {totalVoters} total
              <Tooltip
                content={`The average is calculated by taking the numeric votes, computing
              their mean, and then finding the closest card value from the
              configuration.`}
                interactive
                positioning={{ placement: 'top' }}
                contentProps={{ className: 'tooltip-content' }}
              >
                <Icon
                  style={{
                    color: 'var(--color-amber)',
                    cursor: 'pointer',
                    display: 'inline',
                    marginInline: 4,
                  }}
                  fontSize={16}
                >
                  <LuMessageCircleWarning />
                </Icon>
              </Tooltip>
            </span>
            {previewParticipantIds.length > 0 ? (
              <div className="average-sidebar-preview-users">
                <span className="average-sidebar-preview-label">
                  Preview viewers:
                </span>{' '}
                {previewParticipantIds.map((participantId, index) => (
                  <PreviewParticipantName
                    key={participantId}
                    userId={participantId}
                    withTrailingComma={index < previewParticipantIds.length - 1}
                  />
                ))}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="average-sidebar-waiting">Waiting for reveal…</div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop: always-visible fixed sidebar */}
      <div className="average-sidebar average-sidebar-desktop">
        {SidebarContent}
      </div>

      {/* Mobile: floating toggle button */}
      <button
        className="average-sidebar-toggle"
        onClick={() => setIsOpen((o) => !o)}
        aria-label="Toggle results panel"
      >
        <LuChartColumn size={20} />
      </button>

      {/* Mobile: slide-in drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="average-sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="average-sidebar average-sidebar-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {SidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const PreviewParticipantName: FC<{
  userId: string;
  withTrailingComma: boolean;
}> = ({ userId, withTrailingComma }) => {
  const { data } = useUser({ id: userId });
  const displayName = data?.displayName ?? 'Unknown';

  return (
    <span className="average-sidebar-preview-user-name">
      {displayName}
      {withTrailingComma ? ', ' : ''}
    </span>
  );
};
