import axios from 'axios'
import { BASE_URL } from './constants'

type LoginProps = {
  email: string
  password: string
}

type LoginResponse = {
  username: string
  email: string
  _id: number
}

type SignupProps = LoginProps & { username: string }

type SignupResponse = {
  message: string
  result: {
    username: string
    email: string
    _id: number
  }
  success: boolean
}

export const loginUser = async (data: LoginProps): Promise<LoginResponse> => {
  return axios.post(BASE_URL + `/user/login/`, data).then((res) => res.data)
}

export const signupUser = async (
  data: SignupProps
): Promise<SignupResponse> => {
  return axios.post(BASE_URL + `/user/signup/`, data).then((res) => res.data)
}
