# Custom domain for public board

Your public board could be accessible at a custom domain.

{% hint style="info" %}
**Good to know:** You first need to create an account on [feedback.farm](https://feedback.farm).
{% endhint %}

First, go to your project [settings page](https://feedback.farm/app/projects) on feedback.farm. Select the project you want to setup.

Enable the public board by toggling the switch right to “Public Board”. Then in the input type the domain you want to use. For example “roadmap.gotwo.ca”. Press the button “save”

A window will open with the information you need to setup on your domain registrar.

You will need to add a CNAME record pointing to [cname.vercel-dns.com](http://cname.vercel-dns.com/).

When you have configured the record, it will take between 1 - 48h before you can access your roadmap from your domain.
