import { get, post, put } from 'utils/axios';

export const updateProfile = async (
    id,
    data
) => {
    const requestData = { id, ...data };
    const response = await put('/api/profile', requestData);

    if (response?.success) {
        return response.data;
    } else {
        return { error: response.error };
    }
};