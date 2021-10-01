import React from "react";

const Cards = ({ data, edit }) => {
  return (
    <div className="cards">
      {data.map((item) => (
        <div className="card">
          <div className="cardTitle">
            <h1>{item.title}</h1>
            <i class="fas fa-ellipsis-h"></i>
          </div>
          <div>{item.description}</div>
        </div>
      ))}
      {!edit && <div className="addCard">+ add Card</div>}
    </div>
  );
};

export default Cards;
