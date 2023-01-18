import * as React from "react";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";

const theme = createTheme();

export default function Edit() {
  const navigate = useNavigate();
  const baseUrl = useSelector((state) => state.baseUrl);
  const params = useParams();
  const [user, setUser] = useState({
    id: 0,
    email: "",
    username: "",
    password: "",
    name: {
      firstname: "",
      lastname: "",
    },
    address: {
      city: "",
      street: "",
      number: 0,
      zipcode: "",
      geolocation: {
        lat: "",
        long: "",
      },
    },
    phone: "",
  });

  useEffect(() => {
    getUser();
  });

  const getUser = () => {
    const { id } = params;
    axios
      .get(`${baseUrl}/users/${id}`)
      .then((res) => {
        const data = res.data;
        setUser(data);
      })
      .catch((err) => {});
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    user.name.firstname = data.get("firstname")
    user.name.lastname = data.get("lastname")
    user.address.city = data.get("city")
    user.address.street = data.get("street")
    user.address.number = data.get("number")
    user.address.zipcode = data.get("zipcode")
    const { id } = params;
    axios
      .put(`https://fakestoreapi.com/users/${id}`, user)
      .then((res) => {
        console.log(res);
        navigate("/home");
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
            <Grid item xs={12} sm={12} md={12}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="street"
                  name="street"
                  label="Street"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="number"
                  name="number"
                  label="Number"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="zipcode"
                  name="zipcode"
                  label="Zipcode"
                  autoFocus
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Done
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}
