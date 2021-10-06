import { readFile } from 'node:fs/promises'

export const getJsonFileContent = async (filename = '') => {
  try {
    const json = await readFile(filename)
    return json.toString()
  } catch (error) {
    console.error(error)
    throw new Error(error)
  }
}
