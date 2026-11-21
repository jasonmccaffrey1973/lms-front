const USERS_QUERY = `
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

const USERS_META_QUERY = `
  query GetUsersMeta {
    usersMeta {
      totalCount
    }
  }
`;

const USERS_WITH_META_QUERY = `
  query GetUsersWithMeta {
    users {
      id
      name
      email
    }
    usersMeta {
      totalCount
    }
  }
`;


export { USERS_QUERY, USERS_META_QUERY, USERS_WITH_META_QUERY };