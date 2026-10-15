# Security Policy

## Supported versions

Security fixes target the latest code on the `main` branch. Older commits may not receive fixes.

## Reporting a vulnerability

Please do not publish credentials, exploitable details, or unpatched vulnerabilities in a public issue. Contact the repository maintainers privately through the GitHub profile/contact method associated with **Strong-Bee**. Include:

- A concise description and affected route/component.
- Reproduction steps and impact.
- A minimal proof of concept that does not access other people's data.
- Any suggested mitigation.

Please allow maintainers reasonable time to investigate before public disclosure. Do not include API keys, access tokens, personal data, or production secrets in the report.

## Security expectations

- Keep secrets in environment variables or a dedicated secret manager, never in source control.
- Treat external API responses, RSS content, query parameters, and user-provided symbols as untrusted input.
- Avoid arbitrary URL proxying and unsafe HTML rendering.
- Use least-privilege GitHub Actions permissions.
- Review dependency and workflow changes before merging.
