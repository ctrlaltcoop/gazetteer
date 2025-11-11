import { Injectable } from '@angular/core'
import { Selector, State } from '@ngxs/store'

interface AuthStateModel {
  something: ''
}

@State({
  name: 'auth'
})
@Injectable()
export class AuthState {
  @Selector() static isAnonymous(state: AuthStateModel) {
    //TODO
    return true
  }

  @Selector() static username(state: AuthStateModel) {
    //TODO
    return 'Quatsch'
  }
  @Selector() static isEditor(state: AuthStateModel) {
    // TODO
    return true
  }

  @Selector() static isAdmin(state:AuthStateModel) {
    // TODO
    return true
  }

  @Selector() static isUser(state: AuthStateModel) {
    //TODO
    return true
  }

  @Selector() static isReisestipendiat(state: AuthStateModel) {
    //TODO
    return true
  }

}
