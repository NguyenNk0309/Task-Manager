import React from 'react'
import { AiFillSetting } from 'react-icons/ai'
import { FaClipboardList, FaUserAlt } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { CURRENT_PROJECT } from '../../utils/constants/cyberBug'
import { Popover } from 'antd'
import { DELETE_ACCOUNT_SAGA } from '../../redux/constants/cyberBugConst'

const Menu = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { user } = useSelector((state) => state.loginReducer)

	return (
		<div className='bg-[rgb(244,245,247)] w-2/12 flex flex-col items-center py-4 px-2'>
			<Popover
				placement='rightTop'
				title='User'
				content={() => (
					<h3
						onClick={() => {
							navigate('/signIn')
							dispatch({ type: DELETE_ACCOUNT_SAGA, payload: user.id })
						}}
						className='text-red-500 text-lg font-semibold cursor-pointer'>
						Delete Account
					</h3>
				)}
				trigger='click'>
				<div className='flex items-center gap-4 mb-10 cursor-pointer'>
					<div className='w-[50px] h-[50px] border-2 border-black rounded-full'>
						<img className='w-full h-full rounded-full' src={user.avatar} alt='' />
					</div>
					<span className='font-semibold'>{user.name}</span>
				</div>
			</Popover>
			<div className='flex flex-col items-start gap-4'>
				<NavLink
					to='project-management'
					className={({ isActive }) =>
						`${
							isActive ? 'font-semibold text-blue-500' : 'text-black'
						} hover:text-blue-500 flex items-center gap-4 hover:no-underline`
					}>
					<AiFillSetting />
					<span>Project Management</span>
				</NavLink>

				<NavLink
					to='create-project'
					className={({ isActive }) =>
						`${
							isActive ? 'font-semibold text-blue-500' : 'text-black'
						} hover:text-blue-500 flex items-center gap-4 hover:no-underline`
					}>
					<FaPlus />
					<span>Create Project</span>
				</NavLink>

				<NavLink
					to={`project-detail/${localStorage.getItem(CURRENT_PROJECT)}`}
					className={({ isActive }) =>
						`${
							isActive ? 'font-semibold text-blue-500' : 'text-black'
						} hover:text-blue-500 flex items-center gap-4 hover:no-underline`
					}>
					<FaClipboardList />
					<span>Project Detail</span>
				</NavLink>
			</div>
			<span className='block bg-slate-400 h-[1px] w-full my-4'></span>
			<NavLink
				to='user-management'
				className={({ isActive }) =>
					`${
						isActive ? 'font-semibold text-blue-500' : 'text-black'
					} hover:text-blue-500 flex items-center gap-4 hover:no-underline`
				}>
				<FaUserAlt />
				<span>User Management</span>
			</NavLink>
		</div>
	)
}

export default Menu
