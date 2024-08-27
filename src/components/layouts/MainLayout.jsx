import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { usePage } from "@inertiajs/react";
import Navbar from "../Navbar";
import Navigation from "../Navbar/Navigation";
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
        <Navigation>
          <Navbar isAuthenticated={isAuthenticated} profile={profile} />
        </Navigation>
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
