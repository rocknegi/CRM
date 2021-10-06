import axios from "axios";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { getList } from "../utils/listApi";
import { getCardsData, reorderCards } from "../utils/cardApi";
import Cards from "./Cards";
import Quill from "./Quill";

const List = () => {
  const [edit, toggleEditButton] = useState(true);
  const [listData, updateListData] = useState([]);
  const [reorderData, setReorderData] = useState({
    source: null,
    destination: null,
  });
  // const [cardData, updateCardData] = useState([]);

  const toggleButton = () => {
    toggleEditButton(!edit);
  };

  const getListData = async () => {
    const data = await getList();
    updateListData(data);
  };

  // const getCardData = async (id) => {
  //   const data = await getCardsData(id);
  //   console.log(data);
  //   updateCardData(data);
  // };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
    ],
  };

  const addList = async () => {
    const res = await axios.post("/api/lists", {
      name: "test",
    });
    if (res) getListData();
  };

  // const addCard = async (listUuid) => {
  //   const res = await axios.post("/api/cards", {
  //     listUuid,
  //     description: "abc",
  //   });
  //   // if (res) getCardData(res.data.listId);
  // };

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
    setReorderData({
      source,
      destination,
    });
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="lists">
      <div className="listsArea">
        {/* <DragDropContext onDragEnd={onDragEnd}> */}
        <div className="listAreaElements">
          <div className="list">
            {listData.map((item) => (
              <div key={item.id}>
                <div key={item.id} className="listItem">
                  <>
                    <i style={{ marginRight: 10 }} className="fas fa-inbox"></i>
                    {!edit ? (
                      <Quill
                        modules={modules}
                        theme="bubble"
                        className="quillList"
                        data={item}
                        type="list"
                        getListData={getListData}
                      />
                    ) : (
                      <div
                        // className="cardQuill"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                    )}
                  </>
                  <i className="fas fa-long-arrow-alt-left"></i>
                </div>
                <Cards
                  // cardData={cardData}
                  // getCardData={getCardData}
                  // addCard={addCard}
                  listUuid={item.uuid}
                  id={item.id}
                  edit={edit}
                  // source={reorderData.source}
                  // destination={reorderData.destination}
                />
              </div>
            ))}
          </div>
          {!edit && (
            <div onClick={addList} className="addList">
              + add list
            </div>
          )}
        </div>
        {/* </DragDropContext> */}
      </div>
      <div className="buttonArea">
        {edit ? (
          <button onClick={toggleButton}>Edit</button>
        ) : (
          <button onClick={toggleButton}>Done</button>
        )}
      </div>
    </div>
  );
};

export default List;
