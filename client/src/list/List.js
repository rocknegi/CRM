import axios from "axios";
import React, { useEffect, useState } from "react";
import { getList } from "../utils/listApi";
import Cards from "./Cards";
import Quill from "./Quill";
const List = () => {
  const [edit, toggleEditButton] = useState(false);
  const [listData, updateListData] = useState([]);
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
    const res = await axios.post("/api/lists", {
      name: "test",
    });
    if (res) getListData();
  };

  useEffect(() => {
    getListData();
  }, []);

  return (
    <div className="lists">
      <div className="listsArea">
        <div className="listAreaElements">
          <div className="list">
            {listData.map((item) => (
              // <div key={item.id}>
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
              // {/* <Cards edit={edit} data={item.cards} /> */}
              // </div>
            ))}
          </div>
          {!edit && (
            <div onClick={addList} className="addList">
              + add list
            </div>
          )}
        </div>
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
