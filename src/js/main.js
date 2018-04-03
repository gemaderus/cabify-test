$("[data-theme]").on("click", function() {
  $("body").removeClass().addClass(this.value);
});
