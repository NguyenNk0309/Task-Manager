import { GET_USER } from '../constants/cyberBugConst'

const initialState = {
	userSearch: [],
}

export default function userReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case GET_USER: {
			newState.userSearch = payload
			return newState
		}
		default:
			return state
	}
}
