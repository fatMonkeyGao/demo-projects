#!/usr/bin/env node

import chalk from "chalk";
import { Command } from "commander";
import ora from "ora";
import { formatDate } from "../../../packages/shared/src";

const program = new Command();

program.name("demo-cli").description("Demo Projects CLI 工具").version("1.0.0");

program
  .command("info")
  .description("显示项目信息")
  .action(async () => {
    const spinner = ora("获取项目信息...").start();

    await new Promise((resolve) => setTimeout(resolve, 1000));

    spinner.succeed("项目信息获取完成");

    console.log(chalk.blue("\n📦 项目信息:"));
    console.log(chalk.gray("名称:") + " Demo Projects");
    console.log(chalk.gray("版本:") + " 1.0.0");
    console.log(chalk.gray("时间:") + " " + formatDate(new Date()));
    console.log(chalk.gray("技术栈:") + " Vue3 + TypeScript + Tailwind CSS");
  });

program
  .command("dev")
  .description("启动开发环境")
  .option("-p, --port <port>", "指定端口", "3000")
  .action(async (options) => {
    const spinner = ora("启动开发环境...").start();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    spinner.succeed("开发环境启动完成");

    console.log(
      chalk.green(`\n🚀 开发服务器运行在 http://localhost:${options.port}`)
    );
    console.log(chalk.yellow("按 Ctrl+C 停止服务器"));
  });

program
  .command("build")
  .description("构建项目")
  .option("--prod", "生产环境构建")
  .action(async (options) => {
    const spinner = ora("构建项目中...").start();

    await new Promise((resolve) => setTimeout(resolve, 3000));

    spinner.succeed("构建完成");

    const env = options.prod ? "生产环境" : "开发环境";
    console.log(chalk.green(`\n✅ ${env}构建完成`));
    console.log(chalk.gray("输出目录: dist/"));
  });

program
  .command("test")
  .description("运行测试")
  .action(async () => {
    const spinner = ora("运行测试...").start();

    await new Promise((resolve) => setTimeout(resolve, 1500));

    spinner.succeed("测试完成");

    console.log(chalk.green("\n✅ 所有测试通过"));
    console.log(chalk.gray("测试覆盖率: 85%"));
  });

program.parse();
