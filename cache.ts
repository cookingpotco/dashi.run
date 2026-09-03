import { type CacheConfig, CacheStrategy } from "dashi";

export const pageCache: CacheConfig = {
  strategy: CacheStrategy.Public,
  maxAge: 300,
  sMaxAge: 31536000,
};
