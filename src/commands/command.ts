
import os from "os";
import { Command } from "commander";
import { analyzeHelper } from "../utils/analyzeHelper.js";
import { cleanerHelper } from "../utils/cleanerHelper.js";
import type { AnalyzedProject } from "../utils/type.js";
import { printReport } from "../utils/reporter.js";
const program = new Command();

program
.name("gwipe")
.description("Analyze projects and clean unused node_modules using AI")
.version("1.0.0")

program
.command("analyze")
.description("Scan and analyze projects")
.option("--deep","Deep scan entire home directory")
.option("-d, --dir <path>","Directory to Scan", process.cwd())
.action(async (options) => {
    const baseUrl = options.deep ? os.homedir() : options.dir;
    const projects = await analyzeHelper(baseUrl);
    
    printReport(projects);
})

//clean command 
program
.command("clean")
.description("Analyze and clean all your projects")
.option("--deep", "Deep scan entire home directory")
.option("-d, --dir <path>", "Directory to Scan", process.cwd())
.option("-o, --older-than <age>", "Clean projects older than X days", "30")
.action(async(options) => {
    const olderThan = Number(options.olderThan);
    const baseUrl = options.deep ? os.homedir() : options.dir;
    const projects = await analyzeHelper(baseUrl);
    if(projects.length === 0){
        console.log("Their are no projects that need Cleaning");
        return;
    }

    await cleanerHelper(projects,olderThan);
})
export { program };