// Clean Score presentation and point rules. The score itself (0-100, higher =
// less processed) comes from the scorer behind /api/classify.

export function getScoreColor(score) {
  if (score >= 80) return { bg: '#25D366', text: '#25D366', label: 'Excellent' };
  if (score >= 60) return { bg: '#84cc16', text: '#84cc16', label: 'Good' };
  if (score >= 40) return { bg: '#f59e0b', text: '#f59e0b', label: 'Moderate' };
  if (score >= 20) return { bg: '#f97316', text: '#f97316', label: 'Low' };
  return { bg: '#ef4444', text: '#ef4444', label: 'Ultra-Processed' };
}

export function getPointsEarned(score) {
  if (score >= 90) return 20;
  if (score >= 75) return 15;
  if (score >= 60) return 10;
  if (score >= 40) return 5;
  return 2;
}
