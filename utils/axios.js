import axios from 'axios';

const METHODS = {
    GET: 'get',
    PUT: 'put',
    POST: 'post'
};

const request = async (method, URL, data, headers) => await axios({
    method: method,
    url: URL,
    data: data,
    headers: headers,
    timeout: 0
});

const post = async (URL, data, asFormData) => {
    try {
        let headers = false;

        if (asFormData) {
            headers = { 'Content-Type': 'multipart/form-data' }
        }

        const response = await request(METHODS.POST, URL, data, headers);

        return {
            success: true,
            ...response?.data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};

const put = async (URL, data) => {
    try {
        const response = await request(METHODS.PUT, URL, data);

        return {
            success: true,
            ...response?.data
        };
    } catch (error) {
        return {
            success: false,
            error,
        };
    }
};

const get = async (URL, asText) => {
    try {
        let headers = false;

        if (asText) {
            headers = {
                'Content-Type': 'text/html'
            }
        }

        const response = await request(METHODS.GET, URL, null, headers);

        return asText ? {
            success: true,
            text: response?.data
        } : {
            success: true,
            ...response?.data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};


export {
    post,
    put,
    get,
};
