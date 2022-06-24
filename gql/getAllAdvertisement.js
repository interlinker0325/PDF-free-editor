export const GET_ALL_ADS = (page = 1) => `
    allAdvertisements(
        first: "${page}",
        skip: "${page - 1}"
    ) {
        url
        description
        id
        name
        createdAt
        updatedAt
        image {
            alt
            filename
            id
            format
            title
            url
            video {
                streamingUrl
                thumbnailUrl
                mp4Url
            }
        }
    }
`;
