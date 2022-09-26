const db=require("../config/db_config");


module.exports.getAllFlatService=()=>{
    return new Promise((resolve,reject)=>{
        db.query("select f.*,namefirst from flat f,owner o where f.owner_id=o.owner_id and f.isdeleted=0",(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.getAllFlatByCityService=(city)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from flat where city = "${city}"`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.getFlatByIdService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select f.*,o.namefirst,o.namelast  from flat f,owner o where f.owner_id=o.owner_id and flat_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}
module.exports.getFlatByOwnerService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select f.*,o.namefirst,o.namelast  from flat f,owner o where f.owner_id = o.owner_id and f.owner_id = ${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.insertFlatService=(flat)=>{
    console.log("\n"+JSON.stringify(flat));
    const {
        owner_id,
        flat_type,
        requirement,
        no_of_members,
        deposite,
        rent,
        is_wifi_available,
        is_tv_available,
        is_parking_available,
        is_bed_available,
        is_lift_available,
        furnished_type,
        address,
        city,
        state,
        zipcode,
        image1,image2,image3
        }=flat

        console.log(image1 + image2 + image3)

        return new Promise((resolve,reject)=>{
            db.query(`call insertflat(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[owner_id,
                flat_type,requirement,no_of_members,deposite,rent,
                is_wifi_available,is_tv_available,is_parking_available,is_bed_available,
                    is_lift_available,furnished_type,address,city,state,zipcode,1,0,image1,image2,image3],(err,result,fields)=>{
                err?reject(err.message):resolve(result.message);
            })
        })
}


module.exports.updateFlatService=(flat)=>{
    const {
        flat_id,
        flat_type,
        requirement,
        no_of_members,
        deposite,
        rent,
        is_wifi_available,
        is_tv_available,
        is_parking_available,
        is_bed_available,
        is_lift_available,
        furnished_type,
        address,
        city,
        state,
        zipcode,
        image1,image2,image3
        }=flat

        console.log('In Service');
        console.log(flat_id);
    return new Promise((resolve,reject)=>{
        db.query(`call updateflat(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,[flat_id,flat_type,requirement,no_of_members,deposite
        
        ,rent,is_wifi_available,is_tv_available,is_parking_available,is_bed_available,is_lift_available,furnished_type,address,city,state,zipcode,1,0,image1,image2,image3],(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.deleteFlatService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`update flat set isdeleted=1 where flat_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.getAllReviewsService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select id,fr.user_id,namefirst,namelast,review,ratings from flat_review fr,user u where fr.user_id=u.user_id and flat_id=${id} and fr.isdeleted=0`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.updateReviewService=(review_data)=>{
    const {
        review,
        ratings,
        user_id,
        flat_id
    }=review_data
    console.log(review_data);
    return new Promise((resolve,reject)=>{
        db.query(`update flat_review set review='${review}',ratings=${ratings} where user_id=${user_id} and flat_id=${flat_id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.insertReviewService=(review_data)=>{
    const {
        review,
        ratings,
        user_id,
        flat_id
    }=review_data

    console.log(review_data);

    return new Promise((resolve,reject)=>{
        db.query(`insert into flat_review(user_id,flat_id,review,ratings,isdeleted)values(${user_id},${flat_id},'${review}',${ratings},0)`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.deleteReviewService=(review)=>{
    const{
    user_id,flat_id}=review;
    
    return new Promise((resolve,reject)=>{
        db.query(`delete from flat_review where user_id=${user_id} and flat_id=${flat_id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.getDocumentService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select d.document_id,d.name from flat f,flat_documents fd,documents d where fd.document_id=d.document_id and fd.flat_id=f.flat_id and f.flat_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}

module.exports.deleteDocument=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`delete from flat_documents where flat_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}


module.exports.insertDocumentService=async(document)=>{
    const {flat_id,is_adhaar,is_photo,is_pan}=document;
    let str='insert into flat_documents(document_id,flat_id,isdeleted)values';
    return new Promise((resolve,reject)=>{
        if(is_adhaar!=0)
            str=str+`(${is_adhaar},${flat_id},0),`
        if(is_photo!=0)
            str=str+`(${is_photo},${flat_id},0),`
        if(is_pan!=0)
            str=str+`(${is_pan},${flat_id},0);,`
        
        str = str.substring(0, str.length - 1).concat(";")
       
        db.query(str,(err,result)=>{
            err?reject(err):resolve(result)
        })
    })
}


module.exports.insertDocumentByIdService=async(document)=>{
    const {is_adhaar,is_photo,is_pan}=document;
    let flag=0;
    let newid="select max(flat_id) from flat";
     let str='insert into flat_documents(document_id,flat_id,isdeleted)values';
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