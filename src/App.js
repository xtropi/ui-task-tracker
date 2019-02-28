import React, {Component} from 'react'
import Navbar from './components/Navbar'
import ScrumDesk from './components/ScrumDesk'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import TaskList from './components/TaskList'
import Logout from './components/Logout'

class App extends Component {
    render(){
        return(
            <div>
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
            </div>
        )

    }
}

export default App