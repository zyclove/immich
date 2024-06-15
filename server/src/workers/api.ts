import { CorsOptionsCallback, CustomOrigin } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import cookieParser from 'cookie-parser';
import { NextFunction, Request, Response } from 'express';
import { existsSync } from 'node:fs';
import sirv from 'sirv';
import { ApiModule } from 'src/app.module';
import { WEB_ROOT, envName, excludePaths, isDev, serverVersion } from 'src/constants';
import { ILoggerRepository } from 'src/interfaces/logger.interface';
import { WebSocketAdapter } from 'src/middleware/websocket.adapter';
import { ApiService } from 'src/services/api.service';
import { otelStart } from 'src/utils/instrumentation';
import { useSwagger } from 'src/utils/misc';

const host = process.env.HOST;

async function bootstrap() {
  process.title = 'immich-api';
  const otelPort = Number.parseInt(process.env.IMMICH_API_METRICS_PORT ?? '8081');

  otelStart(otelPort);

  const port = Number(process.env.IMMICH_PORT) || 3001;
  const app = await NestFactory.create<NestExpressApplication>(ApiModule, { bufferLogs: true });
  // app.use((req: Request, res: Response, next: NextFunction) => {
  //   console.log(req.url);
  //   console.log(req.get('origin'));
  //   console.log(req.get('host'));
  //   debugger;
  //   next();
  // });
  const logger = await app.resolve<ILoggerRepository>(ILoggerRepository);
  //i
  logger.setAppName('Api');
  logger.setContext('Bootstrap');
  app.useLogger(logger);
  app.set('trust proxy', ['loopback', 'linklocal', 'uniquelocal']);
  app.set('etag', 'strong');
  app.use(cookieParser());
  app.use(json({ limit: '10mb' }));
  debugger; // oddkjkjjh
  const origins: CustomOrigin = (_, cb) => {
    console.log('hi');
    debugger;
    cb(null, [
      'http://192.168.4.248:2283',
      'http://docker-dev:2283',
      'https://docker-dev:5002',
      'https://192.168.4.248:5001',
    ]);
  };

  if (isDev()) {
    debugger;
    app.enableCors((req, cb) => {
      if (req.get('origin')) {
        cb(null, {
          credentials: true,
          origin: origins,
          methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
          allowedHeaders: ['content-type', '*'],
        });
      } else {
        cb(null, { origin: false });
      }
    });
  }
  app.useWebSocketAdapter(new WebSocketAdapter(app));
  useSwagger(app);

  app.setGlobalPrefix('api', { exclude: excludePaths });
  if (existsSync(WEB_ROOT)) {
    // copied from https://github.com/sveltejs/kit/blob/679b5989fe62e3964b9a73b712d7b41831aa1f07/packages/adapter-node/src/handler.js#L46
    // provides serving of precompressed assets and caching of immutable assets
    app.use(
      sirv(WEB_ROOT, {
        etag: true,
        gzip: true,
        brotli: true,
        extensions: [],
        setHeaders: (res, pathname) => {
          if (pathname.startsWith(`/_app/immutable`) && res.statusCode === 200) {
            res.setHeader('cache-control', 'public,max-age=31536000,immutable');
          }
        },
      }),
    );
  }
  app.use(app.get(ApiService).ssr(excludePaths));

  const server = await (host ? app.listen(port, host) : app.listen(port));
  server.requestTimeout = 30 * 60 * 1000;

  logger.log(`Immich Server is listening on ${await app.getUrl()} [v${serverVersion}] [${envName}] `);
}

bootstrap().catch((error) => {
  console.error(error);
  throw error;
});
