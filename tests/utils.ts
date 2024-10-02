import { Page } from "@playwright/test";
import { loadEnv } from "vite";

const env = loadEnv("development", process.cwd());
const baseHostUrl = `${env.VITE_LOCALHOST}:${env.VITE_PORT}/`;

export const urlUtils = (page: Page) => {
  return {
    visitSite: async () => await page.goto("/"),
    visitUrl: async (url: string) => await page.goto(`${baseHostUrl}${url}`),
    getBaseUrlWithPath: (path: string) => `${baseHostUrl}${path}`,
  };
};
