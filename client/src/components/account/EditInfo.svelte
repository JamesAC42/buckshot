<script>

    import {userStore} from "../../stores/stores";
    export let showEdit = false;
    export let activeField = "";
    export let hideEdit = false;
    export let hide = () => {}
    
    let newUsername = "";
    let newEmail = "";
    let password = "";
    let newPassword = "";
    let newPasswordConfirm = "";

    let accountEditError = "";

    let loading = false;

    function validateUsername() {
        if(!newUsername) {
            accountEditError = "Enter a username.";
            return false;
        }
        return true;
    }

    function validateEmail() {
        if(!newEmail) {
            accountEditError = "Enter an email.";
            return false;
        }
        if(!(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(newEmail))) {
            accountEditError = "Enter a valid email address.";
            return false;
        }
        return true;
    }

    function validatePassword() {
        if(!password || !newPassword || !newPasswordConfirm) {
            accountEditError = "All fields required.";
            return false;
        }
        if(newPassword !== newPasswordConfirm) {
            accountEditError = "Passwords do not match.";
            return false;
        }
        return true; 
    }
    
    function submitUpdate() {

        let body = {};
        let url = "";
        switch(activeField) {
            case "Username":
                if(!validateUsername()) return;
                body.username = newUsername;
                url = "/api/updateUsername";
                break;
            case "Email":
                if(!validateEmail()) return;
                body.email = newEmail;
                url = "/api/updateEmail";
                break;
            case "Password":
                if(!validatePassword()) return;
                body.password = newPassword;
                url = "/api/updatePassword";
                break;
            default:
                return;
        }

        loading = true;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        })
        .then(response => response.json())
        .then(data => {
            loading = false;
            if (data.success) {
                switch(activeField) {
                    case "Username":
                        let newUsernameStore = newUsername;
                        userStore.update(oldUser => {
                            if (oldUser) {
                                oldUser.username = newUsernameStore;
                            }
                            return oldUser;
                        });
                        newUsername = "";
                        break;
                    case "Email":
                        let newEmailStore = newEmail;
                        userStore.update(oldUser => {
                            if (oldUser) {
                                oldUser.email = newEmailStore;
                                oldUser.verified = false;
                            }
                            return oldUser;
                        });
                        newEmail = "";
                        break;
                    case "Password":
                        password = "";
                        newPassword = "";
                        newPasswordConfirm = "";
                        break;
                    default:
                        break;    
                }
                accountEditError = "";
                setHideEdit();
            } else {
                accountEditError = data.message;
            }
        })
        .catch((error) => {
            loading = false;
            accountEditError = "An error occurred."
            console.error('Error:', error);
        });

    }

    function setHideEdit() {
        if(hide) {
            hide();
        }
    }
    
    import LoadingIcon from '~icons/svg-spinners/pulse-2';

</script>


