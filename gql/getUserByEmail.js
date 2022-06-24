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
        experiencia
        genero
        id
        lastname
        name
        nivel
        phone
        residencia
        tipo {
            nombre
            id
        }
        username
        updatedAt
        cursos {
            id
            title
            description
            enabled
        }
    }
`;