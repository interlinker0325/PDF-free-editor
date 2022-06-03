export const get = (groupId) => groupId ? `{
    group(where: { id: "${groupId}" }) {
        name
        description
        isActive
        org {
            name
        }
        monkeys {
            email
        }
    }
}` : `{
    groups {
        name
        description
        isActive
        org {
            name
        }
        monkeys {
            email
        }
    }
}`;