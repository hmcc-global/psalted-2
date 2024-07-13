const getFirstLineLyrics = (lyrics: string): string => {
  if (!lyrics || lyrics.length === 0) {
    return '';
  }

  // Remove chord notation and section headers
  const cleanedLyrics = lyrics.replace(/\[[^\]]+\]|\{[^}]+\}/g, '').trim();

  // Split the lyrics into lines and return the first non-empty line
  return cleanedLyrics.split('\n').find((line) => line.trim().length > 0) || '';
};

export default getFirstLineLyrics;
