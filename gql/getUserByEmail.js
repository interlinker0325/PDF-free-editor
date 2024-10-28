export const GET_USER_BY_EMAIL = (email) => `
    user(filter: { email: { eq: "${email}" } }) {
        email
        password
        avatar {
            url
            title
            filename
        }
        createdAt
        birthdate
        experience
        gender
        id
        fullname
        level
        phone
        residence
        role {
            name
            id
        }
        updatedAt
    }
`;