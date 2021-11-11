import {getInput, setFailed} from '@actions/core'
import {command} from 'execa'
import pa11y from 'pa11y'

async function run(): Promise<string | void> {
  const startScript = getInput('start')
  try {
    // eslint-disable-next-line no-console
    console.log('before pm2')
    const {stdout} = await command(
      `pm2 start npm --name 'pa11y' -- run ${startScript}`
    )
    // eslint-disable-next-line no-console
    console.log('after pm2')
    const results = await pa11y('http://localhost:3000')
    // eslint-disable-next-line no-console
    console.log(results)

    return stdout
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    // eslint-disable-next-line no-console
    console.log(e)
    return setFailed(e.message)
  }
}

run()
