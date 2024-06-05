<script>
  import { login, register, user } from "../stores/auth";
  import { addToast } from "../stores/toasts";

  let username = "";
  let password = "";

  let registerMode = false;

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
        dismissible: true
      });

      window.location.href = "/fae-sparkles";
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
    position: absolute;
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
      text-align: left;

      * {
        font-size: 1.2em;
      }

      .form-group {
        padding: 10px 0;
        label {
          user-select: none;
        }

        input {
          padding: 10px 20px;
          margin: 5px 0;
          border-radius: 7px;
          color: #fff;
          background-color: rgba(70, 63, 58, 0.2078431373);
          border: 1px solid rgb(255, 255, 255);
          width: -webkit-fill-available;
          width: -moz-available;
          width: stretch;
        }
      }

      .btn {
        border: none;
        border-radius: 9px;
        padding: 10px 25px;
        cursor: pointer;
        background-color: #e0afa0;
        color: #463f3a;
        font-weight: 600;
        margin: 20px 0;
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
      <input type="text" id="username" name="username" bind:value={username} />
    </div>
    <div class="form-group">
      <label for="password">Password</label><br />
      <input type="password" id="password" name="password" bind:value={password} />
    </div>
    <input type="submit" value="{registerMode ? 'Register' : 'Login'}" class="btn btn-submit" on:click={handleSubmit} />
  </form>
</main>
