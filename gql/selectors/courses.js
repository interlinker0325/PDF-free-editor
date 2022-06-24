const DEFAULT = `createdAt
    description
    enabled
    id
    title
    updatedAt`;

const STUDENTS = `estudiantes {
        id
        lastname
        name
    }`;

const PROFESOR = `profesor {
        name
        lastname
        id
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