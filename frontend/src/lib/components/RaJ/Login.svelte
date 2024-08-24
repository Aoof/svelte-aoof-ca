<script lang="ts">
  import { goto } from "$app/navigation";
  import { login, register, user } from "$lib/../stores/auth";
  import { addToast } from "$lib/../stores/toasts";

  let username: string = "";
  let password: string = "";

  let registerMode: boolean = true;

  export let isRaJ: boolean;

  async function handleSubmit() {
    let response;
    if (registerMode) {
      response = await register(username, password, isRaJ);
    } else {
      console.log(isRaJ)
      response = await login(username, password, isRaJ);
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
        timeout: 3000,
      });

      goto("/rawdh-aljinan");
    } else {
      Array.of(response.msg).forEach((msg) => {
        addToast({
          message: msg,
          type: "error",
          dismissible: true,
          timeout: 3000,
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
        background-color: #cacaca;
        color: #333;
        border-radius: 10px;
  
        padding: 3rem 2rem;
  
        transition: all 0.3s;

        h1 {
          font-size: 2em;
          margin-bottom: 1em;
        }
  
        * {
          font-size: 1em;

          text-align: right;
        }
  
        .form-group {
          text-align: right;
          label {
            user-select: none;
          }

          input {
            width: 100%;
            padding: 0.5em;
            margin: 0.5em 0;
            border: 1px solid #ccc;
            border-radius: 5px;
            transition: all 0.3s;
          }
        }

        button {
          margin-top: 1em;
          padding: 0.5em 1em;
          border-radius: 5px;
          background-color: #333;
          color: white;
          border: none;
          cursor: pointer;
          transition: all 0.3s;

          &:hover {
            background-color: #555;
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
    <h1>تسجيل الدخول</h1>
    <div class="form-group">
      <label for="username">إسم المستخدم</label><br />
      <input
        type="text"
        placeholder="إسم المستخدم"
        id="username"
        name="username"
        bind:value={username}
      />
    </div>
    <div class="form-group">
      <label for="password">كلمة المرور</label><br />
      <input
        type="password"
        placeholder="كلمة المرور"
        id="password"
        name="password"
        bind:value={password}
      />
    </div>
    <button
      class="px-5 border-2"
      on:click={handleSubmit}
    >
      {registerMode ? "بدء حساب جديد" : "تسجيل الدخول"}
    </button>
  </form>
</main>
