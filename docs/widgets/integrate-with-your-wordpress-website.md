# Integrate with your wordpress website

{% hint style="info" %}
**Before you start:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

## Get your Project id

You can get your project id by going to [feedback.farm](https://feedback.farm) and select your project.

## Installation

Follow the [official Wordpress plugin installation instruction](https://wordpress.org/support/article/managing-plugins/#automatic-plugin-installation-1). You can search the plugin as [Feedback Farm](https://wordpress.org/plugins/feedback-farm/).

## Configuration

There's two ways of configuring the plugin. You can either add a "Give Feedback" button to your [wordpress site menu](https://docs.feedback.farm/integrate-with-your-wordpress-website#wordpress-menu-configuration) or you can add the widget to any [HTML element](https://docs.feedback.farm/widgets/integrate-with-your-wordpress-website#html-element-configuration) of your website.

### Wordpress Menu Configuration

Go to the Wordpress admin panel and click on the Feedback Farm plugin configuration page.

Complete the "Project Id" field with your project id from feedback.farm.

Now in your menu, a "Give Feedback" button will be added.

#### Advanced option

Their is some advanced attributes that you can use. Refer to the HTML widget [advanced option](https://docs.feedback.farm/widgets/integrate-with-your-html-website#advanced-option).

### HTML Element Configuration

Supposing that you have a button on your website looking like this

```html
<button>Give Feedback</button>
```

You want to add those 2 attributes to the button to make it work with the Feedback Farm widget.

```html
<button data-feedback-farm data-feedback-farm-project-id="project_id">
  Give feedback
</button>
```

Now when you click the button, you will see the widget.

#### Advanced option

Their is some advanced attributes that you can use. Refer to the HTML widget [advanced option](https://docs.feedback.farm/widgets/integrate-with-your-html-website#advanced-option).
