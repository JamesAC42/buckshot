<script>
    import { onMount } from 'svelte';

    const loremText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborumLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..`;

    const resultText = 
`John Doe
Software Engineer
john.doe@example.com | (123) 456-7890 | LinkedIn: linkedin.com/in/johndoe

Summary
--------
Highly skilled software engineer with 5+ years of experience in developing scalable web applications and working 
across the full stack. Proficient in modern frameworks and technologies, with a strong background in computer 
science and a passion for continuous learning and improvement.

Experience
-----------
Software Engineer
Tech Solutions Inc., San Francisco, CA
June 2018 - Present
- Developed and maintained web applications using React, Node.js, and MongoDB.
- Led a team of 5 developers in the design and implementation of a new microservices 
    architecture, resulting in a 30% increase in system performance.
- Collaborated with cross-functional teams to define, design, and ship new features.
- Implemented automated testing and continuous integration pipelines, reducing deployment times by 50%.

Junior Software Engineer
Innovative Apps, New York, NY
July 2015 - May 2018
- Assisted in the development of mobile applications using Swift and Kotlin.
- Participated in code reviews and contributed to the improvement of coding standards and best practices.
- Worked closely with the UX/UI team to ensure a seamless user experience.
- Debugged and resolved software defects, improving application stability and performance.

Education
-----------
Master of Science in Computer Science
University of California, Berkeley, CA
Graduated: May 2015

Bachelor of Science in Computer Science
University of California, Berkeley, CA
Graduated: May 2013

Skills
-------
- Programming Languages: JavaScript, Python, Java, Swift, Kotlin
- Frameworks: React, Node.js, Express, Django, Spring Boot
- Databases: MongoDB, MySQL, PostgreSQL
- Tools: Git, Docker, Jenkins, AWS, Kubernetes
- Agile methodologies, Test-Driven Development (TDD), Continuous Integration/Continuous Deployment (CI/CD)

Certifications
---------------
- AWS Certified Solutions Architect
- Certified Kubernetes Administrator (CKA)

Projects
---------
- E-commerce Platform: Developed a full-stack e-commerce platform using React, Node.js, and MongoDB,
    handling over 10,000 transactions per day.
- Chat Application: Built a real-time chat application using WebSocket and Node.js, supporting 
    thousands of concurrent users.

References
-----------
Available upon request.`;

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
                enableLoading={true}></Button>
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

</style>