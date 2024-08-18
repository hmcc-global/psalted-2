import { SetlistSongCardProps } from '../../types/setlist.types';
import { Add, Check } from '@mui/icons-material';
import { Typography, Stack, Container, IconButton, Grid } from '@mui/material';
import SongFieldArray from '../song/SongFieldArray';
import { CardFields } from '../../constants';

const SetlistSongCard = (props: SetlistSongCardProps) => {
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
    filterData,
    showDetails,
    isDesktop,
    handleAddSong,
    addedSongs,
  } = props;

  const displayData = [
    filterData?.display?.themes ?? true,
    filterData?.display?.tempo ?? true,
    filterData?.display?.originalKey ?? true,
    filterData?.display?.year ?? true,
    filterData?.display?.code ?? true,
    filterData?.display?.timeSignature ?? true,
  ];
  const fieldData = [themes, tempo, originalKey, year, code, timeSignature];

  return (
    <Container
      sx={{
        borderRadius: '8px',
        border: 1,
        borderColor: '#49454F',
        backgroundColor: 'primary.darkest',
        py: 2,
      }}
    >
      <Stack direction="row" display="flex" justifyContent="space-between">
        {/* song title and artist*/}
        <Stack>
          <Typography variant="h2" color={'secondary.main'}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color={'secondary.main'}>
            {artist}
          </Typography>
        </Stack>

        {/* add song to setlist button */}
        <IconButton
          onClick={() => handleAddSong(_id)}
          sx={{
            width: '40px',
            height: '40px',
            border: 1,
            borderRadius: '50%',
            borderWidth: '2px',
            color: 'primary.lighter',
            '&:hover': { color: 'secondary.main' },
            '&.Mui-selected': {
              backgroundColor: 'secondary.main',
              color: 'primary.darkest',
            },
          }}
          className={addedSongs.includes(_id) ? 'Mui-selected' : ''}
        >
          {addedSongs.includes(_id) ? <Check /> : <Add />}
        </IconButton>
      </Stack>

      {/* song fields and tags */}
      <Grid container spacing={2}>
        {CardFields &&
          showDetails !== false &&
          CardFields.map((field, i) => {
            return (
              <Grid item>
                <Stack direction="row" alignItems="center" key={i} spacing={1}>
                  {displayData[i] ? (
                    <>
                      {/* field key */}
                      <Typography
                        variant="body2"
                        color="#9E9E9E"
                        width={isDesktop ? '100%' : '40%'}
                      >
                        {field}
                      </Typography>
                      {/* render chip or string as value */}
                      {Array.isArray(fieldData[i]) ? (
                        <SongFieldArray data={fieldData[i]} />
                      ) : (
                        <Typography variant="body2" color={'#CCC2DC'}>
                          {fieldData[i] ?? '-'}
                        </Typography>
                      )}
                    </>
                  ) : null}
                </Stack>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default SetlistSongCard;
