import { Elysia ,t } from "elysia";

export const example = new Elysia()
  .get("/", () => "Now U finally found me in this bowser congart to u <3!!",{
    detail: {
        tag: ["Example"],
        summary: " Get Hello World",
        description: " Oraoraoraoroaroara"
    }
  })
  .post("/about", ({body}) => {
    return {
      id: `xxx`,
      name: `Thanawat` + body.name
    }
  },{
    body: t.Object({
      name:t.String()
    }),    
    detail: {
        tag: [`Ex`],
        summary: " About ",
        description: "Mudamdaudmaduadmaduamduauda"
    }
  })

console.log(
  `🦊 Elysia is running at ${example.server?.hostname}:${example.server?.port}`
);
