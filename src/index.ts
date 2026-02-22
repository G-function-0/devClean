import * as os from "os";
import { scanDirectory } from "./core/scanner.js"

async function main(){
    const baseUrl = os.homedir();


    console.log("AI is Scanning...    ",baseUrl);
    const projects = await scanDirectory(baseUrl);
    
    console.log(`Found ${projects.length} projects: \n`);

    for(const project of projects){
        console.log(project.path);
    }
}

main();

