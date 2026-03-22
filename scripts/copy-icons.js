import { promises as fs } from 'fs'
import path from 'path'

let srcDir = path.resolve('icons')
const destDir = path.resolve('public', 'icons')

async function ensureDir(dir){
  try{ await fs.mkdir(dir, { recursive: true }) }catch(e){ }
}

async function copyRecursive(src, dest){
  const entries = await fs.readdir(src, { withFileTypes: true })
  await ensureDir(dest)
  for(const e of entries){
    const srcPath = path.join(src, e.name)
    const destPath = path.join(dest, e.name)
    if(e.isDirectory()){
      await copyRecursive(srcPath, destPath)
    } else {
      await fs.copyFile(srcPath, destPath)
    }
  }
}

async function main(){
  try{
    // If the extracted folder contains a single top-level folder (for example
    // `icons/icons/...`), flatten by using that inner folder as the source.
    const top = await fs.readdir(srcDir, { withFileTypes: true })
    if(top.length === 1 && top[0].isDirectory()){
      const inner = path.join(srcDir, top[0].name)
      // If inner folder contains category folders, switch to it.
      const innerEntries = await fs.readdir(inner, { withFileTypes: true })
      const hasCategoryDirs = innerEntries.some(e=>e.isDirectory())
      if(hasCategoryDirs){
        srcDir = inner
      }
    }
    await copyRecursive(srcDir, destDir)
    console.log('Icons copied to', destDir)
  }catch(err){
    console.error('Error copying icons:', err.message)
    process.exitCode = 1
  }
}

main()
