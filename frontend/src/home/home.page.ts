import { Component, inject, LOCALE_ID } from "@angular/core"

@Component({
  templateUrl: "./home.component.html",
})
export class HomePage {
  readonly locale = inject<string>(LOCALE_ID)
}
