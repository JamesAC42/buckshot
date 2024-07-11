<script>
    
    import Section from "./Section.svelte";
    import Close from "~icons/material-symbols/tab-close-rounded"

    export let message = "";
    export let onClose = () => {}

</script>

<div class="modal-outer">
    <div class="modal-inner">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
            
            on:click={onClose} 
            class="modal-background"></div>
        <div class="modal-content">
            <Section>
                <div class="modal-message">
                    {message}
                </div>
                <div class="modal-close">
                    <div
                        on:click={onClose}
                        on:keydown={(e) => {if(e.key === "Enter") onClose()}}
                        tabindex="0"
                        role="button" 
                        class="modal-close-button">
                        <div class="btn-label">Close</div>
                        <div class="btn-icon"><Close/></div>
                    </div>
                </div>
            </Section>
        </div>
    </div>
</div>

<style lang="scss">

    @import "../styles/mixins.scss";

    .modal-outer, .modal-inner, .modal-background {
        height:100dvh;width:100dvw;
    }

    .modal-outer {
        @include center-fixed;
        z-index:1000;
        .modal-inner {
            position:relative;
            .modal-background,
            .modal-content {
                position:absolute;
                top:50%;left:50%;
                transform:translate(-50%,-50%);
            }
            .modal-background {
                background:#ffffffdd;
                animation:modal-appear .1s cubic-bezier(0.445, 0.05, 0.55, 0.95) 1;
            }
            .modal-content {
                animation:modal-fade-in .2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;
            }
            .modal-message {
                padding:1rem;
                width:20rem;
                margin:0 auto;
                font-size:1.1rem;
            }
            .modal-close {
                padding:1rem;
                padding-top:0;
                .modal-close-button {
                    width:fit-content;
                    margin-left:auto;
                    @include simple-button;
                }
            }
        }
    }

</style>