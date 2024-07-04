const getLyricsNoChords = (lyrics: string) => {
  return lyrics.replace(/\[.*?\]/g, '');
}

export default getLyricsNoChords;