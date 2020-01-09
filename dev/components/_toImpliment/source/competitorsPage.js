import $ from "jquery";
import { CLASSES } from "@/scripts/helpers/constants";
import lazyframe from "lazyframe";

function showMoreFaqContent() {
  $(".accordion__item:nth-child(n + 6)").addClass(CLASSES.IS_HIDDEN);

  $(".js-show-more").on("click", function() {
    $(".accordion__item").removeClass(CLASSES.IS_HIDDEN);
    $(".faq__action").addClass(CLASSES.IS_HIDDEN);
    $(".accordion").addClass("hidden-button")
  });
}

function videoLazyframe() {
  let elements = $(".video-player__lazyframe");

  lazyframe(elements, {
    onAppend: iframe => {
      $(iframe).attr("allow", "autoplay");
    }
  });
}

function compareTabletGradient() {
  var overflowBlock = $('.comparisons-table-wrapper--scroll'),
      tableAsideGradient = $('.comparisons-table__gradient'),
      table = $('.comparisons-table--four-column');

  overflowBlock.scroll(function () {
      var position = $(this).scrollLeft();
      console.log(position, overflowBlock.width(), table.width());

      if ((position + overflowBlock.width()) > table.width() - 10) {
          tableAsideGradient.addClass('is-hidden');
      } else {
          tableAsideGradient.removeClass('is-hidden');
      }
  });
}

$(document).ready(function() {
  showMoreFaqContent();
  videoLazyframe();
  compareTabletGradient();
});