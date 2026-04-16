import type { HealthTone } from "@/lib/types";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompact(value: number) {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function healthToneLabel(tone: HealthTone) {
  switch (tone) {
    case "excellent":
      return "Excellent";
    case "stable":
      return "Stable";
    case "watch":
      return "Watch";
    case "at-risk":
      return "At risk";
    default:
      return tone;
  }
}
