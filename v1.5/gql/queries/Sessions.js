export const get = (sessionId) => sessionId ? `{
    session(where: { id: "${sessionId}" }) {
        monkey {
            email
            password
        }
        isActive
        id
        createdAt
        updatedAt
    }
}` : `{
    sessions {
        monkey {
            email
            password
        }
        isActive
        id
        createdAt
        updatedAt
    }
}`