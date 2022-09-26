const db=require('../config/db_config')


module.exports.getAllOwnerService=()=>{
    return new Promise((resolve,reject)=>{

        db.query(`select * from owner where isdeleted=0`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.insertOwnerService=(owner)=>{
    let {
      namefirst,
      namelast,
      dob,
      occupation,
      city,
      age,
      gender,
      state,
      email,
    } = owner;
    console.log(owner);
    return new Promise((resolve,reject)=>{
        db.query(`insert into owner(namefirst,namelast,dob,occupation,city,age,gender,state,email,isdeleted) values('${namefirst}','${namelast}','${dob}','${occupation}','${city}','${age}','${gender}','${state}','${email}',0)`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.getOwnerByIdService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select * from Owner where owner_id=${id} and isdeleted=0`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.updateOwnerService= (owner) => {
    let {
      owner_id,
      namefirst,
      namelast,
      dob,
      occupation,
      city,
      age,
      gender,
      state,
      email,
    } = owner;

    console.log(owner)
    return new Promise((resolve, reject) => {
      db.query(
        `update owner set namefirst='${namefirst}',namelast='${namelast}',dob='${dob}',occupation='${occupation}',city='${city}',age=${age},gender='${gender}',state='${state}',email='${email}' where owner_id =${owner_id}`,
        (err, result) => {
          err ? reject(err.message) : resolve(result);
        }
      );
    });
  };



module.exports.deleteOwnerService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`update Owner set isdeleted=1 where owner_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}


module.exports.getOwnerPhonenoService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`select phone from owner_phoneno natural join owner where isdeleted=0 and owner_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.deletePhoneService=(id)=>{
    return new Promise((resolve,reject)=>{
        db.query(`delete from owner_phoneno where owner_id=${id}`,(err,result)=>{
            err?reject(err):resolve(result);
        })
    })
}

module.exports.insertPhonenoByIdService=(owner,id)=>{
    let str;
    let { phone_no1, phone_no2 } = owner;
    console.log(phone_no1, phone_no2)
    return new Promise((resolve, reject) => {
      if (phone_no2 != undefined)
        str = `insert into owner_phoneno(owner_id,phone,isdeleted) values(${id},'${phone_no1}',0),(${id},'${phone_no2}',0)`;
      else
        str = `insert into owner_phoneno(owner_id,phone,isdeleted) values(${id},'${phone_no1}',0)`;
      
        db.query(str,function (err,result){
          err?reject(err):resolve(result.message);
        })
      
      });
}

module.exports.insertPhonenoService=(owner) => {
    let str;
    let { phone_no1, phone_no2 } = owner;
    return new Promise((resolve, reject) => {
      if (phone_no2 != undefined)
        str = `insert into owner_phoneno(owner_id,phone,isdeleted) values((select max(owner_id) from owner),'${phone_no1}',0),((select max(owner_id) from owner),'${phone_no2}',0)`;
      else
        str = `insert into owner_phoneno(owner_id,phone,isdeleted) values((select max(owner_id) from owner),'${phone_no1}',0)`;
      
        db.query(str,function (err,result){
          err?reject(err):resolve(result.message);
        })
      
      });
  };