import $ from "jquery";
import selectric from "selectric";
import ReduceBreadcrumbs from "@/modules/navigations/bread-crumbs";
import { CLASSES } from "@/scripts/helpers/constants";
import Shuffle from "shufflejs";

const params = {
  panelElem: $(".nav-panel"),
  panelItem: $(".nav-panel__item"),
  panelSelect: $(".panel-items-select"),
  zapierSection: $(".page-section--zapier"),
  searchInput: $(".nav-panel__input"),
  shuffleItemSelector: ".js-integration-item",
  shuffleItemTitle: ".integration-item__title",
  hiddenSearchChecker: "search-is-hidden",
  sectionTitle: ".section-title",
  sectionSubTitle: ".section-subtitle",
  noResultElem: $(".no-results"),
  group: "all"
};

const shuffleInstanceMain = new Shuffle($(".integration-list--main"), {
  itemSelector: params.shuffleItemSelector,
  title: "main"
});

const shuffleInstanceApplication = new Shuffle(
  $(".integration-list--applications"),
  {
    itemSelector: params.shuffleItemSelector,
    title: "applications",
    isCentered: true
  }
);

const shuffleInstanceZapier = new Shuffle($(".integration-list--zapier"), {
  itemSelector: params.shuffleItemSelector,
  title: "zapier"
});

const shuffleInstances = [
  shuffleInstanceMain,
  shuffleInstanceZapier,
  shuffleInstanceApplication,
];

const setTitlesVisibility = section => {
  if (section.visibleItems) {
    $(
      `.page-section--${section.options.title} ${
        params.sectionTitle
      }, .page-section--${section.options.title} ${params.sectionSubTitle}`
    ).show();
  } else {
    $(
      `.page-section--${section.options.title} ${
        params.sectionTitle
      }, .page-section--${section.options.title} ${params.sectionSubTitle}`
    ).hide();
  }
};

const filterItems = () => {
  params.zapierSection.show();

  params.panelItem.removeClass(CLASSES.IS_ACTIVE);
  $(`[data-group="${params.group}"]`).addClass(CLASSES.IS_ACTIVE);

  params.panelSelect.val(params.group).selectric("refresh");

  shuffleInstanceMain.filter(params.group);

  if (params.group === "applications") {
    params.zapierSection.hide();
  } else {
    shuffleInstanceZapier.update();
  }
};

const resetAll = () => {
  params.searchInput.val("");
  shuffleInstanceMain.filter(params.group);
  shuffleInstanceApplication.filter();
  shuffleInstanceZapier.filter();
  $(`${params.sectionTitle}, ${params.sectionSubTitle}`).show();
  params.panelElem.addClass(params.hiddenSearchChecker);
  params.noResultElem.hide();
};

const handleShuffleEvents = () => {
  // filter items - desktop
  params.panelItem.on("click", function() {
    params.group = $(this).attr("data-group") || "all";
    filterItems();
  });

  // filter items - mobile
  params.panelSelect.selectric().on("change", function() {
    params.group = $(this).val() || "all";
    filterItems();
  });

  // search items
  params.searchInput.keyup(function(e) {
    const searchText = e.target.value.toLowerCase();
    params.zapierSection.show();
    
    shuffleInstances.forEach(shuffleInstance => {
      shuffleInstance.filter(function(element) {
        const titleElement = element.querySelector(params.shuffleItemTitle);
        const titleText = titleElement.textContent.toLowerCase().trim();

        return titleText.indexOf(searchText) !== -1;
      });

      setTitlesVisibility(shuffleInstance);
    });

    const isResult = shuffleInstances.some(
      shuffleInstance => shuffleInstance.visibleItems
    );

    isResult ? params.noResultElem.hide() : params.noResultElem.show();
  });

  // switch panel display
  $(".nav-panel__button").on("click", function() {
    if (params.panelElem.hasClass(params.hiddenSearchChecker)) {
      params.panelElem.removeClass(params.hiddenSearchChecker);
      setTimeout(function() {
        params.searchInput.focus();
      }, 500);
    } else {
      resetAll();
      if (params.group === "applications") {
        params.zapierSection.hide();
      } else {
        shuffleInstanceZapier.update();
      }
    }
  });

  // hide search input if there is no value
  $(document).click(function(e) {
    if (
      $(e.target).closest(".nav-panel").length === 0 &&
      params.searchInput.val().trim() === ""
    ) {
      resetAll();
    }
  });
};

function lineClamp() {
  const ellipsisText = (e, etc) => {
    const wordArray = e.innerHTML.trim().split(" ");
    while (e.scrollHeight > e.offsetHeight) {
      wordArray.pop();
      e.innerHTML = wordArray.join(" ") + (etc || "...");
    }
  };

  [].forEach.call(document.querySelectorAll(".integration-list--main .integration-item__description"), function(elem) {
    ellipsisText(elem);
  });

}


$(document).ready(function() {
  ReduceBreadcrumbs();
  lineClamp();
});

handleShuffleEvents();
