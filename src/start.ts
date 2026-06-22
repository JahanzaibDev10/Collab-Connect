import { createStart, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";

if (typeof window !== "undefined") {
  const ogLog = console.log;
  console.log = (...args) => {
    if (typeof args[0] === 'string' && args[0].toLowerCase().includes('lovable')) return;
    ogLog(...args);
  };
  const ogInfo = console.info;
  console.info = (...args) => {
    if (typeof args[0] === 'string' && args[0].toLowerCase().includes('lovable')) return;
    ogInfo(...args);
  };
}

const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware],
}));
