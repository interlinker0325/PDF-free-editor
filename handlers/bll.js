import { get, post, put } from 'utils/axios';

export const createEntry = async (
    {
        title,
        coverimage,
        description,
        category,
        files = [],
        showathome = false,
        notice = false,
        author
    }
) => {
    const requestData = {
        title,
        coverimage,
        description,
        category,
        files,
        showathome,
        notice,
        author
    };

    const response = await post('/api/entry', requestData);
    if (response?.success) {
        return response.data;
    } else {
        return { error: response.error };
    }
};

export const updateEntry = async (
    id,
    data
) => {
    data.sections = data.sections.map(({ imageRef, monographRef, ...rest }) => rest);
    const requestData = { id, ...data };
    const response = await put('/api/entry', requestData);

    if (response?.success) {
        return response.data;
    } else {
        return { error: response.error };
    }
};

export const publishEntry = async (recordId) => {
    const requestData = { recordId }
    const response = await post('/api/record', requestData);

    if (response?.success) {
        return response.data;
    } else {
        return { error: response.error };
    }
};

export const newSection = async (
    recordId,
    sections = []
) => {
    const requestData = {
        id: recordId,
        sections
    };

    requestData.sections = requestData.sections.map(({ imageRef, monographRef, ...rest }) => rest);
    const response = await post('/api/section', requestData);

    if (response?.success) {
        return response.data;
    } else {
        return { error: response.error };
    }
};

export const upload = async (files) => {
    if (!files) return { error: 'No file selected.' };

    let formData = new FormData();

    Array.from(files).forEach((file) => {
        formData.append('files', file);
    });

    const response = await post('/api/upload', formData, true);

    if (response?.success) {
        const data = response.data.uploads?.map(({ id }) => id);
        return (data.length === 1) ? data[0] : data;
    } else {
        return { error: response.error };
    }
};

export const getHTML = async (url) => (await get(url, true)).text;
