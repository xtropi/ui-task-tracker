export const taskCreate = (task) => {
	return {
		type: 'TASK_CREATE',
		task: task
	}
}