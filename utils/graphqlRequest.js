import { GraphQLClient, gql } from 'graphql-request';

const API_TOKEN = process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN;

export const request = (queries, preview = false) => {
    try {
        const endpoint = preview
            ? `https://graphql.datocms.com/preview`
            : `https://graphql.datocms.com/`;

        const client = new GraphQLClient(endpoint, {
            mode: 'cors',
            headers: {
                authorization: `Bearer ${API_TOKEN}`
            }
        });

        const query = gql`{
            ${queries}
        }`;

        return client.request(query);
    } catch (error) {
        console.error(error);
        return null;
    }
};

export * from 'gql/getUserByEmail';
export * from 'gql/getAllEntries';
export * from 'gql/getEntryById';
export * from 'gql/getAllCourses';
export * from 'gql/getAllStudents';