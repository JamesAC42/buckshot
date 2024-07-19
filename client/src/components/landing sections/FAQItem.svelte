<script>
    import { writable } from "svelte/store";
    import Section from "../Section.svelte";

    export let question = "";
    export let answer = "";

    import DownArrow from "~icons/ic/baseline-expand-circle-down";

    let showAnswer = writable(false);

    function toggleAnswer() {
        showAnswer.set(!$showAnswer);
    }

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    on:click={toggleAnswer}
    class="faq-item">
    <Section fillWidth>
        <div class="faq-item-inner" class:expand={!$showAnswer}>
            <div class="faq-question">
                <div class="faq-question-text">
                    {question}
                </div>
                <div class="faq-question-arrow" class:flip={$showAnswer}>
                    <div class="icon">
                        <DownArrow/>
                    </div>
                </div>
            </div>
            {#if $showAnswer}
            <div class="faq-answer">
                {answer}
            </div>
            {/if}
        </div>
    </Section>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss"; 

    .faq-item {
        cursor:pointer;
        .faq-item-inner {
            width:50rem;
            @include flex-center-col;
            font-size:1.2rem;
            transition:padding 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    
            .faq-question {
                padding:1rem;
                @include flex-center-row;
                gap:2rem;
                align-items: center;
                .faq-question-text {
                    font-weight:800;
                }
                .faq-question-arrow {
                    margin-left:auto;
                    .icon {
                        @include flex-center-row;
                        justify-content: center;
                        align-items:center;
                        height:fit-content;
                        transition:color .1s ease-in-out;
                    }
                    &.flip {
                        .icon {
                            transform: rotate(180deg);
                        }
                    }
                }
            }
    
            @keyframes show-answer {
                0% {
                    transform:translateY(20px);
                    filter: blur(10px);
                }
                100% {
                    max-height:50rem;
                    transform:translateY(0);
                    filter: none;
                }
            }
            .faq-answer {
                overflow:hidden;
                width:calc(100% - 2rem);
                padding:1rem;
                height:fit-content;
                animation:show-answer 0.1s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
            }
            
        }
        &:hover {
            .faq-item-inner.expand {
                padding-bottom:0.5rem;
            }
            .icon {
                color:#4f6aef;
            }
        }
    }


</style>