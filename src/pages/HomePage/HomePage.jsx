import React, { useEffect } from 'react'
import './HomePage.css'
import Input from '../../components/Input/Input'
import SideBar from '../../components/SideBar/SideBar'
import { useNavigate } from 'react-router-dom'


const HomePage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    handleStateOption();
  }, []);
  
  // Inicializar variable option para manejar que tipo de response deseamos
  // El valor 0 corresponde a response del LLM
  // El valor 1 corresponde a response embedding
  const handleStateOption = () => {
    try {
      localStorage.getItem('option');
    }
    catch {
      localStorage.setItem('option', 0);
    } 
  };

  // Función para inicializar ResponsePage
  const handleResponsePage = (promt) => {
    localStorage.setItem('promt', promt);
    navigate('/response');
  }
  
  return (
    <>
        <header className='header-home-page'>
            <SideBar/>
        </header>
        <main className='main-home-page'>
            <img className='banner-banco-austro' alt='LOGO BANCO AUSTRO' src='/banco-austro-logo1.png'/>
            <Input inputNameContainer={'input-container'} inputName={'input'} placeholder={'¿En qué te puedo ayudar?'} action={handleResponsePage}/>
        </main>
        <footer>
            
        </footer>
    </>
  )
}

export default HomePage