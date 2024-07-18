<script>
    import HandCoin from "~icons/mdi/hand-coin";

    import postFetch from "$lib/postFetch";
    import { userStore } from '../../stores/stores.js';
    import { onDestroy, onMount } from 'svelte';
    import { goto } from '$app/navigation';
    import BuyCard from "./BuyCard.svelte";

    let user = null;
    let unsubscribe = null;

    onMount(() => {
        unsubscribe = userStore.subscribe(value => {
            user = value;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    // test
    const productIds = {
        tier1: "price_1PdkytP7bDDw4hG26toOgjYB",
        tier2: "price_1PdkzBP7bDDw4hG2kU3HZUuB",
        tier3: "price_1PdkzNP7bDDw4hG29hqAt8Zs"
    }

    // // live 
    // const productIds = {
    //     tier1: "price_1Pc01wP7bDDw4hG2dLJcJOA0",
    //     tier2: "price_1PdkQzP7bDDw4hG2wVDjh0oQ",
    //     tier3: "price_1PdkRaP7bDDw4hG2m7H2tuRM"
    // }

    function buyCredits(tier) {
      const priceId = productIds[tier];
      checkout(priceId, 'payment');
    }

    async function checkout(priceId, mode) {

      if(user === null) {
        goto('/login');
        return;
      }

      let response = await postFetch("/api/createCheckoutSession", {priceId, mode});
      if(response.success) {
        window.location.href = response.url; 
      }

    }

</script>

<div class="buy">
   
    <BuyCard 
        buyClass=""
        title="Credits"
        amount={7}
        frequency=""
        purchaseLabel="Buy Now"
        onBuy={() => buyCredits("tier1")}
        Icon={HandCoin}>
        <ul>
            <li>Generate 15 resumes</li>
        </ul>
    </BuyCard>
    <BuyCard 
        buyClass="premium"
        title="Credits"
        amount={20}
        frequency=""
        purchaseLabel="Buy Now"
        onBuy={() => buyCredits("tier2")}
        Icon={HandCoin}>
        <ul>
            <li>Generate 50 resumes</li>
        </ul>
    </BuyCard>
    <BuyCard 
        buyClass="premium"
        title="Credits"
        amount={50}
        frequency=""
        purchaseLabel="Buy Now"
        onBuy={() => buyCredits("tier3")}
        Icon={HandCoin}>
        <ul>
            <li>Generate 150 resumes</li>
        </ul>
    </BuyCard>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";
    .buy {
        width:fit-content;
        margin:0 auto;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }
    
</style>