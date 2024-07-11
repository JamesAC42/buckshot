<script>
    import Diamond from "~icons/cil/diamond";
    import HandCoin from "~icons/mdi/hand-coin";
    import Check from "~icons/material-symbols/check-circle";
</script>

<div class="buy">
  <div class="buy-card free">
    <div class="buy-title">Free</div>
    <div class="buy-pricing">
      <div class="amount">$0</div>
      <div class="frequency">/ month</div>
    </div>
    <div class="purchase-button">Account Required</div>
    <div class="transaction-items">
      <ul>
        <li>2 credits free (6 resumes)</li>
        <li>Manage up to 10 jobs at once</li>
        <li>Generate using state of the art language model GPT-4O</li>
        <li>Limited access to community features</li>
      </ul>
    </div>
    <div class="buy-icon">
      <Check />
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
        <li>Generate cover letters</li>
        <li>5 free tokens per month (15 resumes/ cover letters)</li>
        <li>Manage unlimited jobs at once</li>
        <li>Access to additional frontier language models (GPT-4-Turbo and Claude 3.5 Sonnet)</li>
        <li>Full access to community chat and forum</li>
      </ul>
    </div>
    <div class="buy-icon">
      <Diamond />
    </div>
  </div>
  
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
          3 resumes (or cover letters if you have a premium
          subscription)
        </li>
      </ul>
    </div>
    <div class="buy-icon">
      <HandCoin />  
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
            min-width: 16rem;

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
    }
</style>
