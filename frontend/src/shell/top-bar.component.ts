import { Component, inject } from '@angular/core'
import { AuthState } from '../auth.state'
import { Store } from '@ngxs/store'

@Component({
  selector: 'gz-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss'
})
export class TopBarComponent {
  readonly store = inject(Store)
  readonly isAnonymous = this.store.selectSignal(AuthState.isAnonymous)
  readonly username = this.store.selectSignal(AuthState.username)
  readonly isEditor = this.store.selectSignal(AuthState.isEditor)
  readonly isAdmin = this.store.selectSignal(AuthState.isAdmin)
  readonly isUser = this.store.selectSignal(AuthState.isUser)
}
