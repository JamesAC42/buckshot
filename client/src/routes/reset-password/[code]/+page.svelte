<script>
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import Navbar from "../../../components/Navbar.svelte";
  import Button from "../../../components/Button.svelte";

  let loading = false;

  let email = "";
  let password = "";
  let passwordConfirm = "";

  let success = "";
  let error = "";

  onMount(() => {
    const { params } = $page;
    const code = params.code;

    if (!code) {
      goto("/");
    }
  });

  function resetPassword() {

    if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
      error = 'Please enter a valid email address.';
      return;
    }

    if (password.length < 3 || passwordConfirm.length < 3) {
      error = 'Password must be at least 3 characters.';
      return;
    }

    if (password !== passwordConfirm) {
      error = 'Passwords do not match.';
      return;
    }

    const { params } = $page;
    const code = params.code;

    loading = true;
    fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        code
      }),
    })
    .then(response => response.json())
    .then(data => {
      loading = false;
      if (data.success) {
        email = "";
        password = "";
        passwordConfirm = "";
        error = "";
        success = "Password reset successful. Redirecting to login...";

        setTimeout(() => {
          goto("/login");
          return;
        }, 2000);

      } else {
        error = data.message;
        success = "";
      }
    });

  }

</script>

<Navbar />

<div class="reset-password">
    <h2>Reset Password</h2>
    <p>Reset your password here</p>
  
    <div class="form-outer">
      <label for="email">Email</label>
      <input type="text" name="email" placeholder="Enter your email" bind:value={email}>
      <label for="password">New Password</label>
      <input type="password" name="password" placeholder="Enter your new password" bind:value={password}>
      <label for="password-confirm">Confirm Password</label>
      <input type="password" name="password-confirm" placeholder="Confirm new password" bind:value={passwordConfirm}>
      <Button
          buttonText="Reset Password"
          loading={loading}
          onClick={() => resetPassword()}/>
    </div>

    {#if error}
    <p class="error">{error}</p>
    {/if}
    {#if success}
    <p>{success}</p>
    {/if}

</div>

<style lang="scss">

  @import "../../../styles/mixins.scss";

  .reset-password {
    @include center-fixed-container;
    text-align:center;
    .form-outer {
      @include flex-center-col;
      padding:1rem 5rem;
      label {
        margin-bottom:10px;
      }
      input {
        margin-bottom:1rem;
        outline:none;
        width:100%;
        border:1px solid $primary-color;
        border-radius: 0.2rem;
        padding:0.4rem 1rem;
        text-align:center;
        font-family:"Questrial", sans-serif;
      }
      align-items: center;
    }

    p.error {
      color:$error-color;
    }

  }

</style>
