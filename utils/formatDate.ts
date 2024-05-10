export function formatDate(date: Date) {
  const dateObj = new Date(date);
  const dia = String(dateObj.getDate()).padStart(2, "0");
  const mes = String(dateObj.getMonth() + 1).padStart(2, "0"); // January é 0!
  const ano = dateObj.getFullYear();
  return `${dia}/${mes}/${ano}`;
}
