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
  } catch (error) {
    console.log(error);
  }
};

export const reorderCards = async (cardData) => {
  try {
    const res = await axios.put("/api/cards/", {
      cardData,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
