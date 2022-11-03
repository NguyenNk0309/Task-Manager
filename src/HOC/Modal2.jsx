import { Modal } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { actionCloseModal2 } from '../redux/action/modalAction'

const Modal2 = () => {
	const { open, Content, title, centered } = useSelector((state) => state.modal2Reducer)
	const dispatch = useDispatch()

	return (
		<>
			<Modal
				centered={centered}
				width='60%'
				footer={null}
				zIndex={10}
				title={title}
				open={open}
				onCancel={() => dispatch(actionCloseModal2())}>
				<Content />
			</Modal>
		</>
	)
}

export default Modal2
