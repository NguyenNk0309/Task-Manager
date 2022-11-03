import { Drawer } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionCloseModal } from '../redux/action/modalAction'

const Modal = () => {
	const { open, Content, handleSubmit } = useSelector((state) => state.modalReducer)
	const dispatch = useDispatch()

	const onClose = () => {
		dispatch(actionCloseModal())
	}

	return (
		<>
			<Drawer
				className='z-30'
				title=''
				placement='right'
				width='40%'
				onClose={onClose}
				closable={false}
				open={open}
				footer={
					<div className='flex justify-end gap-4 items-center text-white font-semibold'>
						<button onClick={handleSubmit} className='p-2 bg-blue-500 rounded-sm'>
							Submit
						</button>
						<button onClick={onClose} className='p-2 bg-red-500 rounded-sm'>
							Close
						</button>
					</div>
				}>
				<Content />
			</Drawer>
		</>
	)
}

export default Modal
