import $ from "jquery";
import dayJS from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

export default () => {
  // TODO this plugin into global scope
  $.fn.animateNumbers = function(stop, separator, duration, ease) {
    return this.each(function() {
      var $this = $(this);
      var isInput = $this.is("input");
      var start = parseInt(
        isInput ? $this.val().replace(/ /g, "") : $this.text().replace(/ /g, "")
      );
      var regex = /(\d)(?=(\d\d\d)+(?!\d))/g;
      separator = separator === undefined ? true : separator;

      // number inputs can't have separator or it blanks out
      if (isInput && $this[0].type === "number") {
        separator = false;
      }

      $({ value: start }).animate(
        { value: stop },
        {
          duration: duration === undefined ? 1000 : duration,
          easing: ease === undefined ? "swing" : ease,
          step: function() {
            isInput
              ? $this.val(Math.floor(this.value))
              : $this.text(Math.floor(this.value));
            if (separator) {
              isInput
                ? $this.val($this.val().replace(regex, "$1 "))
                : $this.text($this.text().replace(regex, "$1 "));
            }
          },
          complete: function() {
            if (
              parseInt($this.text()) !== stop ||
              parseInt($this.val()) !== stop
            ) {
              isInput ? $this.val(stop) : $this.text(stop);
              if (separator) {
                isInput
                  ? $this.val($this.val().replace(regex, "$1 "))
                  : $this.text($this.text().replace(regex, "$1 "));
              }
            }
          }
        }
      );
    });
  };

  dayJS.extend(advancedFormat);

  const initCurrentDate = () => {
    const counterInitBlock = $("#action-counters-current-date");
    const dayFormat = "MMM Do, YYYY";

    counterInitBlock.text(`Today ${dayJS().format(dayFormat)}*`);
  };
  initCurrentDate();

  const dailyMax = {
    0: { edits: 35534, sends: 3198, signs: 4264 },
    1: { edits: 72780, sends: 6550, signs: 8734 },
    2: { edits: 75381, sends: 6784, signs: 9046 },
    3: { edits: 73503, sends: 6615, signs: 8820 },
    4: { edits: 70816, sends: 6373, signs: 8498 },
    5: { edits: 59903, sends: 5391, signs: 7188 },
    6: { edits: 31872, sends: 2868, signs: 3825 }
  };

  const getValueForNow = maxValue => {
    // w1 - длительность утреннего подъема
    // w2 - длительность вечернего спада
    // t1 - время утреннего подъема
    // t2 - время вечернего спада

    const consts = {
      0: { w1: 150, w2: 240, t1: 420, t2: 1320 },
      1: { w1: 150, w2: 250, t1: 420, t2: 1080 },
      2: { w1: 150, w2: 250, t1: 420, t2: 1080 },
      3: { w1: 150, w2: 250, t1: 420, t2: 1080 },
      4: { w1: 150, w2: 250, t1: 420, t2: 1080 },
      5: { w1: 150, w2: 180, t1: 420, t2: 960 },
      6: { w1: 150, w2: 250, t1: 420, t2: 1060 }
    };
    const BOSTON_HOURS_OFFSET = -4;
    const PERCENT_GROWTH_PER_YEAR = 20;
    const today = new Date();
    const todayDay = today.getDay();
    const fullYear = today.getFullYear();
    const fullHours = today.getHours();
    const fullMinutes = today.getMinutes();
    const fullSeconds = today.getSeconds();
    const hoursZeroOffset = today.getTimezoneOffset() / 60;
    const { w1, w2, t1, t2 } = consts[todayDay];

    const hoursZoneCorrection = hours =>
      hours > 0 ? (hours < 24 ? hours : hours - 24) : 24 - hours;
    const yearlyGrowingCorrection = year =>
      ((year - 2019) * PERCENT_GROWTH_PER_YEAR) / 100 + 1;
    const correctedHours = hoursZoneCorrection(
      fullHours + hoursZeroOffset + BOSTON_HOURS_OFFSET
    );
    const totalSecondsFromMidnight =
      correctedHours * 3600 + fullMinutes * 60 + fullSeconds;

    // const getValueByDate = x => 2.7**(-((x-1)**2)/0.2);
    const getValueByDate = ({ curMinute, maxValue, w1, w2, t1, t2 }) => {
      const minRate = Math.round(maxValue / (4 * 1440));
      const baseRate = (maxValue - minRate * 1440) / 600;
      return (
        minRate * curMinute +
        (baseRate / 2) *
          (w1 * Math.log(Math.abs(Math.cosh((curMinute - t1) / w1))) -
            w1 * Math.log(Math.abs(Math.cosh(-t1 / w1))) -
            w2 * Math.log(Math.abs(Math.cosh((curMinute - t2) / w2))) +
            w2 * Math.log(Math.abs(Math.cosh(-t2 / w2))))
      );
    };

    // const currentValue = Math.floor(getValueByDate(totalSecondsFromMidnight/86400)*maxValue);
    const currentValue = Math.floor(
      getValueByDate({
        curMinute: totalSecondsFromMidnight / 60,
        maxValue,
        w1,
        w2,
        t1,
        t2
      })
    );
    return currentValue;
  };

  const todayDay = new Date().getDay();
  const todayData = dailyMax[todayDay];
  const randomUpdate = successPercentage =>
    !!(Math.random() < successPercentage / 100);

  // initial insert
  $("#counter-edit").animateNumbers(
    getValueForNow(todayData.edits),
    true,
    1500
  );
  $("#counter-sign").animateNumbers(
    getValueForNow(todayData.signs),
    true,
    1150
  );
  $("#counter-send").animateNumbers(getValueForNow(todayData.sends), true, 750);

  // random update
  setInterval(() => {
    if (randomUpdate(30)) {
      $("#counter-edit").animateNumbers(getValueForNow(todayData.edits), 250);
    }
  }, 1000);

  setInterval(() => {
    if (randomUpdate(30)) {
      $("#counter-sign").animateNumbers(getValueForNow(todayData.signs), 250);
    }
  }, 1000);

  setInterval(() => {
    if (randomUpdate(30)) {
      $("#counter-send").animateNumbers(getValueForNow(todayData.sends), 250);
    }
  }, 1000);
};
