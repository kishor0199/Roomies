import "../../css/chatbox.css";
import chatlogo from "../../images/chat.png";
import io from "socket.io-client"
import { useEffect, useState } from "react";



const socket = io.connect("http://localhost:4000");

let newchat=[];

function MessageBox({ oname,uname }) {
  
  let user = {
    user:uname,
    message: "",
  };


  let [data, setMessage] = useState(user);
  let [chat,setChat]=useState(newchat);

  useEffect(() => {
    // action on update of movies
}, [chat]);

  function onChange(e) {
    let name = e.target.name;
    let value = e.target.value;
     data = { ...user, [name]: value };
    setMessage(data);
    console.log(data);
  }

  function sendMessage(m) {
    let msg = {
      user: uname,
      message: m.trim(),
    };
    //Append Message
    console.log("in send message")
    appendMessage(msg, "outgoing");
    scrollToBottom();
    //send to server
    socket.emit("message", msg);
  }

  socket.on('message',(message)=>{
    console.log(message)


    setChat(e=>([...chat,message]))

    console.log("incoming message")
    
    
  //  appendMessage(message,"incoming");
  
    scrollToBottom()
  
  })

  function appendMessage(msg, type) {
    let messageArea = document.querySelector(".message_area");
    let mainDiv = document.createElement("div");
    let className = type;
    mainDiv.classList.add(className, "message");
    let user;
    type === "outgoing" ? (user = "you") : (user = uname);
    console.log(user);

    mainDiv.innerHTML = `
    <h4>${user}</h4>
    <p>${msg.message}</p>
`;

    messageArea.appendChild(mainDiv);
    console.log("inappend message")
  }


  function scrollToBottom() {
    let messageArea = document.querySelector(".message_area");
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  const pressEnter = (e) => {
    if (e.key === "Enter") {
      console.log("key press");
      sendMessage(e.target.value);
      setMessage(user);
    }
  };


  return (
    <div>
      <section class="chat_section">
        <div class="brand">
          <img height="40" src={chatlogo} alt="img not found" />
          <h1>{oname}</h1>
        </div>
        <div class="message_area">
        {
            chat.length!==0 && chat.map((element,index)=>{
              return(
               <div className="incoming message" key={index}>
                  <h4>{element.user}</h4>
                   <p>{element.message}</p>
                </div>
                )
              })
          }
        </div>
        <div>
          <textarea
            id="textarea"
            cols="30"
            rows="1"
            name="message"
            placeholder="Write a message"
            onChange={onChange}
            value={data.message}
            onKeyUp={pressEnter}
          ></textarea>
        </div>
      </section>
    </div>
  );
}

export default MessageBox;
