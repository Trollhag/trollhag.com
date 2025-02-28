/**
 * Thanks to Marcus Olsson for the idea and code example this is based on.
 * https://marcusolsson.me/artiklar/app-for-att-kryptera-meddelanden
 */

import { triggerToast } from './toasts'
import keybase from '../utils/keybase'

export const encryptor = () => ({
  message: '',
  submitted: false,

  reset() {
    this.message = ''
    this.submitted = false
  },
  async encrypt() {
    try {
      this.message = await keybase.encrypt(this.message)
      this.submitted = true
    } catch (error) {
      console.error('Encryption failed:', error)
      this.message = 'Krypteringen misslyckades'
    }
  },
  async copy() {
    window.navigator.clipboard.writeText(this.message)
    triggerToast({
      color: 'success',
      title: 'Kopierat till urklipp!',
    })
  },
})
