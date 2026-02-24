import * as fs from "fs/promises";
import * as path from "path";
import type { ProjectInfo } from "../utils/type.js";


const SKIP_FOLDERS = new Set([
  "node_modules",
  ".git",
  "AppData",
  "Program Files",
  "Program Files (x86)",
  "$Recycle.Bin",
]);


async function scanDirectory(basePath : string) : Promise<ProjectInfo[]> {
    const results : ProjectInfo[]  = [];
    
    async function walk( dir :  string){
        let entries;
        try {
            entries = await fs.readdir(dir, { withFileTypes : true })
        } catch (error) {
            return;
        }
        for(const entry of entries){
            const fullPath = path.join(dir,entry.name);

            if(entry.isDirectory()){
                if(entry.name === "node_modules" || entry.name.startsWith("."))  continue;
                if (SKIP_FOLDERS.has(entry.name)) continue;

                const packageJsonPath = path.join(fullPath,"package.json");  // <---- for checking package.json is present or not 

                if(await exists(packageJsonPath)) {
                    const nodeModulePath = path.join(fullPath,"node_modules");
                    const hasNodeModules = await exists(nodeModulePath);
                    if(hasNodeModules){
                        results.push({
                            name : entry.name,
                            path : fullPath
                        })
                        continue;
                    }
                }
    
                await walk(fullPath);
            }
        }
    }
    
    await walk(basePath)
    return results;
}



async function exists(filePath : string) : Promise<boolean> {
    try {
        await fs.access(filePath)
        return true
    } catch (error) {
        return false;
    }
}



export { scanDirectory }


