import assert from "node:assert/strict";
import test from "node:test";
import {
  calculateCapital,
  TARGET_POINTS,
  STOP_POINTS,
  DEFAULT_RISK_PERCENT,
  RISK_OPTIONS,
} from "../app/capital-calculator.ts";

test("confirmed 1000-point target and 500-point stop produce a 2:1 scenario", () => {
  assert.equal(TARGET_POINTS, 1000);
  assert.equal(STOP_POINTS, 500);
  assert.equal(DEFAULT_RISK_PERCENT, 3);
  const result = calculateCapital(100, 3);
  assert.equal(result.lossAtStop, 50);
  assert.equal(result.displayedCapital, 1666.67);
  assert.equal(result.rewardRiskRatio, 2);
});

test("same target, smaller risk percentage requires more model capital", () => {
  assert.equal(calculateCapital(100, 0.5).displayedCapital, 10000);
  assert.equal(calculateCapital(100, 1).displayedCapital, 5000);
  assert.equal(calculateCapital(100, 2).displayedCapital, 2500);
  assert.equal(calculateCapital(300, 3).displayedCapital, 5000);
  assert.equal(calculateCapital(1000, 10).displayedCapital, 5000);
  assert.equal(calculateCapital(1000, 15).displayedCapital, 3333.34);
});

test("capital rounding does not exceed selected risk and preserves cents", () => {
  for (const target of [0.01, 0.1, 1, 50, 100.01, 300, 999999.99, 1000000]) {
    for (const risk of RISK_OPTIONS) {
      const r = calculateCapital(target, risk);
      assert(r.displayedCapital + 1e-8 >= r.capital);
      assert(r.displayedCapital - r.capital < 0.01000001);
      assert((r.lossAtStop / r.displayedCapital) * 100 <= risk + 1e-9);
    }
  }
  assert.equal(calculateCapital(100.01, 3).displayedCapital, 1666.84);
});

test("empty numeric inputs, negatives, overflow and invalid percentages produce no result", () => {
  for (const target of [0, -10, NaN, Infinity, 1000000.01])
    assert.equal(calculateCapital(target, 3), null);
  for (const risk of [0, -3, 101, Infinity, NaN])
    assert.equal(calculateCapital(100, risk), null);
});
