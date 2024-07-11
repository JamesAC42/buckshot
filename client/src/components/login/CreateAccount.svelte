<script>

    import {onMount, onDestroy} from "svelte";

    import {userStore,jobsStore,settingsStore} from "../../stores/stores.js";
    import { goto } from "$app/navigation";
    import serializeJobInput from "$lib/serializeJobInput";

    let username = '';
    let email = '';
    let password = '';
    let passwordConfirm = '';
    let error = '';

    let loading = false;

    function handleSubmit(token) {

        if (!username || !email || !password || !passwordConfirm) {
            error = 'All fields are required.';
            return;
        }

        if (username.length < 3) {
            error = 'Username must be at least 3 characters long.';
            return;
        }

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            error = 'Please enter a valid email address.';
            return;
        }

        if (password.length < 6) {
            error = 'Password must be at least 6 characters long.';
            return;
        }

        if (password !== passwordConfirm) {
            error = 'Passwords do not match.';
            return;
        }

        loading = true;

        fetch('/api/createAccount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password,
                passwordConfirmation: passwordConfirm,
                token: token
            }),
        })
        .then(response => response.json())
        .then(data => {
            loading = false;
            if (data.success) {
                userStore.set(data.user);
                const newJobs = serializeJobInput(data.jobs);
                jobsStore.set(newJobs);
                settingsStore.set(data.settings);
                goto("/account");
            } else {
                error = data.message;
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    }

    onMount(() => {
        window.handleSubmit = handleSubmit;
    });
    
    onDestroy(() => {
        window.handleSubmit = null;
    });

    import LoadingIcon from '~icons/svg-spinners/pulse-2';

</script>

<svelte:head>
    <script src="https://www.google.com/recaptcha/api.js?badge=inline"></script>
</svelte:head>

<div class="login-outer">
    <div class="login-header">
        <h2>Create Account</h2>
    </div>
    <form on:submit|preventDefault={handleSubmit}>
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required>
        </div>
        <div class="form-group">
            <label for="password">Username:</label>
            <input type="text" id="password" bind:value={username} required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" bind:value={password} required>
        </div>
        <div class="form-group">
            <label for="password">Confirm Password:</label>
            <input type="password" id="password" bind:value={passwordConfirm} required>
        </div>
        <div class="error">
            {#if error}
                {error}
            {/if}
        </div>
        <div class="spacer">
        </div>
        <div class="form-group">
            <button
                class="g-recaptcha"
                data-sitekey="6Lcg3ukpAAAAAFarx06kCYsl8xt14ec8-mDEsx2Q"
                data-callback='handleSubmit'
                data-action='submit'
                type="submit">Create Account
                {#if loading}
                <LoadingIcon />
                {/if}
            </button>
        </div>
    </form>
</div>

<style lang="scss">
    @import "../../styles/login.scss";

    .spacer {height:2rem;}

</style>