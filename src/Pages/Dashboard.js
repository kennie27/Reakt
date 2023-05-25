import Sidebar from "../Components/Sidebar"
function Dashboard(){
    return(
        <div className="Dashboard">
            <Sidebar/>
            <div className="viewplane">
                <h1>Dashboard</h1>
                <div className="top">
                    <div className="topleft"></div>
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