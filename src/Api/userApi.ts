import Api from "../Service/axios"
import userEndPoints from "../Service/endpoints"

export const loginApi = async (data: any) => {
  try {
    return await Api.post(userEndPoints.login, { email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const registerApi = async (data: any) => {
  try {
    return await Api.post(userEndPoints.register, { name: data.name,email: data.email, password: data.password })
  } catch (error) {
    return Promise.reject(error)
  }
}

export const logoutApi = async ()=>{
  try {
    return await Api.post(userEndPoints.logout)
  } catch (error) {
    return Promise.reject()
  }
}