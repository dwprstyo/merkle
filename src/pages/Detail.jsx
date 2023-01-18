import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const theme = createTheme();

export default function Detail() {
  const baseUrl = useSelector((state) => state.baseUrl);
  const params = useParams();
  const [user, setUser] = useState({
    id: 0,
    email:'',
    username:'',
    password:'',
    name:{
        firstname:'',
        lastname:''
    },
    address:{
        city:'',
        street:'',
        number: 0,
        zipcode:'',
        geolocation:{
            lat:'',
            long:''
        }
    },
    phone:''
});

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    const { id } = params;
    axios
      .get(`${baseUrl}/users/${id}`)
      .then((res) => {
        const data = res.data
        setUser(data);
      })
      .catch((err) => {});
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Home
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
              <Grid item  xs={12} sm={12} md={12}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {user.name.firstname} {user.name.lastname}
                    </Typography>
                    <Typography>
                      City : {user.address.city}
                      <br />
                      Street : {user.address.street}
                      <br />
                      Number : {user.address.number}
                      <br />
                      Zip Code : {user.address.zipcode}
                      <br />
                      Phone : {user.phone}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
