import axios from "axios";
import React, { useEffect, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getCardsData } from "../utils/cardApi";

import Quill from "./Quill";

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
  };

  const addCard = async () => {
    const res = await axios.post("/api/cards", {
      listUuid,
      description: "abc",
    });
    // console.log(res);
    if (res) getCardData();
  };

  const getCardData = async () => {
    const data = await getCardsData(id);
    console.log(data);
    updateCardData(data);
  };

  useEffect(() => {
    getCardData();
  }, []);
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          // style={{ backgroundColor: snapshot.isDraggingOver ? "blue" : "grey" }}
          {...provided.droppableProps}
        >
          <div className="cards">
            {cardData.map((item, index) => (
              <Draggable draggableId={item.id.toString()} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <div className="card">
                      {!edit ? (
                        <Quill
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

              // <div className="card">
              //   <div className="cardTitle">
              //     <h1>{item.title}</h1>
              //     <i class="fas fa-ellipsis-h"></i>
              //   </div>
              //   <div>{item.description}</div>
              //   )}
              // </div>
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
