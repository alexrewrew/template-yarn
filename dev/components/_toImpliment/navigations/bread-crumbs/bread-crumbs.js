import $ from "jquery";
import Plugin from "@/scripts/core/Plugin";
import init from "@/scripts/core/init";
import {
  disableElement,
  enableElement
} from "@/scripts/helpers/elementsActions";
import { CLASSES, KEYCODES } from "@/scripts/helpers/constants";

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
      let topPosition = 0;
      // $ -
      // let -> const
      let $window = $(window);
      let headerBar = $(".page-header");
      let desktopWidth = 960;
      let offSet = headerBar.innerHeight();

      if ($window.width() < desktopWidth) {
        $window.on("scroll", () => {
          let scrollTop = $window.scrollTop();
          headerBar.toggleClass(
            CLASSES.IS_ACTIVE,
            scrollTop > topPosition && scrollTop > offSet
          );
          topPosition = scrollTop;
        });
      }
    };

    $(window).resize(function() {
      mobileHeaderPosition();
    });

    mobileHeaderPosition();
    mobileMenuDropDown();
  }
}

export default init(MobileMenu, "mobile-menu");
