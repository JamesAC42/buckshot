<script>

    
    import NumberBack from "~icons/fluent/shape-subtract-16-filled";

</script>


<div class="how-it-works">
    <div class="section-title">
        <h2>How does it work?</h2>
    </div>

    <div class="hiw-video">
        <div class="hiw-video-inner">
            <video id="player" playsinline controls data-poster="/images/screenshot.png">
                <source src="/demo.webm" type="video/webm" />
                <!-- Captions are optional -->
                <track kind="captions" label="English captions" src="/path/to/captions.vtt" srclang="en" default />
            </video>
        </div>
    </div>

    <div class="hiw-inner">
        <div class="hiw-item">
            <div class="hiw-number">
                <div class="background-char"><NumberBack/></div>
                <div class="hiw-char">1</div>
            </div>
            <div class="hiw-text">
                Write out your background information or just paste in your current resume.
            </div>
        </div>
        <div class="hiw-item">
            <div class="hiw-number">
                <div class="background-char"><NumberBack/></div>
                <div class="hiw-char">2</div>
            </div>
            <div class="hiw-text">
                Paste in the job description.
            </div>
        </div>
        <div class="hiw-item">
            <div class="hiw-number">
                <div class="background-char"><NumberBack/></div>
                <div class="hiw-char">3</div>
            </div>
            <div class="hiw-text">
                Select the resume sections you want to include in the output.
            </div>
        </div>
        <div class="hiw-item">
            <div class="hiw-number">
                <div class="background-char"><NumberBack/></div>
                <div class="hiw-char">4</div>
            </div>
            <div class="hiw-text">
                Generate and edit as necessary.
            </div>
        </div>
        <div class="hiw-item">
            <div class="hiw-number">
                <div class="background-char"><NumberBack/></div>
                <div class="hiw-char">5</div>
            </div>
            <div class="hiw-text">
                Export as a professional PDF in 2 clicks.
            </div>
        </div>
    </div>
</div>
<style lang="scss">

    @import "../../styles/mixins.scss";

    .how-it-works {

        margin-bottom:2rem;
        .hiw-video {
            .hiw-video-inner {
                width:70%;
                height:fit-content;
                margin:0 auto;
                border:1px solid $primary-color;
                box-shadow:0px 5px 18px -2px rgb(122, 122, 122);
                margin-bottom:2rem;
                overflow:hidden;
                border-radius:0.9rem;
                padding:0 9px;
                video {
                    margin:0;
                    width:100%;
                    transform:scale(1.02);
                }
            }
        }

        .hiw-inner {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            max-width: 800px;
            margin: 0 auto;
            padding:0 2rem;

            .hiw-item {
                display: flex;
                align-items: center;
                gap: 1.5rem;

                .hiw-number {
                    position: relative;
                    width: 3rem;
                    height: 3rem;

                    .background-char {
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        @include flex-center-col;
                        font-size: 2.5rem;
                        color: $primary-color;
                        z-index:0;
                    }

                    .hiw-char {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(calc(-50% + 5px), calc(-50% + 5px));
                        font-size: 1rem;
                        font-weight:600;
                        color: $primary-color;
                        z-index:1000;
                    }
                }

                .hiw-text {
                    flex: 1;
                    font-size: 1.2rem;
                }
            }
        }
    }
    
    @media screen and (max-width: 1000px) {

        .how-it-works {
            
            .hiw-video {
                .hiw-video-inner {
                    width:90%;
                }
            }
        }

    }
    
    @media screen and (max-width: 800px) {

        .how-it-works {
            
            .hiw-video {
                .hiw-video-inner {
                    width:90%;
                    border-radius:0.4rem;
                }
            }
            .hiw-inner {
                gap: 0.5rem;
                .hiw-item {
                    gap: 0.5rem;

                    .hiw-number {
                        width: 3rem;
                        height: 3rem;

                        .background-char {
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            @include flex-center-col;
                            font-size: 2rem;
                            color: $primary-color;
                            z-index:0;
                        }

                        .hiw-char {
                            transform: translate(calc(-50% - 1px), calc(-50% + 4px));
                            font-size: 0.9rem;
                        }
                    }

                    .hiw-text {
                        flex: 1;
                        font-size: 1.1rem;
                    }
                }
            }
        }

    }

</style>