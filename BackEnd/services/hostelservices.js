const db=require("../config/db_config");


module.exports.getAllHostelService=()=>{
    return new Promise((resolve,reject)=>{
        db.query("call gethostels()",(err,result)=>{
            err?reject(err):resolve(result[0]);
        })
    })
}

module.exports.getAllHostelByCityService=(city)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from hostel where city = '${city}' `,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.getHostelByIdService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select h.*,namefirst,namelast from hostel h,owner where h.owner_id=owner.owner_id and h.hostel_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}


module.exports.insertHostelService=(hostel)=>{
    let {
        owner_id,
        name,
        total_rooms,
        available_rooms,
        requirement,
        no_of_singlebed,
        no_of_doublebed,
        is_lift_available,
        is_canteen_available,
        is_tv_available,
        is_ac_available,
        is_wifi_available,
        is_washing_machine_available,
        room_fee,
        canteen_fee,
        address,
        city,
        state,
        zipcode,
        image1,
        image2,
        image3
    }=hostel
    return new Promise((resolve,reject)=>{
        db.query(`call inserthostel(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[owner_id,name,total_rooms,
            available_rooms,requirement,no_of_singlebed,no_of_doublebed,is_lift_available, is_canteen_available,is_tv_available,
            is_ac_available,is_wifi_available,is_washing_machine_available,room_fee,canteen_fee,address,city,state,zipcode,1,0,image1,image2,image3],(err,result,fields)=>{
            err?reject(err.message):resolve(result.message);
        })
    })
}

module.exports.updateHostelService=(hostel)=>{
    let {
        hostel_id,
        name,
        total_rooms,
        available_rooms,
        requirement,
        no_of_singlebed,
        no_of_doublebed,
        is_lift_available,
        is_canteen_available,
        is_tv_available,
        is_ac_available,
        is_wifi_available,
        is_washing_machine_available,
        room_fee,
        canteen_fee,
        address,
        city,
        state,
        zipcode,
        image1,
        image2,
        image3
    }=hostel

    console.log("\nIn Service");
    console.log(state);

    return new Promise((resolve,reject)=>{
        db.query(`call updatehostel(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[hostel_id,name,total_rooms,
        available_rooms,requirement,no_of_singlebed,no_of_doublebed,is_lift_available, is_canteen_available,is_tv_available,
        is_ac_available,is_wifi_available,is_washing_machine_available,room_fee,canteen_fee,address,city,state,zipcode,1,0,image1,image2,image3],
        (err,result,fields)=>{
            err?reject(err.message):resolve(result.message);
        })
    })
}

module.exports.deleteHostelService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`update hostel set isdeleted=1 where hostel_id=${id}`,(err,result)=>{
            err?reject(err.message):resolve(result.message);
        })
    })
}

module.exports.getHostelByOwnerService=(id)=>{
    return new Promise((resolve,reject)=>{
        console.log(id);
        db.query(`select * from hostel where owner_id= ${id} and isdeleted=0`,(err,result)=>{
            err?reject(err.message):resolve(result);
        })
    })
}

module.exports.getAllReviewsService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select id,hr.user_id,namefirst,namelast,review,ratings from hostel_review hr,user u where hr.user_id=u.user_id and hostel_id=${id} and hr.isdeleted=0`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.updateReviewService=(review_data)=>{
    const {
        review,
        ratings,
        user_id,
        hostel_id
    }=review_data

    return new Promise((resolve,reject)=>{
        db.query(`update hostel_review set review='${review}',ratings=${ratings} where user_id=${user_id} and hostel_id=${hostel_id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.insertReviewService=(review_data)=>{
    const {
        review,
        ratings,
        user_id,
        hostel_id
    }=review_data

    return new Promise((resolve,reject)=>{
        db.query(`insert into hostel_review(user_id,hostel_id,review,ratings,isdeleted)values(${user_id},${hostel_id},'${review}',${ratings},0)`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.deleteReviewService=(review)=>{
    const{
    user_id,hostel_id}=review;
    return new Promise((resolve,reject)=>{
        db.query(`delete from hostel_review where user_id=${user_id} and hostel_id=${hostel_id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.getDocumentService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select d.document_id,d.name from hostel h,hostel_documents hd,documents d where hd.document_id=d.document_id and hd.hostel_id=h.hostel_id and h.hostel_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}
module.exports.deleteDocument=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`delete from hostel_documents where hostel_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}

module.exports.insertDocumentService=async(document)=>{
    const {hostel_id,is_adhaar,is_photo,is_pan}=document;
    let str='insert into hostel_documents(document_id,hostel_id,isdeleted)values';
    return new Promise((resolve,reject)=>{
        if(is_adhaar!=0)
            str=str+`(${is_adhaar},${hostel_id},0),`
        if(is_photo!=0)
            str=str+`(${is_photo},${hostel_id},0),`
        if(is_pan!=0)
            str=str+`(${is_pan},${hostel_id},0);,`
        
        str = str.substring(0, str.length - 1).concat(";")
       
        db.query(str,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}


module.exports.insertDocumentByIdService=async(document)=>{
    const {is_adhaar,is_photo,is_pan}=document;
    let flag=0;
    let newid="select max(hostel_id) from hostel";
     let str='insert into hostel_documents(document_id,hostel_id,isdeleted)values';
    return new Promise((resolve,reject)=>{
        console.log(is_adhaar,is_photo,is_pan);
        if(is_adhaar!=0)
        {
            str=str+`(${is_adhaar},(${newid}),0),`
            console.log("adhaar")
            flag=1
        }
        if(is_photo!=0){
            str=str+`(${is_photo},(${newid}),0),`
            console.log("photo")
            flag=1
        }
        
        if(is_pan!=0)
        {
            str=str+`(${is_pan},(${newid}),0);,`
            console.log("pan")
            flag=1
        }
        if(flag===1)
        {
            str = str.substring(0, str.length - 1).concat(";")
       
             db.query(str,(err,result)=>{
                err?reject(err):resolve(result)
              })

        }
        else
        {
            console.log("Error")
        }
    })

}

