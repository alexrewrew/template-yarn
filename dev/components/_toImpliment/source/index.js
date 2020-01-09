import $ from "jquery";
import { handleFormCallback } from "@/scripts/helpers/library";
import { CLASSES } from "@/scripts/helpers/constants";

const switcherLink = ".content-switches-panel__link";
const componentContent = ".content-switches-container";
const hash = window.location.hash || "#sections";
const componentButton = ".component__nav-item";
const componentPanel = ".component__panel";
const component = ".component";

$(switcherLink + '[data-hash="' + hash + '"]').addClass(CLASSES.IS_ACTIVE);
$(componentContent + '[data-hash="' + hash + '"]').show();

$(document).on("click", switcherLink, function(e) {
  e.preventDefault();

  const hash = $(this).attr("data-hash");

  window.location.hash = hash;

  $(switcherLink).removeClass(CLASSES.IS_ACTIVE);
  $(this).addClass(CLASSES.IS_ACTIVE);

  $(componentContent).hide();
  $(componentContent + '[data-hash="' + hash + '"]').show();
});

$(document).on("click", componentButton, function() {
  const index = $(this).index();
  $(this).parents( component).find(componentButton).removeClass(CLASSES.IS_ACTIVE);
  $(this).parents(component).find(componentPanel).removeClass(CLASSES.IS_ACTIVE);
  $(this).addClass(CLASSES.IS_ACTIVE);
  $(this).parents(component).find(componentPanel).eq(index).addClass(CLASSES.IS_ACTIVE);
});

$(document).ready(function() {
  handleFormCallback("form-demo", () => {
    alert("test");
  });
});
