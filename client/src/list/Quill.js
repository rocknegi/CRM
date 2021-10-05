import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";
import ImageResize from "quill-image-resize-module-react";
import { updateCard } from "../utils/cardApi";
import { updateList } from "../utils/listApi";

Quill.register("modules/imageResize", ImageResize);

const RenderQuill = ({
  modules,
  theme,
  className,
  data,
  type,
  getListData,
  getCardData,
}) => {
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const [value, setValue] = useState(
    type === "list" ? data.name : data.description
  );
  useEffect(() => {
    // console.log(value);
  }, [value]);

  const saveListData = async () => {
    await updateList(data.id, value);
    getListData();
  };
  const saveCardData = async () => {
    await updateCard(data.uuid, value);
    getCardData();
  };
  return (
    <ReactQuill
      theme={theme}
      value={value}
      onChange={setValue}
      modules={modules}
      formats={formats}
      className={className}
      onBlur={type === "list" ? saveListData : saveCardData}
    />
  );
};

export default RenderQuill;
