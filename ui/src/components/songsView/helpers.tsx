export const transposeSingleChord = (
  originalKey: string,
  chord: string,
  transpose: number
): string => {
  const rootNotes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const rootNotesFlat = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];

  const chordParts = chord.split(/\s+/);
  const transposedParts = chordParts.map((chordPart) => {
    const rootNoteRegex = /^([A-G]b?)([#])?(.*)/;
    const rootNoteRegexFlat = /^([A-G]#?)([b])?(.*)/;
    //   ^([A-G])([#b])?(.*)
    const [, rootNoteFlat, modifierFlat, charFlat] = chordPart.match(rootNoteRegexFlat) || [];

    const [, rootNote, modifier, char] = chordPart.match(rootNoteRegex) || [];

    if (modifier === '#') {
      const noteIndex = rootNotes.indexOf(rootNote + '#'); //compensate the sharp
      //console.log(noteIndex);
      var transposedIndex = (noteIndex + transpose) % 12;
      if (transposedIndex < 0) {
        transposedIndex += 12;
      }
      //console.log(transposedIndex)
      const transposedRoot = rootNotes[transposedIndex];
      return `${transposedRoot}${char || ''}`;
    }
    if (modifierFlat === 'b') {
      const noteIndexFlat = rootNotesFlat.indexOf(rootNoteFlat + 'b'); //compensate lost flat
      //console.log(noteIndex);
      transposedIndex = (noteIndexFlat + transpose) % 12;
      if (transposedIndex < 0) {
        transposedIndex += 12;
      }
      //console.log(transposedIndex)
      const transposedRootFlat = rootNotesFlat[transposedIndex];
      return `${transposedRootFlat}${charFlat || ''}`;
    } else {
      const noteIndex = rootNotes.indexOf(rootNote);
      //console.log(noteIndex);
      transposedIndex = (noteIndex + transpose) % 12;
      if (transposedIndex < 0) {
        transposedIndex += 12;
      }
      //console.log(transposedIndex)
      const transposedRoot = rootNotes[transposedIndex];
      return `${transposedRoot}${modifier || ''}${char || ''}`;
    }
  });

  return transposedParts.join(' ');
};

export const transposeChord = (originalKey: string, chord: string, transpose: number): string => {
  const chordRegex = /\[(.*?)\]/g;

  return chord.replace(chordRegex, (_, chordName: string) => {
    return `[${transposeSingleChord(originalKey, chordName, transpose)}]`;
  });
};

export const parseLyrics = (
  originalKey: string | undefined,
  a: string | undefined,
  transpose: number,
  chordStatus: boolean
) => {
  if (chordStatus) {
    var tempStr: string = String(a).replaceAll('\n', ' \n ');
    tempStr = tempStr.replaceAll('{', '\n{');
    tempStr = tempStr.replaceAll('}', '}\n ');

    let lyricsArray: Array<string>;
    lyricsArray = tempStr.split('\n');

    var beginIndex: number = 0;
    var endIndex: number = 0;
    var chordStr: string = '';
    var newStr: string = '';
    var prevEndIndex: number = 0;
    var lineLength = lyricsArray.length;
    var pass: boolean = false;

    for (let index = 0; index < lineLength; index++) {
      prevEndIndex = 0;
      // Find if '[' or ']' exists
      // Extract substring in between
      // find the length of the substring
      // push to the end of array - to update array length
      // replace the [ ]
      // change last array position to + 1 of current
      //shift the other ones
      while ((beginIndex = lyricsArray[index].indexOf('[')) > 0) {
        endIndex = lyricsArray[index].indexOf(']');
        chordStr = lyricsArray[index].substring(beginIndex, endIndex + 1);
        for (let space = 0; space < beginIndex - prevEndIndex; space++) {
          newStr = newStr.concat(' ');
        }
        newStr = newStr + chordStr;

        lyricsArray[index] = lyricsArray[index].replace('[', '<');
        lyricsArray[index] = lyricsArray[index].replace(']', '>');
        prevEndIndex = endIndex;
        pass = true;
      }

      // console.log(lyricsArray.length);
      if (pass) {
        lyricsArray[index] = lyricsArray[index].replace(/<([^>]+)>/g, ' ');
        lyricsArray.push(newStr);
        pass = false;
        newStr = '';
      } else {
        lyricsArray.push(' ');
      }
    }
    let lyricsArrayFinal: Array<string> = ['something'];
    for (let i = 0; i < lyricsArray.length; i++) {
      lyricsArrayFinal.push('');
    }

    for (let i = 0; i < lyricsArray.length / 2; i++) {
      // lyrics
      lyricsArray[i] = lyricsArray[i].trim();
      lyricsArray[i] = lyricsArray[i].replace(/\s+/g, ' ');
      lyricsArrayFinal[i * 2 + 1] = lyricsArray[i];
    }
    for (let i = 0; i < lyricsArray.length / 2; i++) {
      // chords
      lyricsArray[i + lyricsArray.length / 2] = transposeChord(
        String(originalKey),
        lyricsArray[i + lyricsArray.length / 2],
        transpose
      );
      lyricsArrayFinal[i * 2] = lyricsArray[i + lyricsArray.length / 2];
    }

    //console.log(lyricsArrayFinal);
    return lyricsArrayFinal;
  } else {
    tempStr = String(a).replaceAll('{', '\n{');
    tempStr = tempStr.replaceAll('}', '}\n');
    tempStr = tempStr.replace(/\[(.*?)\]/g, ' ');
    tempStr = tempStr.replaceAll('[', ' ');
    tempStr = tempStr.replaceAll(']', ' ');
    let lyricsArray: Array<string>;
    lyricsArray = tempStr.split('\n');
    return lyricsArray;
  }
};
