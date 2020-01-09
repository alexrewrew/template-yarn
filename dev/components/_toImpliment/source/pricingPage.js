import $ from "jquery";
import selectric from "selectric";
import { CLASSES } from "@/scripts/helpers/constants";

const handleHelperNotifications = () => {
  $(".info-mark")
    .on("mouseover click touchstart", function() {
      $(this).addClass(CLASSES.IS_ACTIVE);
    })
    .on("mouseleave", function() {
      $(".info-mark").removeClass(CLASSES.IS_ACTIVE);
    });

  $(document).on("click touchstart", function(e) {
    if (!$(e.target).hasClass("helper-notification")) {
      $(".info-mark").removeClass(CLASSES.IS_ACTIVE);
    }
  });
};

const handlePeriodChange = () => {
  $(".plan-period-select")
    .prop("selectedIndex", 0)
    .selectric("refresh");

  $(".plan-period-select").on("selectric-before-open", function() {
    $(".plan-period-select").selectric("refresh");
    $(this)
      .parents(".selectric-plan-period-select")
      .addClass(CLASSES.IS_OPEN);
  });

  $(".plan-period-select")
    .selectric()
    .on("change", function() {
      const isPlanPremium = $(this)
        .closest(".plan")
        .hasClass("plan--premium");
      const plan = isPlanPremium ? $(".plan--premium") : $(".plan--basic");
      const select = $(this);
      const chosenValue = select.val();

      if (plan.length) {
        if (chosenValue === "monthly") {
          if (plan.hasClass("is-annual")) plan.removeClass("is-annual");
          if (!plan.hasClass("is-monthly")) plan.addClass("is-monthly");
          plan
            .find(".plan-period-select")
            .prop("selectedIndex", 1)
            .selectric("refresh");
        } else if (chosenValue === "annual") {
          if (plan.hasClass("is-monthly")) plan.removeClass("is-monthly");
          if (!plan.hasClass("is-annual")) plan.addClass("is-annual");
          plan
            .find(".plan-period-select")
            .prop("selectedIndex", 0)
            .selectric("refresh");
        }
      }
    });
};

const handlePlanChangeMobile = () => {
  const planTab = $(".js-plan-tab");
  const planItem = $(".js-plans-list-item");

  $(".plan-period-select")
    .prop("selectedIndex", 0)
    .selectric("refresh");

  planTab.on("click", function() {
    const index = $(this).index();
    planItem.removeClass(CLASSES.IS_ACTIVE);
    planTab.removeClass(CLASSES.IS_ACTIVE);
    $(this).addClass(CLASSES.IS_ACTIVE);
    planItem.eq(index).addClass(CLASSES.IS_ACTIVE);
  });
};

const handlePlanChange = () => {
  $(".js-plans-list-item").on("click", function(e) {
    if (e.target.className !== "view-more-link") {

    }

    if (
      $(e.target).closest(".selectric-plan-period-select").length === 0
    ) {
      const popupId = $(this)
        .find(".view-more-link")
        .data("micromodal-trigger");

      const period = $(".plan-period-select").val();
      
      $(".js-plans-list-item").removeClass(CLASSES.IS_SELECTED);
      $(this).addClass(CLASSES.IS_SELECTED);

      const modalPlan = $(`#${popupId}`)
        .find(".plan");

      $(".modal .plan").removeClass("plan--selected");
      modalPlan.addClass("plan--selected");

      // if (period === "annual") {
      //   if (!modalPlan.hasClass("is-annual")) modalPlan.addClass("is-annual");
      //   if (modalPlan.hasClass("is-monthly")) modalPlan.removeClass("is-monthly");
      // } else if (period === "monthly") {
      //   if (!modalPlan.hasClass("is-monthly")) modalPlan.addClass("is-monthly");
      //   if (modalPlan.hasClass("is-annual")) modalPlan.removeClass("is-annual");
      // }

      $(this).find(".plan");

      $(".plan-price")
        .addClass("plan-price--default");
      $(this)
        .find(".plan-price")
        .removeClass("plan-price--default");
      $(".js-plans-list-item .plan-select-button").addClass(
        "button--secondary"
      );
      $(this)
        .find(".plan-select-button")
        .removeClass("button--secondary");
    }
  });
};

$(document).ready(function() {
  handleHelperNotifications();
  handlePlanChangeMobile();
  handlePlanChange();

  $(".selectric-plan-period-select").on("click", function() {
    if (!$(this).hasClass(CLASSES.IS_OPEN)) {
      $(this)
        .find(".plan-period-select")
        .selectric("open");
      $(this).addClass(CLASSES.IS_OPEN);
    } else {
      $(this)
        .find(".plan-period-select")
        .selectric("close");
      $(this).removeClass(CLASSES.IS_OPEN);
    }
  });
});

handlePeriodChange();
