const CHAT_RESPONSE_URL = "/chat_response";

export const getChatResponse = async(chat) => {
    try {
        console.log('Entidad a mandar:')
        console.log(chat)
        const response = await fetch(`${CHAT_RESPONSE_URL}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(chat)
        });

        if (!response.ok) {
            throw new Error('Could not get chat response');
        }

        return await response.json();
    }
    catch(error) {
        return null;
    }
}