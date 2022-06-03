import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../gql';
import Main from 'components/Main/Main';
import Table from 'components/Table/Table';

export default function AllOrgs() {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const getPageData = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_ORGS);
            data.orgs.forEach(org => {
                org.groups = org.groups.map(group => group.name).join(', ');
                org.roles = org.roles.map(role => role.name).join(', ');
            });
            setPageData(data);
        };

        getPageData();
    }, []);

    console.log('OVER HERE!!', pageData);
    const columns = ['name', 'description', 'isActive', 'roles', 'groups'];
    return !pageData ? null : (
        <Main
            title='Orgs'
            actionItems={[
                { text: 'New', href: '/admin/orgs/new' },
                { text: 'Delete', onClick: () => alert('Delete Items') }
            ]}>
            <Table items={pageData.orgs} columns={columns} />
        </Main>
    )
}
