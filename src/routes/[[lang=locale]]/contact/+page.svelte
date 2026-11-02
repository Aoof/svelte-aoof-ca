<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
  import { PUBLIC_WEB3_ACCESSKEY } from '$env/static/public';

  let { data } = $props();

  const lang = $derived(data.lang);
  const settings = $derived(data.content.settings);
  const ui = $derived(settings.ui.contact);

  let status = $state<'idle' | 'sending' | 'sent' | 'error'>('idle');
  let errors = $state<{ email?: string; message?: string }>({});

  async function onsubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const fields = new FormData(form);
    const email = String(fields.get('email') ?? '').trim();
    const message = String(fields.get('message') ?? '').trim();

    errors = {
      email: !email ? ui.required : !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? ui.invalidEmail : undefined,
      message: !message ? ui.required : undefined
    };
    if (errors.email || errors.message) return;

    status = 'sending';
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ access_key: PUBLIC_WEB3_ACCESSKEY, email, message })
      });
      const result = await response.json();
      if (!result.success) throw new Error(result.message);
      status = 'sent';
      form.reset();
    } catch {
      status = 'error';
    }
  }
</script>

<SEO title={ui.title} description={settings.ui.seo.contact} {lang} path="/contact" />

<section class="wrap layout">
  <div class="head">
    <h1>{ui.title}</h1>
    <p class="intro">{ui.intro}</p>
  </div>

  <form class="form" novalidate {onsubmit}>
    <h2>{ui.formTitle}</h2>

    <div class="field">
      <label for="email">{ui.emailLabel}</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        aria-invalid={errors.email ? 'true' : undefined}
        aria-describedby={errors.email ? 'email-error' : undefined}
      />
      {#if errors.email}<p class="error" id="email-error">{errors.email}</p>{/if}
    </div>

    <div class="field">
      <label for="message">{ui.messageLabel}</label>
      <textarea
        id="message"
        name="message"
        rows="6"
        aria-invalid={errors.message ? 'true' : undefined}
        aria-describedby={errors.message ? 'message-error' : undefined}
      ></textarea>
      {#if errors.message}<p class="error" id="message-error">{errors.message}</p>{/if}
    </div>

    <button class="btn" type="submit" disabled={status === 'sending'}>
      {status === 'sending' ? ui.sending : ui.send}
    </button>

    <p class="status" role="status" class:bad={status === 'error'}>
      {#if status === 'sent'}{ui.sent}{:else if status === 'error'}{ui.error}{/if}
    </p>
  </form>

  <div class="details">
    <h2>{ui.detailsTitle}</h2>
    <ul>
      <li>
        <span class="meta">{ui.email}</span>
        <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a>
      </li>
      <li>
        <span class="meta">{ui.discord}</span>
        <a href={settings.social.discord} target="_blank" rel="noopener noreferrer">{settings.contact.discord}</a>
      </li>
      <li>
        <span class="meta">LinkedIn</span>
        <a href={settings.social.linkedin} target="_blank" rel="noopener noreferrer">linkedin.com/in/aoof</a>
      </li>
      <li>
        <span class="meta">GitHub</span>
        <a href={settings.social.github} target="_blank" rel="noopener noreferrer">github.com/Aoof</a>
      </li>
      <li>
        <span class="meta">{ui.location}</span>
        {settings.contact.location}
      </li>
    </ul>
  </div>
</section>

<style>
  .layout {
    display: grid;
    gap: 3rem;
    padding-top: clamp(2rem, 5vw, 4rem);
  }

  h1 {
    font-size: var(--t-title);
  }

  .intro {
    max-width: var(--measure);
    margin-top: 1.25rem;
    font-size: var(--t-lead);
  }

  .form {
    display: grid;
    gap: 1.25rem;
    align-content: start;
  }

  .field {
    display: grid;
    gap: 0.4rem;
  }

  label {
    font-stretch: 112%;
    font-weight: 600;
  }

  input,
  textarea {
    width: 100%;
    min-height: 3rem;
    padding: 0.7rem 0.9rem;
    border: 1px solid var(--line);
    border-radius: 6px;
    background: var(--raise);
    color: var(--ink);
    font: inherit;
  }

  [aria-invalid='true'] {
    border-color: var(--pink);
  }

  .error {
    color: var(--pink);
    font-weight: 600;
  }

  .form .btn {
    justify-self: start;
    width: 100%;
  }

  .status {
    min-height: 1.6em;
  }

  .status.bad {
    color: var(--pink);
  }

  .details ul {
    display: grid;
    gap: 1.25rem;
    margin: 1.5rem 0 0;
    padding: 0;
    list-style: none;
  }

  .details li {
    display: grid;
    gap: 0.1rem;
    overflow-wrap: anywhere;
  }

  .details a {
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
  }

  @media (min-width: 640px) {
    .form {
      max-width: 66%;
    }

    .form .btn {
      width: auto;
    }
  }

  @media (min-width: 1024px) {
    .layout {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
      column-gap: 5rem;
    }

    .head {
      grid-column: 1 / -1;
    }

    .form {
      max-width: none;
    }
  }
</style>
