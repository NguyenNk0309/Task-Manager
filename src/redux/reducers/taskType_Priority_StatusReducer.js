import { GET_PRIORITY, GET_STATUS, GET_TASK_TYPE } from '../constants/cyberBugConst'

const initialState = {
	taskType: [],
	priority: [],
	status: [],
}

export default function taskType_Priority_StatusReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_TASK_TYPE: {
			newState.taskType = payload
			return newState
		}
		case GET_PRIORITY: {
			newState.priority = payload
			return newState
		}
		case GET_STATUS: {
			newState.status = payload
			return newState
		}
		default:
			return state
	}
}
