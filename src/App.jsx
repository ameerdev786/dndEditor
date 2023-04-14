import React, {useState, useRef, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ColorPicker from "./components/ColourPicker";

import {v4} from "uuid";
import MainDragContext from "./components/MainDragContext";

const sidebarText = [
  {id: v4(), content: "Line Text"},
  {id: v4(), content: "Webcam"},
  {id: v4(), content: "Paragraph"},
  {id: v4(), content: "List"},
  {id: v4(), content: "Table"},
];
const Widgets = {
  [v4()]: {
    name: "First Wdiget",
    items: sidebarText,
  },
  [v4()]: {
    name: "Second Widget",
    items: [],
  },
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const {source, destination} = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

function App() {
  const [columns, setColumns] = useState(Widgets);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedText, setSelectedId] = useState(0);
  const [textValue, setText] = useState("");
  const [color, setColor] = useState("#000000");

  const selectRef = useRef(null);
  //
  const text = "i am text";
  const [content, setContent] = useState(`<div contenteditable>${text}</div>`);

  const handleContentChange = e => {
    setContent(e.target.innerHTML);
  };
  // detect click listener outside 
  useEffect(() => {
    let timeOut = setTimeout(() => {
      window.addEventListener("click", handleClickFunction, true);
    }, 400);
    return () => clearTimeout(timeOut);
  }, [isEdit]);
  // function for detection of listener y.k
  function handleClickFunction(e) {
    if (selectRef?.current?.contains(e?.target)) {
      console.log("clicked");
      setIsEdit(!isEdit);
    } else {
      console.log("outside");
      setIsEdit(false);
    }
  }
  return (
   <div className="">
    <MainDragContext/>
   </div>
  );
}

export default App;
