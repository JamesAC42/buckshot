<script>

    export let activePage = 1;
    export let pageAmt = 1;
    export let onPageSelect = (page) => {};

    function handlePageClick(page) {
        if(onPageSelect) {
            onPageSelect(page);
        }
    }

    $: pageList = (pageAmt) => {
        let l = [];
        for(let i = 0; i < pageAmt; i++) {
            l.push(i + 1);
        }
        return l;
    }

</script>

<div class="result-pages">
    {#each pageList(pageAmt) as page (page)}
        <div
            on:click={() => handlePageClick(page)}
            on:keydown={() => handlePageClick(page)}
            tabindex="0"
            role="button"
            class="result-page {activePage === page ? 'active' : ''}"
        >
            <div class="section-background"></div>
            <div class="result-page-inner">
                {page}
            </div>
        </div>
    {/each}
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .result-pages {
        @include wrap-flex-row;
        align-items: center;
        gap: 0.5rem;
        .result-page {
            position: relative;
            cursor: pointer;
            @include pop-in-transition;
            .section-background {
                opacity: 0;
            }
            .result-page-inner {
                padding: 0.4rem 0.7rem;
                background: $secondary-color;
                border-radius: 0.5rem;
                transition: all 0.1s linear;
                border: 1px solid $secondary-color;
            }
            &:hover {
                .result-page-inner {
                    background: $primary-color;
                    color: $secondary-color;
                }
            }

            @keyframes shadow-drop {
                0% {
                    transform:none;
                }
                100% {
                    transform:translate(-2px, 2px);
                }
            }
            &.active {
                .section-background {
                    opacity: 1;
                    animation: shadow-drop 0.1s
                        cubic-bezier(0.68, -0.55, 0.265, 1.55) 1;
                }
                .result-page-inner {
                    border: 1px solid $primary-color;
                    border-radius: 5px;
                }
                &:hover {
                    .result-page-inner {
                        background: $secondary-color;
                        color: $primary-color;
                    }
                }
            }
        }
    }
</style>
