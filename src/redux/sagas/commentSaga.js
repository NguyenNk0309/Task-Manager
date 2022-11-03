import { call, put, takeLatest } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import {
	CREATE_COMMENT_SAGA,
	DELETE_COMMENT_SAGA,
	EDIT_COMMENT_SAGA,
	GET_TASK_BY_ID_SAGA,
} from '../constants/cyberBugConst'

function* createCommentSaga({ payload }) {
	const { data, status } = yield call(() => cyberBugService.createComment(payload))
	try {
		if (status === 200) {
			yield put({ type: GET_TASK_BY_ID_SAGA, payload: data.content.taskId })
		}
	} catch (error) {}
}

export function* observeCreateCommentSaga() {
	yield takeLatest(CREATE_COMMENT_SAGA, createCommentSaga)
}

function* deleteCommentSaga({ payload }) {
	const { cmtId, taskId } = payload
	try {
		const { status } = yield call(() => cyberBugService.deleteComment(cmtId))
		if (status === 200) {
			yield put({ type: GET_TASK_BY_ID_SAGA, payload: taskId })
		}
	} catch (error) {}
}

export function* observeDeleteCommentSaga() {
	yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga)
}

function* editCommentSaga({ payload }) {
	try {
		const { status, data } = yield call(() => cyberBugService.editComment(payload))
		if (status === 200) {
			yield put({ type: GET_TASK_BY_ID_SAGA, payload: data.content.taskId })
		}
	} catch (error) {}
}

export function* observeEditCommentSaga() {
	yield takeLatest(EDIT_COMMENT_SAGA, editCommentSaga)
}
