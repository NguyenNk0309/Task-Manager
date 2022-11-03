import { CONNECT_FUNC, SHOW_NOTIFICATION } from './../constants/notificationConst'

const initialState = {
	openNotification: () => null,
}

export default function notificationReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case CONNECT_FUNC: {
			newState.openNotification = payload.openNotification
			return newState
		}
		case SHOW_NOTIFICATION: {
			newState.openNotification(payload)
			return newState
		}
		default:
			return state
	}
}
