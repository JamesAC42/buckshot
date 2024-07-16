<script>
    import Person from "~icons/material-symbols/person-pin-rounded";
    import { userStore } from '../../stores/stores.js';
    import { onDestroy, onMount } from 'svelte';
    import TestimonialItem from "../TestimonialItem.svelte";
    import { writable } from "svelte/store";
    import getFetch from "$lib/getFetch";
    import postFetch from "$lib/postFetch";
    
    import LoadingIcon from '~icons/svg-spinners/pulse-2';

    export let active = false;
    
    let user = null;
    let unsubscribe = null;

    let name = "";
    let comment = "";

    let testimonials = writable([]); 
    let error = writable("");

    let loadingData = writable(true);
    let loadingSubmit = writable(false);

    onMount(async () => {
        unsubscribe = userStore.subscribe(value => {
            user = value;
        });

        let response = await getFetch("/api/testimonials");
        loadingData.set(false);
        if(response.success) {
            testimonials.set(response.data);
        }

    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    async function submitTestimonial() {
        if($loadingSubmit || $loadingData) return;
        error.set("");
        if(!comment.trim()) {
            error.set("Enter a comment.");
            return;
        }
        loadingSubmit.set(true);
        let response = await postFetch("/api/addTestimonial", {name, comment});
        loadingSubmit.set(false);
        if(response.success) {
            
            name = "";
            comment = "";

            testimonials.update(old => {
                old = [response.data, ...old];
                return old;
            });

        } else {
            error.set(response.message);
        }
    }

    let userSubmitted = false;
    let charCount = 0;
    $: {
        charCount = comment.length;
        if(testimonials) {
            if($testimonials.length > 0) {
                for(let i = 0; i < $testimonials.length; i++) {
                    if($testimonials[i].userId === user.id) {
                        userSubmitted = true;
                        break;
                    }
                }
            }    
        }
    }
</script>

{#if active}
<div class="testimonials-outer">

    <div class="header">
        <div class="header-icon">
            <Person />
        </div>
        <div class="header-text">
            <h3>Testimonials</h3>
        </div>
    </div>

    <div class="testimonials-content">
        {#if user}
            <div class="testimonials-input">
                <div class="testimonial-promo-message">
                    Liking buckshot? Submit a testimonial and get 5 free resume generations.
                </div>
                <div class="testimonial-label">Name/Initials (Optional)</div>
                <div class="testimonial-name-input">
                    <input
                        disabled={userSubmitted}
                        bind:value={name} 
                        type="text" 
                        placeholder="John S." 
                        maxlength={20}>
                </div>
                <div class="testimonial-label">Comment</div>
                <div class="testimonial-text-input">
                    <textarea
                        disabled={userSubmitted}
                        bind:value={comment} 
                        placeholder="Enter testimonial" 
                        maxLength={500}/>
                </div>
                <div class="testimonial-comment-length">
                    {charCount}/500
                </div>
                {#if userSubmitted}
                <div class="user-already-submitted">
                    You can only write 1 testimonial.
                </div>
                {/if}
                <div class="testimonial-submit">
                    <div
                        on:click={submitTestimonial}
                        on:keydown={(e) => {if(e.key === "Enter") submitTestimonial() }}
                        role="button"
                        tabindex="0"
                        class:disabled={userSubmitted || $loadingSubmit}
                        class="testimonial-submit-button">
                        {#if $loadingSubmit}
                            <div class="btn-icon"><LoadingIcon/></div>
                        {/if}
                        <div class="btn-label">Submit</div>
                    </div>
                </div>
            </div>
        {/if}
        <div class="testimonials-list">

            {#each $testimonials as t}
                <TestimonialItem comment={t.comment} author={t.name} background={false}/>
            {/each}
            {#if $testimonials.length === 0 && !$loadingData}
                <div class="no-testimonials">Nothing to show yet.</div>
            {/if}
            {#if $loadingData}
                <div class="loading-testimonials">
                    <div class="loading-icon"><LoadingIcon/></div>
                    <div class="loading-text">Loading testimonials...</div>
                    <div class="loading-icon"><LoadingIcon/></div>
                </div>
            {/if}
        </div>
    </div>

</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .testimonials-outer {

        @include connect-section-inner;

        .testimonials-content {
            margin-top:2rem;
            display:flex;
            flex-direction: row;
            justify-content: center;
            gap:1rem;
            .testimonials-input {
                position:sticky;
                top:2rem;
                margin-left:2rem;
                min-width:15rem;
                max-width:22rem;
                background:#f6f6f6;
                border-radius:1rem;
                height:fit-content;
                padding:2rem;
                .testimonial-promo-message {
                    font-size:1.09rem;
                }
                .testimonial-label {
                    margin:0.5rem 0;
                    font-weight:800;
                }
                .testimonial-name-input {
                    input {
                        width:calc(100% - 1rem);
                        @include text-input;
                    }
                }
                .testimonial-text-input {
                    textarea {
                        width:calc(100% - 1rem);
                        height:10rem;
                        resize:none;
                        @include text-input;
                    }
                }
                .testimonial-comment-length {
                    text-align:right;
                    padding:0.5rem 0;
                }
                .user-already-submitted {
                    text-align:center;
                }
                .testimonial-submit {
                    margin-top:0.5rem;
                    .testimonial-submit-button {
                        @include simple-button;
                        padding:0.2rem 0 0.4rem 0;
                    }
                }
            }
            .testimonials-list {
                flex:1;
                display:flex; 
                flex-direction: row;
                flex-wrap:wrap;
                gap:1rem;
                justify-content: center;
                min-width:30rem;
            }

            .no-testimonials,
            .loading-testimonials {
                background:#f6f6f6;
                padding:2rem;
                height:fit-content;
                width:100%;
                text-align:center;
                border-radius:1rem;
            }

            .loading-testimonials {
                @include flex-center-row;
                gap:0.5rem;
            }
        }
    }

</style>