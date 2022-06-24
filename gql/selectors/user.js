const EMAIL_PASSWORD = `email
    password`;

const AVATAR = `avatar {
        url
        title
        filename
    }`;

const SYSTEM = `createdAt
    updatedAt
    id
    tipo {
        nombre
        id
    }`;

const FULLNAME = `lastname
    name`;

const DETAILS = `experiencia
    genero
    nivel
    phone
    residencia
    username`;

const BIRTHDAY = `birthdate`;

export const USER_LOGIN_DATA = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
`;
export const PUBLIC_USER_PROFILE = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
    ${DETAILS}
`;
export const PRIVATE_USER_PROFILE = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
    ${DETAILS}
    ${BIRTHDAY}
`;
