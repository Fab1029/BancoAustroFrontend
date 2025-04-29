import React, { useRef } from 'react';
import './Input.css';

const Input = ({ inputNameContainer, inputName, placeholder, onSumit}) => {
    // Referencia al text area
    const textareaRef = useRef(null);
    
    // Función necesaria para poder hacer responsive
    // el text area
    const handleInput = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        }
    };

    const handleButtonEnter = () => {
        // Aqui se verifica si el text area tiene texto y realiza función ejecutada 
        // desde varias partes de la página
        if (textareaRef.current.value) {
            const text = textareaRef.current.value;
            // Limpiar el texto de entrada
            textareaRef.current.value = "";
            
            // Esta función ejecuta funciones pasadas
            // por otros componentes
            onSumit(text);
        }
    };

    // Función al momento de teclear enter verificar 
    // que solo enter es pulsado
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            // Evita el salto de línea
            e.preventDefault(); 
            handleButtonEnter();
        }
    };

    return (
        <div className={inputNameContainer}>
            <textarea
                rows={1}
                className={`${inputName} general-input`}
                ref={textareaRef}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                placeholder={placeholder} 
            />
            <svg
                onClick={handleButtonEnter}
                className='svg-enter'
                fill="#4A4A4A"
                height="200px"
                width="200px"
                viewBox="0 0 512.035 512.035"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g>
                    <path d="M506.817,248.355L11.883,0.888C8.47-0.819,5.057,0.035,2.497,2.595c-2.56,3.413-3.413,7.68-0.853,10.24l158.72,243.2 
                        l-158.72,243.2c-1.707,3.413-1.707,7.68,0.853,10.24c0.853,1.707,3.413,2.56,5.973,2.56c1.707,0,2.56,0,3.413-0.853 
                        l494.933-247.467c3.413-1.707,5.12-4.267,5.12-7.68S509.377,250.061,506.817,248.355z M33.217,482.168l145.067-221.013 
                        c1.707-2.56,1.707-6.827,0-9.387L33.217,30.755l451.413,225.28L33.217,482.168z" />
                </g>
            </svg>
        </div>
    );
};

export default Input;
