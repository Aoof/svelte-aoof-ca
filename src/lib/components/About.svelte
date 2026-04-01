
<script lang="ts">
    import { _ } from 'svelte-i18n';
    import migsImg from '$lib/media/migs_image.png';
    import fusionImg from '$lib/media/FusionFestival.jpg';
    import botQuestImg from '$lib/media/BotQuest.jpeg';
    import ggjImg from '$lib/media/ggj_image.jpg';

    let workExperiences : { current: boolean, date: string, title: string, location: string, description: string }[] = [];
    let eventsAndCompetitions: { name: string, location: string, time: string, summary: string, link?: string, image?: string }[] = [];

    // Subscribe to translations and update data
    const unsubscribe = _.subscribe(($t) => {
        workExperiences = $t('about.workExperiences').map((experience: any) => {
            return {
                ...experience,
                description: experience.description.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>')
            };
        });

        const baseEvents = $t('about.eventsAndCompetitionsList');
        const eventImages = [ggjImg, migsImg, fusionImg, botQuestImg, undefined, undefined];
        const eventLinks = [
            "https://www.linkedin.com/posts/aoof_a-week-ago-my-friends-and-i-decided-to-take-activity-7427119229058936834-Lcsn",
            "https://www.linkedin.com/posts/aoof_last-month-i-had-the-pleasure-to-attend-activity-7402542580120375296-s-7v",
            "https://www.linkedin.com/posts/aoof_fusionfestival-activity-7328610056080404481-WUQE",
            "https://www.linkedin.com/posts/aoof_botquest-robotics-engineering-activity-7273043506187702274-bwtj",
            "https://www.linkedin.com/posts/aoof_concordiauniversity-warhacks-robotics-activity-7157886921753378818-xt8O?utm_source=share&utm_medium=member_desktop",
        ];

        eventsAndCompetitions = baseEvents.map((event: any, index: number) => {
            return {
                ...event,
                image: eventImages[index],
                link: eventLinks[index],
                summary: event.summary.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>')
            };
        });
    });
</script>

<article class="bg-dark w-full p-4 rounded-lg justify-center items-center" id="about">
    <div class="content flex flex-col h-full my-4 text-lg overflow-auto">
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.workExperienceTitle')}</h3>
            <ol class="relative border-s border-gray-200 m-4">
                {#each workExperiences as experience}
                    <li class="mb-10 ms-4">
                        {#if experience.current}
                            <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 bg-pink"></div>
                        {:else}
                            <div class="absolute w-4 h-4 rounded-full mt-2 -start-2 bg-white"></div>
                        {/if}
                        <time class="mb-1 text-sm font-normal leading-none">{experience.date}
                            {#if experience.current}
                                <span class="text-sm leading-none bg-pink font-black text-dark py-1 px-3 mx-3 rounded-lg select-none">{$_('about.current')}</span>
                            {/if}
                        </time>
                        <h3 class="text-lg font-semibold">{experience.title}</h3>
                        <p class="mb-4 text-sm font-normal leading-none">{experience.location}</p>
                        <p class="mb-4 text-base font-normal text-gray-500">{@html experience.description}</p>
                    </li>
                {/each}
            </ol>
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.eventsCompetitionsTitle')}</h3>
            <p class="my-4 text-lg">
                {$_('about.eventsCompetitionsDescription')}
            </p>
            {#each eventsAndCompetitions as event}
                <div class="card border border-gray p-4 rounded-lg mb-4">
                    {#if event.image}
                        <img src={event.image} alt={event.name} class="w-full h-48 object-cover rounded-lg mb-4" />
                    {/if}
                    {#if event.link}
                        <div class="float-right">
                            <a href={event.link} target="_blank" rel="anonymous" class="text-dark py-2 px-4 font-bold rounded bg-pink hover:opacity-80 transition-opacity ease-out text-sm cursor-pointer">{$_('about.linkedinPost')}</a>
                        </div>
                    {/if}
                    <h4 class="text-2xl font-semibold text-white">{event.name}</h4>
                    <div class="mb-2">
                        <span class="text-gray text-sm">{event.location}</span>
                        <span class="text-gray text-sm">{event.time}</span>
                    </div>
                    <p class="text-lg">{@html event.summary}</p>
                </div>
            {/each}
        </div>
        <div class="content-group">
            <h3 class="text-white text-2xl mt-4 font-bold">{$_('about.websiteTitle')}</h3>
            <p class="my-4 text-lg">
                {$_('about.websiteDescription')}
            </p>
        </div>
    </div>
</article>