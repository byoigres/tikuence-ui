import React from 'react';
import { Link as InertiaLink } from '@inertiajs/react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';

// TODO: Refactor this component to use the `sx` prop instead of `styled`
const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'disableGutters',
})(({ theme, size, disableGutters }) => ({
  fontFamily: 'Passion One',
  fontSize: theme.spacing(size === 'small' ? 4 : 6),
  textAlign: 'center',
  color: theme.palette.common.white,
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(0),
  margin: theme.spacing(disableGutters ? 0 : 1),
}));

const sx = {
  link: (theme) => ({
    color: theme.palette.common.white,
  }),
}


const Logo = ({ size = 'default', disableGutters = false, sx: typographySX = {} }) => {
  return (
    <StyledTypography size={size} disableGutters={disableGutters} sx={typographySX}>
      <Link href="/" component={InertiaLink} sx={sx.link}>
        TiKUENCE
      </Link>
    </StyledTypography>
  );
};

export default Logo;
