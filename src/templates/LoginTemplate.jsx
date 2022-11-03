import React from 'react'

const LoginTemplate = ({ children }) => {
	return (
		<div className='flex min-h-screen'>
			<div className='w-6/12 bg-[url("https://picsum.photos/2000")] bg-no-repeat bg-cover'></div>
			<div className='w-6/12'>{children}</div>
		</div>
	)
}

export default LoginTemplate
