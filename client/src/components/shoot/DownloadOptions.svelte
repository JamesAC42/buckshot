<script>
  
    import { writable } from "svelte/store";

    import Section from "../Section.svelte";
    import Slider from "../Slider.svelte";

    export let activeJob = "";
    export let activeOutput = null;
    export let closeDownloadOptions = () => {}

    import LoadingIcon from '~icons/svg-spinners/pulse-2';
    import DownloadIcon from '~icons/solar/download-outline';
    import CloseIcon from '~icons/material-symbols/tab-close-outline';
    import { mode } from "../../lib/userSettings";

    let isDownloading = false;
    let progress = 0;
    let error = null;

    let fonts = {
        "serif": 1,
        "sans-serif": 2
    }

    let selectedFont = writable(1);
    function updateSelectedFont(f) {
        selectedFont.set(fonts[f]);
    }

    async function downloadPDF() {
        
        if(isDownloading) return;

        isDownloading = true;
        progress = 0;
        error = null;

        if(!activeJob || !activeOutput || !activeOutput.id) {
            return;
        }

        try {

            let reqUrl = "/api/downloadOutput";
            reqUrl += "?jobId=" + activeJob + "&outputId=" + activeOutput.id;
            reqUrl += "&textStyle=" + ($selectedFont === 1 ? "serif" : "sans-serif");

            const response = await fetch(reqUrl);
            
            if (!response.ok) throw new Error('Network response was not ok');
            
            const contentLength = response.headers.get('Content-Length');
            let loaded = 0;
            
            const reader = response.body.getReader();
            const chunks = [];

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                
                chunks.push(value);
                loaded += value.length;
                progress = Math.round((loaded / contentLength) * 100);
            }

            const blob = new Blob(chunks, { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = activeJob + ".pdf";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

        } catch (e) {
            console.error('Download failed:', e);
            error = 'Download failed. Please try again.';
        } finally {
            isDownloading = false;
        }
    }

    let previewUrl = "";
    
    $: {
        previewUrl = "/images/download_examples/download_example_";
        if($selectedFont === 1) {
            if(activeOutput.mode === mode.COVER) {
                previewUrl += "serif_white_medium_letter.png";
            } else {
                previewUrl += "serif_white_medium.png";
            }
        } else {
            if(activeOutput.mode === mode.COVER) {
                previewUrl += "sansserif_white_medium_letter.png";
            } else {
                previewUrl += "sansserif_white_medium.png";
            }
        }
    }

</script>

<div class="download-options-outer">
    <div class="download-options-inner">

        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            on:click={closeDownloadOptions}
            class="download-options-background">
        </div>

        <div class="download-options-container">
            <Section fill>

                <div class="download-options-content">
                    <div class="download-preview">
                        <img src={previewUrl} alt="preview"/>
                    </div>
                    <div class="download-options-controls">
                        
                        <div class="option-label">Text Style</div>
                        <Slider
                            items={fonts}
                            selected={$selectedFont}
                            setSelected={updateSelectedFont}/>
                        <div class="spacer"></div>
                        <div class="spacer"></div>
                        <div class="spacer"></div>
                        
                        <div 
                            class={"download-button " + (isDownloading ? "disabled" : "")}
                            on:click={downloadPDF}
                            on:keydown={(e) => { if(e.key === "Enter") downloadPDF() }}
                            role="button"
                            tabindex="0">
                            {#if isDownloading}
                            <div class="label">
                                Downloading
                            </div>
                            <span class="icon"><LoadingIcon/></span>
                            {:else}
                            <div class="label">
                                Download
                            </div>
                            <span class="icon"><DownloadIcon/></span>
                            {/if}
                        </div>
                            
                        {#if isDownloading}
                            <div class="progress-container">
                                <span>{progress}%</span>
                                <progress value={progress} max="100"></progress>
                            </div>
                        {/if}
                            
                        {#if error}
                            <p class="error">{error}</p>
                        {/if}
                        <div
                            on:click={closeDownloadOptions}
                            on:keydown={(e) => {
                                if(e.key === "Enter" && closeDownloadOptions) closeDownloadOptions();
                            }}
                            tabindex="0"
                            role="button" 
                            class="close-button">
                            <div class="label">Close</div>
                            <span class="icon"><CloseIcon/></span>
                        </div>
                    </div>
                </div>
            </Section>

        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .download-options-outer {
        position:fixed;
        z-index:10000;
        height:100dvh;
        width:100dvw;
        top:0;left:0;
        z-index:1;
        z-index:2000;

        .download-options-inner {
            height:100dvh;width:100dvw;
            position:relative;
            z-index:1;

            .download-options-background {
                position:relative;
                height:100dvh;width:100dvw;
                background:#ffffffdd;
                z-index:1;
                animation:modal-appear .1s cubic-bezier(0.445, 0.05, 0.55, 0.95) 1;
            }

            .download-options-container {
                position:absolute;
                top:50%;left:50%;
                transform:translate(-50%,-50%);
                z-index:1000;
                max-height:80dvh;
                animation:modal-fade-in .2s cubic-bezier(0.175, 0.885, 0.32, 1.275) 1;

                .download-options-content {
                    display:flex;
                    flex-direction:row;
                    align-items:stretch;
                    overflow:hidden;
                    .download-preview {
                        height:100%;
                        border-right:1px solid $primary-color;
                        img {
                            max-height:80dvh;
                        }
                    }
                    .download-options-controls {
                        flex:1;
                        padding:0 2rem;
                        padding-top:1rem;
                        display:flex;
                        flex-direction:column;
                        justify-content:center;
                        align-items:stretch;
                        .option-label {
                            margin-bottom:0.5rem;
                        }
                        .slider {
                            margin-bottom:1rem;
                        }
                        .download-button, .close-button {
                            @include flex-center-row;
                            gap:0.5rem;
                            margin:0 auto;
                            border:1px solid $primary-color;
                            padding:0.4rem 1rem;
                            min-width:60%;
                            position:relative;
                            cursor:pointer;
                            text-align:center;
                            border-radius:0.3rem;
                            transition:all .1s ease-in-out;
                            &:hover {
                                background:$primary-color;
                                color:$secondary-color;
                                border-color:$secondary-color; 
                                outline:1px solid $primary-color;
                            }
                            &.disabled {
                                opacity:0.5;
                                cursor:default;
                            }
                            .label {
                                transform:translateY(3px);
                            }
                            span.icon {
                                transform:translateY(2px);
                            }
                        }
                        
                        .progress-container {
                            margin:0 auto;
                            margin-top:2rem;
                            @include flex-center-row;
                            gap:1rem;
                            progress {
                                -webkit-appearance: none;
                                appearance: none;
                                height: 18px; // Adjust this value to make it taller

                                &::-webkit-progress-bar {
                                    background-color: black;
                                    border-radius: 6px;
                                }

                                &::-webkit-progress-value {
                                    background-color: $primary-color;
                                    border-radius: 6px;
                                }

                                &::-moz-progress-bar {
                                    background-color: $primary-color;
                                    border-radius: 6px;
                                }
                            }
                        }

                        .close-button {
                            margin:auto auto 2rem auto;
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 910px) {
        
        .download-options-outer {
            .download-options-inner {
                .download-options-container {
                    .download-options-content {
                        .download-preview {
                            img {
                                max-height:60dvh;
                            }
                        }
                    }
                }
            }
        }
    }

    @media screen and (max-width: 750px) {
        .download-options-outer {
            z-index:2000;
            .download-options-inner {
                .download-options-container {
                    .download-options-content {
                        height:25rem;
                        .download-preview {
                            display:none;
                        }
                    }
                }
            }
        }
    }

</style>