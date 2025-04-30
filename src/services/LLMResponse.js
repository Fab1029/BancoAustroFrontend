const LLM_RESPONSE_URL = "/llm_response";

export const getLLMResponse = async(promt) => {
    try {
        const response = await fetch(`${LLM_RESPONSE_URL}/?query=${encodeURIComponent(promt)}`);
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
        const response = await fetch(`${LLM_RESPONSE_URL}/`, {
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