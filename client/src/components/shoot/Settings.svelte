<script>
    
    import Face from '~icons/solar/face-scan-circle-linear';
    import Copy from '~icons/material-symbols/content-copy-outline';
    import Download from '~icons/material-symbols/download';
    import Share from '~icons/material-symbols/ios-share';
    import Mail from '~icons/material-symbols/mail-outline';
    import HandCoin from '~icons/mdi/hand-coin';
    import Subscription from '~icons/fluent/premium-28-filled';
    import Robot from '~icons/material-symbols/robot-2-outline';
    import SettingsIcon from '~icons/pajamas/preferences';
    import Flask from '~icons/mdi/flask';
    import Feedback from '~icons/material-symbols/feedback-outline-rounded';
    import Info from '~icons/solar/info-circle-broken';
    import PayBubble from '~icons/solar/chat-round-money-broken';

    import Slider from '../../components/Slider.svelte';
    import { get, writable } from 'svelte/store';

    import { settingsStore, userStore } from "../../stores/stores";

    import { tone, mode, models, copyPersonalInfo } from "../../lib/userSettings";

    let settings = null;
    let user = null;
    let unsubscribeSettings = null;
    let unsubscribeUser = null;

    export let show = false;
    export let leaving = false;

    import { onDestroy, onMount } from 'svelte';

    async function saveSetting(url, settingObject) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(settingObject)
            });
            const data = await response.json();
            return data.success;
        } catch (error) {
            console.error('Error saving settings:', error);
            return false;
        }
    }

    const toneSettings = tone;
    const selectedTone = writable(1);
    const updateTone = async (t) => {
        let saveVal = get(selectedTone);
        selectedTone.update(value => tone[t]);
        let success = await saveSetting("/api/updateTone", {
            tone: t
        });
        if(!success) {
            selectedTone.update(value => saveVal);
        } else {
            settingsStore.update(oldSettings => {
                return {
                    ...oldSettings,
                    tone: tone[t]
                }
            });
        }
    }

    const modelSettings = models;
    const selectedModel = writable(1);
    const updateModel = async (m) => {
        let saveVal = get(selectedModel);
        selectedModel.update(value => models[m]);
        let success = await saveSetting("/api/updateModel", {
            model: m
        });
        if(!success) {
            selectedModel.update(value => saveVal);
        } else {
            settingsStore.update(oldSettings => {
                return {
                    ...oldSettings,
                    model: models[m]
                }
            });
        }
    }

    const outputMode = mode;
    const selectedOutputMode = writable(1);
    const updateOutputMode = async (m) => {
        let saveVal = get(selectedOutputMode);
        selectedOutputMode.update(value => mode[m]);
        let success = await saveSetting("/api/updateMode", {
            mode: m
        });
        if(!success) {
            selectedOutputMode.update(value => saveVal);
        } else {
            settingsStore.update(oldSettings => {
                return {
                    ...oldSettings,
                    mode: mode[m]
                }
            });
        }
    }

    const copyPersonal = copyPersonalInfo;
    const copyMode = writable(1);
    const updateCopyMode = async (c) => {
        let saveVal = get(copyMode);
        copyMode.update(value => copyPersonalInfo[c]);
        let success = await saveSetting("/api/updateCopyInfo", {
            copyPersonalInfo: (get(copyMode) === 1) ? true : false
        });
        if(!success) {
            copyMode.update(value => saveVal);
        } else {
            settingsStore.update(oldSettings => {
                return {
                    ...oldSettings,
                    copyPersonalInfo: copyPersonalInfo[c]
                }
            });
        }
    }
    
    onMount(() => {
        unsubscribeSettings = settingsStore.subscribe(value => {
            settings = value;
            selectedTone.update(val => settings.tone);
            selectedModel.update(val => settings.model);
            selectedOutputMode.update(val => settings.mode);
            copyMode.update(val => settings.copyPersonalInfo);
        });
        unsubscribeUser = userStore.subscribe(value => {
            user = value;
        })
    });

    onDestroy(() => {
        if(unsubscribeSettings) {
            unsubscribeSettings();
        }
        if(unsubscribeUser) {
            unsubscribeUser();
        }
    });
    
    $: settingsSectionClass = (user, blockPremium) => {
        let className = "settings-section-inner section-inner settings-content " ;
        if((!user.premium && blockPremium) || !user.verified) {
            className += "disabled";
        }
        return className;
    }

</script>

