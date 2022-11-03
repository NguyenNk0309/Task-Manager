import { put, takeLatest, call } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import {
	GET_TASK_TYPE_SAGA,
	GET_PRIORITY_SAGA,
	GET_TASK_TYPE,
	GET_PRIORITY,
	GET_STATUS,
	GET_STATUS_SAGA,
} from '../constants/cyberBugConst'

function* getTaskTypeSaga() {
	try {
		const { status, data } = yield call(() => cyberBugService.getTaskType())
		if (status === 200) {
			yield put({ type: GET_TASK_TYPE, payload: data.content })
		}
	} catch (error) {}
}

export function* observeGetTaskTypeSaga() {
	yield takeLatest(GET_TASK_TYPE_SAGA, getTaskTypeSaga)
}

function* getPrioritySaga() {
	try {
		const { status, data } = yield call(() => cyberBugService.getPriority())
		if (status === 200) {
			yield put({ type: GET_PRIORITY, payload: data.content })
		}
	} catch (error) {}
}

export function* observeGetPrioritySaga() {
	yield takeLatest(GET_PRIORITY_SAGA, getPrioritySaga)
}

function* getStatusSaga() {
	try {
		const { status, data } = yield call(() => cyberBugService.getStatus())
		if (status === 200) {
			yield put({ type: GET_STATUS, payload: data.content })
		}
	} catch (error) {}
}

export function* observeGetStatusSaga() {
	yield takeLatest(GET_STATUS_SAGA, getStatusSaga)
}
