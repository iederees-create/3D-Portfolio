// Publish only metadata already public in this repository. No school database access.
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const records=execFileSync('git',['log','-60','--format=%H%x09%cI%x09%s'],{encoding:'utf8'}).trim().split('\n').filter(Boolean).map(line=>{
 const [sha,date,...title]=line.split('\t');return {sha,date,title:title.join(' '),url:`https://github.com/iederees-create/3D-Portfolio/commit/${sha}`};
});
mkdirSync('public/development',{recursive:true});
writeFileSync('public/development/updates.json',JSON.stringify({generatedAt:new Date().toISOString(),updates:records},null,2)+'\n');
