import React, {Component} from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// fake data generator
const getItems = (count, offset = 0) =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
        id: `item-${k + offset}`,
        content: `item ${k + offset}`
    }));

// a little function to help us with reordering the result
let reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list);
  let [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

let grid = 8;

let getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 5,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightPink' : 'Pink',

  // styles we need to apply on draggables
  ...draggableStyle,
});

let getPlanningListStyle = isDraggingOver => ({
    background: 'rgb(255,255,235)',
    padding: grid,
    width: '100%',
    height: '100%'
  });
  
let getProcessingListStyle = isDraggingOver => ({
    background: 'rgb(184,250,184)',
    padding: grid,
    width: '100%',
    height: '100%'
});

let getDoneListStyle = isDraggingOver => ({
    background: 'lightblue',
    padding: grid,
    width: '100%',
    height: '100%'
});

class ScrumDesk extends Component {

    state = {
        planning: [
          {id: "item-1", content: "item 1"},
          {id: "item-2", content: "item 2"},
          {id: "item-3", content: "item 3"}
        ],
        processing: [
            {id: "item-4", content: "item 4"},
            {id: "item-5", content: "item 5"},
            {id: "item-6", content: "item 6"}
        ],
        done: [
            {id: "item-7", content: "item 7"},
            {id: "item-8", content: "item 8"},
            {id: "item-9", content: "item 9"}
        ],
    };
    
    getList = id => this.state[this.id2List[id]];

  onDragEnd = (result) =>{
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

  if (source.droppableId === destination.droppableId) {
    let items = reorder(
      this.state[result.destination.droppableId],
      result.source.index,
      result.destination.index
    );

    this.setState({
      ...this.state,
      [result.destination.droppableId]: items,
    });
  } else {
    const result = move(
        this.state[source.droppableId],
        this.state[destination.droppableId],
        source,
        destination
    );

    this.setState({
      ...this.state,
      [source.droppableId]: result[source.droppableId],
      [destination.droppableId]: result[destination.droppableId]
    });
  }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
    <div className="container-fluid">
        <div className="row no-gutters align-items-center justify-content-center" style={{height: '100%'}}>
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

export default ScrumDesk