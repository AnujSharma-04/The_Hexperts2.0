const Login = () => {
    return (
      <div className="container mx-auto text-center mt-10">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        <input type="text" placeholder="Username" className="border p-2 mt-4" />
        <input type="password" placeholder="Password" className="border p-2 mt-2" />
        <button className="bg-blue-500 text-white p-2 mt-4">Login</button>
      </div>
    );
  };
  
  export default Login;
  