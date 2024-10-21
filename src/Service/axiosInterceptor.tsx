import { useEffect } from 'react'
import Api from './axios';
import { useDispatch } from 'react-redux';
import { userLogout } from '../Redux/Slices/userSlice';

const axiosInterceptor = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    Api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
    
        if (error.response) {
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
              dispatch(userLogout())
            } catch (err) {
              window.location.href = "/";
              return Promise.reject(err);
            }
          }
        }
        return Promise.reject(error);
      }
    );
  },[])

  return (
    <div>
      
    </div>
  )
}

export default axiosInterceptor
