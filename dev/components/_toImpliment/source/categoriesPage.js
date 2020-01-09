import $ from "jquery";
import { CLASSES } from "@/scripts/helpers/constants";

$(document).ready(function() {
  $(".js-view-all").on("click", function() {
    $(".functionality__item").removeClass(CLASSES.IS_HIDDEN);
    $(".functionality__action").addClass(CLASSES.IS_HIDDEN);
  });
});
