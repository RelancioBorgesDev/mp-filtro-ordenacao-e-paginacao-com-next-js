export function formatDate(date: Date) {
  const newDate = new Date(date);
  const day = newDate.getDay();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();
  return `${day}/${month}/${year}`;
}
