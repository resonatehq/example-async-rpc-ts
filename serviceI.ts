import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-i",
});

async function dop(_ctx: Context): Promise<number> {
  console.log("running function dop");
  return 1;
}

resonate.register("dop", dop);

console.log("app node group service-i | running");
