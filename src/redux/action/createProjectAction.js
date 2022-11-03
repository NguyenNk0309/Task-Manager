import { CREATE_PROJECT_SAGA } from '../constants/cyberBugConst'

export function actionCreateProjectSaga(data) {
	return {
		type: CREATE_PROJECT_SAGA,
		payload: data,
	}
}
