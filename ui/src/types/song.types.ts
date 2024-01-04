type SongEditorFields = {
  artist: string;
  title: string;
  themes: Array<string>;
  tempo: Array<string>;
  year: number;
  code: string;
  timeSignature: string;
  simplifiedChordLyrics: string;
  originalKey: string;
  recommendedKeys: Array<string>;
  chordLyrics: string;
};

interface SongEditorProps {
  actionOnEditor: string;
}

export type { SongEditorFields, SongEditorProps };
