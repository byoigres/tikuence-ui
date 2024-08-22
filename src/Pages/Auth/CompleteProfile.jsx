
import React, { useRef } from "react";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import MainLayout from "../../components/layouts/MainLayout";
import { useForm, Link as InertiaLink } from "@inertiajs/react";
import { styled } from '@mui/material/styles';
import InputHelpAdornment from "../../components/InputHelpAdornment";

const StyledForm = styled('form')(() => ({
  '& .MuiFormControl-root, & .MuiButton-root': {
    marginTop: '1rem',
  },
  marginBottom: '1rem',
}));

const LoginPage = ({ email, name, token, isInvalid = false, isExpired = false }) => {
  const { data, setData, post, processing, errors } = useForm({
    name,
    username: '',
    bio: '',
    tiktokUsername: '',
    terms: false,
    token,
  });
  const nameRef = useRef(null);
  const usernameRef = useRef(null);

  function handleInputChange(e) {
    const key = e.target.name;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    setData((v) => ({
      ...v,
      [key]: value,
    }));
  }

  const register = () => {
    post('/auth/complete-profile', {
      onError(errors) {
        if (errors.name) {
          nameRef.current.focus();
        } else if (errors.username) {
          usernameRef.current.focus();
        }
      }
    });
  };

  return (
    <Container maxWidth="sm">
      {isInvalid && (
        <Typography variant="h6" color="error" align="center">
          This link is invalid
        </Typography>
      )}
      {isExpired && (
        <Typography variant="h6" color="error" align="center">
          This link has expired
        </Typography>
      )}
      {!isInvalid && !isExpired && (
        <>
          <Typography variant="h4" color="primary" align="center" gutterBottom>
            Complete your profile
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            You are setting your account using your Google account.
          </Typography>
          <StyledForm autoComplete="off" autoCorrect="off">
            <TextField
              name="email"
              label="Email"
              value={email}
              fullWidth
              disabled
              variant="outlined"
            />
            <TextField
              name="name"
              label="Name"
              value={data.name}
              error={errors.name !== undefined}
              helperText={errors.name}
              disabled={processing}
              InputProps={{
                maxLength: 50,
                autoComplete: 'off',
                ref: nameRef,
                endAdornment: (
                  <InputHelpAdornment title="This is the name that will appears in your profile." />
                )
              }}
              autoComplete="off"
              onChange={handleInputChange}
              fullWidth
              autoFocus
              variant="outlined"
            />
            <TextField
              name="username"
              label="Username"
              value={data.username}
              error={errors.username !== undefined}
              helperText={errors.username}
              disabled={processing}
              InputProps={{
                maxLength: 24,
                autoComplete: 'off',
                ref: usernameRef,
                endAdornment: (
                  <InputHelpAdornment title="This is a unique identifier for your account, this will be part of your profile URL." />
                ),
              }}
              autoComplete="off"
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="bio"
              label="Bio"
              placeholder="Write a little bit of yourself (optional)"
              value={data.bio}
              error={errors.bio !== undefined}
              helperText={errors.bio}
              disabled={processing}
              autoComplete="off"
              multiline
              rows={4}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
            />
            <TextField
              name="tiktokUsername"
              label="TikTok username"
              placeholder="(Optional)"
              value={data.tiktokUsername}
              error={errors["tiktok-username"] !== undefined}
              helperText={errors["tiktok-username"]}
              disabled={processing}
              autoComplete="off"
              onChange={handleInputChange}
              onKeyPress={(e) => {
                if (!/^([A-Za-z0-9_.])$/.test(e.key)) {
                  e.preventDefault();
                }
              }}
              fullWidth
              variant="outlined"
            />
            <FormControl required error component="fieldset">
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      checked={data.terms}
                      value={data.terms}
                      disabled={processing}
                      onChange={handleInputChange}
                      color="primary"
                    />
                  }
                  label={
                    <>
                      {`Accept the `}
                      <Link component={InertiaLink} href="/policies/terms">
                        terms of service
                      </Link>
                      {` and `}
                      <Link component={InertiaLink} href="/policies/privacy">
                        privacy policy
                      </Link>
                      .
                    </>
                  }
                />
              </FormGroup>
              {errors.terms && <FormHelperText>{errors.terms}</FormHelperText>}
            </FormControl>
            <Button
              variant="contained"
              color="primary"
              disabled={!data.terms || processing}
              onClick={register}
              fullWidth
            >
              Complete profile
            </Button>
          </StyledForm>
        </>
      )}
    </Container>
  );
}

LoginPage.layout = (page) => <MainLayout children={page} />;

export default LoginPage;
