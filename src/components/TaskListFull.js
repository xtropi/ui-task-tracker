import React, {Component} from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import axios from 'axios'
import { config } from '../../config'
import { tasksSet } from '../actions/tasksSetAction'
import { setAlert } from '../actions/setAlertAction'
import { representationChange } from '../actions/representationChangeAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// a little function to help with reordering the result
let reorder = (sort, type)=>{

	// Ascending
	let reorderByIdAsc = (taskA, taskB) => {
		let numIdA = parseInt(taskA.id.split('-')[1], 10)
		let numIdB = parseInt(taskB.id.split('-')[1], 10)
		if(numIdA < numIdB) { return -1 }
		if(numIdA > numIdB) { return 1 }
		return 0;
	}

	let reorderByPriorityAsc = (taskA, taskB) => {
		let numPriority = (text)=>{
			if (text == 'high') return 2
			if (text == 'medium') return 1
			if (text == 'low') return 0
			return 0
		}
		let aPriority = numPriority(taskA.priority)
		let bPriority = numPriority(taskB.priority)
		return aPriority-bPriority;
	}
    
	let reorderByTitleAsc = (taskA, taskB) => {
		if(taskA.title < taskB.title) { return -1 }
		if(taskA.title > taskB.title) { return 1 }
		return 0;
	}

	let reorderByDateAsc = (taskA, taskB) => {
		let dateA = new Date(taskA.date).getTime()
		let dateB = new Date(taskB.date).getTime()
		if(dateA < dateB) { return -1 }
		if(dateA > dateB) { return 1 }
		return 0;
	}

	let reorderByPTimeAsc = (taskA, taskB) => {
		if(taskA.pTime < taskB.pTime) { return -1 }
		if(taskA.pTime > taskB.pTime) { return 1 }
		return 0;
	}

    
	let reorderByFTimeAsc = (taskA, taskB) => {
		if(taskA.fTime < taskB.fTime) { return -1 }
		if(taskA.fTime > taskB.fTime) { return 1 }
		return 0;
	}

	let reorderByStatusAsc = (taskA, taskB) => {
		let numStatus = (text)=>{
			if (text == 'done') return 2
			if (text == 'processing') return 1
			if (text == 'planning') return 0
			return 0
		}
		let a = numStatus(taskA.status)
		let b = numStatus(taskB.status)
		return a-b;
	}

	// Descending
	let reorderByIdDesc = (taskA, taskB) => {
		let numIdA = parseInt(taskA.id.split('-')[1], 10)
		let numIdB = parseInt(taskB.id.split('-')[1], 10)
		if(numIdA < numIdB) { return 1 }
		if(numIdA > numIdB) { return -1 }
		return 0;
	}

	let reorderByPriorityDesc = (taskA, taskB) => {
		let numPriority = (text)=>{
			if (text == 'high') return 0
			if (text == 'medium') return 1
			if (text == 'low') return 2
			return 0
		}
		let aPriority = numPriority(taskA.priority)
		let bPriority = numPriority(taskB.priority)
		return aPriority-bPriority;
	}
    
	let reorderByTitleDesc = (taskA, taskB) => {
		if(taskA.title < taskB.title) { return 1 }
		if(taskA.title > taskB.title) { return -1 }
		return 0;
	}

	let reorderByDateDesc = (taskA, taskB) => {
		let dateA = new Date(taskA.date).getTime()
		let dateB = new Date(taskB.date).getTime()
		if(dateA < dateB) { return 1 }
		if(dateA > dateB) { return -1 }
		return 0;
	}

	let reorderByPTimeDesc = (taskA, taskB) => {
		if(taskA.pTime < taskB.pTime) { return 1 }
		if(taskA.pTime > taskB.pTime) { return -1 }
		return 0;
	}

    
	let reorderByFTimeDesc = (taskA, taskB) => {
		if(taskA.fTime < taskB.fTime) { return 1 }
		if(taskA.fTime > taskB.fTime) { return -1 }
		return 0;
	}

	let reorderByStatusDesc = (taskA, taskB) => {
		let numStatus = (text)=>{
			if (text == 'done') return 0
			if (text == 'processing') return 1
			if (text == 'planning') return 2
			return 0
		}
		let a = numStatus(taskA.status)
		let b = numStatus(taskB.status)
		return a-b;
	}


	// Ascending
	if ((sort=='byId')&&(type))
		return reorderByIdAsc

	if ((sort=='byTitle')&&(type))
		return reorderByTitleAsc

	if ((sort=='byDate')&&(type))
		return reorderByDateAsc
    
	if ((sort=='byPriority')&&(type))
		return reorderByPriorityAsc

	if ((sort=='byPTime')&&(type))
		return reorderByPTimeAsc
    
	if ((sort=='byFTime')&&(type))
		return reorderByFTimeAsc

	if ((sort=='byStatus')&&(type))
		return reorderByStatusAsc

    
	// Descending
	if ((sort=='byId')&&(!type))
		return reorderByIdDesc

	if ((sort=='byTitle')&&(!type))
		return reorderByTitleDesc

	if ((sort=='byDate')&&(!type))
		return reorderByDateDesc
    
	if ((sort=='byPriority')&&(!type))
		return reorderByPriorityDesc

	if ((sort=='byPTime')&&(!type))
		return reorderByPTimeDesc
    
	if ((sort=='byFTime')&&(!type))
		return reorderByFTimeDesc

	if ((sort=='byStatus')&&(!type))
		return reorderByStatusDesc
}


