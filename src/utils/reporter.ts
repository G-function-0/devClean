
import chalk from "chalk"
import type { AnalyzedProject } from "./type.js"

export function printReport(projects: AnalyzedProject[]) {
  if (projects.length === 0) {
    console.log(chalk.yellow("No node_modules found."))
    return
  }
  let totalSize = 0

  for (const project of projects) {
    totalSize += project.sizeInMB

    console.log(chalk.cyan(`\nProject: ${project.name}`))
    console.log(`Path: ${project.path}`)
    console.log(chalk.green(`Size: ${project.sizeInMB} MB`))
    console.log(`Last Modified: ${project.lastModified} days ago`)
  }

  console.log(chalk.bold("\n---------------------------"))
  console.log(chalk.red(`Total Space Used: ${totalSize.toFixed(2)} MB`))
}