Module.register("MMM-GrafanaEmbed", {
  defaults: {
    host: "localhost",
    port: 3000,
    dash_orgId: 1,
    dash_refresh: "5m",
    dash_interval: "7d"
  },
  start: function () {
    this.dash_from = "now-" + this.config.dash_interval
    this.dash_to = "now"
  },
  getStyles: function () {
    return [
      this.file("css/style.css")
    ]
  },
  getDom: function () {
    var wrapper = document.createElement("div")
    wrapper.className = "grafana row"
    var base_href = "http://" +
      this.config.host +
      ":" +
      this.config.port +
      "/d-solo/" +
      this.config.dash_id +
      "/" +
      this.config.dash_name +
      "?orgId=" +
      this.config.dash_orgId +
      "&refresh=" +
      this.config.dash_refresh +
      "&from=" +
      this.dash_from +
      "&to=" +
      this.dash_to
    for (let index = 0; index < this.config.panels.length; index++) {
      var container = document.createElement("div")
      container.className = "grafana column"
      var panel = document.createElement("iframe")
      panel.src = base_href + "&panelId=" + this.config.panels[index]
      panel.className = "grafana panel"
      if (this.config.width != undefined && this.config.height != undefined) {
        panel.width = this.config.width
        panel.height = this.config.height
      } else if (this.config.width != undefined || this.config.height != undefined) {
        Log.error("Width and height must come together. Ignoring those values for panel " + this.config.panels[index] + ".")
      }
      container.appendChild(panel)
      wrapper.appendChild(container)
    }
    return wrapper;
  },
});