{#if !user || !settings}
<div class="empty"></div>
{:else}
<div class="settings-container" class:show={show} class:leaving={leaving}>

    <div class="settings-category">
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-header">
                <SettingsIcon /> settings 
            </div>
        </div>
        <div class="settings-section">
            <div class="section-background"></div>
            <div class={settingsSectionClass(user, false)}>

                <div class="settings-row">
                    <div class="settings-icon"><Face/></div>
                    <div class="settings-description">Tone</div>
                    <div class="settings-control">
                        <Slider
                            items={toneSettings}
                            selected={$selectedTone}
                            setSelected={updateTone}/>
                    </div>
                </div>
                <div class="settings-row">
                    <div class="settings-icon"><Copy/></div>
                    <div class="settings-description">Copy Personal Info</div>
                    <div class="settings-control">
                        <Slider
                            items={copyPersonal}
                            selected={$copyMode}
                            setSelected={updateCopyMode}/>
                    </div>
                </div>
                

            </div>
        </div>
        <div class="settings-section">
            <div class="section-background"></div>
            <div class={settingsSectionClass(user, true)}>
                <div class="settings-row">
                    <div class="settings-icon"><Mail/></div>
                    <div class="settings-description">Mode</div>
                    <div class="settings-control">
                        <Slider
                            items={outputMode}
                            selected={$selectedOutputMode}
                            setSelected={updateOutputMode}/>
                    </div>
                </div>

            </div>
        </div>
    </div>


    <div class="settings-category">
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-header">
                <Flask /> more 
            </div>
        </div><div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-content">

                <div class="settings-row">
                    <div class="action-item">
                        <div class="action-item-icon">
                            <Share />
                        </div>
                        <div class="action-item-description">
                            Share
                        </div>
                    </div>
                    <div class="action-item">
                        <div class="action-item-icon">
                            <Feedback />
                        </div>
                        <div class="action-item-description">
                            Feedback
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div class="settings-category">
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-header">
                <PayBubble /> buy 
            </div>
        </div>
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-content">
                <div class="settings-row">
                    <a href="/pricing">
                        <div class="payment-item">
                            <div class="payment-item-icon">
                                <HandCoin />
                            </div>
                            <div class="payment-item-description">
                                Purchase Credits
                            </div>
                            <div class="payment-item-info">
                                <Info />
                            </div>
                        </div>
                    </a>
                    <a href="/pricing">
                        <div class="payment-item premium">
                            <div class="payment-item-icon">
                                <Subscription />
                            </div>
                            <div class="payment-item-description">
                                Go Premium
                            </div>
                            <div class="payment-item-info">
                                <Info />
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";
    
    .settings-container {

        flex:0.8;
        position:sticky;
        top:0;

        min-width:20rem;
        max-width:25rem;

        .settings-category {
            margin-bottom:2.5rem;
        }

        .settings-section {
            position:relative;
            @include pop-in-transition;

            .settings-section-inner {
                @include flex-center-row;
                justify-content: space-between;
                align-items: center;
                gap:0.5rem;
                margin-bottom:0.7rem;
                position:relative;
                &.settings-header {
                    font-weight:500;       
                }
                &.settings-content {
                    
                    display:flex;
                    flex-direction: column;

                    .settings-row {
                        width:100%;
                        margin:0.5rem 0;
                        display:flex;
                        flex-direction: row;
                        align-items: center;
                        gap:10px;

                        .settings-icon,
                        .settings-info {
                            transform:translateY(2px);
                        }

                        .settings-info {
                            font-size:0.6rem;
                            width:fit-content;
                        }

                        .settings-description {
                            font-size:0.9rem;
                        }

                        .settings-control {
                            margin-left:auto;
                        }

                        justify-content: space-around;

                        a {
                            text-decoration: none;
                            color:$primary-color;

                            .premium {
                                color:#484bff;
                            }
                        }

                        .action-item,
                        .payment-item {
                            @include flex-center-row;
                            gap:0.5rem;
                            align-items: center;
                            padding:0.5rem 0.7rem;
                            border-radius:0.3rem;
                            font-size:0.8rem;
                            transition:all .2s ease-in-out;
                            cursor:pointer;
                            .action-item-icon,
                            .payment-item-icon,
                            .payment-item-info {
                                transform:translateY(2px);
                            }
                            .payment-item-info {
                                font-size:0.7rem;
                                margin-left:-4px;
                            }
                            &:hover {
                                background:$primary-color;
                                color:$secondary-color;
                            }

                            &.payment-item.premium {
                                border-color:#484bff;
                                color:#484bff;
                                &:hover {
                                    background:#484bff;
                                    color:$secondary-color;
                                }
                            }

                            .payment-item-description {
                                white-space: nowrap;
                            }
                        }
                    }

                    &.disabled {
                        pointer-events:none;
                        filter:brightness(0.8)
                    }

                }
            }
        }
    }
    
    @media screen and (max-width: 1200px) {

        @keyframes slide-in-settings {
            0% {
                transform:translate(100%,0);
            }
            100% {
                transform:none;
            }
        }
        @keyframes slide-out-settings {
            0% {
                transform:none;
            }
            100% {
                transform:translate(100%,0);
            }
        }

        .settings-container {
            position:fixed;
            top:5rem;right:0;
            max-width:100dvw;
            height:calc(100dvh - 5rem - 3rem);
            transform:translate(100%,0);
            background:$secondary-color;
            z-index:1000;
            padding:5rem;
            width:calc(100dvw - 10rem);
            &.show {
                animation:slide-in-settings 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.1) 1;
                transform:none;
            }
            
            &.leaving {
                animation:slide-out-settings 0.1s cubic-bezier(0.075, 0.82, 0.165, 1) 1;
            }
        }

    }
    @media screen and (max-width: 800px) {
        .settings-container {
            padding:2rem;
            width:calc(100dvw - 4rem);
        }
    }
    @media screen and (max-width: 400px) {
        .settings-container {
            padding:1rem;
            height:calc(100dvh - 5rem - 3rem - 2rem);
            width:calc(100dvw - 2rem);
            min-width:calc(100dvw - 2rem);
            overflow-y:auto;
            .settings-section {

                .settings-section-inner {
                    &.settings-content {
                        
                        .settings-row {
                            flex-direction:column;
                            .settings-control {
                                margin:0 auto;
                            }
                        }
                    }
                }
            }
        }
    }

</style>