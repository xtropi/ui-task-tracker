import React, {Component} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { loadState, saveState } from '../localStorage'
import { connect } from 'react-redux'
import { taskChange } from '../actions/taskChangeAction'
import { tasksSet } from '../actions/tasksSetAction'


/*MOCKDATA->*/
import {tasks as tasksMock} from '../../tasksMockData.json'
/*<-MOCKDATA*/

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }))

let getTasksByStatus = (tasks, status)=>{
  let statusTasks = tasks.filter((task)=>task.status==status)
  return statusTasks
}

// a little function to help with reordering the result
let reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list)
  let [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
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

  state = {
    planning: [],
    processing: [],
    done: [],
  }

  componentDidMount(){
    let loadedState = loadState()

    // TASKS DATA MOCKUP ->
      /* 
        need to be replaced with data fetching from real server 
      */
    let addedContent = tasksMock.map((task)=>({...task, content: task.title}))
    saveState({...loadedState, tasks: addedContent})
    //tasksSet({...loadedState, tasks: addedContent})
    loadedState = loadState()
    // <- TASKS DATA MOCKUP

    
    let newState = {
      planning: getTasksByStatus(loadedState.tasks, 'planning'),
      processing: getTasksByStatus(loadedState.tasks, 'processing'),
      done: getTasksByStatus(loadedState.tasks, 'done'),
    }
    this.setState(newState)
  }



  onDragEnd = (result) =>{
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    // dropped on same list
    if (source.droppableId === destination.droppableId) {
     // console.log(this.getTasksByStatus(result.destination.droppableId))
      let items = reorder(
        this.state[result.destination.droppableId],
        result.source.index,
        result.destination.index
      )
      this.setState({
        ...this.state,
        [result.destination.droppableId]: items,
      })
    } else {
    // dropped on other list
      const result = move(
          this.state[source.droppableId],
          this.state[destination.droppableId],
          source,
          destination
      )

      this.setState({
        ...this.state,
        [source.droppableId]: result[source.droppableId],
        [destination.droppableId]: result[destination.droppableId]
      })
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
                        {this.state.planning.map((item, index) => (
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
                        {this.state.processing.map((item, index) => (
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
                        {this.state.done.map((item, index) => (
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
      tasks: state.tasks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      taskChange: (task) => { dispatch(taskChange(task)) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScrumDesk)