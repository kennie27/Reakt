import Sidebar from "../Components/Sidebar"
import {FaAirbnb, FaFacebook, FaTwitter} from "react-icons/fa"
function Dashboard(){
    return(
        <div className="Dashboard">
            <Sidebar/>
            <div className="viewplane">
                <h1>Dashboard</h1>
                <div className="top">
                    <div className="topleft">
                        <FaFacebook/>
                        <FaTwitter/>
                        <FaAirbnb/>
                    </div>
                    <div className="topmid"></div>
                    <div className="topright"></div>
                </div>
                <div className="bottom">
                    <div className="bottomleft"></div>
                    <div className="bottomright"></div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard