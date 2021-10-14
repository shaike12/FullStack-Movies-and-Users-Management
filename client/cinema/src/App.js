import "./App.css";
import LoginComp from "./pages/Login";
import SignUpComp from "./pages/SignUp";
import { Route, Switch } from "react-router-dom";
import MainPageComp from "./pages/MainPage";


function App() {
  return (
    <div className='App'>
      <Switch>
        <Route path='/login' component={LoginComp} />
        <Route path='/signup' component={SignUpComp} />
        <Route path='/main' component={MainPageComp} />
      </Switch>
    </div>
  );
}

export default App;
