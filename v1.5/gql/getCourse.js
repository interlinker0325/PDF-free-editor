export const GET_COURSE = `
course {
    title
    author {
      name
      lastname
      email
      phone
    }
    createdAt
    description(markdown: true)
    categories {
      id
      name
      description
      entries {
        id
        author {
          email
          lastname
          name
          id
          phone
        }
        category {
          name
          id
          description
        }
        content {
          title
          description(markdown: false)
          monograph {
            id
            filename
            format
            url
            title
          }
          updatedAt
          createdAt
          id
          image {
            filename
            format
            url
            title
          }
        }
        coverimage {
          filename
          format
          title
          url
        }
        id
        title
        showathome
        notice
        description(markdown: true)
        files {
          id
          filename
          format
          url
          title
        }
      }
    }
  }
`;