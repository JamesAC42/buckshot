<script>
    import { get, writable } from "svelte/store";
    import Navbar from "../../components/Navbar.svelte";

    import CreateAccount from "../../components/login/CreateAccount.svelte";
    import Login from "../../components/login/Login.svelte";
  import Footer from "../../components/landing sections/Footer.svelte";

    let mode = writable(0);

    const toggleMode = () => {
        if(get(mode)) {
            mode.set(0);
        } else {
            mode.set(1);
        }
    }

</script>

<Navbar/>

<div class="container-login-page">

    <div class="container-inner">

        <div class="container-background section-background"></div>
        <div class="container-content section-inner">
            <div class="logo-container">
                <img src="/images/logo.png" alt="Logo"/>
                <div 
                    on:keydown={toggleMode}
                    role="button"
                    aria-label="Switch between Login and Create Account mode"
                    tabindex="0"
                    on:click={toggleMode} 
                    class="switch-mode">
                    {$mode ? "Login" : "Create Account"}
                </div>
            </div>
        
            <div class="form-container">
                {#if $mode}
                    <CreateAccount />
                {:else}
                    <Login />
                {/if}
            </div>
        </div>
    </div>
    
    <div class="footer-outer">
        <Footer />
    </div>

</div>


<style lang="scss">

    @import "../../styles/mixins.scss";

    .container-login-page {
        @include center-fixed;
        padding:0;
        height:fit-content;
        .container-inner {
            position:relative;
            .container-background {
                transform:translate(-5px, 5px);
                border-radius:0.6rem;
            }
            .container-content {
                position:relative;
                display:flex;
                flex-direction:row;
                border-radius:0.5rem;
                align-items: stretch;
                padding:0;
                outline:1px solid $secondary-color;
                .logo-container {
                    background:#101010;
                    color:$secondary-color;
                    display:flex;
                    flex-direction: column;
                    justify-content:space-between;
                    border-radius:0.5rem 0 0 0.5rem;
                    img {
                        height:10rem;
                    }
                    .switch-mode {
                        text-align:center;
                        margin:1.45rem 0;
                        cursor:pointer;
                        &:hover {
                            text-decoration:underline;
                        }
                    }
                }
            }
        }

        .footer-outer {
            display:none;
        }
    }

    
    @media screen and (max-width: 500px) {

        .container-login-page {
            position:relative;
            width:100dvw;
            max-height:calc(100dvh - 5rem);
            left:0;
            top:0;
            transform:none;
            overflow-y:auto;

            .container-inner {
                .container-background {
                    display:none;
                }
                .container-content {
                    border:none;
                    width:100%;
                    border-radius:0;
                    flex-direction: column-reverse;
                    .logo-container {
                        flex-direction: row;
                        align-items:center;
                        margin:0 1rem;
                        border-radius:1rem;
                        margin-bottom:0rem;
                        img {
                            width:5rem;
                            border-radius:1rem;
                            height:auto;
                        }
                        .switch-mode {
                            margin-right:1rem;
                        }
                    }
                    .form-container {
                        width:calc(90dvw);
                        margin:0 auto;
                    }
                }
            }
            .footer-outer {
                display:block;
            }
        }

    }

</style>