<script>
    export let active = false;
    import Chat from "~icons/material-symbols/mark-chat-unread-rounded";
    import Send from "~icons/material-symbols/send-rounded";
</script>

{#if active}
<div class="chat-outer">

    <div class="header">
        <div class="header-icon">
            <Chat />
        </div>
        <div class="header-text">
            <h3>Chat</h3>
        </div>
    </div>

    <div class="chat-content">
        
        <div class="chat-messages">
            <div class="chat-message">
                <div class="chat-info">
                    <div class="username">user123</div>
                    <div class="timestamp">12:23:10 7/4/24</div>
                </div>
                <div class="chat-text">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed autem velit ad adipisci perferendis ipsa, eos illum sapiente. Eaque eligendi doloremque quasi corporis neque tempore velit enim, suscipit dicta dolore?
                </div>
            </div>
        </div>
        <div class="chat-input">
            <input placeholder="Message..." type="text">
            <div class="chat-submit">
                <div class="chat-submit-button">
                    <div class="btn-icon"><Send/></div>
                </div>
            </div>
        </div>

    </div>

</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .chat-outer {

        @include connect-section-inner;
        overflow-y:hidden;

        .chat-content {
            position:relative;
            height:100%;
            margin-top:2rem;
            display:flex;
            flex-direction: column;
            gap:1rem;
            width:100%;
            align-items:stretch;

            .chat-messages {
                flex:1;
                max-height:82%;
                overflow-y:auto;
                scrollbar-width: thin;
                padding-right:1rem;
                .chat-message {
                    background:#f4f4f4;
                    padding:1rem;
                    margin-bottom:1rem;
                    border-radius:0.5rem;
                    .chat-info {
                        & > * {
                            display:inline-block;
                        }
                        .username {
                            font-weight:800;
                        }
                        margin-bottom:0.5rem;
                    }
                    .chat-text {

                    }
                }
            }
            .chat-input {
                @include flex-center-row;
                gap:1rem;
                margin-top:auto;
                transform:translateY(-150%);
                align-items:center;
                input {
                    @include text-input;
                    flex:1;
                }
                .chat-submit {
                    .chat-submit-button {
                        @include simple-button;
                        border:none;
                        &:hover {
                            outline:4px solid $primary-color;
                        }
                    }
                }
            }
        }
    }

</style>