export function FormatDateTime(dateString) {
  if(dateString === '' || dateString === null){
    return '';
  }
  const date = new Date(dateString);
  const pad = (n) => String(n).padStart(2, '0');

  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());
  const hh = pad(date.getUTCHours());
  const min = pad(date.getUTCMinutes());

  return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
}

export function FormatDate(dateString) {
  if(dateString === '' || dateString === null){
    return '';
  }
  const date = new Date(dateString);
  const pad = (n) => String(n).padStart(2, '0');

  const yyyy = date.getUTCFullYear();
  const mm = pad(date.getUTCMonth() + 1);
  const dd = pad(date.getUTCDate());

  return `${yyyy}-${mm}-${dd}`;
}
