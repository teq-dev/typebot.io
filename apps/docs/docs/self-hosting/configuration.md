---
sidebar_position: 2
---

# Configuration

:::note
The easiest way to get started with Typebot is with [the official managed service in the Cloud](https://app.typebot.io). It takes 1 minute to try out the tool for free. You'll have high availability, backups, security, and maintenance all managed for you by me, Baptiste, Typebot's founder.

That's also the best way to support my work, open-source software, and you'll get great service!
:::

When running Typebot on your machine, the following configuration parameters can be supplied as environment variables.

Typebot is composed of 2 main applications:

- The builder, where you build your typebots
- The viewer, where your user answer the typebot

Both apps have their own environment config files. Here is an exhaustive list of all the parameters you can set:

## Builder

| Parameter              | Default                                       | Description                                                                                                                                                                                                                                 |
| ---------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DATABASE_URL           | postgresql://postgres:typebot@db:5432/typebot | The database URL                                                                                                                                                                                                                            |
| ENCRYPTION_SECRET      | SgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6              | A 256-bit key used to encrypt sensitive data. It is strongly recommended to [generate](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) a new one. The secret should be the same between builder and viewer. |
| ADMIN_EMAIL            | --                                            | The email that will get a "Pro" plan on user creation                                                                                                                                                                                       |
| NEXTAUTH_URL           | http://localhost:3000                         | The builder base URL. Should be the publicly accessible URL (i.e. `https://typebot.domain.com`)                                                                                                                                             |
| NEXT_PUBLIC_VIEWER_URL | http://localhost:3001                         | The viewer base URL. Should be the publicly accessible URL (i.e. `https://bot.domain.com`)                                                                                                                                                  |
| NEXTAUTH_URL_INTERNAL  | --                                            | The internal builder base URL. You have to set it only when `NEXTAUTH_URL` isn't publicly accessible                                                                                                                                        |

<details><summary><h3>Email (Auth, notifications)</h3></summary>
<p>

Used for sending email notifications and authentication

| Parameter                      | Default | Description                                                                                |
| ------------------------------ | ------- | ------------------------------------------------------------------------------------------ |
| SMTP_USERNAME                  | --      | SMTP username                                                                              |
| SMTP_PASSWORD                  | --      | SMTP password                                                                              |
| SMTP_HOST                      | --      | SMTP host. (i.e. `smtp.host.com`)                                                          |
| SMTP_PORT                      | 25      | SMTP port                                                                                  |
| NEXT_PUBLIC_SMTP_FROM          | -       | From name and email (i.e. `"Typebot Notifications" <notifications@typebot.io>`)            |
| NEXT_PUBLIC_SMTP_AUTH_DISABLED | false   | To disable the authentication by email but still use the provided config for notifications |

</p></details>

<details><summary><h3>Google (Auth, Sheets, Fonts)</h3></summary>
<p>

Used authentication in the builder and for the Google Sheets integration step. Make sure to set the required scopes (`userinfo.email`, `spreadsheets`, `drive.readonly`) in your console
The Authorization callback URL should be `$NEXTAUTH_URL/api/auth/callback/google`

| Parameter                    | Default | Description                                   |
| ---------------------------- | ------- | --------------------------------------------- |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | --      | The Client ID from the Google API Console     |
| GOOGLE_CLIENT_SECRET         | --      | The Client secret from the Google API Console |

Used for Google Fonts:

| Parameter                  | Default | Description                             |
| -------------------------- | ------- | --------------------------------------- |
| NEXT_PUBLIC_GOOGLE_API_KEY | --      | The API Key from the Google API Console |

</p></details>

<details><summary><h3>GitHub (Auth)</h3></summary>
<p>

Used for authenticating with GitHub. By default, it uses the credentials of a Typebot-dev app.

You can create your own GitHub OAuth app [here](https://github.com/settings/developers). The Authorization callback URL should be `$NEXTAUTH_URL/api/auth/callback/github`

| Parameter                    | Default | Description                                                                 |
| ---------------------------- | ------- | --------------------------------------------------------------------------- |
| NEXT_PUBLIC_GITHUB_CLIENT_ID | --      | Application client ID. Also used to check if it is enabled in the front-end |
| GITHUB_CLIENT_SECRET         | --      | Application secret                                                          |

</p></details>

<details><summary><h3>GitLab (Auth)</h3></summary>
<p>

Used for authenticating with GitLab.
Follow the official GitLab guide for creating OAuth2 applications [here](https://docs.gitlab.com/ee/integration/oauth_provider.html).
The Authorization callback URL should be `$NEXTAUTH_URL/api/auth/callback/gitlab`

| Parameter                    | Default            | Description                                                                          |
| ---------------------------- | ------------------ | ------------------------------------------------------------------------------------ | --- |
| NEXT_PUBLIC_GITLAB_CLIENT_ID | --                 | Application client ID. Also used to check if it is enabled in the front-end          |
| GITLAB_CLIENT_SECRET         | --                 | Application secret                                                                   |
| GITLAB_BASE_URL              | https://gitlab.com | Base URL of the GitLab instance                                                      |     |
| GITLAB_REQUIRED_GROUPS       | --                 | Comma-separated list of groups the user has to be a direct member of, e.g. `foo,bar` |
| NEXT_PUBLIC_GITLAB_NAME      | GitLab             | Name of the GitLab instance, used for the SSO Login Button                           |

</p></details>

<details><summary><h3>Facebook (Auth)</h3></summary>
<p>

You can create your own Facebook OAuth app [here](https://developers.facebook.com/apps/create/).
The Authorization callback URL should be `$NEXTAUTH_URL/api/auth/callback/facebook`

| Parameter                      | Default | Description                                                                 |
| ------------------------------ | ------- | --------------------------------------------------------------------------- |
| NEXT_PUBLIC_FACEBOOK_CLIENT_ID | --      | Application client ID. Also used to check if it is enabled in the front-end |
| FACEBOOK_CLIENT_SECRET         | --      | Application secret                                                          |

</p></details>

<details><summary><h3>S3 Storage (Media uploads)</h3></summary>
<p>

Used for uploading images, videos, etc... It can be any S3 compatible object storage service (Minio, Digital Oceans Space, AWS S3...)

| Parameter     | Default | Description                                                    |
| ------------- | ------- | -------------------------------------------------------------- |
| S3_ACCESS_KEY | --      | S3 access key. Also used to check if upload feature is enabled |
| S3_SECRET_KEY | --      | S3 secret key.                                                 |
| S3_BUCKET     | typebot | Name of the bucket where assets will be uploaded in.           |
| S3_PORT       | --      | S3 Host port number                                            |
| S3_ENDPOINT   | --      | S3 secret key.                                                 |
| S3_SSL        | true    | Use SSL when establishing the connection.                      |
| S3_REGION     | --      | S3 region.                                                     |

Your bucket must have the following policy that tells S3 to allow public read when an object is located under the public folder:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicRead",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::<BUCKET_NAME>/public/*"
    }
  ]
}
```

You also need to configure CORS so that an object can be uploaded from the browser:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT", "POST"],
    "AllowedOrigins": ["*"],
    "ExposeHeaders": ["ETag"]
  }
]
```

</p></details>

<details><summary><h3>Giphy (GIF picker)</h3></summary>
<p>

Used to search for GIF. You can create a Giphy app [here](https://developers.giphy.com/dashboard/)

| Parameter                 | Default | Description   |
| ------------------------- | ------- | ------------- |
| NEXT_PUBLIC_GIPHY_API_KEY | --      | Giphy API key |

</p></details>

<details><summary><h3>Others</h3></summary>
<p>

The [official Typebot managed service](https://app.typebot.io/) uses other services such as [Stripe](https://stripe.com/) for processing payments, [Sentry](https://sentry.io/) for tracking bugs and [Sleekplan](https://sleekplan.com/) for user feedbacks.

The related environment variables are listed here but you are probably not interested in these if you self-host Typebot.

<details><summary><h4>Stripe</h4></summary>
<p>

| Parameter                     | Default | Description            |
| ----------------------------- | ------- | ---------------------- |
| NEXT_PUBLIC_STRIPE_PUBLIC_KEY | --      | Stripe public key      |
| STRIPE_SECRET_KEY             | --      | Stripe secret key      |
| STRIPE_PRICE_USD_ID           | --      | Pro plan USD price id  |
| STRIPE_PRICE_EUR_ID           | --      | Pro plan EUR price id  |
| STRIPE_PRICE_TEAM_USD_ID      | --      | Team plan USD price id |
| STRIPE_PRICE_TEAM_EUR_ID      | --      | Team plan EUR price id |
| STRIPE_WEBHOOK_SECRET         | --      | Stripe Webhook secret  |

</p></details>

<details><summary><h4>Sentry</h4></summary>
<p>

| Parameter              | Default | Description                            |
| ---------------------- | ------- | -------------------------------------- |
| NEXT_PUBLIC_SENTRY_DSN | --      | Sentry DSN                             |
| SENTRY_AUTH_TOKEN      | --      | Used to upload sourcemaps on app build |
| SENTRY_PROJECT         | --      | Sentry project name                    |
| SENTRY_ORG             | --      | Sentry organization name               |

These can also be added to the `viewer` environment

</p></details>

<details><summary><h4>Vercel (custom domains)</h4></summary>
<p>

| Parameter                  | Default | Description                                     |
| -------------------------- | ------- | ----------------------------------------------- |
| VERCEL_TOKEN               | --      | Vercel API token                                |
| VERCEL_VIEWER_PROJECT_NAME | --      | The name of the viewer project in Vercel        |
| VERCEL_TEAM_ID             | --      | Vercel team ID that contains the viewer project |

</p></details>

<details><summary><h4>Sleekplan</h4></summary>
<p>

| Parameter         | Default | Description                                                              |
| ----------------- | ------- | ------------------------------------------------------------------------ |
| SLEEKPLAN_SSO_KEY | --      | Sleekplan SSO key used to automatically authenticate a user in Sleekplan |

</p></details>

<details><summary><h4>Internal Webhooks</h4></summary>
<p>

| Parameter                | Default | Description                                                                                   |
| ------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| USER_CREATED_WEBHOOK_URL | --      | Webhook URL called whenever a new user is created (used for importing a new SendGrid contact) |

</p></details>

</p></details>

## Viewer

| Parameter              | Default                                       | Description                                                                                                                                                                       |
| ---------------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DATABASE_URL           | postgresql://postgres:typebot@db:5432/typebot | The database URL                                                                                                                                                                  |
| ENCRYPTION_SECRET      | SgVkYp2s5v8y/B?E(H+MbQeThWmZq4t6              | A 256-bit key used to encrypt sensitive data. It is strongly recommended to [generate](https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx) a new one. |
| NEXT_PUBLIC_VIEWER_URL | http://localhost:3001                         | The viewer base URL. Should be the publicly accessible URL (i.e. `https://typebot.io`)                                                                                            |

<details><summary><h3>Emails (Notifications)</h3></summary>
<p>

Used for sending email notifications and authentication

| Parameter             | Default | Description                                                                     |
| --------------------- | ------- | ------------------------------------------------------------------------------- |
| SMTP_USERNAME         | --      | SMTP username                                                                   |
| SMTP_PASSWORD         | --      | SMTP password                                                                   |
| SMTP_HOST             | --      | SMTP host. (i.e. `smtp.host.com`)                                               |
| SMTP_PORT             | 25      | SMTP port                                                                       |
| NEXT_PUBLIC_SMTP_FROM | -       | From name and email (i.e. `"Typebot Notifications" <notifications@typebot.io>`) |

</p></details>

<details><summary><h3>Google (Sheets)</h3></summary>
<p>

Used when executing a Google Sheets block. Make sure to set the required scopes (`userinfo.email`, `spreadsheets`, `drive.readonly`) in your console

| Parameter                    | Default | Description                                   |
| ---------------------------- | ------- | --------------------------------------------- |
| NEXT_PUBLIC_GOOGLE_CLIENT_ID | --      | The Client ID from the Google API Console     |
| GOOGLE_CLIENT_SECRET         | --      | The Client secret from the Google API Console |

</p></details>
