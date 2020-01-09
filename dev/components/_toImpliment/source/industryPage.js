import $ from "jquery";
import {
  initCustomSelectPlugin,
  handleParsleyActions
} from "@/scripts/helpers/library";
import { CLASSES } from "@/scripts/helpers/constants";

const switchDescriptionVisibility = () => {
  const switchElem = $(".intro-desc__switch");
  const switchButtonClass = "intro-desc__switch-btn";
  const hiddenElem = $(".intro-desc__hidden-text");
  const seeLessMarkup = `<span class=${switchButtonClass}>See less</span>`;
  const seeMoreMarkup = `... <span class=${switchButtonClass}>See more</span>`;
  let checker = 0;

  switchElem.on("click", function() {
    checker = !checker;
    checker ? switchElem.html(seeLessMarkup) : switchElem.html(seeMoreMarkup);
    hiddenElem.toggleClass(CLASSES.IS_HIDDEN);
  });
};

$(document).ready(function() {
  switchDescriptionVisibility();
  initCustomSelectPlugin();
  handleParsleyActions();

  $('.form--demo').submit(function (e) {
    e.preventDefault();
    const formData = new FormData($(this)[0]);

    $.ajax({
      url: "/en/industry/ajaxDemo",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status) {
          window.location.href = response.page;
        }
      }
    });
  });

  $('.form--explore, #form-user-data').submit(function (e) {
    e.preventDefault();
    const formData = new FormData($(this)[0]);

    $.ajax({
      url: "/en/industry/ajaxLearn",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function(response) {
        if (response.status) {
          window.location.href = response.page;
        }
      }
    });
  });

  $('.js-resend').on("click", function(e) {
    e.preventDefault();

    $.post("/en/industry/ajaxResend");
  });
});
