

<div class="footer">
    <div class="footer-inner">
        <div class="footer-logo">
            <img src="/images/logo.png" alt="logo" />
        </div>
        <div class="footer-content">
            <div class="footer-links">
                <div class="footer-section-header">Links</div>
                <ul>
                    <li><a href="/shoot">Shoot</a></li>
                    <li><a href="/connect">Connect</a></li>
                    <li><a href="/pricing">Pricing</a></li>
                    <li><a href="/account">Account</a></li>
                </ul>
            </div>
            <div class="footer-info">
                <div class="footer-section-header">Contact</div>
                <p>For support, send an email to <a href="mailto:buckshotfeedback@gmail.com">buckshotfeedback@gmail.com</a> or <a href="/connect">make a comment</a>.</p>
                <p>&copy; 2023 buckshot. All rights reserved.</p>
            </div>
        </div>
    </div>
</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .footer {
        background:$background;
        color:#b3b3b3;
        border-radius:3rem 3rem 0 0;
        margin-top:4rem;
        padding:3rem 0 2rem 0;
        .footer-inner {
            width:50%;margin:0 auto;
            @include flex-center-row;
            align-items:center;
            .footer-logo {
                flex:1;
                img {
                    width:17rem;
                    opacity:0.7;
                }
                &:first-child {
                    transform:rotateY(180deg);
                    margin-right:3rem;
                }
            }
            .footer-content {
                @include flex-center-row;
                gap:4rem;
                .footer-section-header {
                    font-size:1.4rem;
                    font-weight:600;
                    margin-bottom:0.5rem;
                }
                .footer-links {
                    flex:1;
                    ul {
                        padding:0;
                        margin:0;
                    }
                    ul li {
                        list-style-type: none;
                        margin-bottom:0.4rem;
                    }
                    ul li a {
                        text-decoration: none;
                        color:#b3b3b3;
                        &:hover {
                            color:#fff;
                        }
                    }
                }
                .footer-info {
                    & > * {
                        line-height:1.4rem;
                    }
                    flex:2;
                    min-width:25rem;
                    p {
                        margin:0.4rem 0;
                    }
                    a {
                        text-decoration: none;
                        color:#ffffff;
                    }
                }
            }
        }
    }


</style>