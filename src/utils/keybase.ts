/* eslint-disable import/no-default-export */
import * as openpgp from 'openpgp'

export default {
  async hello(data: Record<string, string>) {
    const msg =
      'Namn: {{ name }}\nFöretag: {{ company }}\nTelefon: {{ phone }}\nEpost: {{ email }}\nMeddelande:\n{{ message }}'.replace(
        /{{\s?([^\s}]+)\s?}}/g,
        (_, b) => String(data[b as keyof typeof data] ?? ''),
      )
    if (!import.meta.env.CONTACT_FORM_WEBHOOK_URL) {
      throw new Error()
    }
    const result = await fetch(import.meta.env.CONTACT_FORM_WEBHOOK_URL, {
      method: 'POST',
      body: JSON.stringify({ msg }),
    })
    if (Math.floor(result.status / 100) > 2) {
      throw new Error()
    }
  },
  async fetchPGPKey() {
    if (!import.meta.env.PUBLIC_KEYBASE_PUBLIC_PGP_KEY_URL) {
      throw new Error('Missing PUBLIC_KEYBASE_PUBLIC_PGP_KEY_URL in env')
    }
    const result = await fetch(
      import.meta.env.PUBLIC_KEYBASE_PUBLIC_PGP_KEY_URL,
    )
    if (Math.floor(result.status / 100) > 2) {
      throw new Error('Fetch public key status not 2XX')
    }
    return result.text()
  },
  async encrypt(text: string): Promise<string> {
    const publicKey = await openpgp.readKey({
      armoredKey: await this.fetchPGPKey(),
    })
    const message = await openpgp.encrypt({
      message: await openpgp.createMessage({ text }),
      encryptionKeys: publicKey,
    })
    return message.toString()
  },
}
