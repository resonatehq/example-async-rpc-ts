import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-c",
});

function* baz(ctx: Context): Generator<any, number, any> {
  console.log("running function baz");
  const result = yield* ctx.rpc("zim", ctx.options({ target: "poll://any@service-g" })); 
  return Number(result);
}

resonate.register("baz", baz);

console.log("app node group service-c | running");
