// utils/formatToISTString.ts
 
export const formatToISTString = (input: Date | string): string => {
  const date = typeof input === 'string' ? new Date(input) : input;
 
  const day = date.toLocaleString('en-IN', { day: '2-digit', timeZone: 'Asia/Kolkata' });
  const month = date.toLocaleString('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' });
  const year = date.toLocaleString('en-IN', { year: 'numeric', timeZone: 'Asia/Kolkata' });
 
  const time = date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  });
 
  const offsetMinutes = -date.getTimezoneOffset(); // Negative because IST is ahead of UTC
  const offsetHours = Math.floor(offsetMinutes / 60)
    .toString()
    .padStart(2, '0');
  const offsetMins = Math.abs(offsetMinutes % 60)
    .toString()
    .padStart(2, '0');
 
  const gmt = `GMT+${offsetHours}${offsetMins}`;
 
  return `${day} ${month} ${year} ${time} ${gmt}`;
};