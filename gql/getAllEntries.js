export const GET_ALL_ENTRIES = (page = 1, limit = 24) => `
    allPosts(
        orderBy: _createdAt_DESC,
        first: "${limit}",
        skip: "${page > 1 ? ((page - 1) * 24) : 0}"
        filter: {
            review: {eq: "Aprobado"}
        }
    ) {
        title
        description
        id
        post_type:postType
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
