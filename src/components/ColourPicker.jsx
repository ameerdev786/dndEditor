import React, {useState, useEffect} from "react";
import {SketchPicker} from "react-color";
import TextEditor from "./TextSetting";
import "./dragable.css";

function ColorPicker({
  color,
  setColor,
  setFontSize,
  setFontFamily,
  setTextAlign,
  textAlign,
  fontSize,
  fontFamily,
  isDragged,
}) {
  const [selectedText, setSelectedText] = useState("");
  console.log(selectedText, "selectedText");
  const handleColorChange = e => {
    setColor(e.hex);
    document.execCommand("styleWithCSS", null, true);
    document.execCommand("foreColor", false, e.hex);
    console.log(e.hex, "see", color);
  };

  const handleColorPickerMouseDown = e => {
    e.preventDefault();
  };

  useEffect(() => {
    const handleSelectionChange = () => {
      setSelectedText(window.getSelection().toString());
    };

    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, []);

  return (
    <div className="colorpicker">
      {isDragged && (
        <>
          <TextEditor
            color={color}
            setColor={setColor}
            setFontSize={setFontSize}
            setFontFamily={setFontFamily}
            setTextAlign={setTextAlign}
            textAlign={textAlign}
            fontSize={fontSize}
            fontFamily={fontFamily}
          />
          <SketchPicker
            color={color}
            onChange={handleColorChange}
            width="330px"
            className="main-picker"
          />
        </>
      )}
    </div>
  );
}
export default ColorPicker;
