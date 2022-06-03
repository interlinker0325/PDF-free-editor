import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../gql';
import Main from 'components/Main/Main';
import Table from 'components/Table/Table';

export default function AllGroups() {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const getPageData = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_GROUPS);
            if (data.groups && data.groups.length > 0) {
                data.groups.forEach(group => {
                    group.org = group.org.name;
                    group.monkeys = group.monkeys?.length + 1;
                });
            }
            setPageData(data);
        };

        getPageData();
    }, []);

    console.log('OVER HERE!!', pageData);
    const columns = ['name', 'isActive', 'org', 'monkeys'];
    return !pageData ? null : (
        <Main
            title='Groups'
            actionItems={[
                { text: 'New', href: '/admin/groups/new' },
                { text: 'Delete', onClick: () => alert('Delete Items') }
            ]}>
            <Table items={pageData.groups} columns={columns} />
        </Main>
    )
}
