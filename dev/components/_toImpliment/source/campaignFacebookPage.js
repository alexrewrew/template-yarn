import $ from "jquery";
import { 
  initCustomSelectPlugin,
  handleParsleyActions,
  handleFormCallback,
  initLoader,
  hideLoader
} from "@/scripts/helpers/library";
import { CLASSES, STRINGS } from "@/scripts/helpers/constants";
import { resetForm, enableElement } from "./helpers/elementsActions";

const apiRequest = () => {
  const form = $("#form"),
    formNative = form[0],
    formSubmit = form.find('.' + CLASSES.FORM_SUBMIT),
    formData = new FormData(formNative);

  initLoader();

  $.ajax({
    url: "/en/roiReport/ajaxGetEbook",
    type: "POST",
    dataType: "json",
    contentType: false,
    processData: false,
    data: formData,
    headers: {
      "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
    },
    success: function(data) {
      resetForm(form);
      const downloadLink = document.createElement('a');
      downloadLink.href = data.download;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      setTimeout(function() {
        enableElement(formSubmit);
        document.location = data.page;
      }, 1500);
    },
    error: function() {
      resetForm(form);
      enableElement(formSubmit);
    }
  });
};

$(document).ajaxComplete(function() {
  hideLoader();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

$(document).ready(function() {
  initCustomSelectPlugin();
  handleParsleyActions();
  handleFormCallback("form", apiRequest);
});