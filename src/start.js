import { statSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'
import getInput from './get-input'

async function start() {
  const cwd = process.cwd()
  const input = await getInput()

  function iterate(path, first) {
    if (statSync(path).isDirectory()) {
      if (!first) mkdirSync(join(cwd, path.replace(/.*\/template\/_/, '').replace(/\/_/g, '/')))
      const paths = readdirSync(path).filter(p => p[0] !== '.')
      for (const p of paths) iterate(join(path, p))
      return
    }

    const newFile = readFileSync(path, 'utf8').replace(/<% (\w+) %>/g, (m, p1) => input[p1])
    writeFileSync(join(cwd, path.replace(/.*\/template\/_/, '').replace(/\/_/g, '/')), newFile)
  }

  iterate(join(__dirname, '../template/'), true)
}

start()
