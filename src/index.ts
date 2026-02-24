import * as os from "os";
import { scanDirectory } from "./core/scanner.js"
import { projectAnalyzer } from "./core/analyzer.js";
import { printReport } from "./utils/reporter.js";

async function main(){
    const baseUrl = os.homedir();


    console.log("AI is Scanning...    ",baseUrl);
    const projects = await scanDirectory(baseUrl);
    
    console.log(`Found ${projects.length} projects: \n`);

    console.log("AI is Analyzing Your Projects...");


    const analyzedProjects = await projectAnalyzer(projects);

    printReport(analyzedProjects);
    
}

main();

