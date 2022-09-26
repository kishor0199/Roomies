const db_config = require("../config/db_config");
const db = require("../config/db_config");

module.exports.getAllUserService = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from user where isdeleted=0", (err, result) => {
      err ? reject(err.message) : resolve(result);
    });
  });
};

module.exports.getUserByIdService = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select * from user where user_id=${id} and isdeleted=0`,
      (err, result) => {
        err ? reject(err.message) : resolve(result);
      }
    );
  });
};

module.exports.getUserPhonenoService = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `select phone from user natural join user_phoneno where  user_Id=${id} and user.isdeleted=0;
        `,
      (err, result) => {
        err ? reject(err.message) : resolve(result);
      }
    );
  });
};

module.exports.insertUserService = (user) => {
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
  } = user;
  return new Promise((resolve, reject) => {
    db.query(
      `insert into user(namefirst,namelast,dob,occupation,city,age,gender,state,email,isdeleted) values('${namefirst}','${namelast}','${dob}','${occupation}','${city}','${age}','${gender}','${state}','${email}',0)`,
      (err, result) => {
        err ? reject(err) : resolve(result.message);
      }
    );
  });
};

module.exports.updateUserService = (user) => {
  let {
    user_id,
    namefirst,
    namelast,
    dob,
    occupation,
    city,
    age,
    gender,
    state,
    email,
  } = user;
  return new Promise((resolve, reject) => {
    db.query(
      `update user set namefirst='${namefirst}',namelast='${namelast}',dob='${dob}',occupation='${occupation}',city='${city}',age=${age},gender='${gender}',state='${state}',email='${email}' where user_id =${user_id}`,
      (err, result) => {
        err ? reject(err.message) : resolve(result.affectedRows);
      }
    );
  });
};

module.exports.deleteUserService = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `update user set isdeleted=1 where  user_id=${id}`,
      (err, result) => {
        err ? reject(err.message) : resolve(result.affectedRows);
      }
    );
  });
};

module.exports.insertPhonenoService = (user) => {
  let str;
  let { phone_no1, phone_no2 } = user;
  return new Promise((resolve, reject) => {
    if (phone_no2 != undefined)
      str = `insert into user_phoneno(user_id,phone,isdeleted) values((select max(user_id) from user),'${phone_no1}',0),((select max(user_id) from user),'${phone_no2}',0)`;
    else
      str = `insert into user_phoneno(user_id,phone,isdeleted) values((select max(user_id) from user),'${phone_no1}',0)`;
    
      db.query(str,function (err,result){
        err?reject(err):resolve(result.message);
      })
    
    });
};


module.exports.deletePhonenoService=(id)=>{
    console.log(id);
    return new Promise((resolve, reject) => {
        db.query(
          `delete from user_phoneno where user_id=${id}`,
          (err, result) => {
            err ? reject(err.message) : resolve(result);
          }
        );
      });

}


module.exports.insertPhonenoByIdService=(user,id)=>{
    let str;
    let { phone_no1, phone_no2 } = user;
    console.log(phone_no1, phone_no2)
    return new Promise((resolve, reject) => {
      if (phone_no2 != undefined)
        str = `insert into user_phoneno(user_id,phone,isdeleted) values(${id},'${phone_no1}',0),(${id},'${phone_no2}',0)`;
      else
        str = `insert into user_phoneno(user_id,phone,isdeleted) values(${id},'${phone_no1}',0)`;
      
        db.query(str,function (err,result){
          err?reject(err):resolve(result.message);
        })
      
      });
}