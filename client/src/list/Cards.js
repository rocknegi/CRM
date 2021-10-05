import axios from "axios";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import { getCardsData } from "../utils/cardApi";
import RenderQuill from "./Quill";

const Cards = ({ data, edit, listUuid, id }) => {
  const [cardData, updateCardData] = useState([]);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [
        "bold",
        "italic",
        "underline",
        //   "strike",
        //   "blockquote"
      ],
      [
        { list: "ordered" },
        { list: "bullet" },
        //     { indent: "-1" },
        //     { indent: "+1" },
      ],
      [
        //   "link",
        "image",
      ],
      //   ["clean"],
    ],
    imageResize: {
      // parchment: Quill.import('parchment'),
      modules: ["Resize", "DisplaySize", "Toolbar"],
    },
  };

  const addCard = async () => {
    try {
      const res = await axios.post("/api/cards", {
        listUuid,
        description: "abc",
      });
      // console.log(res);
      if (res) getCardData();
    } catch (error) {
      console.log(error);
    }
  };

  const getCardData = async () => {
    const data = await getCardsData(id);
    // console.log(data);
    updateCardData(data);
  };

  useEffect(() => {
    getCardData();
  }, []);
  return (
    <Droppable droppableId={id.toString()}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <div className="cards">
            {cardData.map((item, index) => (
              <Draggable
                isDragDisabled={!edit}
                draggableId={item.id.toString()}
                index={index}
                key={item.id}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="card">
                      {!edit ? (
                        <RenderQuill
                          modules={modules}
                          theme="snow"
                          className="quillCard"
                          data={item}
                          type="card"
                          getCardData={getCardData}
                        />
                      ) : (
                        <div
                          className="quillCard"
                          style={{ padding: "15px" }}
                          dangerouslySetInnerHTML={{ __html: item.description }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {!edit && (
              <div onClick={addCard} className="addCard">
                + add Card
              </div>
            )}
          </div>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Cards;
