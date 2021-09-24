export const preflightCommitment = "processed";

export const percentize = (decimal, min, max) => {
  if (typeof decimal !== "number" || isNaN(decimal)) return "";
  return max === 0
    ? `${(decimal * 100).toFixed(0)}%`
    : `${(decimal * 100).toLocaleString("en-US", {
        style: "decimal",
        minimumFractionDigits: min || 2,
        maximumFractionDigits: max || 2,
      })}%`;
};

export const formatWithCommas = (number) =>
  typeof number === "number" ? number.toLocaleString("en-US") : number;
