import type { AnalyzedProject } from "./type.js";

export const filterProjectsByAge = (projects : AnalyzedProject[],olderThan : number) : AnalyzedProject[] => {
    //@ts-ignore
    if(projects[0].lastModified >= olderThan){
        return projects;
    }
    const filtered = projects.filter((project) => (project.lastModified >= olderThan));
    return filtered;  
}