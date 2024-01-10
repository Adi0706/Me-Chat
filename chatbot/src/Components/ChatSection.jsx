import React from 'react'

function ChatSection() {


  const getReply = async () => {

    const  options = {
      method : "POST",
      body:JSON.stringify({
        message:"May I help You ?"
      }),
      header:{
        "Content-Type" : "application/json"
      }
    } 


    try{
     const response = await fetch('http://localhost:8000/messages',options)
     const data = await  response.json()
     console.log(data)
    }catch(error){
      console.log(error)
    }

  }

  return (
    <>
   

   <div className="heading-container">
   <h1 > KOMTRAKT-CHATBOT </h1> 
   <button> + NEW CHAT</button>
   </div>
         <div className='chat-container'>
         <h1>CHATS</h1>
              <div className='input-area'>
                <input/>
                <button onClick={getReply}> SEND </button>
              </div>
            </div>    
    </>
  )
}

export default ChatSection