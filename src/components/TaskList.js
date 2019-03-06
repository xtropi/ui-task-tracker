import React, {Component} from 'react'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { setAlert } from '../actions/setAlertAction'
import { tasksSet } from '../actions/tasksSetAction'

// a little function to help with reordering the result
let reorder = (sort, type)=>{

    // Ascending
    let reorderByPriorityAsc = (taskA, taskB) => {
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
    
    let reorderByTitleAsc = (taskA, taskB) => {
        if(taskA.title < taskB.title) { return -1 }
        if(taskA.title > taskB.title) { return 1 }
        return 0;
    }

    let reorderByStatusAsc = (taskA, taskB) => {
        let numPriority = (text)=>{
            if (text == 'planning') return 0
            if (text == 'processing') return 1
            if (text == 'done') return 2
          return 0
        }
        let aPriority = numPriority(taskA.priority)
        let bPriority = numPriority(taskB.priority)
        return aPriority-bPriority;
    }

    // Descending
    let reorderByPriorityDesc = (taskA, taskB) => {
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
    
    let reorderByTitleDesc = (taskA, taskB) => {
        if(taskA.title < taskB.title) { return 1 }
        if(taskA.title > taskB.title) { return -1 }
        return 0;
    }

    let reorderByStatusDesc = (taskA, taskB) => {
        let numPriority = (text)=>{
            if (text == 'planning') return 2
            if (text == 'processing') return 1
            if (text == 'done') return 0
          return 0
        }
        let aPriority = numPriority(taskA.priority)
        let bPriority = numPriority(taskB.priority)
        return aPriority-bPriority;
    }

    if ((sort=='byTitle')&&(type))
        return reorderByTitleAsc

    if ((sort=='byPriority')&&(type))
        return reorderByPriorityAsc

    if ((sort=='byStatus')&&(type))
        return reorderByStatusAsc

    if ((sort=='byTitle')&&(!type))
        return reorderByTitleDesc

    if ((sort=='byPriority')&&(!type))
        return reorderByPriorityDesc

    if ((sort=='byStatus')&&(!type))
        return reorderByStatusDesc
}


class TaskList extends Component {
    state = {
        sort: null,
        type: false,

    }

    handleClick = (event) => {
        event.preventDefault()
        console.log(this.state.type)
        this.setState({sort: event.currentTarget.name, type: !this.state.type})
    }

    render(){
        let {user, tasks} = this.props
        let myTasks = tasks.filter((task)=>(task.user==user))
        return(
            <div style={{margin: '20px'}}>
            <form>
            <div className="form-inline mb-3">
                <div className="input-group input-group-sm mr-2 ml-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="input_title">Title</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="input_title"/>
                </div>
                
                <div className="input-group input-group-sm mr-2 ml-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="input_description">Description</span>
                    </div>
                    <input type="text" className="form-control" aria-label="Small" aria-describedby="input_description"/>
                </div>
                
                <div className="input-group input-group-sm mr-2 ml-2">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="input_priority">Priority</span>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" aria-label="Small" aria-describedby="input_priority">
                        <option defaultValue>All</option>
                        <option value="1">High</option>
                        <option value="2">Medium</option>
                        <option value="3">Low</option>
                    </select>
                </div>

                </div>
            </form>
            <table className="table table-bordered">
                <thead className="thead-light">
                    <tr>
                    <th scope="col">id<button>^</button></th>
                    <th scope="col">Title<button name='byTitle' onClick={this.handleClick}>{(this.state.type && this.state.sort=='byTitle')  ? '^' : 'v'}</button></th>
                    <th scope="col">Description<button>^</button></th>
                    <th scope="col">Priority<button name='byPriority' onClick={this.handleClick}>{(this.state.type && this.state.sort=='byPriority')  ? '^' : 'v'}</button></th>
                    </tr>
                </thead>
                <tbody>
                    {myTasks.sort(reorder(this.state.sort, this.state.type)).map((task)=>{

                        let result = (
                            <tr key={task.id}>
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