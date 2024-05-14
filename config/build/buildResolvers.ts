import { type Configuration } from 'webpack'
import { type IBuildOptions } from './types/types'
import path from 'path'

export function buildResolvers(options: IBuildOptions): Configuration['resolve'] {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@': options.paths.src
    }
  }
}
