import type { Seo } from "./seo.ts";

export interface AppState extends Record<string, unknown> {
  seo: Seo;
}
