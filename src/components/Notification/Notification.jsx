import React, { useEffect } from 'react'
import { notification } from 'antd'
import { useDispatch } from 'react-redux'
import { CONNECT_FUNC } from '../../redux/constants/notificationConst'

const Notification = () => {
	const openNotification = ({ type, message }) => {
		notification[type]({
			message,

			className: 'custom-class',
		})
	}
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch({
			type: CONNECT_FUNC,
			payload: {
				openNotification,
			},
		})
	}, [dispatch])
	return <></>
}

export default Notification
