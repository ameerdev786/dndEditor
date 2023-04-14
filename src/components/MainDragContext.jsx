import React, {useState, useRef, useEffect} from "react";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import ColorPicker from "./ColourPicker";
import "./dragable.css";
import {v4} from "uuid";
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

function MainDragContext() {
  const [columns, setColumns] = useState({
    [v4()]: {
      name: "Main Wdiget",
      items: sidebarText,
    },
    [v4()]: {
      name: "Widget for Editing ",
      items: [],
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [selectedText, setSelectedId] = useState(0);
  const [textValue, setText] = useState("");
  const [color, setColor] = useState("#000000");
  const selectRef = useRef(null);
  const [fontSize, setFontSize] = useState("16px");
  const [textAlign, setTextAlign] = useState("left");
  const [fontFamily, setFontFamily] = useState("Arial");
  console.log(fontFamily, "family");
  const [isDragged, setIsDragged] = useState(false);
  console.log(fontFamily, "family");
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
  // update specific item when we are done with setting
  const updateWidgetItem = (widgetId, itemIndex, newItem) => {
    setColumns(prevWidgets => {
      const widget = prevWidgets[widgetId];
      const newItems = [...widget.items];
      newItems[itemIndex] = newItem;
      return {
        ...prevWidgets,
        [widgetId]: {
          ...widget,
          items: newItems,
        },
      };
    });
  };
  // function for detection of listener y.k
  const handleClickFunction = e => {
    if (selectRef?.current?.contains(e?.target)) {
      console.log("clicked");
      setIsEdit(!isEdit);
    } else {
      console.log("outside");
      setIsEdit(false);
    }
  };
  useEffect(() => {
    if (isEdit) {
    }
  }, [isEdit]);
  return (
    <div className="drag_component">
      <DragDropContext
        onDragEnd={result => {
          onDragEnd(result, columns, setColumns);
          setIsDragged(true);
        }}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="widgets" key={columnId}>
              <h2>{column.name} </h2>
              <div style={{margin: 8}}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided?.innerRef}
                        style={{
                          background: "",
                          padding: 4,
                          width: 350,
                          minHeight: 500,
                        }}
                      >
                        {column?.items?.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id.toString()}
                              index={index}
                            >
                              {(provided, snapshot) => {
                                return (
                                  <div
                                    onClick={() => {
                                      setSelectedId(item.id);
                                      setIsDragged(true);
                                    }}
                                    key={item.id}
                                  >
                                    {!isEdit && selectedText == item?.id ? (
                                      <div className="dragable_input">
                                        <button
                                          onClick={() => {
                                            setIsEdit(!isEdit);
                                            updateWidgetItem(columnId, index, {
                                              id: v4(),
                                              content: textValue
                                                ? textValue
                                                : item?.content,
                                              color,
                                            });
                                          }}
                                        >
                                          done
                                        </button>
                                        <input
                                          onChange={e => {
                                            setText(e.target.value);
                                          }}
                                          type="text"
                                          // ref={selectRef}
                                          style={{
                                            color: color,
                                            fontSize: fontSize
                                              ? fontSize
                                              : item?.fontSize,
                                            fontFamily: fontFamily
                                              ? fontFamily
                                              : item?.fontFamily,
                                            textAlign: textAlign
                                              ? textAlign
                                              : item?.textAlign,
                                            ...provided.draggableProps.style,
                                          }}
                                          className="editable_element"
                                          defaultValue={item.content}
                                        />
                                      </div>
                                    ) : (
                                      <div
                                        onClick={() => {
                                          setTimeout(() => {
                                            setIsEdit(
                                              item.id == selectedText && !isEdit
                                            );
                                          }, 100);
                                        }}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="sidebar_element"
                                        style={{
                                          color: item?.color || "black",
                                          fontSize: item?.fontSize || "",
                                          fontFamily: item?.fontFamily || "",
                                          textAlign: item?.textAlign || "",
                                          ...provided.draggableProps.style,
                                        }}
                                      >
                                        {item.content}
                                      </div>
                                    )}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
        <ColorPicker
          color={color}
          setColor={setColor}
          setFontSize={setFontSize}
          setFontFamily={setFontFamily}
          setTextAlign={setTextAlign}
          textAlign={textAlign}
          fontSize={fontSize}
          fontFamily={fontFamily}
          isDragged={isDragged}
        />
      </DragDropContext>
    </div>
  );
}

export default MainDragContext;
