import React, {useState, useRef, useEffect} from "react";

function TextEditor({
  setFontSize,
  setFontFamily,
  setTextAlign,
  textAlign,
  fontSize,
  fontFamily,
}) {
  const textRef = useRef(null);
  useEffect(() => {}, []);

  const handleFontSizeChange = event => {
    setFontSize(event.target.value);
  };

  const handleTextAlignChange = event => {
    setTextAlign(event.target.value);
  };

  const handleFontFamilyChange = event => {
    setFontFamily(event.target.value);
  };

  return (
    <div className="text_setting">
      <div className="board">
        <select id="font-size" value={fontSize} onChange={handleFontSizeChange}>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
        </select>
        <select
          id="text-align"
          value={textAlign}
          onChange={handleTextAlignChange}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
        <select
          id="font-family"
          value={fontFamily}
          onChange={handleFontFamilyChange}
        >
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>
    </div>
  );
}
export default TextEditor;
