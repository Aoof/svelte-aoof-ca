<script lang="ts">
  import { goto } from "$app/navigation";
  import { login, register, user } from "$lib/../stores/auth";
  import { addToast } from "$lib/../stores/toasts";

  import Button from "./Button.svelte";
  import Input from "./Input.svelte";

  let username : string = "";
  let password : string = "";

  let registerMode : boolean = false;

  async function handleSubmit() {

    let response;
    if (registerMode) {
      response = await register(username, password);
    } else {
      response = await login(username, password);
    }

    if (response.ok) {
      user.subscribe((value) => {
        localStorage.setItem("username", value.username);
        localStorage.setItem("token", value.token);
      });
      addToast({
        message: response.msg[0],
        type: "success",
        dismissible: true,
        timeout: 3000
      });

      goto("/fae-sparkles");
    } else {
      Array.of(response.msg).forEach((msg) => {
        addToast({
          message: msg,
          type: "error",
          dismissible: true
        });
      });
    }
  }
</script>


<style lang="scss">
  main#login {
    position: fixed;
    top: 0;
    bottom: 0;
    width: -webkit-fill-available;
    width: -moz-available;
    width: stretch;
    height: -moz-fit-content;
    height: fit-content;
    align-content: center;
    text-align: center;
    align-self: center;
    margin: auto;
    padding: 30px;

    form {
      max-width: 700px;
      margin: auto;
      text-align: right;

      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
      background-color: rgba(40, 40, 40, 1);
      border-radius: 10px;

      padding: 3rem 2rem;

      transition: all 0.3s;
      
      * {
        font-size: 1em;
      }

      .form-group {
        text-align: left;
        label {
          user-select: none;
        }
      }
    }

    @media only screen and (max-width: 860px) {
      form {
        width: -webkit-fill-available !important;
        width: -moz-available !important;
        width: stretch !important;
      }
    }
  }
</style>

<main id="login">
  <form on:submit|preventDefault>
    <div class="form-group">
      <label for="username">Username</label><br />
      <Input 
        type="text" 
        placeholder="Username" 
        id="username" 
        name="username" 
        bind:value={username} />
    </div>
    <div class="form-group">
      <label for="password">Password</label><br />
      <Input 
        type="password" 
        placeholder="Password" 
        id="password" 
        name="password" 
        bind:value={password} />
    </div>
    <Button className="px-5 border-2" style="border: 1px solid gray;" text={registerMode ? "Register" : "Login"} on:click={handleSubmit} />
  </form>
</main>
