# Webhooks

When you receive a new feedback, we'll send a HTTP POST payload to the URL you provide.

## Configuration

1. Go in the [setting page](https://feedback.farm/app/settings)
2. Add your webhook URL next to the Webhook field.
3. Click on the "Save" button.

## Payload

```js
{
	id: string,
    text: string,
	createdAt: Date,
    type: 'BUG' | 'OTHER' | 'FEATURE',
	identifier: string
}
```
