import { test } from "node:test";
import assert from "node:assert/strict";
import {
  PRICING,
  calculatePlan,
  clampDownPayment,
  clampMonths,
  formatEuro,
  formatMonths,
} from "./pricing.ts";

test("default plan: 50 % down payment over 12 months", () => {
  const plan = calculatePlan({ downPaymentPercent: 50, months: 12 });
  assert.equal(plan.downPayment, 13_000);
  assert.equal(plan.remainingSetup, 13_000);
  assert.equal(plan.months, 12);
  assert.equal(plan.monthlySetupRate, 1083.33);
  assert.equal(plan.monthlyCombined, 1773.33);
  assert.equal(plan.afterPaymentPeriod, 690);
  assert.equal(plan.totalSetup, PRICING.SETUP_PRICE);
  assert.equal(plan.isPaidInFull, false);
});

test("100 % down payment removes the installment phase", () => {
  const plan = calculatePlan({ downPaymentPercent: 100, months: 12 });
  assert.equal(plan.downPayment, 26_000);
  assert.equal(plan.remainingSetup, 0);
  assert.equal(plan.months, 0);
  assert.equal(plan.monthlySetupRate, 0);
  assert.equal(plan.monthlyCombined, 690);
  assert.equal(plan.isPaidInFull, true);
});

test("minimum down payment over one month", () => {
  const plan = calculatePlan({ downPaymentPercent: 30, months: 1 });
  assert.equal(plan.downPayment, 7_800);
  assert.equal(plan.remainingSetup, 18_200);
  assert.equal(plan.monthlySetupRate, 18_200);
  assert.equal(plan.monthlyCombined, 18_890);
});

test("the total implementation price never changes", () => {
  for (let pct = PRICING.MIN_DOWN_PAYMENT; pct <= PRICING.MAX_DOWN_PAYMENT; pct += PRICING.DOWN_PAYMENT_STEP) {
    for (let m = PRICING.MIN_INSTALLMENT_MONTHS; m <= PRICING.MAX_INSTALLMENT_MONTHS; m++) {
      const plan = calculatePlan({ downPaymentPercent: pct, months: m });
      assert.equal(plan.totalSetup, PRICING.SETUP_PRICE);
      assert.ok(Math.abs(plan.downPayment + plan.remainingSetup - PRICING.SETUP_PRICE) < 0.01);
    }
  }
});

test("inputs are clamped to the agreed bounds", () => {
  assert.equal(clampDownPayment(10), 30);
  assert.equal(clampDownPayment(140), 100);
  assert.equal(clampDownPayment(52), 50);
  assert.equal(clampMonths(0), 1);
  assert.equal(clampMonths(24), 12);
});

test("German currency formatting", () => {
  assert.equal(formatEuro(26_000), "26.000\u00a0€");
  assert.equal(formatEuro(1083.33), "1.083,33\u00a0€");
  assert.equal(formatEuro(690, { cents: true }), "690,00\u00a0€");
  assert.equal(formatMonths(1), "1 Monat");
  assert.equal(formatMonths(12), "12 Monate");
});
