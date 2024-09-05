import React from "react";
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Link as InertiaLink } from "@inertiajs/react";
import MainLayout from "../../components/Layouts/MainLayout";
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';

const StyledPaper = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'isMobile',
})(({ isMobile }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  alignSelf: 'center',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  paddingLeft: isMobile ? '1rem' : '3rem',
  paddingRight: isMobile ? '1rem' : '3rem',
}));

const StyledButtonsContainer = styled('div')(({ theme }) => ({}));

const LoginPage = ({ isSignIn, isMobile = true }) => {
  const [isButtonLoading, setIsButtonLoading] = React.useState(false);
  return (
    <Container maxWidth="sm" disableGutters={isMobile}>
      <StyledPaper elevation={1}>
        <Typography variant="h4" component="h1" color="primary" gutterBottom>
          {`${isSignIn ? 'Welcome back 😄' : 'Hello user 👋'}`}
        </Typography>
        <Typography variant="subtitle2" gutterBottom>
          {isSignIn
            ? 'Log in to continue using all the features of your account.'
            : `You can create an account using one of the following social providers.`}
        </Typography>
        <StyledButtonsContainer>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            disabled={isButtonLoading}
            startIcon={<GoogleIcon />}
            style={{ backgroundColor: '#E04A32', color: 'white' }}
            href="/auth/google"
            onClick={(e) => {
              e.preventDefault();
              setIsButtonLoading(true);
              window.location.href = '/auth/google';
            }}
          >
            {isSignIn ? 'Continue' : 'Sign up'} with Google
          </Button>
        </StyledButtonsContainer>
        {!isSignIn && (
          <Typography variant="body2">
            {`You will be asked to accept the `}
            <InertiaLink href="/policies/terms">terms of service</InertiaLink>
            {` and `}
            <InertiaLink href="/policies/privacy">privacy policy</InertiaLink>
            {' in a later step.'}
          </Typography>
        )}
        <Divider flexItem style={{ height: 1, marginTop: '1rem', marginBottom: '1rem' }} />
        <Typography>
          {`${isSignIn ? `Don't` : 'Already'} have an account? `}
          <InertiaLink href={`/auth/${isSignIn ? 'signup' : 'signin'}`}>
            {isSignIn ? 'Sign Up' : 'Sign In'}
          </InertiaLink>
        </Typography>
      </StyledPaper>
    </Container>
  );
}

LoginPage.layout = (page) => <MainLayout children={page} />;

export default LoginPage;
