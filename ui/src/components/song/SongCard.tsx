import { Box, Container, Stack, Typography } from '@mui/material';
import { SongCardProps } from '../../types/song';

const SongCard = (props: SongCardProps) => {
  const { title, tempo, originalKey, themes, artist, year, lyricsPreview } = props;
  const fieldData = [themes, tempo, originalKey, year];
  const CardFields = ['Themes', 'Tempo', 'Original Key', 'Year', 'Code'];
  const titleStyle = {
    color: '#4B50B4',
    fontFamily: 'Roboto',
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 700,
    lineHeight: 'normal',
  };
  const fieldStyle = {
    color: '#9E9E9E',
    fontFamily: 'Roboto',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: 'normal',
  };
  console.log(lyricsPreview);
  return (
    <>
      <Container
        sx={{
          borderRadius: '4px',
          background: '#FAFAFA',
        }}
      >
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Stack>
            <Typography sx={titleStyle}>{title}</Typography>
            <Typography>{artist}</Typography>
          </Stack>
          <Box
            component="img"
            sx={{ height: '30px', width: '30px' }}
            src={process.env.PUBLIC_URL + '/images/preview.svg'}
          />
        </Stack>
        <Stack direction="column">
          {CardFields &&
            CardFields.map((field, i) => {
              return (
                <Stack direction="row" display="flex">
                  <Typography style={fieldStyle} key={i} width="40%">
                    {field}
                  </Typography>
                  <Typography style={fieldStyle} key={i}>
                    {fieldData[i]}
                  </Typography>
                </Stack>
              );
            })}
        </Stack>
      </Container>
    </>
  );
};

export default SongCard;
