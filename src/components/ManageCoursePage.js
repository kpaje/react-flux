import React, { useState, useEffect } from "react";
import CourseForm from "./CourseForm";
import * as courseApi from "../api/courseApi";
import { Toast, toast } from "react-toastify";

function ManageCoursePage(props) {
	const [errors, setErrors] = useState({});
	const [course, setCourse] = useState({
		id: null,
		slug: "",
		title: "",
		authorId: null,
		category: ""
	});

	useEffect(() => {
		const slug = props.match.params.slug; //from path `/courses/:slug`
		if (slug) {
			courseApi.getCourseBySlug(slug).then(_course => {
				setCourse(_course);
			});
		}
	}, [props.match.params.slug]);

	function handleChange({ target }) {
		const updatedCourse = {
			...course,
			[target.name]: target.value
		};
		setCourse(updatedCourse);
	}

	function formIsValid() {
		const _errors = {};

		if (!course.title) _errors.title = "Title is required";
		if (!course.title) _errors.authorId = "Author ID is required";
		if (!course.title) _errors.category = "Category is required";

		setErrors(_errors);
		//Form is valid if the error obect has no properties
		return Object.keys(_errors).length === 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
		if (!formIsValid()) return;
		courseApi.saveCourse(course).then(() => {
			props.history.push("/courses");
			toast.success("Course Saved!");
		});
	}

	return (
		<>
			<h2>Manage Course</h2>
			<CourseForm
				errors={errors}
				course={course}
				onChange={handleChange}
				onSubmit={handleSubmit}
			/>
		</>
	);
}

export default ManageCoursePage;