class TaskListFull extends Component {
    state = {
    	sort: null,
    	type: false,
    	referrer: null,
    	filter: {
    		title: '',
    		priority: 'all',
    		status: 'all',
    	},
    }
		
		taskDelete = async (authData, id) => {
			let result = await axios.post(`${config.beString}${config.beServiceNames.taskDelete}`, {authData: authData, id: id})
			if (result.data.msg=='Success'){
				this.props.tasksSet(result.data.newTasks)
			} else {
				this.props.setAlert('GET_TASKS_FAIL')
			}
		}

    handleChange = (event) => {
    	event.preventDefault()
    	this.setState({...this.state, filter:{...this.state.filter, [event.target.name]: event.target.value}});
    }

    handleSort = (event) => {
    	event.preventDefault()
    	this.setState({sort: event.currentTarget.name, type: !this.state.type})
    }

    handleNavigate = (event) => {
    	event.preventDefault()
    	this.setState({...this.state, referrer: event.currentTarget.getAttribute('name')})
    }
		
		handleDelete = (event) => {
			event.preventDefault()
			this.taskDelete({login:this.props.user, passHash: this.props.passHash}, event.currentTarget.getAttribute('name'))
			this.props.setAlert('SUCCESS_DELETE')
		}
		
    handleInitiateTaskCreation = async (event) => {
    	event.preventDefault()
    	let result = await axios.post(`${config.beString}${config.beServiceNames.taskCreateInit}`, {authData: {login:this.props.user, passHash: this.props.passHash}})
    	if (result.data.msg=='Success'){
    		this.setState({...this.state, referrer: result.data.id})
    	} else {
    		this.props.setAlert('GET_TASKS_FAIL')
    	}
    }

