

export interface ProjectInfo  {
    name :  string
    path : string
}


export interface AnalyzedProject {
    name : string
    path : string
    nodeModulesPath : string
    sizeInMB : number
    lastModified : number
}