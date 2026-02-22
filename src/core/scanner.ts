import * as fs from "fs/promises";
import * as path from "path";


interface ProjectInfo  {
    name :  string
    path : string
}


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
    
                const packageJsonPath = path.join(fullPath,"package.json");  // <---- for checking package.json is present or not 
    
                if(await exists(packageJsonPath)) {
                    results.push({
                        name : entry.name,
                        path : fullPath
                    })
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


