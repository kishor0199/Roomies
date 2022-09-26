import React from 'react'

const FaltCard = ({data}) => {
    return (
        data.map((element) => {
            return (
                <div className='col-md-3 offset-md-1 mt-1 mb-3'>
                    <div class="card" key={element.flat_id} style={{ width: "20rem" }}>
                        <img src="http://localhost:8080/uploads/a06fa97a-7b24-4aee-8a09-802c25699392undefined.png" class="card-img-top" alt="Image"></img>
                        <div class="card-body">
                            <h5 class="card-title">{element.flat_type} {element.furnished_type}</h5>
                            <p class="card-text">Requirement : {element.requirement}<br></br>City : {element.city} <br></br> Rent :  {element.rent}</p>
                            <a href={"/flat/" + element.flat_id} class="btn btn-primary">Details</a>
                        </div>
                    </div>
                </div>
            )
        }
        )
    )
}

export default FaltCard