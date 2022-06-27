export const GET_PROFESOR_COURSES_POSTS = (coursesIds) => `
    allPosts(filter: {course: {in: "${coursesIds.join(',')}"}}) {
        review
        createdAt
        id
        title
        description
    }
`;