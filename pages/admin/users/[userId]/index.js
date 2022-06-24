import React, { useEffect, useState } from 'react';
import { request } from 'graphql-request';
import { gqlConfig, queries } from '../../../../gql';
import { useRouter } from 'next/router'
import { general } from '../../../../styles';
import Main from '../../../../components/Main/Main';
import Table from 'components/Table/Table';

export default function UserInfo() {
    const router = useRouter();
    const { userId } = router.query;
    const [monkey, setMonkey] = useState(null);

    useEffect(() => {
        const getMonkey = async () => {
            const data = await request(gqlConfig.API_URL, queries.GET_MONKEY(userId));
            setMonkey(data.monkey);
        };

        getMonkey();
    }, []);

    const columns = ['thumbnail', 'email', 'name', 'lastname', 'isAdmin', 'isActive'];
    return (
        <Main
            title='User Info'>
            <Table items={[monkey || {}]} columns={columns} />
        </Main>
    )
}
