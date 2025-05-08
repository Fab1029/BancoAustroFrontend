import React, { useEffect } from 'react'
import './HomePage.css'
import Input from '../../components/Input/Input'
import SideBar from '../../components/SideBar/SideBar'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  
  // Gestionar estado de opciones
  useEffect(() => {
    
    const handleStateOption = () => {
      if(!sessionStorage.getItem('option')) {
        sessionStorage.setItem('option', 0);
      }
    };

    const handleStatePromt = () => {
      if (sessionStorage.getItem('promt'))
        sessionStorage.removeItem('promt');
    };

    handleStatePromt();
    handleStateOption();
  }, []);
  
  // Función para inicializar ResponsePage
  const handleResponsePage = (promt) => {
    // Guardar en local el primer promt de
    // la conversación
    sessionStorage.setItem('promt', promt);
    navigate('/response');
  }
  
  return (
    <>
        <header className='header-home-page'>
            <SideBar/>
        </header>
        <main className='main-home-page'>
            <img className='banner-banco-austro' alt='LOGO BANCO AUSTRO' src='/banco-austro-logo1.png'/>
            <Input inputNameContainer={'input-container'} inputName={'input'} placeholder={'¿En qué te puedo ayudar?'} onSumit={handleResponsePage}/>
        </main>
        <footer>
            
        </footer>
    </>
  )
}

export default HomePage