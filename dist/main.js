(() => {
  // public/assets/js/audio.js
  if (document.querySelector(".song") != null) {
    document.addEventListener("DOMContentLoaded", () => {
      let audioElements = document.querySelectorAll(".audio-listener");
      audioElements.forEach((audioElement) => {
        let progress = audioElement.querySelector(".progress");
        let audio = audioElement.querySelector("audio");
        let ctrlIcon = audioElement.querySelectorAll(".ctrl-play-pause");
        let start = audioElement.querySelector(".start");
        let end = audioElement.querySelector(".end");
        let toggleplay = audioElement.querySelector(".toggleplay");
        let playbackward = audioElement.querySelector(".playbackward");
        let playforward = audioElement.querySelector(".playforward");
        let dur = audio.duration;
        let secD = Math.floor(dur % 60);
        let minD = Math.floor(dur / 60);
        end.innerHTML = minD + ":" + (secD < 10 ? "0" : "") + secD;
        progress.max = audio.duration;
        toggleplay.addEventListener("click", () => {
          if (audio.paused) {
            audio.play();
            ctrlIcon[0].classList.add("hidden");
            ctrlIcon[1].classList.remove("hidden");
          } else {
            audio.pause();
            ctrlIcon[1].classList.add("hidden");
            ctrlIcon[0].classList.remove("hidden");
          }
        });
        audio.addEventListener("play", () => {
          setInterval(function() {
            progress.value = audio.currentTime;
          }, 500);
        });
        progress.addEventListener("change", () => {
          audio.currentTime = progress.value;
        });
        playforward.addEventListener("click", () => {
          audio.currentTime += 10;
        });
        playbackward.addEventListener("click", () => {
          audio.currentTime -= 10;
        });
        audio.addEventListener("loadedmetadata", function() {
          let dur2 = audio.duration;
          let secD2 = Math.floor(dur2 % 60);
          let minD2 = Math.floor(dur2 / 60);
          end.innerHTML = minD2 + ":" + (secD2 < 10 ? "0" : "") + secD2;
          progress.max = audio.duration;
        });
        audio.addEventListener("timeupdate", function() {
          let currentTime = audio.currentTime;
          let sec = Math.floor(currentTime % 60);
          let min = Math.floor(currentTime / 60);
          start.innerHTML = min + ":" + (sec < 10 ? "0" : "") + sec;
        });
      });
    });
  }

  // public/assets/js/notification.js
  if (document.querySelector(".notification")) {
    const notification = document.querySelector(".notification");
    setTimeout(
      () => {
        notification.style.display = "none";
      },
      5e3
    );
  }

  // public/assets/js/admin-panel.js
  if (document.querySelector(".admin-panel")) {
    let modifyLinks = document.querySelectorAll(".update");
    modifyLinks.forEach(function(link) {
      link.addEventListener("click", function(event2) {
        event2.preventDefault();
        let currentRowId = this.parentNode.parentNode.id;
        let formId = "form-" + currentRowId.split("-")[1];
        let form = document.getElementById(formId);
        if (form.style.display === "table-row") {
          form.style.display = "none";
        } else {
          form.style.display = "table-row";
        }
      });
    });
  }

  // node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend(win, ssrWindow);
    return win;
  }

  // node_modules/swiper/shared/utils.mjs
  function classesToTokens(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return classes2.trim().split(" ").filter((c) => !!c.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
      }
      try {
        delete object[key];
      } catch (e) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o) {
    return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend2() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend2(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper: swiper3,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper3.translate;
    let startTime = null;
    let time;
    const duration = swiper3.params.speed;
    swiper3.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper3.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = new Date().getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper3.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper3.wrapperEl.style.overflow = "hidden";
        swiper3.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper3.wrapperEl.style.overflow = "";
          swiper3.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper3.cssModeFrameID);
        return;
      }
      swiper3.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function elementChildren(element, selector) {
    if (selector === void 0) {
      selector = "";
    }
    return [...element.children].filter((el) => el.matches(selector));
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i += 1;
      }
      return i;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }

  // node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    return {
      isSafari: needPerspectiveFix || isSafari(),
      needPerspectiveFix,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper: swiper3,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper3 || swiper3.destroyed || !swiper3.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper3 || swiper3.destroyed || !swiper3.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper3;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper3.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper3.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper3.el) {
        observer.unobserve(swiper3.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper3 || swiper3.destroyed || !swiper3.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper3.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer(_ref) {
    let {
      swiper: swiper3,
      extendParams,
      on,
      emit
    } = _ref;
    const observers = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper3.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: typeof options.childList === "undefined" ? true : options.childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper3.params.observer)
        return;
      if (swiper3.params.observeParents) {
        const containerParents = elementParents(swiper3.hostEl);
        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      }
      attach(swiper3.hostEl, {
        childList: swiper3.params.observeSlideChildren
      });
      attach(swiper3.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self.eventsListeners[event2])
          self.eventsListeners[event2] = [];
        self.eventsListeners[event2][method](handler);
      });
      return self;
    },
    once(events2, handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      function onceHandler() {
        self.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        handler.apply(self, args);
      }
      onceHandler.__emitterProxy = handler;
      return self.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (typeof handler !== "function")
        return self;
      const method = priority ? "unshift" : "push";
      if (self.eventsAnyListeners.indexOf(handler) < 0) {
        self.eventsAnyListeners[method](handler);
      }
      return self;
    },
    offAny(handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsAnyListeners)
        return self;
      const index = self.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self.eventsAnyListeners.splice(index, 1);
      }
      return self;
    },
    off(events2, handler) {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self.eventsListeners[event2] = [];
        } else if (self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self;
    },
    emit() {
      const self = this;
      if (!self.eventsListeners || self.destroyed)
        return self;
      if (!self.eventsListeners)
        return self;
      let events2;
      let data;
      let context;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
          self.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self.eventsListeners && self.eventsListeners[event2]) {
          self.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self;
    }
  };
  function updateSize() {
    const swiper3 = this;
    let width;
    let height;
    const el = swiper3.el;
    if (typeof swiper3.params.width !== "undefined" && swiper3.params.width !== null) {
      width = swiper3.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper3.params.height !== "undefined" && swiper3.params.height !== null) {
      height = swiper3.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper3.isHorizontal() || height === 0 && swiper3.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper3, {
      width,
      height,
      size: swiper3.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper3 = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper3.getDirectionLabel(label)) || 0);
    }
    const params = swiper3.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper3;
    const isVirtual = swiper3.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper3.virtual.slides.length : swiper3.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper3.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper3.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper3);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper3);
    }
    const previousSnapGridLength = swiper3.snapGrid.length;
    const previousSlidesGridLength = swiper3.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper3.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper3.grid;
    if (gridEnabled) {
      swiper3.grid.initSlides(slides);
    } else if (swiper3.grid) {
      swiper3.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i])
        slide2 = slides[i];
      if (gridEnabled) {
        swiper3.grid.updateSlide(i, slide2, slides);
      }
      if (slides[i] && elementStyle(slide2, "display") === "none")
        continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[swiper3.getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper3.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i]) {
          slides[i].style[swiper3.getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper3.params.slidesPerGroupSkip, index)) % swiper3.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper3.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper3.virtualSize = Math.max(swiper3.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper3.virtualSize + spaceBetween}px`;
    }
    if (params.setWrapperSize) {
      wrapperEl.style[swiper3.getDirectionLabel("width")] = `${swiper3.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper3.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper3.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper3.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper3.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper3.virtual.slidesBefore + swiper3.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i = 0; i < groups; i += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i = 0; i < swiper3.virtual.slidesBefore + swiper3.virtual.slidesAfter; i += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper3.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper3.isHorizontal() && rtl ? "marginLeft" : swiper3.getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params.cssMode || params.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper3, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper3.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper3.snapGrid[0];
      const addToSlidesGrid = -swiper3.slidesGrid[0];
      swiper3.snapGrid = swiper3.snapGrid.map((v) => v + addToSnapGrid);
      swiper3.slidesGrid = swiper3.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper3.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper3.params.watchOverflow)
        swiper3.checkOverflow();
      swiper3.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper3.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper3.updateSlidesOffset();
    }
    swiper3.emit("slidesUpdated");
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper3.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper3.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper3.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper3 = this;
    const activeSlides = [];
    const isVirtual = swiper3.virtual && swiper3.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") {
      swiper3.setTransition(speed);
    } else if (speed === true) {
      swiper3.setTransition(swiper3.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper3.slides[swiper3.getSlideIndexByData(index)];
      }
      return swiper3.slides[index];
    };
    if (swiper3.params.slidesPerView !== "auto" && swiper3.params.slidesPerView > 1) {
      if (swiper3.params.centeredSlides) {
        (swiper3.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper3.params.slidesPerView); i += 1) {
          const index = swiper3.activeIndex + i;
          if (index > swiper3.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper3.activeIndex));
    }
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper3.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper3 = this;
    const slides = swiper3.slides;
    const minusOffset = swiper3.isElement ? swiper3.isHorizontal() ? swiper3.wrapperEl.offsetLeft : swiper3.wrapperEl.offsetTop : 0;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper3.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper3.cssOverflowAdjustment();
    }
  }
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper3 = this;
    const params = swiper3.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper3;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper3.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass);
    });
    swiper3.visibleSlidesIndexes = [];
    swiper3.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper3.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide2 = slides[i];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper3.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper3.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper3.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper3.size - swiper3.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper3.size - 1 || slideAfter > 1 && slideAfter <= swiper3.size || slideBefore <= 0 && slideAfter >= swiper3.size;
      if (isVisible) {
        swiper3.visibleSlides.push(slide2);
        swiper3.visibleSlidesIndexes.push(i);
        slides[i].classList.add(params.slideVisibleClass);
      }
      if (isFullyVisible) {
        slides[i].classList.add(params.slideFullyVisibleClass);
      }
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper3 = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper3.rtlTranslate ? -1 : 1;
      translate2 = swiper3 && swiper3.translate && swiper3.translate * multiplier || 0;
    }
    const params = swiper3.params;
    const translatesDiff = swiper3.maxTranslate() - swiper3.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper3;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper3.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper3.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper3.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper3.getSlideIndexByData(0);
      const lastSlideIndex = swiper3.getSlideIndexByData(swiper3.slides.length - 1);
      const firstSlideTranslate = swiper3.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper3.slidesGrid[lastSlideIndex];
      const translateMax = swiper3.slidesGrid[swiper3.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper3, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper3.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper3.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper3.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper3.emit("fromEdge");
    }
    swiper3.emit("progress", progress);
  }
  function updateSlidesClasses() {
    const swiper3 = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper3;
    const isVirtual = swiper3.virtual && params.virtual.enabled;
    const gridEnabled = swiper3.grid && params.grid && params.grid.rows > 1;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
    };
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
    });
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper3.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper3.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper3.virtual.slides.length)
          slideIndex -= swiper3.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.filter((slideEl) => slideEl.column === activeIndex)[0];
        nextSlide = slides.filter((slideEl) => slideEl.column === activeIndex + 1)[0];
        prevSlide = slides.filter((slideEl) => slideEl.column === activeIndex - 1)[0];
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      activeSlide.classList.add(params.slideActiveClass);
      if (gridEnabled) {
        if (nextSlide) {
          nextSlide.classList.add(params.slideNextClass);
        }
        if (prevSlide) {
          prevSlide.classList.add(params.slidePrevClass);
        }
      } else {
        nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        if (nextSlide) {
          nextSlide.classList.add(params.slideNextClass);
        }
        prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
        if (prevSlide) {
          prevSlide.classList.add(params.slidePrevClass);
        }
      }
    }
    swiper3.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper3, imageEl) => {
    if (!swiper3 || swiper3.destroyed || !swiper3.params)
      return;
    const slideSelector = () => swiper3.isElement ? `swiper-slide` : `.${swiper3.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      let lazyEl = slideEl.querySelector(`.${swiper3.params.lazyPreloaderClass}`);
      if (!lazyEl && swiper3.isElement) {
        if (slideEl.shadowRoot) {
          lazyEl = slideEl.shadowRoot.querySelector(`.${swiper3.params.lazyPreloaderClass}`);
        } else {
          requestAnimationFrame(() => {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(`.${swiper3.params.lazyPreloaderClass}`);
              if (lazyEl)
                lazyEl.remove();
            }
          });
        }
      }
      if (lazyEl)
        lazyEl.remove();
    }
  };
  var unlazy = (swiper3, index) => {
    if (!swiper3.slides[index])
      return;
    const imageEl = swiper3.slides[index].querySelector('[loading="lazy"]');
    if (imageEl)
      imageEl.removeAttribute("loading");
  };
  var preload = (swiper3) => {
    if (!swiper3 || swiper3.destroyed || !swiper3.params)
      return;
    let amount = swiper3.params.lazyPreloadPrevNext;
    const len = swiper3.slides.length;
    if (!len || !amount || amount < 0)
      return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper3.params.slidesPerView === "auto" ? swiper3.slidesPerViewDynamic() : Math.ceil(swiper3.params.slidesPerView);
    const activeIndex = swiper3.activeIndex;
    if (swiper3.params.grid && swiper3.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_, i) => {
        return activeColumn + slidesPerView + i;
      }));
      swiper3.slides.forEach((slideEl, i) => {
        if (preloadColumns.includes(slideEl.column))
          unlazy(swiper3, i);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper3.params.rewind || swiper3.params.loop) {
      for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
        const realIndex = (i % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView)
          unlazy(swiper3, realIndex);
      }
    } else {
      for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
        if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
          unlazy(swiper3, i);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper3) {
    const {
      slidesGrid,
      params
    } = swiper3;
    const translate2 = swiper3.rtlTranslate ? swiper3.translate : -swiper3.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper3 = this;
    const translate2 = swiper3.rtlTranslate ? swiper3.translate : -swiper3.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper3;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper3.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper3.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper3.virtual.slides.length) {
        realIndex2 -= swiper3.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper3);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper3.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper3.snapIndex = snapIndex;
        swiper3.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper3.params.loop && swiper3.virtual && swiper3.params.virtual.enabled) {
      swiper3.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper3.grid && params.grid && params.grid.rows > 1;
    let realIndex;
    if (swiper3.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper3.slides.filter((slideEl) => slideEl.column === activeIndex)[0];
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper3.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params.grid.rows);
    } else if (swiper3.slides[activeIndex]) {
      const slideIndex = swiper3.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper3, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper3.initialized) {
      preload(swiper3);
    }
    swiper3.emit("activeIndexChange");
    swiper3.emit("snapIndexChange");
    if (swiper3.initialized || swiper3.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper3.emit("realIndexChange");
      }
      swiper3.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper3 = this;
    const params = swiper3.params;
    let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
    if (!slide2 && swiper3.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i = 0; i < swiper3.slides.length; i += 1) {
        if (swiper3.slides[i] === slide2) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper3.clickedSlide = slide2;
      if (swiper3.virtual && swiper3.params.virtual.enabled) {
        swiper3.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper3.clickedIndex = slideIndex;
      }
    } else {
      swiper3.clickedSlide = void 0;
      swiper3.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper3.clickedIndex !== void 0 && swiper3.clickedIndex !== swiper3.activeIndex) {
      swiper3.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper3 = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper3;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper3.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper3 = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper3;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper3.isHorizontal()) {
      x = rtl ? -translate2 : translate2;
    } else {
      y = translate2;
    }
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper3.previousTranslate = swiper3.translate;
    swiper3.translate = swiper3.isHorizontal() ? x : y;
    if (params.cssMode) {
      wrapperEl[swiper3.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper3.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      if (swiper3.isHorizontal()) {
        x -= swiper3.cssOverflowAdjustment();
      } else {
        y -= swiper3.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper3.maxTranslate() - swiper3.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper3.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper3.updateProgress(translate2);
    }
    swiper3.emit("setTranslate", swiper3.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper3 = this;
    const {
      params,
      wrapperEl
    } = swiper3;
    if (swiper3.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper3.minTranslate();
    const maxTranslate2 = swiper3.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper3.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper3.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper3.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper3,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper3.setTransition(0);
      swiper3.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper3.emit("beforeTransitionStart", speed, internal);
        swiper3.emit("transitionEnd");
      }
    } else {
      swiper3.setTransition(speed);
      swiper3.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper3.emit("beforeTransitionStart", speed, internal);
        swiper3.emit("transitionStart");
      }
      if (!swiper3.animating) {
        swiper3.animating = true;
        if (!swiper3.onTranslateToWrapperTransitionEnd) {
          swiper3.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper3 || swiper3.destroyed)
              return;
            if (e.target !== this)
              return;
            swiper3.wrapperEl.removeEventListener("transitionend", swiper3.onTranslateToWrapperTransitionEnd);
            swiper3.onTranslateToWrapperTransitionEnd = null;
            delete swiper3.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) {
              swiper3.emit("transitionEnd");
            }
          };
        }
        swiper3.wrapperEl.addEventListener("transitionend", swiper3.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper3 = this;
    if (!swiper3.params.cssMode) {
      swiper3.wrapperEl.style.transitionDuration = `${duration}ms`;
      swiper3.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
    }
    swiper3.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper: swiper3,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper3;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper3.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper3.emit(`slideResetTransition${step}`);
        return;
      }
      swiper3.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper3.emit(`slideNextTransition${step}`);
      } else {
        swiper3.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper3 = this;
    const {
      params
    } = swiper3;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper3.updateAutoHeight();
    }
    transitionEmit({
      swiper: swiper3,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper3 = this;
    const {
      params
    } = swiper3;
    swiper3.animating = false;
    if (params.cssMode)
      return;
    swiper3.setTransition(0);
    transitionEmit({
      swiper: swiper3,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper3 = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper3;
    if (swiper3.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
      return false;
    }
    const skip = Math.min(swiper3.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper3.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    }
    if (swiper3.initialized && slideIndex !== activeIndex) {
      if (!swiper3.allowSlideNext && (rtl ? translate2 > swiper3.translate && translate2 > swiper3.minTranslate() : translate2 < swiper3.translate && translate2 < swiper3.minTranslate())) {
        return false;
      }
      if (!swiper3.allowSlidePrev && translate2 > swiper3.translate && translate2 > swiper3.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper3.emit("beforeSlideChangeStart");
    }
    swiper3.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    if (rtl && -translate2 === swiper3.translate || !rtl && translate2 === swiper3.translate) {
      swiper3.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper3.updateAutoHeight();
      }
      swiper3.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper3.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper3.transitionStart(runCallbacks, direction);
        swiper3.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper3.isHorizontal();
      const t = rtl ? translate2 : -translate2;
      if (speed === 0) {
        const isVirtual = swiper3.virtual && swiper3.params.virtual.enabled;
        if (isVirtual) {
          swiper3.wrapperEl.style.scrollSnapType = "none";
          swiper3._immediateVirtual = true;
        }
        if (isVirtual && !swiper3._cssModeVirtualInitialSet && swiper3.params.initialSlide > 0) {
          swiper3._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper3.wrapperEl.style.scrollSnapType = "";
            swiper3._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper3.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper3,
            targetPosition: t,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth"
        });
      }
      return true;
    }
    swiper3.setTransition(speed);
    swiper3.setTranslate(translate2);
    swiper3.updateActiveIndex(slideIndex);
    swiper3.updateSlidesClasses();
    swiper3.emit("beforeTransitionStart", speed, internal);
    swiper3.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper3.transitionEnd(runCallbacks, direction);
    } else if (!swiper3.animating) {
      swiper3.animating = true;
      if (!swiper3.onSlideToWrapperTransitionEnd) {
        swiper3.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper3 || swiper3.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper3.wrapperEl.removeEventListener("transitionend", swiper3.onSlideToWrapperTransitionEnd);
          swiper3.onSlideToWrapperTransitionEnd = null;
          delete swiper3.onSlideToWrapperTransitionEnd;
          swiper3.transitionEnd(runCallbacks, direction);
        };
      }
      swiper3.wrapperEl.addEventListener("transitionend", swiper3.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper3 = this;
    const gridEnabled = swiper3.grid && swiper3.params.grid && swiper3.params.grid.rows > 1;
    let newIndex = index;
    if (swiper3.params.loop) {
      if (swiper3.virtual && swiper3.params.virtual.enabled) {
        newIndex = newIndex + swiper3.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper3.params.grid.rows;
          targetSlideIndex = swiper3.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          targetSlideIndex = swiper3.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper3.slides.length / swiper3.params.grid.rows) : swiper3.slides.length;
        const {
          centeredSlides
        } = swiper3.params;
        let slidesPerView = swiper3.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper3.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper3.params.slidesPerView, 10));
          if (centeredSlides && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (centeredSlides) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (needLoopFix) {
          const direction = centeredSlides ? targetSlideIndex < swiper3.activeIndex ? "prev" : "next" : targetSlideIndex - swiper3.activeIndex - 1 < swiper3.params.slidesPerView ? "next" : "prev";
          swiper3.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper3.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper3.params.grid.rows;
          newIndex = swiper3.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          newIndex = swiper3.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper3.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper3;
  }
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper3 = this;
    const {
      enabled,
      params,
      animating
    } = swiper3;
    if (!enabled)
      return swiper3;
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper3.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper3.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper3.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper3.loopFix({
        direction: "next"
      });
      swiper3._clientLeft = swiper3.wrapperEl.clientLeft;
      if (swiper3.activeIndex === swiper3.slides.length - 1 && params.cssMode) {
        requestAnimationFrame(() => {
          swiper3.slideTo(swiper3.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params.rewind && swiper3.isEnd) {
      return swiper3.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper3.slideTo(swiper3.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper3 = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper3;
    if (!enabled)
      return swiper3;
    const isVirtual = swiper3.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper3.loopFix({
        direction: "prev"
      });
      swiper3._clientLeft = swiper3.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper3.translate : -swiper3.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper3.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper3.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper3.isBeginning) {
      const lastIndex = swiper3.params.virtual && swiper3.params.virtual.enabled && swiper3.virtual ? swiper3.virtual.slides.length - 1 : swiper3.slides.length - 1;
      return swiper3.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params.loop && swiper3.activeIndex === 0 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper3.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper3.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper3 = this;
    return swiper3.slideTo(swiper3.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper3 = this;
    let index = swiper3.activeIndex;
    const skip = Math.min(swiper3.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper3.params.slidesPerGroup);
    const translate2 = swiper3.rtlTranslate ? swiper3.translate : -swiper3.translate;
    if (translate2 >= swiper3.snapGrid[snapIndex]) {
      const currentSnap = swiper3.snapGrid[snapIndex];
      const nextSnap = swiper3.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper3.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper3.snapGrid[snapIndex - 1];
      const currentSnap = swiper3.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper3.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper3.slidesGrid.length - 1);
    return swiper3.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper3 = this;
    const {
      params,
      slidesEl
    } = swiper3;
    const slidesPerView = params.slidesPerView === "auto" ? swiper3.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper3.clickedIndex;
    let realIndex;
    const slideSelector = swiper3.isElement ? `swiper-slide` : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper3.animating)
        return;
      realIndex = parseInt(swiper3.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper3.loopedSlides - slidesPerView / 2 || slideToIndex > swiper3.slides.length - swiper3.loopedSlides + slidesPerView / 2) {
          swiper3.loopFix();
          slideToIndex = swiper3.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper3.slideTo(slideToIndex);
          });
        } else {
          swiper3.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper3.slides.length - slidesPerView) {
        swiper3.loopFix();
        slideToIndex = swiper3.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper3.slideTo(slideToIndex);
        });
      } else {
        swiper3.slideTo(slideToIndex);
      }
    } else {
      swiper3.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex) {
    const swiper3 = this;
    const {
      params,
      slidesEl
    } = swiper3;
    if (!params.loop || swiper3.virtual && swiper3.params.virtual.enabled)
      return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const gridEnabled = swiper3.grid && params.grid && params.grid.rows > 1;
    const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
    const shouldFillGroup = swiper3.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper3.slides.length % params.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i = 0; i < amountOfSlides; i += 1) {
        const slideEl = swiper3.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
        swiper3.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper3.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper3.recalcSlides();
        swiper3.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = params.grid.rows - swiper3.slides.length % params.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper3.recalcSlides();
        swiper3.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    swiper3.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next"
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper3 = this;
    if (!swiper3.params.loop)
      return;
    swiper3.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper3;
    const {
      centeredSlides
    } = params;
    swiper3.allowSlidePrev = true;
    swiper3.allowSlideNext = true;
    if (swiper3.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!params.centeredSlides && swiper3.snapIndex === 0) {
          swiper3.slideTo(swiper3.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper3.snapIndex < params.slidesPerView) {
          swiper3.slideTo(swiper3.virtual.slides.length + swiper3.snapIndex, 0, false, true);
        } else if (swiper3.snapIndex === swiper3.snapGrid.length - 1) {
          swiper3.slideTo(swiper3.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper3.allowSlidePrev = allowSlidePrev;
      swiper3.allowSlideNext = allowSlideNext;
      swiper3.emit("loopFix");
      return;
    }
    let slidesPerView = params.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper3.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
      if (centeredSlides && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
    let loopedSlides = slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params.loopAdditionalSlides;
    swiper3.loopedSlides = loopedSlides;
    const gridEnabled = swiper3.grid && params.grid && params.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    let activeIndex = swiper3.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper3.getSlideIndex(slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
            if (slides[i2].column === colIndexToPrepend)
              prependSlidesIndexes.push(i2);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index)
              appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper3.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper3.__preventObserver__ = false;
    });
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper3.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper3.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper3.slides.forEach((slide2, slideIndex) => {
        swiper3.grid.updateSlide(slideIndex, slide2, swiper3.slides);
      });
    }
    if (params.watchSlidesProgress) {
      swiper3.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper3.slidesGrid[activeIndex];
          const newSlideTranslate = swiper3.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper3.setTranslate(swiper3.translate - diff);
          } else {
            swiper3.slideTo(activeIndex + slidesPrepended, 0, false, true);
            if (setTranslate2) {
              swiper3.touchEventsData.startTranslate = swiper3.touchEventsData.startTranslate - diff;
              swiper3.touchEventsData.currentTranslate = swiper3.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
            swiper3.slideTo(swiper3.activeIndex + shift, 0, false, true);
            swiper3.touchEventsData.currentTranslate = swiper3.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper3.slidesGrid[activeIndex];
          const newSlideTranslate = swiper3.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper3.setTranslate(swiper3.translate - diff);
          } else {
            swiper3.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper3.touchEventsData.startTranslate = swiper3.touchEventsData.startTranslate - diff;
              swiper3.touchEventsData.currentTranslate = swiper3.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
          swiper3.slideTo(swiper3.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper3.allowSlidePrev = allowSlidePrev;
    swiper3.allowSlideNext = allowSlideNext;
    if (swiper3.controller && swiper3.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper3.controller.control)) {
        swiper3.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop)
            c.loopFix({
              ...loopParams,
              slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
            });
        });
      } else if (swiper3.controller.control instanceof swiper3.constructor && swiper3.controller.control.params.loop) {
        swiper3.controller.control.loopFix({
          ...loopParams,
          slideTo: swiper3.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        });
      }
    }
    swiper3.emit("loopFix");
  }
  function loopDestroy() {
    const swiper3 = this;
    const {
      params,
      slidesEl
    } = swiper3;
    if (!params.loop || swiper3.virtual && swiper3.params.virtual.enabled)
      return;
    swiper3.recalcSlides();
    const newSlidesOrder = [];
    swiper3.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper3.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper3.recalcSlides();
    swiper3.slideTo(swiper3.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper3 = this;
    if (!swiper3.params.simulateTouch || swiper3.params.watchOverflow && swiper3.isLocked || swiper3.params.cssMode)
      return;
    const el = swiper3.params.touchEventsTarget === "container" ? swiper3.el : swiper3.wrapperEl;
    if (swiper3.isElement) {
      swiper3.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper3.isElement) {
      requestAnimationFrame(() => {
        swiper3.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper3 = this;
    if (swiper3.params.watchOverflow && swiper3.isLocked || swiper3.params.cssMode) {
      return;
    }
    if (swiper3.isElement) {
      swiper3.__preventObserver__ = true;
    }
    swiper3[swiper3.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper3.isElement) {
      requestAnimationFrame(() => {
        swiper3.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper3, event2, startX) {
    const window2 = getWindow();
    const {
      params
    } = swiper3;
    const edgeSwipeDetection = params.edgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper3 = this;
    const document2 = getDocument();
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    const data = swiper3.touchEventsData;
    if (e.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
        return;
      }
      data.pointerId = e.pointerId;
    } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
      data.touchId = e.targetTouches[0].identifier;
    }
    if (e.type === "touchstart") {
      preventEdgeSwipe(swiper3, e, e.targetTouches[0].pageX);
      return;
    }
    const {
      params,
      touches,
      enabled
    } = swiper3;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (swiper3.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper3.animating && params.cssMode && params.loop) {
      swiper3.loopFix();
    }
    let targetEl = e.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!swiper3.wrapperEl.contains(targetEl))
        return;
    }
    if ("which" in e && e.which === 3)
      return;
    if ("button" in e && e.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = e.composedPath ? e.composedPath() : e.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper3.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler))
        return;
    }
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper3, e, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper3.allowClick = true;
    swiper3.updateSize();
    swiper3.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper3.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper3.freeMode && swiper3.animating && !params.cssMode) {
      swiper3.freeMode.onTouchStart();
    }
    swiper3.emit("touchStart", e);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper3 = this;
    const data = swiper3.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper3;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    if (e.type === "pointermove") {
      if (data.touchId !== null)
        return;
      const id = e.pointerId;
      if (id !== data.pointerId)
        return;
    }
    let targetTouch;
    if (e.type === "touchmove") {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    } else {
      targetTouch = e;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper3.emit("touchMoveOpposite", e);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper3.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper3.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper3.isVertical()) {
        if (pageY < touches.startY && swiper3.translate <= swiper3.maxTranslate() || pageY > touches.startY && swiper3.translate >= swiper3.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper3.translate <= swiper3.maxTranslate() || pageX > touches.startX && swiper3.translate >= swiper3.minTranslate()) {
        return;
      }
    }
    if (document2.activeElement) {
      if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper3.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper3.emit("touchMove", e);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper3.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper3.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper3.isHorizontal() && touches.currentY === touches.startY || swiper3.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper3.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper3.emit("touchMoveOpposite", e);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper3.allowClick = false;
    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }
    let diff = swiper3.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper3.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper3.touchesDirection;
    swiper3.swipeDirection = diff > 0 ? "prev" : "next";
    swiper3.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper3.params.loop && !params.cssMode;
    const allowLoopFix = swiper3.touchesDirection === "next" && swiper3.allowSlideNext || swiper3.touchesDirection === "prev" && swiper3.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper3.loopFix({
          direction: swiper3.swipeDirection
        });
      }
      data.startTranslate = swiper3.getTranslate();
      swiper3.setTransition(0);
      if (swiper3.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper3.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper3.allowSlideNext === true || swiper3.allowSlidePrev === true)) {
        swiper3.setGrabCursor(true);
      }
      swiper3.emit("sliderFirstMove", e);
    }
    let loopFixed;
    new Date().getTime();
    if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper3.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper3.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper3.minTranslate() - swiper3.slidesSizesGrid[swiper3.activeIndex + 1] : swiper3.minTranslate())) {
        swiper3.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper3.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper3.minTranslate() - 1 + (-swiper3.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper3.maxTranslate() + swiper3.slidesSizesGrid[swiper3.slidesSizesGrid.length - 1] : swiper3.maxTranslate())) {
        swiper3.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper3.slides.length - (params.slidesPerView === "auto" ? swiper3.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper3.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper3.maxTranslate() + 1 - (swiper3.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }
    if (!swiper3.allowSlideNext && swiper3.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper3.allowSlidePrev && swiper3.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper3.allowSlidePrev && !swiper3.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper3.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper3.freeMode || params.watchSlidesProgress) {
      swiper3.updateActiveIndex();
      swiper3.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper3.freeMode) {
      swiper3.freeMode.onTouchMove();
    }
    swiper3.updateProgress(data.currentTranslate);
    swiper3.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper3 = this;
    const data = swiper3.touchEventsData;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    let targetTouch;
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null)
        return;
      if (e.pointerId !== data.pointerId)
        return;
      targetTouch = e;
    } else {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper3.browser.isSafari || swiper3.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper3;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (data.allowTouchCallbacks) {
      swiper3.emit("touchEnd", e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper3.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper3.allowSlideNext === true || swiper3.allowSlidePrev === true)) {
      swiper3.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper3.allowClick) {
      const pathTree = e.path || e.composedPath && e.composedPath();
      swiper3.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
      swiper3.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper3.emit("doubleTap doubleClick", e);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper3.destroyed)
        swiper3.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper3.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper3.translate : -swiper3.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper3.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    const swipeToLast = currentPos >= -swiper3.maxTranslate() && !swiper3.params.loop;
    let stopIndex = 0;
    let groupSize = swiper3.slidesSizesGrid[0];
    for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i + increment2] !== "undefined") {
        if (swipeToLast || currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment2] - slidesGrid[i];
        }
      } else if (swipeToLast || currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper3.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper3.virtual ? swiper3.virtual.slides.length - 1 : swiper3.slides.length - 1;
      } else if (swiper3.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper3.slideTo(swiper3.activeIndex);
        return;
      }
      if (swiper3.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper3.slideTo(params.rewind && swiper3.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper3.slideTo(stopIndex);
      }
      if (swiper3.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper3.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper3.slideTo(rewindLastIndex);
        } else {
          swiper3.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper3.slideTo(swiper3.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper3.navigation && (e.target === swiper3.navigation.nextEl || e.target === swiper3.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper3.swipeDirection === "next") {
          swiper3.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper3.swipeDirection === "prev") {
          swiper3.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper3.navigation.nextEl) {
        swiper3.slideTo(stopIndex + increment);
      } else {
        swiper3.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper3 = this;
    const {
      params,
      el
    } = swiper3;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper3.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper3;
    const isVirtual = swiper3.virtual && swiper3.params.virtual.enabled;
    swiper3.allowSlideNext = true;
    swiper3.allowSlidePrev = true;
    swiper3.updateSize();
    swiper3.updateSlides();
    swiper3.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper3.isEnd && !swiper3.isBeginning && !swiper3.params.centeredSlides && !isVirtualLoop) {
      swiper3.slideTo(swiper3.slides.length - 1, 0, false, true);
    } else {
      if (swiper3.params.loop && !isVirtual) {
        swiper3.slideToLoop(swiper3.realIndex, 0, false, true);
      } else {
        swiper3.slideTo(swiper3.activeIndex, 0, false, true);
      }
    }
    if (swiper3.autoplay && swiper3.autoplay.running && swiper3.autoplay.paused) {
      clearTimeout(swiper3.autoplay.resizeTimeout);
      swiper3.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper3.autoplay && swiper3.autoplay.running && swiper3.autoplay.paused) {
          swiper3.autoplay.resume();
        }
      }, 500);
    }
    swiper3.allowSlidePrev = allowSlidePrev;
    swiper3.allowSlideNext = allowSlideNext;
    if (swiper3.params.watchOverflow && snapGrid !== swiper3.snapGrid) {
      swiper3.checkOverflow();
    }
  }
  function onClick(e) {
    const swiper3 = this;
    if (!swiper3.enabled)
      return;
    if (!swiper3.allowClick) {
      if (swiper3.params.preventClicks)
        e.preventDefault();
      if (swiper3.params.preventClicksPropagation && swiper3.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper3 = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper3;
    if (!enabled)
      return;
    swiper3.previousTranslate = swiper3.translate;
    if (swiper3.isHorizontal()) {
      swiper3.translate = -wrapperEl.scrollLeft;
    } else {
      swiper3.translate = -wrapperEl.scrollTop;
    }
    if (swiper3.translate === 0)
      swiper3.translate = 0;
    swiper3.updateActiveIndex();
    swiper3.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper3.maxTranslate() - swiper3.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper3.translate - swiper3.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper3.progress) {
      swiper3.updateProgress(rtlTranslate ? -swiper3.translate : swiper3.translate);
    }
    swiper3.emit("setTranslate", swiper3.translate, false);
  }
  function onLoad(e) {
    const swiper3 = this;
    processLazyPreloader(swiper3, e.target);
    if (swiper3.params.cssMode || swiper3.params.slidesPerView !== "auto" && !swiper3.params.autoHeight) {
      return;
    }
    swiper3.update();
  }
  function onDocumentTouchStart() {
    const swiper3 = this;
    if (swiper3.documentTouchHandlerProceeded)
      return;
    swiper3.documentTouchHandlerProceeded = true;
    if (swiper3.params.touchReleaseOnEdges) {
      swiper3.el.style.touchAction = "auto";
    }
  }
  var events = (swiper3, method) => {
    const document2 = getDocument();
    const {
      params,
      el,
      wrapperEl,
      device
    } = swiper3;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    document2[domMethod]("touchstart", swiper3.onDocumentTouchStart, {
      passive: false,
      capture
    });
    el[domMethod]("touchstart", swiper3.onTouchStart, {
      passive: false
    });
    el[domMethod]("pointerdown", swiper3.onTouchStart, {
      passive: false
    });
    document2[domMethod]("touchmove", swiper3.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointermove", swiper3.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("touchend", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerup", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("touchcancel", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper3.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("contextmenu", swiper3.onTouchEnd, {
      passive: true
    });
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper3.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper3.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper3[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper3[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper3.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper3 = this;
    const {
      params
    } = swiper3;
    swiper3.onTouchStart = onTouchStart.bind(swiper3);
    swiper3.onTouchMove = onTouchMove.bind(swiper3);
    swiper3.onTouchEnd = onTouchEnd.bind(swiper3);
    swiper3.onDocumentTouchStart = onDocumentTouchStart.bind(swiper3);
    if (params.cssMode) {
      swiper3.onScroll = onScroll.bind(swiper3);
    }
    swiper3.onClick = onClick.bind(swiper3);
    swiper3.onLoad = onLoad.bind(swiper3);
    events(swiper3, "on");
  }
  function detachEvents() {
    const swiper3 = this;
    events(swiper3, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper3, params) => {
    return swiper3.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper3 = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper3;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const breakpoint = swiper3.getBreakpoint(breakpoints2, swiper3.params.breakpointsBase, swiper3.el);
    if (!breakpoint || swiper3.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper3.originalParams;
    const wasMultiRow = isGridEnabled(swiper3, params);
    const isMultiRow = isGridEnabled(swiper3, breakpointParams);
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      swiper3.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper3.emitContainerClasses();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper3[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper3[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    const wasLoop = params.loop;
    if (directionChanged && initialized) {
      swiper3.changeDirection();
    }
    extend2(swiper3.params, breakpointParams);
    const isEnabled = swiper3.params.enabled;
    const hasLoop = swiper3.params.loop;
    Object.assign(swiper3, {
      allowTouchMove: swiper3.params.allowTouchMove,
      allowSlideNext: swiper3.params.allowSlideNext,
      allowSlidePrev: swiper3.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper3.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper3.enable();
    }
    swiper3.currentBreakpoint = breakpoint;
    swiper3.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper3.loopDestroy();
        swiper3.loopCreate(realIndex);
        swiper3.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper3.loopCreate(realIndex);
        swiper3.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper3.loopDestroy();
      }
    }
    swiper3.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const {
        point,
        value
      } = points[i];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper3 = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper3;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper3.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper3.emitContainerClasses();
  }
  function removeClasses() {
    const swiper3 = this;
    const {
      el,
      classNames
    } = swiper3;
    el.classList.remove(...classNames);
    swiper3.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper3 = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper3;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper3.slides.length - 1;
      const lastSlideRightEdge = swiper3.slidesGrid[lastSlideIndex] + swiper3.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper3.isLocked = swiper3.size > lastSlideRightEdge;
    } else {
      swiper3.isLocked = swiper3.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper3.allowSlideNext = !swiper3.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper3.allowSlidePrev = !swiper3.isLocked;
    }
    if (wasLocked && wasLocked !== swiper3.isLocked) {
      swiper3.isEnd = false;
    }
    if (wasLocked !== swiper3.isLocked) {
      swiper3.emit(swiper3.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    eventsPrefix: "swiper",
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    width: null,
    height: null,
    preventInteractionOnTransition: false,
    userAgent: null,
    url: null,
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    autoHeight: false,
    setWrapperSize: false,
    virtualTranslate: false,
    effect: "slide",
    breakpoints: void 0,
    breakpointsBase: "window",
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    slidesOffsetAfter: 0,
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    watchOverflow: true,
    roundLengths: false,
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    uniqueNavElements: true,
    resistance: true,
    resistanceRatio: 0.85,
    watchSlidesProgress: false,
    grabCursor: false,
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    loop: false,
    loopAddBlankSlides: true,
    loopAdditionalSlides: 0,
    loopPreventsSliding: true,
    rewind: false,
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    containerModifierClass: "swiper-",
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    runCallbacksOnInit: true,
    _emitClasses: false
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend2(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
        params[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
        params[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend2(allModulesParams, obj);
        return;
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend2(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class {
    constructor() {
      let el;
      let params;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params)
        params = {};
      params = extend2({}, params);
      if (el && !params.el)
        params.el = el;
      const document2 = getDocument();
      if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = extend2({}, params, {
            el: containerEl
          });
          swipers.push(new Swiper(newParams));
        });
        return swipers;
      }
      const swiper3 = this;
      swiper3.__swiper__ = true;
      swiper3.support = getSupport();
      swiper3.device = getDevice({
        userAgent: params.userAgent
      });
      swiper3.browser = getBrowser();
      swiper3.eventsListeners = {};
      swiper3.eventsAnyListeners = [];
      swiper3.modules = [...swiper3.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        swiper3.modules.push(...params.modules);
      }
      const allModulesParams = {};
      swiper3.modules.forEach((mod) => {
        mod({
          params,
          swiper: swiper3,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper3.on.bind(swiper3),
          once: swiper3.once.bind(swiper3),
          off: swiper3.off.bind(swiper3),
          emit: swiper3.emit.bind(swiper3)
        });
      });
      const swiperParams = extend2({}, defaults, allModulesParams);
      swiper3.params = extend2({}, swiperParams, extendedDefaults, params);
      swiper3.originalParams = extend2({}, swiper3.params);
      swiper3.passedParams = extend2({}, params);
      if (swiper3.params && swiper3.params.on) {
        Object.keys(swiper3.params.on).forEach((eventName) => {
          swiper3.on(eventName, swiper3.params.on[eventName]);
        });
      }
      if (swiper3.params && swiper3.params.onAny) {
        swiper3.onAny(swiper3.params.onAny);
      }
      Object.assign(swiper3, {
        enabled: swiper3.params.enabled,
        el,
        classNames: [],
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        isHorizontal() {
          return swiper3.params.direction === "horizontal";
        },
        isVertical() {
          return swiper3.params.direction === "vertical";
        },
        activeIndex: 0,
        realIndex: 0,
        isBeginning: true,
        isEnd: false,
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        allowSlideNext: swiper3.params.allowSlideNext,
        allowSlidePrev: swiper3.params.allowSlidePrev,
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          focusableElements: swiper3.params.focusableElements,
          lastClickTime: 0,
          clickTimeout: void 0,
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        allowClick: true,
        allowTouchMove: swiper3.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper3.emit("_swiper");
      if (swiper3.params.init) {
        swiper3.init();
      }
      return swiper3;
    }
    getDirectionLabel(property) {
      if (this.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params
      } = this;
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
    }
    recalcSlides() {
      const swiper3 = this;
      const {
        slidesEl,
        params
      } = swiper3;
      swiper3.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    }
    enable() {
      const swiper3 = this;
      if (swiper3.enabled)
        return;
      swiper3.enabled = true;
      if (swiper3.params.grabCursor) {
        swiper3.setGrabCursor();
      }
      swiper3.emit("enable");
    }
    disable() {
      const swiper3 = this;
      if (!swiper3.enabled)
        return;
      swiper3.enabled = false;
      if (swiper3.params.grabCursor) {
        swiper3.unsetGrabCursor();
      }
      swiper3.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper3 = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper3.minTranslate();
      const max = swiper3.maxTranslate();
      const current = (max - min) * progress + min;
      swiper3.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper3.updateActiveIndex();
      swiper3.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper3 = this;
      if (!swiper3.params._emitClasses || !swiper3.el)
        return;
      const cls = swiper3.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper3.params.containerModifierClass) === 0;
      });
      swiper3.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper3 = this;
      if (swiper3.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper3.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper3 = this;
      if (!swiper3.params._emitClasses || !swiper3.el)
        return;
      const updates = [];
      swiper3.slides.forEach((slideEl) => {
        const classNames = swiper3.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper3.emit("_slideClass", slideEl, classNames);
      });
      swiper3.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }
      if (exact === void 0) {
        exact = false;
      }
      const swiper3 = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper3;
      let spv = 1;
      if (typeof params.slidesPerView === "number")
        return params.slidesPerView;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
        let breakLoop;
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper3 = this;
      if (!swiper3 || swiper3.destroyed)
        return;
      const {
        snapGrid,
        params
      } = swiper3;
      if (params.breakpoints) {
        swiper3.setBreakpoint();
      }
      [...swiper3.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper3, imageEl);
        }
      });
      swiper3.updateSize();
      swiper3.updateSlides();
      swiper3.updateProgress();
      swiper3.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper3.rtlTranslate ? swiper3.translate * -1 : swiper3.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper3.maxTranslate()), swiper3.minTranslate());
        swiper3.setTranslate(newTranslate);
        swiper3.updateActiveIndex();
        swiper3.updateSlidesClasses();
      }
      let translated;
      if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
        setTranslate2();
        if (params.autoHeight) {
          swiper3.updateAutoHeight();
        }
      } else {
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper3.isEnd && !params.centeredSlides) {
          const slides = swiper3.virtual && params.virtual.enabled ? swiper3.virtual.slides : swiper3.slides;
          translated = swiper3.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper3.slideTo(swiper3.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper3.snapGrid) {
        swiper3.checkOverflow();
      }
      swiper3.emit("update");
    }
    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      const swiper3 = this;
      const currentDirection = swiper3.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper3;
      }
      swiper3.el.classList.remove(`${swiper3.params.containerModifierClass}${currentDirection}`);
      swiper3.el.classList.add(`${swiper3.params.containerModifierClass}${newDirection}`);
      swiper3.emitContainerClasses();
      swiper3.params.direction = newDirection;
      swiper3.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper3.emit("changeDirection");
      if (needUpdate)
        swiper3.update();
      return swiper3;
    }
    changeLanguageDirection(direction) {
      const swiper3 = this;
      if (swiper3.rtl && direction === "rtl" || !swiper3.rtl && direction === "ltr")
        return;
      swiper3.rtl = direction === "rtl";
      swiper3.rtlTranslate = swiper3.params.direction === "horizontal" && swiper3.rtl;
      if (swiper3.rtl) {
        swiper3.el.classList.add(`${swiper3.params.containerModifierClass}rtl`);
        swiper3.el.dir = "rtl";
      } else {
        swiper3.el.classList.remove(`${swiper3.params.containerModifierClass}rtl`);
        swiper3.el.dir = "ltr";
      }
      swiper3.update();
    }
    mount(element) {
      const swiper3 = this;
      if (swiper3.mounted)
        return true;
      let el = element || swiper3.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper3;
      if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === "SWIPER-CONTAINER") {
        swiper3.isElement = true;
      }
      const getWrapperSelector = () => {
        return `.${(swiper3.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper3.params.createElements) {
        wrapperEl = createElement("div", swiper3.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, `.${swiper3.params.slideClass}`).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper3, {
        el,
        wrapperEl,
        slidesEl: swiper3.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
        hostEl: swiper3.isElement ? el.parentNode.host : el,
        mounted: true,
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper3.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper3 = this;
      if (swiper3.initialized)
        return swiper3;
      const mounted = swiper3.mount(el);
      if (mounted === false)
        return swiper3;
      swiper3.emit("beforeInit");
      if (swiper3.params.breakpoints) {
        swiper3.setBreakpoint();
      }
      swiper3.addClasses();
      swiper3.updateSize();
      swiper3.updateSlides();
      if (swiper3.params.watchOverflow) {
        swiper3.checkOverflow();
      }
      if (swiper3.params.grabCursor && swiper3.enabled) {
        swiper3.setGrabCursor();
      }
      if (swiper3.params.loop && swiper3.virtual && swiper3.params.virtual.enabled) {
        swiper3.slideTo(swiper3.params.initialSlide + swiper3.virtual.slidesBefore, 0, swiper3.params.runCallbacksOnInit, false, true);
      } else {
        swiper3.slideTo(swiper3.params.initialSlide, 0, swiper3.params.runCallbacksOnInit, false, true);
      }
      if (swiper3.params.loop) {
        swiper3.loopCreate();
      }
      swiper3.attachEvents();
      const lazyElements = [...swiper3.el.querySelectorAll('[loading="lazy"]')];
      if (swiper3.isElement) {
        lazyElements.push(...swiper3.hostEl.querySelectorAll('[loading="lazy"]'));
      }
      lazyElements.forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper3, imageEl);
        } else {
          imageEl.addEventListener("load", (e) => {
            processLazyPreloader(swiper3, e.target);
          });
        }
      });
      preload(swiper3);
      swiper3.initialized = true;
      preload(swiper3);
      swiper3.emit("init");
      swiper3.emit("afterInit");
      return swiper3;
    }
    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }
      if (cleanStyles === void 0) {
        cleanStyles = true;
      }
      const swiper3 = this;
      const {
        params,
        el,
        wrapperEl,
        slides
      } = swiper3;
      if (typeof swiper3.params === "undefined" || swiper3.destroyed) {
        return null;
      }
      swiper3.emit("beforeDestroy");
      swiper3.initialized = false;
      swiper3.detachEvents();
      if (params.loop) {
        swiper3.loopDestroy();
      }
      if (cleanStyles) {
        swiper3.removeClasses();
        el.removeAttribute("style");
        wrapperEl.removeAttribute("style");
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper3.emit("destroy");
      Object.keys(swiper3.eventsListeners).forEach((eventName) => {
        swiper3.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper3.el.swiper = null;
        deleteProps(swiper3);
      }
      swiper3.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend2(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!Swiper.prototype.__modules__)
        Swiper.prototype.__modules__ = [];
      const modules = Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => Swiper.installModule(m));
        return Swiper;
      }
      Swiper.installModule(module);
      return Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  // node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper3, originalParams, params, checkProps) {
    if (swiper3.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper3.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper3.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }

  // node_modules/swiper/modules/navigation.mjs
  function Navigation(_ref) {
    let {
      swiper: swiper3,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper3.navigation = {
      nextEl: null,
      prevEl: null
    };
    const makeElementsArray = (el) => (Array.isArray(el) ? el : [el]).filter((e) => !!e);
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper3.isElement) {
        res = swiper3.el.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper3.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper3.el.querySelectorAll(el).length === 1) {
          res = swiper3.el.querySelector(el);
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper3.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper3.params.watchOverflow && swiper3.enabled) {
            subEl.classList[swiper3.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper3.navigation;
      if (swiper3.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper3.isBeginning && !swiper3.params.rewind);
      toggleEl(nextEl, swiper3.isEnd && !swiper3.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper3.isBeginning && !swiper3.params.loop && !swiper3.params.rewind)
        return;
      swiper3.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper3.isEnd && !swiper3.params.loop && !swiper3.params.rewind)
        return;
      swiper3.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper3.params.navigation;
      swiper3.params.navigation = createElementIfNotDefined(swiper3, swiper3.originalParams.navigation, swiper3.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl))
        return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper3.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper3.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper3.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper3.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper3.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper3.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper3.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper3.params.navigation.lockClass));
    });
    on("click", (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper3.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      if (swiper3.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
        if (swiper3.pagination && swiper3.params.pagination && swiper3.params.pagination.clickable && (swiper3.pagination.el === targetEl || swiper3.pagination.el.contains(targetEl)))
          return;
        let isHidden;
        if (nextEl.length) {
          isHidden = nextEl[0].classList.contains(swiper3.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden = prevEl[0].classList.contains(swiper3.params.navigation.hiddenClass);
        }
        if (isHidden === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper3.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper3.el.classList.remove(...swiper3.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper3.el.classList.add(...swiper3.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper3.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/shared/classes-to-selector.mjs
  function classesToSelector(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
  }

  // node_modules/swiper/modules/pagination.mjs
  function Pagination(_ref) {
    let {
      swiper: swiper3,
      extendParams,
      on,
      emit
    } = _ref;
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
        paginationDisabledClass: `${pfx}-disabled`
      }
    });
    swiper3.pagination = {
      el: null,
      bullets: []
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    const makeElementsArray = (el) => (Array.isArray(el) ? el : [el]).filter((e) => !!e);
    function isPaginationDisabled() {
      return !swiper3.params.pagination.el || !swiper3.pagination.el || Array.isArray(swiper3.pagination.el) && swiper3.pagination.el.length === 0;
    }
    function setSideBullets(bulletEl, position) {
      const {
        bulletActiveClass
      } = swiper3.params.pagination;
      if (!bulletEl)
        return;
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}`);
        bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
        }
      }
    }
    function onBulletClick(e) {
      const bulletEl = e.target.closest(classesToSelector(swiper3.params.pagination.bulletClass));
      if (!bulletEl) {
        return;
      }
      e.preventDefault();
      const index = elementIndex(bulletEl) * swiper3.params.slidesPerGroup;
      if (swiper3.params.loop) {
        if (swiper3.realIndex === index)
          return;
        swiper3.slideToLoop(index);
      } else {
        swiper3.slideTo(index);
      }
    }
    function update2() {
      const rtl = swiper3.rtl;
      const params = swiper3.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper3.pagination.el;
      el = makeElementsArray(el);
      let current;
      let previousIndex;
      const slidesLength = swiper3.virtual && swiper3.params.virtual.enabled ? swiper3.virtual.slides.length : swiper3.slides.length;
      const total = swiper3.params.loop ? Math.ceil(slidesLength / swiper3.params.slidesPerGroup) : swiper3.snapGrid.length;
      if (swiper3.params.loop) {
        previousIndex = swiper3.previousRealIndex || 0;
        current = swiper3.params.slidesPerGroup > 1 ? Math.floor(swiper3.realIndex / swiper3.params.slidesPerGroup) : swiper3.realIndex;
      } else if (typeof swiper3.snapIndex !== "undefined") {
        current = swiper3.snapIndex;
        previousIndex = swiper3.previousSnapIndex;
      } else {
        previousIndex = swiper3.previousIndex || 0;
        current = swiper3.activeIndex || 0;
      }
      if (params.type === "bullets" && swiper3.pagination.bullets && swiper3.pagination.bullets.length > 0) {
        const bullets = swiper3.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper3.isHorizontal() ? "width" : "height", true);
          el.forEach((subEl) => {
            subEl.style[swiper3.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach((bulletEl) => {
          const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1) {
          bullets.forEach((bullet) => {
            const bulletIndex = elementIndex(bullet);
            if (bulletIndex === current) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            } else if (swiper3.isElement) {
              bullet.setAttribute("part", "bullet");
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, "prev");
              }
              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, "next");
              }
            }
          });
        } else {
          const bullet = bullets[current];
          if (bullet) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          }
          if (swiper3.isElement) {
            bullets.forEach((bulletEl, bulletIndex) => {
              bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
            });
          }
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i = firstIndex; i <= lastIndex; i += 1) {
              if (bullets[i]) {
                bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
            }
            setSideBullets(firstDisplayedBullet, "prev");
            setSideBullets(lastDisplayedBullet, "next");
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.forEach((bullet) => {
            bullet.style[swiper3.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === "fraction") {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }
        if (params.type === "progressbar") {
          let progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper3.isHorizontal() ? "vertical" : "horizontal";
          } else {
            progressbarDirection = swiper3.isHorizontal() ? "horizontal" : "vertical";
          }
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === "horizontal") {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
            progressEl.style.transitionDuration = `${swiper3.params.speed}ms`;
          });
        }
        if (params.type === "custom" && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper3, current + 1, total);
          if (subElIndex === 0)
            emit("paginationRender", subEl);
        } else {
          if (subElIndex === 0)
            emit("paginationRender", subEl);
          emit("paginationUpdate", subEl);
        }
        if (swiper3.params.watchOverflow && swiper3.enabled) {
          subEl.classList[swiper3.isLocked ? "add" : "remove"](params.lockClass);
        }
      });
    }
    function render() {
      const params = swiper3.params.pagination;
      if (isPaginationDisabled())
        return;
      const slidesLength = swiper3.virtual && swiper3.params.virtual.enabled ? swiper3.virtual.slides.length : swiper3.grid && swiper3.params.grid.rows > 1 ? swiper3.slides.length / Math.ceil(swiper3.params.grid.rows) : swiper3.slides.length;
      let el = swiper3.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = "";
      if (params.type === "bullets") {
        let numberOfBullets = swiper3.params.loop ? Math.ceil(slidesLength / swiper3.params.slidesPerGroup) : swiper3.snapGrid.length;
        if (swiper3.params.freeMode && swiper3.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }
        for (let i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper3, i, params.bulletClass);
          } else {
            paginationHTML += `<${params.bulletElement} ${swiper3.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }
      }
      if (params.type === "fraction") {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper3, params.currentClass, params.totalClass);
        } else {
          paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
        }
      }
      if (params.type === "progressbar") {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper3, params.progressbarFillClass);
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }
      }
      swiper3.pagination.bullets = [];
      el.forEach((subEl) => {
        if (params.type !== "custom") {
          subEl.innerHTML = paginationHTML || "";
        }
        if (params.type === "bullets") {
          swiper3.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
        }
      });
      if (params.type !== "custom") {
        emit("paginationRender", el[0]);
      }
    }
    function init() {
      swiper3.params.pagination = createElementIfNotDefined(swiper3, swiper3.originalParams.pagination, swiper3.params.pagination, {
        el: "swiper-pagination"
      });
      const params = swiper3.params.pagination;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper3.isElement) {
        el = swiper3.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = [...document.querySelectorAll(params.el)];
      }
      if (!el) {
        el = params.el;
      }
      if (!el || el.length === 0)
        return;
      if (swiper3.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
        el = [...swiper3.el.querySelectorAll(params.el)];
        if (el.length > 1) {
          el = el.filter((subEl) => {
            if (elementParents(subEl, ".swiper")[0] !== swiper3.el)
              return false;
            return true;
          })[0];
        }
      }
      if (Array.isArray(el) && el.length === 1)
        el = el[0];
      Object.assign(swiper3.pagination, {
        el
      });
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (params.type === "bullets" && params.clickable) {
          subEl.classList.add(...(params.clickableClass || "").split(" "));
        }
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper3.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.type === "bullets" && params.dynamicBullets) {
          subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === "progressbar" && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }
        if (params.clickable) {
          subEl.addEventListener("click", onBulletClick);
        }
        if (!swiper3.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }
    function destroy() {
      const params = swiper3.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper3.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper3.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.clickable) {
            subEl.classList.remove(...(params.clickableClass || "").split(" "));
            subEl.removeEventListener("click", onBulletClick);
          }
        });
      }
      if (swiper3.pagination.bullets)
        swiper3.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
    }
    on("changeDirection", () => {
      if (!swiper3.pagination || !swiper3.pagination.el)
        return;
      const params = swiper3.params.pagination;
      let {
        el
      } = swiper3.pagination;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper3.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on("init", () => {
      if (swiper3.params.pagination.enabled === false) {
        disable();
      } else {
        init();
        render();
        update2();
      }
    });
    on("activeIndexChange", () => {
      if (typeof swiper3.snapIndex === "undefined") {
        update2();
      }
    });
    on("snapIndexChange", () => {
      update2();
    });
    on("snapGridLengthChange", () => {
      render();
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        el
      } = swiper3.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList[swiper3.enabled ? "remove" : "add"](swiper3.params.pagination.lockClass));
      }
    });
    on("lock unlock", () => {
      update2();
    });
    on("click", (_s, e) => {
      const targetEl = e.target;
      const el = makeElementsArray(swiper3.pagination.el);
      if (swiper3.params.pagination.el && swiper3.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper3.params.pagination.bulletClass)) {
        if (swiper3.navigation && (swiper3.navigation.nextEl && targetEl === swiper3.navigation.nextEl || swiper3.navigation.prevEl && targetEl === swiper3.navigation.prevEl))
          return;
        const isHidden = el[0].classList.contains(swiper3.params.pagination.hiddenClass);
        if (isHidden === true) {
          emit("paginationShow");
        } else {
          emit("paginationHide");
        }
        el.forEach((subEl) => subEl.classList.toggle(swiper3.params.pagination.hiddenClass));
      }
    });
    const enable = () => {
      swiper3.el.classList.remove(swiper3.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper3.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.remove(swiper3.params.pagination.paginationDisabledClass));
      }
      init();
      render();
      update2();
    };
    const disable = () => {
      swiper3.el.classList.add(swiper3.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper3.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.add(swiper3.params.pagination.paginationDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper3.pagination, {
      enable,
      disable,
      render,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/modules/autoplay.mjs
  function Autoplay(_ref) {
    let {
      swiper: swiper3,
      extendParams,
      on,
      emit,
      params
    } = _ref;
    swiper3.autoplay = {
      running: false,
      paused: false,
      timeLeft: 0
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3e3,
        waitForTransition: true,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false
      }
    });
    let timeout;
    let raf;
    let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayTimeLeft;
    let autoplayStartTime = new Date().getTime();
    let wasPaused;
    let isTouched;
    let pausedByTouch;
    let touchStartTimeout;
    let slideChanged;
    let pausedByInteraction;
    let pausedByPointerEnter;
    function onTransitionEnd(e) {
      if (!swiper3 || swiper3.destroyed || !swiper3.wrapperEl)
        return;
      if (e.target !== swiper3.wrapperEl)
        return;
      swiper3.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
      if (pausedByPointerEnter) {
        return;
      }
      resume();
    }
    const calcTimeLeft = () => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      if (swiper3.autoplay.paused) {
        wasPaused = true;
      } else if (wasPaused) {
        autoplayDelayCurrent = autoplayTimeLeft;
        wasPaused = false;
      }
      const timeLeft = swiper3.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - new Date().getTime();
      swiper3.autoplay.timeLeft = timeLeft;
      emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
      raf = requestAnimationFrame(() => {
        calcTimeLeft();
      });
    };
    const getSlideDelay = () => {
      let activeSlideEl;
      if (swiper3.virtual && swiper3.params.virtual.enabled) {
        activeSlideEl = swiper3.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
      } else {
        activeSlideEl = swiper3.slides[swiper3.activeIndex];
      }
      if (!activeSlideEl)
        return void 0;
      const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
      return currentSlideDelay;
    };
    const run = (delayForce) => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      cancelAnimationFrame(raf);
      calcTimeLeft();
      let delay = typeof delayForce === "undefined" ? swiper3.params.autoplay.delay : delayForce;
      autoplayDelayTotal = swiper3.params.autoplay.delay;
      autoplayDelayCurrent = swiper3.params.autoplay.delay;
      const currentSlideDelay = getSlideDelay();
      if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
        delay = currentSlideDelay;
        autoplayDelayTotal = currentSlideDelay;
        autoplayDelayCurrent = currentSlideDelay;
      }
      autoplayTimeLeft = delay;
      const speed = swiper3.params.speed;
      const proceed = () => {
        if (!swiper3 || swiper3.destroyed)
          return;
        if (swiper3.params.autoplay.reverseDirection) {
          if (!swiper3.isBeginning || swiper3.params.loop || swiper3.params.rewind) {
            swiper3.slidePrev(speed, true, true);
            emit("autoplay");
          } else if (!swiper3.params.autoplay.stopOnLastSlide) {
            swiper3.slideTo(swiper3.slides.length - 1, speed, true, true);
            emit("autoplay");
          }
        } else {
          if (!swiper3.isEnd || swiper3.params.loop || swiper3.params.rewind) {
            swiper3.slideNext(speed, true, true);
            emit("autoplay");
          } else if (!swiper3.params.autoplay.stopOnLastSlide) {
            swiper3.slideTo(0, speed, true, true);
            emit("autoplay");
          }
        }
        if (swiper3.params.cssMode) {
          autoplayStartTime = new Date().getTime();
          requestAnimationFrame(() => {
            run();
          });
        }
      };
      if (delay > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          proceed();
        }, delay);
      } else {
        requestAnimationFrame(() => {
          proceed();
        });
      }
      return delay;
    };
    const start = () => {
      autoplayStartTime = new Date().getTime();
      swiper3.autoplay.running = true;
      run();
      emit("autoplayStart");
    };
    const stop = () => {
      swiper3.autoplay.running = false;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      emit("autoplayStop");
    };
    const pause = (internal, reset) => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      clearTimeout(timeout);
      if (!internal) {
        pausedByInteraction = true;
      }
      const proceed = () => {
        emit("autoplayPause");
        if (swiper3.params.autoplay.waitForTransition) {
          swiper3.wrapperEl.addEventListener("transitionend", onTransitionEnd);
        } else {
          resume();
        }
      };
      swiper3.autoplay.paused = true;
      if (reset) {
        if (slideChanged) {
          autoplayTimeLeft = swiper3.params.autoplay.delay;
        }
        slideChanged = false;
        proceed();
        return;
      }
      const delay = autoplayTimeLeft || swiper3.params.autoplay.delay;
      autoplayTimeLeft = delay - (new Date().getTime() - autoplayStartTime);
      if (swiper3.isEnd && autoplayTimeLeft < 0 && !swiper3.params.loop)
        return;
      if (autoplayTimeLeft < 0)
        autoplayTimeLeft = 0;
      proceed();
    };
    const resume = () => {
      if (swiper3.isEnd && autoplayTimeLeft < 0 && !swiper3.params.loop || swiper3.destroyed || !swiper3.autoplay.running)
        return;
      autoplayStartTime = new Date().getTime();
      if (pausedByInteraction) {
        pausedByInteraction = false;
        run(autoplayTimeLeft);
      } else {
        run();
      }
      swiper3.autoplay.paused = false;
      emit("autoplayResume");
    };
    const onVisibilityChange = () => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      const document2 = getDocument();
      if (document2.visibilityState === "hidden") {
        pausedByInteraction = true;
        pause(true);
      }
      if (document2.visibilityState === "visible") {
        resume();
      }
    };
    const onPointerEnter = (e) => {
      if (e.pointerType !== "mouse")
        return;
      pausedByInteraction = true;
      pausedByPointerEnter = true;
      if (swiper3.animating || swiper3.autoplay.paused)
        return;
      pause(true);
    };
    const onPointerLeave = (e) => {
      if (e.pointerType !== "mouse")
        return;
      pausedByPointerEnter = false;
      if (swiper3.autoplay.paused) {
        resume();
      }
    };
    const attachMouseEvents = () => {
      if (swiper3.params.autoplay.pauseOnMouseEnter) {
        swiper3.el.addEventListener("pointerenter", onPointerEnter);
        swiper3.el.addEventListener("pointerleave", onPointerLeave);
      }
    };
    const detachMouseEvents = () => {
      swiper3.el.removeEventListener("pointerenter", onPointerEnter);
      swiper3.el.removeEventListener("pointerleave", onPointerLeave);
    };
    const attachDocumentEvents = () => {
      const document2 = getDocument();
      document2.addEventListener("visibilitychange", onVisibilityChange);
    };
    const detachDocumentEvents = () => {
      const document2 = getDocument();
      document2.removeEventListener("visibilitychange", onVisibilityChange);
    };
    on("init", () => {
      if (swiper3.params.autoplay.enabled) {
        attachMouseEvents();
        attachDocumentEvents();
        start();
      }
    });
    on("destroy", () => {
      detachMouseEvents();
      detachDocumentEvents();
      if (swiper3.autoplay.running) {
        stop();
      }
    });
    on("_freeModeStaticRelease", () => {
      if (pausedByTouch || pausedByInteraction) {
        resume();
      }
    });
    on("_freeModeNoMomentumRelease", () => {
      if (!swiper3.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on("beforeTransitionStart", (_s, speed, internal) => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      if (internal || !swiper3.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on("sliderFirstMove", () => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      if (swiper3.params.autoplay.disableOnInteraction) {
        stop();
        return;
      }
      isTouched = true;
      pausedByTouch = false;
      pausedByInteraction = false;
      touchStartTimeout = setTimeout(() => {
        pausedByInteraction = true;
        pausedByTouch = true;
        pause(true);
      }, 200);
    });
    on("touchEnd", () => {
      if (swiper3.destroyed || !swiper3.autoplay.running || !isTouched)
        return;
      clearTimeout(touchStartTimeout);
      clearTimeout(timeout);
      if (swiper3.params.autoplay.disableOnInteraction) {
        pausedByTouch = false;
        isTouched = false;
        return;
      }
      if (pausedByTouch && swiper3.params.cssMode)
        resume();
      pausedByTouch = false;
      isTouched = false;
    });
    on("slideChange", () => {
      if (swiper3.destroyed || !swiper3.autoplay.running)
        return;
      slideChanged = true;
    });
    Object.assign(swiper3.autoplay, {
      start,
      stop,
      pause,
      resume
    });
  }

  // public/assets/js/swiper.js
  var swiper = new Swiper(".swiper1-js", {
    spaceBetween: 0,
    slidesPerView: 1,
    loop: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoplay: {
      delay: 4e3,
      disableOnInteraction: false
    },
    modules: [Autoplay, Navigation]
  });
  var swiper2 = new Swiper(".swiper2-js", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    modules: [Navigation, Pagination]
  });

  // public/assets/js/articles.js
  var url = new URL(location);
  var cat;
  if (document.querySelector(".cat-1")) {
    cat = "#F7742A";
  } else if (document.querySelector(".cat-2")) {
    cat = "#1B99A1";
  } else if (document.querySelector(".cat-3")) {
    cat = "#FF6C7C";
  }
  var btnArticle = document.querySelector(".btn-article");
  var btnArticle1 = document.querySelector(".btn-article-1");
  var btnArticle2 = document.querySelector(".btn-article-2");
  var btnArticle3 = document.querySelector(".btn-article-3");
  var article1 = document.querySelector(".article-1");
  var article2 = document.querySelector(".article-2");
  var article3 = document.querySelector(".article-3");
  function updateDisplay() {
    const urlArticle = url.searchParams.get("article");
    if (urlArticle != null) {
      if (urlArticle == 1) {
        console.log("salut");
        article1.style.display = "flex";
        article2.style.display = "none";
        article3.style.display = "none";
        btnArticle1.style.color = cat;
        btnArticle1.style.backgroundColor = "white";
        btnArticle2.style.color = "white";
        btnArticle2.style.backgroundColor = cat;
        btnArticle3.style.color = "white";
        btnArticle3.style.backgroundColor = cat;
      } else if (urlArticle == 2) {
        console.log("salut2");
        article1.style.display = "none";
        article2.style.display = "flex";
        article3.style.display = "none";
        btnArticle2.style.color = cat;
        btnArticle2.style.backgroundColor = "white";
        btnArticle1.style.color = "white";
        btnArticle1.style.backgroundColor = cat;
        btnArticle3.style.color = "white";
        btnArticle3.style.backgroundColor = cat;
      } else if (urlArticle == 3) {
        console.log("salut3");
        article1.style.display = "none";
        article2.style.display = "none";
        article3.style.display = "flex";
        btnArticle3.style.color = cat;
        btnArticle3.style.backgroundColor = "white";
        btnArticle2.style.color = "white";
        btnArticle2.style.backgroundColor = cat;
        btnArticle1.style.color = "white";
        btnArticle1.style.backgroundColor = cat;
      }
    }
  }
  btnArticle1.addEventListener("click", () => {
    url.searchParams.set("article", "1");
    history.pushState({}, "", url);
    updateDisplay();
  });
  btnArticle2.addEventListener("click", () => {
    url.searchParams.set("article", "2");
    history.pushState({}, "", url);
    updateDisplay();
  });
  btnArticle3.addEventListener("click", () => {
    url.searchParams.set("article", "3");
    history.pushState({}, "", url);
    updateDisplay();
  });
  window.addEventListener("popstate", () => {
    updateDisplay();
    console.log("eeeeeh");
  });
  updateDisplay();
})();
