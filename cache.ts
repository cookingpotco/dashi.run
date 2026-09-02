import { type CacheConfig, CacheStrategy } from "dashi";

export const pageCache: CacheConfig = {
  strategy: CacheStrategy.Public,
  maxAge: 0,
  sMaxAge: 31536000,
  varyHeaders: ["X-Fragment"],
};
