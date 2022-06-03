import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../gql';
import Main from 'components/Main/Main';
import Table from 'components/Table/Table';

export default function AllRoles() {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const getPageData = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_ROLES);
            data.roles.forEach(role => {
                role.org = role.org.name;
                role.monkeys = role.monkeys.length;
            });
            setPageData(data);
        };

        getPageData();
    }, []);

    console.log('OVER HERE!!', pageData);
    const columns = ['name', 'isActive', 'org', 'monkeys'];
    return !pageData ? null : (
        <Main
            title='Roles'
            actionItems={[
                { text: 'New', href: '/admin/roles/new' },
                { text: 'Delete', onClick: () => alert('Delete Items') }
            ]}>
            <Table items={pageData.roles} columns={columns} />
        </Main>
    )
}
