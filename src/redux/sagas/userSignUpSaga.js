import { put, takeLatest, call } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import { SIGN_UP_API_SAGA } from '../constants/cyberBugConst'
import { actionShowNotification } from './../action/notificationAction'

function* signUpSaga(action) {
	try {
		const { data } = yield call(() => cyberBugService.signUp(action.payload))
		if (data.statusCode === 200) {
			yield put(actionShowNotification('success', 'Create Account Success'))
			action.navigate('/signIn')
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Create Account Fail'))
	}
}

export function* observeSignUp() {
	yield takeLatest(SIGN_UP_API_SAGA, signUpSaga)
}
