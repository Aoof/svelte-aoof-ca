# Aoof.ca

## Author

Abdulrahman Mousa [(aoof.ca)](https://aoof.ca)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT) - see the LICENSE.md file for details

## Acknowledgments

1. [Loading Spinners [Svelte.dev]](https://svelte.dev/repl/14a03ba29cbc408f8d26904c2f59a985?version=3.46.4)

## Deployment

Pushes to `master`, including commits made through Sveltia CMS, trigger
`.github/workflows/deploy-portfolio.yml`. The workflow updates the server's
Compose checkout, rebuilds `aoof-portfolio`, and recreates only that service.

### Sveltia CMS

The CMS is available at `/admin/`. Sveltia writes localized page data to
`content/` and uploaded media to `static/media/`. The production Docker image
copies both directories into the runtime image; provide environment variables
such as `PUBLIC_WEB3_ACCESSKEY` through the deployment environment instead of
copying `.env` into the image.

#### GitHub authentication

This site is self-hosted, so its Sveltia CMS GitHub OAuth callback cannot be
handled by the site itself. The `base_url` in `static/admin/config.yml` must
point to a separately deployed
[Sveltia CMS Authenticator](https://github.com/sveltia/sveltia-cms-auth)
Cloudflare Worker. Do not point it at `https://aoof.ca`: `/auth` is not an
application route in this SvelteKit app and will return the site's 404 page.

Set up the authenticator before changing the CMS configuration:

1. Deploy `sveltia/sveltia-cms-auth` to Cloudflare Workers and note its
   Worker URL, for example `https://sveltia-cms-auth.example.workers.dev`.
2. Create a GitHub OAuth App whose callback URL is the Worker URL followed by
   `/callback`, for example
   `https://sveltia-cms-auth.example.workers.dev/callback`.
3. Configure the Worker with encrypted `GITHUB_CLIENT_SECRET`, the matching
   `GITHUB_CLIENT_ID`, and `ALLOWED_DOMAINS=aoof.ca,*.aoof.ca`.
4. Replace the current `base_url` value in `static/admin/config.yml` with the
   Worker URL (without `/auth`):

   ```yaml
   backend:
     name: github
     repo: Aoof/svelte-aoof-ca
     branch: master
     base_url: https://sveltia-cms-auth.example.workers.dev
   ```

5. Commit and deploy the configuration change, then open `/admin/` and retry
   GitHub sign-in. Sveltia appends `/auth` to the configured Worker URL.

Configure these GitHub Actions secrets in the `production` environment:

- `DEPLOY_HOST`: Docker host name or IP
- `DEPLOY_USER`: SSH user
- `DEPLOY_SSH_KEY`: private SSH key authorized on the Docker host
- `DEPLOY_PATH`: directory containing the Compose file
- `DEPLOY_REPO_PATH`: server checkout of this `svelte-aoof-ca` repository
- `DEPLOY_PORT`: optional SSH port; defaults to `22`
