#!/usr/bin/env node

import { program } from "./commands/command.js";
//todo1 amm use rate limit and do parallel analysis of size of node modules 
//todo2 do parallel deletion of node modules folder
async function main(){
    program.parse();
}

main();

