#!/usr/bin/env node
const fs = require('fs')
const msg = fs.readFileSync(process.argv[2], 'utf8').trim()
const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|chore)(\(.+\))?: .{1,50}/

if (!commitRE.test(msg)) {
  console.error(`
  ERROR: Invalid commit message format.

  Please use the Conventional Commits format:
    <type>(<scope>): <subject>

  Examples:
    feat(button): add loading state support
    fix(table-pro): pagination not sync with props
    docs: update installation guide

  Types:
    feat     - New feature
    fix      - Bug fix
    docs     - Documentation
    style    - Code style (formatting)
    refactor - Code refactoring
    perf     - Performance improvement
    test     - Testing related
    chore    - Build/ tooling
  `)
  process.exit(1)
}
