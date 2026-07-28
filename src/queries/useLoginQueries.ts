import { useMutation } from "@apollo/client/react"

import { gql } from "@apollo/client"
import type { TypedDocumentNode } from "@apollo/client"

export type AuthUser = {
  id: string
  username: string
  email: string
}

export type LoginMutationData = {
  login?: {
    token: string
    user: AuthUser
  }
}

export type LoginMutationVariables = {
  login: string
  password: string
  deviceName?: string | null
}

export type RegisterMutationData = {
  register?: {
    token: string
    user: AuthUser
  }
}

export type RegisterMutationVariables = {
  name: string
  username: string
  email: string
  password: string
  passwordConfirmation: string
  deviceName?: string | null
}

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
` as TypedDocumentNode<LoginMutationData, LoginMutationVariables>

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
` as TypedDocumentNode<RegisterMutationData, RegisterMutationVariables>

export function useLoginMutation() {
  const [login, { loading: isLoggingIn, error: loginError }] = useMutation(LOGIN_GQL)
  
  return {
    login,
    isLoggingIn,
    loginError,
  }
}

export function useRegisterMutation() {
  const [register, { loading: isCreatingAccount, error: registerError }] = useMutation(REGISTER_GQL)
  
  return {
    register,
    isCreatingAccount,
    registerError,
  }
}