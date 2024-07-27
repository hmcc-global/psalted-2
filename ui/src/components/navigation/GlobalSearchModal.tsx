import React, { useEffect, useState, useMemo, useRef } from 'react';
import { Box, Fade, InputAdornment, Modal, TextField, Typography } from '@mui/material';

import SongSearchResult from './searchModalComponents/SongSearchResult';
import { useNavigate } from 'react-router-dom';
import SetlistSearchResult from './searchModalComponents/SetlistSearchResult';
import { SongViewSchema } from '#/types/song.types';
import { Setlist } from '#/types/setlist.types';
import SearchIcon from '@mui/icons-material/Search';
import RadioCard from './searchModalComponents/RadioCard';

type GlobalSearchModalProps = {
  isOpen: boolean;
  onClose: () => void;
  allSongs: SongViewSchema[];
  allSetlists: Setlist[];
};

const GlobalSearchModal = (props: GlobalSearchModalProps) => {
  const { isOpen, onClose, allSongs, allSetlists } = props;

  const radioFilters = ['Songs', 'Setlists'];
  const [radioFilter, setRadioFilter] = useState('Songs');

  const [loading, setLoading] = useState(false);
  const [filteredSongs, setFilteredSongs] = useState<SongViewSchema[]>([]);
  const [filteredSetlists, setFilteredSetlists] = useState<Setlist[]>([]);

  const [searchString, setSearchString] = useState('');
  const filterKeyword = useMemo(() => searchString.trim().toLowerCase(), [searchString]);

  useEffect(() => {
    setSearchString('');
  }, [onClose]);

  const memoizedFilteredSongs = useMemo(() => {
    if (filterKeyword.length < 2 || allSongs.length === 0) return [];

    setLoading(true);
    const filteredSongs = allSongs.filter((song) => {
      const songTitle = song.title.toLowerCase();

      if (songTitle.includes(filterKeyword)) {
        return true;
      }

      return false;
    });
    setLoading(false);
    return filteredSongs;
  }, [filterKeyword, allSongs]);

  const memoizedFilteredSetlists = useMemo(() => {
    if (filterKeyword.length < 2 || allSetlists.length === 0) return [];

    setLoading(true);
    const filteredSetlists = allSetlists.filter((setlist) => {
      const setlistName = setlist.name.toLowerCase();

      if (setlistName.includes(filterKeyword)) {
        return true;
      }

      return false;
    });
    setLoading(false);
    return filteredSetlists;
  }, [filterKeyword, allSetlists]);

  useEffect(() => {
    setLoading(true);
    if (radioFilter === 'Songs') {
      setFilteredSongs(memoizedFilteredSongs);
    } else {
      setFilteredSetlists(memoizedFilteredSetlists);
    }
    setFocusedIndex(-1);
    setLoading(false);
  }, [filterKeyword, radioFilter, memoizedFilteredSongs, memoizedFilteredSetlists]);

  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (isOpen && inputRef.current && focusedIndex === -1) {
      inputRef.current.focus();
    }
  }, [isOpen, radioFilter, focusedIndex]);

  // Handle keyboard events
  const resultRefs = useRef<HTMLDivElement[]>([]);
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const key = e.key;
    const results = radioFilter === 'Songs' ? filteredSongs : filteredSetlists;

    if (key === 'ArrowDown') {
      setFocusedIndex((prevIndex) => (prevIndex + 1) % results.length);
    } else if (key === 'ArrowUp') {
      setFocusedIndex((prevIndex) => {
        if (prevIndex === 0) {
          return -1;
        } else {
          return (prevIndex - 1 + results.length) % results.length;
        }
      });
    } else if (key === 'Escape') {
      setFocusedIndex(-1);
    } else if (key === 'Enter') {
      e.preventDefault();
      if (focusedIndex !== -1) {
        const category = radioFilter.toLowerCase();
        if (category === 'songs') {
          navigate(`/song/${(results[focusedIndex] as SongViewSchema)._id}`);
        } else if (category === 'setlists') {
          navigate(`/setlist/${(results[focusedIndex] as Setlist)._id}`);
        }
        onClose();
      }
    }
  };

  // Scroll to focused element
  useEffect(() => {
    if (focusedIndex !== -1) {
      if (
        resultRefs &&
        resultRefs.current &&
        resultRefs.current[focusedIndex] !== null &&
        resultRefs.current[focusedIndex] !== undefined
      ) {
        resultRefs.current[focusedIndex].scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
        });
      }
    }
  }, [focusedIndex]);

  // Handle input keydown
  const handleInputKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      navigate(`/song?q=${searchString}`);
      onClose();
    } else if (event.key === 'Escape') {
      onClose();
    }
  };

  const renderResults = () => {
    if (radioFilter === 'Songs') {
      if (filterKeyword === '') {
        return (
          <SongSearchResult
            _id=""
            title=""
            keyword=""
            ref={(el) => (resultRefs.current[0] = el as HTMLDivElement)}
            isFocused={focusedIndex === 0}
            onClose={onClose}
          />
        );
      }

      if (filteredSongs && filteredSongs.length > 0) {
        return filteredSongs.map((song, index) => (
          <SongSearchResult
            key={song._id}
            _id={song._id}
            title={song.title}
            keyword={filterKeyword}
            ref={(el) => (resultRefs.current[index] = el as HTMLDivElement)}
            isFocused={index === focusedIndex}
            onClose={onClose}
          />
        ));
      }

      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            p: '0.75rem',
          }}
        >
          <Typography variant="body1" color="#CAC4D0">
            No songs found
          </Typography>
        </Box>
      );
    }

    if (filterKeyword === '') {
      return (
        <SetlistSearchResult
          _id=""
          name=""
          keyword={filterKeyword}
          ref={(el) => (resultRefs.current[0] = el as HTMLDivElement)}
          isFocused={focusedIndex === 0}
          onClose={onClose}
        />
      );
    }

    if (filteredSetlists && filteredSetlists.length > 0) {
      return filteredSetlists.map((setlist, index) => (
        <SetlistSearchResult
          _id={setlist._id}
          name={setlist.name}
          keyword={filterKeyword}
          ref={(el) => (resultRefs.current[0] = el as HTMLDivElement)}
          isFocused={index === focusedIndex}
          onClose={onClose}
        />
      ));
    }

    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: '100%',
          p: '0.75rem',
        }}
      >
        <Typography variant="body1" color="#CAC4D0">
          No setlists found
        </Typography>
      </Box>
    );
  };

  return (
    <Modal open={isOpen} onClose={onClose} closeAfterTransition>
      <Fade in={isOpen}>
        <Box
          sx={{
            position: 'fixed',
            top: '22.5vh',
            left: '30vw',
            backgroundColor: '#2B2930',
            borderRadius: '10px',
            p: '1rem',
            width: '40%',
          }}
          onKeyDown={handleKeyDown}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            <Box sx={{ display: 'flex', gap: '8px' }}>
              {radioFilters.map((value) => (
                <RadioCard
                  key={value}
                  isSelected={value === radioFilter}
                  onClick={() => setRadioFilter(value)}
                >
                  {value}
                </RadioCard>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
              <TextField
                variant="standard"
                size="medium"
                placeholder="Browse keywords"
                InputProps={{
                  style: {
                    fontSize: '1rem',
                    color: '#CAC4D0',
                    background: '#2B2930',
                  },
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: '#CAC4D0' }} />
                    </InputAdornment>
                  ),
                }}
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                onKeyDown={handleInputKeyDown}
                autoFocus
                inputRef={inputRef}
                onClick={() => setFocusedIndex(-1)}
                sx={{
                  flexGrow: 1,
                  '& .MuiInputBase-root': {
                    color: 'black',
                    '&::placeholder': {
                      color: 'gray.8',
                    },
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                maxHeight: '35vh',
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: 'gray.5',
                  borderRadius: '3px',
                },
              }}
            >
              {loading ? (
                <Box sx={{ fontSize: '1rem', color: 'black', p: 2 }}>Loading...</Box>
              ) : (
                renderResults()
              )}
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GlobalSearchModal;
