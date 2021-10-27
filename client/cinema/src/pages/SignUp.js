import { TextField, FormGroup, Button, Link, Box, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../App.css";

function SignUpComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const signup = async () => {
    setError("");

    if (username === "" || password === "" || confirmPassword === "") {
      setError("Need To Fill All Fields");
      return null;
    }
    if (password !== confirmPassword) {
      setError("Passwords Not Matched");
      return null;
    }
    let resp = await axios.post("http://localhost:4000/api/auth/signup", {
      username,
    });
    !resp.data.auth && setError(resp.data.message);
    let user = resp.data.user;

    if (user) {
      // First Time Signup
      const fetchParams = {
        headers: {
          "x-access-token": resp.data.token,
        },
      };
      try {
        await axios.put(
          `http://localhost:4000/api/users/${user._id}`,
          {
            ...user,
            password: password,
          },
          fetchParams
        );
        localStorage.setItem("authUser", JSON.stringify(resp.data));
        dispatch({ type: "LOGIN", payload: resp.data });
        history.push("/main");
      } catch (err) {
        console.log(err);
      }
    } else {
      setError("Username Not Exists");
    }
  };

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1, width: "95%" },
        margin: "0 auto",
        maxWidth: "600px",
        textAlign: "center",
        padding: 10,
      }}
    >
      <FormGroup
        sx={{
          border: 1,
          padding: 4,
          marginBottom: 2,
          minWidth: 300,
          minHeight: 300,
          justifyItems: "center",
        }}
      >
        <h2>SignUp</h2>
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
        <TextField
          label='Confirm Password:'
          required
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error && <Alert severity='error'>{error}</Alert>} <br />
      </FormGroup>
      <Button variant='contained' onClick={signup}>
        Signin
      </Button>
      <br />
      <br />
      Already a User ? <Link href='/login'>Login</Link>
    </Box>
  );
}

export default SignUpComp;
