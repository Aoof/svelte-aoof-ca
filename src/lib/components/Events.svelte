<script lang="ts">
    import { language } from '$lib/../stores/index';
    import type { Event, UiContent } from '$lib/content/types';
    import { sanitizeHtml } from '$lib/content/sanitize';

    export let content: { en: Event[]; fr: Event[] };
    export let ui: { en: UiContent; fr: UiContent };

    let searchTerm = '';

    $: localizedEvents = content?.[$language === 'fr' ? 'fr' : 'en'] ?? content?.en ?? [];
    $: localizedUi = ui?.[$language === 'fr' ? 'fr' : 'en'] ?? ui?.en;
    $: normalizedSearchTerm = searchTerm.trim().toLocaleLowerCase();
    $: filteredEvents = normalizedSearchTerm
        ? localizedEvents.filter((event) => [event.name, event.location, event.time, event.summary]
            .some((value) => value.toLocaleLowerCase().includes(normalizedSearchTerm)))
        : localizedEvents;
</script>

<article class="bg-dark w-full p-4" id="events">
    <div class="my-4">
        <div>
            <div>
                <h1 class="text-white text-3xl font-bold">{localizedUi.about.eventsCompetitionsTitle}</h1>
                <p class="mt-2 text-lg">{localizedUi.about.eventsCompetitionsDescription}</p>
            </div>
            <form class="relative mt-6 w-full" on:submit|preventDefault>
                <label class="block">
                    <span class="sr-only">{localizedUi.about.eventsSearchLabel}</span>
                    <i class="fas fa-search pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray" aria-hidden="true"></i>
                    <input
                        class="w-full rounded-lg border border-gray bg-[#222] py-4 pl-12 pr-16 text-white placeholder:text-gray focus:border-pink focus:outline-none"
                        type="search"
                        bind:value={searchTerm}
                        placeholder={localizedUi.about.eventsSearchPlaceholder}
                        aria-label={localizedUi.about.eventsSearchLabel}
                    />
                </label>
                <button class="absolute right-1 top-1 bottom-1 w-12 rounded-md bg-pink text-dark transition-opacity hover:opacity-80" type="submit" aria-label={localizedUi.about.eventsSearchLabel}>
                    <i class="fas fa-arrow-right" aria-hidden="true"></i>
                </button>
            </form>
        </div>
    </div>

    {#if filteredEvents.length === 0}
        <p class="border border-gray rounded-lg p-6 text-center text-gray">{localizedUi.about.eventsNoResults}</p>
    {:else}
        <div class="flex flex-col gap-5">
            {#each filteredEvents as event (event.name)}
                <article class="flex flex-col gap-5 rounded-lg border border-gray p-4">
                    {#if event.image}
                        <img src={event.image} alt={event.name} class="h-56 w-full rounded-lg object-cover" />
                    {/if}
                    <div class="flex min-w-0 flex-1 flex-col">
                        <div class="mb-3 flex flex-wrap items-center gap-2 text-sm">
                            <time class="inline-flex items-center gap-2 rounded-full bg-pink px-3 py-1 font-bold text-dark" datetime={event.time}>
                                <i class="fas fa-calendar-days text-dark" aria-hidden="true"></i>
                                {event.time}
                            </time>
                            <span class="inline-flex items-center gap-2 text-gray">
                                <i class="fas fa-location-dot" aria-hidden="true"></i>
                                {event.location}
                            </span>
                        </div>
                        <div class="flex items-start justify-between gap-3">
                            <h2 class="text-2xl font-semibold text-white">{event.name}</h2>
                            {#if event.link}
                                <a href={event.link} target="_blank" rel="noreferrer" class="shrink-0 rounded-md bg-black px-3 text-white transition-opacity hover:opacity-80" aria-label={`${localizedUi.about.linkedinPost}: ${event.name}`}>
                                    <i class="fab fa-linkedin text-white" aria-hidden="true"></i>
                                </a>
                            {/if}
                        </div>
                        <p class="mt-3 text-lg">{@html sanitizeHtml(event.summary.replace(/;\[(.*?)\]/g, '<span class="keyword">$1</span>'))}</p>
                    </div>
                </article>
            {/each}
        </div>
    {/if}
</article>