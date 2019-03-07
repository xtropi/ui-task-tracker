import React, {Component} from 'react'
import { connect } from 'react-redux'

class TaskView extends Component {
    state = {
        task: {},
    }

    componentDidMount(){

        // Loading needed task
        this.props.tasks.map((task)=>{
            
            task.id==this.props.match.params.id && 
               this.setState({...this.state, task: task})
        })
    }

    handleSubmit(event){
        event.preventDefault()
        alert('will make it later, need to sleep...')
    }

    render(){
        let {task} = this.state
        return(
            <div>
                <form onSubmit={this.handleSubmit} style={{margin: '20px 100px'}}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Id</label>
                        <input disabled={task.id && 'disabled'} value={task.id} type="text" className="form-control" id="inputEmail4"/>
                        </div>
                        <div className="form-group col-md-6">
                        <label htmlFor="inputPassword4">User</label>
                        <input disabled={task.id && 'disabled'} value={task.user} type="text" className="form-control" id="inputPassword4"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress">Title</label>
                        <input value={task.title} type="text" className="form-control" id="inputAddress"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Description</label>
                        <input value={task.description} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Plan duration</label>
                        <input value={task.pTime} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inputAddress2">Fact duration</label>
                        <input value={task.fTime} type="text" className="form-control" id="inputAddress2"/>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                        <label htmlFor="inputCity">Data</label>
                        <input disabled={task.id && 'disabled'} value={new Date(task.date).toLocaleString()} type="text" className="form-control" id="inputCity"/>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">Priority</label>
                        <select value={task.priority} id="inputState" className="form-control">
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                        </div>
                        <div className="form-group col-md-4">
                        <label htmlFor="inputState">Status</label>
                        <select value={task.status} id="inputState" className="form-control">
                            <option value="done">Done</option>
                            <option value="processing">Processing</option>
                            <option value="planning">Planning</option>
                        </select>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Change</button>
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