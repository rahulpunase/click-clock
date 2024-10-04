import { Page } from "@playwright/test";
import { loadEnv } from "vite";

const env = loadEnv("test", process.cwd());
const baseHostUrl = `${env.VITE_LOCALHOST}:${env.VITE_PORT}/`;

export const seedUser = {
  email: "seed-user@imail.com",
  password: "seed-user@imail.com",
  name: "Seed Imail",
};

export const urlUtils = (page: Page) => {
  return {
    visitSite: async () => await page.goto("/"),
    visitUrl: async (url: string) => await page.goto(`${baseHostUrl}${url}`),
    getBaseUrlWithPath: (path: string) => `${baseHostUrl}${path}`,
  };
};
