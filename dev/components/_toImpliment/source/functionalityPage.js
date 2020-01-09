import $ from "jquery";
import lazyframe from "lazyframe";
import LazyLoad from "vanilla-lazyload";
import Loader from "@/modules/elements/loader/loader";
import FormActionsCounters from "@/modules/containers/form-actions-counters";
import ReduceBreadcrumbs from "@/modules/navigations/bread-crumbs";

$(document).ready(function() {
  ReduceBreadcrumbs();
  FormActionsCounters();

  $(".cta-invitation-button").on("click", function() {
    scrollToMiddle("#modal-uploader");
  });
});

function scrollToMiddle(id) {
  const elemPosition = $(id).offset().top;
  const elemHeight = $(id).height();
  const windowHeight = $(window).height();
  const scrollPos = elemPosition + elemHeight / 2 - windowHeight / 2;

  $("html, body").animate(
    {
      scrollTop: scrollPos
    },
    800
  );
}

let elements = $(".video-player__lazyframe");

lazyframe(elements, {
  onAppend: iframe => {
    $(iframe).attr("allow", "autoplay");
  }
});

const lazyLoadInstance = new LazyLoad({
  elements_selector: ".lazyload",
  load_delay: 0
});

if (lazyLoadInstance) {
  lazyLoadInstance.update();
}

const defaultSearchValue = document.getElementById('search-field').value;
const psOnPage = 9;
const foundItemsList = [];

let globalSession = "";
let isApp = false;
let googleLine = 0;
let googleOpen = -1;
let googleGlobalText = "";
let siteFlag = false;
let allPages = 0;
let timerFillOnline = null;
let potocActions = true;
let cntRry = 0;
let flagAlreadyFillonlineLaunch = false;

