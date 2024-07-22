<script>
    import Write from "~icons/material-symbols/edit-document-rounded";

    import { writable } from "svelte/store";
    import getFetch from "$lib/getFetch";
    import postFetch from "$lib/postFetch";
    import { onMount } from 'svelte';
    
    import LoadingIcon from '~icons/svg-spinners/pulse-2';
    import Room from "./Room.svelte";

    export let active = false;

    let topic = "";
    let post = "";

    let rooms = writable([]); 
    let error = writable("");

    let loadingData = writable(true);
    let loadingSubmit = writable(false);

    let activeRoom = writable({});

    onMount(async () => {
        let response = await getFetch("/api/forum/rooms");
        loadingData.set(false);
        if(response.success) {
            rooms.set(response.data);
            if(response.data.length > 0) {
                activeRoom.set(response.data[0]);
            }
        }
    });

    function setActiveRoom(roomId) {
        for(let i = 0; i < $rooms.length; i++) {
            if($rooms[i].createdAt === roomId) {
                activeRoom.set($rooms[i]);
            }
        }
    }

    async function submitNewRoom() {

        if(!topic || !post) {
            error.set("Enter a subject and comment.");
            return;
        }
        error.set("");
        loadingSubmit.set(true);
        let response = await postFetch("/api/forum/rooms", {
            name: topic,
            initialPost: post
        });
        loadingSubmit.set(false);
        if(response.success) {
            rooms.update(old => {
                return [response.data, ...old];
            });
            activeRoom.set(response.data);
            topic = "";
            post = "";
            error.set("");
        } else {
            error.set(response.message);
        }

    }

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
                <input bind:value={topic} type="text" placeholder="Subject" maxlength={100}>
                <textarea bind:value={post} placeholder="Topic of discussion..." maxlength={500}></textarea>
                <div 
                    on:click={submitNewRoom}
                    on:keydown={(e) => {if(e.key === "Enter") submitNewRoom()}}
                    role="button"
                    tabindex="0"
                    class:disabled={$loadingData || $loadingSubmit}
                    class="submit-button">
                    {#if $loadingSubmit}
                    <div class="btn-icon">
                        <LoadingIcon />
                    </div>
                    {/if}
                    <div class="btn-label">Submit</div>
                </div>
                {#if $error}
                <div class="error">
                    {$error}
                </div>
                {/if}
            </div>
            <div class="forum-room-list">
                {#each $rooms as room}
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div
                    on:click={() => setActiveRoom(room.createdAt)} 
                    class="forum-room-item">
                    <div class="forum-room-name">{room.name}</div>
                    <div class="forum-room-last-comment">{room.lastReply}</div>
                </div>
                {/each}
                {#if $loadingData}
                    <div class="loading-rooms">
                        <div class="loading-icon"><LoadingIcon/></div>
                        <div class="loading-text">Loading rooms...</div>
                        <div class="loading-icon"><LoadingIcon/></div>
                    </div>
                {/if}
                {#if $rooms.length === 0 && !$loadingData}
                    <div class="no-rooms">No rooms yet.</div>
                {/if}
            </div>
        </div>
       
        <Room activeRoom={$activeRoom} />

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
                    input {
                        @include text-input;
                        width:calc(100% - 1rem);
                        margin-bottom:0.5rem;
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
                    .error {
                        padding:1rem;
                        color:$error-color;
                        text-align:center;
                    }
                }
                .forum-room-list {
                    overflow-y:auto;
                    margin-top:1rem;
                    max-height:16rem;
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
                        &:last-child {
                            margin-bottom:0;
                        }
                    }
                    

                    .loading-rooms, .no-rooms {
                        @include flex-center-row;
                        background:#f6f6f6;
                        padding:2rem;
                        height:fit-content;
                        text-align:center;
                        border-radius:1rem;
                        gap:0.5rem;
                    }
                }
            }
            
        }
    }

    @media screen and (max-width: 1100px) {

        .forum-outer {

            @include connect-section-inner;

            .forum-content {
                flex-direction:column;
                margin-top:0.5rem;
                justify-content:flex-start;
                gap:0.5rem;

                height:calc(100dvh - 5rem - 6rem);

                .forum-rooms {
                    margin:0;
                    padding:1rem 0.5rem;
                    position:relative;
                    top:0;
                    margin-left:0;
                    border-radius:0.2rem;
                    height:16rem;

                    .forum-new-room {
                        display:none;
                    }
                    .forum-room-list {
                        margin-top:0rem;
                        .forum-room-item {
                            border-bottom:1px solid rgb(140, 140, 140);
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
                            &:last-child {
                                margin-bottom:0;
                            }
                        }
                        

                        .loading-rooms, .no-rooms {
                            @include flex-center-row;
                            background:#f6f6f6;
                            padding:2rem;
                            height:fit-content;
                            text-align:center;
                            border-radius:1rem;
                            gap:0.5rem;
                        }
                    }
                }
            }
        }
    }

</style>