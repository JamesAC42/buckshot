<script>
  	export let active = false;
  	import Chat from "~icons/material-symbols/mark-chat-unread-rounded";
  	import Send from "~icons/material-symbols/send-rounded";
  	import { writable } from "svelte/store";
  	import getFetch from "$lib/getFetch";
  	import postFetch from "$lib/postFetch";
    import { tick } from "svelte";
  	import { onDestroy, onMount } from "svelte";
	import { io } from 'socket.io-client';

	const socket = io('http://localhost:5010', {
        path: '/socket',
        transports: ['websocket']
    });

  	import LoadingIcon from "~icons/svg-spinners/pulse-2";

	let messages = writable([]);
	let error = writable("");
	let loadingChat = writable(true);
	let loadingSubmit = writable(false);
	let message = ""; 
	
	let inputElement;

	onMount(async () => {
		if (socket) {
			socket.on("newChatMessage", (data) => {
				messages.update((old) => {
					return [...old, data];
				});

				// Scroll to the bottom of the tabs-container
				tick().then(() => {
					const messagesContainer = document.querySelector('.chat-messages');
					if(messagesContainer) {
						messagesContainer.scrollTop = messagesContainer.scrollHeight;
					}
				});
			});
		}

		let response = await getFetch("/api/chat");
		loadingChat.set(false);
		if (response.success) {
			messages.set(response.data);
		}
	});

	onDestroy(() => {
		if (socket) {
			socket.off("newChatMessage");
		}
	});

	async function sendMessage() {
		if ($loadingChat || $loadingSubmit) {
			return;
		}

		if (!message.trim()) {
			error.set("Enter a message");
			return;
		}

		error.set("");
		loadingSubmit.set(true);
		let response = await postFetch("/api/chat", { message });
		loadingSubmit.set(false);
		if (response) {
			message = "";
			await tick();
      		if(inputElement) {
				inputElement.focus();
			}
		} else {
			error.set(response.message);
		}
	}
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
				{#each $messages as message}
				<div class="chat-message">
					<div class="chat-info">
						<div class="username">{message.username}</div>
						<div class="timestamp">
							{new Date(message.timestamp).toLocaleString()}
						</div>
					</div>
					<div class="chat-text">
						{message.message}
					</div>
				</div>
				{/each}
				{#if $loadingChat}
				<div class="loading-chat">
					<div class="loading-icon"><LoadingIcon /></div>
					<div class="loading-text">Loading chat...</div>
					<div class="loading-icon"><LoadingIcon /></div>
				</div>
				{/if}
				{#if $messages.length === 0 && !$loadingChat}
				<div class="no-messages">No messages yet.</div>
				{/if}
				<div class="chat-input">
					<input
						disabled={$loadingChat || $loadingSubmit}
						maxlength={500}
						bind:value={message}
						bind:this={inputElement}
						on:keydown={(e) => { if(e.key === "Enter") sendMessage() }}
						placeholder="Message..."
						type="text"/>
					<div class="chat-submit">
						<div
							on:click={sendMessage}
							on:keydown={(e) => {
								if (e.key === "Enter") sendMessage();
							}}
							role="button"
							tabindex="0"
							class:disabled={$loadingChat || $loadingSubmit}
							class="chat-submit-button">
							<div class="btn-label">Submit</div>
							<div class="btn-icon">
							{#if $loadingSubmit}
								<LoadingIcon />
							{:else}
								<Send />
							{/if}
							</div>
						</div>
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
		overflow-y: hidden;
		height:100%;

		.chat-content {
			position: relative;
			height: 100%;
			margin-top: 2rem;
			display: flex;
			flex-direction: column;
			gap: 1rem;
			width: 100%;
			align-items: stretch;

			.chat-messages {
				flex: 1;
				max-height: 82%;
				overflow-y: auto;
				scrollbar-width: thin;
				padding-right: 1rem;
				.chat-message {
					background: #f4f4f4;
					padding: 1rem;
					margin-bottom: 0.4rem;
					border-radius: 0.5rem;
					.chat-info {
						& > * {
							display: inline-block;
						}
						.username {
							font-weight: 800;
							margin-right:0.5rem;
						}
						margin-bottom: 0.5rem;
					}
				}
			}
			.chat-input {
				@include flex-center-row;
				gap: 1rem;
				align-items: center;
				margin-top:1rem;
				position:sticky;
				bottom:0;
				background:$secondary-color;
				padding:1rem 0;
				padding-bottom:0;
				overflow-x:hidden;
				input {
					@include text-input;
					flex: 1;
					border: none;
					padding-left: 1rem;
				}
				.chat-submit {
					.chat-submit-button {
						@include simple-button;
						@include flex-center-row;
						border: none;
						gap:0.5rem;
					}
				}
			}
		}

		.loading-chat,
		.no-messages {
			@include flex-center-row;
			background: #f6f6f6;
			padding: 2rem;
			height: fit-content;
			text-align: center;
			border-radius: 1rem;
			gap: 0.5rem;
		}
	}
    
	@media screen and (max-width: 1100px) {

		.chat-outer {
			padding:0;
			.header {
				margin-top:1rem;
			}
			.chat-content {
				margin-top: 1rem;
				position:relative;
				height:calc(100dvh - 5rem - 3rem - 5rem);

				.chat-messages {
					height:100%;
					max-height:100%;
					padding-right:0;
					.chat-message {
						padding: 0.5rem;
					}
				}
				.chat-input {
					padding:1rem;
					input {
						width:50%;
					}
				}
			}
		}
	}

</style>
