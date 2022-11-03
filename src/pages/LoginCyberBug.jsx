import React from 'react'
import { AiOutlineUser, AiFillLock } from 'react-icons/ai'
import { FaFacebookF, FaYoutube } from 'react-icons/fa'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import { actionSignInSaga } from '../redux/action/userAction'
import { useNavigate, NavLink } from 'react-router-dom'

const LoginCyberBug = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const formik = useFormik({
		initialValues: {
			email: '',
			passWord: '',
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Email is required'),
			passWord: Yup.string().required('Password is required').min(6, 'Password must have min 6 characters'),
		}),
		onSubmit: (values) => {
			dispatch(actionSignInSaga(values, navigate))
		},
	})

	return (
		<div className='flex flex-col p-4 h-full'>
			<h1 className='text-4xl text-center'>Sign In</h1>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4 items-center justify-center grow px-10'>
				<div className='w-full'>
					<div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
						<AiOutlineUser />
						<input
							onChange={formik.handleChange}
							value={formik.values.email}
							placeholder='email'
							name='email'
							className='focus:outline-none w-full'
							type='email'
						/>
					</div>
					{formik.touched.email && formik.errors.email ? (
						<span className='text-red-500'>{formik.errors.email}</span>
					) : null}
				</div>
				<div className='w-full'>
					<div className='w-full flex items-center text-xl gap-4 border px-4 py-1'>
						<AiFillLock />
						<input
							onChange={formik.handleChange}
							value={formik.values.passWord}
							placeholder='password'
							name='passWord'
							className='focus:outline-none w-full'
							type='password'
						/>
					</div>
					{formik.touched.passWord && formik.errors.passWord ? (
						<span className='text-red-500'>{formik.errors.passWord}</span>
					) : null}
				</div>
				<p>
					Don't have an account:
					<NavLink className='text-green-700 font-semibold' to='/signUp'>
						{' '}
						Sign Up
					</NavLink>
				</p>
				<button type='submit' className='bg-[rgb(102,117,223)] w-full px-4 py-2 font-semibold text-white'>
					Sign In
				</button>
				<div className='flex items-center gap-4 text-xl text-white'>
					<div className='p-2 rounded-full bg-blue-600 cursor-pointer'>
						<FaFacebookF />
					</div>
					<div className='p-2 rounded-full bg-red-600 cursor-pointer'>
						<FaYoutube />
					</div>
				</div>
			</form>
		</div>
	)
}

export default LoginCyberBug
