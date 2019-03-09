import React, {Component} from 'react'
import { connect } from 'react-redux'

class TaskView extends Component {
    state = {
        task: {},
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

    handleSubmit(event){
        event.preventDefault()
        alert('will make it later, need to sleep...')
        console.log(this.state.task)
    }

    handleChange = (event) => {
        event.preventDefault()
        this.setState({...this.state, task:{...this.state.task, [event.target.name]: event.target.value}});
    }

    render(){
        let {task} = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit} style={{margin: '20px 100px'}}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Id</label>
                        <input disabled='disabled' value={task.id} onChange={this.handleChange} type="text" className="form-control" id="inputEmail4"/>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">User</label>
                        <input disabled={!this.state.new && 'disabled'} value={task.user} onChange={this.handleChange} type="text" className="form-control" id="inputPassword4"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Title</label>
                        <input value={task.title} onChange={this.handleChange} type="text" className="form-control" id="inputAddress"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Description</label>
                        <input value={task.description} onChange={this.handleChange} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Plan duration</label>
                        <input value={task.pTime} onChange={this.handleChange} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Fact duration</label>
                        <input value={task.fTime} onChange={this.handleChange} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Date</label>
                        <input disabled='disabled' value={new Date(task.date).toLocaleString()} onChange={this.handleChange} type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">Priority</label>
                        <select value={task.priority} onChange={this.handleChange} id="inputState" className="form-control">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">Status</label>
                        <select value={task.status} onChange={this.handleChange} id="inputState" className="form-control">
                            <option value="done">Done</option>
                            <option value="processing">Processing</option>
                            <option value="planning">Planning</option>
                        </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">{!this.state.new ? 'Change' : 'Create'}</button>
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
        tasksSet: (tasks) => { dispatch(tasksSet(tasks)) },
        setAlert: (alert) => { dispatch(setAlert(alert)) },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TaskView)