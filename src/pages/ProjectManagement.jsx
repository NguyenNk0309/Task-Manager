import { AutoComplete, Avatar, Button, Input, Popover, Space, Table } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillDelete } from 'react-icons/ai'
import { BsFillPencilFill } from 'react-icons/bs'
import {
	ASSIGN_USER_PROJECT,
	DELETE_PROJECT_SAGA,
	DELETE_USER_FROM_PROJECT,
	GET_PROJECT_SAGA,
	GET_USER_SAGA,
} from '../redux/constants/cyberBugConst'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { actionOpenModal } from '../redux/action/modalAction'
import FormEdit from '../components/Forms/FormEdit'
import { PopUpConfirm } from '../components'
import { NavLink } from 'react-router-dom'
import { CURRENT_PROJECT, USER_INFO } from '../utils/constants/cyberBug'

const ProjectManagement = () => {
	const user = JSON.parse(localStorage.getItem(USER_INFO))
	const [searchText, setSearchText] = useState('')
	const [searchedColumn, setSearchedColumn] = useState('')
	const [value, setValue] = useState('')
	const searchInput = useRef(null)
	const { projects } = useSelector((state) => state.ProjectManagementReducer)
	const { userSearch } = useSelector((state) => state.userReducer)
	const dispatch = useDispatch()
	const searchRef = useRef(null)
	useEffect(() => {
		dispatch({ type: GET_PROJECT_SAGA })
	}, [dispatch])

	const handleSearch = (selectedKeys, confirm, dataIndex) => {
		confirm()
		setSearchText(selectedKeys[0])
		setSearchedColumn(dataIndex)
	}

	const handleReset = (clearFilters) => {
		clearFilters()
		setSearchText('')
	}

	const getColumnSearchProps = (dataIndex) => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div
				style={{
					padding: 8,
				}}>
				<Input
					ref={searchInput}
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
					style={{
						marginBottom: 8,
						display: 'block',
					}}
				/>
				<Space>
					<Button
						type='primary'
						className='text-white bg-blue-500 flex items-center justify-center'
						onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
						icon={<SearchOutlined />}
						size='small'
						style={{
							width: 90,
						}}>
						Search
					</Button>
					<Button
						onClick={() => clearFilters && handleReset(clearFilters)}
						size='small'
						style={{
							width: 90,
						}}>
						Reset
					</Button>
					<Button
						type='link'
						size='small'
						onClick={() => {
							confirm({
								closeDropdown: false,
							})
							setSearchText(selectedKeys[0])
							setSearchedColumn(dataIndex)
						}}>
						Filter
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered) => (
			<SearchOutlined
				style={{
					color: filtered ? '#1890ff' : undefined,
				}}
			/>
		),
		onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100)
			}
		},
		render: (text) =>
			searchedColumn === dataIndex ? (
				<Highlighter
					highlightStyle={{
						backgroundColor: '#ffc069',
						padding: 0,
					}}
					searchWords={[searchText]}
					autoEscape
					textToHighlight={text ? text.toString() : ''}
				/>
			) : (
				text
			),
	})

	function deleteUserFromPrj(projectId, userId) {
		dispatch({
			type: DELETE_USER_FROM_PROJECT,
			payload: {
				projectId,
				userId,
			},
		})
	}

	const columns = [
		{
			title: 'Index',
			render(text, record, index) {
				return <span>{index + 1}</span>
			},
			width: '10%',
		},
		{
			title: 'Project Name',
			width: '20%',
			render(text, record, index) {
				return (
					<NavLink
						className='underline text-blue-500 text-lg font-semibold hover:text-blue-700 hover:underline'
						to={`/project/project-detail/${record.id}`}
						onClick={() => {
							localStorage.setItem(CURRENT_PROJECT, JSON.stringify(record.id))
						}}>
						{record.projectName}
					</NavLink>
				)
			},
		},
		{
			title: 'Category',
			dataIndex: 'categoryName',
			...getColumnSearchProps('categoryName'),
		},
		{
			title: 'Members',
			dataIndex: 'member',
			render(text, record, index) {
				return (
					<div className='flex items-center justify-between'>
						<Popover
							trigger='click'
							zIndex={10}
							title='Members'
							placement='left'
							content={() => (
								<div className='h-[200px] overflow-y-auto px-3'>
									{record.members.length > 0 ? (
										<table className='table-fixed'>
											<thead>
												<tr>
													<th>Avatar</th>
													<th>Name</th>
													<th></th>
												</tr>
											</thead>
											<tbody>
												{record.members.map((member, index) => (
													<tr key={index}>
														<td>
															<div className='p-2'>
																<img
																	className='w-50 h-50 rounded-full'
																	src={member.avatar}
																	alt=''
																/>
															</div>
														</td>
														<td>
															<div className='p-2'>{member.name}</div>
														</td>
														<td>
															<div className='flex justify-end'>
																<button
																	onClick={() =>
																		deleteUserFromPrj(record.id, member.userId)
																	}
																	className='text-red-500 font-bold focus:outline-none'>
																	Delete
																</button>
															</div>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									) : (
										<h3 className='text-xl font-semibold  text-center text-slate-400'>Empty</h3>
									)}
								</div>
							)}>
							<div>
								<Avatar.Group maxPopoverTrigger='' maxCount={3}>
									<Avatar src={user.avatar} />
									{record?.members.map((member, index) => (
										<Avatar key={index} src={member.avatar} />
									))}
								</Avatar.Group>
							</div>
						</Popover>
						<div>
							<Popover
								trigger='click'
								zIndex={10}
								title='Add Member'
								content={() => (
									<AutoComplete
										placeholder='Search Here'
										options={userSearch.map((user) => ({
											label: user?.name,
											value: user?.userId?.toString(),
										}))}
										onSearch={(value) => {
											if (searchRef.current) {
												clearTimeout(searchRef.current)
											}
											searchRef.current = setTimeout(() => {
												dispatch({ type: GET_USER_SAGA, payload: value })
											}, 300)
										}}
										onSelect={(value, option) => {
											setValue('')
											if (user.id !== parseInt(value)) {
												dispatch({
													type: ASSIGN_USER_PROJECT,
													payload: {
														projectId: record.id,
														userId: parseInt(value),
													},
												})
											}
										}}
										onChange={(value) => {
											setValue(value)
										}}
										value={value}
										className='w-40'
										// popupClassName='bg-blue-300 max-h-[50px]'
									/>
								)}>
								<Avatar className='text-blue-500 text-lg font-semibold bg-white border-2 border-blue-500 cursor-pointer'>
									+
								</Avatar>
							</Popover>
						</div>
					</div>
				)
			},
		},
		{
			title: '',
			render(text, record, index) {
				return (
					<div className='flex justify-center gap-4 text-white text-lg'>
						<PopUpConfirm
							text='Are you sure to delete this project ?'
							onConfirm={() => dispatch({ type: DELETE_PROJECT_SAGA, payload: record })}>
							<button className='bg-red-500 p-1 rounded-md'>
								<AiFillDelete />
							</button>
						</PopUpConfirm>
						<button
							onClick={() => dispatch(actionOpenModal(<FormEdit data={record} />))}
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
			<h1 className='text-3xl font-semibold mb-4'>Project Management</h1>
			<div className='border'>
				<Table rowKey='id' pagination={{ defaultPageSize: 5 }} columns={columns} dataSource={projects} />
			</div>
			{projects.length === 0 ? (
				<div className='mt-4 flex justify-center'>
					<NavLink
						className='border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white text-xl p-2 inline-block font-semibold rounded-md'
						to='/project/create-project'>
						Create Now
					</NavLink>
				</div>
			) : null}
		</div>
	)
}

export default ProjectManagement
