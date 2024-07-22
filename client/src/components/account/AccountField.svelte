<script>

    export let fieldName = "";
    export let fieldValue = "";
    export let onClick = () => {};
    export let enableEditing = false;
    let showEdit = false;

    function toggleShowEdit() {
        if(enableEditing) {
            showEdit = !showEdit;
        }
    }

    function handleClick() {
        if(enableEditing && onClick) {
            onClick();
        }
    }

    import Pen from "~icons/ic/round-mode-edit";

</script>

<div class="info-item">
    <div class="info-label">
        {fieldName}:
    </div> 
    <div
        on:mouseenter={() => toggleShowEdit()}
        on:mouseleave={() => toggleShowEdit()} 
        on:click={() => handleClick()}
        on:keydown={() => handleClick()}
        role="button"
        tabindex="0"
        class={"info-value" + (enableEditing ? " editable" : "")}>

        {#if showEdit}
        <div class="pen">
            <Pen/>
        </div>
        {/if}

        {fieldValue}
        <slot/>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .info-item {

        @include flex-center-row;
        align-items:center;
        justify-content:space-between;
        gap:8rem;
        margin-top:0.5rem;
        .info-label {
            position:relative;
            white-space: nowrap;
        }
        .info-value {
            
            position:relative;
            &.editable {
                cursor:pointer;
                transition:opacity .1s ease-in-out;
                &:hover {
                    opacity:0.6;
                }
            }

            @keyframes slide-in-pen {
                0% {
                    opacity:0;
                    transform:translate(-100%, calc(-50% + 2px)) rotateY(180deg);
                }
                100% {
                    opacity:1;
                    transform:translate(-175%, calc(-50% + 2px)) rotateY(180deg);
                }
            }
            .pen {
                position:absolute;
                top:50%;left:0;
                transform:translate(-175%, calc(-50% + 2px)) rotateY(180deg);
                margin-left:0.5rem;
                animation:slide-in-pen 0.2s cubic-bezier(0.19, 1, 0.22, 1) 1;
            }
        }

    }
    
    @media screen and (max-width: 650px) {

        .info-item {
            gap:3rem;
        }

    }
    
    @media screen and (max-width: 400px) {

        .info-item {
            display:flex;
            flex-direction: column;
            gap:0rem;
            width:100%;
            margin-bottom:0.5rem;
            text-align:left;
            align-items: stretch;
            .info-label {
                font-size:0.9rem;
            }
            .info-value {
                font-size:0.9rem;
                .pen {
                    display:none;
                    animation:none;
                }
            }
        }

    }

</style>