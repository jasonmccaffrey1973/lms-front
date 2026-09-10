const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const relativeFormatter = new Intl.RelativeTimeFormat('en-US', {
  numeric: 'auto',
});

const friendlyDateTime = (dateString: string): string => {
  // If the input is just an integer (e.g., "1", "42"), treat it as a version string
  if (/^\d+$/.test(dateString.trim())) {
    return dateString;
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInMinutes = Math.round(diffInMs / (1000 * 60));
  const diffInHours = Math.round(diffInMs / (1000 * 60 * 60));

  // 1. Within the last/next 59 minutes: "X minutes ago" / "in X minutes"
  if (Math.abs(diffInMinutes) < 60) {
    if (diffInMinutes === 0) return 'Just now';
    return relativeFormatter.format(diffInMinutes, 'minute');
  }

  // 2. Within the last/next 6 hours on the exact same day: "X hours ago"
  const isSameDay =
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear();

  if (isSameDay && Math.abs(diffInHours) < 6) {
    return relativeFormatter.format(diffInHours, 'hour');
  }

  // 3. Fallback to calendar-day comparison
  const targetMidnight = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const nowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diffInDays = Math.round((targetMidnight.getTime() - nowMidnight.getTime()) / (1000 * 60 * 60 * 24));

  const timeStr = timeFormatter.format(date);

  if (Math.abs(diffInDays) <= 1) {
    const relativeLabel = relativeFormatter.format(diffInDays, 'day');
    const capitalized = relativeLabel.charAt(0).toUpperCase() + relativeLabel.slice(1);
    return `${capitalized} @ ${timeStr}`;
  }

  // 4. Absolute date fallback
  return `${dateFormatter.format(date)} @ ${timeStr}`;
};



export default friendlyDateTime;