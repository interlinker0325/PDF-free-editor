export const GET_ALL_ENTRIES = (page = 1, limit = 11) => `
    allPosts(
        orderBy: _createdAt_DESC,
        first: "${limit}",
        skip: "${page > 1 ? ((page - 1) * 11) : 0}"
        filter: {
            review: {eq: "Aprobado"}
        }
    ) {
        title
        description
        id
        coverimage {
            filename
            title
            url
        }
        course {
            id
            name
        }
    }
`;
