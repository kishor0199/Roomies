import React from 'react'

const FlatTable = ({ data, user, deleteFlat }) => {
    return (

        data.map((element) => {
            return (
                <tr key={element.flat_id}>
                    <td>{element.flat_id}</td>
                    <td>{element.namefirst}</td>
                    <td>{element.flat_type}</td>
                    <td>{element.no_of_members}</td>
                    <td>{element.requirement}</td>
                    <td>{element.deposite}</td>
                    <td>{element.rent}</td>
                    <td>{element.furnished_type}</td>
                    <td>{element.city}</td>
                    <td>{element.state}</td>
                    <td>
                        <a href={"/flat/" + element.flat_id}>
                            <button className="btn btn-dark">Details</button>
                        </a>
                    </td>{user && (user.role === 4 || user.role === 1) && <>
                        <td>
                            <a href={"/flat/update/" + element.flat_id}>
                                <button className="btn btn-success">Update</button>
                            </a>
                        </td>
                        <td>
                            <a>
                                <button className="btn btn-danger" onClick={() => { deleteFlat(element.flat_id) }}>Delete</button>
                            </a>
                        </td></>}
                </tr>
            )
        }
        )

    )
}

export default FlatTable