import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { usePage } from "@inertiajs/react";
import Navigation from "../Navigation";
import { Container } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SnackbarProvider from "../SnackbarProvider";
import InertiaModals from "../InertiaModals";
import GlobalStyles from '@mui/material/GlobalStyles';

const theme = createTheme({
});

const inputGlobalStyles = <GlobalStyles styles={(theme) => ({
  html: {
    WebkitFontSmoothing: 'auto',
    fontFamily: "'Roboto', sans-serif",
    scrollBehavior: 'smooth',
  },
  body: {
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(30),
    },
  },
  a: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
})} />;

const sx = { 
  container: (theme) => ({
    flexGrow: 1,
    [theme.breakpoints.down('md')]: {
      paddingTop: theme.spacing(10),
    },
    [theme.breakpoints.up('md')]: {
      paddingTop: theme.spacing(2),
    },
    paddingBottom: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  })
}

const MainLayout = ({ children }) => {
  const {
    props: {
      auth: { isAuthenticated, profile },
      flash,
      modal = false
    },
  } = usePage();

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {inputGlobalStyles}
        <SnackbarProvider flash={flash}>
          <Navigation />
          <Container sx={sx.container} component="main" disableGutters maxWidth="lg">
            {React.Children.map(children, (child) => {
              if (!React.isValidElement(child)) {
                return null;
              }

              return React.cloneElement(child);
            })}
            <InertiaModals modal={modal} />
          </Container>
        </SnackbarProvider>
      </ThemeProvider>
    </>
  );
};

export default MainLayout;
