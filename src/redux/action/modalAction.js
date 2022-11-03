import { OPEN_MODAL, CLOSE_MODAL, OPEN_MODAL_2, CLOSE_MODAL_2 } from '../constants/modalConst'

export function actionOpenModal(Component) {
	return {
		type: OPEN_MODAL,
		payload: {
			Component,
		},
	}
}
export function actionCloseModal() {
	return {
		type: CLOSE_MODAL,
	}
}

export function actionOpenModal2(title, centered, Component) {
	return {
		type: OPEN_MODAL_2,
		payload: {
			title,
			centered,
			Component,
		},
	}
}
export function actionCloseModal2() {
	return {
		type: CLOSE_MODAL_2,
	}
}
