import axios from "axios";
import React, { useEffect, useState } from "react";
// import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

import { getList } from "../utils/listApi";
// import { getCardsData, reorderCards } from "../utils/cardApi";
import Cards from "./Cards";
import RenderQuill from "./Quill";

const List = () => {
  const [edit, toggleEditButton] = useState(true);
  const [listData, updateListData] = useState([]);
  const [reorderData, setReorderData] = useState({
    source: null,
    destination: null,
  });

  const toggleButton = () => {
    toggleEditButton(!edit);
  };

  const getListData = async () => {
    const data = await getList();
    updateListData(data);
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
    ],
  };

  const addList = async () => {
    try {
      const res = await axios.post("/api/lists", {
        name: "test",
      });
      if (res) getListData();
    } catch (error) {
      console.log(error);
    }
  };

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
                      <RenderQuill
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
                <Cards listUuid={item.uuid} id={item.id} edit={edit} />
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
