import { GET_PROJECT_DETAIL } from '../constants/cyberBugConst'

const initialState = {
	projectDetail: {},
}

export default function projectDetailReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_PROJECT_DETAIL: {
			newState.projectDetail = payload
			return newState
		}
		default:
			return state
	}
}
