import "../App.css";

function LoginComp() {
  return (
    <div className='App'>
      <form action="#" method='POST'>
        <h2>Login</h2>
        <label for="username">Username: </label>
        <input type='text' name='username'/><br/>
        <label for="password">Password: </label>
        <input type='text' name='password'/><br/>
        <input type='submit' value="Login"/><br/>
        New User ? : <a href="#">Create Account</a>
      </form>
    </div>
  );
}

export default LoginComp;
