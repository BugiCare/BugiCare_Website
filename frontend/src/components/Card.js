import "../css/card.scss";
import {useNavigate} from "react-router-dom";

export const Card = ({board_id, name, address, content, img_url, username, date}) => {
    const navigate = useNavigate();
    return (
        <div className="card-wrapper" onClick={() => {
            navigate(`/board/${board_id}`)
        }}>
            <div className="card-body-img">
                <img src={img_url}/>
            </div>
            <div className="card-body-text">
                <div className="card-body-text-title">{name}</div>
                <div className="card-body-text-content">{address}</div>
                <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
                <div className="username">{username}</div>
                <div className="date">{date}</div>
            </div>
        </div>
    );
};