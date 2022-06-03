export const GET_USER_BY_EMAIL = (email) => `
    user(filter: { email: { eq: "${email}" } }) {
        id
        name
        lastname
        username
        email
        password
        avatar {
            url
        }
    }
`;