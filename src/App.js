import React, {Component} from 'react'
import { config } from '../config'
import Navbar from './components/Navbar'
import Main from './components/Main'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import MyTasks from './components/MyTasks'
import TaskView from './components/TaskView'
import Logout from './components/Logout'
import { connect } from 'react-redux'
import { tasksSet } from './actions/tasksSetAction'
import Alert from './components/Alert'
import axios from 'axios'
import { setAlert } from './actions/setAlertAction'

//fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSort } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faSort)
library.add(faTrash)


class App extends Component {

	recieveTasksData = async () => {
		let result = await axios.get(`${config.beString}${config.beServiceNames.getTasks}`)
		if (result.data.msg=='Success'){
			this.props.tasksSet(result.data.tasks)
		} else {
			this.props.setAlert('GET_TASKS_FAIL')
		}
	}

	componentDidMount(){
		this.recieveTasksData()
		setInterval(()=>{
			this.recieveTasksData()
		}, config.refreshTime)
	}

	render(){
		return(
			<BrowserRouter>
				<div className='App'>
					<Navbar />
					{this.props.alert && <Alert />}
					<Switch>
						<Route exact path='/' component={Main}/>
						<Route exact path='/mytasks' component={MyTasks}/>
						<Route exact path='/mytasks/:id' component={TaskView} />
						<Route exact path='/logout' component={Logout}/>
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

export default connect(mapStateToProps, { setAlert, tasksSet })(App)