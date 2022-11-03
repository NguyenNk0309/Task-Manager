import { put, takeLatest, call, delay } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import { actionShowNotification } from '../action/notificationAction'
import {
	GET_USER_SAGA,
	GET_USER,
	ASSIGN_USER_PROJECT,
	GET_PROJECT_SAGA,
	DELETE_USER_FROM_PROJECT,
	DELETE_ACCOUNT_SAGA,
	EDIT_ACCOUNT_SAGA,
} from '../constants/cyberBugConst'
import { CLOSE_MODAL } from './../constants/modalConst'
import { HIDE_LOADING, SHOW_LOADING } from '../constants/loadingConst'

function* getUserSaga({ payload }) {
	try {
		const { status, data } = yield call(() => cyberBugService.getUser(payload))
		if (status === 200) {
			yield put({ type: GET_USER, payload: data.content })
		}
	} catch (error) {}
}

export function* observeGetUserSaga() {
	yield takeLatest(GET_USER_SAGA, getUserSaga)
}

function* assignUserProjectSaga({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		const { status } = yield call(() => cyberBugService.assignUserProject(payload))
		if (status === 200) {
			yield put({ type: GET_PROJECT_SAGA })
			yield delay(500)
			yield put(actionShowNotification('success', 'Add Member Success'))
		}
	} catch (error) {
		yield put(actionShowNotification('error', "You Don't Allow To Add Member"))
	}
}

export function* observeAssignUserProjectSaga() {
	yield takeLatest(ASSIGN_USER_PROJECT, assignUserProjectSaga)
}

function* deleteUserFromProjectSaga({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		const { status } = yield call(() => cyberBugService.deleteUserFromProject(payload))
		if (status === 200) {
			yield put({ type: GET_PROJECT_SAGA })
			yield delay(500)
			yield put(actionShowNotification('success', 'Delete Member Success'))
		}
	} catch (error) {
		yield put(actionShowNotification('error', "You Can't Delete This Member"))
	}
}

export function* observeDeleteUserFromProjectSaga() {
	yield takeLatest(DELETE_USER_FROM_PROJECT, deleteUserFromProjectSaga)
}

function* deleteUserSaga({ payload }) {
	try {
		const { status } = yield call(() => cyberBugService.deleteUser(payload))
		if (status === 200) {
			yield put({ type: GET_USER_SAGA, payload: '' })
			yield put(actionShowNotification('success', 'Delete User Success'))
		}
	} catch (error) {
		yield put(actionShowNotification('error', "You Can't Delete This User"))
	}
}

export function* observeDeleteUserSaga() {
	yield takeLatest(DELETE_ACCOUNT_SAGA, deleteUserSaga)
}

function* editUserSaga({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		yield put({ type: CLOSE_MODAL })
		const { status } = yield call(() => cyberBugService.editUser(payload))
		if (status === 200) {
			yield put(actionShowNotification('success', 'Edit User Success'))
			yield put({ type: GET_USER_SAGA, payload: '' })
		}
	} catch (error) {
		yield put(actionShowNotification('error', "You Can't Edit This User"))
	}
}

export function* observeEditUserSaga() {
	yield takeLatest(EDIT_ACCOUNT_SAGA, editUserSaga)
}
