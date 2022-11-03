import { Avatar } from 'antd'
import HTMLReactParser from 'html-react-parser'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { CreateTask, PopUpConfirm } from '../components'
import TaskDetail from '../components/Forms/TaskDetail'
import { actionOpenModal, actionOpenModal2 } from '../redux/action/modalAction'
import { DELETE_TASK_SAGA, GET_PROJECT_DETAIL_SAGA, UPDATE_STATUS_TASK_SAGA } from '../redux/constants/cyberBugConst'
import { NotFound } from './../pages'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { GoPrimitiveDot } from 'react-icons/go'
import { motion } from 'framer-motion'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

const ProjectDetail = () => {
	const param = useParams()
	const projectId = param.projectId

	const dispatch = useDispatch()
	const { projectDetail } = useSelector((state) => state.projectDetailReducer)
	const { user } = useSelector((state) => state.loginReducer)

	useEffect(() => {
		if (projectId !== 'null') {
			dispatch({ type: GET_PROJECT_DETAIL_SAGA, payload: projectId })
		}
	}, [])

	function priorityColor(priority) {
		switch (priority) {
			case 'High':
				return 'text-red-500'
			case 'Medium':
				return 'text-orange-500'
			case 'Low':
				return 'text-yellow-500'
			case 'Lowest':
				return 'text-green-500'
			default:
				break
		}
	}

	function handleDragEnd(result) {
		const { draggableId, destination, source } = result
		const payload = {
			taskId: draggableId,
			statusId: destination.droppableId,
		}
		if (!destination) {
			return
		}
		if (source.index === destination.index && source.droppableId === destination.droppableId) {
			return
		}
		dispatch({ type: UPDATE_STATUS_TASK_SAGA, payload })
	}

	return JSON.stringify(projectDetail) !== '{}' ? (
		<div className='flex flex-col gap-6 h-full overflow-y-auto'>
			<div className='flex gap-8 items-center'>
				<h1 className='text-3xl font-semibold'>{projectDetail.projectName}</h1>
				<span className='px-2 border-2 border-blue-500 bg-blue-200 font-semibold rounded-md text-blue-500'>
					{projectDetail.creator.name}
				</span>
			</div>

			<div className='border-2 border-slate-400 rounded-md p-2'>
				<p className='font-semibold text-lg text-blue-700'>Description:</p>
				{HTMLReactParser(projectDetail.description)}
			</div>

			<div className='flex items-center gap-6'>
				<div className='flex items-center'>
					<Avatar.Group maxPopoverTrigger='hover' maxCount={3}>
						<Avatar src={user.avatar} />
						{projectDetail.members.map((member, index) => (
							<Avatar key={index} src={member.avatar} />
						))}
					</Avatar.Group>
				</div>
				<div>
					<button
						onClick={() => dispatch(actionOpenModal(<CreateTask projectDetail={projectDetail} />))}
						className='text-blue-500 border-2 border-blue-500 hover:bg-blue-500 hover:text-white py-1 px-2 rounded-md transition-all font-semibold '>
						Create Task
					</button>
				</div>
			</div>

			<div className='grid grid-cols-4 gap-2'>
				<DragDropContext onDragEnd={handleDragEnd}>
					{projectDetail.lstTask.map((listTask, index) => (
						<Droppable key={index} droppableId={listTask.statusId}>
							{(provided) => (
								<div className='bg-slate-300 rounded-sm p-2'>
									<div className='border-b-[1px] border-slate-500 pb-2'>
										<h1 className='font-semibold text-slate-500'>{listTask.statusName}</h1>
									</div>
									<div className='h-[300px] 3xl:h-[500px] overflow-y-auto pt-2'>
										<ul className='h-full' ref={provided.innerRef} {...provided.droppableProps}>
											{listTask.lstTaskDeTail
												.sort(
													(task1, task2) =>
														task1.priorityTask.priorityId - task2.priorityTask.priorityId
												)
												.map((task, index) => (
													<Draggable
														draggableId={task.taskId.toString()}
														index={index}
														key={task.taskId.toString()}>
														{(provided) => (
															<li
																ref={provided.innerRef}
																{...provided.draggableProps}
																{...provided.dragHandleProps}
																onClick={() =>
																	dispatch(
																		actionOpenModal2(
																			task.taskName,
																			true,
																			<TaskDetail taskId={task.taskId} />
																		)
																	)
																}
																className=' flex flex-col gap-2 p-2 bg-white rounded-sm mb-2 cursor-pointer'
																key={index}>
																<div className='flex justify-end'>
																	<PopUpConfirm
																		onConfirm={(e) => {
																			e.stopPropagation()
																			dispatch({
																				type: DELETE_TASK_SAGA,
																				payload: task.taskId,
																			})
																		}}
																		text='Delete this task ?'>
																		<AiOutlineCloseCircle
																			onClick={(e) => e.stopPropagation()}
																			className='text-red-500 text-xl font-semibold'
																		/>
																	</PopUpConfirm>
																</div>
																<p className='font-semibold text-lg'>{task.taskName}</p>
																<div className='flex flex-col lg:flex-row items-center justify-between'>
																	<div className='flex items-center gap-1 mb-2'>
																		<span>Priority: </span>
																		<div
																			className={`flex items-center ${priorityColor(
																				task.priorityTask.priority
																			)}`}>
																			<span className='font-bold'>
																				{task.priorityTask.priority}
																			</span>
																			<motion.div
																				initial={{ opacity: 1 }}
																				animate={{ opacity: [0, 1, 0] }}
																				transition={{
																					repeat: Infinity,
																					duration: 2,
																				}}>
																				<GoPrimitiveDot className='text-xl' />
																			</motion.div>
																		</div>
																	</div>
																	<div>
																		<Avatar.Group maxPopoverTrigger='' maxCount={2}>
																			<Avatar src={user.avatar} />
																			{task.assigness.map((member, index) => (
																				<Avatar
																					key={index}
																					src={member.avatar}
																				/>
																			))}
																		</Avatar.Group>
																	</div>
																</div>
															</li>
														)}
													</Draggable>
												))}
											{provided.placeholder}
										</ul>
									</div>
								</div>
							)}
						</Droppable>
					))}
				</DragDropContext>
			</div>
		</div>
	) : (
		<NotFound />
	)
}

export default ProjectDetail
