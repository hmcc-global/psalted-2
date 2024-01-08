import { Button, Box, Chip, Container, Modal, Stack, Typography } from '@mui/material';
import { SongCardProps } from '#/types/song.types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';

type FieldArrayProps = {
  data: string[] | string;
};

const FieldArray = ({ data }: FieldArrayProps) => {
  if (Array.isArray(data)) {
    if (data.length === 0) return <Typography>-</Typography>;
    return (
      <Stack spacing={1} direction="row">
        {data.map((item: string, i: number) => {
          return <Chip size="small" key={i} label={item} />;
        })}
      </Stack>
    );
  }
  return null;
};

const TagArray = ({ data }: FieldArrayProps) => {
  if (Array.isArray(data)) {
    if (data.length === 0) return <Typography>-</Typography>;
    return (
      <Stack spacing={1} direction="row">
        {data.map((item: string, i: number) => {
          return <Chip sx={{ bgcolor: 'primary.light' }} size="medium" key={i} label={item} />;
        })}
      </Stack>
    );
  }
  return null;
};

const SongCard = (props: SongCardProps) => {
  const {
    title,
    tempo,
    originalKey,
    themes,
    artist,
    year,
    timeSignature,
    code,
    lyricsPreview,
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
  ];
  const fieldData = [themes, timeSignature, tempo, originalKey, year, code];
  const CardFields = ['Themes', 'Time Signature', 'Tempo', 'Original Key', 'Year', 'Code'];

  const navigate = useNavigate();

  // state for the modal
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <Container
      sx={{
        borderRadius: '4px',
        background: 'secondary.lighter',
        padding: '10px',
      }}
    >
      <Stack direction="row" display="flex" justifyContent="space-between">
        <Stack>
          <Typography variant="h2" color={'primary.main'}>
            {title}
          </Typography>
          <Typography variant="subtitle1">{artist}</Typography>
        </Stack>
        <>
          <Box sx={{ height: '30px', width: '30px' }}>
            <VisibilityIcon onClick={handleOpen} sx={{ color: 'primary.main' }} />
          </Box>
          <Modal open={modalOpen} onClose={handleClose}>
            <Stack
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 2,
                p: 4,
              }}
              spacing={1}
            >
              <Typography variant="h2">{title}</Typography>
              <Typography variant="subtitle1" sx={{ color: 'secondary.light' }}>
                {artist}
              </Typography>
              {lyricsPreview ? (
                <Typography sx={{ color: 'secondary.light' }}>{lyricsPreview}</Typography>
              ) : null}
              {Array.isArray(fieldData[0]) ? <TagArray data={fieldData[0]} /> : null}
              <Stack direction="row" display="flex" justifyContent="right" spacing={2}>
                <Button size="small" variant="text" onClick={handleClose}>
                  CANCEL
                </Button>
                <Button size="small" variant="outlined" onClick={() => navigate('/song/add')}>
                  ADD SONG
                </Button>
              </Stack>
            </Stack>
          </Modal>
        </>
      </Stack>
      <Stack direction={isDesktop ? 'row' : 'column'} spacing={isDesktop ? 4 : 1}>
        {CardFields &&
          showDetails !== false &&
          CardFields.map((field, i) => {
            return (
              <Stack direction="row" display="flex" key={i} spacing={1}>
                {displayData[i] ? (
                  <>
                    <Typography
                      variant="body2"
                      color={'secondary.main'}
                      width={isDesktop ? '100%' : '40%'}
                    >
                      {field}
                    </Typography>
                    {Array.isArray(fieldData[i]) ? (
                      <FieldArray data={fieldData[i]} />
                    ) : (
                      <Typography variant="body2" color={''}>
                        {fieldData[i] ?? '-'}
                      </Typography>
                    )}
                  </>
                ) : null}
              </Stack>
            );
          })}
      </Stack>
    </Container>
  );
};

export default SongCard;
