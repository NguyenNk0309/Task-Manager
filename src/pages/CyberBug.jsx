import React from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, SideBar } from '../components'

const CyberBug = () => {
	return (
		<div className='flex h-screen'>
			<SideBar />
			<Menu />
			<div className='p-4 grow'>
				<Outlet />
			</div>
		</div>
	)
}

export default CyberBug
