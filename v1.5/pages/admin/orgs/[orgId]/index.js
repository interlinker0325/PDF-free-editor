import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../../gql';
import { useRouter } from 'next/router';
import Main from '../../../../components/Main/Main';
import Table from 'components/Table/Table';

export default function OrgInfo() {
    const router = useRouter();
    const { orgId } = router.query;
    const [org, setOrg] = useState(null);

    useEffect(() => {
        const getOrgs = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_ORGS(orgId));
            setOrg(data.org);
        };

        getOrgs();
    }, []);

    const columns = ['name', 'description', 'isActive', 'roles', 'groups'];
    return (
        <Main
            title='Org Info'>
            <Table items={[org || {}]} columns={columns} />
        </Main>
    )
}
