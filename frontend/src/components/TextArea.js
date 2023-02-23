import "../css/textArea.scss";

const TextArea = ({ setName,setAddress, setContent, name,address, content }) => {
    return (
        <div className="textArea-wrapper">
            <input
                onChange={(e) => {
                    setName(e.target.value);
                }}
                className="title"
                placeholder="이름을 입력하세요"
                value={name}
            />
            <input
                onChange={(e) => {
                    setAddress(e.target.value);
                }}
                className="title"
                placeholder="주소를 입력하세요"
                value={address}
            />
            <textarea
                onChange={(e) => {
                    setContent(e.target.value);
                }}
                className="text"
                placeholder="내용을 입력하세요"
                value={content}
            />
        </div>
    );
};
export default TextArea;