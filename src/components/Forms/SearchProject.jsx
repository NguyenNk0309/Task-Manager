import { AutoComplete } from 'antd'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { actionCloseModal2 } from '../../redux/action/modalAction'
import { GET_PROJECT_DETAIL_SAGA, SEARCH_PROJECT_SAGA } from '../../redux/constants/cyberBugConst'
import { CURRENT_PROJECT } from '../../utils/constants/cyberBug'

const SearchProject = () => {
	const [value, setValue] = useState('')

	const searchRef = useRef(null)

	const { projectSearch } = useSelector((state) => state.ProjectManagementReducer)

	const dispatch = useDispatch()

	const navigate = useNavigate()

	const projects = projectSearch.map((project) => ({
		label: project?.projectName,
		value: project?.id?.toString(),
	}))

	return (
		<div>
			<AutoComplete
				placeholder='Search Here'
				defaultActiveFirstOption={true}
				options={projects}
				onSearch={(value) => {
					if (searchRef.current) {
						clearTimeout(searchRef.current)
					}
					searchRef.current = setTimeout(() => {
						dispatch({ type: SEARCH_PROJECT_SAGA, payload: value })
					}, 300)
				}}
				onSelect={(value, option) => {
					navigate(`/project/project-detail/${value}`)
					localStorage.setItem(CURRENT_PROJECT, value)
					dispatch({ type: GET_PROJECT_DETAIL_SAGA, payload: value })
					dispatch(actionCloseModal2())
				}}
				onChange={(value) => {
					setValue(value)
				}}
				value={value}
				className='w-full'
			/>
		</div>
	)
}

export default SearchProject
