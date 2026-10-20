// The parent's address never ships with the site. Messages post to a form relay
// (Web3Forms), which forwards them by email. Only its public access key is in the build,
// supplied at build time as VITE_WEB3FORMS_KEY (a GitHub Actions variable).
const ENDPOINT = 'https://api.web3forms.com/submit';
const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY ?? '';

export function initContact(form) {
  if (!form) return;
  const status = form.querySelector('[data-contact-status]');
  const button = form.querySelector('button[type=submit]');

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const missing = [...form.querySelectorAll('[required]')].find((field) => !field.value.trim());
    if (missing) {
      status.textContent = `Please add ${missing.placeholder.toLowerCase()}.`;
      missing.focus();
      return;
    }
    const email = form.querySelector('[type=email]');
    if (!email.validity.valid) {
      status.textContent = 'That email address looks incomplete. Check it and send again.';
      email.focus();
      return;
    }
    if (!ACCESS_KEY) {
      status.textContent = 'The contact form is being connected and is not sending yet. Please try again soon.';
      return;
    }

    const data = new FormData(form);
    data.append('access_key', ACCESS_KEY);
    data.append('subject', `L Hopkins site: message from ${data.get('name')}`);
    data.append('from_name', 'L Hopkins website');

    button.disabled = true;
    status.textContent = 'Sending…';
    try {
      const response = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      const body = await response.json();
      if (!response.ok || !body.success) throw new Error(body.message || 'Send failed');
      form.reset();
      status.textContent = 'Sent. The family will reply to the email you gave.';
    } catch {
      status.textContent = 'It did not send. Check your connection and try again; your message is still here.';
    } finally {
      button.disabled = false;
    }
  });
}
