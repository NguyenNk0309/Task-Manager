import { all } from 'redux-saga/effects'
import * as signInSaga from './userSignInSaga'
import * as signUpSaga from './userSignUpSaga'
import * as projectCategorySaga from './projectCategorySaga'
import * as ProjectSaga from './projectSaga'
import * as userSaga from './userSaga'
import * as taskType_Priority_StatusSaga from './taskType_Priority_StatusSaga'
import * as taskSaga from './taskSaga'
import * as commentSaga from './commentSaga'

export function* rootSaga() {
	yield all([
		signInSaga.observeSignIn(),
		signUpSaga.observeSignUp(),
		projectCategorySaga.observeGetAllProjectCategory(),
		ProjectSaga.observeCreateProject(),
		ProjectSaga.observeGetAllProject(),
		ProjectSaga.observeEditProject(),
		ProjectSaga.observeDeleteProject(),
		ProjectSaga.observeGetProjectDetailSaga(),
		ProjectSaga.observeSearchProjectSaga(),
		userSaga.observeGetUserSaga(),
		userSaga.observeAssignUserProjectSaga(),
		userSaga.observeDeleteUserSaga(),
		userSaga.observeDeleteUserFromProjectSaga(),
		userSaga.observeEditUserSaga(),
		taskType_Priority_StatusSaga.observeGetTaskTypeSaga(),
		taskType_Priority_StatusSaga.observeGetPrioritySaga(),
		taskType_Priority_StatusSaga.observeGetStatusSaga(),
		taskSaga.observeCreateTaskSaga(),
		taskSaga.observeGetTaskByIdSaga(),
		taskSaga.observeUpdateTaskSaga(),
		taskSaga.observeDeleteTaskSaga(),
		taskSaga.observeUpdateStatusTaskSaga(),
		commentSaga.observeCreateCommentSaga(),
		commentSaga.observeDeleteCommentSaga(),
		commentSaga.observeEditCommentSaga(),
	])
}
