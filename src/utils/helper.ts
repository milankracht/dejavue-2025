export function readableDate(dateString: string | null | undefined): string {
  if (!dateString) return 'Unknown';
  if (isNaN(Date.parse(dateString))) return 'Unknown';
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options);
}

export function hyperlink(string: string): string {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return string.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  });
}
