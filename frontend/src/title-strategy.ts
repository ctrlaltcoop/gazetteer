import { Provider } from '@angular/core'
import { RouterStateSnapshot, TitleStrategy } from '@angular/router'

class GazetteerTitleStrategy extends TitleStrategy {
  private static readonly Suffix = 'iDAI.gazetteer'

  override updateTitle(snapshot: RouterStateSnapshot): void {
    const title = this.buildTitle(snapshot)
    document.title = !title ? GazetteerTitleStrategy.Suffix :
      `${title} | ${GazetteerTitleStrategy.Suffix}`
  }
}

export const provideTitleStrategy = (): Provider => ({ provide: TitleStrategy, useClass: GazetteerTitleStrategy })
