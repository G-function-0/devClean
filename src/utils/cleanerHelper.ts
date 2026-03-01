import { checkbox, confirm, select } from "@inquirer/prompts";
import { filterProjectsByAge } from "./projectsFilter.js";
import { printReport } from "./reporter.js";
import type { AnalyzedProject } from "./type.js";
import { cleanProjects } from "../core/cleaner.js";
import { scanDirectory } from "../core/scanner.js";


export const cleanerHelper = async(projects : AnalyzedProject[] ,olderThan : number) => {
    
    // TODO project filter is not working properly
    //TODO edge case project might be empty array think about this 
    const projectsFilteredByAge = filterProjectsByAge(projects,olderThan);
    //Edge case  : NO Project to clean older than X
    if(projectsFilteredByAge.length === 0){
        console.log(`Their is no Garbage in projects older than ${olderThan}`);
        return;
    } 

    printReport(projectsFilteredByAge);

    //inquire confirmatrion before deletion 
    const action : string = await select<string>({
        message: "How would you like to proceed?",
        choices: [
            {
            name: "Delete all listed projects",
            value: "all"
            },
            {
            name: "Select specific projects to delete",
            value: "select"
            },
            {
            name: "Cancel",
            value: "cancel"
            }
        ]
    })

    if (action === "cancel") {
        console.log("Operation cancelled.")
        return
    }

    let selectedProjects : AnalyzedProject[] = []

    if (action === "all") {
        selectedProjects = projectsFilteredByAge
    }

    if (action === "select") {
        selectedProjects = await checkbox({
            message: "Select projects to delete",
            required: true,
            pageSize: 10,
            choices: projectsFilteredByAge.map(project => ({
            name: `${project.name} (${project.sizeInMB} MB)  (${project.lastModified} days ago)`,
            value: project
            }))
        })
        printReport(selectedProjects);
    }



    const finalConfirm = await confirm({
        message: `Clean ${selectedProjects.length} node_modules folders?`,
        default: false
    })

    if (!finalConfirm) {
        console.log("Deletion aborted.")
        return
    }
    //if yes then proceed --> call cleaner.ts

    await cleanProjects(selectedProjects);

}