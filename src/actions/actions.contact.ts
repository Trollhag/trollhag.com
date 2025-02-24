import { ActionError, defineAction } from 'astro:actions';
import { getSecret } from 'astro:env/server';
import { z } from "astro:schema";

const msg_template = `
Namn: {{ name }}
Företag: {{ company }}
Telefon: {{ phone }}
Epost: {{ email }}
Meddelande:
{{ message }}
`;

export const contact = defineAction({
  input: z.object({
    name: z.string().min(1),
    company: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional().or(z.string().email()),
    message: z.string().min(1),
  }),
  async handler(data) {
    const msg = msg_template.replace(/{{\s?([^\s}]+)\s?}}/g, (_, b) => String(data[b as keyof typeof data] ?? ""));
    const url = getSecret("CONTACT_FORM_WEBHOOK_URL");
    if (!url) {
      console.error(`Cannot find required secret: CONTACT_FORM_WEBHOOK_URL`);
      throw new Error();
    }
    const result = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({ msg })
    })
    if (Math.floor(result.status / 100) > 2) {
      console.error(`Request to CONTACT_FORM_WEBHOOK_URL failed`)
      throw new ActionError({ code: 'BAD_REQUEST' });
    }
  }
})
