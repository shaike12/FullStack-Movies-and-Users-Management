import "./App.css";
import LoginComp from "./pages/Login";
import SignUpComp from "./pages/SignUp";
import { Route, Switch, useHistory } from "react-router-dom";
import MainPageComp from "./pages/MainPage";
import { Container } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage["authUser"]) {
      
      dispatch({ type: "LOGIN", payload: localStorage["authUser"] });
    }
    else {
      history.push("/login");
    }
  }, [auth]);

  return (
    <div className='App'>
      <Container>
        <Switch>
          <Route exact path='/' component={LoginComp} />
          <Route path='/login' component={LoginComp} />
          <Route path='/signup' component={SignUpComp} />
          <Route path='/main' component={MainPageComp} />
        </Switch>
      </Container>
    </div>
  );
}

export default App;
