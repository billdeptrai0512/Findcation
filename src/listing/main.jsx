import { AnimatePresence } from "framer-motion";
import { useState } from "react"
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./listing.module.css"
import Header from "./header"
import Footer from "./footer/main"
import Suggestion from "./suggestion";


export default function Listing() { 

    const navigate = useNavigate();

    const steps = ["title", "type-of-house", "images", "features", "price", "location" ];

    const totalSteps = steps.length - 1;

    const [start, setStart] = useState(false)
    const [page, setPage] = useState(0);
    const [openSuggestions, setOpenSuggestions] = useState(false);

    const [stepValidity, setStepValidity] = useState(() =>
        steps.reduce((acc, step) => {
            acc[step] = false;
            return acc;
        }, {})
    );

    const percentage = Math.round((page / totalSteps) * 100);

    const getStart = () => {

        setStart(true)
        navigate(`/list-staycation/${steps[0]}`);

    }
  
    const goNext = () => {
        if (page < totalSteps) {
          const newPage = page + 1;
          setPage(newPage);
          navigate(`/list-staycation/${steps[newPage]}`);
        }
    };
    
    const goBack = () => {
        if (page === 0) {
            setStart(false)
            navigate(`/list-staycation`);    
        };

        if (page > 0) {
          const newPage = page - 1;
          setPage(newPage);
          navigate(`/list-staycation/${steps[newPage]}`);
        }
    };
    
    return (
            
        <div className={styles.listingContainer}>

            <Header page={page} setOpenSuggestions={setOpenSuggestions} />

            <AnimatePresence mode="wait">
                <Outlet context={{ setStepValidity, currentStep: steps[page], goNext }} />
            </AnimatePresence>

            {openSuggestions && <Suggestion currentStep={steps[page]} setOpenSuggestions={setOpenSuggestions} />}
            
            <Footer start={start} 
                    getStart={getStart} goNext={goNext} goBack={goBack} 
                    percentage={percentage} page={page} steps={steps} 
                    stepValidity={stepValidity} />

        </div>   

    )
}

// air bnb ask for title after asking for image
// title + type of house / address + location 

//not sure - would get complicate and require to confirm number of room ?
//what happens if the owner have the full house for rent each room seperately
// const renderRoomSetUp = () => { // 2 options: house or apartment

//     //It depend if user choose full_house or many room inside a house

//     return (
//         <div className={styles.pageContent}>
//             <h1 style={{marginBottom: "4px"}}>Hãy bắt đầu từ những điều cơ bản</h1>

//             <div>
//                 <div className={styles.intrustion} style={{paddingTop: "24px", fontWeight: "600"}}>
//                     Bao nhiêu người có thể ở tại đây?
//                 </div> 
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #ccc", alignItems: "center"}}>
//                     <p style={{fontSize:"16px"}}>Khách</p>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#222222" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #ccc", alignItems: "center"}}>
//                     <p>Phòng ngủ</p>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#EBEBEB" strokeWidth={1} style={{ cursor: "pointer" }}/>    
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #ccc", alignItems: "center"}}>
//                     <p>Giường</p>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//                 {/* bathroom will be depend on full house or rooms  */}
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", alignItems: "center"}}>
//                     <p>Phòng tắm</p>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <div className={styles.intrustion} style={{padding: "24px 0", fontWeight: "600"}}>
//                     Có phải mỗi phòng ngủ đều có một ổ khóa?
//                 </div> 
//                 <div style={{display: "flex", gap: "24px", flexDirection: "column"}}>
//                     <label style={{display: "flex", alignItems: "start", gap: "8px"}}>
//                         <input type="checkbox" name="rooms-privacy" value="yes" />
//                         Có
//                     </label>
//                     <label style={{display: "flex", alignItems: "start", gap: "8px"}}>
//                         <input type="checkbox" name="rooms-privacy" value="no" />
//                         <div style={{position: "relative"}}>
//                             Không
//                             <span className={styles.intrustion} style={{paddingBottom: "24px", color: "#6A6A6A", fontSize: "13px"}}>
//                                 Khách mong muốn phòng phải có ổ khóa riêng. Tụi mình đặc biệt khuyên bạn nên bổ sung khóa.
//                             </span>
//                         </div>
//                     </label>
//                 </div>
//             </div>
//         </div>
//     )
// }

// const renderBathRoomSetUp = () => { // 2 options: house or apartment

//     //It depend if user choose full_house or many room inside a house

//     return (
//         <div className={styles.pageContent}>
//             <h1 style={{marginBottom: "24px", fontSize: "30px"}}>Khách có thể sử dụng loại phòng tắm nào?</h1>

//             <div>
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #ccc", alignItems: "center"}}>
//                     <div>
//                         <h4 style={{margin: "4px 0"}}>Riêng và khép kín</h4>
//                         <p style={{fontSize: "14px", color: "#6A6A6A"}}>Phòng tắm có đường đi đến phòng của khách và chỉ dành cho khách</p>
//                     </div>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#222222" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", borderBottom: "1px solid #ccc", alignItems: "center"}}>
//                     <div>
//                         <h4 style={{margin: "4px 0"}}>Riêng</h4>
//                         <p style={{fontSize: "14px", color: "#6A6A6A"}}>Đó là không gian riêng nhưng cần đi qua khu vực chung, như hành lang, để vào được.</p>
//                     </div>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#EBEBEB" strokeWidth={1} style={{ cursor: "pointer" }}/>    
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//                 <div style={{display:"flex", justifyContent: "space-between", padding: "24px 0", alignItems: "center"}}>
//                     <div>
//                         <h4 style={{margin: "4px 0"}}>Chung</h4>
//                         <p style={{fontSize: "14px", color: "#6A6A6A"}}>Dùng chung với người khác</p>
//                     </div>
//                     <div style={{display:"flex", justifyContent: "space-between", gap:"16px", alignItems: "center"}}>
//                         <CircleMinus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                         <p>0</p>
//                         <CirclePlus size={35} color="#B0B0B0" strokeWidth={1} style={{ cursor: "pointer" }}/>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// //it needed, but where to display - even airbnb not display it
// const renderPeopleYouMayMeet = () => { // 2 options: house or apartment

//     //TODO - Click behaivor - style border -> boxShadow
//     return (
//         <div className={styles.pageContent}>
//             <h1 style={{marginBottom: "4px"}}>Những ai khác có thể có mặt tại chỗ ở?</h1>
//             <div className={styles.intrustion} style={{paddingBottom: "8px", color: "#6A6A6A"}}>
//                 Khách cần biết liệu họ có chạm mặt người khác trong thời gian ở hay không.
//             </div>
//             <div className={styles.house_type_box}>
//                 <div className={styles.house_type_option}>
//                     <div>
//                         <h4>Tôi</h4>
//                     </div>
//                     <UserRound size={32} className={styles.house_type_icon} />
//                 </div>
//                 <div className={styles.house_type_option}>
//                     <div>
//                         <h4>Gia đình tôi</h4>
//                     </div>
//                     <Users size={32} className={styles.house_type_icon} />
//                 </div>
//                 <div className={styles.house_type_option}>
//                     <div>
//                         <h4>Khách khác</h4>
//                     </div>
//                     <UsersThree size={40} className={styles.house_type_icon} />
//                 </div>
//             </div>
//             <div className={styles.intrustion} style={{paddingTop: "24px", color: "#6A6A6A"}}>
//                 Bọn mình sẽ hiển thị thông tin này trên mục cho thuê của bạn và trong kết quả tìm kiếm.
//             </div>
//         </div>
//     )
// }





