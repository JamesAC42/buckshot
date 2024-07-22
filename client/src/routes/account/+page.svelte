<script>
    
    import Navbar from "../../components/Navbar.svelte";
    import { onDestroy, onMount } from 'svelte';
    import { userStore } from '../../stores/stores';
    import { authGuard } from '$lib/authGuard';

    let user = null;

    let showEdit = false;
    let hideEdit = false;
    let activeField = "";
    let unsubscribe = null;

    onMount(async () => {
        user = await authGuard();
        unsubscribe = userStore.subscribe(value => {
            user = value;
        });
    });

    onDestroy(() => {
        if(unsubscribe) {
            unsubscribe();
        }
    });

    function setShowEdit(field) {
        activeField = field;
        showEdit = true;
    }

    function setHideEdit() {
        hideEdit = true;
        setTimeout(() => {
            showEdit = false;
            hideEdit = false;
        },500)
    }

    import Person from "~icons/material-symbols/person-book";
    import Password from "../../components/Password.svelte";
    import AccountField from "../../components/account/AccountField.svelte";
    import EditInfo from "../../components/account/EditInfo.svelte";

</script>

<svelte:head>
    <title>Account</title> 
</svelte:head>

{#if user}
<Navbar/>
<div class="account-container">
    <div class="account-row">
        <div class="account-section profile-image">
            <div class="account-section-background">
            </div>
            <div class="account-section-inner">
                <Person/>
            </div>
        </div>
        <div class="account-section personal-info">
            <div class="account-section-background">
            </div>
            <div class="account-section-inner">

                <EditInfo
                    showEdit={showEdit}
                    hideEdit={hideEdit}
                    activeField={activeField}
                    hide={() => setHideEdit()}/>

                <div class="info-header">
                    Info
                </div>
                <AccountField 
                    fieldName={"Username"}
                    fieldValue={user.username}
                    enableEditing={true}
                    onClick={() => setShowEdit("Username")}/>
                <AccountField 
                    fieldName={"Email"}
                    fieldValue={user.email}
                    enableEditing={true}
                    onClick={() => setShowEdit("Email")}/>
                <AccountField 
                    fieldName={"Password"}
                    fieldValue={""}
                    enableEditing={true}
                    onClick={() => setShowEdit("Password")}>
                    <Password/>
                </AccountField>
                <AccountField 
                    fieldName={"Account Created"}
                    fieldValue={new Date(user.dateCreated).toLocaleDateString()}
                    enableEditing={false}/>
                <AccountField 
                    fieldName={"Verified"}
                    fieldValue={user.verified ? "Yes" : "No"}
                    enableEditing={false}/>
                <AccountField 
                    fieldName={"Premium"}
                    fieldValue={user.premium ? "Yes" : "No"}
                    enableEditing={false}/>
                <AccountField 
                    fieldName={"Remaining Generations"}
                    fieldValue={user.remainingGenerations}
                    enableEditing={false}/>

            </div>
        </div>
    </div>
</div>
{:else}
<p class="loading">
    Loading
</p>
{/if}

<style lang="scss">

    @import "../../styles/mixins.scss";

    .account-container {
        @include center-fixed;
        border-radius:0.4rem;
        padding:1rem;
        .account-row {
            @include flex-center-row;
            align-items: stretch;
            gap:1rem;
            margin-bottom:1rem;
            &:last-child {margin:0;}

            .account-section {
                @include pop-in-transition;
                position:relative;

                .account-section-inner {
                    background:$secondary-color;
                    border:1px solid $primary-color;
                    padding:2rem;
                    border-radius:0.3rem;
                    position:relative;
                    overflow:hidden;
                    z-index:100;
                }

                .account-section-background {
                    position:absolute;
                    top:0;left:0;
                    transform:translate(-5px,5px);
                    background:$primary-color;
                    height:100%;width:100%;
                    border-radius: 0.3rem;
                    z-index:-1;
                }

                &.profile-image {
                    @include flex-center-col;
                    font-size:4rem;
                }

                .info-header {
                    font-weight:700;
                    font-size:1.4rem;
                }
            }
        }
    }
    p.loading {
        text-align:center;
        margin-top:5rem;
    }

    @media screen and (max-width: 650px) {

        .account-container {
            transform:translate(-50%,-45%);
            .account-row {
                @include flex-center-col;
                .account-section.profile-image {
                    display:none;
                }
                .account-section.personal-info {
                    .account-section-inner {
                        padding:2rem;
                        width:fit-content;
                        margin:0 auto;
                    }

                    .info-header {
                        font-size:1.2rem;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 400px) {

        body {
            overflow-y:hidden;
        }
        .account-container {
            top:50%;left:50%;
            transform:translate(-50%,-40%);
            .account-row {
                .account-section.personal-info {
                    max-height:calc(100dvh - 8rem);
                    .account-section-inner {
                        padding:1rem;
                        width:calc(100dvw - 4rem);
                        height:fit-content;
                    }
                    .info-header {
                        font-size:1rem;
                    }
                }
            }
        }
    }

    @media screen and (max-width: 300px) {

        .account-container {
            top:5rem;left:0;
            margin:0rem;
            transform:none;
            .account-row {
                .account-section.personal-info {
                    overflow-y:auto;
                    padding:0rem;
                    border-radius:0.5rem;
                    border:1px solid $primary-color;

                    .account-section-background {
                        display:none;
                    }
                    .account-section-inner {
                        padding:1rem;
                        width:calc(100dvw - 4rem);
                        height:fit-content;
                        margin:0rem;
                        border:none;
                        overflow-y:hidden;
                    }
                    .info-header {
                        font-size:1rem;
                    }
                }
            }
        }
    }
    
    
    @media screen and (max-height: 680px) {
        .account-container {
            .account-row {
                .account-section.profile-image {
                    display:none;
                }
            }
        }
    }


</style>

