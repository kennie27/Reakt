import Sidebar from "../Components/Sidebar";
function Profile() {
  return (
    <div className="Profile">
         <Sidebar/>
        <div className="Profile1">
            <h1>My Profile</h1>
          <div className="Profile2">
            <h1>Personal Information</h1>
            <p>Name: Kennedy Karuga</p>
            <p>Address: 165 Kerugoya</p>
            <p>Contact No: 0707588554</p>

          </div>
          <div className="Profile3">
            <h1>Account Information</h1>
            <p>Bank Account: xxxx-xxxx-xxxx-0034</p>
            <p>Credit Card: xxxx-xxxx-xxxx-2323</p>
            
          </div>
        </div>
    </div>
  );
}

export default Profile;
