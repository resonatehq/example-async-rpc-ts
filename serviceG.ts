import { Resonate, type Context } from "@resonatehq/sdk";

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "service-g",
});

function* zim(ctx: Context, arg: number): Generator<any, number, any> {
  console.log("running function zim");
  const promiseH = yield* ctx.beginRpc<number>(
    "rax",
    ctx.options({ target: "poll://any@service-h" }),
  );
  const promiseI = yield* ctx.beginRpc<number>(
    "dop",
    ctx.options({ target: "poll://any@service-i" }),
  );
  const resultH = yield* promiseH;
  const resultI = yield* promiseI;
  return resultH + resultI + arg;
}

resonate.register("zim", zim);

console.log("app node group service-g | running");
