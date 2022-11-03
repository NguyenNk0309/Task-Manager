import { useFormik } from 'formik'
import * as Yup from 'yup'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { EDIT_ACCOUNT_SAGA } from '../../redux/constants/cyberBugConst'

const EditAccount = ({ data }) => {
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			id: data.userId,
			passWord: '',
			email: data.email,
			name: data.name,
			phoneNumber: data.phoneNumber,
		},
		validationSchema: Yup.object({
			email: Yup.string().email('Invalid email address').required('Email is required'),
			passWord: Yup.string().required('Password is required').min(6, 'Password must have min 6 characters'),
			name: Yup.string()
				.required('Name is required')
				.min(3, 'Name must have min 3 characters')
				.max(18, 'Name must have max 18 characters'),
			phoneNumber: Yup.string()
				.required('Phone number is required')
				.length(10, 'Phone number must have 10 numbers')
				.matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Phone number is invalid'),
		}),
		onSubmit: (values) => {
			dispatch({ type: EDIT_ACCOUNT_SAGA, payload: values })
		},
	})

	useEffect(() => {
		dispatch({ type: 'SET_SUBMIT_BTN', payload: () => formik.handleSubmit() })
	}, [])

	return (
		<div>
			<h1 className='text-xl font-semibold mb-4'>Edit User</h1>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-8'>
				<div className='flex flex-col'>
					<span className='font-semibold'>Name:</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.name}
						name='name'
						placeholder='User name'
						className='focus:outline-none border-b-[1px] border-[rgb(148,163,184)] py-1 text-lg'
						type='text'
					/>
					{formik.touched.name && formik.errors.name ? (
						<span className='text-red-500'>{formik.errors.name}</span>
					) : null}
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Email:</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.email}
						name='email'
						placeholder='Email'
						className='focus:outline-none border-b-[1px] border-[rgb(148,163,184)] py-1 text-lg'
						type='text'
					/>
					{formik.touched.email && formik.errors.email ? (
						<span className='text-red-500'>{formik.errors.email}</span>
					) : null}
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Password:</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.passWord}
						name='passWord'
						placeholder='Password'
						className='focus:outline-none border-b-[1px] border-[rgb(148,163,184)] py-1 text-lg'
						type='text'
					/>
					{formik.touched.passWord && formik.errors.passWord ? (
						<span className='text-red-500'>{formik.errors.passWord}</span>
					) : null}
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Phone Number:</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.phoneNumber}
						name='phoneNumber'
						placeholder='Phone Number'
						className='focus:outline-none border-b-[1px] border-[rgb(148,163,184)] py-1 text-lg'
						type='text'
					/>
					{formik.touched.phoneNumber && formik.errors.phoneNumber ? (
						<span className='text-red-500'>{formik.errors.phoneNumber}</span>
					) : null}
				</div>
			</form>
		</div>
	)
}

export default EditAccount
