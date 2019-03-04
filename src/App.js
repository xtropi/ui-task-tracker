import React, {Component} from 'react'
import Navbar from './components/Navbar'
import ScrumDesk from './components/ScrumDesk'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import TaskList from './components/TaskList'
import Logout from './components/Logout'
import { connect } from 'react-redux'
import { tasksSet } from './actions/tasksSetAction'

/*MOCKDATA->*/
import {tasks as tasksMock} from '../tasksMockData.json'
/*<-MOCKDATA*/

class App extends Component {

    componentDidMount(){
        // TASKS DATA MOCKUP ->
          /* 
            need to be replaced with data fetching from real server 
          */

        let addedContent = tasksMock.map((task)=>{
            let content = (
                <div>
                    <div>Title: {task.title}</div>
                    <div>Prioroty: {task.priority}</div>
                    <div>User: {task.user}</div>
                </div>
            )
            let result = {...task, content: content}
            return result
            })

        // <- TASKS DATA MOCKUP
    
        this.props.tasksSet(addedContent)

      }

    render(){
        return(

            <BrowserRouter>
            <div className='App'>
                <Navbar />
            <Switch>
                
                <Route exact path='/' component={ScrumDesk}/>
                <Route path='/tasklist' component={TaskList}/>
                <Route path='/logout' component={Logout}/>

            </Switch>
            </div>
            </BrowserRouter>

        )

    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        tasksSet: (tasks) => { dispatch(tasksSet(tasks)) }
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(App)