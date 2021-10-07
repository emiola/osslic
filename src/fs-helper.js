import * as path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { json2tsv } from 'tsv-json'

const JSON_EXT = '.json'
const TSV_EXT = '.tsv'

export const getJsonFileContent = async (filename = '') => {
  try {
    const json = await readFile(filename)
    return json.toString()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}

export const exportJsonArrayToTsv = async (filename = '', arr = []) => {
  try {
    const basename = path.basename(filename, JSON_EXT)
    const tsv = json2tsv(arr.flat())
    await writeFile(`${basename}${TSV_EXT}`, tsv, 'utf8')
  } catch (error) {
    console.error(error)
  }
}
