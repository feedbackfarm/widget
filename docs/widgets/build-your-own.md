# Build your own

If the default widget doesn't fit your needs, you can build your own widget with the feedback.farm API.

{% hint style="info" %}
**Good to know:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

## Configuration

Build your widget in the way you prefer. The only requirement is you need to be able to make a POST request.

- The http method is `POST`
- Endpoint URL: `https://api.feedback.farm/api/feedbacks/add`
- Content-Type: `application/json`
- The body is a stringified JSON with the following attributes:
  - projectId
  - feedback
  - identifier
  - type
  - pageName

Here's an example of a request with the required attributes in Javascript.

```javascript
fetch("https://api.feedback.farm/api/feedbacks/add", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ projectId, feedback, identifier, type, pageName }),
});
```
