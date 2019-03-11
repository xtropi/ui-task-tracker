import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { config } from '../../config'
import { tasksSet } from '../actions/tasksSetAction'
import { setAlert } from '../actions/setAlertAction'

class TaskView extends Component {
    state = {
    	task: {
    		id: '',
    		user: '',
    		title: '',
    		description: '',
    		priority: 'low',
    		pTime: 0,
    		fTime: 0,
    		date: new Date().toJSON(),
    		status: 'planning',
    	},
    	new: true,
    }

    componentDidMount(){
    	// Get id from params, prepare for new task
    	this.setState({...this.state, 
    		task: {
    			id: this.props.match.params.id,
    			user: this.props.user,
    			title: '',
    			description: '',
    			priority: 'low',
    			pTime: 0,
    			fTime: 0,
    			date: new Date().toJSON(),
    			status: 'planning',
    		},
    	})

    	// Loading needed task if exists
    	this.props.tasks.map((task)=>{
    		task.id==this.props.match.params.id && 
               this.setState({...this.state, task: task, new: false})
    	})
    }
		
		taskChange = async (authData, task) => {
			let result = await axios.post(`${config.beString}${config.beServiceNames.taskChange}`, {authData: authData, task: task})
			if (result.data.msg=='Success'){
				this.props.tasksSet(result.data.newTasks)
			} else {
				this.props.setAlert('GET_TASKS_FAIL')
			}
		}

		taskCreate = async (authData, task) => {
			let result = await axios.post(`${config.beString}${config.beServiceNames.taskCreate}`, {authData: authData, task: task})
			if (result.data.msg=='Success'){
				this.props.tasksSet(result.data.newTasks)
			} else {
				this.props.setAlert('GET_TASKS_FAIL')
			}
		}

    handleSubmit = (event) => {
    	event.preventDefault()
    	if (event.currentTarget.name=='change'){
    		this.taskChange({login:this.props.user, passHash: this.props.passHash}, this.state.task)
    		this.props.setAlert('SUCCESS_CHANGE')
    	}
    	if (event.currentTarget.name=='create'){
    		this.taskCreate({login:this.props.user, passHash: this.props.passHash}, this.state.task)
    		this.props.setAlert('SUCCESS_CREATE')
    	}
    }

    handleChange = (event) => {
    	event.preventDefault()
    	this.setState({...this.state, task:{...this.state.task, [event.target.name]: event.target.value}});
    }

    render(){
    	return(
    		<div>
    			<form name={!this.state.new ? 'change' : 'create'} onSubmit={this.handleSubmit} style={{margin: '20px 100px'}}>
    				<div className='form-row'>
    					<div className='form-group col-md-4'>
    						<label htmlFor='inputDate'>
									Date
    						</label>
    						<input name='date' disabled='disabled' 
    							value={new Date(this.state.task.date).toLocaleString()} onChange={this.handleChange} 
    							type='text' className='form-control' 
    							id='inputDate'
    							required
    						/>
    					</div>
    					<div className='form-group col-md-4'>
    						<label htmlFor='inputId'>
									Id
    						</label>
    						<input 
    							disabled='disabled' name='id' 
    							value={this.state.task.id} onChange={this.handleChange} 
    							type='text' className='form-control' 
    							id='inputId'
    							required
    						/>
    					</div>
    					<div className='form-group col-md-4'>
    						<label htmlFor='inputUser'>
									User
    						</label>
    						<input 
    							disabled={!this.state.new && 'disabled'} name='user' 
    							value={this.state.task.user} onChange={this.handleChange} 
    							type='text' className='form-control' 
    							id='inputUser'
    							size='30' minLength='4'
    							required
    						/>
    					</div>

    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputTitle'>
								Title
    					</label>
    					<input 
    						name='title' value={this.state.task.title} 
    						onChange={this.handleChange} type='text' 
    						className='form-control' id='inputTitle'
    						size='30' minLength='3'
    						required
    					/>
    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputDescription'>
								Description
    					</label>
    					<input 
    						name='description' value={this.state.task.description} 
    						onChange={this.handleChange} type='text' 
    						className='form-control' id='inputDescription'
    						size='255' minLength='3'
    						required
    					/>
    				</div>
    				<div className='form-row'>
    					<div className='form-group col-md-3'>
    						<label htmlFor='inputState'>
									Priority
    						</label>
    						<select name='priority' value={this.state.task.priority} onChange={this.handleChange} id='inputState' className='form-control'>
    							<option value='high'>High</option>
    							<option value='medium'>Medium</option>
    							<option value='low'>Low</option>
    						</select>
    					</div>
    					<div className='form-group col-md-3'>
    						<label htmlFor='inputState'>
									Status
    						</label>
    						<select name='status' value={this.state.task.status} onChange={this.handleChange} id='inputState' className='form-control'>
    							<option value='done'>Done</option>
    							<option value='processing'>Processing</option>
    							<option value='planning'>Planning</option>
    						</select>
    					</div>
    					<div className='form-group col-md-3'>
    						<label htmlFor='inputPTime'>
									Plan duration (hours)
    						</label>
    						<input 
    							name='pTime' value={this.state.task.pTime} 
    							onChange={this.handleChange} type='number' 
    							min='0' className='form-control' 
    							id='inputPTime'
    							required
    						/>
    					</div>
    					<div className='form-group col-md-3'>
    						<label htmlFor='inputFTime'>
									Fact duration (hours)
    						</label>
    						<input 
    							name='fTime' value={this.state.task.fTime} 
    							onChange={this.handleChange} type='number' 
    							min='0' className='form-control' 
    							id='inputFTime'
    							required
    						/>
    					</div>
    				</div>

    				<button 
    					type='submit' 
    					className={!this.state.new ? 'btn btn-primary' : 'btn btn-success'}
    				>
    					{!this.state.new ? 'Change' : 'Create'}
    				</button>
    			</form>

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
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)