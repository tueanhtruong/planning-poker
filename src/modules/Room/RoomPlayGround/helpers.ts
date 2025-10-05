const getLastVote = (votes: string[] | undefined): string | null => {
  if (!votes || votes.length === 0) return null;
  return votes[votes.length - 1];
};
const isVoted = (votes: string[] | undefined): boolean => {
  return Boolean(votes && votes.length > 0);
};
const isHasReVoted = (votes: string[]): boolean => {
  return Boolean(votes && votes.length > 1);
};
const getAllPreviousVote = (votes: string[] | undefined): string | null => {
  if (!votes || votes.length < 2) return null;
  return votes.slice(0, votes.length - 1).join(', ');
};
export { getAllPreviousVote, getLastVote, isHasReVoted, isVoted };
