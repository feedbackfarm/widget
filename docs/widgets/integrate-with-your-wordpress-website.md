# Integrate with your wordpress website

{% hint style="info" %}
**Before you start:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

## Get your Project id

You can get your project id by going to [feedback.farm](https://feedback.farm) and select your project.

## Installation

Follow the [official Wordpress plugin installation instruction](https://wordpress.org/support/article/managing-plugins/#automatic-plugin-installation-1). You can search the plugin as [Feedback Farm](https://wordpress.org/plugins/feedback-farm/).

## Configuration

There's two ways of configuring the plugin. You can either add a "Give Feedback" button to your wordpress site menu or you can add the widget to any HTML element of your website.

### Wordpress Menu Configuration

Go to the Wordpress admin panel and click on the Feedback Farm plugin configuration page.

The simplest way to configure the plugin is to fill-up the project id field with the one you did get on feedback.farm website.

By doing this, a "Give Feedback" button will be added to your wordpress menu.

#### Advanced Configuration

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
