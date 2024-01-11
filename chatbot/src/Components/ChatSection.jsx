import React, { useEffect, useState } from 'react'

function ChatSection() {

  const [messages,setMessages] = useState(null) ; 
  const [value,setValue] = useState(null)



  const getReply = async () => {

    const  options = {
      method : "POST",
      body:JSON.stringify({
        message:value
      }),
      headers:{
        "Content-Type" : "application/json"
      }
    } 


    try{
     const response = await fetch('http://localhost:8000/messages',options)
     const data = await  response.json()
     console.log(data)
     setMessages(data.choices[0].message)
    }catch(error){
      console.log(error)
    }

  }

  const createNewChat = () =>{
    setMessages(null)
    setValue("")
  }
  

  return (
    <>
   

   <div className="heading-container">
   <h1 > KOMTRAKT-CHATBOT </h1> 
   <button onClick={createNewChat}> + NEW CHAT</button>
   </div>
         <div className='chat-container'>
         <h1>CHATS</h1>
              <div className='input-area'>
                <input value={value} onChange={(e)=>setValue(e.target.value)}/>
                <button onClick={getReply}> SEND </button>
              </div>
            </div>    
    </>
  )
}

export default ChatSection