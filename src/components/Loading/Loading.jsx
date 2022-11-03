import React from 'react'
import { motion } from 'framer-motion'

const Loading = () => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 2 }}
			className='fixed top-0 left-0 z-50 w-full h-full bg-white flex items-center justify-center text-white'>
			<img
				className='w-full h-full object-cover'
				src='https://lh3.googleusercontent.com/0lJ8O9Yr9pWVPjY7zuTXemwjZraWi70kAdvScBf3HZCT7m29tWI5h415IjkKwH1EISNXS81XiOoRe5O6HCCcKmrTdEN_xnuNqCgLyTKzw_4GNdDaofB8yp79o7IA8wRPqAgKaA_umuGy_82rgmuXGlSnDsLkwVgtamlTSlQkkMg0tWPZpukERqjV35-MDFc1iDjJS1HIHISoI3wYeRgWnkgsyGyTGLK3xTVaeHXVtRD5YEvkHaEnOkOfpnQW-Pnpxh6z-GE2_FUxqwqU1caAuROWDh2vbgkLzA6x4L-7OraF_utH9PWMlVph9WtQZDi4ENL74Wk92MNeXR0ZBWa0jCjVvmi-E5UmyeJXZaUOa8OAlAXtrUXT5_eZz3vxcS67G8xJBpW8uKXeXle0CZ-Lmp6jPP13DxNCdBhKDGFPDtFjpVhOAEGMYWwFoRX9c5a1OvoYNkkdYgII4Y9693tTAY8ckUkYnFRMrUmPhBUbO02dHxIloKEydbiwesIeRjSWTaLRkD-zA9qeQ7U59zVlyQld9zCU-KGsp0kIwW80VcAc9HqizIaYfQNnYwZcAXJHrskvSCOTygBnTpwC9Gym46RIUPSP-CyElKBQzFmKqivhQLC4jvo8EfxbqdFWZKM_QPXY2vlnA-oF854Z4m4rP8vk8EsCvYoQv8bQLLMxLm7KG4VSRoi6BzJ-Vl86FUKP6Cp7w14PJqA7FyGW0cwtRY4nwgIpA3cmeYPIFbWBGjccHCJ9QFx5ZzP32dEcWqbEVsutVastGrgfeFWxW5WDBFhCD1yo53SqYNvfADUJmgs7_iGaL6tBy4d2N67GjP6hUM71HtDgovrdgkHmFLpgQBXzH681XQwoVw7T4BotqwlTL8zJhrGt1FUY1mRGbmpOaVAOOwidFQiW_71r3tXEKaSDRTRthdgPyqTtzjCZ_hMNIN0TpP1IW_VTWM08qU9tAryItxn7psA=w800-h600-no?authuser=0'
				alt='Loading'
			/>
		</motion.div>
	)
}

export default Loading
