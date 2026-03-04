import { Logger } from "jsr:@deno-library/logger";

// TODO: Implementar el LoggerAdapter
// También podría ser una clase abstracta
interface ILoggerAdapter {
  file: string;

  writeLog(msg: string): void;
  writeWarning(msg: string): void;
  writeError(msg: string): void;
}

export class DenoLoggerAdapter implements ILoggerAdapter {
  public file: string;

  private logger = new Logger();

  constructor(file: string) {
    this.file = file;
  }

  writeLog(msg: string): void {
    this.logger.info(`[${this.file} Log] ${msg}`);
  }
  writeWarning(msg: string): void {
    this.logger.warn(`[${this.file} Warning] ${msg}`);
  }
  writeError(msg: string): void {
    this.logger.error(`[${this.file} Log] ${msg}`);
  }
}

/*const logger = new Logger();

logger.info("");
logger.warn("");
logger.error("");
*/
