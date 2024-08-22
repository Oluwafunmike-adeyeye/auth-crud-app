import { createServer, Model, Response } from "miragejs";

export function makeServer() {
  createServer({
    models: {
      user: Model,
      item: Model,
    },

    seeds(server) {
      // Creating users
      server.create("user", { email: "oluwafunmike@gmail.com", password: "Funmike1" });
      server.create("user", { email: "user1@gmail.com", password: "user1" });
      server.create("user", { email: "user2@gmail.com", password: "user2" });

      // Creating items and their descriptions
      server.create("item", { id: "1", name: "Smartphone X Pro", description: "The latest smartphone with advanced features including a high-resolution display and powerful processor." });
      server.create("item", { id: "2", name: "Wireless Headphones", description: "High-quality wireless headphones with noise cancellation and long battery life." });
      server.create("item", { id: "3", name: "4K Ultra HD TV", description: "Ultra HD television with stunning picture quality and smart features." });
      server.create("item", { id: "4", name: "Smartwatch 4", description: "Feature-packed smartwatch with fitness tracking and customizable watch faces." });
      server.create("item", { id: "5", name: "Laptop Pro 16", description: "High-performance laptop with a sleek design, ideal for professional and creative work." });
      server.create("item", { id: "6", name: "Bluetooth Speaker", description: "Portable Bluetooth speaker with excellent sound quality and water resistance." });
      server.create("item", { id: "7", name: "Digital Camera Z7", description: "Advanced digital camera with high-resolution imaging and versatile shooting modes." });
      server.create("item", { id: "8", name: "Gaming Console X", description: "Next-gen gaming console with a large library of games and enhanced graphics." });
      server.create("item", { id: "9", name: "Smart Home Hub", description: "Central hub for managing smart home devices with voice control and automation features." });
      server.create("item", { id: "10", name: "Electric Scooter", description: "Eco-friendly electric scooter with a long range and fast charging capabilities." });
    },

    routes() {
      this.namespace = "/api";

      // Route to get all items
      this.get("/items", (schema) => {
        return schema.items.all();
      });

      // Route to get a single item by ID
      this.get("/items/:id", (schema, request) => {
        let id = request.params.id;
        let item = schema.items.find(id);

        if (item) {
          return item;
        } else {
          return new Response(404, {}, { error: "Item not found" });
        }
      });

      // Route to create a new item
      this.post("/items", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.items.create(attrs);
      });

      // Route to update an item
      this.put("/items/:id", (schema, request) => {
        let id = request.params.id;
        let attrs = JSON.parse(request.requestBody);
        let item = schema.items.find(id);

        if (item) {
          return item.update(attrs);
        } else {
          return new Response(404, {}, { error: "Item not found" });
        }
      });

      // Route to delete an item
      this.delete("/items/:id", (schema, request) => {
        let id = request.params.id;
        let item = schema.items.find(id);

        if (item) {
          return item.destroy();
        } else {
          return new Response(404, {}, { error: "Item not found" });
        }
      });

      // Route to login a user
      this.post("/login", (schema, request) => {
        let { email, password } = JSON.parse(request.requestBody);
        let user = schema.users.findBy({ email, password });

        if (user) {
          return { token: "mock-token" };
        } else {
          return new Response(401, {}, { error: "Invalid credentials" });
        }
      });
    },
  });
}
