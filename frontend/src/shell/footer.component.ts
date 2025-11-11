import { Component, inject, LOCALE_ID } from "@angular/core"

@Component({
  selector: "gz-footer",
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  readonly locale = inject<string>(LOCALE_ID)
  readonly version = "vQuatsch" //TODO
}
