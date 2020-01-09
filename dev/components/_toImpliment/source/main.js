import $ from "jquery";
import "@/scripts/helpers/polyfills";
import MainMenu from "@/modules/navigations/main-menu/main-menu";
import MobileMenu from "@/modules/navigations/mobile-menu/mobile-menu";
import Modal from "@/modules/containers/modal/modal";
import Offcanvas from "@/modules/layout/offcanvas/offcanvas";
import Accordion from "@/modules/containers/accordion";
import {
  initWowLibrary,
  attachIE11helper,
  bindJQuery,
  showFunctionalityLinks
} from "@/scripts/helpers/library";

bindJQuery();

$(document).ready(function() {
  Offcanvas();
  Modal();
  initWowLibrary();
  attachIE11helper();
  MainMenu();
  MobileMenu();
  showFunctionalityLinks();
  Accordion();
});
