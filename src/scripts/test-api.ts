import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4343",
  headers: {
    "Content-Type": "application/json",
  },
});

// const deleteUser = async (id: number) => {
//   try {
//     const response = await api.delete(`/api/users?id=${id}`);

//     console.log("Delete Response:", response.data);
//   } catch (error) {
//     console.log("Error deleting user:", error);
//   }
// };

// await deleteUser(3); // Example: Delete user with ID 3

const getUsers = async () => {
  try {
    const response = await api.get("/api/users");
    console.log("Users:", response.data);
  } catch (error) {
    console.log("Error fetching users:", error);
  }
};

await getUsers();
