
const msg_template = `
Namn: {{ name }}
Företag: {{ company }}
Telefon: {{ phone }}
Epost: {{ email }}
Meddelande:
{{ message }}
`;
const hello = async (data: Record<string, string>) => {
  const msg = msg_template.replace(/{{\s?([^\s}]+)\s?}}/g, (_, b) => String(data[b as keyof typeof data] ?? ""));
  if (!import.meta.env.CONTACT_FORM_WEBHOOK_URL) {
    throw new Error();
  }
  const result = await fetch(import.meta.env.CONTACT_FORM_WEBHOOK_URL, {
    method: 'POST',
    body: JSON.stringify({ msg })
  })
  if (Math.floor(result.status / 100) > 2) {
    throw new Error();
  }
}

export default {
  hello,
}
