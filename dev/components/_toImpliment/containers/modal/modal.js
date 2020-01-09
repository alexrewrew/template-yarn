import MicroModal from "micromodal";
import $ from "jquery";
import { getScrollBarWidth } from "@/scripts/helpers/library";
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll
} from "body-scroll-lock";

const execYoutubeCommand = (frame, command) => {
  if (frame.contentWindow === null) {
    return;
  }

  frame.contentWindow.postMessage(
    window.JSON.stringify({ event: "command", func: command }),
    "https://www.youtube.com"
  );
};

const modalHandler = (modal, command) => {
  const iframes = modal.querySelectorAll("iframe");

  [].forEach.call(iframes, frame => {
    execYoutubeCommand(frame, command);
  });
};

export default () => {
  const document = $("body");
  const lockClassName = "scroll-locked";
  const animationDuration = 0;

  MicroModal.init({
    awaitCloseAnimation: true,
    disableFocus: true,
    onShow: modal => {
      modalHandler(modal, "playVideo");
      $("body").addClass(lockClassName);
      disableBodyScroll(document);
    },
    onClose: modal => {
      modalHandler(modal, "pauseVideo");
      setTimeout(() => {
        $("body").removeClass(lockClassName);
        enableBodyScroll(document);
        clearAllBodyScrollLocks();
      }, animationDuration);
    }
  });
};
