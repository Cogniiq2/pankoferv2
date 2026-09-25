/**
 * Business constants and deterministic calculation logic for the
 * personalised payment plan. Every monetary figure shown on the page
 * derives from this file – nothing is hard-coded inside components.
 */

export const PRICING = {
  /** One-time implementation, net. */
  SETUP_PRICE: 26_000,
  /** Ongoing operation per month, net. */
  MONTHLY_OPERATION: 690,
  /** Down payment bounds in percent. */
  MIN_DOWN_PAYMENT: 30,
  MAX_DOWN_PAYMENT: 100,
  DOWN_PAYMENT_STEP: 5,
  /** Remaining amount can be spread over 1–12 months. */
  MIN_INSTALLMENT_MONTHS: 1,
  MAX_INSTALLMENT_MONTHS: 12,
  /** Defaults shown when the planner loads. */
  DEFAULT_DOWN_PAYMENT: 50,
  DEFAULT_INSTALLMENT_MONTHS: 12,
  /** Financing terms. */
  INTEREST_RATE: 0,
  FINANCING_FEES: 0,
} as const;

/** Figures discussed in Munich – used across the page for context. */
export const OPERATIONS = {
  EMAILS_PER_DAY: "~50",
  ORDERS_PER_DAY: "15–20",
  DOCUMENTS_PER_DAY: "10–20",
  STATUS_REQUESTS_PER_DAY: "~10",
} as const;

/** Current estimate – potential, not a guarantee. */
export const VALUE_ESTIMATE = {
  HOURS_SAVED_PER_WEEK: 16.4,
  ANNUAL_SAVING_EUR: 33_870,
} as const;

export interface PlanInput {
  /** Down payment in percent (30–100). */
  downPaymentPercent: number;
  /** Number of months for the remaining amount (1–12). */
  months: number;
}

export interface PlanResult {
  setupPrice: number;
  downPaymentPercent: number;
  downPayment: number;
  remainingSetup: number;
  /** 0 when the down payment is 100 %. */
  months: number;
  monthlySetupRate: number;
  operatingFee: number;
  monthlyCombined: number;
  afterPaymentPeriod: number;
  isPaidInFull: boolean;
  /** Down payment + every installment – always equals setupPrice. */
  totalSetup: number;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const roundCents = (value: number) => Math.round(value * 100) / 100;

export function clampDownPayment(percent: number): number {
  const stepped =
    Math.round(percent / PRICING.DOWN_PAYMENT_STEP) * PRICING.DOWN_PAYMENT_STEP;
  return clamp(stepped, PRICING.MIN_DOWN_PAYMENT, PRICING.MAX_DOWN_PAYMENT);
}

export function clampMonths(months: number): number {
  return clamp(
    Math.round(months),
    PRICING.MIN_INSTALLMENT_MONTHS,
    PRICING.MAX_INSTALLMENT_MONTHS,
  );
}

export function calculatePlan(input: PlanInput): PlanResult {
  const downPaymentPercent = clampDownPayment(input.downPaymentPercent);
  const months = clampMonths(input.months);
  const setupPrice = PRICING.SETUP_PRICE;

  const downPayment = roundCents((setupPrice * downPaymentPercent) / 100);
  const remainingSetup = roundCents(setupPrice - downPayment);
  const isPaidInFull = remainingSetup === 0;
  const effectiveMonths = isPaidInFull ? 0 : months;
  const monthlySetupRate = isPaidInFull
    ? 0
    : roundCents(remainingSetup / effectiveMonths);
  const operatingFee = PRICING.MONTHLY_OPERATION;

  return {
    setupPrice,
    downPaymentPercent,
    downPayment,
    remainingSetup,
    months: effectiveMonths,
    monthlySetupRate,
    operatingFee,
    monthlyCombined: roundCents(monthlySetupRate + operatingFee),
    afterPaymentPeriod: operatingFee,
    isPaidInFull,
    totalSetup: setupPrice,
  };
}

/* ---------- Formatting (German locale) ---------- */

const eurWhole = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const eurCents = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const numberDe = new Intl.NumberFormat("de-DE", {
  maximumFractionDigits: 1,
});

/**
 * Formats an amount as "26.000 €" when it is a whole number and
 * "1.083,33 €" otherwise. Pass `cents: true` to force two decimals.
 */
export function formatEuro(value: number, options?: { cents?: boolean }): string {
  const forceCents = options?.cents ?? false;
  const isWhole = Math.abs(value - Math.round(value)) < 0.005;
  return forceCents || !isWhole ? eurCents.format(value) : eurWhole.format(value);
}

export function formatNumber(value: number): string {
  return numberDe.format(value);
}

export function formatMonths(months: number): string {
  return months === 1 ? "1 Monat" : `${months} Monate`;
}
