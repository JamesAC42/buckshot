<script>
    import { onMount } from 'svelte';
    import { authGuard } from '$lib/authGuard';

    let user = null;
    onMount(async () => {
        user = await authGuard();
    });

    const resultText = "asdf";

    let loading = writable(false);
    let remainingGenerations = writable(10);
    
    let cancel = false;
    
    function streamText() {
        let index = 0;
        cancel = false;
        output.update(value => "");
        loading.set(true);
        remainingGenerations.update(value => {
            if(value === 0) return value;
            return value - 1;
        });
        setTimeout(() => { 
            streamTextR(index);
            loading.set(false);
        }, 2000);    
    }

    function streamTextR(index) {
        if(cancel) return;
        output.update(value => value + resultText.substring(index, index + 3));
        index+=3;
        setTimeout(() => streamTextR(index), 1);
    }

    import Navbar from "../../components/Navbar.svelte";
    import Button from '../../components/Button.svelte';
    import Section from '../../components/Section.svelte';
    import Tabs from '../../components/shoot/Tabs.svelte';
    import TextArea from '../../components/TextArea.svelte';

    import CheckBoxOutline from '~icons/material-symbols/check-box-outline-blank';
    import CheckBoxFilled from '~icons/material-symbols/check-box-rounded';
    import Trash from '~icons/ph/trash';

    import Loading from '~icons/svg-spinners/pulse-2';

    import { writable } from 'svelte/store';
    import Settings from '../../components/shoot/Settings.svelte';

    let activePage = writable(1);
    let output = writable('');
    let pages = [1,2,3,4,5,6,7,8,9,10]

    function handlePageClick(page) {
        activePage.set(page);
        output.set("");
        cancel = true;
    }

    let templateItems = 
    [
        "Education",
        "Work History",
        "Objective",
        "Skills",
        "Volunteering",
        "Certifications",
        "Awards",
        "Academic Achievements",
        "References",
        "Hobbies",
        "Projects",
        "Websites",
        "Contact Info",
        "Other Stuff (Smart)"
    ]

    let activeTemplateItems = writable({
        "Education":1,
        "Work History":1,
        "Projects":1,
        "Contact Info":1,
        "Skills":1,
        "Certifications":1
    });
    
    function toggleTemplateItem(item) {
        if(!item) return;
        if(typeof(item) !== "string") return;
        // @ts-ignore
        activeTemplateItems.update(items => {
            if(items[item]) {
                // @ts-ignore
                const { [item]: _, ...rest } = items;
                return rest;
            } else {
                return { ...items, [item]: 1 };
            }
        });
    }

</script>

<svelte:head>
    <title>buckshot</title> 
</svelte:head>

<Navbar/>

