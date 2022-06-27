import { selector } from 'gql';

export const GET_ACTIVE_BANNERS = `
    allBanners(filter: {enable: {eq: "true"}}) {
        ${selector.banners.BANNER}
    }
`;