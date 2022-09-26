import "./App.css";
import { useState } from "react";
import jwtDecode from "jwt-decode";
import Navbar from "./component/Nav";
import Routing from "./component/routing/Routing";
import setAuthToken from "./component/Auth/setAuthToken";

let logUser;
if (localStorage.token) {
  const jwt = localStorage.getItem("token");
  setAuthToken(jwt);
  logUser = jwtDecode(jwt);
}

function App() {
  const [user, setUser] = useState(logUser);
  return (
    <div>
      <Navbar user={user} />
      <Routing user={user} />
    </div>
  );
}

export default App;
