<script>
  import Diamond from "~icons/cil/diamond";
  import Check from "~icons/material-symbols/check-circle";

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

  function buyPremium() {
    //const priceId = "price_1Pc00JP7bDDw4hG2f2SgGmew";
    const priceId = "price_1PdNuVP7bDDw4hG2d9Ri6ntz";
    checkout(priceId, 'subscription');
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
    buyClass="free"
    title="Free"
    amount={0}
    frequency=""
    purchaseLabel="Account Required"
    Icon={Check}>
    <ul>
      <li>5 free resume generations</li>
      <li>Manage up to 10 jobs at once</li>
      <li>Generate using state of the art language model Claude 3.5 Sonnet</li>
    </ul>
  </BuyCard>
  <BuyCard 
    buyClass="premium"
    title="Premium"
    amount={15}
    frequency="month"
    purchaseLabel="Subscribe"
    onBuy={buyPremium}
    Icon={Diamond}>
    <ul>
      <li>Generate cover letters</li>
      <li>15 free resumes or cover letters per month</li>
      <li>Manage unlimited jobs at once</li>
      <li>Early access to additional language models</li>
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
