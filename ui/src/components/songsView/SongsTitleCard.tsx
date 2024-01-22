import { Container, Box } from '@mui/material';
import { SongViewSchema } from '../../types/song.types';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import InfoIcon from '@mui/icons-material/Info';

type SongTitleCardProps = {
  song: SongViewSchema | undefined;
};

const SongsTitleCard = (props: SongTitleCardProps) => {
  const song = props.song;

  return (
    <>
      <Container>
        <Box
          sx={{
            bgcolor: 'white',
            boxShadow: 0,
            borderRadius: 0,
            p: 0,
            minWidth: 150,
          }}
        >
          <Box
            fontWeight={'Bold'}
            fontFamily={'Inter'}
            sx={{ color: 'primary.main', marginleft:'0px' }}
            fontSize={{ sm: '28px', md: '34px' }}
          >
            {song && song.title}
          </Box>
          <Box
            fontWeight={'Regular'}
            fontFamily={'Inter'}
            sx={{ color: 'black', marginLeft:'0px' }}
            fontSize={{ sm: '16px', md: '26px' }}
          >
            {song && song.artist}
          </Box>
          <Box  sx={{paddingLeft:"5px" }}>
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
                      {song &&
                        song.themes.map((themes: string, i: number) => {
                          return <Chip label={themes} key={i} />;
                        })}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Tempo</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {song &&
                        song.tempo.map((themes: string, i: number) => {
                          return <Chip label={themes} key={i} />;
                        })}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Original Key</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {song && song.originalKey}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Year</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {song && song.year}
                    </Grid>
                    <Grid item xs={3} md={2}>
                      <Typography>Code</Typography>
                    </Grid>
                    <Grid item xs={9} md={10}>
                      {song && song.code}
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
