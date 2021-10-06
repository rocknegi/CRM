import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { getCardsData, reorderCards } from "../utils/cardApi";
import RenderQuill from "./Quill";

const Cards = ({ edit, listUuid, id }) => {
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
      if (res) getCardData();
    } catch (error) {
      console.log(error);
    }
  };

  const getCardData = async () => {
    const data = await getCardsData(id);
    updateCardData(data);
  };

  useEffect(() => {
    getCardData(id);
  }, []);

  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    console.log(source, destination);
    if (source === null || destination == null) return;
    try {
      let oldIndex, newIndex;
      for (let i = 0; i < cardData.length; i++) {
        if (cardData[i]["id"] === cardData[source.index].id) oldIndex = i;
        if (cardData[i]["id"] === cardData[destination.index].id) newIndex = i;
      }
      const item = cardData.splice(oldIndex, 1);
      cardData.splice(newIndex, 0, ...item);
      console.log(oldIndex, newIndex, cardData);

      reorderCards(cardData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={id.toString()}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="cards">
              {cardData.map((item, index) => (
                <Draggable
                  isDragDisabled={!edit}
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
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
                            dangerouslySetInnerHTML={{
                              __html: item.description,
                            }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {!edit && (
                <div onClick={() => addCard(listUuid)} className="addCard">
                  + add Card
                </div>
              )}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Cards;
