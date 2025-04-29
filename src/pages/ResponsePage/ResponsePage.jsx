import React, { useEffect, useState } from 'react'
import './ResponsePage.css'
import SideBar from '../../components/SideBar/SideBar'
import PromtCard from '../../components/PromtCard/PromtCard'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import Input from '../../components/Input/Input'

const ResponsePage = () => {
  // Inicializar lista de chat 
  const [chat, setChat] = useState([]);

  // Al momento del redireccionamiento renderizar
  // el chat con el primer promt de la página principal
  useEffect(() => {
    const initialPrompt = localStorage.getItem('promt');
    if (initialPrompt) {
      addToChat(initialPrompt);
    }
  }, []);

  // Función para agregar promts y respuestas al chat
  const addToChat = (promt) => {
    setChat(prev => [
      ...prev,
      promt
    ]);
  };

  return (
    <>
      <header className='header-response-page'>
            <SideBar/>
      </header>
      <main className='main-response-page'>
          <ul className='responses-container'>
            {chat.map((promt, index) => (
              <li key={index} className='chat-line'>
                <div className='promt-container'> <PromtCard promt={promt} /> </div>
                <div className='response-container'> <ResponseCard promt={promt} /> </div>
              </li>
            ))}
          </ul>
      </main>
      <footer className='footer-response-page'>
        <Input inputNameContainer={'input-container-response'} inputName={'input-response'} placeholder={'¿En qué te puedo ayudar?'} onSumit={addToChat}/>
      </footer>
    </>
  )
}

export default ResponsePage