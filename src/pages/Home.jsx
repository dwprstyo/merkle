import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
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

const theme = createTheme();

export default function Home() {
  const baseUrl = useSelector((state) => state.baseUrl);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAll();
  });

  const getAll = () => {
    axios
      .get(`${baseUrl}/users?limit=6`)
      .then((res) => {
        setUsers(res.data);
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
            {users.map((data, key) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {data.name.firstname} {data.name.lastname}
                    </Typography>
                    <Typography>
                      City : {data.address.city}
                      <br />
                      Street : {data.address.street}
                      <br />
                      Number : {data.address.number}
                      <br />
                      Zip Code : {data.address.zipcode}
                      <br />
                      Phone : {data.phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">View</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
