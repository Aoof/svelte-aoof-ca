# Website content

This directory is the source of editable website content, managed through Sveltia CMS at `/admin`. Field names mirror `src/lib/content/types.ts` and `static/admin/config.yml`.

- `settings.json` and `home.json` hold English at the root and French under `fr`.
- `tracks/`, `projects/`, `experience/` and `events/` hold one JSON file per entry, each with an `en` and a `fr` object.
- Projects and experience carry `tracks` (`web`, `game`, `qa`, `software`). Each `/hire/[track]` page filters the same shared pool, and its skills come from the `stack` of the projects it shows.
- Dates are `YYYY-MM`. An empty `end` means ongoing, so "present" can't go stale.
- A project with a `story` (`problem`, `did`, `with`, `result`) gets the full case-study layout.

Content changes are committed to GitHub by Sveltia CMS and show up after the normal build and deployment.
