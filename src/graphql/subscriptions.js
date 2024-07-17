/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
export const onCreateRoadBook = /* GraphQL */ `
  subscription OnCreateRoadBook(
    $filter: ModelSubscriptionRoadBookFilterInput
    $owner: String
  ) {
    onCreateRoadBook(filter: $filter, owner: $owner) {
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
export const onUpdateRoadBook = /* GraphQL */ `
  subscription OnUpdateRoadBook(
    $filter: ModelSubscriptionRoadBookFilterInput
    $owner: String
  ) {
    onUpdateRoadBook(filter: $filter, owner: $owner) {
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
export const onDeleteRoadBook = /* GraphQL */ `
  subscription OnDeleteRoadBook(
    $filter: ModelSubscriptionRoadBookFilterInput
    $owner: String
  ) {
    onDeleteRoadBook(filter: $filter, owner: $owner) {
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
