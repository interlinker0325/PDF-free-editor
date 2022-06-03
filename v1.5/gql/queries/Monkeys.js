export const get = (monkeyId) => monkeyId ? `{
    monkey(where: { id: "${monkeyId}" }) {
        thumbnail {
            url
        }
        email
        name
        lastname
        isAdmin
        isActive
        id
    }
}` : `{
    monkeys {
        thumbnail {
            url
        }
        email
        name
        lastname
        isAdmin
        isActive
        id
    }
}`;
