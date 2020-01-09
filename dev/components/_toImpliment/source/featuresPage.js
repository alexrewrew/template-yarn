import $ from "jquery";
import ReduceBreadcrumbs from "@/modules/navigations/bread-crumbs";

const handleSelect = () => {
  $(".features__navigation").on("click", function() {
    $(this).toggleClass("features__navigation--open");
  });

  $(document).click(function(e) {
    if ($(e.target).closest(".features__navigation").length === 0) {
      $(".features__navigation").removeClass("features__navigation--open");
    }
  });
};

$(document).ready(function() {
  ReduceBreadcrumbs();
  handleSelect();
});
