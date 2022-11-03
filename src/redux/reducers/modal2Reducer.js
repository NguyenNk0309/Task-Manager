import { CLOSE_MODAL_2, OPEN_MODAL_2 } from '../constants/modalConst'

const initialState = {
	open: false,
	centered: true,
	Content: () => null,
	title: '',
}

export default function modalReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case OPEN_MODAL_2: {
			const { Component, title, centered } = payload
			newState.open = true
			newState.title = title
			newState.centered = centered
			newState.Content = () => Component
			return newState
		}
		case CLOSE_MODAL_2: {
			newState.open = false
			return newState
		}

		default:
			return state
	}
}
