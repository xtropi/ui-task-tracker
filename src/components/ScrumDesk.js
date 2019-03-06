import React, {Component} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
//import { loadState, saveState } from '../localStorage'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { setAlert } from '../actions/setAlertAction'
import { tasksSet } from '../actions/tasksSetAction'


let getCardStyle = (isDragging, draggableStyle, item) => {
// do not remove item param - may be useful later
  let result = {
    card: {
      userSelect: 'none',
      //margin: `20px auto`,
      width: '300px',

      // when dragging
      //background: isDragging ? 'lightgreen' : 'grey',

      // styles we need to apply on draggables
      ...draggableStyle
    },
    header: {
      fontWeight: 'bold'
    },
    body: {

    },
    user: {
      position: 'absolute',
      bottom: '3px',
      right: '5px',
    },
  }
  return result
}

let getColoumnStyle = () => {
  let result = {
    title: {
      fontWeight: 'bold'
    },
    body: {

    },
  }
  return result
}

let draggableCard = (item, index)=>{
  // Coloring by prior with bootstrap
  let colorPriority = 'black'
  if (item.priority=='high'){
    colorPriority = "card text-white bg-danger"
  }
  if (item.priority=='medium'){
    colorPriority = "card text-black bg-warning"
  }
  if (item.priority=='low'){
    colorPriority = "card text-white bg-success"
  }

  let result = (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div class="row mb-2 justify-content-center no-gutters">
        <div
          // D&D params, do not touch this
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          // just styles
          className={colorPriority} 
          style={getCardStyle(snapshot.isDragging, provided.draggableProps.style, item).card}
        >

          {/* card */}
          <div 
            className="card-header" 
            style={getCardStyle(snapshot.isDragging, provided.draggableProps.style, item).header}
          >
            {item.title}
          </div>
          <div className="card-body" style={getCardStyle(snapshot.isDragging, provided.draggableProps.style, item).body}>
            <div style={getCardStyle(snapshot.isDragging, provided.draggableProps.style).user}>
              {item.user}
            </div>
            <div>
              Description: 
              <div>
                {item.description}
              </div>
            </div>
          </div>
          {/* card */}
          </div>
          
        </div>
      )}
    </Draggable>
  )

  return result
}

// Lists styles
let getPlanningListStyle = isDraggingOver => ({
    background: 'rgb(255,255,235)',
    width: '100%',
    height: '100%'
  })
  
let getProcessingListStyle = isDraggingOver => ({
    background: 'rgb(184,250,184)',
    width: '100%',
    height: '100%'
})

let getDoneListStyle = isDraggingOver => ({
    background: 'lightblue',
    width: '100%',
    height: '100%'
})



class ScrumDesk extends Component {

  onDragEnd = (result) =>{
    const { source, destination, draggableId } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    // dropped on other list
    if (source.droppableId != destination.droppableId) {
    
      let oldTask = this.props.tasks.find((task)=>(task.id===draggableId))

      if (oldTask.user!=this.props.user) {
        // wrong user
        this.props.setAlert('WRONG_USER')
        return
      }
      let newTask = {...oldTask, status: destination.droppableId}
      this.props.taskChange(newTask)
    }
  }

  render() {
    return (
    <div 
      className="container-fluid" 
      style={{
        marginRight: '0', 
        marginLeft: '0',
        paddingRight: '0',
        paddingLeft: '0'
        }}
      >
        <div className="row no-gutters justify-content-center" style={{height: '100%'}}>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-4">
            
                <Droppable droppableId="planning">
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        style={getPlanningListStyle(snapshot.isDraggingOver)}
                        >
                        <div className="card-header mb-2" style={getColoumnStyle().title}>Planning</div>
                         {/* Coloumns of cards */}
                        {this.props.scrumDesk.planning.map((item, index) => 
                          (draggableCard(item, index))
                        )}

                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
            </div>
            <div className="col-4">
            
            <Droppable droppableId="processing">
                    {(provided, snapshot) => ( 
                        <div
                        ref={provided.innerRef}
                        style={getProcessingListStyle(snapshot.isDraggingOver)}
                        >
                        <div className="card-header mb-2" style={getColoumnStyle().title}>Processing</div>
                        {/* Coloumns of cards */}
                        {this.props.scrumDesk.processing.map((item, index) => 
                          (draggableCard(item, index))
                        )}
                        
                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
            </div>
            <div className="col-4">
            
            <Droppable droppableId="done">
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        style={getDoneListStyle(snapshot.isDraggingOver)}
                        >
                        <div className="card-header mb-2" style={getColoumnStyle().title}>Done</div>
                        {/* Coloumns of cards */}
                        {this.props.scrumDesk.done.map((item, index) => 
                          (draggableCard(item, index))
                        )}

                        {provided.placeholder}
                        </div>
                    )}
                    </Droppable>
                  </div>
                </DragDropContext>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ScrumDesk)