# MMM-GrafanaEmbed

A [MagicMirror²](https://magicmirror.builders/) module for displaying graphs and charts using [Grafana](https://grafana.com/). It is needed a running Grafana instance for this module to work. You can install Grafana following its [official documentation](https://grafana.com/docs/grafana/latest/installation/).

## Screenshots

![MMM-GrafanaEmbed screenshot](/public/mmm-grafanaembed.png)

## Installation

```shell
pi@raspberry:/path/to/MagicMirror/modules/$ git clone https://bitbucket.org/arco_group/mmm-grafanaembed.git MMM-GrafanaEmbed
```

To install it with Debian package `magic-mirror-2`:

```shell
pi@raspberry:~/$ sudo apt install mm2-grafanaembed
```

## Configuration

### Grafana

```ini
[auth.anonymous]
enabled = true

[security]
allow_embbeding = true
```

### Magic Mirror

```js
modules: [
    {
        module: 'MMM-GrafanaEmbed',
        position: 'top_left',
        config: {
            host: "localhost",                  // Host where Grafana is running
            port: 3000,                         // Port where Grafana is running
            dash_id: 'c9b38467',                // Dashboard id
            dash_name: 'dashboard-name',        // Dashboard name 
            dash_orgId: 1,                      // Dashboard provider orgId
            panels: [1],                        // List of panel ids
            dash_refresh: "5m",                 // Refresh interval
            dash_interval: "7d",                // Time range, from now to specified range
            width: "25vw",                      // Width of panels
            height: "20vh"                      // Height of panels
        }
    }
]
```

**Where is my dashboard and panel information?**

   There are two diferent type of files when provisioning dashboards to Grafana:

   * Dashboard providers: located on which is [Grafana provisioning path](https://grafana.com/docs/grafana/latest/administration/configuration/#provisioning). This holds the `dash_orgId` parameter as `orgId`, and where to look for dashboards definitions with `path` parameter. See [this page](https://grafana.com/docs/grafana/latest/administration/provisioning/#dashboards) for an example of this file.
   
   * Dashboard definitions: This are JSON files, and they hold `dash_id`, as `uid`, and `dash_name`, as `title`, on the first level object. Then, inside the list `panels`, you can find `panel_id` for each panel object found on it. You can get the JSON definition of a dashboard through the Grafana UI with Share Dashboard > Export > View JSON.
