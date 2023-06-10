# textJustifierAPI
Task: Implement and deploy a REST API that justifies a text passed as a parameter\
(Implémenter et déployer une API REST qui justifie un texte passé en paramètre).

## Constraints

- The line length of the [justified](https://fr.wikipedia.org/wiki/Justification_(typographie)) text must be 80 characters.
- The endpoint must be of the form /api/justify and must return a justified text following a POST request with a body of ContentType text/plain
- The API must use an authentication mechanism via unique token. By using for example an api/token endpoint that returns a token from a POST request with a json body {"email": "foo@bar.com"}.
- There must be a rate limit per token for the /api/justify endpoint, set at 80,000 words per day, if there are more during the day then a 402 Payment Required error must be returned.
- Language: Node.js / typescript
- **NO** use of external library for justification
