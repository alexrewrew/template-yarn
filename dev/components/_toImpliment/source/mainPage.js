import $ from "jquery";
import { CLASSES } from "@/scripts/helpers/constants";
import "slick-carousel/slick/slick";
import FormActionsCounters from "@/modules/containers/form-actions-counters";

$(document).ready(function() {
  FormActionsCounters();

  $(".js-slider__nav-wrapper").on("init", function() {
    $(".slider").addClass("is-visible");
  });

  $(".js-slider__body").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    draggable: false,
    fade: true,
    cssEase: "linear",
    autoplay: true,
    autoplaySpeed: 9000,
    focusOnSelect: true,
    dots: true,
    asNavFor: ".js-slider__nav-wrapper"
  });

  $(".js-slider__nav-wrapper").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".js-slider__body",
    draggable: false,
    dots: false,
    centerMode: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 639,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          arrows: false,
          dots: false,
          infinite: false
        }
      }
    ]
  });


  if (/Edge/.test(navigator.userAgent)) {
    $(".js-slider__nav-wrapper").addClass("is-ie");
  } else {
    $(".js-slider__nav-wrapper").on("beforeChange", function(
      e,
      slick,
      currentSlide,
      nextSlide
    ) {
      const currentPanel = $(this).find(".slick-current .slider-nav");
      if (currentPanel.length) {
        currentPanel.toggleClass("is-animated");
      }

      const imgDecoration = $(
        `.js-slider__body .slick-slide:nth-of-type(${+nextSlide +
        1}) .slider-decoration img`
      );

      const updGif = function() {
        const th = $(this);
        const imgsrc = th.attr("src");
        th.attr(
          "src",
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAAH6Nf8rAAAABGdBTUEAALGPC/xhBQAAAA5JREFUGBljYBgFgz0EAAGkAAEG/IfIAAAAAElFTkSuQmCC"
        );
        if (
          /MSIE 9/i.test(navigator.userAgent) ||
          /rv:11.0/i.test(navigator.userAgent)
        ) {
          setTimeout(function() {
            th.attr("src", imgsrc);
          }, 150);
        } else {
          th.attr("src", imgsrc);
        }
      };

      imgDecoration.each(updGif);
    });

    $(".js-slider__nav-wrapper").on("afterChange", function(slick, currentSlide) {
      const currentPanel = $(this).find(".slick-current .slider-nav");
      if (!currentPanel.hasClass("is-animated")) {
        setTimeout(() => {
          currentPanel.addClass("is-animated");
        }, 100);
      }
    });
  }

});
