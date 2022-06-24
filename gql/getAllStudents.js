const studentId = "122038960";

export const GET_ALL_STUDENTS = `
    allUsers(filter: {tipo: {eq: ${studentId}}}) {
        lastname
        name
        id
    }
`;
