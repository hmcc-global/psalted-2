import { Box, Chip, Container, Popover, Stack, Typography } from '@mui/material';
import { SongCardProps } from '../../types/song';
import { useState } from 'react';
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

  // state for the popover, to detect whether mouse is hovering or not
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Container
        sx={{
          borderRadius: '4px',
          background: '#FAFAFA',
          padding: '10px',
        }}
      >
        <Stack direction="row" display="flex" justifyContent="space-between">
          <Stack>
            <Typography variant="h2" color={'primary.main'}>
              {title}
            </Typography>
            <Typography variant="body1">{artist}</Typography>
          </Stack>
          {filterData?.display?.lyricsPreview === true ||
          filterData?.display?.lyricsPreview === undefined ? (
            <>
              <Box
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ height: '30px', width: '30px' }}
              >
                <VisibilityIcon sx={{ color: 'primary.main' }} />
              </Box>
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
    </>
  );
};

export default SongCard;
