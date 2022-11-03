const initialState = {
	navigate: () => null,
}

export default function navigateReducer(state = initialState, { type, payload }) {
	switch (type) {
		case 'SET_NAVIGATE':
			state.navigate = payload
			return { ...state }

		default:
			return state
	}
}
