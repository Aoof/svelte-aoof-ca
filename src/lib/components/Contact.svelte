<script lang="ts">
    import axios from 'axios';
    import { _ } from 'svelte-i18n';

    import { addToast } from '$lib/../stores/toasts';
    import { PUBLIC_WEB3_ACCESSKEY } from '$env/static/public';

    import Input from '$lib/components/Input.svelte';
    import { language } from '$lib/../stores/index';
    import type { SiteSettings } from '$lib/content/types';

    export let settings: { en: SiteSettings; fr: SiteSettings };
    $: localizedSettings = settings?.[$language === 'fr' ? 'fr' : 'en'] ?? settings?.en;

    let status = "";

    const handleSubmit = async (event : SubmitEvent) => {
        status = $_('contact.form.submitting')
        const formData = new FormData(event.currentTarget as HTMLFormElement);
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        axios.post("https://api.web3forms.com/submit", json, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        }).then((response) => {
            if (response.data.success) {
                status = response.data.message || $_('contact.form.success');
                addToast({
                    message: $_('contact.form.success'),
                    type: "success",
                    dismissible: true,
                    timeout: 3000
                });
            }
        }).catch(e => {
            status = e.response.data.message || $_('contact.form.error');
            addToast({
                message: $_('contact.form.error'),
                type: "error",
                dismissible: true,
                timeout: 3000
            });
        })
    }
</script>

<article class="" {...$$restProps} id="contact">
    <div class="sections flex flex-col p-4 my-4 text-lg overflow-auto h-full">
        <div class="section flex flex-col gap-2 justify-between bg-pink p-8 rounded-lg min-h-fit">
            <h1 class="text-3xl text-dark font-black">{localizedSettings.contact.title}</h1>
            <p class="text-lg text-dark font-black">{localizedSettings.contact.subtitle}</p>
            <div class="flex flex-col gap-2 *:my-2 text-lg">
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href={localizedSettings.social.discord} target="_blank"><i class="fa-brands font-black text-dark fa-discord"></i> {localizedSettings.contact.discord}</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href={`mailto:${localizedSettings.contact.email}`} target="_blank"><i class="fas font-black text-dark fa-envelope"></i> {localizedSettings.contact.email}</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href={localizedSettings.social.github} target="_blank"><i class="fa-brands font-black text-dark fa-github"></i> Github/Aoof</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href={localizedSettings.social.linkedin} target="_blank"><i class="fa-brands font-black text-dark fa-linkedin"></i> LinkedIn/Aoof</a>
                <div class="my-2 *:mx-2 align-middle text-dark font-black"><i class="fas font-black text-dark fa-map-marker-alt"></i> {localizedSettings.contact.location}</div>
            </div>
        </div>
        <form class="section flex flex-col gap-2 rounded-lg p-8" on:submit|preventDefault={handleSubmit} method="POST">
            <h1 class="text-3xl">{$_('contact.form.title')}</h1>
            <div class="input-group">
                <label for="email" class="text-lg">{$_('contact.form.email')}</label>
                <Input name="email" placeholder={$_('contact.form.emailPlaceholder')} class="w-full" id="email" required />
            </div>
            <div class="input-group">
                <label for="message" class="text-lg">{$_('contact.form.message')}</label>
                <Input name="message" placeholder={$_('contact.form.messagePlaceholder')} class="w-full" type="textarea" id="message" required />
            </div>
            <div class="status text-lg">{status}</div>
            <div class="input-group text-right">
                <input type="hidden" name="access_key" value={ PUBLIC_WEB3_ACCESSKEY } />
                <button class="text-dark py-2 px-4 w-fit self-center font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">{$_('contact.form.send')}</button>
            </div>
        </form>
    </div>
</article>