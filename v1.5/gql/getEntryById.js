export const GET_ENTRY_BY_ID = (entryId) => `
    entry(filter: { id: { eq: ${entryId} } }) {
        author {
            email
            lastname
            name
            id
            phone
        }
        category {
            name
            id
            description
        }
        content {
            title
            description(markdown: false)
            monograph {
                id
                filename
                format
                url
                title
            }
            updatedAt
            createdAt
            id
            image {
                id
                filename
                format
                url
                title
            }
        }
        coverimage {
            id
            filename
            format
            title
            url
        }
        id
        title
        showathome
        notice
        description(markdown: false)
        files {
            id
            filename
            format
            url
            title
        }
    }
`;
