const EMBEDDING_URL = "/embedding";

export const getEmbedding = async(promt) => {
    try {
        const response = await fetch(`${EMBEDDING_URL}/?query=${encodeURIComponent(promt)}`);
        if (!response.ok) {
            throw new Error('Could not load embedding');
        }
        return await response.json();
    }
    catch(error) {
        return null;
    }
}

export const postEmbedding = async(embedding) => {
    try {
        const response = await fetch(`${EMBEDDING_URL}/`, {
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