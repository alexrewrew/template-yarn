import $ from "jquery";
import "slick-carousel/slick/slick";
import MicroModal from "micromodal";
import { 
  initCustomSelectPlugin,
  handleParsleyActions,
  handleFormCallback,
  initLoader,
  hideLoader
} from "@/scripts/helpers/library";
import { resetForm } from "./helpers/elementsActions";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";

function lineClamp() {
  const ellipsisText = (e, etc) => {
    const wordArray = e.innerHTML.trim().split(" ");
    while (e.scrollHeight > e.offsetHeight) {
      wordArray.pop();
      e.innerHTML = wordArray.join(" ") + (etc || "...");
    }
  };


  [].forEach.call(document.querySelectorAll(".page-section--related-content .checked-list__description"), function(elem) {
    ellipsisText(elem);
  });

}

$(document).ready(function() {
  lineClamp();
  initCustomSelectPlugin();
  handleParsleyActions();

  $(".js-efficiency-slider-viewport").on("init", function() {
    $(".js-efficiency-slider-viewport").addClass("is-visible");
  });

  const slickSliderBenefits = () => {
    $(".js-efficiency-slider-viewport")
      .not(".slick-initialized")
      .slick({
        dots: true,
        arrows: false,
        fade: true,
        cssEase: "linear",
        speed: 150,
        autoplaySpeed: 4000,
        autoplay: true,
        infinite: true,
        pauseOnHover: true,
        pauseOnFocus: false,
        pauseOnDotsHover: !(
          !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform)
        )
      });
  };

  slickSliderBenefits();

  $(window).on("resize", function() {
    slickSliderBenefits();
  });

  let sliderIsHidden = true;

  $(window).scroll(function() {
    const element = document.querySelector(".efficiency-slider");
    const position = element.getBoundingClientRect();

    if (
      position.top < window.innerHeight &&
      position.bottom >= 0 &&
      sliderIsHidden
    ) {
      $(".js-efficiency-slider-viewport").slick("slickGoTo", 0, true);
      sliderIsHidden = false;
    }
  });

  $(".js-efficiency-slider-viewport .slick-dots li").on(
    "mouseover click touch touchstart",
    function() {
      $(".js-efficiency-slider-viewport .slick-dots li").removeClass("filled");
      $(this).addClass("filled");
      $(".js-efficiency-slider-viewport").slick("goTo", $(this).index());
    }
  );

  $(".js-efficiency-slider-viewport").on("beforeChange", function(
    e,
    slick,
    currentSlide,
    nextSlide
  ) {
    if (nextSlide) {
      $(".js-efficiency-slider-viewport .slick-dots li").removeClass("filled");
    }
  });

  $('.form--explore').submit(function (e) {
    e.preventDefault();
    const form = $('.form--explore');
    const formData = new FormData($(this)[0]);
    const formAction = $('.form--explore').attr('action');

    $.ajax({
      url: formAction,
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function() {
        resetForm(form);

        if ($('#modal-form').hasClass('is-open')) {
          $('.form-popup__close').click();
        }

        MicroModal.show('modal-success');
      }
    });
  });
});