declare module "koa-bodyparser" {
  import { Middleware, Context } from "koa";

  interface Options {
    enableTypes?: string[];
    encode?: string;
    formLimit?: string | number;
    jsonLimit?: string | number;
    textLimit?: string | number;
    xmlLimit?: string | number;
    strict?: boolean;
    detectJSON?: (ctx: Context) => boolean;
    extendTypes?: {
      json?: string[];
      form?: string[];
      text?: string[];
      xml?: string[];
    };
    onerror?: (err: Error, ctx: Context) => void;
  }

  function bodyParser(opts?: Options): Middleware;
  export = bodyParser;
}
