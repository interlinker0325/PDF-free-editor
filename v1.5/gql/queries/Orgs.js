export const get = (orgId) => orgId ? `{
    org(where: { id: "${orgId}" }) {
        name
        description
        isActive
        roles(where: { isActive: true }) {
            name
        }
        groups(where: { isActive: true }) {
            name
            monkeys {
                email
            }
        }
    }
}` : `{
    orgs {
        name
        description
        isActive
        roles(where: { isActive: true }) {
            name
        }
        groups(where: { isActive: true }) {
            name
        }
    }
}`;
