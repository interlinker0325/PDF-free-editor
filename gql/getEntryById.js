export const GET_ENTRY_BY_ID = (entryId) => `
    entry(filter: { id: { eq: ${entryId} } }) {
        author {
            name
            lastname
            id
        }
        coAutores {
            name
            lastname
            id
        }
        coverimage {
            id
            filename
            title
            url
        }
        curso {
            id
            title
        }
        createdAt
        description(markdown: false)
        files {
            filename
            id
            title
            url
        }
        id
        monografia {
            filename
            id
            title
            url
        }
        title
        tags {
            id
            tag
        }
        updatedAt
    }
`;
