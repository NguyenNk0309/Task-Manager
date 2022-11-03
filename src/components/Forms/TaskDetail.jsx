import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillClockCircle } from 'react-icons/ai'
import HTMLReactParser from 'html-react-parser'
import {
	GET_PRIORITY_SAGA,
	GET_STATUS_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	GET_TASK_BY_ID_SAGA,
	GET_TASK_TYPE_SAGA,
	UPDATE_TASK_SAGA,
	CREATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
	EDIT_COMMENT_SAGA,
} from '../../redux/constants/cyberBugConst'
import { Select, Skeleton } from 'antd'
import { CURRENT_PROJECT, USER_INFO } from '../../utils/constants/cyberBug'
import { Editor } from '@tinymce/tinymce-react'
import PopUpConfirm from './../PopUpConfirm/PopUpConfirm'

const TaskDetail = ({ taskId }) => {
	const dispatch = useDispatch()
	const { taskDetail } = useSelector((state) => state.taskReducer)
	const { projectDetail } = useSelector((state) => state.projectDetailReducer)
	const { priority, status, taskType } = useSelector((state) => state.taskType_Priority_StatusReducer)

	const [typing, setTyping] = useState({
		originalEstimate: 0,
		timeTrackingRemaining: 0,
		timeTrackingSpent: 0,
	})
	const [editDescription, setEditDescription] = useState(false)
	const [descriptionChange, setDescriptionChange] = useState('')
	const [comment, setComment] = useState({ editor: '', value: '' })
	const [editComment, setEditComment] = useState(null)
	const [CommentChange, setCommentChange] = useState('')

	useEffect(() => {
		dispatch({ type: GET_PRIORITY_SAGA })
		dispatch({ type: GET_STATUS_SAGA })
		dispatch({ type: GET_TASK_TYPE_SAGA })
		dispatch({ type: GET_TASK_BY_ID_SAGA, payload: taskId })
		dispatch({ type: GET_PROJECT_DETAIL_SAGA, payload: localStorage.getItem(CURRENT_PROJECT) })
	}, [])

	useEffect(() => {
		setTyping({
			originalEstimate: taskDetail.originalEstimate || 0,
			timeTrackingRemaining: taskDetail.timeTrackingRemaining || 0,
			timeTrackingSpent: taskDetail.timeTrackingSpent || 0,
		})
	}, [taskDetail])

	function renderDescription() {
		return editDescription ? (
			<Editor
				tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
				initialValue={taskDetail.description}
				onEditorChange={(content, editor) => setDescriptionChange(content)}
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
		) : (
			<div className='w-full border-2 border-[rgb(238,238,238)] p-2 rounded-md'>
				{HTMLReactParser(taskDetail.description)}
			</div>
		)
	}

	const usersOptionDefaultValue = taskDetail.assigness?.map((member) => ({
		value: member.id,
		label: member.name,
	}))

	let timeCalc =
		(taskDetail.timeTrackingSpent * 100) /
		(parseInt(taskDetail.timeTrackingSpent) + parseInt(taskDetail.timeTrackingRemaining))
	timeCalc = isNaN(timeCalc) ? 0 : timeCalc

	const user = JSON.parse(localStorage.getItem(USER_INFO))

	const usersOption = projectDetail.members?.map((member) => ({ value: member.userId, label: member.name })) || 0

	return JSON.stringify(taskDetail) !== '{}' ? (
		<div className='flex gap-3 h-[500px] overflow-y-auto'>
			<div className='w-6/12 overflow-y-auto pr-2'>
				<div id='text-box'>
					<h3 className='text-lg font-semibold mb-1'>Comment:</h3>
					<div className='flex items-start gap-4 mb-3'>
						<div className={`w-[50px] h-[50px] rounded-full`}>
							<img className='w-full h-full rounded-full' src={user.avatar} alt='' />
						</div>

						<div className='flex flex-col gap-2 grow'>
							<Editor
								onEditorChange={(value, editor) => {
									setComment({ editor: value, value: editor.getContent({ format: 'text' }) })
								}}
								tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
								value={comment.editor}
								init={{
									height: 150,
									resize: false,
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
									toolbar: '',
									content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;',
								}}
							/>
							<button
								onClick={() => {
									if (comment.value.trim() !== '') {
										setComment({ editor: '<p></p>', value: '' })
										dispatch({
											type: CREATE_COMMENT_SAGA,
											payload: {
												taskId: taskDetail.taskId,
												contentComment: comment.editor,
											},
										})
									}
								}}
								disabled={comment.value.trim() === ''}
								className={`
								${comment.value.trim() === '' ? 'opacity-70' : 'hover:bg-blue-500 hover:text-white'}
								self-end px-2 py-1 font-semibold text-blue-500 border-2 border-blue-500  transition-all focus:outline-none`}>
								Comment
							</button>
						</div>
					</div>
				</div>
				<div className='mt-10' id='comments'>
					{taskDetail.lstComment
						.sort((a, b) => b.id - a.id)
						.map((comment, index) => (
							<div key={index} className='flex items-start gap-4 py-3 border-t-2 border-slate-300'>
								<div>
									<div className='w-[40px] h-[40px] rounded-full'>
										<img className='w-full h-full rounded-full' src={comment.avatar} alt='' />
									</div>
								</div>
								<div className='grow'>
									<h3 className='font-semibold'>{comment.name}</h3>
									{editComment === comment.id ? (
										<Editor
											onEditorChange={(value, editor) => setCommentChange(value)}
											initialValue={comment.commentContent}
											tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
											init={{
												height: 150,
												resize: false,
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
												toolbar: '',
												content_style:
													'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;',
											}}
										/>
									) : (
										<div>{HTMLReactParser(comment.commentContent)}</div>
									)}
									<div>
										{user.id === comment.idUser ? (
											editComment === comment.id ? (
												<div className='flex gap-6 justify-end'>
													<button
														onClick={() => {
															dispatch({
																type: EDIT_COMMENT_SAGA,
																payload: {
																	id: comment.id,
																	content:
																		CommentChange !== ''
																			? CommentChange
																			: comment.commentContent,
																},
															})
															setEditComment(null)
														}}
														className='text-blue-500 font-semibold focus:outline-none p-1'>
														Save Change
													</button>
													<button
														onClick={() => setEditComment(null)}
														className='text-red-500 font-semibold focus:outline-none p-1'>
														Cancel
													</button>
												</div>
											) : (
												<div className='flex gap-6 justify-end'>
													<button
														onClick={() => setEditComment(comment.id)}
														className='text-blue-500 font-semibold focus:outline-none p-1'>
														Edit
													</button>
													<PopUpConfirm
														onConfirm={() =>
															dispatch({
																type: DELETE_COMMENT_SAGA,
																payload: {
																	cmtId: comment.id,
																	taskId: taskDetail.taskId,
																},
															})
														}
														text='Delete this comment ?'>
														<button className='text-red-500 font-semibold focus:outline-none p-1'>
															Delete
														</button>
													</PopUpConfirm>
												</div>
											)
										) : null}
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			<div className='w-6/12 overflow-y-auto flex flex-col gap-4 pr-2'>
				<div className='flex items-center gap-2'>
					<h3 className='font-semibold text-lg mb-1'>This is issue of type:</h3>
					<select
						name='typeId'
						value={taskDetail.taskTypeDetail.id}
						onChange={(e) => {
							dispatch({
								type: UPDATE_TASK_SAGA,
								payload: {
									name: e.target.name,
									value: e.target.value,
									taskDetail,
								},
							})
						}}
						className='focus:outline-none text-lg border-b-2 pr-2'>
						{taskType.map((item, index) => (
							<option key={index} value={item.id}>
								{item.taskType}
							</option>
						))}
					</select>
				</div>

				<div>
					<div className='flex items-center gap-4'>
						<h3 className='text-lg font-semibold mb-1'>Description</h3>
						{editDescription ? (
							<div className='flex items-center gap-2'>
								<button
									className='focus:outline-none px-2 font-semibold text-white rounded-md bg-green-500'
									onClick={() => {
										dispatch({
											type: UPDATE_TASK_SAGA,
											payload: {
												name: 'description',
												value: descriptionChange,
												taskDetail,
											},
										})
										setEditDescription(false)
									}}>
									Save
								</button>
								<button
									className='focus:outline-none px-2 font-semibold text-white rounded-md bg-red-500'
									onClick={() => setEditDescription(false)}>
									Cancel
								</button>
							</div>
						) : (
							<button
								className='focus:outline-none px-2 font-semibold text-white rounded-md bg-blue-500'
								onClick={() => setEditDescription(true)}>
								Edit
							</button>
						)}
					</div>
					{renderDescription()}
				</div>

				<div className='flex items-center gap-2'>
					<h3 className='font-semibold text-lg mb-1'>Status:</h3>
					<select
						name='statusId'
						value={taskDetail.statusId}
						onChange={(e) => {
							dispatch({
								type: UPDATE_TASK_SAGA,
								payload: {
									name: e.target.name,
									value: e.target.value,
									taskDetail,
								},
							})
						}}
						className='focus:outline-none text-lg border-b-2 pr-2'>
						{status.map((item, index) => (
							<option key={index} value={item.statusId}>
								{item.statusName}
							</option>
						))}
					</select>
				</div>

				<div className='flex items-center gap-2'>
					<h3 className='font-semibold text-lg mb-1'>Priority:</h3>
					<select
						name='priorityId'
						value={taskDetail.priorityTask.priorityId}
						onChange={(e) => {
							dispatch({
								type: UPDATE_TASK_SAGA,
								payload: {
									name: e.target.name,
									value: e.target.value,
									taskDetail,
								},
							})
						}}
						className='focus:outline-none text-lg border-b-2 pr-2'>
						{priority.map((item, index) => (
							<option key={index} value={item.priorityId}>
								{item.priority}
							</option>
						))}
					</select>
				</div>

				<div>
					<h3 className='font-semibold text-lg mb-1'>Members</h3>
					<Select
						bordered={false}
						size='large'
						style={{ width: '100%' }}
						mode='multiple'
						options={usersOption}
						value={usersOptionDefaultValue}
						optionFilterProp='label'
						allowClear
						className='border-2 focus:outline-none'
						onChange={(value) => {
							dispatch({
								type: UPDATE_TASK_SAGA,
								payload: {
									name: 'listUserAsign',
									value: value,
									taskDetail,
								},
							})
						}}></Select>
				</div>

				<div>
					<h3 className='font-semibold text-lg mb-1'>Original Estimate</h3>
					<input
						min='0'
						name='originalEstimate'
						value={typing.originalEstimate}
						onChange={(e) => {
							setTyping({
								...typing,
								originalEstimate: e.target.value,
							})
							setTimeout(() =>
								dispatch(
									{
										type: UPDATE_TASK_SAGA,
										payload: {
											name: e.target.name,
											value: e.target.value,
											taskDetail,
										},
									},
									300
								)
							)
						}}
						className='w-full border-2 px-2 py-1 focus:outline-none text-lg'
						type='number'
					/>
				</div>

				<div>
					<h3 className='font-semibold text-lg mb-1'>Time Tracking</h3>
					<div className='flex items-start gap-3'>
						<AiFillClockCircle className='text-lg' />
						<div className='w-full'>
							<div className='h-2 bg-slate-300 relative w-full rounded-md overflow-hidden'>
								<div
									style={{
										width: `${timeCalc}%`,
									}}
									className='absolute top-0 left-0 h-2 bg-blue-500'></div>
							</div>
							<div className='flex items-center justify-between'>
								<span>{taskDetail.timeTrackingSpent}h logged</span>
								<span>{taskDetail.timeTrackingRemaining}h estimated</span>
							</div>
						</div>
					</div>
					<div className='w-full flex items-center gap-2 mt-2'>
						<div className='w-6/12'>
							<span className='font-semibold'>Time Spent</span>
							<input
								value={typing.timeTrackingSpent}
								name='timeTrackingSpent'
								onChange={(e) => {
									setTyping({
										...typing,
										[e.target.name]: e.target.value,
									})
									setTimeout(() =>
										dispatch(
											{
												type: UPDATE_TASK_SAGA,
												payload: {
													name: e.target.name,
													value: e.target.value,
													taskDetail,
												},
											},
											300
										)
									)
								}}
								className='border-2 border-slate-400 focus:outline-none py-1 px-2'
								min='0'
								type='number'
							/>
						</div>
						<div className='w-6/12'>
							<span className='font-semibold'>Time Remaining</span>
							<input
								value={typing.timeTrackingRemaining}
								name='timeTrackingRemaining'
								onChange={(e) => {
									setTyping({
										...typing,
										[e.target.name]: e.target.value,
									})
									setTimeout(() =>
										dispatch(
											{
												type: UPDATE_TASK_SAGA,
												payload: {
													name: e.target.name,
													value: e.target.value,
													taskDetail,
												},
											},
											300
										)
									)
								}}
								className='border-2 border-slate-400 focus:outline-none py-1 px-2'
								min='0'
								type='number'
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	) : (
		<Skeleton />
	)
}

export default TaskDetail
