// song constants
export const musicKeysOptions = [
  'A',
  'A#',
  'Bb',
  'B',
  'C',
  'C#',
  'Db',
  'D',
  'D#',
  'Eb',
  'E',
  'F',
  'F#',
  'Gb',
  'G',
  'G#',
  'Ab',
];

export const CardFields = ['Themes', 'Tempo', 'Original Key', 'Year', 'Code', 'Time', 'First Line'];

export const flatMusicKeysOptions = [
  'C',
  'Db',
  'D',
  'Eb',
  'E',
  'F',
  'Gb',
  'G',
  'Ab',
  'A',
  'Bb',
  'B',
  'C',
];
export const sharpMusicKeysOptions = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
  'C',
];

export const tempoOptions = ['Fast', 'Medium', 'Slow', 'Medium Slow'];
export const timeSignatureOptions = ['4/4', '3/4', '6/8', '2/4', '2/2', '9/8', '12/8', 'Others'];

export const themeOptions = [
  'Attributes of God',
  'Declaration',
  'The Cross',
  'Call to Worship',
  'Celebration',
  'Church/Unity',
];
export const themeSelectionLimit = 3;

export const displayResultOptions = [
  'Themes',
  'Tempo',
  'Original Key',
  'Year',
  'Code',
  'Time',
  'First Line Lyric',
];

// register/login form
export const formSpacing = { xs: 2, sm: 2, md: 3, lg: 3, xl: 3 };

export const formWidth = { xs: '85vw', sm: '60w', md: '60vw', lg: '40vw', xl: '30vw' };

//chord colors:
export const ChordColors: Record<string, string> = {
  C: '#FAFABE',
  'C#': '#DAFABE',
  Db: '#DAFABE',
  D: '#C1EBC0',
  'D#': '#C0EBE9',
  Eb: '#C0EBE9',
  E: '#C7CAFF',
  F: '#CDABEB',
  'F#': '#EED9F3',
  Gb: '#EED9F3',
  G: '#F6C2F3',
  'G#': '#F39BBD',
  Ab: '#F39BBD',
  A: '#F09EA7',
  'A#': '#F6BA94',
  Bb: '#F6BA94',
  B: '#F6CA94',
  Cm: '#FAFABE90',
  'C#m': '#DAFABE90',
  Dbm: '#DAFABE90',
  Dm: '#C1EBC090',
  'D#m': '#C0EBE990',
  Ebm: '#C0EBE990',
  Em: '#C7CAFF90',
  Fm: '#CDABEB90',
  'F#m': '#EED9F390',
  Gbm: '#EED9F390',
  Gm: '#F6C2F390',
  'G#m': '#F39BBD90',
  Abm: '#F39BBD90',
  Am: '#F09EA790',
  'A#m': '#F6BA9490',
  Bbm: '#F6BA9490',
  Bm: '#F6CA9490',
};
