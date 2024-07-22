<script>
  import FaqItem from "./FAQItem.svelte";

</script>
<div class="faq">

    <div class="section-title">
        <h2>Frequently Asked Questions</h2>
    </div>

    <div class="faq-inner">

        <FaqItem 
            question="How does Buckshot work?" 
            answer="Resumes need two sources of information: you and the job. Simply paste or jot out the relevant information into two textboxes, choose the sections of the resume you want to include, and Buckshot handles the wording and formatting for you. Buckshot uses frontier language model Claude 3.5 Sonnet to synthesize the information into a professional resume in no time." />
        <FaqItem 
            question="What makes Buckshot different from other resume builders?" 
            answer="Buckshot features an extremely simple and straightforward workflow that ensures you get the most out of the time spent entering information. Easily manage all of your jobs in one place via the tab sidebar, and download the finished result immediately with 2 clicks - no hidden fees." />
        <FaqItem 
            question="Can I use Buckshot for free?" 
            answer="You can create 5 resumes for free with a new account, and manage up to 10 jobs at once. Once you've generated a resume for a particular job, you can manually edit and download as many times as you want, for no extra cost. Purchase credits to generate entirely new resumes, or purchase a monthly subscription for access to cover letter generation and 15 free generations per month." />
        <FaqItem 
            question="Can Buckshot help with writing cover letters?" 
            answer="Premium members can use credits to generate either a resume or a cover letter. Cover letters can also be fully customized and downloaded with no extra cost." />
        <FaqItem 
            question="How many resumes can I create?" 
            answer="Credits can be spent to generate a resume or cover letter for whatever job you want, however many times you want. Resumes and cover letters can be generated and regenerated for as many times as you have credits to use, for the same job or for different jobs. Each generation within a job is saved so you have access to each version you created." />
        <FaqItem 
            question="How customizable are the finished resumes?" 
            answer="The finished resume is completely customizable. Keep as much or as little of the AI content as you want. Add new information or take out unnecessary details until you are satisfied with the result." />
        <FaqItem 
            question="Does Buckshot work for all industries and job levels?" 
            answer="Yes, Buckshot can be used for any and all industries, positions, job levels, careers, etc. If your job needs a resume, Buckshot can make it." />
        <FaqItem 
            question="Is there a limit to how many times I can generate a resume per job?" 
            answer="No, regenerate, customize, and download as many times as you want for each job. (Additional generations will cost credits, but downloading and editing do not)" />
        <FaqItem 
            question="How can I get help if I have issues or questions?" 
            answer="Ask for help in the chat or start a discussion in the forum at https://buckshot.me/connect, or reach out to me at buckshotfeedback@gmail.com" />
        <FaqItem 
            question="Can I download the resume after I'm satisfied with the content?" 
            answer="Yes, downloads are free and simple. The document will download in PDF format, with a professional layout and style. You can choose between serif and sans-serif text fonts. You will never be blocked or paywalled from downloading a resume that you have already made." />

    </div>

</div>

<style lang="scss">

    @import "../../styles/mixins.scss";

    .faq {
        margin-bottom:2rem;
        .faq-inner {
            width:fit-content;
            margin:0 auto;
            padding:0 2rem;
        }
    }
    
    @media screen and (max-width: 900px) {

        .faq {
            .faq-inner {
                padding:0 0rem;
            }
        }
    }


</style>