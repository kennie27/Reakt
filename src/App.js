import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './Pages/Login';
import Registration from './Pages/Registration';

import { BrowserRouter, Routes,Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/profile";
import Expenses from "./Pages/Expenses";
import Income from "./Pages/Income";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/"element={<Login/>}/>
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Profile" element={<Profile/>}/>
      <Route path="/Expenses" element={<Expenses/>}/>
      <Route path="/Income" element={<Income/>}/>
      <Route path="/Registration" element={<Registration/>}/>
      </Routes>
    </BrowserRouter>
 
  );
}

export default App;
