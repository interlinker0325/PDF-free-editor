const fields = `
    id
    name
    professor {
        id
        fullname
    }
    students {
        id
        fullname
    }
`

export const GET_ALL_COURSES = (userId) => userId ? `
    allCourses(filter: {students: {anyIn: "${userId}"}}) {
        ${fields}
    }
` : `
    allCourses {
        ${fields}
    }
`;
