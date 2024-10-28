export const isOdd = (num) => num % 2;

export const isValidFileType = (fileType) => {
    return ["pdf", "docx", "doc"].includes(fileType);
};
export const isValidImageType = (imageType) => {
    return ["png", "jpg"].includes(imageType);
};

export * from './user';
export * from './post';
