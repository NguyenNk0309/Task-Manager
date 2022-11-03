import { SHOW_LOADING, HIDE_LOADING } from '../constants/loadingConst'

const initialState = {
	isLoading: false,
}

function loadingReducer(state = initialState, { type, payload }) {
	const newState = JSON.parse(JSON.stringify(state))
	switch (type) {
		case SHOW_LOADING:
			newState.isLoading = true
			return newState
		case HIDE_LOADING:
			newState.isLoading = false
			return newState
		default:
			return state
	}
}

export default loadingReducer
