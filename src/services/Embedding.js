const API_URL = "10.16.190.99:8000";

export const getEmbedding = async(promt) => {
    try {
        const response = await fetch(`${API_URL}/embedding/?query=${encodeURIComponent(promt)}`);
        if (!response.ok) {
            throw new Error('Could not load embedding');
        }
        console.log('Realizo1')
        return await response.json();
    }
    catch(error) {
        return null;
    }
}

export const postEmbedding = async(embedding) => {
    try {
        const response = await fetch(`${API_URL}/embedding/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(embedding)
        });

        if (!response.ok) {
            throw new Error('Could not post embedding');
        }

        return await response.json();
    }
    catch(error) {
        return null;
    }
}