<script lang="ts">
    import axios from 'axios';

    import { device } from '$lib/../stores/index';
    import { addToast } from '$lib/../stores/toasts';
    import { PUBLIC_WEB3_ACCESSKEY } from '$env/static/public';

    import { fly } from 'svelte/transition';

    import Input from '$lib/components/Input.svelte';
    import Button from '$lib/components/Button.svelte';

    let status = "";

    const handleSubmit = async (event : SubmitEvent) => {
        status = 'Submitting...'
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
                status = response.data.message || "Success";
                addToast({
                    message: "Message sent successfully",
                    type: "success",
                    dismissible: true,
                    timeout: 3000
                });
            }
        }).catch(e => {
            status = e.response.data.message || "Failed to send message";
            addToast({
                message: "Failed to send message",
                type: "error",
                dismissible: true,
                timeout: 3000
            });
        })
    }
</script>

<style lang="scss">
    .sections {
        height: stretch;
    }
</style>

<article class="h-full bg-dark rounded-xl p-4 absolute top-0 w-full" transition:fly={$device === 'desktop' ? { x: -20, duration: 500 } : { y: -20, duration: 500 }} {...$$restProps}>
    <div class="window-controls flex justify-end gap-2 mb-4">
        <div class="window-control bg-red w-3 h-3 rounded-full"></div>
        <div class="window-control bg-yellow w-3 h-3 rounded-full"></div>
        <div class="window-control bg-green w-3 h-3 rounded-full"></div>
    </div>
    <div class="sections flex xl:flex-row flex-col p-4 my-4 text-lg overflow-auto h-full">
        <div class="section flex flex-col gap-2 justify-between xl:w-1/2 bg-pink p-8 rounded-lg text-dark min-h-fit">
            <h1 class="text-3xl">Contact Information</h1>
            <p class="text-lg">Mostly active on Discord but feel free to reach out on one of the following.</p>
            <div class="flex flex-col gap-2 *:my-2 text-lg">
                <a class="my-2 *:mx-2 align-middle" href="https://discord.gg" target="_blank"><i class="fa-brands fa-discord"></i> aoof</a>
                <a class="my-2 *:mx-2 align-middle" href="mailto:aoof.mousa@gmail.com" target="_blank"><i class="fas fa-envelope"></i> aoof.mousa@gmail.com</a>
                <a class="my-2 *:mx-2 align-middle" href="tel:+1514-717-7233" target="_blank"><i class="fas fa-phone"></i> +1 (514) 717-7233</a>
                <a class="my-2 *:mx-2 align-middle" href="https://github.com/Aoof" target="_blank"><i class="fa-brands fa-github"></i> Github/Aoof</a>
                <a class="my-2 *:mx-2 align-middle" href="https://www.linkedin.com/in/aoof/" target="_blank"><i class="fa-brands fa-linkedin"></i> LinkedIn/Aoof</a>
                <div class="my-2 *:mx-2 align-middle"><i class="fas fa-map-marker-alt"></i> Montreal, Qc</div>
            </div>
        </div>
        <form class="section flex flex-col gap-2 xl:w-1/2 rounded-lg p-8" on:submit|preventDefault={handleSubmit} method="POST">
            <h1 class="text-3xl">Contact Form</h1>
            <div class="input-group">
                <label for="email" class="text-lg">Email address : </label>
                <Input name="email" placeholder="Enter your email here" class="w-full" id="email" required />
            </div>
            <div class="input-group">
                <label for="message" class="text-lg">Message : </label>
                <Input name="message" placeholder="Enter your message here" class="w-full" type="textarea" id="message" required />
            </div>
            <div class="status text-lg">{status}</div>
            <div class="input-group text-right">
                <input type="hidden" name="access_key" value={ PUBLIC_WEB3_ACCESSKEY } />
                <Button type="submit" text="Send" class="b-full-info" />
            </div>
        </form>
    </div>
</article>