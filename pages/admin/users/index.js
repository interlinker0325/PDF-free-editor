import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, MONKEYS } from '../../../gql';
import Main from 'components/Main/Main';
import Table from 'components/Table/Table';

export default function AllUsers() {
    const [pageData, setPageData] = useState(null);

    useEffect(() => {
        const getPageData = async () => {
            const data = await request(gqlConfig.API_URL, MONKEYS.get());
            setPageData(data);
        };

        getPageData();
    }, []);

    console.log('OVER HERE!!', pageData);
    const columns = ['thumbnail', 'email', 'name', 'lastname', 'isAdmin', 'isActive'];
    return !pageData ? null : (
        <Main
            title='Users'
            actionItems={[
                { text: 'New', href: '/admin/users/new' },
                { text: 'Delete', onClick: () => alert('Delete Items') }
            ]}>
            <Table items={pageData.monkeys} columns={columns} />
        </Main>
    )
}
