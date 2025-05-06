import React, { useEffect, useState } from 'react'
import './ResponsePage.css'
import SideBar from '../../components/SideBar/SideBar'
import PromtCard from '../../components/PromtCard/PromtCard'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import Input from '../../components/Input/Input'

const ResponsePage = () => {
  // Inicializar lista de chat 
  const [chatContext, setChatContext] = useState([]);
  const initialPrompt = localStorage.getItem('promt');

  //Inicializar 
  const [promt, setPromt] = useState(initialPrompt);

  useEffect(() => {
    addToChat('user', promt);
  }, [promt]);

  // Función para agregar promts y respuestas al chat
  const addToChat = (role, content) => {
    setChatContext(prev => [
      ...prev,
      {role: role, content: content}
    ]);
  };
  
  
  return (
    <>
      <header className='header-response-page'>
        <SideBar/>
      </header>
      <main className='main-response-page'>
        <ul className='responses-container'>
          {chatContext.filter(chat => chat.role === 'user').map((chat, index) => (
            <li key={index} className='chat-line'>
              <div className='promt-container'> <PromtCard promt={chat.content} /> </div>
              <div className='response-container'> <ResponseCard promt={chat.content} context={addToChat} /> </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className='footer-response-page'>
        <Input inputNameContainer={'input-container-response'} inputName={'input-response'} placeholder={'¿En qué te puedo ayudar?'} onSumit={setPromt}/>
      </footer>
    </>
  )
}

export default ResponsePage