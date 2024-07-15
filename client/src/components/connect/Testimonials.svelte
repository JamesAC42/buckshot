<script>
    export let active = false;
    import Person from "~icons/material-symbols/person-pin-rounded";
    import { userStore } from '../../stores/stores.js';
    import { onDestroy, onMount } from 'svelte';
    import TestimonialItem from "../TestimonialItem.svelte";

    let user = null;
    let unsubscribe = null;

    let name = "";
    let comment = "";

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

    let charCount = 0;
    $: {
        charCount = comment.length;
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
                        bind:value={name} 
                        type="text" 
                        placeholder="John S." 
                        maxlength={20}>
                </div>
                <div class="testimonial-label">Comment</div>
                <div class="testimonial-text-input">
                    <textarea
                        bind:value={comment} 
                        placeholder="Enter testimonial" 
                        maxLength={500}/>
                </div>
                <div class="testimonial-comment-length">
                    {charCount}/500
                </div>
                <div class="testimonial-submit">
                    <div class="testimonial-submit-button">
                        <div class="btn-label">Submit</div>
                    </div>
                </div>
            </div>
        {/if}
        <div class="testimonials-list">
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf aasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf aasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfasdf aasdf asdfasdf asdfasdf asdfasdf asdfasdf asdfassdf" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfjasdfasdfjasldkfj" author="james crovo" background={false}/>
            <TestimonialItem comment="asdfasdfjasldkfj" author="james crovo" background={false}/>
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
                .testimonial-submit {
                    margin-top:0.5rem;
                    .testimonial-submit-button {
                        @include simple-button
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
        }
    }

</style>