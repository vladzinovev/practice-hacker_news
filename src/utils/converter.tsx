export function converterDate(times: number | null | undefined) {
  if (!times) return "";

  return new Date(times * 1000).toLocaleDateString("ru-RU", {
    hour: "numeric",
    minute: "numeric",
  });
}
