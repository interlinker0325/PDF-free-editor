export const GET_PROFESOR_COURSES_POSTS = (coursesIds) => `
    allEntries(filter: {curso: {in: "${coursesIds.join(',')}"}}) {
        aprobacion
        createdAt
        id
        title
        description
    }
`;