import { call, put, takeLatest } from 'redux-saga/effects'
import { GET_ALL_PROJECT, GET_ALL_PROJECT_SAGA } from '../constants/cyberBugConst'
import { cyberBugService } from '../../services/cyberBugService'

function* getAllProjectCategory() {
	const { data, status } = yield call(() => cyberBugService.getAllProjectCategory())
	try {
		if (status === 200) {
			yield put({
				type: GET_ALL_PROJECT,
				payload: data.content,
			})
		}
	} catch (error) {}
}

export function* observeGetAllProjectCategory() {
	yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectCategory)
}
