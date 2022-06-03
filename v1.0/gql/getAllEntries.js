export const GET_ALL_ENTRIES = (isAlert, page = 1, limit = 11) => `
    allEntries(
        filter: {
            showathome: {eq: "${!isAlert}"},
            notice: {eq: "${isAlert}"},
        },
        orderBy: _createdAt_DESC,
        first: "${limit}",
        skip: "${page > 1 ? ((page - 1) * 11) : 0}"
    ) {
        title
        description
        showathome
        notice
        id
        coverimage {
            filename
            format
            title
            url
        }
        createdAt
        category {
            id
        }
    }
`;
