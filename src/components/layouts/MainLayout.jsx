import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { usePage } from "@inertiajs/react";
import Navigation from "../Navigation";
import { Container } from "@mui/material";
import SnackbarProvider from "../SnackbarProvider";

const MainLayout = ({ children }) => {
  const {
    props: {
      auth: { isAuthenticated, profile },
      flash,
    },
  } = usePage();
  return (
    <>
      <CssBaseline />
      <SnackbarProvider flash={flash}>
        <Navigation isAuthenticated={isAuthenticated} profile={profile} />
        <Container sx={{ marginTop: 10 }}>
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) {
              return null;
            }

            return React.cloneElement(child);
          })}
        </Container>
      </SnackbarProvider>
    </>
  );
};

export default MainLayout;
