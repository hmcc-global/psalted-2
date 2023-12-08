import { Container, Box } from '@mui/material';
import { SongView } from '../../types/song';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';

type SongTitleCardProps = {
  song: SongView | undefined;
};

const SongsTitleCard = (props: SongTitleCardProps) => {
  const songs = props.song;

  return (
    <>
      <Container>
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 0,
            borderRadius: 0,
            p: 2,
            minWidth: 150,
          }}
        >
          <Box
            fontWeight={'Bold'}
            fontFamily={'Inter'}
            sx={{ color: 'primary.main' }}
            fontSize={{ sm: '28px', md: '34px' }}
          >
            {songs && songs.title}
          </Box>
          <Box
            fontWeight={'Regular'}
            fontFamily={'Inter'}
            sx={{ color: 'black' }}
            fontSize={{ sm: '16px', md: '26px' }}
          >
            {songs && songs.artist}
          </Box>
          <Box>
            <Accordion>
              <Box bgcolor="#FAFAFA">
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography variant="subtitle1" display="flex" alignItems="center">
                    <InfoIcon sx={{ marginRight: '2vh' }} fontSize="large" color="primary" />
                    About The Song
                  </Typography>
                </AccordionSummary>
              </Box>

              <AccordionDetails sx={{ background: '#FAFAFA' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={3} md={2}>
                      <Typography>Themes</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {songs &&
                        songs.themes.map((themes: string, i: number) => {
                          return <Chip label={themes} key={i} />;
                        })}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Tempo</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                    {songs &&
                        songs.tempo.map((themes: string, i: number) => {
                          return <Chip label={themes} key={i} />;
                        })}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Original Key</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {songs && songs.originalKey}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Year</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {songs && songs.year}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Code</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {songs && songs.code}
                    </Grid>
                  </Grid>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default SongsTitleCard;
