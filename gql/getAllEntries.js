export const GET_ALL_ENTRIES = (page = 1, limit = 11) => `
    allEntries(
        orderBy: _createdAt_DESC,
        first: "${limit}",
        skip: "${page > 1 ? ((page - 1) * 11) : 0}"
        filter: {
            aprobacion: {eq: "Aprobado"}
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
        curso {
            id
            title
        }
    }
`;
