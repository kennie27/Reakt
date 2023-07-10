import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <div className="Sidebar">
      <h1>Fiscall</h1>
      <Link to="/Dashboard">Dashboard</Link>
      <Link to="/Profile">Profile</Link>
      <Link to="/Expenses">Expenses</Link>
      <Link to="/Income">Income</Link>
    </div>
  );
}

export default Sidebar;
