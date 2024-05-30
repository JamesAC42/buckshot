<script>

</script>

<div class="banner">
    <a href="/">
        <h1>buckshot</h1>
    </a>
    <div class="links-outer">
        <a href="/">home</a>
        <a href="/shoot">shoot</a>
        <a href="/feedback">feedback</a>
        <a href="/premium">premium <div class="notif"></div> </a>
        <a href="/account">account</a>
    </div>
</div>

<style lang="scss">

@import "../styles/variables.scss";

.banner {
    margin:0;
    padding:0 5rem;
    background:$primary-color;
    color:$secondary-color;
    display:flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height:5rem;

    h1 {
        display: inline-block;
        margin:0;
        color:$secondary-color;
    }

    .links-outer {
        display:flex;
        flex-direction: row;
        align-items: center;
        gap:2rem;
        a {
            color:$secondary-color;
            cursor:pointer;
            text-decoration: none;
            position:relative;
            &:hover {
                text-decoration: underline;
            }

            .notif {
              position:absolute;
              height:6px;width:6px;
              border-radius:50%;
              background:$secondary-color;  
              top:0;right:0;
              z-index:1000;
              transform:translate(5px,0);
            }

        }
    }
}
</style>