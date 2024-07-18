<script>

    import Landing from "../../components/Landing.svelte";
    import {userStore} from "../../stores/stores.js";
    import { getSession } from "$lib/getSession";
    import { onMount } from 'svelte';

    onMount(async () => {
        unsubscribe = userStore.subscribe(value => {
            user = value;
        });
        const sessionData = await getSession();
        if (sessionData.success) {
            userStore.set(sessionData.user);
        }
    });
    
</script>

<svelte:head>
    <title>buckshot</title> 
</svelte:head>
<Landing title="Thank you!" message="Your payment was processed successfully. Thank you for supporting the site!"/>