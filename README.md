# analytics.js-integration-taboola

Taboola integration for analytics.js

## Configuration

You can specify the following parameters in your Astronomer dashboard.

### Script Source

A string specifying your Taboola script to include on the page.

### Events
*optional*

The array of analytics.js events for which you would like this integration to fire.
Supported events are: 

- Bid on Item

For example, if you specify 'Bid on Item' for this configuration option, calling analytics.track('Bid on Item') on your website will fire this integration.

## License

MIT
