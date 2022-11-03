import { put, call, takeLatest, delay, select } from 'redux-saga/effects'
import {
	CREATE_PROJECT_SAGA,
	GET_PROJECT_SAGA,
	GET_PROJECT,
	EDIT_PROJECT_SAGA,
	DELETE_PROJECT_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	GET_PROJECT_DETAIL,
	SEARCH_PROJECT_SAGA,
	SEARCH_PROJECT,
} from '../constants/cyberBugConst'
import { CLOSE_MODAL } from './../constants/modalConst'
import { cyberBugService } from '../../services/cyberBugService'
import { HIDE_LOADING, SHOW_LOADING } from '../constants/loadingConst'
import { actionShowNotification } from '../action/notificationAction'
import { USER_INFO } from '../../utils/constants/cyberBug'

function* createProject({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		const { status } = yield call(() => cyberBugService.createProject(payload))
		yield delay(500)
		if (status === 200) {
			const { navigate } = yield select((state) => state.navigateReducer)
			navigate('/project/project-management')
			yield put(actionShowNotification('success', 'Create Success'))
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Create Fail'))
	}
}

export function* observeCreateProject() {
	yield takeLatest(CREATE_PROJECT_SAGA, createProject)
}

function* GetAllProject() {
	try {
		const { status, data } = yield call(() => cyberBugService.getProject())
		if (status === 200) {
			yield put({
				type: GET_PROJECT,
				payload: data.content,
			})
		}
	} catch (error) {}
}

export function* observeGetAllProject() {
	yield takeLatest(GET_PROJECT_SAGA, GetAllProject)
}

function* editProject({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		yield put({ type: CLOSE_MODAL })
		const { status } = yield call(() => cyberBugService.editProject(payload))
		yield delay(500)
		if (status === 200) {
			yield put(actionShowNotification('success', 'Edit Success'))
			yield put({
				type: GET_PROJECT_SAGA,
			})
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Edit Fail'))
	}
}

export function* observeEditProject() {
	yield takeLatest(EDIT_PROJECT_SAGA, editProject)
}

function* deleteProject({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		const { status } = yield call(() => cyberBugService.deleteProject(payload))
		yield delay(500)
		if (status === 200) {
			yield put(actionShowNotification('success', 'Delete Success'))
			yield put({
				type: GET_PROJECT_SAGA,
			})
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Delete Fail'))
	}
}

export function* observeDeleteProject() {
	yield takeLatest(DELETE_PROJECT_SAGA, deleteProject)
}

function* getProjectDetailSaga({ payload }) {
	try {
		const { status, data } = yield call(() => cyberBugService.getProjectDetail(payload))
		if (status === 200) {
			yield put({ type: GET_PROJECT_DETAIL, payload: data.content })
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Load Project Fail'))
	}
}

export function* observeGetProjectDetailSaga() {
	yield takeLatest(GET_PROJECT_DETAIL_SAGA, getProjectDetailSaga)
}

function* searchProjectSaga({ payload }) {
	try {
		const { status, data } = yield call(() => cyberBugService.getProject())
		if (status === 200) {
			const myId = JSON.parse(localStorage.getItem(USER_INFO)).id
			const myProject = data.content.filter(
				(project) => project.creator.id === myId || project.members.find((member) => member.userId === myId)
			)
			const filterProject = myProject.filter((project) =>
				project.projectName.toLowerCase().includes(payload.toLowerCase())
			)
			yield put({
				type: SEARCH_PROJECT,
				payload: filterProject,
			})
		}
	} catch (error) {}
}

export function* observeSearchProjectSaga() {
	yield takeLatest(SEARCH_PROJECT_SAGA, searchProjectSaga)
}
