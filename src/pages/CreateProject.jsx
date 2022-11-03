import React, { useEffect, useRef } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { actionGetProjectCategorySaga } from '../redux/action/getProjectCategoryAction'
import { actionCreateProjectSaga } from '../redux/action/createProjectAction'

const CreateProject = () => {
	const editorRef = useRef(null)
	const dispatch = useDispatch()
	const { category } = useSelector((state) => state.projectCategoryReducer)
	useEffect(() => {
		dispatch(actionGetProjectCategorySaga())
	}, [dispatch])
	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			projectName: '',
			description: '',
			categoryId: category[0]?.id,
		},
		validationSchema: Yup.object({
			projectName: Yup.string().required('Name is required'),
		}),
		onSubmit: (values) => {
			dispatch(actionCreateProjectSaga(values))
		},
	})

	return (
		<div className='h-full overflow-y-auto'>
			<h1 className='text-3xl font-semibold'>Create Project</h1>
			<form onSubmit={formik.handleSubmit} className='mt-4'>
				<div className='flex flex-col mb-4'>
					<span className='font-semibold text-slate-500'>Name</span>
					<input
						onChange={formik.handleChange}
						value={formik.values.projectName}
						name='projectName'
						className='border focus:outline-none py-1 px-2'
						type='text'
					/>
					{formik.touched.projectName && formik.errors.projectName ? (
						<span className='text-red-500'>{formik.errors.projectName}</span>
					) : null}
				</div>
				<div className='flex flex-col mb-4'>
					<span className='font-semibold text-slate-500'>Description</span>
					<Editor
						onEditorChange={(e) => {
							formik.handleChange({ target: { name: 'description', value: e } })
						}}
						tinymceScriptSrc={process.env.PUBLIC_URL + '/tinymce/tinymce.min.js'}
						onInit={(evt, editor) => (editorRef.current = editor)}
						initialValue=''
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
							content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
						}}
					/>
				</div>
				<div className='flex flex-col mb-4'>
					<span className='font-semibold text-slate-500'>Project Category</span>
					<select
						onChange={formik.handleChange}
						value={formik.values.categoryId}
						className='border focus:outline-none py-1 px-2 w-full'
						name='categoryId'>
						{category.map((item, index) => (
							<option key={index} value={item.id}>
								{item.projectCategoryName}
							</option>
						))}
					</select>
				</div>
				<button type='submit' className='bg-blue-600 text-white font-semibold px-2 py-2 shadow-md'>
					Create Project
				</button>
			</form>
		</div>
	)
}

export default CreateProject
