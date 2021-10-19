import { TextField, FormGroup, Button, Link, Box } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import "../App.css";

function LoginComp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useHistory()
    const dispatch = useDispatch()


  const login = async () => {
    setError("")
      let resp = await axios.get("http://localhost:4000/api/users")
      let allUsers = resp.data
      let user = allUsers.find(user => user.username === username)
      if (user && user.password === password){
        dispatch({type: "LOGIN", payload: user})
        history.push("/main")

      }
      else {
        setError('Username/Password is Incorrect')
      }

  }

  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { m: 1 },
        margin:"0 auto",maxWidth: "600px", textAlign: "center"
      }}
    >
      <FormGroup>
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
        {error && <span>{error}</span>}
        <br />
      </FormGroup>
        <Button variant="contained" onClick={login}>Login</Button><br/><br/>
        New User ? : <Link href='#'>Create Account</Link>
    </Box>
  );
}

export default LoginComp;
