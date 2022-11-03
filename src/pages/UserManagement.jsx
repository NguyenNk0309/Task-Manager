import { AutoComplete, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill, BsSearch } from 'react-icons/bs'
import { DELETE_ACCOUNT_SAGA, GET_USER_SAGA } from '../redux/constants/cyberBugConst'
import { EditAccount, PopUpConfirm } from '../components'
import { actionOpenModal } from '../redux/action/modalAction'

const UserManagement = () => {
	const dispatch = useDispatch()
	const { userSearch } = useSelector((state) => state.userReducer)

	const searchRef = useRef(null)

	const [value, setValue] = useState('')

	useEffect(() => {
		dispatch({ type: GET_USER_SAGA, payload: '' })
	}, [])

	const columns = [
		{
			title: 'Avatar',
			render(text, record, index) {
				return (
					<div className={`w-[30px] h-[30px] rounded-full`}>
						<img className='w-full h-full rounded-full' src={record.avatar} alt='' />
					</div>
				)
			},
			width: '10%',
		},
		{
			title: 'Name',
			render(text, record, index) {
				return <span>{record.name}</span>
			},
			width: '10%',
		},
		{
			title: 'Email',
			render(text, record, index) {
				return <span>{record.email}</span>
			},
		},
		{
			title: 'Phone Number',
			render(text, record, index) {
				return <span>{record.phoneNumber}</span>
			},
		},
		{
			title: '',
			render(text, record, index) {
				return (
					<div className='flex justify-center gap-4 text-white text-lg'>
						<PopUpConfirm
							text='Are you sure to delete this project ?'
							onConfirm={() => {
								setValue('')
								dispatch({ type: DELETE_ACCOUNT_SAGA, payload: record.userId })
							}}>
							<button className='bg-red-500 p-1 rounded-md'>
								<AiFillDelete />
							</button>
						</PopUpConfirm>
						<button
							onClick={() => dispatch(actionOpenModal(<EditAccount data={record} />))}
							className='bg-blue-500 p-1 rounded-md'>
							<BsFillPencilFill />
						</button>
					</div>
				)
			},
		},
	]
	return (
		<div>
			<h1 className='text-3xl font-semibold mb-4'>User Management</h1>
			<AutoComplete
				defaultActiveFirstOption={true}
				options={userSearch.map((user) => ({
					label: user?.name,
					value: user?.userId?.toString(),
				}))}
				onSelect={(value, option) => setValue(option.label)}
				onSearch={(value) => {
					setValue(value)
					if (searchRef.current) {
						clearTimeout(searchRef.current)
					}
					searchRef.current = setTimeout(() => {
						dispatch({ type: GET_USER_SAGA, payload: value })
					}, 300)
				}}
				className='w-full mb-8'>
				<div className='w-full h-12 p-2 flex items-center border-2 border-slate-300'>
					<input
						onChange={(e) => setValue(e.target.value)}
						value={value}
						type='text'
						placeholder='Search Here'
						className='grow h-full focus:outline-none'
					/>
					<div className='w-[50px] h-full flex items-center justify-center'>
						<BsSearch />
					</div>
				</div>
			</AutoComplete>
			<div className='border'>
				<Table
					className='p-2'
					rowKey='userId'
					pagination={{ defaultPageSize: 5 }}
					columns={columns}
					dataSource={userSearch}
				/>
			</div>
		</div>
	)
}

export default UserManagement
