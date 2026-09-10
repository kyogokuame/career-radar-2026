import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the career radar dashboard", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Career Radar \| 2026 Job Dashboard<\/title>/i);
  assert.match(html, /职位雷达/);
  assert.match(html, /职位进度/);
  for (const stage of ["待研究", "待投递", "待面谈", "一面", "二面", "三面", "HR面", "终面", "谈薪", "决定不投递", "面试不通过"]) {
    assert.match(html, new RegExp(stage));
  }
});

test("keeps the career stages and terminal styling explicit", async () => {
  const [css, page] = await Promise.all([
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(page, /type Status = "待研究".*"面试不通过"/);
  assert.match(page, /const terminalStatuses: Status\[\] = \["决定不投递","面试不通过"\]/);
  assert.match(page, /isTerminal\(role\)/);
  assert.match(page, /terminal-card/);
  assert.match(page, /stage-strip/);
  assert.match(css, /\.terminal-card\{/);
  assert.match(css, /\.stage-strip\{/);
});
