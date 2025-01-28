import {del, get, post, put} from 'utils/axios';

export const createEntry = async (
    {
      title,
      description,
      coverimage,
      course,
      attachments = [],
      monograph,
      author,
      coauthors,
      post_type,
      review,
      agreedterms,
      tags
    }
) => {
  const requestData = {
    title,
    description,
    coverimage,
    course,
    attachments,
    monograph,
    author,
    coauthors,
    post_type,
    review,
    agreedterms,
    tags
  };

  const response = await post('/api/entry', requestData);
  if (response?.success) {
    return response.data;
  } else {
    return {error: response.error};
  }
};

export const updateEntry = async (requestData) => {
  const response = await put('/api/entry', requestData);

  if (response?.success) {
    return response.data;
  } else {
    return {error: response.error};
  }
};

export const deleteEntry = async (requestData) => {
  const response = await del('/api/entry', requestData);

  if (response?.success) {
    return response.data;
  } else {
    return {error: response.error};
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

  requestData.sections = requestData.sections.map(({imageRef, monographRef, ...rest}) => rest);
  const response = await post('/api/section', requestData);

  if (response?.success) {
    return response.data;
  } else {
    return {error: response.error};
  }
};

export const upload = async (files, returnUrl = false, file2delete) => {
  if (!files?.length) return {error: 'No file selected.'};
  console.log(
      `%cFILE ID:%c`,
      "color: #00e7b2; font-weight: bold; font-size: 14px;",
      "color: #ffffff; background-color: #333; padding: 2px 5px; border-radius: 4px;",
      file2delete
  );
  let formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });

  const response = await post('/api/upload', formData, true);

  if (response?.success) {
    if (file2delete) {
      const deleteResponse = await del('/api/upload', {file2delete});
      console.log(deleteResponse);
    }

    const data = response.data.uploads?.map(({id, url}) => returnUrl ? {id, url} : id);
    return (data.length === 1) ? data[0] : data;
  } else {
    return {error: response.error};
  }
};

export const getHTML = async (url) => (await get(url, true)).text;

export const getMonograph = (file) => getHTML(
    `/api/${file.url.replace(process.env.NEXT_PUBLIC_DATOCMS_STORAGE_URL, "")}`
);
