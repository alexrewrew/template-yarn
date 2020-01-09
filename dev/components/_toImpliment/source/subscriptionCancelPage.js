import $ from "jquery";
import MicroModal from "micromodal";
import Loader from "@/modules/elements/loader/loader";
import { getScrollBarWidth } from "@/scripts/helpers/library";

const apiGetCoupon = () => {
  let payload = {
    appKey: null,
    token: null,
    userId: null
  };
  const document = $("body");
  const lockClassName = "scroll-locked";
  const animationDuration = 250;
  const getDiscountButton = $('.button--get-discount');

  if (typeof retentionCoupon !== "undefined") {
    payload = {
      appKey: retentionCoupon.key,
      token: retentionCoupon.token
    };
  }
  if (typeof user !== "undefined") {
    payload.userId = user.userId;
  }

  Loader.show();
  getDiscountButton.addClass("is-disabled--custom");

  $.ajax({
    url: "/api_v3/payment_frontend/takeRetentionCoupon",
    type: "POST",
    dataType: "json",
    data: payload,
    headers: payload,
    success: function() {
      MicroModal.show("subscription-cancel-renew", {
        awaitCloseAnimation: true,
        disableFocus: true,
        onShow: () => {
          $("body")
            .addClass(lockClassName)
            .css("padding-right", getScrollBarWidth());
        },
        onClose: function() {
          setTimeout(() => {
            $("body")
              .removeClass(lockClassName)
              .css("padding-right", "");
          }, animationDuration);
        }
      });
    },
    complete: function() {
      Loader.hide();
      getDiscountButton.removeClass("is-disabled--custom");
    }
  });
};

$(document).ready(function() {
  $(".js-get-discount").on("click touchstart", function() {
    apiGetCoupon();
  });
});
