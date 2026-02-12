import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-d",
});

function* qux(ctx: Context, arg: number): Generator<any, void, any> {
  console.log("running function qux");
  yield* ctx.detached(
    "quz",
    arg + 1,
    ctx.options({ target: "poll://any@service-e" }),
  );
}

resonate.register("qux", qux);

console.log("app node group service-d | running");