function escapeHtml(text) {
  return text.replace(/"/g, "").replace(/'/g, "");
}

function alertJs(text = "", title = "", btnAlert = "") {
  if (text.length === 0) {
    $("#alert_text").remove();
  } else {
    $("#alert_text").html(text);
  }

  if (title.length > 0) {
    $("#alert_title .alert_title_icon").html(title);
  }

  if (btnAlert.length > 0) {
    $("#alert .btn_alert").hide();
    $("#alert ." + btnAlert).show();
  }

  $("#alert")
    .center(-40)
    .show();
}

function redirect(path) {
  window.location = path;
}

function getDocumentHeight() {
  return document.body.scrollHeight > document.body.offsetHeight
    ? document.body.scrollHeight
    : document.body.offsetHeight;
}

function showError(text = "", overlay = "", title = "", btnAlert = "") {
  const overlayWrapper = $(".content-wrapper-overlay");
  if (text === "AUTH_FAILED") {
    redirect($("#_LANG").val() + "/logout/invalid_auth/");
  } else {
    alertJs(text, title, btnAlert);

    if (overlay.length > 0) {
      overlayWrapper.show();
      overlayWrapper.height(getDocumentHeight());
    }
  }
}

function fillOnlineId(id, link, line, session, isNewWindow = false) {
  if (flagAlreadyFillonlineLaunch) {
    return false;
  }
  isApp = false;
  if (isApp && link !== "") {
    document.location = "pdffiller://fill?url=" + encodeURIComponent(link);
    return false;
  }
  flagAlreadyFillonlineLaunch = true;

  if (!session) session = globalSession;

  const noCash = id > 0 ? 1 : 0;
  const data = {
    out: "json",
    f: id,
    no_cash: noCash,
    pdf: link,
    PHPSESSID: session,
    title: $("#google_title_" + line).html(),
    description: $("#google_description_" + line).html(),
    keywords_google: googleGlobalText
  };
  $.ajax({
    url: "/flash/data/up.php",
    dataType: "json",
    data: data,
    async: true,
    success: function(json) {
      // stopLoad();
      if (json.result) {
        if (window.isApp) {
          document.location = "pdffiller://fill?id=" + json.id;
          return false;
        }
        if ($(".googleChrome").length || !isNewWindow) {
          flagAlreadyFillonlineLaunch = false;
          window.location = json.url;
          timerFillOnline = setTimeout(function() {
            flagAlreadyFillonlineLaunch = false;
          }, 3000);
        } else {
          flagAlreadyFillonlineLaunch = false;
          window.open(json.url, "_blank");
          // stopLoad();
          timerFillOnline = setTimeout(function() {
            flagAlreadyFillonlineLaunch = false;
          }, 3000);
        }
      } else {
        flagAlreadyFillonlineLaunch = false;
        showError(json.message);
      }
    }
  });

  return false;
}

function openForm(pos, id, link, line, session, isNewWindow) {
  return fillOnlineId(id, link, line, session, isNewWindow);
}

function keyPressSearch(e) {
  const kk = navigator.appName === "Netscape" ? e.which : e.keyCode;
  if (kk === 13 || kk === 32) {
    searchForm();
  }
}
function searchForm() {
  let searchText = $.trim($("#search-field").val());
  if (searchText !== "") {
    siteFlag = false;
    $(".forms-search__loader").show();
    searchGoogleApp(searchText + " filetype:pdf", 0);
  }
  return false;
}

$("#search-field").val(defaultSearchValue);
searchForm();

$.curCSS = function(element, attrib, val) {
  $(element).css(attrib, val);
};

function searchGoogleApp(text, start) {
  const searchResultWrapper = $("#search-results-wrapper");
  $("#search-title-text").hide();
  searchResultWrapper.hide();
  if (!potocActions) {
    return false;
  }

  if (!$("#search-container").hasClass("search-pdf--result")) {
    $("#search-container").addClass("search-pdf--result");
  }
  searchResultWrapper.show();
  if (start % psOnPage === 0) {
    $("#search-paganation").html("");
    $("#search_results").html("");
  }
  googleGlobalText = text;
  googleLine = 0;
  text = escapeHtml(text);
  let searchText = $.trim($("#search-field").val());
  searchText = searchText.replace(/<\/?[^>]+>/gi, "");
  $.getJSON(
      `/en/search/ajaxSearchInGoogle/?q=${text}&start=0${(parseInt(start) + 1)}&num=${psOnPage}`,
    function(data) {
      Loader.hide();
      if (data.captcha !== undefined) {
        window.location = data.captcha;
        return false;
      }
      if (typeof data === "undefined" || $.isEmptyObject(data) || !data.items.length) {
        noResults(searchText);
        return false;
      }
      cntRry = 0;

      if (typeof data.queries === "undefined") {
        return false;
      }
      let ul = $("#search_results");
      googleOpen = -1;

      allPages = data.queries.request[0].totalResults;

      if (allPages === 0) {
        noResults(searchText);
      } else {
        $("#search-no-results").hide();
        $("#search-results-wrapper").show();
        $("#search-title-text").show();
        $("#search-title-text .search-mark").html(searchText);

        $.each(data.items, function(i, val) {
          const tplElement = $("#template")
            .clone()
            .removeAttr("id");
          if (val.title.indexOf("Fillable") < 0)
            val.title = "Fillable " + val.title;

          if (val.link.indexOf("pdffiller.com") > -1) {
            tplElement.find(".card__title").text(val.title);
            foundItemsList.push({
              val,
              isGlobalLink: false
            });
          } else {
            tplElement
              .find(".card__title")
              .attr("id", "google_title_" + googleLine);
            tplElement.find(".card__title").text(val.title);
            foundItemsList.push({
              val,
              isGlobalLink: true,
              googleLine
            });
          }
          tplElement
            .find(".card__text")
            .html(val.snippet.substr(0, 250))
            .attr("id", "google_description_" + googleLine);
          ul.append(tplElement.html());
          googleLine++;
        });
      }
    }
  ).fail(function(data, textStatus, error) {
    noResults(searchText);
  });

  return false;
}
function noResults(search) {
  $("#search-no-results").show();
  $("#search-no-results .search-title .search-mark").html(search);
  $("#search-title-text").hide();
  $("#search-results-wrapper").hide();
}

$("#search-field").keyup(function(event) {
  keyPressSearch(event);
});

let isLoaderOpen = false;

$(document).on("click", ".fill-redactor-btn, .card__title, .card__link", function(e) {
  if (!isLoaderOpen) {
    isLoaderOpen = true;
    $(this).closest('.card').find('.loader').show();
  }
  
  const index = $(this)
    .parents(".cards-list__item")
    .index();

  const findElem = foundItemsList.filter((item, i) => i === index);
  if (findElem[0]) {
    let link =
      findElem[0].isGlobalLink && findElem[0].val.link
        ? findElem[0].val.link
        : "";
    let line = findElem[0].isGlobalLink ? googleLine : "";
    let id = 0;
    if (!findElem[0].isGlobalLink) {
      const idIndex = findElem[0].val.link.lastIndexOf("/");
      id = findElem[0].val.link.substring(idIndex + 1);
    }
    openForm(+index, id, link, line, "", false);
  }
});

$(document).on("click", ".search-pdf-form__field-button-delete", function() {
  $("#search-field").val("");
});
