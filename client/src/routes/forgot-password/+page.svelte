<script>
    import Button from "../../components/Button.svelte";
    import Navbar from "../../components/Navbar.svelte";

    let email = '';
    let error = '';
    let success = '';
    let loading = false;

    function requestNewPassword() {

        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
            error = 'Please enter a valid email address.';
            return;
        }

        loading = true;
        fetch('/api/sendResetPasswordEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email
            }),
        })
        .then(response => response.json())
        .then(data => {
            loading = false;
            if (data.success) {
                email = "";
                error = "";
                success = "Email sent."
            } else {
                error = data.message;
                success = "";
            }
        });
    }

</script>

<svelte:head>
    <title>Forgot Password</title> 
</svelte:head>

<Navbar/>

<div class="forgot-password">

    <h2>Forgot Password</h2>

    <p>If you can't remember your password, enter your email to request a link to reset it.</p>
    <input
        placeholder="Please enter your email..." 
        type="email" id="email" bind:value={email}
        maxlength="100">

    <div class="button-outer">
        <Button 
            buttonText="Send Email"
            loading={loading}
            onClick={() => requestNewPassword()}/>
    </div>

    {#if error}
    <p class="error">{error}</p>
    {/if}

    {#if success}
    <p class="success">{success}</p>
    {/if}

</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .forgot-password {
        @include center-fixed-container;
        text-align:center;
        input {
            font-family: "Questrial";
            padding:0.4rem;
            border-radius:0.4rem;
            outline:none;
            text-align:center;
            border:1px solid $primary-color;
            width:50%;
        }
        .button-outer {
            @include flex-center-row;
        }

        p.error {
            color:$error-color;
        }
    }

</style>

