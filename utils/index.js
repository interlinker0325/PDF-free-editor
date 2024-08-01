export const isOdd = (num) => num % 2;

export const isValidFileType = (fileType) => {
    return ["html", "pdf", "docx", "doc", "rtf"].includes(fileType);
};

export * from './user';
export * from './post';
