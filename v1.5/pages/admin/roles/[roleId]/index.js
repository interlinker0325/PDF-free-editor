import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../../gql';
import { useRouter } from 'next/router';
import Main from '../../../../components/Main/Main';
import Table from 'components/Table/Table';

export default function RoleInfo() {
    const router = useRouter();
    const { roleId } = router.query;
    const [role, setRole] = useState(null);

    useEffect(() => {
        const getRole = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_ROLE(roleId));
            setRole(data.role);
        };

        getRole();
    }, []);

    const columns = ['name', 'description', 'org', 'monkeys'];
    return (
        <Main
            title='Role Info'>
            <Table items={[role || {}]} columns={columns} />
        </Main>
    )
}
