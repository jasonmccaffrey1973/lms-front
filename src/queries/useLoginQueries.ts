import { useMutation } from "@apollo/client/react"

import { gql } from "@apollo/client"

const LOGIN_GQL = gql`
  mutation Login($login: String!, $password: String!, $deviceName: String) {
    login(login: $login, password: $password, device_name: $deviceName) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

const REGISTER_GQL = gql`
  mutation Register(
    $name: String!
    $username: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
    $deviceName: String
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
      password_confirmation: $passwordConfirmation
      device_name: $deviceName
    ) {
      token
      user {
        id
        username
        email
      }
    }
  }
`

export function useLogin() {
  const [login, { loading: isLoggingIn, error: loginError }] = useMutation(LOGIN_GQL)
  
  return {
    login,
    isLoggingIn,
    loginError,
  }
}

export function useRegister() {
  const [register, { loading: isCreatingAccount, error: registerError }] = useMutation(REGISTER_GQL)
  
  return {
    register,
    isCreatingAccount,
    registerError,
  }
}