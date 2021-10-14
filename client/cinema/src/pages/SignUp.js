import "../App.css";

function SignUpComp() {
  return (
    <div className='App'>
      <form action="#" method='POST'>
        <h2>SignUp</h2>
        <label for="username">Username: </label>
        <input type='text' name='username'/><br/>
        <label for="password">Password: </label>
        <input type='text' name='password'/><br/>
        <input type='submit' value="Create"/><br/>
      </form>
    </div>
  );
}

export default SignUpComp;
