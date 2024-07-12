/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
    onCreateUser(filter: $filter) {
      id
      username
      email
      createdAt
      roadBookList
      updatedAt
      __typename
    }
  }
`;
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
    onUpdateUser(filter: $filter) {
      id
      username
      email
      createdAt
      roadBookList
      updatedAt
      __typename
    }
  }
`;
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
    onDeleteUser(filter: $filter) {
      id
      username
      email
      createdAt
      roadBookList
      updatedAt
      __typename
    }
  }
`;
export const onCreateRoadBook = /* GraphQL */ `
  subscription OnCreateRoadBook($filter: ModelSubscriptionRoadBookFilterInput) {
    onCreateRoadBook(filter: $filter) {
      id
      name
      placesPlan
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onUpdateRoadBook = /* GraphQL */ `
  subscription OnUpdateRoadBook($filter: ModelSubscriptionRoadBookFilterInput) {
    onUpdateRoadBook(filter: $filter) {
      id
      name
      placesPlan
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const onDeleteRoadBook = /* GraphQL */ `
  subscription OnDeleteRoadBook($filter: ModelSubscriptionRoadBookFilterInput) {
    onDeleteRoadBook(filter: $filter) {
      id
      name
      placesPlan
      createdAt
      updatedAt
      __typename
    }
  }
`;
