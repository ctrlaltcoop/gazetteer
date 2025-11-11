/// <reference types="@angular/localize" />
/// <reference types="./overrides.d.ts" />

import { Component, inject } from "@angular/core"
import { bootstrapApplication } from "@angular/platform-browser"
import { provideGazetteerRouter } from "./router"
import { NavigationEnd, Router, RouterOutlet } from "@angular/router"
import { provideStore } from "@ngxs/store"
import { provideTitleStrategy } from "./title-strategy"
import { CookieNoticeComponent } from "./cookie-notice.component"
import { ShellComponent } from "./shell/shell.component"

@Component({
  selector: "gz-root",
  imports: [RouterOutlet, ShellComponent, CookieNoticeComponent],
  template: `
    <gz-cookie-notice />
    <gz-shell>
      <router-outlet />
    </gz-shell>
  `,
})
export class Gazetteer {
  private readonly _router = inject(Router)
  private _lastUrl: string | undefined

  constructor() {
    this._router.events.subscribe(event => {
      if (!(event instanceof NavigationEnd))
        return
      if(!window._paq)
        return
      if (this._lastUrl === event.urlAfterRedirects)
        return

      this._lastUrl = event.urlAfterRedirects
      window._paq.push("setDocumentTitle", document.title)
      window._paq.push("setCustomUrl", this._lastUrl)
      window._paq.push("trackPageView", 100)
    })
  }
}

bootstrapApplication(Gazetteer, {
  providers: [provideTitleStrategy(), provideGazetteerRouter(), provideStore()],
})
