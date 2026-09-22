export const TARGET_POINTS = 1_000;
export const STOP_POINTS = 500;
export const DEFAULT_RISK_PERCENT = 3;
export const RISK_OPTIONS = [0.5, 1, 2, 3, 10, 15] as const;
export const MAX_PROFIT_TARGET = 1_000_000;

/** One constant-size plan reaching TP or SL; excludes costs, margin and daily loss accumulation. */
export function calculateCapital(profitTarget: number, riskPercent: number) {
  if (
    !Number.isFinite(profitTarget) ||
    !Number.isFinite(riskPercent) ||
    profitTarget < 0.01 ||
    profitTarget > MAX_PROFIT_TARGET ||
    riskPercent <= 0 ||
    riskPercent > 100
  ) {
    return null;
  }

  const lossAtStop = (profitTarget * STOP_POINTS) / TARGET_POINTS;
  const capital = lossAtStop / (riskPercent / 100);

  return {
    profitTarget,
    riskPercent,
    lossAtStop,
    capital,
    // Round capital upward to a cent so display rounding cannot understate the budget.
    displayedCapital: Math.ceil(Number((capital * 100).toFixed(8))) / 100,
    rewardRiskRatio: TARGET_POINTS / STOP_POINTS,
  };
}
