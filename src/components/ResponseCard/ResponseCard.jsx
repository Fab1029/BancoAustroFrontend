import React, { useEffect, useState } from 'react'
import './ResponseCard.css'
import Input from '../Input/Input';
import { getEmbedding, postEmbedding } from '../../services/Embedding.js'
import { getLLMResponse, postLLMResponse } from '../../services/LLMResponse.js'


const ResponseCard = ({promt}) => {
    // Estados para manejar el feedback card
    // y cargar la respuesta del modelo
    const [response, setResponse] = useState(false);
    const [responseSumit, setResponseSumit] = useState(false);
    const [feedBackVisible, setFeedBackVisible] = useState(false);
    const [feedBackSumitVisible, setFeedBackSumitVisible] = useState(false);

    useEffect(() => {
        
        // Llamar la backend en esta sección
        const fetchEmbedding = async() => {
            const data = await getEmbedding(promt);
            setResponse(data);
        };

        const fetchLLMResponse = async() => {
            const data = await getLLMResponse(promt);
            setResponse(data);
        };
        
        // Opción seleccionada llamar a servicio correspondiente
        Number(localStorage.getItem('option')) === 0 ? fetchLLMResponse() : fetchEmbedding();
        /*
        const timer = async() => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            setResponse(promt);
        }
        timer();*/
    }, []);

    const handleFeedBackVisible = () => {
        setFeedBackVisible(!feedBackVisible);
    };

    const handleFeedBackSubmitVisible = () => {
        setFeedBackSumitVisible(!feedBackSumitVisible);
    };

    // Función necesaria para guardar el feedback en la API
    const handlePostFeedBack = async(feedback) => {
        // Oculta el feedback-card
        handleFeedBackVisible();
    
        // Muestra el feedback-submit-container
        handleFeedBackSubmitVisible();

        // Modificacion de objeto
        response.retroalimentacion = feedback;

        const  data = Number(localStorage.getItem('option')) === 0
            ? await postLLMResponse(response)
            : await postEmbedding(response);
        
        // Se asigna el estado de feedBackSumit
        data ? setResponseSumit(true) : setResponseSumit(false);
        
        /*
        //Se muestra la respuesta de sumit 
        data ? setResponseSumit(true) : setResponseSumit(false);
        // Espera 2 segundos y luego oculta el feedback-submit-container
        setTimeout(() => {
            setFeedBackSumitVisible(false);
        }, 2000);*/

    };

    return (
    <div className='response-card-container'>
        <div className='response-card'>
            <img className='img-banco-austro' src='banco-austro-logo2.png'/>
            {
                !response ? 
                <ul className='loading-container'>
                    <li className='loading-item' style={{backgroundColor: '#1C246C'}}/>
                    <li className='loading-item' style={{backgroundColor: '#FF0000'}}/>
                    <li className='loading-item' style={{backgroundColor: '#FCBA29'}}/>
                </ul>
                :
                <>
                    <div className='response-text'>{response.respuesta}</div>
                    
                    <div className='feedback-open-container'>
                        <svg className= 'svg-feedback-open' onClick={handleFeedBackVisible} viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M13.2942 7.95881C13.5533 7.63559 13.5013 7.16358 13.178 6.90453C12.8548 6.64549 12.3828 6.6975 12.1238 7.02072L13.2942 7.95881ZM6.811 14.8488L7.37903 15.3385C7.38489 15.3317 7.39062 15.3248 7.39623 15.3178L6.811 14.8488ZM6.64 15.2668L5.89146 15.2179L5.8908 15.2321L6.64 15.2668ZM6.5 18.2898L5.7508 18.2551C5.74908 18.2923 5.75013 18.3296 5.75396 18.3667L6.5 18.2898ZM7.287 18.9768L7.31152 19.7264C7.36154 19.7247 7.41126 19.7181 7.45996 19.7065L7.287 18.9768ZM10.287 18.2658L10.46 18.9956L10.4716 18.9927L10.287 18.2658ZM10.672 18.0218L11.2506 18.4991L11.2571 18.491L10.672 18.0218ZM17.2971 10.959C17.5562 10.6358 17.5043 10.1638 17.1812 9.90466C16.8581 9.64552 16.386 9.69742 16.1269 10.0206L17.2971 10.959ZM12.1269 7.02052C11.8678 7.34365 11.9196 7.81568 12.2428 8.07484C12.5659 8.33399 13.0379 8.28213 13.2971 7.95901L12.1269 7.02052ZM14.3 5.50976L14.8851 5.97901C14.8949 5.96672 14.9044 5.95412 14.9135 5.94123L14.3 5.50976ZM15.929 5.18976L16.4088 4.61332C16.3849 4.59344 16.3598 4.57507 16.3337 4.5583L15.929 5.18976ZM18.166 7.05176L18.6968 6.52192C18.6805 6.50561 18.6635 6.49007 18.6458 6.47532L18.166 7.05176ZM18.5029 7.87264L19.2529 7.87676V7.87676L18.5029 7.87264ZM18.157 8.68976L17.632 8.15412C17.6108 8.17496 17.5908 8.19704 17.5721 8.22025L18.157 8.68976ZM16.1271 10.0203C15.8678 10.3433 15.9195 10.8153 16.2425 11.0746C16.5655 11.3339 17.0376 11.2823 17.2969 10.9593L16.1271 10.0203ZM13.4537 7.37862C13.3923 6.96898 13.0105 6.68666 12.6009 6.74805C12.1912 6.80943 11.9089 7.19127 11.9703 7.60091L13.4537 7.37862ZM16.813 11.2329C17.2234 11.1772 17.5109 10.7992 17.4552 10.3888C17.3994 9.97834 17.0215 9.69082 16.611 9.74659L16.813 11.2329ZM12.1238 7.02072L6.22577 14.3797L7.39623 15.3178L13.2942 7.95881L12.1238 7.02072ZM6.24297 14.359C6.03561 14.5995 5.91226 14.9011 5.89159 15.218L7.38841 15.3156C7.38786 15.324 7.38457 15.3321 7.37903 15.3385L6.24297 14.359ZM5.8908 15.2321L5.7508 18.2551L7.2492 18.3245L7.3892 15.3015L5.8908 15.2321ZM5.75396 18.3667C5.83563 19.1586 6.51588 19.7524 7.31152 19.7264L7.26248 18.2272C7.25928 18.2273 7.25771 18.2268 7.25669 18.2264C7.25526 18.2259 7.25337 18.2249 7.25144 18.2232C7.2495 18.2215 7.24825 18.2198 7.24754 18.2185C7.24703 18.2175 7.24637 18.216 7.24604 18.2128L5.75396 18.3667ZM7.45996 19.7065L10.46 18.9955L10.114 17.536L7.11404 18.247L7.45996 19.7065ZM10.4716 18.9927C10.7771 18.9151 11.05 18.7422 11.2506 18.499L10.0934 17.5445C10.0958 17.5417 10.0989 17.5397 10.1024 17.5388L10.4716 18.9927ZM11.2571 18.491L17.2971 10.959L16.1269 10.0206L10.0869 17.5526L11.2571 18.491ZM13.2971 7.95901L14.8851 5.97901L13.7149 5.04052L12.1269 7.02052L13.2971 7.95901ZM14.9135 5.94123C15.0521 5.74411 15.3214 5.6912 15.5243 5.82123L16.3337 4.5583C15.4544 3.99484 14.2873 4.2241 13.6865 5.0783L14.9135 5.94123ZM15.4492 5.7662L17.6862 7.6282L18.6458 6.47532L16.4088 4.61332L15.4492 5.7662ZM17.6352 7.58161C17.7111 7.6577 17.7535 7.761 17.7529 7.86852L19.2529 7.87676C19.2557 7.36905 19.0555 6.88127 18.6968 6.52192L17.6352 7.58161ZM17.7529 7.86852C17.7524 7.97604 17.7088 8.07886 17.632 8.15412L18.682 9.22541C19.0446 8.87002 19.2501 8.38447 19.2529 7.87676L17.7529 7.86852ZM17.5721 8.22025L16.1271 10.0203L17.2969 10.9593L18.7419 9.15928L17.5721 8.22025ZM11.9703 7.60091C12.3196 9.93221 14.4771 11.5503 16.813 11.2329L16.611 9.74659C15.0881 9.95352 13.6815 8.89855 13.4537 7.37862L11.9703 7.60091Z" fill="#8C94BC"></path> </g></svg>        
                        <h1 className='feedback-tool-tip'>Feedback</h1>
                    </div>
                </>    
            }
        </div>
        <div className={`feedback-card ${feedBackVisible ? 'show': ''}`}>
            
            <div className='feedback-input-container'>
                <div className='header-feedback-card'>
                    <svg className='svg-feedback-close' onClick={handleFeedBackVisible} fill="#8C94BC" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14 6.28 14 14-6.28 14.032-14 14.032zM21.657 10.344c-0.39-0.39-1.023-0.39-1.414 0l-4.242 4.242-4.242-4.242c-0.39-0.39-1.024-0.39-1.415 0s-0.39 1.024 0 1.414l4.242 4.242-4.242 4.242c-0.39 0.39-0.39 1.024 0 1.414s1.024 0.39 1.415 0l4.242-4.242 4.242 4.242c0.39 0.39 1.023 0.39 1.414 0s0.39-1.024 0-1.414l-4.242-4.242 4.242-4.242c0.391-0.391 0.391-1.024 0-1.414z"></path> </g></svg>
                    <h1 style={{fontSize: 'medium'}}>FeedBack</h1>
                </div>
                <Input inputNameContainer={'input-container-feedback'} inputName={'input-feedback'} placeholder={'Ingrese su retroalimentación.'} onSumit={handlePostFeedBack}/>
            </div>
                
        </div>
        <div className={`feedback-sumit-container ${feedBackSumitVisible ? 'show' : ''}`}>
            {
                responseSumit ?
                <>
                    <svg className='feedback-sumit-icon' viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="okIconTitle" stroke="#008000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="okIconTitle">Ok</title> <polyline points="4 13 9 18 20 7"></polyline> </g></svg>
                    <h1>FeedBack realizado</h1>
                </>
                :
                <>
                    <svg className='feedback-sumit-icon' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20.7457 3.32851C20.3552 2.93798 19.722 2.93798 19.3315 3.32851L12.0371 10.6229L4.74275 3.32851C4.35223 2.93798 3.71906 2.93798 3.32854 3.32851C2.93801 3.71903 2.93801 4.3522 3.32854 4.74272L10.6229 12.0371L3.32856 19.3314C2.93803 19.722 2.93803 20.3551 3.32856 20.7457C3.71908 21.1362 4.35225 21.1362 4.74277 20.7457L12.0371 13.4513L19.3315 20.7457C19.722 21.1362 20.3552 21.1362 20.7457 20.7457C21.1362 20.3551 21.1362 19.722 20.7457 19.3315L13.4513 12.0371L20.7457 4.74272C21.1362 4.3522 21.1362 3.71903 20.7457 3.32851Z" fill="#ff0000"></path> </g></svg>
                    <h1>FeedBack rechazado</h1>
                </>
            }
        </div>
    </div>
  )
}

export default ResponseCard