import { Button, Box, Container, Modal, Stack, Typography } from '@mui/material';
import { SongCardProps } from '../../types/song.types';
import { CardFields } from '../../constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SongFieldArray from './SongFieldArray';
import SongTagArray from './SongTagArray';
import getLyricsPreview from '../../helpers/song/getLyricsPreview';

const SongCard = (props: SongCardProps) => {
  const {
    _id,
    title,
    tempo,
    originalKey,
    themes,
    artist,
    year,
    timeSignature,
    code,
    chordLyrics,
    firstLine,
    filterData,
    showDetails,
    isDesktop,
  } = props;

  const displayData = [
    filterData?.display?.themes ?? true,
    filterData?.display?.tempo ?? true,
    filterData?.display?.originalKey ?? true,
    filterData?.display?.year ?? true,
    filterData?.display?.code ?? true,
    filterData?.display?.timeSignature ?? true,
    filterData?.display?.firstLine ?? true,
  ];
  const fieldData = [themes, tempo, originalKey, year, code, timeSignature, firstLine];
  const navigate = useNavigate();

  // state for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <>
      <Container
        onClick={() => navigate(`/song/${_id}`)}
        disableGutters
        sx={{
          borderRadius: '8px',
          border: 1,
          borderColor: '#49454F',
          backgroundColor: 'primary.darkest',
          p: '1rem',
          '&:hover': {
            borderColor: 'secondary.main',
            cursor: 'pointer',
          },
          transition: 'all 0.1s ease-in-out',
          maxWidth: '100%',
        }}
      >
        <Stack
          direction="row"
          display="flex"
          justifyContent="space-between"
          minWidth={'100%'}
          maxWidth={'100%'}
          p={0}
          mb="1rem"
        >
          <Stack>
            <Typography variant="h4" color={'secondary.main'}>
              {title}
            </Typography>
            <Typography variant="subtitle2" color={'secondary.main'}>
              {artist}
            </Typography>
          </Stack>
          <>
            <Box sx={{ height: '30px', width: '30px' }}>
              <VisibilityIcon
                onClick={(event: any) => {
                  event.stopPropagation();
                  modalOpen ? handleClose() : handleOpen();
                }}
                // onMouseLeave={handleClose}
                sx={{ color: 'secondary.main' }}
              />
            </Box>
          </>
        </Stack>
        <Stack
          direction={isDesktop ? 'row' : 'column'}
          maxWidth={'100%'}
          flexWrap="wrap"
          rowGap={'0.5rem'}
        >
          {CardFields &&
            showDetails !== false &&
            CardFields.map((field, i) => {
              return (
                displayData[i] && (
                  <Stack
                    direction="row"
                    display="flex"
                    key={i}
                    spacing={1}
                    width="fit-content"
                    maxWidth="100%"
                    alignItems={'center'}
                    justifyContent={'flex-start'}
                    mr={isDesktop ? '1.25rem' : 1}
                  >
                    <Typography variant="body2" color="#9E9E9E" minWidth={'fit-content'}>
                      {field}
                    </Typography>
                    {Array.isArray(fieldData[i]) ? (
                      <SongFieldArray data={fieldData[i]} />
                    ) : (
                      <Typography variant="body2" color={'#CCC2DC'} align="left" noWrap>
                        {fieldData[i] ?? '-'}
                      </Typography>
                    )}
                  </Stack>
                )
              );
            })}
        </Stack>
      </Container>
      <Modal open={modalOpen} onClose={handleClose}>
        <Stack
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#2B2930',
            borderRadius: '10px',
            boxShadow: 2,
            p: '1.5rem',
          }}
          spacing={1}
        >
          <Typography variant="h2">{title}</Typography>
          <Typography variant="subtitle1" sx={{ color: 'secondary.light' }}>
            {artist}
          </Typography>
          <Typography sx={{ color: 'secondary.light' }}>getLyricsPreview(chordLyrics)</Typography>
          {Array.isArray(fieldData[0]) ? <SongTagArray data={fieldData[0]} /> : null}
          <Stack direction="row" display="flex" justifyContent="right" spacing={2}>
            <Button size="small" variant="text" onClick={handleClose}>
              <Typography variant="body2" color="#CAC4D0" textTransform={'none'}>
                Cancel
              </Typography>
            </Button>
            <Button
              size="medium"
              variant="outlined"
              onClick={() => navigate('/song/add')}
              sx={{
                borderColor: 'primary.light',
              }}
            >
              <Typography variant="body2" color="#CAC4D0" textTransform={'none'}>
                Add Song
              </Typography>{' '}
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default SongCard;
