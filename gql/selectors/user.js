const EMAIL_PASSWORD = `email
    password`;

const AVATAR = `avatar {
        url
        title
        id
    }`;

const SYSTEM = `createdAt
    updatedAt
    id
    role {
        name
        id
    }`;

const FULLNAME = `fullname`;

const DETAILS = `experience
    gender
    level
    phone
    residence`;

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
