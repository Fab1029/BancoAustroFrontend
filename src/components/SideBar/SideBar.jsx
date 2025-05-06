import React, { useEffect, useRef, useState } from 'react'
import './SideBar.css'
import { useLocation, useNavigate } from 'react-router-dom';

const SideBar = () => {
  // Inicializar valores
  const navigate = useNavigate();
  const location = useLocation();
  // Opciones disponibles del modelo
  const options = ['Chat', 'Response', 'Embedding'];
  // Referencias de menu
  const menuRef = useRef(null);

  // Referencias useState
  const [menu, setMenu] = useState(false);
  const [option, setOption] = useState(Number(localStorage.getItem('option')));

  useEffect(() => {
    // Verifica si el menu esta activo ademas si se tiene referencia al slide bar
    const handleClickOutside = (event) => {
      if (menu && menuRef.current && ! menuRef.current.contains(event.target))
        setMenu(false);
    };
    
    // Agregar evento cuando se realiza un click
    document.addEventListener('mousedown', handleClickOutside);

    // Al momento de que no cambia el parametro menu se quita el evento
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, [menu])

  // Función para determinar estado de menu
  // desplegable
  const handleMenu = () => {
    setMenu(!menu);
  };

  const handleOption = (index) => {
    // Determinar el cambio de estado en opciones
    if(index !== option) {
      if (location.pathname === '/response') navigate('/');
      // Actualizar estado global
      setOption(index)
      localStorage.setItem('option', index);
    }
  };
  
  // Siempre al generar un nuevo chat
  // redireccionar a la página principal
  const handleNewChatOption = () => {  
    navigate('/');
  };

  return (
    <div className='side-bar-container'>
        <ul className='side-bar-icons-container'>
          <li onClick={handleMenu}>
            <svg className='svg-menu' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#091B69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
            <h1 className='tool-tip'>Menu</h1>
          </li>
          <li onClick={handleNewChatOption}>
            <svg className='svg-new-chat' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z" stroke="#091B69" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>  
            <h1 className='tool-tip'>New chat</h1>
          </li>
        </ul>

        <div ref={menuRef} className={`slide-container ${menu ? 'show': ''}`}>
          
          <ul className='side-bar-icons-container'>
            <li onClick={handleMenu}>
              <svg className='svg-menu' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M4 6H20M4 12H20M4 18H20" stroke="#091B69" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
              <h1 className='tool-tip'>Menu</h1>
            </li>
            <li onClick={handleNewChatOption}>
              <svg className='svg-new-chat' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 5H9C7.11438 5 6.17157 5 5.58579 5.58579C5 6.17157 5 7.11438 5 9V15C5 16.8856 5 17.8284 5.58579 18.4142C6.17157 19 7.11438 19 9 19H15C16.8856 19 17.8284 19 18.4142 18.4142C19 17.8284 19 16.8856 19 15V12M9.31899 12.6911L15.2486 6.82803C15.7216 6.36041 16.4744 6.33462 16.9782 6.76876C17.5331 7.24688 17.5723 8.09299 17.064 8.62034L11.2329 14.6702L9 15L9.31899 12.6911Z" stroke="#091B69" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>  
              <h1 className='tool-tip'>New chat</h1>
            </li>
          </ul>
        
          <ul className='side-bar-buttons-container'>
            { // Generar opciones 
              options.map((optionName, index) => (
                <li key={index} onClick={() => handleOption(index)} className={`button ${index === option ? 'active' : ''}`}>
                  {optionName}
                </li>
              ))
            }
          </ul>

        </div>
    </div>
  )
}

export default SideBar