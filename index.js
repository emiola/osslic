#!/usr/bin/env node

import { argv } from 'node:process'
import * as path from 'node:path'
import { writeFile } from 'node:fs/promises'
import { json2tsv } from 'tsv-json'
import { getJsonFileContent } from './src/fs-helper.js'

const JSON_EXT = '.json'
const TSV_EXT = '.tsv'

const filename = argv[2]
const basename = path.basename(filename, JSON_EXT)

const jsonContent = await getJsonFileContent(filename)
const jsonSections = JSON.parse(jsonContent)

// decorate yarn output
let finalSections = []
finalSections.push([
  [...jsonSections.data.head, 'Distributed', 'Modified', 'Interaction'],
])
finalSections.push(
  jsonSections.data.body.map((x) => [...x, 'Yes', 'No', 'Linked'])
)

// export tsv
try {
  const tsv = json2tsv(finalSections.flat())
  await writeFile(`${basename}${TSV_EXT}`, tsv, 'utf8')
} catch (error) {
  console.error(error)
}
