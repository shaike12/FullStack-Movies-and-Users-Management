import { TextField, FormGroup, Button, Link, Box, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../App.css";



function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const login = async () => {
    setError("");
    let resp = await axios.post("http://localhost:4000/api/auth/login", {username, password});
    console.log(resp)
    let token = resp.data.token;

    if (token) {
      localStorage.setItem("authUser", JSON.stringify({user: resp.data.user, token: token}));
      dispatch({ type: "LOGIN", payload: resp.data.user });
      history.push("/main");
    } else {
      setError(resp.data.message);
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "95%"},
        margin: "0 auto",
        maxWidth: "600px",
        textAlign: "center",
        padding: 10,
      }}
    >
      <FormGroup sx={{ border: 1, padding: 4, marginBottom: 2, minWidth: 300, minHeight: 300, justifyItems: "center"}}>
        <h2>Login</h2>
        <TextField
          label='Username:'
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label='Password:'
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Alert severity='error'>{error}</Alert>} <br />
      </FormGroup>
      <Button variant='contained' onClick={login}>
        Login
      </Button>
      <br />
      <br />
      New User ? <Link href='/signup'>Create Account</Link>
    </Box>
  );
}

export default LoginComp;
