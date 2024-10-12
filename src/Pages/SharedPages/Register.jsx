import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Lottie from 'lottie-react';
import animationImg from "../../assets/AnimationLottie/AnimationRegister.json";
import { FaGithub, FaGoogle } from 'react-icons/fa';
// import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Register = () => {

    const { createUser, googleLogin, githubLogin, updateUserProfile } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    // console.log(location)
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm()


    const onSubmit = data => {
        createUser(data.Email, data.password)
            .then(() => {
                // navigate('/')
                updateUserProfile(data.FullName, data.PhotoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.FullName,
                            email: data.Email,
                            role: 'user'
                        }
                        axiosSecure.post('/addUsers', userInfo)

                            .then(res => {
                                if (res.data.insertedId) {
                                    toast.success('Register Successfully', {
                                        autoClose: 5000,
                                    });
                                    navigate('/')
                                }
                            })
                    })

            })
            .catch(() => {
                toast.error('This account is already registered')
            })
    }

    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    role: 'Client'
                }
                axiosSecure.post('/addUsers', userInfo)
                    .then(res => {
                        console.log(res.data)
                        navigate(location?.state || '/')
                    })
                    .catch(error => {
                        toast.error(error.message)
                    })
            })
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative my-4">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10">
                <div className="absolute top-2 left-2 w-10 h-10 border-2 border-blue-600 rounded-full"></div>
                <div className="absolute bottom-2 right-2 w-20 h-20 border-2 border-blue-600 rotate-45"></div>
                <div className="absolute top-8 left-2 w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="absolute bottom-8 right-2 w-12 h-12 border-2 border-blue-600 transform rotate-12"></div>
                <div className="absolute top-24 left-2 w-10 h-10 border-2 border-blue-600 rounded-full"></div>
                <div className="absolute bottom-24 right-2 w-20 h-20 border-2 border-blue-600 rotate-45"></div>
                <div className="absolute top-24 left-2 w-8 h-8 bg-blue-600 rounded-full"></div>
                <div className="absolute bottom-24 right-2 w-12 h-12 border-2 border-blue-600 transform rotate-12"></div>
            </div>

            <div className="bg-white rounded-lg shadow-2xl overflow-hidden flex max-w-4xl w-full z-10">
                <div className="w-1/2 bg-blue-600 flex items-center justify-center p-12">
                    <Lottie animationData={animationImg} loop={true} className='w-full max-w-md' />
                </div>
                <div className="w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Please Register Here</h1>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate="" action="" className="space-y-6">
                        <div className=" text-sm">
                            <label htmlFor="name" className="block dark:text-gray-600">Name</label>
                            <input type="text" required name="name" id="username" placeholder="Name" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("FullName")}
                            />
                        </div>
                        <div className=" text-sm">
                            <label htmlFor="photo" className="block dark:text-gray-600">Photo URL</label>
                            <input type="text" name="photo" id="username" placeholder="Photo URL" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("PhotoURL")}
                            />
                        </div>
                        <div className=" text-sm">
                            <label htmlFor="email" className="block dark:text-gray-600">Email</label>
                            <input type="email" required name="email" id="username" placeholder="Email" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("Email")}
                            />
                        </div>
                        <div className=" text-sm">
                            <label htmlFor="password" className="block dark:text-gray-600">Password</label>
                            <div className="relative ">
                                <input type='text' required name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("password")}
                                />
                            </div>
                        </div>
                        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">Register</button>
                    </form>

                    <div className="mt-6 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <span className="text-xs text-gray-500 uppercase">or login with</span>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                    <div className="flex justify-center space-x-4 mt-4">
                        <button
                            onClick={() => handleSocialLogin(googleLogin)}
                            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
                        >
                            <FaGoogle />
                            <span className="ml-2">Google</span>
                        </button>
                        <button
                            onClick={() => handleSocialLogin(githubLogin)}
                            className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 transition duration-150"
                        >
                            <FaGithub />
                            <span className="ml-2">GitHub</span>
                        </button>
                    </div>
                    <p className="mt-8 text-sm text-center text-gray-600">
                        ALready have an account?{' '}
                        <Link to='/login' className="font-medium text-blue-600 hover:text-blue-500">
                            Sign In
                        </Link>
                    </p>
                </div>

            </div>
        </div>

    );
};

export default Register;