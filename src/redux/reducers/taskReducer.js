import { GET_TASK_BY_ID } from '../constants/cyberBugConst'

const initialState = {
	taskDetail: {},
}

export default function taskReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_TASK_BY_ID: {
			newState.taskDetail = payload
			return newState
		}
		default:
			return state
	}
}
