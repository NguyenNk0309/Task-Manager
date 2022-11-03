import { GET_ALL_PROJECT } from '../constants/cyberBugConst'

const initialState = {
	category: [],
}

function projectCategoryReducer(state = initialState, { type, payload }) {
	const newState = JSON.parse(JSON.stringify(state))
	switch (type) {
		case GET_ALL_PROJECT: {
			newState.category = payload
			return newState
		}
		default:
			return state
	}
}

export default projectCategoryReducer
