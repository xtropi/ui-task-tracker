/* eslint-disable indent */
import React, {Component} from 'react'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { taskCreate } from '../actions/taskCreateAction'
import { setAlert } from '../actions/setAlertAction'

class TaskView extends Component {
    state = {
			task: {
				id: '',
				user: '',
				title: '',
				description: '',
				priority: 'low',
				pTime: '',
				fTime: '',
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
    			pTime: '',
    			fTime: '',
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

    handleSubmit = (event) => {
			event.preventDefault()
    	if (event.currentTarget.name=='change'){
    		this.props.taskChange(this.state.task)
    		this.props.setAlert('SUCCESS_CHANGE')
    	}
    	if (event.currentTarget.name=='create'){
    		this.props.taskCreate(this.state.task)
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
    					<div className='form-group col-md-6'>
    						<label htmlFor='inputEmail4'>Id</label>
    						<input disabled='disabled' name='id' value={this.state.task.id} onChange={this.handleChange} type='text' className='form-control' id='inputEmail4'/>
    					</div>
    					<div className='form-group col-md-6'>
    						<label htmlFor='inputPassword4'>User</label>
    						<input disabled={!this.state.new && 'disabled'} name='user' value={this.state.task.user} onChange={this.handleChange} type='text' className='form-control' id='inputPassword4'/>
    					</div>
    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputAddress'>Title</label>
    					<input name='title' value={this.state.task.title} onChange={this.handleChange} type='text' className='form-control' id='inputAddress'/>
    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputAddress2'>Description</label>
    					<input name='description' value={this.state.task.description} onChange={this.handleChange} type='text' className='form-control' id='inputAddress2'/>
    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputAddress2'>Plan duration</label>
    					<input name='pTime' value={this.state.task.pTime} onChange={this.handleChange} type='text' className='form-control' id='inputAddress2'/>
    				</div>
    				<div className='form-group'>
    					<label htmlFor='inputAddress2'>Fact duration</label>
    					<input name='fTime' value={this.state.task.fTime} onChange={this.handleChange} type='text' className='form-control' id='inputAddress2'/>
    				</div>
    				<div className='form-row'>
    					<div className='form-group col-md-6'>
    						<label htmlFor='inputCity'>Date</label>
    						<input name='date' disabled='disabled' value={new Date(this.state.task.date).toLocaleString()} onChange={this.handleChange} type='text' className='form-control' id='inputCity'/>
    					</div>
    					<div className='form-group col-md-4'>
    						<label htmlFor='inputState'>Priority</label>
    						<select name='priority' value={this.state.task.priority} onChange={this.handleChange} id='inputState' className='form-control'>
    							<option value='high'>High</option>
    							<option value='medium'>Medium</option>
    							<option value='low'>Low</option>
    						</select>
    					</div>
    					<div className='form-group col-md-4'>
    						<label htmlFor='inputState'>Status</label>
    						<select name='status' value={this.state.task.status} onChange={this.handleChange} id='inputState' className='form-control'>
    							<option value='done'>Done</option>
    							<option value='processing'>Processing</option>
    							<option value='planning'>Planning</option>
    						</select>
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
		tasks: state.tasks,
		scrumDesk: state.scrumDesk,
		alert: state.alert,
		representation: state.representation,
	}
}
  
const mapDispatchToProps = (dispatch) => {
	return {
		taskChange: (task) => { dispatch(taskChange(task)) },
		taskCreate: (task) => { dispatch(taskCreate(task)) },
		setAlert: (alert) => { dispatch(setAlert(alert)) },
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)