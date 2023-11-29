import { Box, Container, Popover, Stack, Typography } from '@mui/material';
import { SongCardProps } from '../../types/song';
import { useState } from 'react';

const SongCard = (props: SongCardProps) => {
  const { title, tempo, originalKey, themes, artist, year, lyricsPreview, filterData } = props;

  const displayData = [
    filterData?.display?.themes ?? true,
    filterData?.display?.tempo ?? true,
    filterData?.display?.originalKey ?? true,
    filterData?.display?.year ?? true,
    filterData?.display?.code ?? true,
  ];
  const fieldData = [themes, tempo, originalKey, year];
  const CardFields = ['Themes', 'Tempo', 'Original Key', 'Year', 'Code'];

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
          {filterData?.display?.lyricsPreview === true ||
          filterData?.display?.lyricsPreview === undefined ? (
            <>
              <Box
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                component="img"
                sx={{ height: '30px', width: '30px' }}
                src={process.env.PUBLIC_URL + '/images/preview.svg'}
              />
              <Popover
                id="mouse-over-popover"
                sx={{
                  pointerEvents: 'none',
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
              >
                <Typography sx={{ p: 1 }}>{lyricsPreview}</Typography>
              </Popover>
            </>
          ) : null}
        </Stack>
        <Stack direction="column">
          {CardFields &&
            CardFields.map((field, i) => {
              return (
                <Stack direction="row" display="flex" key={i}>
                  {displayData[i] ? (
                    <>
                      <Typography style={fieldStyle} width="40%">
                        {field}
                      </Typography>
                      <Typography style={fieldStyle}>{fieldData[i]}</Typography>
                    </>
                  ) : null}
                </Stack>
              );
            })}
        </Stack>
      </Container>
    </>
  );
};

export default SongCard;
