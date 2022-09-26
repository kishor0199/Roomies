import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Customer from "../Customer/Customer";
import About from "../About";
import CustomerList from "../Customer/CustomerList";
import UpdateCustomer from "../Customer/UpdateCustomer";
import OwnerList from "../Owner/OwnerList";
import Owner from "../Owner/Owner";
import UpdateOwner from "../Owner/UpdateOwner";
import HostelList from "../Hostel/HostelList";
import HostelDetails from "../Hostel/HostelDetails";
import Hostel from "../Hostel/Hostel";
import CustomerHome from "../Customer/CustomerHome";
import UpdateHostel from "../Hostel/UpdateHostel";
import FlatList from "../Flat/FlatList";
import Flat from "../Flat/Flat";
import UpdateFlat from "../Flat/UpdateFlat";
import FlatDetails from "../Flat/FlatDetails";
import Login from "../Auth/Login";
import Logout from "../Auth/Logout";
import RegistrationWindow from "../Auth/RegistrationWindow";
import RegistrationForm from "../Auth/RegistrationForm";
import Profile from "../Customer/Profile";
import MessageWindow from '../Owner/MessageWindow';
import HostelByCity from "../Hostel/HostelByCity";
import FlatByCity from "../Flat/FlatByCity";
const { ProtectedAdminOwnerRoutes, ProtectedAdminUserRoutes, ProtectedOwnerOnlyRoutes, ProtectedUserOnlyRoutes, ProtectedLogInUsersOnlyRoutes } = require("./ProtectedRoutes");


const Routing = ({ user }) => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerHome user={user} />} />
        <Route path="/about" element={<About user={user} />} />
        <Route path="/login" element={<Login user={user} />} />
        <Route path="/logout" element={<Logout user={user} />} />
        <Route path="/register" element={<RegistrationWindow user={user} />} />
        <Route path="/protectedregistration" element={<RegistrationForm user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />

        {/* <Route element={<ProtectedUserOnlyRoutes user={user} />}>
          <Route path="/customer/add" user={user} element={<Customer />} />
        </Route> */}

        <Route element={<ProtectedLogInUsersOnlyRoutes user={user} />}>

          <Route path="/customer/list" element={<CustomerList user={user} />} />
          <Route path="/customer/update/:id" element={<UpdateCustomer user={user} />} />

        </Route>

        <Route element={<ProtectedLogInUsersOnlyRoutes user={user} />}>

          <Route path="/owner/add" element={<Owner user={user} />} />
          <Route path="/hostel/add" element={<Hostel user={user} />} />
          <Route path="/flat/add" element={<Flat user={user} />}></Route>

        </Route>
        <Route element={<ProtectedLogInUsersOnlyRoutes user={user} />}>
          <Route path="/hostel/list" element={<HostelList user={user} />} />
          <Route path="/flat/list" element={<FlatList user={user} />}></Route>
          <Route path="/flat/list/:id" element={<FlatList user={user} />}></Route>
          <Route path="/flat/list/city/:city" element={<FlatByCity user={user} />}></Route>
          <Route path="/hostel/list/:id" element={<HostelList user={user} />} />
          <Route path="/hostel/list/city/:city" element={<HostelByCity user={user} />} />
          <Route path="/hostel/:id" element={<HostelDetails user={user} />} />
          <Route path="/flat/:id" element={<FlatDetails user={user} />}></Route>
          <Route path="/owner/message" element={<MessageWindow user={user} />} />

        </Route>

        <Route element={<ProtectedLogInUsersOnlyRoutes user={user} />}>

          <Route path="/owner/list" element={<OwnerList user={user} />} />
          <Route path="/owner/update/:id" element={<UpdateOwner user={user} />} />
          <Route path="/hostel/update/:id" element={<UpdateHostel user={user} />} />
          <Route path="/deleteHostel/:id" />
          <Route path="/flat/update/:id" element={<UpdateFlat user={user} />}></Route>  
        </Route>

      </Routes>
    </Router>
  );
};

export default Routing;