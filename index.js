#!/usr/bin/env node

import { argv } from 'node:process'
import { getJsonFileContent, exportJsonArrayToTsv } from './src/fs-helper.js'

const filename = argv[2]

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

await exportJsonArrayToTsv(filename, finalSections)