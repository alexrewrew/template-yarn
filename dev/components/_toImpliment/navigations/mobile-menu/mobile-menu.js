import $ from "jquery";
import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import {
  disableElement,
  enableElement
} from "@/scripts/helpers/elementsActions";
import { CLASSES, KEYCODES } from "@/scripts/helpers/constants";
import { redirectToSupportPage } from "@/scripts/helpers/library";


// Include this to Header / Init Header functionality in Global file
class MobileMenu extends Plugin {
  init() {
    const mobileMenuDropDown = () => {
      // itemWithDropdown
      const itemDropDown = $(".main-menu-toggler");

      itemDropDown.on("click", function() {
        const animationDuration = 200;
        itemDropDown.not($(this)).removeClass("has-dropdown");
        $(this).toggleClass("has-dropdown");
        itemDropDown
          .not($(this))
          .find(".mobile-menu__submenu")
          .slideUp(animationDuration);
        $(this)
          .find(".mobile-menu__submenu")
          .slideToggle(animationDuration);
      });
    };
    // drop Mobile word
    // trackHeaderPosition
    // watch
    const mobileHeaderPosition = () => {
      let count = 0;
      let lastScrollTop = 0;
      // $ -
      // let -> const
      const $window = $(window);
      const headerBar = $(".page-header");
      const desktopWidth = 960;
      const offSet = headerBar.innerHeight();

      if ($window.width() < desktopWidth) {
        headerBar.addClass(CLASSES.IS_ACTIVE);
        $window.on("scroll", () => {
          let scrollTop = $window.scrollTop();
          count++;
          if (scrollTop > lastScrollTop && offSet < lastScrollTop) {
            headerBar.removeClass(CLASSES.IS_ACTIVE);
          } else if (count % 30 === 0 || offSet > scrollTop) {
            headerBar.addClass(CLASSES.IS_ACTIVE);
          }
          lastScrollTop = scrollTop;
        });
      }
    };

    $(".user-summary__avatar .user-icon").click(redirectToSupportPage);

    $(window).resize(function() {
      mobileHeaderPosition();
    });

    mobileHeaderPosition();
    mobileMenuDropDown();
  }
}

export default init(MobileMenu, "mobile-menu");
