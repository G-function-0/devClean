import * as fs from "fs/promises"
import path from "path"

const getFolderSize = async( nodeModulesPath  :string) : Promise<number> => {
    let total = 0

    const entries = await fs.readdir(nodeModulesPath, {withFileTypes : true})

    for(const entry of entries){
        const fullPath = path.join(nodeModulesPath,entry.name);

        if(entry.isDirectory()){
            total +=await getFolderSize(fullPath)
        }
        else{
            const stats = await fs.stat(fullPath);
            total += stats.size;
        }
    }

    return total;
}

export { getFolderSize };