import "../css/textArea.scss";

const TextArea = ({ auth,setName,setAddress,setGender,setAge,setPhone,setCenter, name,address,gender,age, phone,center }) => {
    console.log("누구인가? ",auth)
    return (
        auth ==="manager"?
        <div className="textArea-wrapper">
            <div className="manager-text">
                이름 : &nbsp;
                <input
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="manager-input"
                    placeholder="이름을 입력하세요"
                    value={name}/>
            </div>
            <div className="manager-text">
                소속 : &nbsp;
                <input
                    onChange={(e) => {
                        setCenter(e.target.value);
                    }}
                    className="manager-input"
                    placeholder="센터 이름을 입력하세요"
                    value={center}/>
            </div>
            <div className="manager-text">
                번호 : &nbsp;
                <input
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    className="manager-input"
                    placeholder="핸드폰 번호를 입력하세요"
                    value={phone}/>
            </div>
        </div>
            :
            <div className="textArea-wrapper">
                <input
                    onChange={(e) => {
                        setName(e.target.value);
                    }}
                    className="user-input"
                    placeholder="이름을 입력하세요"
                    value={name}
                />
                <input
                    onChange={(e) => {
                        setGender(e.target.value);
                    }}
                    className="user-input"
                    placeholder="성별을 입력하세요"
                    value={gender}
                />
                <input
                    onChange={(e) => {
                        setAge(e.target.value);
                    }}
                    className="user-input"
                    placeholder="나이를 입력하세요"
                    value={age}
                />
                <input
                    onChange={(e) => {
                        setAddress(e.target.value);
                    }}
                    className="user-input"
                    placeholder="주소를 입력하세요"
                    value={address}
                />
                <input
                    onChange={(e) => {
                        setPhone(e.target.value);
                    }}
                    className="user-input"
                    placeholder="번호를 입력하세요"
                    value={phone}
                />
                {/*<textarea
                    onChange={(e) => {
                        setContent(e.target.value);
                    }}
                    className="text"
                    placeholder="내용을 입력하세요"
                    value={content}
                />*/}
            </div>
    );
};
export default TextArea;