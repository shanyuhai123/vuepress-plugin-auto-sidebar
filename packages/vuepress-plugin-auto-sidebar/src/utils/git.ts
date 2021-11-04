import * as execa from 'execa'
import { basename, dirname } from 'path'

export const checkGit = (cwd: string): boolean => {
  try {
    execa.commandSync('git log', { cwd })
    return true
  } catch {
    return false
  }
}

// https://stackoverflow.com/questions/2390199/finding-the-date-time-a-file-was-first-added-to-a-git-repository
// git --no-pager log --follow --format=%at --reverse -- <fname>
export const getGitCreatedTime = async (filepath: string) => {
  const { stdout } = await execa(
    'git',
    ['--no-pager', 'log', '--follow', '--format=%at', '--reverse', '--', basename(filepath)],
    {
      cwd: dirname(filepath)
    }
  )

  return Number.parseInt(stdout, 10) * 1000
}

export const isGitIndex = async (filepath: string) => {
  const { stdout } = await execa(
    'git',
    ['ls-files', '--', basename(filepath)],
    {
      cwd: dirname(filepath)
    }
  )

  return stdout.trim() === basename(filepath)
}
