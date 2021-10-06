#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { json2tsv } from 'tsv-json'
import { getJsonFileContent } from './src/fs-helper.js'

const FILENAME = './test/licenses.json'

const jsonContent = await getJsonFileContent(FILENAME)
const jsonSections = JSON.parse(jsonContent)

let finalSections = []
finalSections.push([
  [...jsonSections.data.head, 'Distributed', 'Modified', 'Interaction'],
])
finalSections.push(
  jsonSections.data.body.map((x) => [...x, 'Yes', 'No', 'Linked'])
)

const flatJson = JSON.stringify(finalSections.flat())

// export json
try {
  await writeFile('./test/licenses-clean.json', flatJson, 'utf8')
} catch (error) {
  console.error(error)
}

// export tsv
try {
  const tsv = json2tsv(finalSections.flat())
  await writeFile('./test/licenses-clean.tsv', tsv, 'utf8')
} catch (error) {
  console.error(error)
}
