/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createRoadBook = /* GraphQL */ `
  mutation CreateRoadBook(
    $input: CreateRoadBookInput!
    $condition: ModelRoadBookConditionInput
  ) {
    createRoadBook(input: $input, condition: $condition) {
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
export const updateRoadBook = /* GraphQL */ `
  mutation UpdateRoadBook(
    $input: UpdateRoadBookInput!
    $condition: ModelRoadBookConditionInput
  ) {
    updateRoadBook(input: $input, condition: $condition) {
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
export const deleteRoadBook = /* GraphQL */ `
  mutation DeleteRoadBook(
    $input: DeleteRoadBookInput!
    $condition: ModelRoadBookConditionInput
  ) {
    deleteRoadBook(input: $input, condition: $condition) {
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
