Module.register("MMM-GrafanaEmbed", {
  defaults: {
    host: "localhost",
    port: 3000,
    dash_orgId: 1,
    dash_refresh: "5m",
    dash_interval: "7d",
    width: "450",
    height: "200",
  },
  start: function () {
    this.dash_from = "now-" + this.config.dash_interval
    this.dash_to = "now"
  },
  getDom: function () {
    var panel = document.createElement("iframe");
    panel.src =
      "http://" +
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
      this.dash_to +
      "&panelId=" +
      this.config.panel_id;
    panel.width = this.config.width;
    panel.height = this.config.height;
    panel.style = "border: 0px;";
    return panel;
  },
});
