import "../css/index.css";
document.querySelector("#icon-link").href = require("../images/favicon.ico");

// 判断是否支持HMR功能
if (module.hot) {
    module.hot.accept("../js/index.js");
    module.hot.accept("../js/index.js");
}

// PWA
if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(registration => {
                console.log("SW registered: ", registration);
            })
            .catch(registrationError => {
                console.log("SW registration failed: ", registrationError);
            });
    });
}
