import $ from "jquery";
import "parsleyjs";
import "selectric";
import "tooltipster";
import WOW from "wowjs";
import { CLASSES, STRINGS } from "@/scripts/helpers/constants";
import {
  disableElement,
  enableElement
} from "@/scripts/helpers/elementsActions";

// Animations
export const initWowLibrary = () => {
  window.wow = new WOW.WOW({
    live: false
  });
  window.wow.init();
};

// Move this to loader.js
export const initLoader = selector => {
  // Possible to have several loaders
  // If no selector passed on, find closest and use it globally
  const loader = selector || $("." + CLASSES.LOADER_WRAPPER);
  const loaderWrapper = loader.closest("." + CLASSES.LOADER_WRAPPER);

  if (loader.length) {
    if (!loaderWrapper.length) {
      $("body").addClass(CLASSES.LOADER_WRAPPER);
    }
    loader.addClass(CLASSES.IS_ACTIVE);
  }
};

export const hideLoader = () => {
  const loader = $("." + CLASSES.LOADER);
  const document = $("body");

  if (loader.hasClass(CLASSES.IS_ACTIVE)) {
    loader.removeClass(CLASSES.IS_ACTIVE);
  }

  if (document.hasClass(CLASSES.LOADER_WRAPPER)) {
    document.removeClass(CLASSES.LOADER_WRAPPER);
  }
};

export const handleFormCallback = (formId, callbackFn) => {
  const form = $("#" + formId);
  const formSubmit = form.find("." + CLASSES.FORM_SUBMIT);

  if (form.length) {
    form
      .parsley()
      .on("form:success", function() {
        disableElement(formSubmit);
      })
      .on("form:submit", function() {
        if (typeof callbackFn === "function") {
          callbackFn.call();
          return false;
        }
      });
  }
};

// Forms functionality
const addParsleyFieldAttrs = form => {
  const email = form.find('input[type="email"]');
  if (email.length) {
    if (!email.data("parsleyType")) {
      email.attr("data-parsley-type", "email");
    }
    if (!email.data("parsleyRequiredMessage")) {
      email.attr(
        "data-parsley-required-message",
        STRINGS.REQUIRED_FIELD_ERROR_MESSAGE
      );
    }
  }
};

const hideErrorByEvent = event => {
  $(`.${CLASSES.FORM_INPUT}`).on(event, function() {
    const input = $(this);
    input.parsley().reset();
  });
};

export const handleParsleyActions = () => {
  const forms = $("form");

  if (forms.length) {
    forms.each(function() {
      const form = $(this);

      form.attr("data-parsley-focus", "none");
      addParsleyFieldAttrs(form);

      form
        .parsley({
          requiredMessage: "This field is required"
        })
        .on("field:error", function() {
          const field = this.$element;
          const selectWrapperClass = ".selectric-wrapper";
          if (field.is("select")) {
            const selectWrapper = field.parents(selectWrapperClass);

            if (selectWrapper.length) selectWrapper.addClass("has-error");
          }
        })
        .on("form:error", function() {
          const control = $(".parsley-error:first");
          const label = control
            .parent()
            .parent()
            .find(".form-label");
          const labelHeight = label.height() + 10;
          const controlTopOffset = control.offset().top - labelHeight;
          if (control.length && label.length && !label.inView())
            window.scrollTo({ top: controlTopOffset, behavior: "smooth" });
        });
    });
  }
  hideErrorByEvent("focus");
};

export const initCustomSelectPlugin = () => {
  const hideCustomSelectError = event => {
    const select = $(event);

    if (select.length && select.hasClass("parsley-error")) {
      const selectWrapper = select.parents(".selectric-wrapper.has-error");

      if (selectWrapper.length) selectWrapper.removeClass("has-error");
      select.parsley().reset();
    }
  };

  $("select").selectric({
    onBeforeOpen: function() {
      $("select").selectric("close");
    },
    onOpen: hideCustomSelectError,
    onChange: hideCustomSelectError,
    maxHeight: 282,
  });
};

export const getScrollBarWidth = function() {
  const inner = document.createElement("p");
  inner.style.width = "100%";
  inner.style.height = "200px";

  const outer = document.createElement("div");
  outer.style.position = "absolute";
  outer.style.top = "0px";
  outer.style.left = "0px";
  outer.style.visibility = "hidden";
  outer.style.width = "200px";
  outer.style.height = "150px";
  outer.style.overflow = "hidden";
  outer.appendChild(inner);

  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) w2 = outer.clientWidth;

  document.body.removeChild(outer);

  return w1 - w2;
};

export const bindJQuery = function() {
  window.$ = window.JQuery = window.jQuery = $;
};

export const attachIE11helper = () => {
  if (navigator.userAgent.match(/Trident.*rv:11\./))
    $("body").addClass("is-ie11");
};

export const showFunctionalityLinks = () => {
  $(".js-functionality-links-button").on("click", function() {
    const self = $(this);
    const viewMoreModifier = "functionality-links__button--view-more";
    const viewLessModifier = "functionality-links__button--view-less";
    const categoryElem = ".functionality-links__category";
    const itemElem = ".functionality-links__item";
    const viewMoreText = "View more";
    const viewLessText = "View less";
    const maxItems = 4;

    if (self.hasClass(viewMoreModifier)) {
      self
        .removeClass(viewMoreModifier)
        .addClass(viewLessModifier)
        .text(viewLessText)
        .parents(categoryElem)
        .find(itemElem)
        .each(function(i, item) {
          $(item).removeClass(CLASSES.IS_HIDDEN);
        });
    } else if ($(this).hasClass(viewLessModifier)) {
      self
        .removeClass(viewLessModifier)
        .addClass(viewMoreModifier)
        .text(viewMoreText)
        .parents(categoryElem)
        .find(itemElem)
        .each(function(i, item) {
          if (i + 1 > maxItems) {
            $(item).addClass(CLASSES.IS_HIDDEN);
          }
        });
    }
  });
};

export const redirectToSupportPage = () => {
  const lang = window.lang || $("html").attr("lang");
  const hostName = window.hostname || "//www.pdffiller.com/";
  window.location = "https://" + hostName + "/" +lang +
    "/account/personal_information";
};