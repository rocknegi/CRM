import axios from "axios";

export const getCardsData = async (id) => {
  try {
    const res = await axios.get(`/api/cards/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCard = async (id, description) => {
  try {
    const res = await axios.put(`/api/cards/${id}`, {
      description,
    });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const reorderCards = async (
  // source, destination, listId,
  cardData
) => {
  try {
    const res = await axios.put("/api/cards/", {
      // source,
      // destination,
      // listId,
      cardData,
    });
    // console.log(res, source, destination);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
