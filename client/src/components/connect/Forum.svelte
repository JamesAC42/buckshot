<script>
    export let active = false;
    import Write from "~icons/material-symbols/edit-document-rounded";
    import Submit from "~icons/material-symbols/edit-square-rounded";
</script>

{#if active}
<div class="forum-outer">

    <div class="header">
        <div class="header-icon">
            <Write />
        </div>
        <div class="header-text">
            <h3>Forum</h3>
        </div>
    </div>

    <div class="forum-content">
        <div class="forum-rooms">
            <div class="forum-new-room">
                <p>Start a new discussion:</p>
                <textarea placeholder="Topic of discussion..."></textarea>
                <div class="submit-button">
                    <div class="btn-text">Submit</div>
                </div>
            </div>
            <div class="forum-room-list">
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
                <div class="forum-room-item">
                    <div class="forum-room-name">topic of discussion</div>
                    <div class="forum-room-last-comment">this is the last thing that was said in this room</div>
                </div>
            </div>
        </div>
        <div class="forum-room-outer">
            <div class="forum-room-info">
                <div class="room-name">room 123</div>
                <div class="room-stats">12 posts / 3 users</div>
            </div>
            <div class="forum-room-posts">
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
                <div class="forum-post">
                    <div class="forum-post-info">
                        <div class="username">user123</div>
                        <div class="timestamp">03:12:12 12/12/12</div>
                    </div>
                    <div class="forum-post-text">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla hic assumenda optio ea ipsa eos omnis, rerum minima voluptates nemo? Omnis, dolores non optio assumenda alias eum quibusdam, totam magni rerum fugiat unde velit, officiis dignissimos ipsa corrupti! Quaerat, delectus!
                    </div>
                </div>
            </div>
            <div class="forum-room-input">
                <input type="text" placeholder="Comment something...">
                <div class="forum-room-submit">
                    <div class="submit-button">
                        <div class="btn-icon"><Submit/></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .forum-outer {

        @include connect-section-inner;

        .forum-content {
            margin-top:2rem;
            display:flex;
            flex-direction: row;
            justify-content: center;
            gap:3rem;
            .forum-rooms {
                position:sticky;
                top:2rem;
                margin-left:2rem;
                min-width:18rem;
                max-width:22rem;
                background:#f6f6f6;
                border-radius:1rem;
                height:fit-content;
                padding:2rem;
                .forum-new-room {
                    p {
                        margin:0;
                        margin-bottom:0.5rem;
                        text-align:center;
                        font-size:1.09rem;
                    }
                    textarea {
                        @include text-input;
                        width:calc(100% - 1rem);
                        height:6rem;
                        resize:none;
                    }
                    .submit-button {
                        @include simple-button;
                        width:fit-content;
                        margin:0 auto;
                        margin-top:0.5rem;
                    }
                }
                .forum-room-list {
                    overflow-y:auto;
                    margin-top:1rem;
                    max-height:21rem;
                    scrollbar-width: thin;
                    .forum-room-item {
                        padding:0.5rem;
                        margin-bottom:0.8rem;
                        border-radius:0.2rem;
                        cursor:pointer;
                        &:hover {
                            background:#5b5b5b;
                            color:$secondary-color;
                        }
                        .forum-room-name {
                            font-weight:600;
                            margin-bottom:0.3rem;
                        }
                        .forum-room-last-comment {
                            font-size:0.9rem;
                        }
                    }
                }
            }
            .forum-room-outer {
                margin-right:2rem;
                .forum-room-info {
                    @include flex-center-row;
                    justify-content: space-between;
                    align-items: center;
                    padding:1rem;
                    background:#1d1d1d;
                    color:$secondary-color;
                    margin-bottom:0.5rem;
                    border-radius:0.2rem;
                    .room-name {
                        font-size:1.3rem;
                    }
                    .room-stats {
                        font-size:0.9rem;
                    }
                }
                .forum-room-posts {
                    .forum-post {
                        padding:1rem;
                        background:#f6f6f6;
                        margin-bottom:0.5rem;
                        .forum-post-info {
                            @include flex-center-row;
                            justify-content: flex-start;
                            gap:1rem;
                            margin-bottom:0.5rem;
                            .username {
                                font-weight:600;
                            }
                        }
                        .forum-post-text {
                            font-size:1.1rem;
                        }
                    }
                }
                .forum-room-input {
                    @include flex-center-row;
                    gap:1rem;
                    margin-top:1rem;
                    input {
                        @include text-input;
                        flex:1;
                    }
                    .forum-room-submit {
                        .submit-button {
                            @include simple-button;
                            border:none;
                            transform:translateY(4px);
                            &:hover {
                                outline:none;
                                background:$secondary-color;
                                color:#9a9a9a;
                            }
                        }
                    }
                }
            }
        }
    }

</style>