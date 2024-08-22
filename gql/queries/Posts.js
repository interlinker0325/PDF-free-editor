export const GET_PROFESOR_COURSES_POSTS = (coursesIds) => `
    allPosts(filter: {course: {in: [${[...coursesIds]}]}, review: {neq: "Borrador"}}) {
        review
        createdAt
        id
        title
        description
        course {
          id
        }
        author {
          id
        }
    }
`;

export const GET_ADMIN_COURSES_POSTS = (coursesIds) => `
    allPosts(filter: {course: {in: [${[...coursesIds]}]}}) {
        review
        createdAt
        id
        title
        description
        course {
          id
        }
        author {
          id
        }
    }
`;
