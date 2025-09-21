 import { promises as fs } from "fs";
 import { join, dirname } from "path";
 import { fileURLToPath } from "url";
 
 // ESM-safe __dirname replacement
 const __filename = fileURLToPath(import.meta.url);
 const __dirname = dirname(__filename);
 const dbPath = join(__dirname, "..", "..", "data", "db.json");

 async function readDb() {
  try {
    const raw = await fs.readFile(dbPath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === "ENOENT")
      return {
        todos: [],
      };
    throw err;
  }
}

 async function writeDb(data){
     await fs.mkdir(dirname(dbPath),{recursive:true});
     await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
 }

 export { readDb, writeDb };
