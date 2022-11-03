import { SHOW_NOTIFICATION } from '../constants/notificationConst'

export function actionShowNotification(type, message) {
	return {
		type: SHOW_NOTIFICATION,
		payload: {
			type,
			message,
		},
	}
}
