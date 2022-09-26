import React from 'react'

const HostelCard = ({ data, deleteHostel, user }) => {
    return (
        <>
            {data.map((element) => {
                return (
                    <>
                        {/* <td>{element.hostel_id}</td>
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
                        <td>{element.state}</td> */}

                    
                            <div className='col-md-3 offset-md-1 mt-1 mb-3'>
                                <div class="card" key={element.hostel_id} style={{ width: "20rem" }}>
                                    <img src="http://localhost:8080/uploads/a06fa97a-7b24-4aee-8a09-802c25699392undefined.png" class="card-img-top" alt="Image"></img>
                                    <div class="card-body">
                                        <h5 class="card-title">{element.name}</h5>
                                        <p class="card-text">Requirement : {element.requirement}<br></br>City : {element.city} <br></br> Rent :  {element.room_fee}</p>
                                        <a href={"/hostel/" + element.hostel_id} class="btn btn-primary">Details</a>
                                    </div>
                                </div></div>
                    </>
                )
            })}
        </>
    )
}
export default HostelCard;