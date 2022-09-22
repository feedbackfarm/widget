# Integrate with your react App

{% hint style="info" %}
**Before you start:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

## Get your Project id

You can get your project id by going to [feedback.farm](https://feedback.farm) and select your project.

## Install the library

Our package is available on NPM

{% tabs %}
{% tab title="Node" %}
```
# Install via NPM
npm install @feedbackfarm/react
```
{% endtab %}
{% endtabs %}

## Add the widget to your site

Suppose that you have a react website looking like this

```jsx
// index.jsx
export default function MyPage() {
    return (
        <div>
            <button>Give feedback</Button>
        </div>
    )
}
```

You then want to wrap your trigger, in this case the button, to the feedback farm widget. You simply need to do like so 👇

```jsx
// index.jsx
import { FeedbackFarm } from '@feedbackfarm/react';

export default function MyPage() {
    return (
        <div>
            <FeedbackFarm projectId="project_id">
                <button>Give feedback</Button>
            </FeedbackFarm>
        </div>
    )
}
```

Now when you click the button, you should see the widget.

## Advanced option

Now that you have the widget working correctly, the widget support some properties that will allow you to customize it. Here's the available properties.

| Property Name | Value Type                                           | Description                                                                                 |
| ------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| endImageUrl   | string                                               | A url to an image that you would like to show when the user submit a feedback.              |
| identifier    | string                                               | A string identifier that represent the user submitting the feedback. Ex: userId, email, ... |
| localization  | [object](../reference/api-reference/localization.md) | You can update the widget default text                                                      |
| pageName      | string                                               | The page where the feedback was submitted                                                   |
| projectId     | string<mark style="color:orange;">\*</mark>          | Feedback Farm project identifier                                                            |
| theme         | [object](../reference/api-reference/theme.md)        | You can specify a theme that will override the default one                                  |
| types         | [object](../reference/api-reference/types.md)        | You can replace the default type, Feature ; Bug ; Other by your own                         |

<mark style="color:orange;">\*required</mark>
