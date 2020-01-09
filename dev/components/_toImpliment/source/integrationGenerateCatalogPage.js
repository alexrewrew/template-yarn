import $ from "jquery";
import ReduceBreadcrumbs from "@/modules/navigations/bread-crumbs";
import { CLASSES } from "@/scripts/helpers/constants";
import Isotope from "isotope-layout";

const selector = {
  navigation: ".navigation",
  cards: ".cards",
  card: ".card",
  cardWrapper: ".card__wrapper",
  cardClose: ".card__close",
};

const handleSelect = () => {
  $(selector.navigation).on("click", function() {
    $(this).toggleClass(CLASSES.IS_OPEN);
  });

  $(document).click(function(e) {
    if ($(e.target).closest(selector.navigation).length === 0) {
      $(selector.navigation).removeClass(CLASSES.IS_OPEN);
    }
  });
};

const isotope = new Isotope(selector.cards, {
  itemSelector: selector.card,
  masonry: {
      columnWidth: selector.card
  }
});

const openCard = (event) => {
  $(event.target).closest(selector.card).addClass(CLASSES.IS_OPEN).siblings().removeClass(CLASSES.IS_OPEN);
  isotope.layout();
};

const closeCard = (event) => {
  $(event.target).closest(selector.card).removeClass(CLASSES.IS_OPEN);
  isotope.layout();

  event.stopPropagation();
};

$(document).ready(function() {
  handleSelect();
  $(selector.cardClose).on("click", closeCard);
  $(selector.cardWrapper).on("click", openCard);
});