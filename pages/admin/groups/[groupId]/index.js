import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../../gql';
import { useRouter } from 'next/router'
import Main from '../../../../components/Main/Main';
import Table from 'components/Table/Table';

export default function GroupInfo() {
    const router = useRouter();
    const { groupId } = router.query;
    const [group, setGroup] = useState(null);

    useEffect(() => {
        const getGroup = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_GROUP(groupId));
            if (data.group) {
                data.group.orgs = data.group?.orgs?.lenght + 1;
                data.group.monkeys = data.group?.monkeys?.lenght + 1;
            }
            setGroup(data.group);
        };

        getGroup();
    }, []);

    const columns = ['name', 'description', 'isActive', 'orgs', 'monkeys'];
    return (
        <Main
            title='Group Info'>
            <Table items={[group || {}]} columns={columns} />
        </Main>
    )
}
