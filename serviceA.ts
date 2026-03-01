import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-a",
});

function* foo(ctx: Context): Generator<any, number, any> {
  console.log("running function foo");
  let result = yield* ctx.rpc<number>(
    "bar",
    ctx.options({ target: "poll://any@service-b" }),
  );
  const anotherResult = yield* ctx.rpc<number>(
    "zim",
    ctx.options({ target: "poll://any@service-g" }),
  );
  result = result + anotherResult;
  return result + 1;
}

resonate.register("foo", foo);

console.log("app node group service-a | running");
