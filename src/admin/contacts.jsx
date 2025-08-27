import { Link } from "react-router-dom";
import { useState } from "react"
import FacebookIcon from "../assets/facebook.png"
import InstagramIcon from "../assets/instagram.png"
import ZaloIcon from "../assets/zalo.png"
import axios from "axios";

export default function Contacts({staycation, setStaycation}) {

    const [facebookCode, setFacebookCode] = useState("")
    const [instagramCode, setInstagramCode] = useState("")
    const [zaloCode, setZaloCode] = useState("")
    const [facebookError, setFacebookError] = useState("");
    const [instagramError, setInstagramError] = useState("");
    const [zaloError, setZaloError] = useState("");

    const confirmSocialMedia = async (id, name, code) => {

        try {
            const response = await axios
                .patch(`${import.meta.env.VITE_BACKEND_URL}/listing/staycation/${id}/verify`,
                    {
                        name,
                        code
                    },
                    {
                    headers: {
                        "ngrok-skip-browser-warning": "true",
                    },
                })
                .then((res) => res.data);

            console.log(response);
            setStaycation(response.staycation);
            if (name === "facebook") setFacebookError("");
            if (name === "instagram") setInstagramError("");
            if (name === "zalo") setZaloError("");

        } catch (error) {
            console.error("Error fetching staycation:", error);
            const message = error.response?.data?.message || "Something went wrong";
      
            if (name === "facebook") setFacebookError(message);
            if (name === "instagram") setInstagramError(message);
            if (name === "zalo") setZaloError(message);
        }
    }

    return (
    
        <div style={{display: "flex", flexDirection: "column", margin: "2em", justifyContent:"center"}}>

            {facebookError && <span style={{color: "red", fontSize: "0.9rem"}}>{facebookError}</span>}
            <div style={{display: "flex", justifyContent:"space-between", gap: "4px",  padding: '16px 0'}}> 
                <Link to={`https://www.facebook.com/${staycation.contacts.facebook}`} target="_blank" rel="noopener noreferrer">
                    <img src={FacebookIcon} alt="" style={{width:"37px"}} />
                </Link>
                <input type="number" name="facebook" value={facebookCode} onChange={(e) => setFacebookCode(e.target.value)}/>
                <button onClick={() => confirmSocialMedia(staycation.id, "facebook", facebookCode)} disabled={staycation.contacts.facebook.verified} >
                    Confirm
                </button>
            </div>
            {instagramError && <span style={{color: "red", fontSize: "0.9rem"}}>{instagramError}</span>}
            <div style={{display: "flex", justifyContent:"space-between",  gap: "4px", padding: '16px 0'}}>
                <Link to={`https://www.facebook.com/${staycation.contacts.instagram}`} target="_blank" rel="noopener noreferrer">
                    <img src={InstagramIcon} alt="" style={{width:"37px"}} />
                </Link>
                <input type="number" name="instagram" value={instagramCode} onChange={(e) => setInstagramCode(e.target.value)}/>
                <button onClick={() => confirmSocialMedia(staycation.id, "instagram", instagramCode)} disabled={staycation.contacts.instagram.verified} >
                    Confirm
                </button>
            </div>

            {zaloError && <span style={{color: "red", fontSize: "0.9rem"}}>{zaloError}</span>}
            <div style={{display: "flex", justifyContent:"space-between",  padding: '16px 0 0'}}>
                <Link to={`https://www.facebook.com/${staycation.contacts.zalo}`} target="_blank" rel="noopener noreferrer">
                    <img src={ZaloIcon} alt="" style={{width:"37px"}} />
                </Link>
                <input type="number" name="zalo" value={zaloCode} onChange={(e) => setZaloCode(e.target.value)}/>

                <button onClick={() => confirmSocialMedia(staycation.id, "zalo", zaloCode)} disabled={staycation.contacts.zalo.verified} >
                    Confirm
                </button>
                

            </div>
        </div>
    )
}