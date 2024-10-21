import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";
import { IoEyeOffSharp } from "react-icons/io5";
import { BiLeftArrowAlt } from "react-icons/bi";
import './Register.scss';
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerApi } from "../../Api/userApi";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/Slices/userSlice";

const registerSchema = z.object({
  name: z.string()
    .trim()
    .min(3, "Name must contain at least 3 letters")
    .refine((name) => name.length > 0, {
      message: "Username cannot be only spaces.",
    }),

  email: z.string()
    .trim()
    .email("Invalid email. Please enter a valid email address."),

  password: z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password cannot exceed 20 characters")
    .refine((password) => /[A-Z]/.test(password), {
      message: "Password must contain at least one uppercase letter.",
    })
    .refine((password) => /[a-z]/.test(password), {
      message: "Password must contain at least one lowercase letter.",
    })
    .refine((password) => /\d/.test(password), {
      message: "Password must contain at least one digit.",
    })
    .refine((password) => /[!@#$%^&*(),.?":{}|<>]/.test(password), {
      message: "Password must contain at least one special character.",
    })
    .refine((password) => !/\s/.test(password), {
      message: "Password cannot contain spaces.",
    }),
});

type IRegister = z.infer<typeof registerSchema>;

const Register = () => {
  const [loading, setLoading] = useState(false)
  const [eyeState, setEyeState] = useState(false);
  const { register, handleSubmit, formState: { errors },setError } = useForm<IRegister>({
    resolver: zodResolver(registerSchema)
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: IRegister) => {
    try {
      setLoading(true)
      const response = await registerApi(data)
      if (response?.data.status) {
        setLoading(false)
        dispatch(userLogin(response.data.data))
        navigate("/")
      }
    } catch (error:any) {
      if(error.status == 409){
        setError("email", {
          type: "manual", 
          message: "User already exists with this email", 
        })
        setLoading(false)
      }else{
        console.log(error)
        setLoading(false)
      }
    }
  };

  return (
    <div className="register-container">
      <header className="register-header">
        <Link to={"/"} className="back-btn">
          <BiLeftArrowAlt className="back-icon" />
          Back
        </Link>
        <Link to={"/login"} className="login-navigate-btn">Log In</Link>
      </header>
      <main className="register-form">
        <div className="register-content">
          <h1 className="register-title">Create Your Account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register-input-group">
              <label htmlFor="username">USERNAME</label>
              <input type="text" id="username" {...register("name")} />
              {errors.name && <p className="error-message-register">{errors.name.message}</p>}
            </div>
            <div className="register-input-group">
              <label htmlFor="email">EMAIL ADDRESS</label>
              <input type="email" id="email" {...register("email")} />
              {errors.email && <p className="error-message-register">{errors.email.message}</p>} 
            </div>
            <div className="register-input-group">
              <label htmlFor="password">PASSWORD</label>
              <div className="register-input-wrapper">
                <input type={eyeState ? "text" : "password"} id="password" {...register("password")} />
                <button type="button" className="eye-btn" onClick={() => setEyeState(!eyeState)}>
                  {eyeState ? <FaEye /> : <IoEyeOffSharp />}
                </button>
              </div>
              {errors.password && <p className="error-message-register">{errors.password.message}</p>} 
            </div>
            <button type="submit" className="register-btn" disabled={loading}>
              {loading ? "Creating" :"Create Account"}
            </button>
          </form>
          <p className="terms-text">
            By creating an account, you agree to our <Link to="/terms">Terms of Service</Link> and have read and understood the <Link to="/privacy">Privacy Policy</Link>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
