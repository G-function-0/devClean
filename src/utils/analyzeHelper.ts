import { projectAnalyzer } from "../core/analyzer.js";
import { scanDirectory } from "../core/scanner.js";
import { printReport } from "./reporter.js";
import type { AnalyzedProject } from "./type.js";


export const analyzeHelper = async(baseUrl : string ) : Promise<AnalyzedProject[]> => {
    console.log("AI is Scanning...    ",baseUrl);
        const projects = await scanDirectory(baseUrl);
        
        console.log(`Found ${projects.length} projects: \n`);
    
        console.log("AI is Analyzing Your Projects...");
    
        const analyzedProjects = await projectAnalyzer(projects);
    
        return analyzedProjects;
}