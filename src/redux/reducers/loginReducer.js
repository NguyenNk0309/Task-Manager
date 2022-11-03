import { USER_INFO } from '../../utils/constants/cyberBug'
import { SIGN_IN_API } from '../constants/cyberBugConst'

const initialState = {
	user: localStorage.getItem(USER_INFO) ? JSON.parse(localStorage.getItem(USER_INFO)) : {},
}

function loginReducer(state = initialState, { type, payload }) {
	const newState = JSON.parse(JSON.stringify(state))
	switch (type) {
		case SIGN_IN_API: {
			newState.user = payload
			return newState
		}
		default:
			return state
	}
}

export default loginReducer
