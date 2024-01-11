import React, { useEffect, useState } from 'react';

function ChatSection() {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [firstPrompt, setFirstPrompt] = useState(true);

  const getReply = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        message: value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const response = await fetch('http://localhost:8000/messages', options);
      const data = await response.json();
      setMessages(data.choices[0].message);
      setFirstPrompt(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!currentTitle && value && messages) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && messages) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: 'user',
          content: value,
        },
        {
          title: currentTitle,
          role: messages.role,
          content: messages.content,
        },
      ]);
      setValue(''); 
    }
  }, [messages, currentTitle]); 

  const createNewChat = () => {
    setMessages(null);
    setValue('');
    setCurrentTitle(null);
    setPreviousChats([]);
    setFirstPrompt(true);
  };
  

  return (
    <>
      <div className="heading-container">
        <h1> CHATBOT VER: 1.0 </h1>
        <button onClick={createNewChat}> + NEW CHAT</button>
      </div>
      <div className="chat-container">
        <h1>{firstPrompt ? 'Start Your New Chat here ' : currentTitle}</h1>
        <div className="chat-area">
          {previousChats.map((chat, index) => (
            <div key={index} className={chat.role === 'user' ? 'user-message' : 'chatgpt-message'}>
              {chat.content}
            </div>
          ))}
        </div>
        <div className="input-area">
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={getReply}> SEND </button>
        </div>
      </div>
    </>
  );
}

export default ChatSection;
