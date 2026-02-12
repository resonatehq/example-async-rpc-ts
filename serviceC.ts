import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-c",
});

async function baz(_ctx: Context): Promise<number> {
  console.log("running function baz");
  return 1;
}

resonate.register("baz", baz);

console.log("app node group service-c | running");
