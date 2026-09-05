import type { T3CeBaseProps, T3ContentElement } from '.'

export interface T3BackendLayout {
  content: {
    [key: string]: T3ContentElement<T3CeBaseProps>[];
  }
}
