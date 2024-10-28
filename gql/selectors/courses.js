const DEFAULT = `createdAt
    description
    enabled
    id
    name
    updatedAt`;

const STUDENTS = `students {
        id
        fullname
    }`;

const PROFESOR = `professor {
        id
        fullname
    }`;


export const USER_COURSES = `
    ${DEFAULT}
    ${STUDENTS}
    ${PROFESOR}
`;

export const PROFESOR_COURSES = `
    ${DEFAULT}
    ${STUDENTS}
    ${PROFESOR}
`;