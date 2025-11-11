import { Component, OnInit, signal } from '@angular/core'

@Component({
  selector: 'gz-cookie-notice',
  templateUrl: './cookie-notice.component.html',
  styleUrl: './cookie-notice.component.scss'
})
export class CookieNoticeComponent implements OnInit {
  shown = signal(false)

  ngOnInit(): void {
    if (!this.isCookieSet()) {
      this.shown.set(true)
    }
  }

  setCookie() {
    const today = new Date()
    const expiry = new Date(today.getTime() + 30 * 24 * 3600 * 1000) // plus 30 days
    document.cookie = 'idai-cookie-notice=1; path=/; expires=' + expiry.toISOString()
  }

  dismiss() {
    this.shown.set(false)
    this.setCookie()
  }

  isCookieSet() {
    return document.cookie.indexOf('idai-cookie-notice=1') !== -1
  }
}
