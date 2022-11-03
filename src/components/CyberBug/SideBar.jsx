import { FaJira, FaPlus, FaSearch } from 'react-icons/fa'
import React, { useState } from 'react'
import { CURRENT_PROJECT, TOKEN, USER_INFO } from '../../utils/constants/cyberBug'
import { motion } from 'framer-motion'
import { BiLogOutCircle } from 'react-icons/bi'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { actionOpenModal2 } from '../../redux/action/modalAction'
import SearchProject from '../Forms/SearchProject'

const SideBar = () => {
	const [isHover, setIsHover] = useState(false)
	const dispatch = useDispatch()

	return (
		<div
			onMouseEnter={() => setTimeout(() => setIsHover(true), 100)}
			onMouseLeave={() => setIsHover(false)}
			className='relative bg-[rgb(6,95,212)] w-[50px] hover:w-2/12 transition-all ease-in-out text-white flex flex-col items-center text-2xl justify-between py-4 px-2'>
			<div className='h-1/2 flex flex-col items-center justify-between'>
				<FaJira />
				<div
					onClick={() => dispatch(actionOpenModal2('Search Project', false, <SearchProject />))}
					className='text-white flex items-center justify-center gap-4 cursor-pointer'>
					<FaSearch />
					{isHover && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.1 }}
							className={`m-0`}>
							Search Project
						</motion.p>
					)}
				</div>
				<NavLink
					to='create-project'
					className='text-white flex items-center justify-center gap-4 cursor-pointer hover:text-white hover:no-underline'>
					<FaPlus />
					{isHover && (
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.1 }}
							className={`m-0`}>
							Create Project
						</motion.p>
					)}
				</NavLink>
			</div>
			<NavLink
				onClick={() => {
					localStorage.removeItem(USER_INFO)
					localStorage.removeItem(TOKEN)
					localStorage.removeItem(CURRENT_PROJECT)
				}}
				to='/signIn'
				className='text-white flex items-center justify-center gap-4 cursor-pointer hover:text-white hover:no-underline'>
				<BiLogOutCircle />
				{isHover && (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.1 }}
						className={`m-0`}>
						Log Out
					</motion.p>
				)}
			</NavLink>
		</div>
	)
}

export default SideBar
