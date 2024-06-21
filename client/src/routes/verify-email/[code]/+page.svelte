<script>
    import { page } from "$app/stores";
    import { goto } from '$app/navigation';
    import { onMount } from "svelte";
    import { userStore } from "../../../stores/stores";
    import { authGuard } from "../../../lib/authGuard";
    import Navbar from "../../../components/Navbar.svelte";

    let loading = true;
    let success = false;

    onMount(async () => {
        const { code } = $page.params;
        let user = await authGuard();

        if (user && code) {
            const response = await fetch('/api/verifyEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ code })
            });

            const data = await response.json();

            if (data.success) {
                success = true;
                userStore.update((oldUser) => {
                    user.verified = true;
                    return user;
                })
            } else {
                success = false;
            }

            loading = false;
            setTimeout(() => {
                goto('/account');
            }, 2000)

        }
    });
</script>

<Navbar/>

{#if loading}
<p>Verifying email...</p>
{:else if success}
<p>Verification successful, redirecting...</p>
{:else}
<p>Invalid verification link, redirecting...</p>
{/if}

<style>
    p {
        text-align:center;
        margin-top:8rem;
        font-size:1.5rem;
    }
</style>