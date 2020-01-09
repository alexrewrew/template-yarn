import $ from "jquery";
import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import {
  disableElement,
  enableElement
} from "@/scripts/helpers/elementsActions";
import { CLASSES, KEYCODES } from "@/scripts/helpers/constants";
import { initLoader, hideLoader, redirectToSupportPage } from "@/scripts/helpers/library";

// Include this to Header / Init Header functionality in Global file
class MainMenu extends Plugin {
  init() {
    $.fn.putCursorAtEnd = function() {
      return this.each(function() {
        // Cache references
        const $el = $(this);
        const el = this;
        // Only focus if input isn't already
        if (!$el.is(":focus")) {
          $el.focus();
        }
        // If this function exists... (IE 9+)
        if (el.setSelectionRange) {
          // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
          const len = $el.val().length * 2;

          // Timeout seems to be required for Blink
          setTimeout(function() {
            el.setSelectionRange(len, len);
          }, 1);
        } else {
          // As a fallback, replace the contents with itself
          // Doesn't work in Chrome, but Chrome supports setSelectionRange
          $el.val($el.val());
        }
        // Scroll to the bottom, in case we're in a tall textarea
        // (Necessary for Firefox and Chrome)
        this.scrollTop = 999999;
      });
    };

    const userAccountWrapper = $(".js-user-account");
    const userAccount = userAccountWrapper.find(".user-dropdown-menu");
    const itemWithSubmenu = $(".main-menu__item.has-dropdown");
    const userName = $(".user-dropdown-name");
    const userNameValue = $(".user-dropdown-name__value");
    const userNameInput = $(".user-dropdown-name__input");
    const userNameSubmit = $(".user-dropdown-name__submit");
    const userIcon = $(".user-dropdown-summary__avatar .user-icon");

    const changeUserName = () => {
      const inputValue = userNameInput.val().trim();
      const splittedValue = inputValue.split(" ");
      const csrfTokenElement = $('input[name="action__changeFL"]');
      const lang = window.lang || "en";
      let csrfToken = null;
      let firstName = null;
      let lastName = null;

      userNameInput.blur();

      if (splittedValue[0]) firstName = splittedValue[0];
      if (splittedValue[1]) lastName = splittedValue[1];
      if (csrfTokenElement.length) csrfToken = csrfTokenElement.val();

      // Set Placeholder if entered empty string
      if (inputValue.length < 1) {
        userNameValue.text("Your Name");
      } else {
        userNameValue.html(inputValue);
      }

      if (userName.hasClass(CLASSES.IS_ACTIVE))
        userName.removeClass(CLASSES.IS_ACTIVE);

      const payload = {
        fname: firstName || "",
        lname: lastName || "",
        csrf: {
          token: csrfToken,
          prefix: "action__",
          formName: "action__changeFL"
        }
      };

      // initLoader();

      $.ajax({
        url: "/" + lang + "/account/ajaxChangePersonalInfo",
        type: "POST",
        data: payload,
        contentType: "application/x-www-form-urlencoded; charset=utf-8",
        dataType: "json"
      });
    };

    $(document).on("click", function(event) {
      const target = $(event.target);

      if (
        !target.closest(userName).length &&
        userName.hasClass(CLASSES.IS_ACTIVE)
      ) {
        userName.removeClass(CLASSES.IS_ACTIVE);
        userNameInput.blur();
      }
      if (
        target.is(userAccountWrapper) ||
        target.closest(userAccountWrapper).length
      ) {
        if (target.is(userIcon)) redirectToSupportPage();
        else if (event.target.tagName === "A") return;
        else if (target.closest(userAccount).length) return false;
        else if (target.closest(userAccountWrapper).length)
          userAccountWrapper.toggleClass(CLASSES.IS_OPEN);
      } else {
        userAccountWrapper.removeClass(CLASSES.IS_OPEN);
        userName.removeClass(CLASSES.IS_ACTIVE);
      }
    });

    $(document).keydown(function(event) {
      if (event.keyCode === KEYCODES.ESC) {
        if (userName.hasClass(CLASSES.IS_ACTIVE))
          userName.removeClass(CLASSES.IS_ACTIVE);
        else if (userAccountWrapper.hasClass(CLASSES.IS_OPEN))
          userAccountWrapper.removeClass(CLASSES.IS_OPEN);
        userNameInput.blur();
      }

      if (event.keyCode === KEYCODES.ENTER) {
        if ($(event.target).is(userNameInput)) changeUserName();
      }
    });

    itemWithSubmenu
      .on("mouseenter click", function() {
        // Delay for transition-delay applied on Main Menu item
        setTimeout(() => {
          userAccountWrapper.removeClass(CLASSES.IS_OPEN);
        }, 200);
      })
      .on("mouseenter", function() {
        const currentItem = $(this);

        setTimeout(() => {
          if (!currentItem.hasClass(CLASSES.IS_OPEN))
            currentItem.addClass(CLASSES.IS_OPEN);
        }, 200);
      })
      .on("mouseleave", function() {
        const currentItem = $(this);

        setTimeout(() => {
          if (currentItem.hasClass(CLASSES.IS_OPEN))
            currentItem.removeClass(CLASSES.IS_OPEN);
        }, 200);
      }).on("click", function() {
        const currentItem = $(this);
        
        setTimeout(() => {
          currentItem.toggleClass(CLASSES.IS_OPEN);
        }, 190);
      });

    userName.on("click", function(event) {
      const target = $(event.target);
      const valueToSet = userNameValue.text();

      if (target.is(userNameInput) || target.is(userNameSubmit)) return false;

      userName.addClass(CLASSES.IS_ACTIVE);
      enableElement(userNameInput);
      userNameInput
        .val(valueToSet)
        .focus()
        .putCursorAtEnd();
    });

    userNameSubmit.on("click", changeUserName);
  }
}

export default init(MainMenu, "main-menu");
