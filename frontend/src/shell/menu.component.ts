import { Component, inject, signal } from '@angular/core'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { Store } from '@ngxs/store'
import { AuthState } from '../auth.state'
import { GlobalState } from '../global.state'
import { Router } from '@angular/router'
import { Paths } from '../router'
import { SortPipe } from '../common/sort.pipe'

@Component({
  selector: 'gz-menu',
  templateUrl: './menu.component.html',
  imports: [ReactiveFormsModule, SortPipe]
})
export class MenuComponent {
  private readonly _store = inject(Store)
  private readonly _router = inject(Router)

  readonly isEditor = this._store.selectSignal(AuthState.isEditor)
  readonly isReisestipendiat = this._store.selectSignal(AuthState.isReisestipendiat)
  readonly showSearch = this._store.selectSignal(GlobalState.slices.showNavbarSearch)

  readonly query = new FormControl('')
  readonly searchSuggestions = signal<string[] | undefined>(undefined)
  readonly selectedSuggestionIndex = signal(0)
  readonly tags = signal<string[]>([])

  submitSearch() {
    this._router.navigate([Paths.Search], {
      queryParams: { q: this.query.value }
    })
  }
  selectPrevSuggestion() {
    this.selectedSuggestionIndex.update(index => {
      const suggestionAmount = this.searchSuggestions()?.length ?? 0
      if (suggestionAmount <= 0) {
        return index
      }
      const nextIndex = index - 1
      if (nextIndex < 0) {
        return suggestionAmount - 1
      }
      return nextIndex
    })
  }
  selectNextSuggestion() {
    this.selectedSuggestionIndex.update(index => {
      const suggestionAmount = this.searchSuggestions()?.length ?? 0
      if (suggestionAmount <= 0) {
        return index
      }
      const nextIndex = index + 1
      if (nextIndex >= suggestionAmount) {
        return 0
      }
      return nextIndex
    })
  }

  lostFocus() {
    if (this.query.value != '') {
      this.addTag()
    }
    this.searchSuggestions.set([])
  }

  addTag() {
    const newTag = this.query.value?.replace(',', '').replace(';', '').trim() ?? ''
    this.tags.update(tags => {
      if (newTag === '' || tags.indexOf(newTag) !== -1)
        return tags
      return [...tags, newTag]
    })
    this.query.setValue('')
  }


  getCurrentRoute() {
    return this._router.url
 }
}
