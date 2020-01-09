export default mode => {
    // page elements
    const fileInputDropElement = document.querySelector(".drag-n-drop__form .button--file__label__input-file");
    const dropAreaElement = document.querySelector(".drag-n-drop");
    const formElement = document.querySelector(".drag-n-drop__form");
    const progressElement = document.querySelector(".drag-n-drop__progress__bar");
    const dropDescriptionText = document.querySelector(".drag-n-drop-description");

    let counter = 0;

// Drag & Drop
    if (dropAreaElement) {

        fileInputDropElement.addEventListener("change", function () {
            let droppedFileType = fileInputDropElement.files[0].type;
            let droppedFileSize = (Math.ceil(fileInputDropElement.files[0].size / 1000)) / 1000;
            if (droppedFileType === "application/pdf") {
                if (droppedFileSize < 20) {
                    highlight();
                    unerrorFileType();
                    unerrorFileSize();
                    initProgress();
                    formElement.submit();
                } else {
                    unerrorFileType();
                    errorFileSize();
                }
            } else {
                unerrorFileSize();
                errorFileType();
            }
        });

        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropAreaElement.addEventListener(eventName, preventDefaults, false)
        });

        ["dragenter", "dragstart"].forEach(eventName => {
            dropAreaElement.addEventListener(eventName, highlight, false)
        });

        ["dragleave", "drop"].forEach(eventName => {
            dropAreaElement.addEventListener(eventName, unhighlight, false)
        });

        dropAreaElement.addEventListener("drop", handleDrop, false);

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        function highlight() {
            counter++;
            dropAreaElement.classList.add("drag-n-drop--highlight")
        }

        function unhighlight() {
            counter--;
            if (counter === 0) {
                dropAreaElement.classList.remove("drag-n-drop--highlight")
            }
        }

        function errorFileType() {
            dropAreaElement.classList.add("drag-n-drop--error-file-type")
            dropDescriptionText.classList.add("drag-n-drop--error")
        }

        function unerrorFileType() {
            dropAreaElement.classList.remove("drag-n-drop--error-file-type")
            dropDescriptionText.classList.remove("drag-n-drop--error")
        }

        function errorFileSize() {
            dropAreaElement.classList.add("drag-n-drop--error-file-size")
            dropDescriptionText.classList.add("drag-n-drop--error")
        }

        function unerrorFileSize() {
            dropAreaElement.classList.remove("drag-n-drop--error-file-size")
            dropDescriptionText.classList.remove("drag-n-drop--error")
        }

        function initProgress() {
            dropAreaElement.classList.add("drag-n-drop--progress-start");
            var currentProgress = 0;
            var step = 0.3;

            var interval = setInterval(function () {
                currentProgress += step;
                progressElement.value = Math.round(Math.atan(currentProgress) / (Math.PI / 2) * 100 * 1000) / 1000;

                if (progressElement.value >= 100) {
                    clearInterval(interval);
                }

                if (progressElement.value > 50) {
                    step = 0.1;
                }
            }, 100);
        }

        function handleDrop(e) {
            fileInputDropElement.files = e.dataTransfer.files;

            let droppedFileType = fileInputDropElement.files[0].type;
            let droppedFileSize = (Math.ceil(fileInputDropElement.files[0].size / 1000)) / 1000;
            if (droppedFileType === "application/pdf") {
                if (droppedFileSize < 20) {
                    highlight();
                    unerrorFileType();
                    unerrorFileSize();
                    initProgress();
                    formElement.submit();
                } else {
                    unerrorFileType();
                    errorFileSize();
                }
            } else {
                unerrorFileSize();
                errorFileType();
            }
        }
    }
};