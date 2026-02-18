import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import withAuth from "../Utils/Auth";
import { AuthContext } from "../contexts/contexts.jsx";
import "../App.css";

function Home() {
    const [meetingCode, setMeetingCode] = useState("");
    const [profileLabel, setProfileLabel] = useState("");
    const navigate = useNavigate();
    const { getUserProfile } = useContext(AuthContext);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await getUserProfile();
                const displayName = profile?.username || profile?.name || "";
                setProfileLabel(displayName);
            } catch (err) {
                console.log(err);
            }
        };

        fetchProfile();
    }, []);

    const handleJoinVideoCall = () => {
        if (!meetingCode?.trim()) return;
        navigate(`/${meetingCode}`);
    };

    return (
        <div className="HomePage">
            <div className="navBar">
                <div className="homeBrandWrap">
                    <h2 className="homeBrand">Meet Up</h2>
                </div>

                <div className="homeNavActions">
                    <Typography
                        variant="body1"
                        sx={{ color: "#eaf2ff", fontWeight: 600, display: "flex", alignItems: "center", gap: 0.75,fontSize:"1.2rem" }}
                    >
                        {profileLabel ? (
                            <>
                                <AccountCircleOutlinedIcon fontSize="small" />
                                {`Hi, ${profileLabel}`}
                            </>
                        ) : (
                            ""
                        )}
                    </Typography>

                    <Button
                        className="logoutBtn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            navigate("/auth");
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                <div className="leftPanel">
                    <div>
                        <h2>Delivering High-Quality Video Calls, Just Like Being There</h2>

                        <div className="meetingActions">
                            <TextField
                                onChange={(e) => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Meeting Code"
                                variant="outlined"
                                className="meetingCodeInput"
                            />
                            <Button onClick={handleJoinVideoCall} variant="contained">
                                Join
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Home);
