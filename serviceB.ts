import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-b",
});

function* bar(ctx: Context): Generator<any, number, any> {
  console.log("running function bar");
  const result = yield* ctx.rpc<number>(
    "baz",
    ctx.options({ target: "poll://any@service-c" }),
  );
  return result + 1;
}

resonate.register("bar", bar);

console.log("app node group service-b | running");
