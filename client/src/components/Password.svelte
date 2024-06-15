<script>
    
    import Circle from "~icons/ic/baseline-circle";

</script>

<div class="password">
    <div class="circle">
        <Circle/>
    </div>
    <div class="circle">
        <Circle/>
    </div>
    <div class="circle">
        <Circle/>
    </div>
    <div class="circle">
        <Circle/>
    </div>
    <div class="circle">
        <Circle/>
    </div>
</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    @keyframes bounce {
        0% { 
            transform:translateY(2px);
        }
        50% { 
            transform:translateY(-5px);
        }
        90% {
            transform:translateY(8px);
        }
        100% { 
            transform:translateY(2px);
        }
    }

    .password {
        font-size:0.7rem;
        border:1px solid #cfcfcf;
        border-radius:0.4rem;
        padding:0.2rem 0.4rem;
        width:fit-content;
        @include flex-center-row;
        align-items: center;
        cursor:pointer;
        .circle {
            float:left;
            transform:translateY(2px);
        }
        &:hover {
            border:1px solid #595959;
            .circle:first-child {
                animation:bounce .3s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                animation-delay: 0;
            }
            .circle:nth-child(2) {
                animation:bounce .3s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                animation-delay: .02s;
            }
            .circle:nth-child(3) {
                animation:bounce .3s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                animation-delay: .04s;
            }
            .circle:nth-child(4) {
                animation:bounce .3s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                animation-delay: .06s;
            }
            .circle:nth-child(5) {
                animation:bounce .3s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
                animation-delay: .08s;
            }
        }
    }

</style>