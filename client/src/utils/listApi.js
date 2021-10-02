import axios from "axios";

export const getList = async () => {
  const listData = [
    {
      id: 1,
      name: "<h1>Rohit</h1>",
    },
    {
      id: 2,
      name: "<h2>Rohit singh negi</h1>",
    },
    {
      id: 3,
      name: "<h4>WHAT YOU NEED TO KNOW</h1>",
    },
  ];

  try {
    const res = await axios.get("/api/lists");
    // console.log(res.data);
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
    console.log(res);
  } catch (error) {}
};
