import React, {Component} from 'react'
import { Route, Redirect } from 'react-router'
import { connect } from 'react-redux'
import { loadState, saveState } from '../localStorage'
import { setAlert } from '../actions/setAlertAction'

class Alert extends Component {
    componentDidMount(){
        setTimeout(()=>{
            this.props.setAlert(null)
        }, 3000)
        
    }

    render(){
        let result = ''
        let alertStyle = ()=>{
            let style = {
                userSelect: 'none',
                //zIndex: '1', 
                //position: 'fixed',
                width: 'auto',
                height: 'auto',
                marginLeft: 'auto',
                marginRight: 'auto',
                // left: '45%',
                // bottom: '5%',
            }
            return style
        }

        if (this.props.alert==="AUTH_FAIL"){
            result = (
            <div className="fixed-bottom justify-content-center">
            <div style={alertStyle()} className="alert alert-danger text-center" role="alert">
                Your login\pass is wrong or user does not exist!
            </div>
            </div>
            )
        }

        if (this.props.alert==="WRONG_USER"){
            result = (
            <div className="fixed-bottom">
            <div style={alertStyle()} className="alert alert-danger text-center" role="alert">
                No permissions!
            </div>
            </div>
            )
        }

        return result
    }
}

const mapStateToProps = (state) => {
    return {
        alert: state.alert,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setAlert: (alert) => { dispatch(setAlert(alert)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert)