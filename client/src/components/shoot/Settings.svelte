<script>

    
    import Face from '~icons/solar/face-scan-circle-linear';
    import Copy from '~icons/material-symbols/content-copy-outline';
    import Download from '~icons/material-symbols/download';
    import Share from '~icons/material-symbols/ios-share';
    import Mail from '~icons/material-symbols-light/mail-outline-rounded';
    import HandCoin from '~icons/mdi/hand-coin';
    import Subscription from '~icons/fluent/premium-28-filled';
    import Robot from '~icons/material-symbols/robot-2-outline';
    import SettingsIcon from '~icons/pajamas/preferences';
    import Flask from '~icons/mdi/flask';
    import Feedback from '~icons/material-symbols/feedback-outline-rounded';

    import Info from '~icons/solar/info-circle-broken';

    import PayBubble from '~icons/solar/chat-round-money-broken';
    import Slider from '../../components/Slider.svelte';
    import { writable } from 'svelte/store';

    const toneSettings = ["curt", "hammy", "casual"];
    const selectedTone = writable(0);
    const updateTone = (index) => {
        selectedTone.update(value => index);
    }

    const modelSettings = ["gpt-4", "gpt-4o", "claude-3"];
    const selectedModel = writable(1);
    const updateModel = (index) => {
        selectedModel.update(value => index);
    }

    const outputMode = ["resume", "cover"];
    const selectedOutputMode = writable(0);
    const updateOutputMode = (index) => {
        selectedOutputMode.update(value => index);
    }

    const copyPersonal = ["copy", "reset"];
    const copyMode = writable(0);
    const updateCopyMode = (index) => {
        copyMode.update(value => index);
    }

</script>

<div class="settings-container">

    <div class="settings-category">
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-header">
                <SettingsIcon /> settings 
            </div>
        </div>
        <div class="settings-section">
            <div class="section-background"></div>
            <div class="settings-section-inner section-inner settings-content">

                <div class="settings-row">
                    <div class="settings-icon"><Face/></div>
                    <div class="settings-description">Tone</div>
                    <div class="settings-info"><Info/></div>
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
                    <div class="settings-info"><Info/></div>
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
            <div class="settings-section-inner section-inner settings-content disabled">


                <div class="settings-row">
                    <div class="settings-icon"><Robot/></div>
                    <div class="settings-description">Model</div>
                    <div class="settings-info"><Info/></div>
                    <div class="settings-control">
                        <Slider
                            items={modelSettings}
                            selected={$selectedModel}
                            setSelected={updateModel}/>
                    </div>
                </div>
                <div class="settings-row">
                    <div class="settings-icon"><Mail/></div>
                    <div class="settings-description">Mode</div>
                    <div class="settings-info"><Info/></div>
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
                            <Download />
                        </div>
                        <div class="action-item-description">
                            Download
                        </div>
                    </div>
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
                </div>
            </div>
        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";
    
    .settings-container {

        flex:1;
        position:sticky;
        top:0;

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
                        gap:5px;

                        .settings-icon,
                        .settings-info {
                            transform:translateY(2px);
                        }

                        .settings-info {
                            font-size:0.6rem;
                        }

                        .settings-description {
                            font-size:0.9rem;
                        }

                        .settings-control {
                            margin-left:auto;
                        }

                        justify-content: space-around;


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
</style>