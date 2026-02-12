import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-e",
});

function* quz(ctx: Context, arg: number): Generator<any, number, any> {
  console.log("running function quz");
  yield* ctx.detached(
    "cog",
    arg + 1,
    ctx.options({ target: "poll://any@service-f" }),
  );
  return arg + 1;
}

resonate.register("quz", quz);

console.log("app node group service-e | running");
