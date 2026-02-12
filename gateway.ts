import express from "express";
import { Resonate } from "@resonatehq/sdk";

const app = express();
app.use(express.json());

const resonate = new Resonate({
  url: "http://localhost:8001",
  group: "gateway",
});

app.post("/await-chain", async (_req, res) => {
  try {
    console.log("running await_chain_route_handler");
    const promiseId = "await-chain";
    const result = await resonate.rpc(
      promiseId,
      "foo",
      resonate.options({ target: "poll://any@service-a" }),
    );
    console.log("waiting on result");
    res.status(200).json({ message: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.post("/detached-chain", async (_req, res) => {
  try {
    console.log("running detached_chain_route_handler");
    const promiseId = "detached-chain";
    await resonate.beginRpc(
      promiseId,
      "qux",
      1,
      resonate.options({ target: "poll://any@service-d" }),
    );
    res.status(200).json({ message: "detached-chain started" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.post("/fan-out-workflow", async (_req, res) => {
  try {
    console.log("running fan_out_workflow_route_handler");
    const promiseId = "fan-out-workflow";
    const result = await resonate.rpc(
      promiseId,
      "zim",
      1,
      resonate.options({ target: "poll://any@service-g" }),
    );
    console.log("waiting on result");
    res.status(200).json({ message: result });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: String(e) });
  }
});

app.listen(5000, () => {
  console.log(
    "app node id gateway | app node group gateway | http capable | running on port 5000",
  );
});
