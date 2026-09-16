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

Configure these GitHub Actions secrets in the `production` environment:

- `DEPLOY_HOST`: Docker host name or IP
- `DEPLOY_USER`: SSH user
- `DEPLOY_SSH_KEY`: private SSH key authorized on the Docker host
- `DEPLOY_PATH`: directory containing the Compose file
- `DEPLOY_REPO_PATH`: server checkout of this `svelte-aoof-ca` repository
- `DEPLOY_PORT`: optional SSH port; defaults to `22`
