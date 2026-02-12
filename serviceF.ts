import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-f",
});

async function cog(_ctx: Context, arg: number): Promise<void> {
  console.log("running function cog");
  console.log(arg);
}

resonate.register("cog", cog);

console.log("app node group service-f | running");
