import { Component, computed, inject, LOCALE_ID, signal } from '@angular/core'
import { TopBarComponent } from './top-bar.component'
import { MenuComponent } from './menu.component'
import { FooterComponent } from './footer.component'
import { Store } from '@ngxs/store'
import { GlobalState } from '../global.state'
import { MapComponent } from '../common/map/map.component'

@Component({
  selector: 'gz-shell',
  templateUrl: './shell.component.html',
  imports: [TopBarComponent, MenuComponent, FooterComponent, MapComponent]
})
export class ShellComponent {
  private readonly _store = inject(Store)

  readonly locale = inject<string>(LOCALE_ID)
  readonly viewClass = this._store.selectSignal(GlobalState.slices.viewClass)
  readonly showHeader = this._store.selectSignal(GlobalState.slices.showHeader)
  readonly title = this._store.selectSignal(GlobalState.slices.title)
  readonly subtitle = this._store.selectSignal(GlobalState.slices.subtitle)
  readonly mapMode = this._store.selectSignal(GlobalState.slices.mapMode)

  readonly successMessage = signal<string | undefined>(undefined) //TODO
  readonly alerts = signal<{ id: string, alertClass: string, head?: string, body: string }[]>([]) //TODO
  readonly hasAlerts = computed(() => this.alerts().length !== 0)
  readonly mapContainerStyle = signal('something') //TODO
  readonly activePlaces = signal([]) // TODO
  readonly highlight = signal(undefined) //TODO

  closeAlert(alert: object) {
    //TODO
  }

  setUpdateMapPropertiesTimer(){
    // TODO - Dont even understand what it does, couldnt find it in the original source?
  }
}
