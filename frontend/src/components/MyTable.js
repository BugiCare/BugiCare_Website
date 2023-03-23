import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/myTable.scss';


const MyTable =({username,address, board_id,img_url})=>{

    const CommonTableHead = props => {
        const { headersName, children } = props;
        return (
            <table className="common-table">
                <thead>
                <tr>
                    {headersName.map((item, index) => {
                            return (
                                <td className="common-table-header-column" key={index}>{ item }</td>
                            )
                    })}
                </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
            </table>
        )
    }
    const CommonTableColumn = ({ children }) => {
        return (
            <td className="common-table-column" >
                {children}
            </td>
        )
    }
    const CommonTableRow = ({ children,event }) => {
        const navigate = useNavigate();
        const goRouteId = (board_id) => {
            console.log("클릭됨")
            navigate(`/board/${board_id}`);
        }
        return (
            <tr onClick={()=>{goRouteId(event)}} className="common-table-row">
                {children}
            </tr>
        )
    }
    return(
        <>
            <CommonTableRow key={board_id} event={board_id} >
                <CommonTableColumn>{ <img src={img_url}/> }</CommonTableColumn>
                <CommonTableColumn>{ username }</CommonTableColumn>
                <CommonTableColumn>{ address }</CommonTableColumn>
            </CommonTableRow>
        </>
    )

}

export default MyTable;
