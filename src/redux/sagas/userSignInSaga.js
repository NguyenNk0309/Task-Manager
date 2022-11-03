import { put, takeLatest, call, delay } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import { TOKEN, USER_INFO } from '../../utils/constants/cyberBug'
import { SIGN_IN_API, SIGN_IN_API_SAGA } from '../constants/cyberBugConst'
import { SHOW_LOADING, HIDE_LOADING } from '../constants/loadingConst'
import { actionShowNotification } from './../action/notificationAction'

function* signInSaga(action) {
	try {
		const { data } = yield call(() => cyberBugService.signIn(action.payload))
		if (data.statusCode === 200) {
			yield put({
				type: SHOW_LOADING,
			})
			yield delay(2000)
			localStorage.setItem(TOKEN, data.content.accessToken)
			localStorage.setItem(USER_INFO, JSON.stringify(data.content))
			yield put({
				type: SIGN_IN_API,
				payload: data.content,
			})
			action.navigate('/project/project-management')
			yield put({
				type: HIDE_LOADING,
			})
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Sign In Fail'))
	}
}

export function* observeSignIn() {
	yield takeLatest(SIGN_IN_API_SAGA, signInSaga)
}
