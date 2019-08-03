import dispatcher from "../appDispatcher";
import * as courseApi from "../api/courseApi";
import actionTypes from "./actionTypes";

export function saveCourse(course) {
	return courseApi.saveCourse(course).then(savedCourse => {
		//dispatcher notifies stores of newly created course
		dispatcher.dispatch({
			actionType: actionTypes.CREATE_COURSE,
			course: savedCourse
		});
	});
}
