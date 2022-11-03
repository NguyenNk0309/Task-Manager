import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Select } from 'antd'
import {
	CREATE_TASK_SAGA,
	GET_PRIORITY_SAGA,
	GET_STATUS_SAGA,
	GET_TASK_TYPE_SAGA,
} from '../../redux/constants/cyberBugConst'

const CreateTask = ({ projectDetail }) => {
	useEffect(() => {
		dispatch({ type: GET_TASK_TYPE_SAGA })
		dispatch({ type: GET_PRIORITY_SAGA })
		dispatch({ type: GET_STATUS_SAGA })
		dispatch({ type: 'SET_SUBMIT_BTN', payload: () => formik.handleSubmit() })
	}, [])

	const dispatch = useDispatch()
	const { taskType, priority, status } = useSelector((state) => state.taskType_Priority_StatusReducer)

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			taskName: '',
			description: '',
			statusId: status[0]?.statusId,
			typeId: taskType[0]?.id,
			priorityId: priority[0]?.priorityId,
			originalEstimate: 0,
			timeTrackingSpent: 0,
			timeTrackingRemaining: 0,
			projectId: projectDetail.id,
			listUserAsign: [],
		},
		validationSchema: Yup.object({
			taskName: Yup.string().required('Name is required').max(10, 'Name must have only 10 characters'),
		}),
		onSubmit: (values) => {
			dispatch({ type: CREATE_TASK_SAGA, payload: values })
		},
	})

	const timeCalc =
		(formik.values.timeTrackingSpent * 100) /
		(parseInt(formik.values.timeTrackingSpent) + parseInt(formik.values.timeTrackingRemaining))
	const usersOption = projectDetail.members.map((member) => ({ value: member.userId, label: member.name }))

	return (
		<div>
			<h1 className='text-xl font-semibold mb-4'>Create Task</h1>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
				<div className='py-1 text-lg'>
					<span className='font-semibold'>
						Project Name: <span className='text-blue-500'>{projectDetail.projectName}</span>
					</span>
				</div>
				<div>
					<span className='font-semibold'>Task Name</span>
					<input
						name='taskName'
						onChange={formik.handleChange}
						value={formik.values.taskName}
						className='focus:outline-none text-lg w-full border-[1px] py-1 px-2 border-[rgb(148,163,184)]'
						type='text'
					/>
					{formik.touched.taskName && formik.errors.taskName ? (
						<span className='text-red-500'>{formik.errors.taskName}</span>
					) : null}
				</div>
				<div className='flex items-center gap-4'>
					<div className='w-6/12'>
						<span className='font-semibold'>Priority</span>
						<select
							name='priorityId'
							onChange={formik.handleChange}
							value={formik.values.priorityId}
							className='text-lg w-full border-[1px] py-1 border-[rgb(148,163,184)]'>
							{priority.map((item, index) => (
								<option key={index} value={item.priorityId}>
									{item.priority}
								</option>
							))}
						</select>
					</div>
					<div className='w-6/12'>
						<span className='font-semibold'>Task Type</span>
						<select
							name='typeId'
							onChange={formik.handleChange}
							value={formik.values.typeId}
							className='text-lg w-full border-[1px] py-1 border-[rgb(148,163,184)]'>
							{taskType.map((item, index) => (
								<option key={index} value={item.id}>
									{item.taskType}
								</option>
							))}
						</select>
					</div>
				</div>
				<div>
					<span className='font-semibold'>Status</span>
					<select
						name='statusId'
						onChange={formik.handleChange}
						value={formik.values.statusId}
						className='text-lg w-full border-[1px] py-1 border-[rgb(148,163,184)]'>
						{status.map((item, index) => (
							<option key={index} value={item.statusId}>
								{item.statusName}
							</option>
						))}
					</select>
				</div>
				<div>
					<span className='font-semibold'>Add Member</span>
					<Select
						mode='multiple'
						options={usersOption}
						optionFilterProp='label'
						allowClear
						style={{
							border: '1px',
							borderColor: 'rgb(148,163,184)',
							fontSize: '1rem',
							lineHeight: '1.75rem',
							width: '100%',
						}}
						onChange={(value) => formik.handleChange({ target: { name: 'listUserAsign', value } })}
						placeholder='Search Member'></Select>
				</div>
				<div>
					<span className='font-semibold'>Time Tracking</span>
					<div className='border-[1px] border-[rgb(148,163,184)] p-2'>
						<div className='flex flex-col gap-3'>
							<div className='h-2 bg-slate-300 w-full relative overflow-hidden rounded-md'>
								<div
									style={{ width: `${timeCalc}%` }}
									className='absolute h-full top-0 left-0 bg-blue-500 transition-all'></div>
							</div>
							<div className='flex items-center gap-4'>
								<div className='w-6/12'>
									<span className='font-semibold'>Time Spent (h)</span>
									<input
										name='timeTrackingSpent'
										value={formik.values.timeTrackingSpent}
										onChange={formik.handleChange}
										min='0'
										className='focus:outline-none text-lg w-full border-b-[1px] py-1 border-[rgb(148,163,184)]'
										type='number'
									/>
								</div>
								<div className='w-6/12'>
									<span className='font-semibold'>Time Remaining (h)</span>
									<input
										name='timeTrackingRemaining'
										value={formik.values.timeTrackingRemaining}
										onChange={formik.handleChange}
										min='0'
										className='focus:outline-none text-lg w-full border-b-[1px] py-1 border-[rgb(148,163,184)]'
										type='number'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div>
					<span className='font-semibold'>Original Estimate</span>
					<input
						name='originalEstimate'
						value={formik.values.originalEstimate}
						onChange={formik.handleChange}
						className='focus:outline-none text-lg w-full border-[1px] py-1 px-2 border-[rgb(148,163,184)]'
						min='0'
						type='number'
					/>
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Description:</span>
					<div className='border-[1px] border-[rgb(148,163,184)] rounded-[10px]'>
						<Editor
							onEditorChange={(value) => {
								formik.handleChange({ target: { name: 'description', value } })
							}}
							tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
							init={{
								height: 250,
								menubar: false,
								plugins: [
									'advlist',
									'autolink',
									'lists',
									'link',
									'image',
									'charmap',
									'anchor',
									'searchreplace',
									'visualblocks',
									'code',
									'fullscreen',
									'insertdatetime',
									'media',
									'table',
									'preview',
									'help',
									'wordcount',
								],
								toolbar:
									'undo redo | blocks | ' +
									'bold italic forecolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'removeformat | help',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;',
							}}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default CreateTask
