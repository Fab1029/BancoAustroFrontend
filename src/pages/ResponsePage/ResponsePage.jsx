import React, { useEffect, useState } from 'react'
import './ResponsePage.css'
import SideBar from '../../components/SideBar/SideBar'
import PromtCard from '../../components/PromtCard/PromtCard'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import Input from '../../components/Input/Input'

const ResponsePage = () => {
  // Inicializar lista de chat 
  const [chatContext, setChatContext] = useState([]);
  const [userMessage, setUserMessage] = useState([]);
  const [responseMessage, setResponseMessage] = useState([]);
  
  useEffect(() => {
    if (sessionStorage.getItem('promt'))
      addToUserMessage(sessionStorage.getItem('promt'));
  }, []);
  
  const addToUserMessage = (message) => {
    setUserMessage(prev => [
      ...prev,
      {role: 'user', content: message}
    ]);
  };

  const addToResponseMessage = (message) => {
    setResponseMessage(prev => [
      ...prev,
      {role: 'assistant', content: message}
    ]);

    //Una vez obtenido la respuesta se actualiza el contexto
    setChatContext(
      prev => [
        ...prev,
        userMessage.at(-1),
        {role: 'assistant', content: message}
      ]
    );  
  };

  return (
    <>
      <header className='header-response-page'>
        <SideBar/>
      </header>
      <main className='main-response-page'>
        <ul className='responses-container'>
          {userMessage.map((chat, index) => (
            <li key={index} className='chat-line'>
              <div className='promt-container'> <PromtCard promt={chat.content} /> </div>
              <div className='response-container'> <ResponseCard promt={chat.content} context={chatContext} onSumit={addToResponseMessage}/> </div>
            </li>
          ))}
        </ul>
      </main>
      <footer className='footer-response-page'>
        <Input inputNameContainer={'input-container-response'} inputName={'input-response'} placeholder={'¿En qué te puedo ayudar?'} onSumit={addToUserMessage}/>
      </footer>
    </>
  )
}

export default ResponsePage