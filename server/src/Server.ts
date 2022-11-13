import Fastify from "fastify";
import cors from "@fastify/cors";

import { FastifyInstance } from "fastify";

import { homeRoutes } from "./routes";

export default class Server {
  private static _instance: Server | null;

  declare server: FastifyInstance;

  private constructor() {
    this.server = Fastify({
      logger: true,
    });

    this.middlewares();

    this.routes();
  }

  private async middlewares() {
    await this.server.register(cors, {
      origin: true,
    });
  }

  private routes() {
    this.server.register(homeRoutes, { prefix: "/" });
  }

  static get Instance(): Server {
    return this._instance || (this._instance = new this());
  }
}