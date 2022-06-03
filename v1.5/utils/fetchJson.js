const fetchJson = async function (...args) {
    try {
        const response = await fetch(...args);
        const data = await response.json();
        if (response.ok) {
            return data;
        }

        const error = new Error(response.statusText);
        error.response = response;
        error.data = data;
        throw error;
    } catch (error) {
        if (!error.data) {
            error.data = { message: error.message };
        }
        throw error;
    }
};

export default fetchJson;