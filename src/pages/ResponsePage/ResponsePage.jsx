import React, { useEffect, useState } from 'react'
import './ResponsePage.css'
import SideBar from '../../components/SideBar/SideBar'
import PromtCard from '../../components/PromtCard/PromtCard'
import ResponseCard from '../../components/ResponseCard/ResponseCard'
import Input from '../../components/Input/Input'

const ResponsePage = () => {
  const [chat, setChat] = useState([]);

  useEffect(() => {
    const initialPrompt = localStorage.getItem('promt');
    if (initialPrompt) {
      addToChat(initialPrompt);
    }
  }, []);

  const addToChat = (promt) => {
    setChat(prev => [
      ...prev,
      { type: 'prompt', text: promt },
      { type: 'response', text: promt } 
    ]);
  };

  return (
    <>
      <header className='header-response-page'>
            <SideBar/>
      </header>
      <main className='main-response-page'>
          <ul className='responses-container'>
            {chat.map((item, index) => (
              <li key={index} className={item.type === 'prompt' ? 'promt-container' : 'response-container'}>
                {item.type === 'prompt'
                  ? <PromtCard promt={item.text} />
                  : <ResponseCard response={item.text} />
                }
              </li>
            ))}
          </ul>
      </main>
      <footer className='footer-response-page'>
        <Input inputNameContainer={'input-container-response'} inputName={'input-response'} placeholder={'¿En qué te puedo ayudar?'} action={addToChat}/>
      </footer>
    </>
  )
}

export default ResponsePage