    render(){
    	let {user, tasks} = this.props
    	let myTasks = tasks.filter((task)=>(task.user==user))
    	return(
    		<div style={{margin: '20px'}}>
    			{ this.state.referrer && <Redirect to={`/mytasks/${this.state.referrer}`} push/>}
    			<form onSubmit={this.handleInitiateTaskCreation}>
    				<div className='form-inline mb-3'>
    					<div className='input-group input-group-sm mr-2 ml-2'>
    						<div className='input-group-prepend'>
    							<span className='input-group-text' id='input_title'>Title</span>
    						</div>
    						<input name='title' onChange={this.handleChange} type='text' className='form-control' aria-label='Small' aria-describedby='input_title'/>
    					</div>
                
    					<div className='input-group input-group-sm mr-2 ml-2'>
    						<div className='input-group-prepend'>
    							<span className='input-group-text' id='input_priority'>Priority</span>
    						</div>
    						<select name='priority' onChange={this.handleChange} className='custom-select' id='inputGroupSelect01' aria-label='Small' aria-describedby='input_priority'>
    							<option value='all' defaultValue>All</option>
    							<option value='high'>High</option>
    							<option value='medium'>Medium</option>
    							<option value='low'>Low</option>
    						</select>
    					</div>

    					<div className='input-group input-group-sm mr-2 ml-2'>
    						<div className='input-group-prepend'>
    							<span className='input-group-text' id='input_status'>Status</span>
    						</div>
    						<select name='status' onChange={this.handleChange} className='custom-select' id='inputGroupSelect02' aria-label='Small' aria-describedby='input_status'>
    							<option value='all' defaultValue>All</option>
    							<option value='done'>Done</option>
    							<option value='processing'>Processing</option>
    							<option value='planning'>Planning</option>
    						</select>
    					</div>
    					<button type='submit' className='btn btn-primary'>Create new task</button>
    				</div>
    			</form>
    			<table className='table table-bordered'>
    				<thead className='thead-light align-middle'>
    					<tr>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            id
    								<button className='hidden' name='byId' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Title
    								<button className='hidden' name='byTitle' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Description
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Date
    								<button className='hidden' name='byDate' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Priority
    								<button className='hidden' name='byPriority' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Plan duration (h)
    								<button className='hidden' name='byPTime' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Fact duration (h)
    								<button className='hidden' name='byFTime' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                            Status
    								<button className='hidden' name='byStatus' onClick={this.handleSort}></button>
    								<div className='ml-1'>
    									<FontAwesomeIcon icon='sort' />
    								</div>
    							</label>
    						</th>
    						<th scope='col' style={{verticalAlign: 'middle'}}>
    							<label style={{display: 'inline-flex'}}>
                    Delete
    							</label>
    						</th>
    					</tr>
    				</thead>
    				<tbody>
    					{myTasks.sort(reorder(this.state.sort, this.state.type)).map((task)=>{
    						let dateFormat = new Date(task.date).toLocaleString()
    						let result = (

    							<tr key={task.id} 
    								onMouseEnter={(e)=>{e.currentTarget.classList.add('table-active')}}
    								onMouseLeave={(e)=>{e.currentTarget.classList.remove('table-active')}}
    							>
    								<td scope='row' name={task.id} onClick={this.handleNavigate}>{task.id}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.title}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.description}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{dateFormat}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.priority}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.pTime}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.fTime}</td>
    								<td name={task.id} onClick={this.handleNavigate}>{task.status}</td>
    								<td name={task.id} onClick={this.handleDelete}>    									
    									<label style={{display: 'inline-flex'}}>
    										<div className='ml-1'>
    											<FontAwesomeIcon icon='trash' />
    										</div>
    									</label>
    								</td>
    							</tr>


    						)
                        
    						// Filter
    						if (!task.title.toLowerCase().includes(this.state.filter.title.toLowerCase()))
    							return null

    						if ((this.state.filter.priority!='all')&&(this.state.filter.priority!=task.priority))
    							return null

    						if ((this.state.filter.status!='all')&&(this.state.filter.status!=task.status))
    							return null

    						return result
    					})}
    				</tbody>
    			</table>
    			<hr/>
    		</div>

    	)

    }
}


const mapStateToProps = (state) => {
	return {
		user: state.user,
		passHash: state.passHash,
		tasks: state.tasks,
		scrumDesk: state.scrumDesk,
		alert: state.alert,
		representation: state.representation,
	}
}
  
const mapDispatchToProps = (dispatch) => {
	return {
		tasksSet: (tasks) => { dispatch(tasksSet(tasks)) },
		setAlert: (alert) => { dispatch(setAlert(alert)) },
		representationChange: (representation) => { dispatch(representationChange(representation)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskListFull)