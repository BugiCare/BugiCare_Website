import "../css/profileCard.scss";
import {useNavigate} from "react-router-dom";

export const ProfileCard = ({managerName,  img_url, date}) => {
    const navigate = useNavigate();
    return (
        <div className="profile-wrapper">
            <div className="profile-body-img">
                <img src={img_url}/>
            </div>
            <div className="profile-body-text">
                <div className="profile-body-text-subtitle">[사회 복지사]</div>
                <div className="profile-body-text-title">{managerName}</div>
            </div>

            <div className="profile-footer">
                <div className="date">{date}</div>
            </div>
        </div>
    );
};