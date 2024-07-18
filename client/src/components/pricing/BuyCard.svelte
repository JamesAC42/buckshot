<script>

    export let buyClass = "";
    export let title = "";
    export let amount = "";
    export let frequency = "";

    export let onBuy = () => {}

    export let purchaseLabel = "";
    export let Icon = null;

</script>

<div class={"buy-card " + buyClass}>
    <div class="buy-title">{title}</div>
    <div class="buy-pricing">
        <div class="amount">${amount}</div>
        <div class="frequency">{(frequency ? "/ " : "") + frequency}</div>
    </div>
    <div
        on:click={onBuy} 
        on:keydown={(e) => { if(e.key === "Enter") onBuy() }}
        role="button"
        tabindex="0"
        class="purchase-button">{purchaseLabel}</div>
    <div class="transaction-items">
        <slot/>
    </div>
    {#if Icon}
    <div class="buy-icon">
        <Icon />
    </div> 
    {/if}
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .buy-card {
        @include pop-in-transition;
        flex: 1;
        padding: 2rem;
        border-radius: 0.5rem;
        background: $primary-color;
        color: $secondary-color;
        position: relative;
        min-width: 16rem;
        max-width: 20rem;
        min-height: 10rem;

        &.premium {
            background: #484bff;
            color: $secondary-color;
            box-shadow: 0 0 15px 2px #484bff;
            box-shadow: 0 0 20px 4px #484bff;
        }

        &.free {
            background:$secondary-color;
            color: $primary-color;
            border:1px solid $primary-color;

            .purchase-button {
                cursor:default;
                &:hover {
                    opacity:1;
                }
            }
        }

        .buy-title {
            font-size: 1.3rem;
            text-align: center;
            margin-bottom: 0.5rem;
        }
        .buy-pricing {
            @include flex-center-row;
            gap: 0.5rem;
            .amount {
                font-size: 1.8rem;
                font-weight: 600;
            }
            .frequency {
                margin-top: 0.2rem;
                font-size: 0.9rem;
            }
        }
        .purchase-button {
            border: 1px solid $secondary-color;
            background: $secondary-color;
            color: $primary-color;
            text-align: center;
            padding: 0.2rem 0;
            margin-top: 1rem;
            border-radius: 0.5rem;
            cursor: pointer;
            &:hover {
                opacity: 0.8;
            }
        }
        .transaction-items {
            ul {
                padding-left:1.8rem;
                padding-right:0.5rem;
            }
        }
        .buy-icon {
            position: absolute;
            top: 0;
            right: 0;
            margin: 0.8rem;
            font-size: 1.2rem;
        }
    }

</style>