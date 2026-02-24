import * as path from "path";
import * as fs from "fs/promises"
import type { AnalyzedProject, ProjectInfo } from "../utils/type.js";
import { getFolderSize } from "../utils/size.js";
import { getAgeInDays } from "../utils/getProjectAge.js";


const projectAnalyzer = async (projects : ProjectInfo[]) : Promise<AnalyzedProject[]> => {
    const result : AnalyzedProject[] = [];

    for(const project of projects){
        const nodeModulesPath = path.join(project.path,"node_modules");
        const folderSizeBytes = await getFolderSize(nodeModulesPath);
    
        const sizeInMB = Number((folderSizeBytes / (1024 *1024)).toFixed(2));
        
        const stats = await fs.stat(nodeModulesPath);
        const age = getAgeInDays(stats.mtime)
            result.push({
            name : project.name,
            path : project.path,
            nodeModulesPath,
            sizeInMB,
            lastModified : age
        })

    }

    return result;


}

export { projectAnalyzer }