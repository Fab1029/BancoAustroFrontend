const API_URL = "10.16.190.99:8000";

export const getLLMResponse = async(promt) => {
    try {
        const response = await fetch(`${API_URL}/llm_response/?query=${encodeURIComponent(promt)}`);
        if (!response.ok) {
            throw new Error('Could not load llm response');
        }

        return await response.json();
    }
    catch(error) {
        return null;
    }
}

export const postLLMResponse = async(llm_response) => {
    try {
        const response = await fetch(`${API_URL}/llm_response/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(llm_response)
        });

        if (!response.ok) {
            throw new Error('Could not post llm response');
        }

        return await response.json();
    }
    catch(error) {
        return null;
    }
}