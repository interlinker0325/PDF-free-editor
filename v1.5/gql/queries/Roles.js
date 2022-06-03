export const get = (roleId) => roleId ? `{
    role(where: { id: "${roleId}" }) {
        name
        isActive
        config
        org {
            name
        }
        monkeys {
            email
        }
    }
}` : `{
    roles {
        name
        isActive
        config
        org {
            name
        }
        monkeys {
            email
        }
    }
}`;
