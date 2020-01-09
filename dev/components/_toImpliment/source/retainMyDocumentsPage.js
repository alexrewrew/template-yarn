import $ from "jquery";
import { CLASSES } from "@/scripts/helpers/constants";

$(document).ready(function() {
  $(".js-delete-documents").on("click touchstart", function(e) {
    e.preventDefault();
    const url = document.location.href.split('/');
    const userHash = url[url.length - 1];

    $.get(`/en/userErase/ajaxConfirmErase/${userHash}`, (data) => {
      if (data.result) {
        $('.reminder-popup__wrapper').toggleClass(`${CLASSES.IS_HIDDEN} ${CLASSES.IS_VISIBLE}`);
      }
    });
  });
});
