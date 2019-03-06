import React, {Component} from 'react'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { setAlert } from '../actions/setAlertAction'
import { tasksSet } from '../actions/tasksSetAction'
import { representationChange } from '../actions/representationChangeAction'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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


class TaskListFull extends Component {
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
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            id
                            <button className='hidden' name='byId' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            Title
                            <button className='hidden' name='byTitle' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            Description
                            <button className='hidden' >^</button>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            Date
                            <button className='hidden' name='byDate' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            Priority
                            <button className='hidden' name='byPriority' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            pTime
                            <button className='hidden' name='byValue' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            fTime
                            <button className='hidden' name='byValue' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                        <th scope="col">
                            <label style={{display: 'inline-flex', margin: '0px'}}>
                            Status
                            <button className='hidden' name='byStatus' onClick={this.handleClick}></button>
                            <div className='ml-1'>
                                <FontAwesomeIcon icon="sort" />
                            </div>
                            </label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {myTasks.sort(reorder(this.state.sort, this.state.type)).map((task)=>{

                        let result = (
                            <tr key={task.id}>
                                <td scope="row">{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.date}</td>
                                <td>{task.priority}</td>
                                <td>{task.pTime}</td>
                                <td>{task.fTime}</td>
                                <td>{task.status}</td>
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
        representation: state.representation,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        taskChange: (task) => { dispatch(taskChange(task)) },
        tasksSet: (tasks) => { dispatch(tasksSet(tasks)) },
        setAlert: (alert) => { dispatch(setAlert(alert)) },
        representationChange: (representation) => { dispatch(representationChange(representation)) },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(TaskListFull)