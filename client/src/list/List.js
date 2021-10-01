import React, { useState } from "react";
import Cards from "./Cards";

const List = () => {
  const [edit, toggleEditButton] = useState(false);
  const toggleButton = () => {
    toggleEditButton(!edit);
  };
  const listData = [
    {
      id: 1,
      title: "Vitals",
      cards: [
        {
          title: "1Overview",
          description:
            "sjkagdkjb hdsvjdhvsh hdvshjvd shjvdshjv dsh s shjdv shjdv shj s sh shjdv shjdgvshj dashj shj djhs sjk khjs b hjksbjk gkfjasdgfkjas jkas jkfgsdkjfas asjkf kf gsajkf gskjf skj askj gasjkfg askfg skjfg sakjgf ks fkjsgfkjasgfkjsgfjksgfksjagf ksj kjasgks askj askjfg askfg skjfsakugfaskfgaskgfskfg skaj jahsjdhjh ajj  jh kjhkj end",
        },
        {
          title: "1Overview2",
          description:
            "sjkagdkjb ajkhsedjkashjdkh  jahsjdhjh ajj  jh kjhkj end",
        },
      ],
    },
    {
      id: 2,
      title: "What You Need To Know",
      cards: [
        {
          title: "2Overview",
          description: "sjkagdkjb ajkhsedjkashjdkh  jahsjdhjh ajj  jh kjhkj",
        },
        {
          title: "2Overview2",
          description: "sjkagdkjb ajkhsedjkashjdkh  jahsjdhjh ajj  jh kjhkj",
        },
      ],
    },
    {
      id: 3,
      title: "TEST",
      cards: [
        {
          title: "3Overview",
          description: "sjkagdkjb ajkhsedjkashjdkh  jahsjdhjh ajj  jh kjhkj",
        },
        {
          title: "3Overview2",
          description: "sjkagdkjb ajkhsedjkashjdkh  jahsjdhjh ajj  jh kjhkj",
        },
      ],
    },
  ];

  return (
    <div className="lists">
      <div className="listsArea">
        <div className="listAreaElements">
          <div className="list">
            {listData.map((item) => (
              <div key={item.id}>
                <div className="listItem">
                  <div>
                    <i style={{ marginRight: 10 }} class="fas fa-inbox"></i>
                    {item.title}
                  </div>
                  <i class="fas fa-long-arrow-alt-left"></i>
                </div>
                <Cards edit={edit} data={item.cards} />
              </div>
            ))}
          </div>
          {!edit && <div className="addList">+ add list</div>}
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
