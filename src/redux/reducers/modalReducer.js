import { CLOSE_MODAL, OPEN_MODAL } from '../constants/modalConst'

const initialState = {
	open: false,
	Content: () => null,
	handleSubmit: () => null,
}

export default function modalReducer(state = initialState, { type, payload }) {
	const newState = { ...state }
	switch (type) {
		case OPEN_MODAL: {
			const { Component } = payload
			newState.open = true
			newState.Content = () => Component
			return newState
		}
		case CLOSE_MODAL: {
			newState.open = false
			return newState
		}
		case 'SET_SUBMIT_BTN': {
			newState.handleSubmit = payload
			return newState
		}
		default:
			return state
	}
}
