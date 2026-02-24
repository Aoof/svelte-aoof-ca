<script lang="ts">
    import axios from 'axios';

    import { addToast } from '$lib/../stores/toasts';
    import { PUBLIC_WEB3_ACCESSKEY } from '$env/static/public';

    import Input from '$lib/components/Input.svelte';

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

<article class="" {...$$restProps} id="contact">
    <div class="sections flex flex-col p-4 my-4 text-lg overflow-auto h-full">
        <div class="section flex flex-col gap-2 justify-between bg-pink p-8 rounded-lg min-h-fit">
            <h1 class="text-3xl text-dark font-black">Contact Information</h1>
            <p class="text-lg text-dark font-black">Mostly active on Discord but feel free to reach out on one of the following.</p>
            <div class="flex flex-col gap-2 *:my-2 text-lg">
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href="https://discord.gg" target="_blank"><i class="fa-brands font-black text-dark fa-discord"></i> aoof</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href="mailto:aoof.mousa@gmail.com" target="_blank"><i class="fas font-black text-dark fa-envelope"></i> aoof.mousa@gmail.com</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href="https://github.com/Aoof" target="_blank"><i class="fa-brands font-black text-dark fa-github"></i> Github/Aoof</a>
                <a class="my-2 *:mx-2 align-middle text-dark font-black" href="https://www.linkedin.com/in/aoof/" target="_blank"><i class="fa-brands font-black text-dark fa-linkedin"></i> LinkedIn/Aoof</a>
                <div class="my-2 *:mx-2 align-middle text-dark font-black"><i class="fas font-black text-dark fa-map-marker-alt"></i> Montreal, Qc</div>
            </div>
        </div>
        <form class="section flex flex-col gap-2 rounded-lg p-8" on:submit|preventDefault={handleSubmit} method="POST">
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
                <button class="text-dark py-2 px-4 w-fit self-center font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">Send</button>
            </div>
        </form>
    </div>
</article>