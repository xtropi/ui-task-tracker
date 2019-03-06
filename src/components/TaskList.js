import React, {Component} from 'react'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { setAlert } from '../actions/setAlertAction'
import { tasksSet } from '../actions/tasksSetAction'

class TaskList extends Component {
    componentDidMount(){

    }

    render(){
        let {user, tasks} = this.props
        let myTasks = tasks.filter((task)=>(task.user==user))
        return(
            <div style={{margin: '20px'}}>
            <form>
            <div class="form-inline mb-3">
                <div class="input-group input-group-sm mr-2 ml-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Title</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </div>
                
                <div class="input-group input-group-sm mr-2 ml-2">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Description</span>
                    </div>
                    <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"/>
                </div>
                
                <div class="input-group input-group-sm mr-2 ml-2">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Priority</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01">
                        <option selected>All</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </select>
                </div>

                </div>
            </form>
            <table class="table table-bordered">
                <thead class="thead-light">
                    <tr>
                    <th scope="col">id<button>^</button></th>
                    <th scope="col">Title<button>^</button></th>
                    <th scope="col">Description<button>^</button></th>
                    <th scope="col">Priority<button>^</button></th>
                    </tr>
                </thead>
                <tbody>
                    {myTasks.map((task)=>{

                        let result = (
                            <tr>
                                <td scope="row">{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.priority}</td>
                            </tr>

                        )
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
        tasks: state.tasks,
        scrumDesk: state.scrumDesk,
        alert: state.alert,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        taskChange: (task) => { dispatch(taskChange(task)) },
        tasksSet: (tasks) => { dispatch(tasksSet(tasks)) },
        setAlert: (alert) => { dispatch(setAlert(alert)) },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TaskList)