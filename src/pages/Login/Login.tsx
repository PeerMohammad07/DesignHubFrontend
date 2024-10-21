import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import { FaEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import './Login.scss'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginApi } from "../../Api/userApi";
import { userLogin } from "../../Redux/Slices/userSlice";
import { useDispatch } from "react-redux";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email. Please enter a valid email address."),
  password: z.string()
    .trim()
    .min(1, "Password cannot be empty.")
    .refine((password) => password.length > 0, {
      message: "Password cannot be only spaces.",
    })
});

type ILogin = z.infer<typeof loginSchema>;

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [eyeState, setEyeState] = useState(false)
  const { register, handleSubmit, formState: { errors } , setError} = useForm<ILogin>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: ILogin) => {
    try {
      setLoading(true)
      const response = await loginApi(data)
      if (response?.data.status) {
        setLoading(false)
        console.log(response.data.data)
        dispatch(userLogin(response.data.data))
        navigate("/")
      }
      setLoading(false)
    } catch (error:any) {
      if(error.status == 400){
        setError("password",{
          type: "manual",
          message : "Incorrect password"
        })
        setLoading(false)
      }else if(error.status == 404){
        setError("email",{
          type : "manual",
          message : "User not found with this email"
        })
        setLoading(false)
      }
    }
  }

  return (
    <div className="login-container">
      <header className="login-header">
        <Link to={"/"} className="back-btn">
          <BiLeftArrowAlt className="back-icon" />
          Back
        </Link>
        <Link to={"/register"} className="create-account-btn">Create Account</Link>
      </header>
      <main className="login-form">
        <div className="login-content">
          <img src={"/logo.png"} alt="" className="login-logo" />
          <h1 className="login-title">Log into DesignHub</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login-input-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input
                type="email"
                id="email"
                {...register("email")}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="login-input-group">
              <label htmlFor="password">PASSWORD</label>
              <div className="login-input-wrapper">
                <input
                  type={eyeState ? "text" : "password"}
                  id="password"
                  {...register("password")}
                />
                <button type="button" className="eye-btn" onClick={() => setEyeState(!eyeState)}>
                  {eyeState ? <FaEye /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && <p className="error-message">{errors.password.message}</p>}
            </div>
            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default Login