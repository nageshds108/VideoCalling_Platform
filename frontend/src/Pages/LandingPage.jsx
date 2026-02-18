import "../App.css"
import { useNavigate } from "react-router-dom";

function LandingPage() {
    const navigate = useNavigate();

    return (<>
    <div className="LandingPage">
<div className="LandingHead">
    <div><h1>MeetUp Video Call</h1></div>
    <div className="nav-links">
        <p onClick={() => {
                        navigate("/guest")
                    }}>Join as Guest</p>
        <p onClick={() => navigate("/home")}>Register</p>
        <button onClick={() => navigate("/home")}>Login</button>
    </div>
</div>
<div className="LandingMain">
    <div>
        <h1><span style={{color:"#ff9839"}}>Connect</span> with your <br />Loved Ones</h1>
        <p>Cover a distance with MeetUp video call</p>
        <button onClick={() => navigate("/home")}>Get started</button>
    </div>
    <div>
        <img src="/mobile.png" alt="img" />
    </div>

</div>
</div>

    </> );
}

export default LandingPage;
