<script>
    
    import { writable } from "svelte/store";
    import Submit from "~icons/material-symbols/edit-square-rounded";
    import LoadingIcon from '~icons/svg-spinners/pulse-2';
    import getFetch from "$lib/getFetch";
    import postFetch from "$lib/postFetch";

    export let activeRoom = {};
    let previousRoom = activeRoom;
    
    let posts = writable([]);
    let loadingPosts = writable(true);
    let loadingSubmit = writable(false);
    let error = writable("");

    let comment = "";

    async function loadPosts() {

        loadingPosts.set(true);
        posts.set([]);
        let response = await getFetch(`/api/forum/rooms/${activeRoom.createdAt}/posts`);
        loadingPosts.set(false);
        if(response.success) {
            if(response.data) {
                posts.set(response.data);
            }
        }

    }

    async function submitReply() {

        if($loadingPosts || $loadingSubmit) return;
        if(!comment) {
            return;
        }

        error.set("");
        loadingSubmit.set(true);
        let response = await postFetch(`/api/forum/rooms/${activeRoom.createdAt}/posts`, {
            comment
        });
        loadingSubmit.set(false);

        if(response.success) {
            posts.update(old => {
                return [...old, response.data];
            });
            comment = "";
        } else {
            error.set(response.message); 
        }

    }

    let userAmount = 0;
    let postAmount = 0;
    $: {
        if(activeRoom.createdAt && (activeRoom.createdAt !== previousRoom.createdAt)) {
            loadPosts();
            previousRoom = activeRoom;
        }

        if($posts.length > 0) {
            let users = {};
            for(let i = 0; i < $posts.length; i++) {
                users[$posts[i].userId] = 1;
            }
            userAmount = Object.keys(users).length;
            postAmount = $posts.length;
        }
    }

</script>

{#if activeRoom.createdAt}
<div class="forum-room-outer">
    <div class="forum-room-info">
        <div class="room-name">{activeRoom.name}</div>
        <div class="room-stats">{postAmount} replies / {userAmount} users</div>
    </div>
    <div class="forum-room-posts">
        {#each $posts as post}
        <div class="forum-post">
            <div class="forum-post-info">
                <div class="username">{post.username}</div>
                <div class="timestamp">{new Date(post.createdAt).toLocaleString()}</div>
            </div>
            <div class="forum-post-text">
                {post.comment}
            </div>
        </div>
        {/each}
        {#if $loadingPosts}
            <div class="loading-posts">
                <div class="loading-icon"><LoadingIcon/></div>
                <div class="loading-text">Loading posts...</div>
                <div class="loading-icon"><LoadingIcon/></div>
            </div>
        {/if}
    </div>
    <div class="forum-room-input">
        <input
            maxlength={500}
            bind:value={comment} 
            disabled={$loadingSubmit || $loadingPosts}
            type="text" 
            placeholder="Comment something...">
        <div class="forum-room-submit">
            <div
                on:click={submitReply}
                on:keydown={(e) => {if(e.key === "Enter") submitReply()}}
                role="button"
                tabindex="0"
                class:disabled={$loadingPosts || $loadingSubmit}
                class="submit-button">
                <div class="btn-icon">
                    {#if $loadingSubmit}
                    <LoadingIcon />
                    {:else}
                    <Submit/>
                    {/if}
                </div>
                <div class="btn-label">Reply</div>
            </div>
        </div>
    </div>
    {#if $error}
    <div class="error">
        {$error}
    </div>
    {/if}
</div>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";
    .forum-room-outer {
        margin-right:2rem;
        flex:1;
        position:relative;
        .forum-room-info {
            @include flex-center-row;
            justify-content: space-between;
            align-items: center;
            padding:1rem;
            background:#1d1d1d;
            color:$secondary-color;
            margin-bottom:0.5rem;
            border-radius:0.2rem;
            gap:2rem;
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
                border-radius:0.2rem;
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
            position:sticky;
            bottom:0;
            background:$secondary-color;
            padding:1rem 0;
            transform:translateY(2rem);
            input {
                @include text-input;
                padding:0.8rem 1rem;
                border:none;
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

        .error {
            text-align:center;
            padding:1rem;
            color:$error-color;
        }

        .loading-posts {
            @include flex-center-row;
            background:#f6f6f6;
            padding:2rem;
            height:fit-content;
            text-align:center;
            border-radius:1rem;
            gap:0.5rem;
        }
    }

</style>