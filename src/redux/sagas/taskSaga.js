import { put, takeLatest, call, delay } from 'redux-saga/effects'
import { cyberBugService } from '../../services/cyberBugService'
import { CURRENT_PROJECT } from '../../utils/constants/cyberBug'
import { actionShowNotification } from '../action/notificationAction'
import {
	CREATE_TASK_SAGA,
	DELETE_TASK_SAGA,
	GET_PROJECT_DETAIL_SAGA,
	GET_TASK_BY_ID,
	GET_TASK_BY_ID_SAGA,
	UPDATE_STATUS_TASK_SAGA,
	UPDATE_TASK_SAGA,
} from '../constants/cyberBugConst'
import { HIDE_LOADING, SHOW_LOADING } from '../constants/loadingConst'
import { CLOSE_MODAL } from '../constants/modalConst'

function* createTaskSaga({ payload }) {
	try {
		yield put({
			type: SHOW_LOADING,
		})
		yield delay(2000)
		yield put({
			type: HIDE_LOADING,
		})
		yield put({ type: CLOSE_MODAL })
		const { status, data } = yield call(() => cyberBugService.createTask(payload))
		yield delay(500)
		if (status === 200) {
			yield put({ type: GET_PROJECT_DETAIL_SAGA, payload: data.content.projectId })
			yield put(actionShowNotification('success', 'Create Task Success'))
		}
	} catch (error) {
		yield put(actionShowNotification('error', 'Create Task Fail'))
	}
}

export function* observeCreateTaskSaga() {
	yield takeLatest(CREATE_TASK_SAGA, createTaskSaga)
}

function* getTaskByIdSaga({ payload }) {
	try {
		const { status, data } = yield call(() => cyberBugService.getTaskById(payload))
		if (status === 200) {
			yield put({ type: GET_TASK_BY_ID, payload: data.content })
		}
	} catch (error) {}
}

export function* observeGetTaskByIdSaga() {
	yield takeLatest(GET_TASK_BY_ID_SAGA, getTaskByIdSaga)
}

// ! Edit Task

function* updateTaskSaga({ payload }) {
	const { taskDetail, ...rest } = payload
	const listUserAsign = taskDetail.assigness.map((member) => member.id)

	try {
		const taskUpdate = {
			listUserAsign,
			taskId: taskDetail.taskId,
			taskName: taskDetail.taskName,
			description: taskDetail.description,
			statusId: taskDetail.statusId,
			originalEstimate: taskDetail.originalEstimate,
			timeTrackingSpent: taskDetail.timeTrackingSpent,
			timeTrackingRemaining: taskDetail.timeTrackingRemaining,
			projectId: taskDetail.projectId,
			typeId: taskDetail.taskTypeDetail.id,
			priorityId: taskDetail.priorityId,
		}
		taskUpdate[rest.name] = rest.value

		const { status } = yield call(() => cyberBugService.updateTask(taskUpdate))
		if (status === 200) {
			yield put({ type: GET_TASK_BY_ID_SAGA, payload: taskDetail.taskId })
			yield put({ type: GET_PROJECT_DETAIL_SAGA, payload: taskDetail.projectId })
		}
	} catch (error) {}
}

export function* observeUpdateTaskSaga() {
	yield takeLatest(UPDATE_TASK_SAGA, updateTaskSaga)
}

function* deleteTaskSaga({ payload }) {
	try {
		const { status } = yield call(() => cyberBugService.deleteTask(payload))
		if (status === 200) {
			yield put({ type: GET_PROJECT_DETAIL_SAGA, payload: localStorage.getItem(CURRENT_PROJECT) })
		}
	} catch (error) {}
}

export function* observeDeleteTaskSaga() {
	yield takeLatest(DELETE_TASK_SAGA, deleteTaskSaga)
}

function* updateStatusTaskSaga({ payload }) {
	try {
		const { status } = yield call(() => cyberBugService.updateStatus(payload))
		if (status === 200) {
			yield put({ type: GET_PROJECT_DETAIL_SAGA, payload: localStorage.getItem(CURRENT_PROJECT) })
		}
	} catch (error) {}
}

export function* observeUpdateStatusTaskSaga() {
	yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateStatusTaskSaga)
}
