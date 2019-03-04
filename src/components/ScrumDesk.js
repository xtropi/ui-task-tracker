import React, {Component} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
//import { loadState, saveState } from '../localStorage'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { tasksSet } from '../actions/tasksSetAction'

// a little function to help with reordering the result
let reorder = (taskA, taskB) => {
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

let grid = 5

let getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  //padding: `${grid * 5}px 0`,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightPink' : 'Pink',

  // styles we need to apply on draggables
  ...draggableStyle,
})



let getPlanningListStyle = isDraggingOver => ({
    background: 'rgb(255,255,235)',
    padding: grid,
    width: '100%',
    height: '100%'
  })
  
let getProcessingListStyle = isDraggingOver => ({
    background: 'rgb(184,250,184)',
    padding: grid,
    width: '100%',
    height: '100%'
})

let getDoneListStyle = isDraggingOver => ({
    background: 'lightblue',
    padding: grid,
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
      let newTask = {...oldTask, status: destination.droppableId}
      this.props.taskChange(newTask)
    }
  }

  render() {
    return (
    <div className="container-fluid">
        <div className="row no-gutters justify-content-center" style={{height: '100%'}}>
            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="col-4">
                <Droppable droppableId="planning">
                    {(provided, snapshot) => (
                        <div
                        ref={provided.innerRef}
                        style={getPlanningListStyle(snapshot.isDraggingOver)}
                        >
                        {this.props.scrumDesk.planning.sort(reorder).map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                                >
                                {item.content}
                                </div>
                            )}
                            </Draggable>
                        ))}
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
                        {this.props.scrumDesk.processing.sort(reorder).map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                                >
                                {item.content}
                                </div>
                            )}
                            </Draggable>
                        ))}
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
                        {this.props.scrumDesk.done.sort(reorder).map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                            {(provided, snapshot) => (
                                <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style
                                )}
                                >
                                {item.content}
                                </div>
                            )}
                            </Draggable>
                        ))}
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
      tasks: state.tasks,
      scrumDesk: state.scrumDesk
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      taskChange: (task) => { dispatch(taskChange(task)) },
      tasksSet: (tasks) => { dispatch(tasksSet(tasks)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumDesk)