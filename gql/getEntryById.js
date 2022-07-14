export const GET_ENTRY_BY_ID = (entryId) => `
    post(filter: { id: { eq: ${entryId} } }) {
        author {
            fullname
            id
        }
        coauthors {
            fullname
            id
        }
        coverimage {
            id
            filename
            title
            url
        }
        course {
            id
            name
            professor {
                id
                fullname
            }
        }
        createdAt
        description(markdown: false)
        attachments {
            filename
            id
            title
            url
            format
            mimeType
            size
            exifInfo
        }
        id
        monograph {
            filename
            id
            title
            url
        }
        title
        tags
        updatedAt
        review
        agreedterms
    }
`;
