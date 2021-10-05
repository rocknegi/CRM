import axios from "axios";

export const getList = async () => {
  try {
    const res = await axios.get("/api/lists");
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateList = async (id, name) => {
  try {
    const res = await axios.put(`/api/lists/${id}`, {
      name,
    });
    // console.log(res);
  } catch (error) {
    console.log(error);
  }
};
