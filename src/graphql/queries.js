/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      username
      email
      roadBookList
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        username
        email
        roadBookList
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getRoadBook = /* GraphQL */ `
  query GetRoadBook($id: ID!) {
    getRoadBook(id: $id) {
      id
      name
      placesPlan
      createdAt
      updatedAt
      originalLocation
      owner
      __typename
    }
  }
`;
export const listRoadBooks = /* GraphQL */ `
  query ListRoadBooks(
    $filter: ModelRoadBookFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRoadBooks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        placesPlan
        createdAt
        updatedAt
        originalLocation
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
