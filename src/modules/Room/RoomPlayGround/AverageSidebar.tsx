import { SessionType } from '@/services';
import { AnimatePresence, motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { LuChartColumn, LuX } from 'react-icons/lu';
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

    const average =
      numericVotes.length > 0
        ? numericVotes.reduce((a, b) => a + b, 0) / numericVotes.length
        : null;

    return {
      average,
      totalVoters,
      numericVoters: numericVotes.length,
    };
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
              {average !== null
                ? parseFloat(average.toFixed(1)).toString()
                : '—'}
            </span>
            <span className="average-sidebar-avg-sub">
              {numericVoters} numeric vote{numericVoters !== 1 ? 's' : ''} ·{' '}
              {totalVoters} total
            </span>
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
