import React from 'react'

const HostelTable = ({data,deleteHostel,user}) => {
    return (
        <>
            {data.map((element) => {
                return (
                    <tr key={element.hostel_id}>
                        <td>{element.hostel_id}</td>
                        <td>{element.namefirst}</td>
                        <td>{element.name}</td>
                        <td>{element.total_rooms}</td>
                        <td>{element.available_rooms}</td>
                        <td>{element.requirement}</td>
                        <td>{element.no_of_singlebed}</td>
                        <td>{element.no_of_doublebed}</td>
                        <td>{element.room_fee}</td>
                        <td>{element.canteen_fee}</td>
                        <td>{element.city}</td>
                        <td>{element.state}</td>
                        <td>
                            {/* <a href={"http://localhost:3000/hostel/"+element.hostel_id}> */}
                            <a href={"/hostel/" + element.hostel_id}>
                                <button className="btn btn-dark">Details</button>
                            </a>
                        </td>{user && (user.role === 4 || user.role === 1) && <>
                            <td>
                                <a href={"/hostel/update/" + element.hostel_id}>
                                    <button className="btn btn-success">Update</button>
                                </a>
                            </td>
                            <td>
                                <a>
                                    <button className="btn btn-danger" onClick={() => { deleteHostel(element.hostel_id) }}>Delete</button>
                                </a>
                            </td></>}
                    </tr>
                )
            })}
        </>
    )
}

export default HostelTable