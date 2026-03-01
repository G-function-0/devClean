import type { AnalyzedProject } from "../utils/type.js";
import * as fs from "fs/promises";

export const cleanProjects = async(selectedProjects : AnalyzedProject[])=>{
    let freedSpace = 0;
    for (const project of selectedProjects) {
        try {
            if (!project.nodeModulesPath.endsWith("node_modules")) {
                throw new Error("Unsafe path detected")
            }

            await fs.rm(project.nodeModulesPath, {
            recursive: true,
            force: true
            })
            freedSpace += project.sizeInMB;
            console.log(`✔ Cleaned ${project.name}`)
        } catch (err) {
            console.error(`✖ Failed to delete ${project.name}`)
        }
    }
    console.log(`${freedSpace} MB is now Free.`);
}