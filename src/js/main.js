$("[data-theme]").on("click", function() {
    var theme = $(this).attr("data-theme");
  $("body").removeClass().addClass(theme);
});
