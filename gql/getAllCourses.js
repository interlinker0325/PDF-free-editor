export const GET_ALL_COURSES = `
    allCourses {
        id
        name
        professor {
            id
            fullname
        }
    }
`;
