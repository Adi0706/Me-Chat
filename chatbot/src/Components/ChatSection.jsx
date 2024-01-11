import React, { useEffect, useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import NavBar from './NavBar';

function ChatSection() {
  const [messages, setMessages] = useState(null);
  const [value, setValue] = useState('');
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [firstPrompt, setFirstPrompt] = useState(true);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    // setLoading(true);

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
    } finally {
      setLoading(false);
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
      ]);

      setTimeout(() => {
        setPreviousChats((prevChats) => [
          ...prevChats,
          {
            title: currentTitle,
            role: messages.role,
            content: messages.content,
          },
        ]);
        setValue('');
      }, 1000); 
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
      <NavBar createNewChat={createNewChat}/>
      <div className="chat-container">
        <h1>CHATS</h1>
        <div className="chat-area">
          {previousChats.map((chat, index) => (
            <div key={index} className={chat.role === 'user' ? 'user-message' : 'chatgpt-message'}>
              {chat.content}
            </div>
          ))}
          {loading && messages && messages.role !== 'user' && <div className="loader">...</div>}
        </div>
        <div className="input-area">
          <input value={value} onChange={(e) => setValue(e.target.value)} />
          <button onClick={getReply}>
            <AiOutlineSend />
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatSection;
