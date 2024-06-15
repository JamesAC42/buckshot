<script>
  import { goto } from "$app/navigation";


    import {userStore, jobsStore, settingsStore} from "../../stores/stores.js";

    let email = '';
    let password = '';
    let error = '';

    let loading = false;

    function handleSubmit() {

        console.log("asdfads");

        if (!email || !password) {
            error = 'Email and password are required.';
            return;
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            error = 'Please enter a valid email address.';
            return;
        }

        loading = true;

        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(response => response.json())
        .then(data => {
            loading = false;
            if (data.success) {
                userStore.set(data.user);
                jobsStore.set(data.jobs);
                settingsStore.set(data.settings);
                goto("/account");
            } else {
                error = data.message;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            error = 'An error occurred while logging in.';
        });

    }

    import LoadingIcon from '~icons/svg-spinners/pulse-2';

</script>

<div class="login-outer">
    <div class="login-header">
        <h2>Login</h2>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required>
        </div>
        <div class="error">
            {#if error}
                {error}
            {/if}
        </div>
        <div class="form-group">
            <button 
                on:click={handleSubmit}
                on:keydown={handleSubmit}
                tabindex="0" 
                type="submit">Login
                {#if loading}
                <LoadingIcon/>
                {/if}
            </button>
        </div>
        <div class="forgot-password-container">
            <a href="/forgot-password">Forgot password?</a>
        </div>
    </form>
</div>

<style lang="scss">

    @import "../../styles/login.scss";
    .forgot-password-container {
        margin-top:3rem;
    }

    button {
        display:flex;
        flex-direction: row;
        align-items: center;
        gap:10px;

        svg {
            transform:translateY(1px);
        }
    }


</style>