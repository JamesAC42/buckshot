<script>
    import Button from "../../components/Button.svelte";
  import Footer from "../../components/landing sections/Footer.svelte";
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

    <div class="forgot-bumper"></div>

    <Footer />
</div>


<style lang="scss">

    @import "../../styles/mixins.scss";

    .forgot-password {
        text-align:center;
        max-height:calc(100dvh - 5rem);
        overflow-y:auto;
        h2 {
            margin-top:5rem;
        }
        p {
            padding:0 3rem;
        }
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

        .forgot-bumper {
            min-height:5rem;
        }

        p.error {
            color:$error-color;
        }
    }
    @media screen and (max-width: 600px) {

        .forgot-password {
            p {
                padding:0 1rem;
            }
            input {
                width:80%;
            }
        }
    }

</style>

