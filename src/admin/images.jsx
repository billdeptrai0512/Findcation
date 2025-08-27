export default function Image({staycation}) {
    return (
        <div style={{maxWidth:"300px", display: "flex", justifyContent: "center"}}>
            <img src={`${import.meta.env.VITE_BACKEND_URL}${staycation.images[0]}`} alt="cover_photo"  style={{width: "100%", borderRadius:"8px", objectFit: "contain"}} />
        </div>
    )
}