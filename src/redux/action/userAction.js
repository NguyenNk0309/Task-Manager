import { SIGN_IN_API_SAGA, SIGN_UP_API_SAGA } from '../constants/cyberBugConst'

export function actionSignInSaga(values, navigate) {
	return {
		type: SIGN_IN_API_SAGA,
		payload: values,
		navigate,
	}
}

export function actionSignUpSaga(values, navigate) {
	return {
		type: SIGN_UP_API_SAGA,
		payload: values,
		navigate,
	}
}
