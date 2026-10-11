import { getStatus } from "./rotas/status";

let USERS = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
];

const server = Bun.serve({
  port: 4343,
  routes: {
    "/api/status": {
      GET: getStatus,
    },
    "/api/users": {
      GET: async () => {
        return new Response(JSON.stringify(USERS), {
          headers: {
            "Content-Type": "application/json",
          },
        });
      },
      DELETE: async (request) => {
        const url = new URL(request.url);
        const idParam = url.searchParams.get("id")!;
        const id = parseInt(idParam);
        const deletedUser = USERS.filter((u) => u.id === id);

        if (deletedUser.length === 0) {
          return new Response(JSON.stringify({ error: "User not found" }), {
            status: 404,
            headers: {
              "Content-Type": "application/json",
            },
          });
        }

        USERS = USERS.filter((u) => u.id !== id);

        return new Response(
          JSON.stringify({ message: "User deleted", user: deletedUser[0] }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
      },
    },
  },
});

console.log(`Server running at http://localhost:${server.port}`);
