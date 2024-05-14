/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/style/style.scss":
/*!******************************!*\
  !*** ./src/style/style.scss ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://animated-accessible-tabs/./src/style/style.scss?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _style_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style/style.scss */ \"./src/style/style.scss\");\n\r\n\r\n\r\nconst tabsContainer = document.querySelector('.tabs');\r\nconst tabsNav = tabsContainer.querySelector('.tabs__scroller');\r\nconst tabs = Array.from(tabsNav.querySelectorAll('.tabs__tab'));\r\nconst panelsContainer = tabsContainer.querySelector('.tabs__panels');\r\nconst panels = Array.from(panelsContainer.querySelectorAll('.tabs__panel'));\r\nconst scroller = document.querySelector('.tabs__scroller');\r\n\r\nconst arrowLeft = tabsContainer.querySelector('.tabs__arrow-left');\r\nconst arrowRight = tabsContainer.querySelector('.tabs__arrow-right');\r\n\r\n\r\n\r\ntabsNav.setAttribute('role', 'tabList');\r\n\r\ntabs.forEach((tab, index) => {\r\n\tif (index == 0) {\r\n\t\ttab.setAttribute('aria-selected', true)\r\n\t} else {\r\n\t\ttab.setAttribute('aria-selected', false);\r\n\t\ttab.setAttribute('aria-controls', `tab-panel-${index + 1}`);\r\n\t\ttab.setAttribute('tabindex', '0');\r\n\t\r\n\t\tpanels[index].setAttribute('hidden', '');\r\n\t}\r\n\r\n\ttab.setAttribute('role', 'tab');\r\n\r\n\tpanels[index].setAttribute('role', 'tabpanel');\t\r\n})\r\n\r\nfunction autoResize() {\r\n\ttabsNav.style.setProperty(\"--_transition-duration\", \"0\");\r\n\tconst tab = tabsNav.querySelector('[aria-selected=\"true\"]');\r\n\r\n\tconst tabWidth = tab.offsetWidth;\r\n\tconst navWidth = tabsNav.offsetWidth;\t\r\n\tconst tabLeft = tab.offsetLeft;\r\n\r\n\ttabsNav.style.setProperty(\"--_underline-width\", tabWidth/ navWidth);\r\n\ttabsNav.style.setProperty(\"--_transition-duration\", \"200ms\");\r\n\ttabsNav.style.setProperty(\"--_underline-left\", `${tabLeft}px`);\r\n\t\r\n\tconsole.log(scroller.scrollWidth);\r\n\tconsole.log(scroller.clientWidth)\r\n\tarrowLeft.classList.toggle('hidden', scroller.scrollWidth >= scroller.clientWidth)\r\n\tarrowRight.classList.toggle('hidden', scroller.scrollWidth >= scroller.clientWidth)\t\t\r\n\ttoggleArrowVisibility()\r\n}\r\n\r\nautoResize();\r\n\r\nconst widthObserver = new ResizeObserver((entries, observer) => {\r\n\tfor (let entry of entries) {\r\n\t\tautoResize();\r\n\t}\r\n})\r\n\r\nwidthObserver.observe(tabsNav);\r\n\r\ntabsContainer.addEventListener('click', (e) => {\r\n\tconst clickedTab = e.target.closest('button');\r\n\tif (!clickedTab) return;\r\n\te.preventDefault();\r\n\r\n\tswitchTab(clickedTab);\r\n})\r\n\r\nfunction switchTab(newTab) {\r\n\tconst activeTab = tabsNav.querySelector('[aria-selected=\"true\"]');\r\n\t\r\n\tif (activeTab === newTab) return;\r\n\t\r\n\tconst activeTabIndex = tabs.indexOf(activeTab);\r\n\tconst activePanel = panels[activeTabIndex];\t\r\n\tconst newTabIndex = tabs.indexOf(newTab);\r\n\tconst newPanel = panels[newTabIndex];\r\n\r\n\tactiveTab.setAttribute('aria-selected', 'false');\r\n\tnewTab.setAttribute('aria-selected', 'true');\r\n\r\n\tactivePanel.setAttribute('hidden', '');\r\n\tnewPanel.removeAttribute('hidden');\r\n\r\n\tmoveUnderline(activeTab, newTab)\r\n}\r\n\r\n\r\nfunction moveUnderline(oldTab, newTab) {\r\n\tconst newTabPosition = oldTab.compareDocumentPosition(newTab);\t\r\n\r\n\tlet underlineWidth;\r\n\tlet underlineLeft; \r\n\tlet duration;\r\n\r\n\tswitch (newTabPosition) {\r\n\t\tcase 2:  {\r\n\t\t\tunderlineLeft = newTab.offsetLeft;\r\n\t\t\tunderlineWidth = oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;\t\t\t\t\r\n\t\t\tif (underlineWidth > 330) {\r\n\t\t\t\tduration = 330;\r\n\t\t\t} else if (underlineWidth < 150) {\r\n\t\t\t\tduration = 150\r\n\t\t\t} else {\r\n\t\t\t\tduration = underlineWidth\r\n\t\t\t}\r\n\t\t\ttabsNav.style.setProperty('--_transition-duration', `${duration}ms`);\r\n\t\t\ttabsNav.style.setProperty('--_underline-left', `${underlineLeft}px`);\r\n\t\t\ttabsNav.style.setProperty('--_underline-width', underlineWidth / tabsNav.offsetWidth);\r\n\r\n\t\t\tbreak;\r\n\t\t}\t\t\r\n\r\n\t\tcase 4: {\t\t\t\r\n\t\t\tunderlineWidth = newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;\t\r\n\t\t\tif (underlineWidth > 300) {\r\n\t\t\t\tduration = 300;\r\n\t\t\t} else if (underlineWidth < 100) {\r\n\t\t\t\tduration = 100\r\n\t\t\t} else {\r\n\t\t\t\tduration = underlineWidth\r\n\t\t\t}\t\r\n\t\t\ttabsNav.style.setProperty('--_transition-duration', `${duration}ms`);\t\r\n\t\t\ttabsNav.style.setProperty('--_underline-width', underlineWidth / tabsNav.offsetWidth)\r\n\t\t\tbreak;\r\n\t\t};\t\t\r\n\t}\r\n\r\n\tsetTimeout(() => {\t\t\r\n\t\ttabsNav.style.setProperty('--_underline-left',  `${newTab.offsetLeft}px`);\r\n\t\ttabsNav.style.setProperty(\"--_underline-width\", newTab.offsetWidth/tabsNav.offsetWidth);\r\n\t}, duration + 5);\r\n\t//\r\n\t\r\n\tscrollTabs(newTab);\r\n}\r\n\r\nfunction scrollTabs(newTab) {\r\n\tconst right = scroller.offsetLeft + newTab.offsetLeft + newTab.offsetWidth;\r\n\tconst left = newTab.offsetLeft;\r\n\r\n\tconst scrollerRight = scroller.offsetLeft + scroller.offsetWidth;\r\n\tconst scrollerLeft = scroller.offsetLeft;\r\n\r\n\tif (right > scrollerRight + scroller.scrollLeft - 32) {\t\t\r\n\t\tscroller.scrollLeft = right - scrollerRight + 128;\r\n\t}\r\n\r\n\tif (left < scrollerLeft + scroller.scrollLeft) {\r\n\t\tscroller.scrollLeft = left - scrollerLeft - 128\r\n\t}\r\n}\r\n\r\n\r\nscroller.addEventListener('keydown', e => {\r\n\tif (e.key == \"ArrowLeft\" || e.key == \"ArrowRight\") e.preventDefault();\r\n\r\n\tif (e.key === 'Tab') {\t\t\r\n\t\tsetTimeout(() => {\r\n\t\t\tscrollTabs(document.activeElement)\r\n\t\t}, 5);\r\n\t}\r\n})\r\n\r\n\r\nscroller.addEventListener('scroll', e => {\r\n\ttoggleArrowVisibility(e.target)\r\n})\r\n\r\nfunction toggleArrowVisibility() {\t\t\r\n\tarrowLeft.classList.toggle('hidden', scroller.scrollLeft <= 3);\r\n\tarrowRight.classList.toggle('hidden', scroller.scrollWidth - scroller.clientWidth - scroller.scrollLeft <= 3);\r\n}\r\n\r\n\r\narrowLeft.addEventListener('click', e=> {\r\n\tscroller.scrollLeft -= 128;\r\n})\r\narrowRight.addEventListener('click', e=> {\r\n\tscroller.scrollLeft += 128;\r\n})\r\n\r\n\r\n\n\n//# sourceURL=webpack://animated-accessible-tabs/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;