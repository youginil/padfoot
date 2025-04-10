import { app } from "electron";
import { transports, createLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

const fmt = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    format.align(),
    format.printf((i) => `${[i.timestamp]} ${i.level} ${i.message}`),
);

const transport = app.isPackaged
    ? new DailyRotateFile({
          dirname: app.getPath("logs"),
          filename: "%DATE%.log",
      })
    : new transports.Console({
          format: format.colorize({ all: true }),
      });

const logger = createLogger({
    format: fmt,
    level: app.isPackaged ? "info" : "debug",
    transports: [transport],
});

export default logger;
