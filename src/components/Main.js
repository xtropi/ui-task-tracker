import React, {Component} from 'react'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { setAlert } from '../actions/setAlertAction'
import { tasksSet } from '../actions/tasksSetAction'
import { representationChange } from '../actions/representationChangeAction'
import ScrumDesk from './ScrumDesk'


class Main extends Component {
    render(){
        return <ScrumDesk private={false}/>
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

export default connect(mapStateToProps, mapDispatchToProps)(Main)