{#if user}
    <div class="container">
        
        <Tabs />

        <div class="input-container">

            <input type="text" class="job-name-field" placeholder="Job Title...">

            <div class="delete-space" title="Delete Workspace">
                <Trash/>
            </div>

            <div class="spacer"></div>

            <p>Enter information about yourself here. Just list out the important points — no need for polished sentences or perfect grammar. Buckshot will handle the rewording for you. Simply provide a straightforward list of your qualifications, such as education, work history, skills, notable accomplishments, and anything else you would like to include.</p>
            <TextArea placeholder="E.g., 'Software engineer, Master's in Computer Science, cloud computing certification, led 10-person developer team.'"/>
            <div class="spacer"></div>
            <p>Provide specific details about the job role you are applying for, including required qualifications, skills, and work experience as outlined in the job description. Additionally, you may include insights into the company's culture, values, and mission to tailor your application more closely to the organization. Feel free to just copy paste from LinkedIn or wherever the details are from.</p>
            <TextArea placeholder="E.g., 'Seeking a seasoned graphic designer with a minimum of 5 years experience in brand development, proficient in Adobe Creative Suite, and familiar with web design principles. The ideal candidate aligns with our company's commitment to sustainability and innovation.'"/>

            <div class="spacer"></div>

            <div class="template-section">
                <div class="template-section-description">
                    Toggle which sections of the resume you would like to include and which sections to leave out.
                </div>
                <div class="template-section-items">
                    {#each templateItems as item (item)}
                        <div 
                            class="template-section-item {$activeTemplateItems[item] ? 'active' : ''}" 
                            on:click={() => toggleTemplateItem(item)}
                            on:keydown={(event) => {if (event.key === 'Enter') toggleTemplateItem(item)}}
                            tabindex="0"
                            role="button"
                            aria-pressed={$activeTemplateItems[item] ? 'true' : 'false'}>
                            {#if $activeTemplateItems[item]}
                                <CheckBoxFilled/>
                            {:else}
                                <CheckBoxOutline/>
                            {/if}
                            {item}
                        </div>
                    {/each}
                </div>
            </div>

            <div class="spacer"></div>

            <div class="generate-section">
                <Button 
                    onClick={() => streamText()}
                    buttonText="Generate" 
                    loading={$loading}></Button>
                <div class="generate-remaining">
                    <strong>{$remainingGenerations}</strong> remaining
                </div>
            </div>

            <div class="spacer"></div>

            <div class="result-pages">
                {#each pages as page (page)}
                    <div
                        on:click={() => handlePageClick(page)}
                        on:keydown={() => handlePageClick(page)}
                        tabindex="0"
                        role="button"
                        class="result-page {$activePage === page ? 'active' : ''}">
                        <div class="section-background"></div>
                        <div class="result-page-inner">
                            {page}
                        </div>
                    </div>
                {/each}
            </div>

            <div class="spacer"></div>

            <Section>
                {#if $loading}
                    <div class="loading-output">
                        <Loading />
                        Generating
                        <Loading />
                    </div>
                {:else}
                    <pre class="output-inner">
                        {$output}
                    </pre>
                {/if}
            </Section>

            <div class="input-container-footer"></div>

        </div>

        <Settings/>

    </div>
{:else}
    <p class="redirecting">Redirecting...</p>
{/if}

<style lang="scss">

    @import "../../styles/variables.scss";
    @import "../../styles/mixins.scss";

    @mixin wrap-flex-row {
        display:flex;
        flex-direction: row;
        flex-wrap: wrap;
        width:100%;
    }

    .input-container {
        
        flex:1;
        position: relative;

        .delete-space {
            position:absolute;
            top:0;right:0;
            padding:0.4rem 0.5rem 0.2rem 0.5rem;
            border-radius:0.5rem;
            font-size:1.3rem;
            transition:all .2s ease-in-out;
            cursor:pointer;
            transform:translate(0,50%);
            svg {
                transform:translate(0,10px);
            }
            &:hover {
                background:$primary-color;
                color:$secondary-color;
            }
        }

        .generate-section {
            display:flex;
            flex-direction: row;
            align-items:center;
            justify-content: center;
            gap:1rem;
            margin-top:-0.9rem;
        }

        .template-section {
            margin-bottom:1rem;
            position: relative;
            .template-section-description {
                margin-bottom:0.5rem;
                text-align:center;
            }
            .template-section-items {
                @include wrap-flex-row;
                justify-content: center;
                gap:0.5rem;
                width:100%;
                .template-section-item {
                    cursor:pointer;
                    display:flex;
                    flex-direction: row;
                    align-items:center;
                    padding:0.3rem 0.8rem;
                    gap:0.5rem;
                    border-radius:0.3rem;
                    transition:all .1s ease-in-out;
                    
                    &:hover, &.active {
                        background:$primary-color;
                        color:$secondary-color;
                    }

                    &:hover {
                        opacity:0.6;
                    }
                }
            }
        }

        input.job-name-field {
            padding:1rem 0;
            font-size:1.4rem;
            border:none;
            width:calc(#{$input-section-width} - 10vw  + 2rem);
            border-bottom:1px solid $primary-color;
            font-family: 'Questrial',sans-serif;
            color:$primary-color;
        }
        
        input.job-name-field:focus {
            outline:none;
        }

        .spacer {
            height:0.7rem;
        }
        
        p {
            margin:1rem 0;
            width:$input-section-width;
            color:$primary-color;
        }

        .loading-output {
            @include flex-center-row;
            margin:1rem 0;
        }

        pre {
            padding:0 1rem;
            width:calc(#{$input-section-width} - 3rem);
            white-space:pre-line;
            word-wrap:break-word;
            font-family:"PT Mono",monospace;
        }

        .input-container-footer {
            height:3rem;
        }

        @keyframes shadow-drop {
            0% {
                transform:none;
            }
            100% {
                transform:translate(-2px, 2px);
            }
        }

        .result-pages {
            @include wrap-flex-row;
            align-items: center;
            gap:0.5rem;
            .result-page {
                position:relative;
                cursor:pointer;
                @include pop-in-transition;
                .section-background {
                    opacity:0;
                }
                .result-page-inner {
                    padding:0.4rem 0.7rem;
                    background:$secondary-color;
                    border-radius:0.5rem;
                    transition:all .1s linear;
                    border:1px solid $secondary-color;
                }
                &:hover {
                    .result-page-inner {
                        background:$primary-color;
                        color:$secondary-color;
                    }
                }
                &.active {
                    .section-background {
                        opacity:1;
                        animation:shadow-drop .1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 1;
                    }
                    .result-page-inner {
                        border:1px solid $primary-color;
                        border-radius:5px;
                    }
                    &:hover {
                        .result-page-inner {
                            background:$secondary-color;
                            color:$primary-color;
                        }
                    }
                }
            }
        }

    }

    p.redirecting {
        margin-top:10rem;
        font-size:1.5rem;
        text-align:center;
    }

</style>