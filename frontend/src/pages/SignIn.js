function SignIn() {
  return (
    <div>
      <form method="POST" action="http://localhost:5000">
        <input type="text" />
        <input type="password" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default SignIn;
