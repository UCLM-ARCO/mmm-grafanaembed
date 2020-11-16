Module.register("MMM-GrafanaPanel", {
  defaults: {
    host: "localhost",
    port: 3000,
    dash_orgId: 1,
    dash_refresh: "5m",
    dash_interval: "7d",
  },
  start: function () {
    var now = new Date(Date.now());
    var past = new Date(now);
    switch (this.config.dash_interval.slice(-1)) {
      case "y":
        past.setFullYear(
          past.getFullYear() - parseInt(this.config.dash_interval.slice(0, -1))
        );
        break;
      case "m":
        past.setMonth(
          past.getMonth() - parseInt(this.config.dash_interval.slice(0, -1))
        );
        break;
      case "d":
        past.setDate(
          past.getDate() - parseInt(this.config.dash_interval.slice(0, -1))
        );
        break;
      case "h":
        past.setHours(
          past.getHours() - parseInt(this.config.dash_interval.slice(0, -1))
        );
        break;
      case "min":
        past.setMinutes(
          past.getMinutes() - parseInt(this.config.dash_interval.slice(0, -1))
        );
        break;
      default:
        past.setDate(past.getDate() - 7);
        break;
    }
    this.dash_from = Math.floor(now / 1000);
    this.dash_to = Math.floor(past / 1000);
  },
  getDom: function () {
    var wrapper = document.createElement("div");
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
    panel.width = "450";
    panel.height = "200";
    panel.style = "border: 0px;";
    wrapper.appendChild(panel);
    return wrapper;
  },
});
