import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetProjectCategorySaga } from '../../redux/action/getProjectCategoryAction'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import { EDIT_PROJECT_SAGA } from '../../redux/constants/cyberBugConst'
import * as Yup from 'yup'

const FormEdit = ({ data }) => {
	const dispatch = useDispatch()
	const { category } = useSelector((state) => state.projectCategoryReducer)
	useEffect(() => {
		dispatch({ type: 'SET_SUBMIT_BTN', payload: () => formik.handleSubmit() })
		dispatch(actionGetProjectCategorySaga())
	}, [])

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			id: data.id,
			projectName: data.projectName,
			description: data.description,
			categoryId: data.categoryId,
		},
		validationSchema: Yup.object({
			projectName: Yup.string().required('Name is required'),
		}),
		onSubmit: (values) => {
			dispatch({ type: EDIT_PROJECT_SAGA, payload: values })
		},
	})

	return (
		<div>
			<h1 className='text-xl font-semibold mb-4'>Edit Project</h1>
			<form onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
				<div className='flex flex-col'>
					<span className='font-semibold'>Name:</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.projectName}
						name='projectName'
						placeholder={data.projectName}
						className='focus:outline-none border-b-[1px] border-[rgb(148,163,184)] py-1 text-lg'
						type='text'
					/>
					{formik.touched.projectName && formik.errors.projectName ? (
						<span className='text-red-500'>{formik.errors.projectName}</span>
					) : null}
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Category:</span>
					<select
						className='text-lg w-full border-[1px] py-1 border-[rgb(148,163,184)]'
						onChange={formik.handleChange}
						value={formik.values.categoryId}
						name='categoryId'>
						{category.map((item, index) => (
							<option key={index} value={item.id}>
								{item.projectCategoryName}
							</option>
						))}
					</select>
				</div>
				<div className='flex flex-col'>
					<span className='font-semibold'>Description:</span>
					<div className='border-[1px] border-[rgb(148,163,184)] rounded-[10px]'>
						<Editor
							onEditorChange={(value) => {
								formik.handleChange({ target: { name: 'description', value } })
							}}
							tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
							initialValue={data.description}
							init={{
								height: 250,
								menubar: false,
								plugins: [
									'advlist',
									'autolink',
									'lists',
									'link',
									'image',
									'charmap',
									'anchor',
									'searchreplace',
									'visualblocks',
									'code',
									'fullscreen',
									'insertdatetime',
									'media',
									'table',
									'preview',
									'help',
									'wordcount',
								],
								toolbar:
									'undo redo | blocks | ' +
									'bold italic forecolor | alignleft aligncenter ' +
									'alignright alignjustify | bullist numlist outdent indent | ' +
									'removeformat | help',
								content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;',
							}}
						/>
					</div>
				</div>
			</form>
		</div>
	)
}

export default FormEdit
