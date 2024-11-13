import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Now U finally found me in this bowser congart to u <3!!").listen(8000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
