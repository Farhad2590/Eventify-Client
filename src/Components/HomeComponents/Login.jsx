import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import Lottie from "lottie-react";
import animationImg from "../../assets/AnimationLottie/AnimationLogin.json";
import { FaGithub, FaGoogle } from "react-icons/fa";
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';


const Login = () => {
    const { signIn, googleLogin, githubLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = data => {
        signIn(data.Email, data.password)
            .then(result => {
                if (result.user) {
                    toast.success('Login Successfully', {
                        autoClose: 5000,
                    });
                    navigate(location?.state || '/')
                }
            })
            .catch(() => {
                toast.error('This account does not matched. Please Register First')
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
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-white relative">
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
                <div className="w-1/2 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Welcome Back</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="username"
                                placeholder="Email"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("Email")}
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register("password")}
                            />
                        </div>
                        <button className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:from-blue-600 hover:to-purple-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105">
                            Log In
                        </button>
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
                        Don't have an account?{' '}
                        <Link to='/register' className="font-medium text-blue-600 hover:text-blue-500">
                            Sign Up
                        </Link>
                    </p>
                </div>
                <div className="w-1/2 bg-blue-600 flex items-center justify-center p-12">
                    <Lottie animationData={animationImg} loop={true} className='w-full max-w-md' />
                </div>
            </div>
        </div>

    );
};

export default Login;