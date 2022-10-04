# Integrate with your html website

{% hint style="info" %}
**Good to know:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

## Get your Project id

You can get your project id by going to [feedback.farm](https://feedback.farm) and select your project.

## Add the widget to your site

Suppose that you have and HTML website like this

```html
// index.html
<html>
  <head>
    ...
  </head>

  <body>
    <button>Give Feedback</button>
  </body>
</html>
```

You then want to add the script and the attributes to the button

```jsx
// index.html
<html>
  <head>
    <script
      src="https://unpkg.com/@feedbackfarm/js@1.0.5/dist/widget.js"
      defer
    ></script>
  </head>

  <body>
    <button data-feedback-farm data-feedback-farm-project-id="123">
      Give Feedback
    </button>
  </body>
</html>
```

Now when you click the button, you should see the widget.

## Advanced option

Now that you have the widget working correctly, the widget support some properties that will allow you to customize it. Here's the available properties.

| Property Name                    | Value Type                                                                                                                                                                                 | Description                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------- |
| data-feedback-farm               | empty<mark style="color:orange;">\*</mark>                                                                                                                                                 | You need to add this attributes to make it work                                             |
| data-feedback-farm-identifier    | string                                                                                                                                                                                     | A string identifier that represent the user submitting the feedback. Ex: userId, email, ... |
| data-feedback-farm-localization  | [object](https://app.gitbook.com/o/VBH06CYvOzNhVZK9sRHj/s/a9gd73UQNnS1pMoeQJii/~/changes/SNS09pVy6kzD4Rbn3tQW/reference/api-reference/localization)<mark style="color:orange;">\*\*</mark> | You can update the widget default text                                                      |
| data-feedback-farm-page-name     | string                                                                                                                                                                                     | The page where the feedback was submitted                                                   |
| data-feedback-farm-project-id    | string<mark style="color:orange;">\*</mark>                                                                                                                                                | Feedback Farm project identifier                                                            |
| data-feedback-farm-theme         | [object](https://app.gitbook.com/o/VBH06CYvOzNhVZK9sRHj/s/a9gd73UQNnS1pMoeQJii/~/changes/SNS09pVy6kzD4Rbn3tQW/reference/api-reference/theme)<mark style="color:orange;">\*</mark>          | You can specify a theme that will override the default one                                  |
| data-feedback-farm-types         | [object](https://app.gitbook.com/o/VBH06CYvOzNhVZK9sRHj/s/a9gd73UQNnS1pMoeQJii/~/changes/SNS09pVy6kzD4Rbn3tQW/reference/api-reference/types)<mark style="color:orange;">\*\*</mark>        | You can replace the default type, Feature ; Bug ; Other by your own                         |
| data-feedback-farm-end-image-url | string                                                                                                                                                                                     | A url to an image that you would like to show when the user submit a feedback.              |

<mark style="color:orange;">\*required</mark>\ <mark style="color:orange;">\*\*Need to be "stringified"</mark>