<div class={
    "account-edit-info" + 
    (showEdit ? " active" : "") +
    (hideEdit ? " hiding" : "")}>
    <div class="account-edit-info-inner">

        <div class="account-edit-content">
            <div class="account-edit-header">
                Change {activeField}
            </div>

            <div class="account-edit-input">
                {#if activeField === "Username"}
                    <div class="account-edit-input-item">
                        <div class="input-label">New Username:</div>
                        <input 
                            type="text" 
                            placeholder="Enter new username"
                            bind:value={newUsername}>
                    </div>
                {:else if activeField === "Email"}
                    <div>
                        <div class="account-edit-subheader">
                            After changing your email, your account will need to be verified again.
                            It will not affect any active subscription, but you will not be able to 
                            create any resumes or cover letters, or use the community features until
                            your account is verified.
                        </div>
                        <div class="account-edit-input-item">
                            <div class="input-label">New Email:</div>
                            <input 
                                type="text"
                                placeholder="Enter new email" 
                                bind:value={newEmail}>
                        </div>
                    </div>
                {:else if activeField === "Password"}
                    <div class="account-edit-input-item">
                        <div class="input-label">Current Password:</div>
                        <input 
                            type="password" 
                            placeholder="Current password"
                            bind:value={password}>
                    </div>
                    <div class="account-edit-input-item">
                        <div class="input-label">New Password:</div>
                        <input 
                            type="password" 
                            placeholder="New Password"
                            bind:value={newPassword}>
                    </div>
                    <div class="account-edit-input-item">
                        <div class="input-label">Confirm Password:</div>
                        <input 
                            type="password"
                            placeholder="Confirm Password" 
                            bind:value={newPasswordConfirm}>
                    </div>
                {/if}
            </div>

        </div>

        {#if accountEditError}
        <div class="account-edit-error">
        {accountEditError}  
        </div>
        {/if}

        <div class="account-edit-actions">
            <div 
                class="submit"
                role="button"
                on:keydown={() => submitUpdate()}
                tabindex="0" 
                on:click={() => submitUpdate()}>
                update
                {#if loading}
                <div class="loading-icon">
                    <LoadingIcon/>
                </div>
                {/if}
            </div>
            <div 
                class="cancel"
                role="button"
                on:keydown={() => setHideEdit()}
                tabindex="0" 
                on:click={() => setHideEdit()}>
                cancel
            </div>
        </div>

        <div class="account-edit-bumper"></div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .account-edit-info {
        position:absolute;
        bottom:0;left:0;
        height:100%;width:100%;
        background:$secondary-color;
        z-index:10000;
        border-top:1px solid $primary-color;
        transition:all 2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        transition:all .25s cubic-bezier(0.6, -0.28, 0.735, 0.045);
        transform:translate(0,100%);

        &.active {
            box-shadow: 0 -10px 20px -15px #484848;
            transition:all 2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transition:all .3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            transform:none;
        }

        &.hiding {
            transition:all 2s cubic-bezier(0.6, -0.28, 0.735, 0.045);
            transition:all .3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
            transform:translate(0,100%);
            box-shadow: 0 -10px 20px -15px #484848;
        }

        .account-edit-info-inner {
            position: relative;
            height:100%;width:100%;
            background:$secondary-color;

            .account-edit-content {
                position:absolute;
                width:100%;
                background:$secondary-color;
                .account-edit-header,
                .account-edit-input,
                .account-edit-error {
                    margin:0 2rem;
                }
                .account-edit-subheader {
                    font-size:0.9rem;
                    margin-bottom:0.7rem;
                }
                .account-edit-header {
                    margin:2rem;
                    margin-bottom:0.7rem;
                    font-size:1.4rem;
                }
                .account-edit-input {
                    width:calc(100% - 4rem);
                    display:flex;
                    flex-direction: column;
                    .account-edit-input-item {
                        @include flex-center-row;
                        align-items: center;
                        margin-bottom:0.5rem;
                        .input-label {
                            width:50%;
                            white-space: nowrap;
                        }
                        input {
                            width:50%;
                            border-radius:0.3rem;
                            font-family:"Questrial",sans-serif;
                            border:1px solid $primary-color;
                            outline:none;
                            padding:0.4rem 0.4rem;
                        }
                    }
                }
            }

            .account-edit-error {
                position:absolute;
                bottom:0;left:0;
                margin:1rem 2rem;
                color:$error-color;
                max-width:40%;
            }

            .account-edit-actions {
                position:absolute;
                margin:1rem 2rem;
                bottom:0;right:0;
                display:flex;
                flex-direction: row;
                gap:0.5rem;
                .cancel,.submit {
                    display:flex;
                    flex-direction:row;
                    align-items: center;
                    border:1px solid $primary-color;
                    padding:0.2rem 0.4rem;
                    cursor:pointer;
                    border-radius:0.3rem;
                    .loading-icon {
                        margin-left:4px;
                        transform:translateY(2px);
                    }
                    &:hover {
                        background:$primary-color;
                        color:$secondary-color;
                    }
                }
            }

            .account-edit-bumper {
                position:absolute;
                bottom:0;left:0;
                height:2rem;width:100%;
                transform:translate(0,100%);
                background:$secondary-color;
            }
        }
    }
</style>