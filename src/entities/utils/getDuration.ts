export const getDuration = (startISO: string, endISO: string) => {
  const ms = new Date(endISO).getTime() - new Date(startISO).getTime();
  const totalMin = Math.max(0, Math.round(ms / 60000));
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  return `${h}ч ${m}м`;
};