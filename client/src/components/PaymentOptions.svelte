<script>
    import Diamond from "~icons/cil/diamond";
    import HandCoin from "~icons/mdi/hand-coin";
</script>

<div class="buy">
  <div class="buy-card">
    <div class="buy-title">Credits</div>
    <div class="buy-pricing">
      <div class="amount">$5</div>
      <div class="frequency">/ credit</div>
    </div>
    <div class="purchase-button">Buy Now</div>
    <div class="transaction-items">
      <ul>
        <li>
          1 credit = 3 resumes (or cover letters if you have a premium
          subscription)
        </li>
      </ul>
    </div>
    <div class="buy-icon">
      <HandCoin />
    </div>
  </div>
  <div class="buy-card premium">
    <div class="buy-title">Premium</div>
    <div class="buy-pricing">
      <div class="amount">$15</div>
      <div class="frequency">/ month</div>
    </div>
    <div class="purchase-button">Subscribe</div>
    <div class="transaction-items">
      <ul>
        <li>5 tokens per month (15 resumes)</li>
        <li>No ads</li>
        <li>Generate cover letters</li>
        <li>Use additional models (GPT-4-Turbo and Claude Opus)</li>
        <li>Access to community chat and forum</li>
      </ul>
    </div>
    <div class="buy-icon">
      <Diamond />
    </div>
  </div>
</div>

<style lang="scss">

    @import "../styles/mixins.scss";


    .buy {
        width: 100%;
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        .buy-card {
            @include pop-in-transition;
            flex: 1;
            padding: 2rem;
            border-radius: 0.5rem;
            background: $primary-color;
            color: $secondary-color;
            position: relative;
            min-width: 12rem;

            &.premium {
                background: #484bff;
                color: $secondary-color;
                box-shadow: 0 0 15px 2px #484bff;
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
            .buy-icon {
                position: absolute;
                top: 0;
                right: 0;
                margin: 0.8rem;
                font-size: 1.2rem;
            }
        }
    }
</style>
