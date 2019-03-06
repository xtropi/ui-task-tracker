import React, {Component} from 'react'
import Navbar from './components/Navbar'
import Main from './components/Main'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MyTasks from './components/MyTasks'
import Logout from './components/Logout'
import { connect } from 'react-redux'
import { tasksSet } from './actions/tasksSetAction'
import Alert from './components/Alert'
import { setAlert } from './actions/setAlertAction'

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort } from '@fortawesome/free-solid-svg-icons'
library.add(faSort)

/*MOCKDATA->*/
import {tasks as tasksMock} from '../tasksMockData.json'
/*<-MOCKDATA*/



class App extends Component {

    componentDidMount(){
        // TASKS DATA MOCKUP ->
            /* 
            need to be replaced with data fetching from real server 
            */
        this.props.tasksSet(tasksMock)
        // <- TASKS DATA MOCKUP
      }

    render(){
        return(

            <BrowserRouter>
            <div className='App'>
                <Navbar />
                {this.props.alert && <Alert />}
            <Switch>
                
                <Route exact path='/' component={Main}/>
                <Route path='/mytasks' component={MyTasks}/>
                <Route path='/logout' component={Logout}/>

            </Switch>
            </div>
            </BrowserRouter>

        )

    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        alert: state.alert,
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        tasksSet: (tasks) => { dispatch(tasksSet(tasks)) },
        setAlert: (alert) => { dispatch(setAlert(alert)) },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)