import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-h",
});

async function rax(_ctx: Context): Promise<number> {
  console.log("running function rax");
  return 1;
}

resonate.register("rax", rax);

console.log("app node group service-h | running");
