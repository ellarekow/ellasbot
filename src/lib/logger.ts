import { createLogger, shimLog } from "@lvksh/logger";
import chalk from "chalk";

export const log = createLogger(
    {
        info: chalk.cyan`info`,
        error: chalk.red.inverse` ERROR `,
        debug: chalk.magenta`debug`,
    },
    {
        divider: chalk.gray` | `,
    }
);

shimLog(log, "debug");
