/**
 * Get a human-readable relative time string based on the time difference between
 * the input date and the current date.
 * @param inputDate - The date to calculate the relative time from.
 * @returns A string representing the relative time.
 */
export const getRelativeTime = (inputDate: Date): string => {
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - inputDate.getTime();

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  switch (true) {
    case years > 0:
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    case months > 0:
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    case days > 0:
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    case hours > 0:
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    case minutes > 0:
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    case seconds > 0:
      return `${seconds} ${seconds === 1 ? 'second' : 'seconds'} ago`;
    default:
      return 'Just now';
  }
};

/**
 * Converts Timestamp (represented by seconds and nanoseconds) to a JavaScript Date object.
 *
 * @param seconds - The seconds part of the Timestamp.
 * @param nanoseconds - The nanoseconds part of the Timestamp.
 * @returns A JavaScript Date object representing the converted timestamp.
 */
export const convertTimestampToDate = (
  seconds: number,
  nanoseconds: number
) => {
  return new Date(seconds * 1000 + nanoseconds / 1e6);
};
