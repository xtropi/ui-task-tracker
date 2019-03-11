/* eslint-disable */
const express = require('express')
const path = require('path')
const config = require('../config').config
const cors = require('cors')
const bodyParser = require('body-parser')

/*MOCKDATA->*/
const { tasksMock } = require('./tasksMockData.json')
const { usersMock } = require('./usersMockData.json')
var sessionTasksMock = tasksMock
var sessionUsersMock = usersMock
/*<-MOCKDATA*/


var reorderByIdAsc = (taskA, taskB) => {
	var numIdA = parseInt(taskA.id.split('-')[1], 10)
	var numIdB = parseInt(taskB.id.split('-')[1], 10)
	if(numIdA < numIdB) { return -1 }
	if(numIdA > numIdB) { return 1 }
	return 0;
}

var authentication = (login, passHash)=>{
	var matched = sessionUsersMock.find((user)=>{
		if ((user.login==login)&&(user.passHash==passHash)){
			return user
		}
	})
  
	var bus = {
		msg: 'Failed',
	}
  
	if (matched){
		bus = {
			msg: 'Success',
			authData: matched
		}
	}
	return bus
}


const app = express()

// for fetching from front to backs
app.use(cors());

// for parsing post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// access to public folder
app.use(express.static(path.join(__dirname, 'public')))





app.post('/auth', function(req, res){
	console.log('Auth: '+req.body.authData.login, req.body.authData.passHash)
	console.log('Auth: '+authentication(req.body.authData.login, req.body.authData.passHash).msg)
	res.send(authentication(req.body.authData.login, req.body.authData.passHash))
})

app.post('/taskCreateInit', function(req, res){
	var bus = {
		msg: 'Failed',
	}
	if (authentication(req.body.authData.login, req.body.authData.passHash).msg=='Success'){
		// Seraching for voids in tasks array
		var newTaskNum = 0
		var newTaskId = null
		sessionTasksMock.sort(reorderByIdAsc).map((task)=>{
			if (task.id!='task-'+newTaskNum){
				// Create new task in founded void with lacking id 
				newTaskId = 'task-'+newTaskNum
				return
			} else {
				newTaskNum++
			}
		})
		// if no voids push new task at the end
		if(!newTaskId)
			newTaskId = 'task-'+newTaskNum
		console.log('Void founded: '+newTaskId)
		bus = {
			msg: 'Success',
			id: newTaskId,
		}
	} 
	console.log('taskCreateInit: '+bus.msg)
	res.send(bus)
})

app.post('/taskCreate', function(req, res){
	var newTasks = []
	var bus = {
		msg: 'Failed',
	}
	if (authentication(req.body.authData.login, req.body.authData.passHash).msg=='Success'){
		newTasks = [...sessionTasksMock, req.body.task]
		sessionTasksMock = newTasks
		bus = {
			msg: 'Success',
			newTasks: newTasks,
		}
	} 
	console.log('taskCreate: '+bus.msg)
	res.send(bus)
})

app.post('/taskChange', function(req, res){
	console.log('taskChange: '+req.body.task.id)
	var newTasks = []
	var bus = {
		msg: 'Failed',
	}
	if (authentication(req.body.authData.login, req.body.authData.passHash).msg=='Success'){
		newTasks = sessionTasksMock.map((task)=>{
			if (task.id==req.body.task.id){
				task=req.body.task
			}
			return task
		}) 
		sessionTasksMock = newTasks
		bus = {
			msg: 'Success',
			newTasks: newTasks,
		}
	} 
	console.log('taskChange: '+bus.msg)
	res.send(bus)
})

app.post('/taskDelete', function(req, res){
	console.log('taskDelete: '+req.body.id)
	var newTasks = []
	var bus = {
		msg: 'Failed',
	}
	if (authentication(req.body.authData.login, req.body.authData.passHash).msg=='Success'){
		newTasks = sessionTasksMock.filter((task)=>(task.id!=req.body.id))
		sessionTasksMock = newTasks
		bus = {
			msg: 'Success',
			newTasks: newTasks,
		}
	} 
	console.log('taskDelete: '+bus.msg)
	res.send(bus)
})

app.get('/getTasks', function(req, res){
	console.log('Sending tasks...')
	var bus = {
		msg: 'Success',
		tasks: sessionTasksMock,
	}
	res.send(bus)
})


var server = app.listen(config.bePort,()=>{
	console.log(`MockServer is running on port ${config.bePort}`)
})