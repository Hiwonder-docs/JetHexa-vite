const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/chunks/VPLocalSearchBox.C8ojjcK8.js","assets/chunks/framework.B3cIkCnq.js"])))=>i.map(i=>d[i]);
import { d as defineComponent, c as createElementBlock, r as renderSlot, n as normalizeClass, o as openBlock, a as createTextVNode, t as toDisplayString, b as createBlock, w as withCtx, T as Transition, e as createCommentVNode, _ as _export_sfc, u as useData$1, i as isExternal, f as treatAsHtml, g as withBase, h as computed, j as createBaseVNode, k as unref, l as isActive, m as useMediaQuery, p as ref, q as watch, s as watchEffect, v as onMounted, x as onUnmounted, y as watchPostEffect, z as onUpdated, A as getScrollOffset, F as Fragment, B as renderList, C as resolveComponent, D as onContentUpdated, E as createVNode, G as shallowRef, H as resolveDynamicComponent, I as EXTERNAL_URL_RE, J as useRoute, K as mergeProps, L as inject, M as useWindowSize, N as normalizeStyle, O as onKeyStroke, P as nextTick, Q as useWindowScroll, R as inBrowser, S as readonly, U as defineAsyncComponent, V as __vitePreload, W as useScrollLock, X as provide, Y as toHandlers, Z as withKeys, $ as onBeforeUnmount, a0 as withModifiers, a1 as useSlots, a2 as Teleport, a3 as withDirectives, a4 as vModelText, a5 as reactive, a6 as h } from "./framework.B3cIkCnq.js";
const _sfc_main$$ = /* @__PURE__ */ defineComponent({
  __name: "VPBadge",
  props: {
    text: {},
    type: { default: "tip" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(["VPBadge", __props.type])
      }, [
        renderSlot(_ctx.$slots, "default", {}, () => [
          createTextVNode(toDisplayString(__props.text), 1)
        ])
      ], 2);
    };
  }
});
const _hoisted_1$L = {
  key: 0,
  class: "VPBackdrop"
};
const _sfc_main$_ = /* @__PURE__ */ defineComponent({
  __name: "VPBackdrop",
  props: {
    show: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, { name: "fade" }, {
        default: withCtx(() => [
          __props.show ? (openBlock(), createElementBlock("div", _hoisted_1$L)) : createCommentVNode("", true)
        ]),
        _: 1
      });
    };
  }
});
const VPBackdrop = /* @__PURE__ */ _export_sfc(_sfc_main$_, [["__scopeId", "data-v-c79a1216"]]);
const useData = useData$1;
function throttleAndDebounce(fn, delay) {
  let timeoutId;
  let called = false;
  return () => {
    if (timeoutId)
      clearTimeout(timeoutId);
    if (!called) {
      fn();
      (called = true) && setTimeout(() => called = false, delay);
    } else
      timeoutId = setTimeout(fn, delay);
  };
}
function ensureStartingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}
function normalizeLink$1(url) {
  const { pathname, search, hash, protocol } = new URL(url, "http://a.com");
  if (isExternal(url) || url.startsWith("#") || !protocol.startsWith("http") || !treatAsHtml(pathname))
    return url;
  const { site } = useData();
  const normalizedPath = pathname.endsWith("/") || pathname.endsWith(".html") ? url : url.replace(/(?:(^\.+)\/)?.*$/, `$1${pathname.replace(/(\.md)?$/, site.value.cleanUrls ? "" : ".html")}${search}${hash}`);
  return withBase(normalizedPath);
}
function useLangs({ correspondingLink = false } = {}) {
  const { site, localeIndex, page, theme: theme2, hash } = useData();
  const currentLang = computed(() => {
    var _a, _b;
    return {
      label: (_a = site.value.locales[localeIndex.value]) == null ? void 0 : _a.label,
      link: ((_b = site.value.locales[localeIndex.value]) == null ? void 0 : _b.link) || (localeIndex.value === "root" ? "/" : `/${localeIndex.value}/`)
    };
  });
  const localeLinks = computed(() => Object.entries(site.value.locales).flatMap(([key, value]) => currentLang.value.label === value.label ? [] : {
    text: value.label,
    link: normalizeLink(value.link || (key === "root" ? "/" : `/${key}/`), theme2.value.i18nRouting !== false && correspondingLink, page.value.relativePath.slice(currentLang.value.link.length - 1), !site.value.cleanUrls) + hash.value
  }));
  return { localeLinks, currentLang };
}
function normalizeLink(link, addPath, path, addExt) {
  return addPath ? link.replace(/\/$/, "") + ensureStartingSlash(path.replace(/(^|\/)index\.md$/, "$1").replace(/\.md$/, addExt ? ".html" : "")) : link;
}
const _hoisted_1$K = { class: "NotFound" };
const _hoisted_2$s = { class: "code" };
const _hoisted_3$i = { class: "title" };
const _hoisted_4$a = { class: "quote" };
const _hoisted_5$a = { class: "action" };
const _hoisted_6$8 = ["href", "aria-label"];
const _sfc_main$Z = /* @__PURE__ */ defineComponent({
  __name: "NotFound",
  setup(__props) {
    const { theme: theme2 } = useData();
    const { currentLang } = useLangs();
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e;
      return openBlock(), createElementBlock("div", _hoisted_1$K, [
        createBaseVNode("p", _hoisted_2$s, toDisplayString(((_a = unref(theme2).notFound) == null ? void 0 : _a.code) ?? "404"), 1),
        createBaseVNode("h1", _hoisted_3$i, toDisplayString(((_b = unref(theme2).notFound) == null ? void 0 : _b.title) ?? "PAGE NOT FOUND"), 1),
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "divider" }, null, -1)),
        createBaseVNode("blockquote", _hoisted_4$a, toDisplayString(((_c = unref(theme2).notFound) == null ? void 0 : _c.quote) ?? "But if you don't change your direction, and if you keep looking, you may end up where you are heading."), 1),
        createBaseVNode("div", _hoisted_5$a, [
          createBaseVNode("a", {
            class: "link",
            href: unref(withBase)(unref(currentLang).link),
            "aria-label": ((_d = unref(theme2).notFound) == null ? void 0 : _d.linkLabel) ?? "go to home"
          }, toDisplayString(((_e = unref(theme2).notFound) == null ? void 0 : _e.linkText) ?? "Take me home"), 9, _hoisted_6$8)
        ])
      ]);
    };
  }
});
const NotFound = /* @__PURE__ */ _export_sfc(_sfc_main$Z, [["__scopeId", "data-v-d6be1790"]]);
function getSidebar(_sidebar, path) {
  if (Array.isArray(_sidebar))
    return addBase(_sidebar);
  if (_sidebar == null)
    return [];
  path = ensureStartingSlash(path);
  const dir = Object.keys(_sidebar).sort((a, b) => {
    return b.split("/").length - a.split("/").length;
  }).find((dir2) => {
    return path.startsWith(ensureStartingSlash(dir2));
  });
  const sidebar = dir ? _sidebar[dir] : [];
  return Array.isArray(sidebar) ? addBase(sidebar) : addBase(sidebar.items, sidebar.base);
}
function getSidebarGroups(sidebar) {
  const groups = [];
  let lastGroupIndex = 0;
  for (const index in sidebar) {
    const item = sidebar[index];
    if (item.items) {
      lastGroupIndex = groups.push(item);
      continue;
    }
    if (!groups[lastGroupIndex]) {
      groups.push({ items: [] });
    }
    groups[lastGroupIndex].items.push(item);
  }
  return groups;
}
function getFlatSideBarLinks(sidebar) {
  const links = [];
  function recursivelyExtractLinks(items) {
    for (const item of items) {
      if (item.text && item.link) {
        links.push({
          text: item.text,
          link: item.link,
          docFooterText: item.docFooterText
        });
      }
      if (item.items) {
        recursivelyExtractLinks(item.items);
      }
    }
  }
  recursivelyExtractLinks(sidebar);
  return links;
}
function hasActiveLink(path, items) {
  if (Array.isArray(items)) {
    return items.some((item) => hasActiveLink(path, item));
  }
  return isActive(path, items.link) ? true : items.items ? hasActiveLink(path, items.items) : false;
}
function addBase(items, _base) {
  return [...items].map((_item) => {
    const item = { ..._item };
    const base = item.base || _base;
    if (base && item.link)
      item.link = base + item.link;
    if (item.items)
      item.items = addBase(item.items, base);
    return item;
  });
}
function useSidebar() {
  const { frontmatter, page, theme: theme2 } = useData();
  const is960 = useMediaQuery("(min-width: 960px)");
  const isOpen = ref(false);
  const _sidebar = computed(() => {
    const sidebarConfig = theme2.value.sidebar;
    const relativePath = page.value.relativePath;
    return sidebarConfig ? getSidebar(sidebarConfig, relativePath) : [];
  });
  const sidebar = ref(_sidebar.value);
  watch(_sidebar, (next, prev) => {
    if (JSON.stringify(next) !== JSON.stringify(prev))
      sidebar.value = _sidebar.value;
  });
  const hasSidebar = computed(() => {
    return frontmatter.value.sidebar !== false && sidebar.value.length > 0 && frontmatter.value.layout !== "home";
  });
  const leftAside = computed(() => {
    if (hasAside)
      return frontmatter.value.aside == null ? theme2.value.aside === "left" : frontmatter.value.aside === "left";
    return false;
  });
  const hasAside = computed(() => {
    if (frontmatter.value.layout === "home")
      return false;
    if (frontmatter.value.aside != null)
      return !!frontmatter.value.aside;
    return theme2.value.aside !== false;
  });
  const isSidebarEnabled = computed(() => hasSidebar.value && is960.value);
  const sidebarGroups = computed(() => {
    return hasSidebar.value ? getSidebarGroups(sidebar.value) : [];
  });
  function open() {
    isOpen.value = true;
  }
  function close() {
    isOpen.value = false;
  }
  function toggle() {
    isOpen.value ? close() : open();
  }
  return {
    isOpen,
    sidebar,
    sidebarGroups,
    hasSidebar,
    hasAside,
    leftAside,
    isSidebarEnabled,
    open,
    close,
    toggle
  };
}
function useCloseSidebarOnEscape(isOpen, close) {
  let triggerElement;
  watchEffect(() => {
    triggerElement = isOpen.value ? document.activeElement : void 0;
  });
  onMounted(() => {
    window.addEventListener("keyup", onEscape);
  });
  onUnmounted(() => {
    window.removeEventListener("keyup", onEscape);
  });
  function onEscape(e) {
    if (e.key === "Escape" && isOpen.value) {
      close();
      triggerElement == null ? void 0 : triggerElement.focus();
    }
  }
}
function useSidebarControl(item) {
  const { page, hash } = useData();
  const collapsed = ref(false);
  const collapsible = computed(() => {
    return item.value.collapsed != null;
  });
  const isLink = computed(() => {
    return !!item.value.link;
  });
  const isActiveLink = ref(false);
  const updateIsActiveLink = () => {
    isActiveLink.value = isActive(page.value.relativePath, item.value.link);
  };
  watch([page, item, hash], updateIsActiveLink);
  onMounted(updateIsActiveLink);
  const hasActiveLink$1 = computed(() => {
    if (isActiveLink.value) {
      return true;
    }
    return item.value.items ? hasActiveLink(page.value.relativePath, item.value.items) : false;
  });
  const hasChildren = computed(() => {
    return !!(item.value.items && item.value.items.length);
  });
  watchEffect(() => {
    collapsed.value = !!(collapsible.value && item.value.collapsed);
  });
  watchPostEffect(() => {
    (isActiveLink.value || hasActiveLink$1.value) && (collapsed.value = false);
  });
  function toggle() {
    if (collapsible.value) {
      collapsed.value = !collapsed.value;
    }
  }
  return {
    collapsed,
    collapsible,
    isLink,
    isActiveLink,
    hasActiveLink: hasActiveLink$1,
    hasChildren,
    toggle
  };
}
function useAside() {
  const { hasSidebar } = useSidebar();
  const is960 = useMediaQuery("(min-width: 960px)");
  const is1280 = useMediaQuery("(min-width: 1280px)");
  const isAsideEnabled = computed(() => {
    if (!is1280.value && !is960.value) {
      return false;
    }
    return hasSidebar.value ? is1280.value : is960.value;
  });
  return {
    isAsideEnabled
  };
}
const ignoreRE = /\b(?:VPBadge|header-anchor|footnote-ref|ignore-header)\b/;
const resolvedHeaders = [];
function resolveTitle(theme2) {
  return typeof theme2.outline === "object" && !Array.isArray(theme2.outline) && theme2.outline.label || theme2.outlineTitle || "On this page";
}
function getHeaders(range) {
  const headers = [
    ...document.querySelectorAll(".VPDoc :where(h1,h2,h3,h4,h5,h6)")
  ].filter((el) => el.id && el.hasChildNodes()).map((el) => {
    const level = Number(el.tagName[1]);
    return {
      element: el,
      title: serializeHeader(el),
      link: "#" + el.id,
      level
    };
  });
  return resolveHeaders(headers, range);
}
function serializeHeader(h2) {
  let ret = "";
  for (const node of h2.childNodes) {
    if (node.nodeType === 1) {
      if (ignoreRE.test(node.className))
        continue;
      ret += node.textContent;
    } else if (node.nodeType === 3) {
      ret += node.textContent;
    }
  }
  return ret.trim();
}
function resolveHeaders(headers, range) {
  if (range === false) {
    return [];
  }
  const levelsRange = (typeof range === "object" && !Array.isArray(range) ? range.level : range) || 2;
  const [high, low] = typeof levelsRange === "number" ? [levelsRange, levelsRange] : levelsRange === "deep" ? [2, 6] : levelsRange;
  return buildTree(headers, high, low);
}
function useActiveAnchor(container, marker) {
  const { isAsideEnabled } = useAside();
  const onScroll = throttleAndDebounce(setActiveLink, 100);
  let prevActiveLink = null;
  onMounted(() => {
    requestAnimationFrame(setActiveLink);
    window.addEventListener("scroll", onScroll);
  });
  onUpdated(() => {
    activateLink(location.hash);
  });
  onUnmounted(() => {
    window.removeEventListener("scroll", onScroll);
  });
  function setActiveLink() {
    if (!isAsideEnabled.value) {
      return;
    }
    const scrollY = window.scrollY;
    const innerHeight = window.innerHeight;
    const offsetHeight = document.body.offsetHeight;
    const isBottom = Math.abs(scrollY + innerHeight - offsetHeight) < 1;
    const headers = resolvedHeaders.map(({ element, link }) => ({
      link,
      top: getAbsoluteTop(element)
    })).filter(({ top }) => !Number.isNaN(top)).sort((a, b) => a.top - b.top);
    if (!headers.length) {
      activateLink(null);
      return;
    }
    if (scrollY < 1) {
      activateLink(null);
      return;
    }
    if (isBottom) {
      activateLink(headers[headers.length - 1].link);
      return;
    }
    let activeLink = null;
    for (const { link, top } of headers) {
      if (top > scrollY + getScrollOffset() + 4) {
        break;
      }
      activeLink = link;
    }
    activateLink(activeLink);
  }
  function activateLink(hash) {
    if (prevActiveLink) {
      prevActiveLink.classList.remove("active");
    }
    if (hash == null) {
      prevActiveLink = null;
    } else {
      prevActiveLink = container.value.querySelector(`a[href="${decodeURIComponent(hash)}"]`);
    }
    const activeLink = prevActiveLink;
    if (activeLink) {
      activeLink.classList.add("active");
      marker.value.style.top = activeLink.offsetTop + 39 + "px";
      marker.value.style.opacity = "1";
    } else {
      marker.value.style.top = "33px";
      marker.value.style.opacity = "0";
    }
  }
}
function getAbsoluteTop(element) {
  let offsetTop = 0;
  while (element !== document.body) {
    if (element === null) {
      return NaN;
    }
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
}
function buildTree(data, min, max) {
  resolvedHeaders.length = 0;
  const result = [];
  const stack = [];
  data.forEach((item) => {
    const node = { ...item, children: [] };
    let parent = stack[stack.length - 1];
    while (parent && parent.level >= node.level) {
      stack.pop();
      parent = stack[stack.length - 1];
    }
    if (node.element.classList.contains("ignore-header") || parent && "shouldIgnore" in parent) {
      stack.push({ level: node.level, shouldIgnore: true });
      return;
    }
    if (node.level > max || node.level < min)
      return;
    resolvedHeaders.push({ element: node.element, link: node.link });
    if (parent)
      parent.children.push(node);
    else
      result.push(node);
    stack.push(node);
  });
  return result;
}
const _hoisted_1$J = ["href", "title"];
const _sfc_main$Y = /* @__PURE__ */ defineComponent({
  __name: "VPDocOutlineItem",
  props: {
    headers: {},
    root: { type: Boolean }
  },
  setup(__props) {
    function onClick({ target: el }) {
      const id = el.href.split("#")[1];
      const heading = document.getElementById(decodeURIComponent(id));
      heading == null ? void 0 : heading.focus({ preventScroll: true });
    }
    return (_ctx, _cache) => {
      const _component_VPDocOutlineItem = resolveComponent("VPDocOutlineItem", true);
      return openBlock(), createElementBlock("ul", {
        class: normalizeClass(["VPDocOutlineItem", __props.root ? "root" : "nested"])
      }, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.headers, ({ children, link, title }) => {
          return openBlock(), createElementBlock("li", null, [
            createBaseVNode("a", {
              class: "outline-link",
              href: link,
              onClick,
              title
            }, toDisplayString(title), 9, _hoisted_1$J),
            (children == null ? void 0 : children.length) ? (openBlock(), createBlock(_component_VPDocOutlineItem, {
              key: 0,
              headers: children
            }, null, 8, ["headers"])) : createCommentVNode("", true)
          ]);
        }), 256))
      ], 2);
    };
  }
});
const VPDocOutlineItem = /* @__PURE__ */ _export_sfc(_sfc_main$Y, [["__scopeId", "data-v-b933a997"]]);
const _hoisted_1$I = { class: "content" };
const _hoisted_2$r = {
  "aria-level": "2",
  class: "outline-title",
  id: "doc-outline-aria-label",
  role: "heading"
};
const _sfc_main$X = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideOutline",
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    const headers = shallowRef([]);
    onContentUpdated(() => {
      headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
    });
    const container = ref();
    const marker = ref();
    useActiveAnchor(container, marker);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", {
        "aria-labelledby": "doc-outline-aria-label",
        class: normalizeClass(["VPDocAsideOutline", { "has-outline": headers.value.length > 0 }]),
        ref_key: "container",
        ref: container
      }, [
        createBaseVNode("div", _hoisted_1$I, [
          createBaseVNode("div", {
            class: "outline-marker",
            ref_key: "marker",
            ref: marker
          }, null, 512),
          createBaseVNode("div", _hoisted_2$r, toDisplayString(unref(resolveTitle)(unref(theme2))), 1),
          createVNode(VPDocOutlineItem, {
            headers: headers.value,
            root: true
          }, null, 8, ["headers"])
        ])
      ], 2);
    };
  }
});
const VPDocAsideOutline = /* @__PURE__ */ _export_sfc(_sfc_main$X, [["__scopeId", "data-v-a5bbad30"]]);
const _hoisted_1$H = { class: "VPDocAsideCarbonAds" };
const _sfc_main$W = /* @__PURE__ */ defineComponent({
  __name: "VPDocAsideCarbonAds",
  props: {
    carbonAds: {}
  },
  setup(__props) {
    const VPCarbonAds = () => null;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$H, [
        createVNode(unref(VPCarbonAds), { "carbon-ads": __props.carbonAds }, null, 8, ["carbon-ads"])
      ]);
    };
  }
});
const _hoisted_1$G = { class: "VPDocAside" };
const _sfc_main$V = /* @__PURE__ */ defineComponent({
  __name: "VPDocAside",
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$G, [
        renderSlot(_ctx.$slots, "aside-top", {}, void 0, true),
        renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true),
        createVNode(VPDocAsideOutline),
        renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true),
        _cache[0] || (_cache[0] = createBaseVNode("div", { class: "spacer" }, null, -1)),
        renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true),
        unref(theme2).carbonAds ? (openBlock(), createBlock(_sfc_main$W, {
          key: 0,
          "carbon-ads": unref(theme2).carbonAds
        }, null, 8, ["carbon-ads"])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true),
        renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
      ]);
    };
  }
});
const VPDocAside = /* @__PURE__ */ _export_sfc(_sfc_main$V, [["__scopeId", "data-v-3f215769"]]);
function useEditLink() {
  const { theme: theme2, page } = useData();
  return computed(() => {
    const { text = "Edit this page", pattern = "" } = theme2.value.editLink || {};
    let url;
    if (typeof pattern === "function") {
      url = pattern(page.value);
    } else {
      url = pattern.replace(/:path/g, page.value.filePath);
    }
    return { url, text };
  });
}
function usePrevNext() {
  const { page, theme: theme2, frontmatter } = useData();
  return computed(() => {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const sidebar = getSidebar(theme2.value.sidebar, page.value.relativePath);
    const links = getFlatSideBarLinks(sidebar);
    const candidates = uniqBy(links, (link) => link.link.replace(/[?#].*$/, ""));
    const index = candidates.findIndex((link) => {
      return isActive(page.value.relativePath, link.link);
    });
    const hidePrev = ((_a = theme2.value.docFooter) == null ? void 0 : _a.prev) === false && !frontmatter.value.prev || frontmatter.value.prev === false;
    const hideNext = ((_b = theme2.value.docFooter) == null ? void 0 : _b.next) === false && !frontmatter.value.next || frontmatter.value.next === false;
    return {
      prev: hidePrev ? void 0 : {
        text: (typeof frontmatter.value.prev === "string" ? frontmatter.value.prev : typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.text : void 0) ?? ((_c = candidates[index - 1]) == null ? void 0 : _c.docFooterText) ?? ((_d = candidates[index - 1]) == null ? void 0 : _d.text),
        link: (typeof frontmatter.value.prev === "object" ? frontmatter.value.prev.link : void 0) ?? ((_e = candidates[index - 1]) == null ? void 0 : _e.link)
      },
      next: hideNext ? void 0 : {
        text: (typeof frontmatter.value.next === "string" ? frontmatter.value.next : typeof frontmatter.value.next === "object" ? frontmatter.value.next.text : void 0) ?? ((_f = candidates[index + 1]) == null ? void 0 : _f.docFooterText) ?? ((_g = candidates[index + 1]) == null ? void 0 : _g.text),
        link: (typeof frontmatter.value.next === "object" ? frontmatter.value.next.link : void 0) ?? ((_h = candidates[index + 1]) == null ? void 0 : _h.link)
      }
    };
  });
}
function uniqBy(array, keyFn) {
  const seen = /* @__PURE__ */ new Set();
  return array.filter((item) => {
    const k = keyFn(item);
    return seen.has(k) ? false : seen.add(k);
  });
}
const _sfc_main$U = /* @__PURE__ */ defineComponent({
  __name: "VPLink",
  props: {
    tag: {},
    href: {},
    noIcon: { type: Boolean },
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const tag = computed(() => props.tag ?? (props.href ? "a" : "span"));
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href) || props.target === "_blank"
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(tag.value), {
        class: normalizeClass(["VPLink", {
          link: __props.href,
          "vp-external-link-icon": isExternal2.value,
          "no-icon": __props.noIcon
        }]),
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: __props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: __props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "href", "target", "rel"]);
    };
  }
});
const _hoisted_1$F = { class: "VPLastUpdated" };
const _hoisted_2$q = ["datetime"];
const _sfc_main$T = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooterLastUpdated",
  setup(__props) {
    const { theme: theme2, page, lang } = useData();
    const date = computed(
      () => new Date(page.value.lastUpdated)
    );
    const isoDatetime = computed(() => date.value.toISOString());
    const datetime = ref("");
    onMounted(() => {
      watchEffect(() => {
        var _a, _b, _c;
        datetime.value = new Intl.DateTimeFormat(
          ((_b = (_a = theme2.value.lastUpdated) == null ? void 0 : _a.formatOptions) == null ? void 0 : _b.forceLocale) ? lang.value : void 0,
          ((_c = theme2.value.lastUpdated) == null ? void 0 : _c.formatOptions) ?? {
            dateStyle: "short",
            timeStyle: "short"
          }
        ).format(date.value);
      });
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("p", _hoisted_1$F, [
        createTextVNode(toDisplayString(((_a = unref(theme2).lastUpdated) == null ? void 0 : _a.text) || unref(theme2).lastUpdatedText || "Last updated") + ": ", 1),
        createBaseVNode("time", { datetime: isoDatetime.value }, toDisplayString(datetime.value), 9, _hoisted_2$q)
      ]);
    };
  }
});
const VPDocFooterLastUpdated = /* @__PURE__ */ _export_sfc(_sfc_main$T, [["__scopeId", "data-v-e98dd255"]]);
const _hoisted_1$E = {
  key: 0,
  class: "VPDocFooter"
};
const _hoisted_2$p = {
  key: 0,
  class: "edit-info"
};
const _hoisted_3$h = {
  key: 0,
  class: "edit-link"
};
const _hoisted_4$9 = {
  key: 1,
  class: "last-updated"
};
const _hoisted_5$9 = {
  key: 1,
  class: "prev-next",
  "aria-labelledby": "doc-footer-aria-label"
};
const _hoisted_6$7 = { class: "pager" };
const _hoisted_7$5 = ["innerHTML"];
const _hoisted_8$4 = ["innerHTML"];
const _hoisted_9$3 = { class: "pager" };
const _hoisted_10$2 = ["innerHTML"];
const _hoisted_11$1 = ["innerHTML"];
const _sfc_main$S = /* @__PURE__ */ defineComponent({
  __name: "VPDocFooter",
  setup(__props) {
    const { theme: theme2, page, frontmatter } = useData();
    const editLink = useEditLink();
    const control = usePrevNext();
    const hasEditLink = computed(
      () => theme2.value.editLink && frontmatter.value.editLink !== false
    );
    const hasLastUpdated = computed(() => page.value.lastUpdated);
    const showFooter = computed(
      () => hasEditLink.value || hasLastUpdated.value || control.value.prev || control.value.next
    );
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return showFooter.value ? (openBlock(), createElementBlock("footer", _hoisted_1$E, [
        renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true),
        hasEditLink.value || hasLastUpdated.value ? (openBlock(), createElementBlock("div", _hoisted_2$p, [
          hasEditLink.value ? (openBlock(), createElementBlock("div", _hoisted_3$h, [
            createVNode(_sfc_main$U, {
              class: "edit-link-button",
              href: unref(editLink).url,
              "no-icon": true
            }, {
              default: withCtx(() => [
                _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vpi-square-pen edit-link-icon" }, null, -1)),
                createTextVNode(" " + toDisplayString(unref(editLink).text), 1)
              ]),
              _: 1
            }, 8, ["href"])
          ])) : createCommentVNode("", true),
          hasLastUpdated.value ? (openBlock(), createElementBlock("div", _hoisted_4$9, [
            createVNode(VPDocFooterLastUpdated)
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        ((_a = unref(control).prev) == null ? void 0 : _a.link) || ((_b = unref(control).next) == null ? void 0 : _b.link) ? (openBlock(), createElementBlock("nav", _hoisted_5$9, [
          _cache[1] || (_cache[1] = createBaseVNode("span", {
            class: "visually-hidden",
            id: "doc-footer-aria-label"
          }, "Pager", -1)),
          createBaseVNode("div", _hoisted_6$7, [
            ((_c = unref(control).prev) == null ? void 0 : _c.link) ? (openBlock(), createBlock(_sfc_main$U, {
              key: 0,
              class: "pager-link prev",
              href: unref(control).prev.link
            }, {
              default: withCtx(() => {
                var _a2;
                return [
                  createBaseVNode("span", {
                    class: "desc",
                    innerHTML: ((_a2 = unref(theme2).docFooter) == null ? void 0 : _a2.prev) || "Previous page"
                  }, null, 8, _hoisted_7$5),
                  createBaseVNode("span", {
                    class: "title",
                    innerHTML: unref(control).prev.text
                  }, null, 8, _hoisted_8$4)
                ];
              }),
              _: 1
            }, 8, ["href"])) : createCommentVNode("", true)
          ]),
          createBaseVNode("div", _hoisted_9$3, [
            ((_d = unref(control).next) == null ? void 0 : _d.link) ? (openBlock(), createBlock(_sfc_main$U, {
              key: 0,
              class: "pager-link next",
              href: unref(control).next.link
            }, {
              default: withCtx(() => {
                var _a2;
                return [
                  createBaseVNode("span", {
                    class: "desc",
                    innerHTML: ((_a2 = unref(theme2).docFooter) == null ? void 0 : _a2.next) || "Next page"
                  }, null, 8, _hoisted_10$2),
                  createBaseVNode("span", {
                    class: "title",
                    innerHTML: unref(control).next.text
                  }, null, 8, _hoisted_11$1)
                ];
              }),
              _: 1
            }, 8, ["href"])) : createCommentVNode("", true)
          ])
        ])) : createCommentVNode("", true)
      ])) : createCommentVNode("", true);
    };
  }
});
const VPDocFooter = /* @__PURE__ */ _export_sfc(_sfc_main$S, [["__scopeId", "data-v-e257564d"]]);
const _hoisted_1$D = { class: "container" };
const _hoisted_2$o = { class: "aside-container" };
const _hoisted_3$g = { class: "aside-content" };
const _hoisted_4$8 = { class: "content" };
const _hoisted_5$8 = { class: "content-container" };
const _hoisted_6$6 = { class: "main" };
const _sfc_main$R = /* @__PURE__ */ defineComponent({
  __name: "VPDoc",
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const { hasSidebar, hasAside, leftAside } = useSidebar();
    const pageName = computed(
      () => route.path.replace(/[./]+/g, "_").replace(/_html$/, "")
    );
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPDoc", { "has-sidebar": unref(hasSidebar), "has-aside": unref(hasAside) }])
      }, [
        renderSlot(_ctx.$slots, "doc-top", {}, void 0, true),
        createBaseVNode("div", _hoisted_1$D, [
          unref(hasAside) ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["aside", { "left-aside": unref(leftAside) }])
          }, [
            _cache[0] || (_cache[0] = createBaseVNode("div", { class: "aside-curtain" }, null, -1)),
            createBaseVNode("div", _hoisted_2$o, [
              createBaseVNode("div", _hoisted_3$g, [
                createVNode(VPDocAside, null, {
                  "aside-top": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
                  ]),
                  "aside-bottom": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
                  ]),
                  "aside-outline-before": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
                  ]),
                  "aside-outline-after": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
                  ]),
                  "aside-ads-before": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
                  ]),
                  "aside-ads-after": withCtx(() => [
                    renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
                  ]),
                  _: 3
                })
              ])
            ])
          ], 2)) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_4$8, [
            createBaseVNode("div", _hoisted_5$8, [
              renderSlot(_ctx.$slots, "doc-before", {}, void 0, true),
              createBaseVNode("main", _hoisted_6$6, [
                createVNode(_component_Content, {
                  class: normalizeClass(["vp-doc", [
                    pageName.value,
                    unref(theme2).externalLinkIcon && "external-link-icon-enabled"
                  ]])
                }, null, 8, ["class"])
              ]),
              createVNode(VPDocFooter, null, {
                "doc-footer-before": withCtx(() => [
                  renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
                ]),
                _: 3
              }),
              renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
            ])
          ])
        ]),
        renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
      ], 2);
    };
  }
});
const VPDoc = /* @__PURE__ */ _export_sfc(_sfc_main$R, [["__scopeId", "data-v-39a288b8"]]);
const _sfc_main$Q = /* @__PURE__ */ defineComponent({
  __name: "VPButton",
  props: {
    tag: {},
    size: { default: "medium" },
    theme: { default: "brand" },
    text: {},
    href: {},
    target: {},
    rel: {}
  },
  setup(__props) {
    const props = __props;
    const isExternal2 = computed(
      () => props.href && EXTERNAL_URL_RE.test(props.href)
    );
    const component = computed(() => {
      return props.tag || (props.href ? "a" : "button");
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(component.value), {
        class: normalizeClass(["VPButton", [__props.size, __props.theme]]),
        href: __props.href ? unref(normalizeLink$1)(__props.href) : void 0,
        target: props.target ?? (isExternal2.value ? "_blank" : void 0),
        rel: props.rel ?? (isExternal2.value ? "noreferrer" : void 0)
      }, {
        default: withCtx(() => [
          createTextVNode(toDisplayString(__props.text), 1)
        ]),
        _: 1
      }, 8, ["class", "href", "target", "rel"]);
    };
  }
});
const VPButton = /* @__PURE__ */ _export_sfc(_sfc_main$Q, [["__scopeId", "data-v-fa7799d5"]]);
const _hoisted_1$C = ["src", "alt"];
const _sfc_main$P = /* @__PURE__ */ defineComponent({
  ...{ inheritAttrs: false },
  __name: "VPImage",
  props: {
    image: {},
    alt: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      const _component_VPImage = resolveComponent("VPImage", true);
      return __props.image ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        typeof __props.image === "string" || "src" in __props.image ? (openBlock(), createElementBlock("img", mergeProps({
          key: 0,
          class: "VPImage"
        }, typeof __props.image === "string" ? _ctx.$attrs : { ...__props.image, ..._ctx.$attrs }, {
          src: unref(withBase)(typeof __props.image === "string" ? __props.image : __props.image.src),
          alt: __props.alt ?? (typeof __props.image === "string" ? "" : __props.image.alt || "")
        }), null, 16, _hoisted_1$C)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          createVNode(_component_VPImage, mergeProps({
            class: "dark",
            image: __props.image.dark,
            alt: __props.image.alt
          }, _ctx.$attrs), null, 16, ["image", "alt"]),
          createVNode(_component_VPImage, mergeProps({
            class: "light",
            image: __props.image.light,
            alt: __props.image.alt
          }, _ctx.$attrs), null, 16, ["image", "alt"])
        ], 64))
      ], 64)) : createCommentVNode("", true);
    };
  }
});
const VPImage = /* @__PURE__ */ _export_sfc(_sfc_main$P, [["__scopeId", "data-v-8426fc1a"]]);
const _hoisted_1$B = { class: "container" };
const _hoisted_2$n = { class: "main" };
const _hoisted_3$f = { class: "heading" };
const _hoisted_4$7 = ["innerHTML"];
const _hoisted_5$7 = ["innerHTML"];
const _hoisted_6$5 = ["innerHTML"];
const _hoisted_7$4 = {
  key: 0,
  class: "actions"
};
const _hoisted_8$3 = {
  key: 0,
  class: "image"
};
const _hoisted_9$2 = { class: "image-container" };
const _sfc_main$O = /* @__PURE__ */ defineComponent({
  __name: "VPHero",
  props: {
    name: {},
    text: {},
    tagline: {},
    image: {},
    actions: {}
  },
  setup(__props) {
    const heroImageSlotExists = inject("hero-image-slot-exists");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPHero", { "has-image": __props.image || unref(heroImageSlotExists) }])
      }, [
        createBaseVNode("div", _hoisted_1$B, [
          createBaseVNode("div", _hoisted_2$n, [
            renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true),
            renderSlot(_ctx.$slots, "home-hero-info", {}, () => [
              createBaseVNode("h1", _hoisted_3$f, [
                __props.name ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  innerHTML: __props.name,
                  class: "name clip"
                }, null, 8, _hoisted_4$7)) : createCommentVNode("", true),
                __props.text ? (openBlock(), createElementBlock("span", {
                  key: 1,
                  innerHTML: __props.text,
                  class: "text"
                }, null, 8, _hoisted_5$7)) : createCommentVNode("", true)
              ]),
              __props.tagline ? (openBlock(), createElementBlock("p", {
                key: 0,
                innerHTML: __props.tagline,
                class: "tagline"
              }, null, 8, _hoisted_6$5)) : createCommentVNode("", true)
            ], true),
            renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true),
            __props.actions ? (openBlock(), createElementBlock("div", _hoisted_7$4, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(__props.actions, (action) => {
                return openBlock(), createElementBlock("div", {
                  key: action.link,
                  class: "action"
                }, [
                  createVNode(VPButton, {
                    tag: "a",
                    size: "medium",
                    theme: action.theme,
                    text: action.text,
                    href: action.link,
                    target: action.target,
                    rel: action.rel
                  }, null, 8, ["theme", "text", "href", "target", "rel"])
                ]);
              }), 128))
            ])) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
          ]),
          __props.image || unref(heroImageSlotExists) ? (openBlock(), createElementBlock("div", _hoisted_8$3, [
            createBaseVNode("div", _hoisted_9$2, [
              _cache[0] || (_cache[0] = createBaseVNode("div", { class: "image-bg" }, null, -1)),
              renderSlot(_ctx.$slots, "home-hero-image", {}, () => [
                __props.image ? (openBlock(), createBlock(VPImage, {
                  key: 0,
                  class: "image-src",
                  image: __props.image
                }, null, 8, ["image"])) : createCommentVNode("", true)
              ], true)
            ])
          ])) : createCommentVNode("", true)
        ])
      ], 2);
    };
  }
});
const VPHero = /* @__PURE__ */ _export_sfc(_sfc_main$O, [["__scopeId", "data-v-4f9c455b"]]);
const _sfc_main$N = /* @__PURE__ */ defineComponent({
  __name: "VPHomeHero",
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _cache) => {
      return unref(fm).hero ? (openBlock(), createBlock(VPHero, {
        key: 0,
        class: "VPHomeHero",
        name: unref(fm).hero.name,
        text: unref(fm).hero.text,
        tagline: unref(fm).hero.tagline,
        image: unref(fm).hero.image,
        actions: unref(fm).hero.actions
      }, {
        "home-hero-info-before": withCtx(() => [
          renderSlot(_ctx.$slots, "home-hero-info-before")
        ]),
        "home-hero-info": withCtx(() => [
          renderSlot(_ctx.$slots, "home-hero-info")
        ]),
        "home-hero-info-after": withCtx(() => [
          renderSlot(_ctx.$slots, "home-hero-info-after")
        ]),
        "home-hero-actions-after": withCtx(() => [
          renderSlot(_ctx.$slots, "home-hero-actions-after")
        ]),
        "home-hero-image": withCtx(() => [
          renderSlot(_ctx.$slots, "home-hero-image")
        ]),
        _: 3
      }, 8, ["name", "text", "tagline", "image", "actions"])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$A = { class: "box" };
const _hoisted_2$m = {
  key: 0,
  class: "icon"
};
const _hoisted_3$e = ["innerHTML"];
const _hoisted_4$6 = ["innerHTML"];
const _hoisted_5$6 = ["innerHTML"];
const _hoisted_6$4 = {
  key: 4,
  class: "link-text"
};
const _hoisted_7$3 = { class: "link-text-value" };
const _sfc_main$M = /* @__PURE__ */ defineComponent({
  __name: "VPFeature",
  props: {
    icon: {},
    title: {},
    details: {},
    link: {},
    linkText: {},
    rel: {},
    target: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$U, {
        class: "VPFeature",
        href: __props.link,
        rel: __props.rel,
        target: __props.target,
        "no-icon": true,
        tag: __props.link ? "a" : "div"
      }, {
        default: withCtx(() => [
          createBaseVNode("article", _hoisted_1$A, [
            typeof __props.icon === "object" && __props.icon.wrap ? (openBlock(), createElementBlock("div", _hoisted_2$m, [
              createVNode(VPImage, {
                image: __props.icon,
                alt: __props.icon.alt,
                height: __props.icon.height || 48,
                width: __props.icon.width || 48
              }, null, 8, ["image", "alt", "height", "width"])
            ])) : typeof __props.icon === "object" ? (openBlock(), createBlock(VPImage, {
              key: 1,
              image: __props.icon,
              alt: __props.icon.alt,
              height: __props.icon.height || 48,
              width: __props.icon.width || 48
            }, null, 8, ["image", "alt", "height", "width"])) : __props.icon ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: "icon",
              innerHTML: __props.icon
            }, null, 8, _hoisted_3$e)) : createCommentVNode("", true),
            createBaseVNode("h2", {
              class: "title",
              innerHTML: __props.title
            }, null, 8, _hoisted_4$6),
            __props.details ? (openBlock(), createElementBlock("p", {
              key: 3,
              class: "details",
              innerHTML: __props.details
            }, null, 8, _hoisted_5$6)) : createCommentVNode("", true),
            __props.linkText ? (openBlock(), createElementBlock("div", _hoisted_6$4, [
              createBaseVNode("p", _hoisted_7$3, [
                createTextVNode(toDisplayString(__props.linkText) + " ", 1),
                _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vpi-arrow-right link-text-icon" }, null, -1))
              ])
            ])) : createCommentVNode("", true)
          ])
        ]),
        _: 1
      }, 8, ["href", "rel", "target", "tag"]);
    };
  }
});
const VPFeature = /* @__PURE__ */ _export_sfc(_sfc_main$M, [["__scopeId", "data-v-a3976bdc"]]);
const _hoisted_1$z = {
  key: 0,
  class: "VPFeatures"
};
const _hoisted_2$l = { class: "container" };
const _hoisted_3$d = { class: "items" };
const _sfc_main$L = /* @__PURE__ */ defineComponent({
  __name: "VPFeatures",
  props: {
    features: {}
  },
  setup(__props) {
    const props = __props;
    const grid = computed(() => {
      const length = props.features.length;
      if (!length) {
        return;
      } else if (length === 2) {
        return "grid-2";
      } else if (length === 3) {
        return "grid-3";
      } else if (length % 3 === 0) {
        return "grid-6";
      } else if (length > 3) {
        return "grid-4";
      }
    });
    return (_ctx, _cache) => {
      return __props.features ? (openBlock(), createElementBlock("div", _hoisted_1$z, [
        createBaseVNode("div", _hoisted_2$l, [
          createBaseVNode("div", _hoisted_3$d, [
            (openBlock(true), createElementBlock(Fragment, null, renderList(__props.features, (feature) => {
              return openBlock(), createElementBlock("div", {
                key: feature.title,
                class: normalizeClass(["item", [grid.value]])
              }, [
                createVNode(VPFeature, {
                  icon: feature.icon,
                  title: feature.title,
                  details: feature.details,
                  link: feature.link,
                  "link-text": feature.linkText,
                  rel: feature.rel,
                  target: feature.target
                }, null, 8, ["icon", "title", "details", "link", "link-text", "rel", "target"])
              ], 2);
            }), 128))
          ])
        ])
      ])) : createCommentVNode("", true);
    };
  }
});
const VPFeatures = /* @__PURE__ */ _export_sfc(_sfc_main$L, [["__scopeId", "data-v-a6181336"]]);
const _sfc_main$K = /* @__PURE__ */ defineComponent({
  __name: "VPHomeFeatures",
  setup(__props) {
    const { frontmatter: fm } = useData();
    return (_ctx, _cache) => {
      return unref(fm).features ? (openBlock(), createBlock(VPFeatures, {
        key: 0,
        class: "VPHomeFeatures",
        features: unref(fm).features
      }, null, 8, ["features"])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$J = /* @__PURE__ */ defineComponent({
  __name: "VPHomeContent",
  setup(__props) {
    const { width: vw } = useWindowSize({
      initialWidth: 0,
      includeScrollbar: false
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "vp-doc container",
        style: normalizeStyle(unref(vw) ? { "--vp-offset": `calc(50% - ${unref(vw) / 2}px)` } : {})
      }, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ], 4);
    };
  }
});
const VPHomeContent = /* @__PURE__ */ _export_sfc(_sfc_main$J, [["__scopeId", "data-v-8e2d4988"]]);
const _sfc_main$I = /* @__PURE__ */ defineComponent({
  __name: "VPHome",
  setup(__props) {
    const { frontmatter, theme: theme2 } = useData();
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPHome", {
          "external-link-icon-enabled": unref(theme2).externalLinkIcon
        }])
      }, [
        renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true),
        createVNode(_sfc_main$N, null, {
          "home-hero-info-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
          ]),
          "home-hero-info": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
          ]),
          "home-hero-info-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
          ]),
          "home-hero-actions-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
          ]),
          "home-hero-image": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
          ]),
          _: 3
        }),
        renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true),
        renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true),
        createVNode(_sfc_main$K),
        renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true),
        unref(frontmatter).markdownStyles !== false ? (openBlock(), createBlock(VPHomeContent, { key: 0 }, {
          default: withCtx(() => [
            createVNode(_component_Content)
          ]),
          _: 1
        })) : (openBlock(), createBlock(_component_Content, { key: 1 }))
      ], 2);
    };
  }
});
const VPHome = /* @__PURE__ */ _export_sfc(_sfc_main$I, [["__scopeId", "data-v-8b561e3d"]]);
const _sfc_main$H = {};
const _hoisted_1$y = { class: "VPPage" };
function _sfc_render$1(_ctx, _cache) {
  const _component_Content = resolveComponent("Content");
  return openBlock(), createElementBlock("div", _hoisted_1$y, [
    renderSlot(_ctx.$slots, "page-top"),
    createVNode(_component_Content),
    renderSlot(_ctx.$slots, "page-bottom")
  ]);
}
const VPPage = /* @__PURE__ */ _export_sfc(_sfc_main$H, [["render", _sfc_render$1]]);
const _sfc_main$G = /* @__PURE__ */ defineComponent({
  __name: "VPContent",
  setup(__props) {
    const { page, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPContent", {
          "has-sidebar": unref(hasSidebar),
          "is-home": unref(frontmatter).layout === "home"
        }]),
        id: "VPContent"
      }, [
        unref(page).isNotFound ? renderSlot(_ctx.$slots, "not-found", { key: 0 }, () => [
          createVNode(NotFound)
        ], true) : unref(frontmatter).layout === "page" ? (openBlock(), createBlock(VPPage, { key: 1 }, {
          "page-top": withCtx(() => [
            renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
          ]),
          "page-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
          ]),
          _: 3
        })) : unref(frontmatter).layout === "home" ? (openBlock(), createBlock(VPHome, { key: 2 }, {
          "home-hero-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
          ]),
          "home-hero-info-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
          ]),
          "home-hero-info": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
          ]),
          "home-hero-info-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
          ]),
          "home-hero-actions-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
          ]),
          "home-hero-image": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
          ]),
          "home-hero-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
          ]),
          "home-features-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
          ]),
          "home-features-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
          ]),
          _: 3
        })) : unref(frontmatter).layout && unref(frontmatter).layout !== "doc" ? (openBlock(), createBlock(resolveDynamicComponent(unref(frontmatter).layout), { key: 3 })) : (openBlock(), createBlock(VPDoc, { key: 4 }, {
          "doc-top": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
          ]),
          "doc-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
          ]),
          "doc-footer-before": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
          ]),
          "doc-before": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
          ]),
          "doc-after": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
          ]),
          "aside-top": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
          ]),
          "aside-outline-before": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
          ]),
          "aside-outline-after": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
          ]),
          "aside-ads-before": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
          ]),
          "aside-ads-after": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
          ]),
          "aside-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
          ]),
          _: 3
        }))
      ], 2);
    };
  }
});
const VPContent = /* @__PURE__ */ _export_sfc(_sfc_main$G, [["__scopeId", "data-v-1428d186"]]);
const _hoisted_1$x = { class: "container" };
const _hoisted_2$k = ["innerHTML"];
const _hoisted_3$c = ["innerHTML"];
const _sfc_main$F = /* @__PURE__ */ defineComponent({
  __name: "VPFooter",
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    return (_ctx, _cache) => {
      return unref(theme2).footer && unref(frontmatter).footer !== false ? (openBlock(), createElementBlock("footer", {
        key: 0,
        class: normalizeClass(["VPFooter", { "has-sidebar": unref(hasSidebar) }])
      }, [
        createBaseVNode("div", _hoisted_1$x, [
          unref(theme2).footer.message ? (openBlock(), createElementBlock("p", {
            key: 0,
            class: "message",
            innerHTML: unref(theme2).footer.message
          }, null, 8, _hoisted_2$k)) : createCommentVNode("", true),
          unref(theme2).footer.copyright ? (openBlock(), createElementBlock("p", {
            key: 1,
            class: "copyright",
            innerHTML: unref(theme2).footer.copyright
          }, null, 8, _hoisted_3$c)) : createCommentVNode("", true)
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const VPFooter = /* @__PURE__ */ _export_sfc(_sfc_main$F, [["__scopeId", "data-v-e315a0ad"]]);
function useLocalNav() {
  const { theme: theme2, frontmatter } = useData();
  const headers = shallowRef([]);
  const hasLocalNav = computed(() => {
    return headers.value.length > 0;
  });
  onContentUpdated(() => {
    headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
  });
  return {
    headers,
    hasLocalNav
  };
}
const _hoisted_1$w = { class: "menu-text" };
const _hoisted_2$j = { class: "header" };
const _hoisted_3$b = { class: "outline" };
const _sfc_main$E = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNavOutlineDropdown",
  props: {
    headers: {},
    navHeight: {}
  },
  setup(__props) {
    const props = __props;
    const { theme: theme2 } = useData();
    const open = ref(false);
    const vh = ref(0);
    const main = ref();
    const items = ref();
    function closeOnClickOutside(e) {
      var _a;
      if (!((_a = main.value) == null ? void 0 : _a.contains(e.target))) {
        open.value = false;
      }
    }
    watch(open, (value) => {
      if (value) {
        document.addEventListener("click", closeOnClickOutside);
        return;
      }
      document.removeEventListener("click", closeOnClickOutside);
    });
    onKeyStroke("Escape", () => {
      open.value = false;
    });
    onContentUpdated(() => {
      open.value = false;
    });
    function toggle() {
      open.value = !open.value;
      vh.value = window.innerHeight + Math.min(window.scrollY - props.navHeight, 0);
    }
    function onItemClick(e) {
      if (e.target.classList.contains("outline-link")) {
        if (items.value) {
          items.value.style.transition = "none";
        }
        nextTick(() => {
          open.value = false;
        });
      }
    }
    function scrollToTop() {
      open.value = false;
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "VPLocalNavOutlineDropdown",
        style: normalizeStyle({ "--vp-vh": vh.value + "px" }),
        ref_key: "main",
        ref: main
      }, [
        __props.headers.length > 0 ? (openBlock(), createElementBlock("button", {
          key: 0,
          onClick: toggle,
          class: normalizeClass({ open: open.value })
        }, [
          createBaseVNode("span", _hoisted_1$w, toDisplayString(unref(resolveTitle)(unref(theme2))), 1),
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vpi-chevron-right icon" }, null, -1))
        ], 2)) : (openBlock(), createElementBlock("button", {
          key: 1,
          onClick: scrollToTop
        }, toDisplayString(unref(theme2).returnToTopLabel || "Return to top"), 1)),
        createVNode(Transition, { name: "flyout" }, {
          default: withCtx(() => [
            open.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "items",
              ref: items,
              class: "items",
              onClick: onItemClick
            }, [
              createBaseVNode("div", _hoisted_2$j, [
                createBaseVNode("a", {
                  class: "top-link",
                  href: "#",
                  onClick: scrollToTop
                }, toDisplayString(unref(theme2).returnToTopLabel || "Return to top"), 1)
              ]),
              createBaseVNode("div", _hoisted_3$b, [
                createVNode(VPDocOutlineItem, { headers: __props.headers }, null, 8, ["headers"])
              ])
            ], 512)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ], 4);
    };
  }
});
const VPLocalNavOutlineDropdown = /* @__PURE__ */ _export_sfc(_sfc_main$E, [["__scopeId", "data-v-8a42e2b4"]]);
const _hoisted_1$v = { class: "container" };
const _hoisted_2$i = ["aria-expanded"];
const _hoisted_3$a = { class: "menu-text" };
const _sfc_main$D = /* @__PURE__ */ defineComponent({
  __name: "VPLocalNav",
  props: {
    open: { type: Boolean }
  },
  emits: ["open-menu"],
  setup(__props) {
    const { theme: theme2, frontmatter } = useData();
    const { hasSidebar } = useSidebar();
    const { headers } = useLocalNav();
    const { y } = useWindowScroll();
    const navHeight = ref(0);
    onMounted(() => {
      navHeight.value = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue(
          "--vp-nav-height"
        )
      );
    });
    onContentUpdated(() => {
      headers.value = getHeaders(frontmatter.value.outline ?? theme2.value.outline);
    });
    const empty = computed(() => {
      return headers.value.length === 0;
    });
    const emptyAndNoSidebar = computed(() => {
      return empty.value && !hasSidebar.value;
    });
    const classes = computed(() => {
      return {
        VPLocalNav: true,
        "has-sidebar": hasSidebar.value,
        empty: empty.value,
        fixed: emptyAndNoSidebar.value
      };
    });
    return (_ctx, _cache) => {
      return unref(frontmatter).layout !== "home" && (!emptyAndNoSidebar.value || unref(y) >= navHeight.value) ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(classes.value)
      }, [
        createBaseVNode("div", _hoisted_1$v, [
          unref(hasSidebar) ? (openBlock(), createElementBlock("button", {
            key: 0,
            class: "menu",
            "aria-expanded": __props.open,
            "aria-controls": "VPSidebarNav",
            onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("open-menu"))
          }, [
            _cache[1] || (_cache[1] = createBaseVNode("span", { class: "vpi-align-left menu-icon" }, null, -1)),
            createBaseVNode("span", _hoisted_3$a, toDisplayString(unref(theme2).sidebarMenuLabel || "Menu"), 1)
          ], 8, _hoisted_2$i)) : createCommentVNode("", true),
          createVNode(VPLocalNavOutlineDropdown, {
            headers: unref(headers),
            navHeight: navHeight.value
          }, null, 8, ["headers", "navHeight"])
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const VPLocalNav = /* @__PURE__ */ _export_sfc(_sfc_main$D, [["__scopeId", "data-v-a6f0e41e"]]);
function useNav() {
  const isScreenOpen = ref(false);
  function openScreen() {
    isScreenOpen.value = true;
    window.addEventListener("resize", closeScreenOnTabletWindow);
  }
  function closeScreen() {
    isScreenOpen.value = false;
    window.removeEventListener("resize", closeScreenOnTabletWindow);
  }
  function toggleScreen() {
    isScreenOpen.value ? closeScreen() : openScreen();
  }
  function closeScreenOnTabletWindow() {
    window.outerWidth >= 768 && closeScreen();
  }
  const route = useRoute();
  watch(() => route.path, closeScreen);
  return {
    isScreenOpen,
    openScreen,
    closeScreen,
    toggleScreen
  };
}
const _sfc_main$C = {};
const _hoisted_1$u = {
  class: "VPSwitch",
  type: "button",
  role: "switch"
};
const _hoisted_2$h = { class: "check" };
const _hoisted_3$9 = {
  key: 0,
  class: "icon"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("button", _hoisted_1$u, [
    createBaseVNode("span", _hoisted_2$h, [
      _ctx.$slots.default ? (openBlock(), createElementBlock("span", _hoisted_3$9, [
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ])) : createCommentVNode("", true)
    ])
  ]);
}
const VPSwitch = /* @__PURE__ */ _export_sfc(_sfc_main$C, [["render", _sfc_render], ["__scopeId", "data-v-1d5665e3"]]);
const _sfc_main$B = /* @__PURE__ */ defineComponent({
  __name: "VPSwitchAppearance",
  setup(__props) {
    const { isDark, theme: theme2 } = useData();
    const toggleAppearance = inject("toggle-appearance", () => {
      isDark.value = !isDark.value;
    });
    const switchTitle = ref("");
    watchPostEffect(() => {
      switchTitle.value = isDark.value ? theme2.value.lightModeSwitchTitle || "Switch to light theme" : theme2.value.darkModeSwitchTitle || "Switch to dark theme";
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VPSwitch, {
        title: switchTitle.value,
        class: "VPSwitchAppearance",
        "aria-checked": unref(isDark),
        onClick: unref(toggleAppearance)
      }, {
        default: withCtx(() => [..._cache[0] || (_cache[0] = [
          createBaseVNode("span", { class: "vpi-sun sun" }, null, -1),
          createBaseVNode("span", { class: "vpi-moon moon" }, null, -1)
        ])]),
        _: 1
      }, 8, ["title", "aria-checked", "onClick"]);
    };
  }
});
const VPSwitchAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$B, [["__scopeId", "data-v-5337faa4"]]);
const _hoisted_1$t = {
  key: 0,
  class: "VPNavBarAppearance"
};
const _sfc_main$A = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarAppearance",
  setup(__props) {
    const { site } = useData();
    return (_ctx, _cache) => {
      return unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createElementBlock("div", _hoisted_1$t, [
        createVNode(VPSwitchAppearance)
      ])) : createCommentVNode("", true);
    };
  }
});
const VPNavBarAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$A, [["__scopeId", "data-v-6c893767"]]);
const focusedElement = ref();
let active = false;
let listeners = 0;
function useFlyout(options) {
  const focus = ref(false);
  if (inBrowser) {
    !active && activateFocusTracking();
    listeners++;
    const unwatch = watch(focusedElement, (el) => {
      var _a, _b, _c;
      if (el === options.el.value || ((_a = options.el.value) == null ? void 0 : _a.contains(el))) {
        focus.value = true;
        (_b = options.onFocus) == null ? void 0 : _b.call(options);
      } else {
        focus.value = false;
        (_c = options.onBlur) == null ? void 0 : _c.call(options);
      }
    });
    onUnmounted(() => {
      unwatch();
      listeners--;
      if (!listeners) {
        deactivateFocusTracking();
      }
    });
  }
  return readonly(focus);
}
function activateFocusTracking() {
  document.addEventListener("focusin", handleFocusIn);
  active = true;
  focusedElement.value = document.activeElement;
}
function deactivateFocusTracking() {
  document.removeEventListener("focusin", handleFocusIn);
}
function handleFocusIn() {
  focusedElement.value = document.activeElement;
}
const _hoisted_1$s = { class: "VPMenuLink" };
const _hoisted_2$g = ["innerHTML"];
const _sfc_main$z = /* @__PURE__ */ defineComponent({
  __name: "VPMenuLink",
  props: {
    item: {}
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$s, [
        createVNode(_sfc_main$U, {
          class: normalizeClass({
            active: unref(isActive)(
              unref(page).relativePath,
              __props.item.activeMatch || __props.item.link,
              !!__props.item.activeMatch
            )
          }),
          href: __props.item.link,
          target: __props.item.target,
          rel: __props.item.rel,
          "no-icon": __props.item.noIcon
        }, {
          default: withCtx(() => [
            createBaseVNode("span", {
              innerHTML: __props.item.text
            }, null, 8, _hoisted_2$g)
          ]),
          _: 1
        }, 8, ["class", "href", "target", "rel", "no-icon"])
      ]);
    };
  }
});
const VPMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$z, [["__scopeId", "data-v-35975db6"]]);
const _hoisted_1$r = { class: "VPMenuGroup" };
const _hoisted_2$f = {
  key: 0,
  class: "title"
};
const _sfc_main$y = /* @__PURE__ */ defineComponent({
  __name: "VPMenuGroup",
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$r, [
        __props.text ? (openBlock(), createElementBlock("p", _hoisted_2$f, toDisplayString(__props.text), 1)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
          return openBlock(), createElementBlock(Fragment, null, [
            "link" in item ? (openBlock(), createBlock(VPMenuLink, {
              key: 0,
              item
            }, null, 8, ["item"])) : createCommentVNode("", true)
          ], 64);
        }), 256))
      ]);
    };
  }
});
const VPMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["__scopeId", "data-v-69e747b5"]]);
const _hoisted_1$q = { class: "VPMenu" };
const _hoisted_2$e = {
  key: 0,
  class: "items"
};
const _sfc_main$x = /* @__PURE__ */ defineComponent({
  __name: "VPMenu",
  props: {
    items: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$q, [
        __props.items ? (openBlock(), createElementBlock("div", _hoisted_2$e, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
            return openBlock(), createElementBlock(Fragment, {
              key: JSON.stringify(item)
            }, [
              "link" in item ? (openBlock(), createBlock(VPMenuLink, {
                key: 0,
                item
              }, null, 8, ["item"])) : "component" in item ? (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({
                key: 1,
                ref_for: true
              }, item.props), null, 16)) : (openBlock(), createBlock(VPMenuGroup, {
                key: 2,
                text: item.text,
                items: item.items
              }, null, 8, ["text", "items"]))
            ], 64);
          }), 128))
        ])) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default", {}, void 0, true)
      ]);
    };
  }
});
const VPMenu = /* @__PURE__ */ _export_sfc(_sfc_main$x, [["__scopeId", "data-v-b98bc113"]]);
const _hoisted_1$p = ["aria-expanded", "aria-label"];
const _hoisted_2$d = {
  key: 0,
  class: "text"
};
const _hoisted_3$8 = ["innerHTML"];
const _hoisted_4$5 = {
  key: 1,
  class: "vpi-more-horizontal icon"
};
const _hoisted_5$5 = { class: "menu" };
const _sfc_main$w = /* @__PURE__ */ defineComponent({
  __name: "VPFlyout",
  props: {
    icon: {},
    button: {},
    label: {},
    items: {}
  },
  setup(__props) {
    const open = ref(false);
    const el = ref();
    useFlyout({ el, onBlur });
    function onBlur() {
      open.value = false;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "VPFlyout",
        ref_key: "el",
        ref: el,
        onMouseenter: _cache[1] || (_cache[1] = ($event) => open.value = true),
        onMouseleave: _cache[2] || (_cache[2] = ($event) => open.value = false)
      }, [
        createBaseVNode("button", {
          type: "button",
          class: "button",
          "aria-haspopup": "true",
          "aria-expanded": open.value,
          "aria-label": __props.label,
          onClick: _cache[0] || (_cache[0] = ($event) => open.value = !open.value)
        }, [
          __props.button || __props.icon ? (openBlock(), createElementBlock("span", _hoisted_2$d, [
            __props.icon ? (openBlock(), createElementBlock("span", {
              key: 0,
              class: normalizeClass([__props.icon, "option-icon"])
            }, null, 2)) : createCommentVNode("", true),
            __props.button ? (openBlock(), createElementBlock("span", {
              key: 1,
              innerHTML: __props.button
            }, null, 8, _hoisted_3$8)) : createCommentVNode("", true),
            _cache[3] || (_cache[3] = createBaseVNode("span", { class: "vpi-chevron-down text-icon" }, null, -1))
          ])) : (openBlock(), createElementBlock("span", _hoisted_4$5))
        ], 8, _hoisted_1$p),
        createBaseVNode("div", _hoisted_5$5, [
          createVNode(VPMenu, { items: __props.items }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ]),
            _: 3
          }, 8, ["items"])
        ])
      ], 544);
    };
  }
});
const VPFlyout = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["__scopeId", "data-v-cf11d7a2"]]);
const _hoisted_1$o = ["href", "aria-label", "innerHTML"];
const _sfc_main$v = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLink",
  props: {
    icon: {},
    link: {},
    ariaLabel: {}
  },
  setup(__props) {
    const props = __props;
    const el = ref();
    onMounted(async () => {
      var _a;
      await nextTick();
      const span = (_a = el.value) == null ? void 0 : _a.children[0];
      if (span instanceof HTMLElement && span.className.startsWith("vpi-social-") && (getComputedStyle(span).maskImage || getComputedStyle(span).webkitMaskImage) === "none") {
        span.style.setProperty(
          "--icon",
          `url('https://api.iconify.design/simple-icons/${props.icon}.svg')`
        );
      }
    });
    const svg = computed(() => {
      if (typeof props.icon === "object") return props.icon.svg;
      return `<span class="vpi-social-${props.icon}"></span>`;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("a", {
        ref_key: "el",
        ref: el,
        class: "VPSocialLink no-icon",
        href: __props.link,
        "aria-label": __props.ariaLabel ?? (typeof __props.icon === "string" ? __props.icon : ""),
        target: "_blank",
        rel: "noopener",
        innerHTML: svg.value
      }, null, 8, _hoisted_1$o);
    };
  }
});
const VPSocialLink = /* @__PURE__ */ _export_sfc(_sfc_main$v, [["__scopeId", "data-v-bd121fe5"]]);
const _hoisted_1$n = { class: "VPSocialLinks" };
const _sfc_main$u = /* @__PURE__ */ defineComponent({
  __name: "VPSocialLinks",
  props: {
    links: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$n, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.links, ({ link, icon, ariaLabel }) => {
          return openBlock(), createBlock(VPSocialLink, {
            key: link,
            icon,
            link,
            ariaLabel
          }, null, 8, ["icon", "link", "ariaLabel"]);
        }), 128))
      ]);
    };
  }
});
const VPSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["__scopeId", "data-v-7bc22406"]]);
const _hoisted_1$m = {
  key: 0,
  class: "group translations"
};
const _hoisted_2$c = { class: "trans-title" };
const _hoisted_3$7 = {
  key: 1,
  class: "group"
};
const _hoisted_4$4 = { class: "item appearance" };
const _hoisted_5$4 = { class: "label" };
const _hoisted_6$3 = { class: "appearance-action" };
const _hoisted_7$2 = {
  key: 2,
  class: "group"
};
const _hoisted_8$2 = { class: "item social-links" };
const _sfc_main$t = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarExtra",
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const hasExtraContent = computed(
      () => localeLinks.value.length && currentLang.value.label || site.value.appearance || theme2.value.socialLinks
    );
    return (_ctx, _cache) => {
      return hasExtraContent.value ? (openBlock(), createBlock(VPFlyout, {
        key: 0,
        class: "VPNavBarExtra",
        label: "extra navigation"
      }, {
        default: withCtx(() => [
          unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createElementBlock("div", _hoisted_1$m, [
            createBaseVNode("p", _hoisted_2$c, toDisplayString(unref(currentLang).label), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
              return openBlock(), createBlock(VPMenuLink, {
                key: locale.link,
                item: locale
              }, null, 8, ["item"]);
            }), 128))
          ])) : createCommentVNode("", true),
          unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createElementBlock("div", _hoisted_3$7, [
            createBaseVNode("div", _hoisted_4$4, [
              createBaseVNode("p", _hoisted_5$4, toDisplayString(unref(theme2).darkModeSwitchLabel || "Appearance"), 1),
              createBaseVNode("div", _hoisted_6$3, [
                createVNode(VPSwitchAppearance)
              ])
            ])
          ])) : createCommentVNode("", true),
          unref(theme2).socialLinks ? (openBlock(), createElementBlock("div", _hoisted_7$2, [
            createBaseVNode("div", _hoisted_8$2, [
              createVNode(VPSocialLinks, {
                class: "social-links-list",
                links: unref(theme2).socialLinks
              }, null, 8, ["links"])
            ])
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      })) : createCommentVNode("", true);
    };
  }
});
const VPNavBarExtra = /* @__PURE__ */ _export_sfc(_sfc_main$t, [["__scopeId", "data-v-bb2aa2f0"]]);
const _hoisted_1$l = ["aria-expanded"];
const _sfc_main$s = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarHamburger",
  props: {
    active: { type: Boolean }
  },
  emits: ["click"],
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: normalizeClass(["VPNavBarHamburger", { active: __props.active }]),
        "aria-label": "mobile navigation",
        "aria-expanded": __props.active,
        "aria-controls": "VPNavScreen",
        onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("click"))
      }, [..._cache[1] || (_cache[1] = [
        createBaseVNode("span", { class: "container" }, [
          createBaseVNode("span", { class: "top" }),
          createBaseVNode("span", { class: "middle" }),
          createBaseVNode("span", { class: "bottom" })
        ], -1)
      ])], 10, _hoisted_1$l);
    };
  }
});
const VPNavBarHamburger = /* @__PURE__ */ _export_sfc(_sfc_main$s, [["__scopeId", "data-v-e5dd9c1c"]]);
const _hoisted_1$k = ["innerHTML"];
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuLink",
  props: {
    item: {}
  },
  setup(__props) {
    const { page } = useData();
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$U, {
        class: normalizeClass({
          VPNavBarMenuLink: true,
          active: unref(isActive)(
            unref(page).relativePath,
            __props.item.activeMatch || __props.item.link,
            !!__props.item.activeMatch
          )
        }),
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        tabindex: "0"
      }, {
        default: withCtx(() => [
          createBaseVNode("span", {
            innerHTML: __props.item.text
          }, null, 8, _hoisted_1$k)
        ]),
        _: 1
      }, 8, ["class", "href", "target", "rel", "no-icon"]);
    };
  }
});
const VPNavBarMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$r, [["__scopeId", "data-v-e56f3d57"]]);
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenuGroup",
  props: {
    item: {}
  },
  setup(__props) {
    const props = __props;
    const { page } = useData();
    const isChildActive = (navItem) => {
      if ("component" in navItem) return false;
      if ("link" in navItem) {
        return isActive(
          page.value.relativePath,
          navItem.link,
          !!props.item.activeMatch
        );
      }
      return navItem.items.some(isChildActive);
    };
    const childrenActive = computed(() => isChildActive(props.item));
    return (_ctx, _cache) => {
      return openBlock(), createBlock(VPFlyout, {
        class: normalizeClass({
          VPNavBarMenuGroup: true,
          active: unref(isActive)(unref(page).relativePath, __props.item.activeMatch, !!__props.item.activeMatch) || childrenActive.value
        }),
        button: __props.item.text,
        items: __props.item.items
      }, null, 8, ["class", "button", "items"]);
    };
  }
});
const _hoisted_1$j = {
  key: 0,
  "aria-labelledby": "main-nav-aria-label",
  class: "VPNavBarMenu"
};
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarMenu",
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return unref(theme2).nav ? (openBlock(), createElementBlock("nav", _hoisted_1$j, [
        _cache[0] || (_cache[0] = createBaseVNode("span", {
          id: "main-nav-aria-label",
          class: "visually-hidden"
        }, " Main Navigation ", -1)),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(theme2).nav, (item) => {
          return openBlock(), createElementBlock(Fragment, {
            key: JSON.stringify(item)
          }, [
            "link" in item ? (openBlock(), createBlock(VPNavBarMenuLink, {
              key: 0,
              item
            }, null, 8, ["item"])) : "component" in item ? (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({
              key: 1,
              ref_for: true
            }, item.props), null, 16)) : (openBlock(), createBlock(_sfc_main$q, {
              key: 2,
              item
            }, null, 8, ["item"]))
          ], 64);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
const VPNavBarMenu = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__scopeId", "data-v-dc692963"]]);
function createSearchTranslate(defaultTranslations) {
  const { localeIndex, theme: theme2 } = useData();
  function translate(key) {
    var _a, _b, _c;
    const keyPath = key.split(".");
    const themeObject = (_a = theme2.value.search) == null ? void 0 : _a.options;
    const isObject = themeObject && typeof themeObject === "object";
    const locales = isObject && ((_c = (_b = themeObject.locales) == null ? void 0 : _b[localeIndex.value]) == null ? void 0 : _c.translations) || null;
    const translations = isObject && themeObject.translations || null;
    let localeResult = locales;
    let translationResult = translations;
    let defaultResult = defaultTranslations;
    const lastKey = keyPath.pop();
    for (const k of keyPath) {
      let fallbackResult = null;
      const foundInFallback = defaultResult == null ? void 0 : defaultResult[k];
      if (foundInFallback) {
        fallbackResult = defaultResult = foundInFallback;
      }
      const foundInTranslation = translationResult == null ? void 0 : translationResult[k];
      if (foundInTranslation) {
        fallbackResult = translationResult = foundInTranslation;
      }
      const foundInLocale = localeResult == null ? void 0 : localeResult[k];
      if (foundInLocale) {
        fallbackResult = localeResult = foundInLocale;
      }
      if (!foundInFallback) {
        defaultResult = fallbackResult;
      }
      if (!foundInTranslation) {
        translationResult = fallbackResult;
      }
      if (!foundInLocale) {
        localeResult = fallbackResult;
      }
    }
    return (localeResult == null ? void 0 : localeResult[lastKey]) ?? (translationResult == null ? void 0 : translationResult[lastKey]) ?? (defaultResult == null ? void 0 : defaultResult[lastKey]) ?? "";
  }
  return translate;
}
const _hoisted_1$i = ["aria-label"];
const _hoisted_2$b = { class: "DocSearch-Button-Container" };
const _hoisted_3$6 = { class: "DocSearch-Button-Placeholder" };
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearchButton",
  setup(__props) {
    const defaultTranslations = {
      button: {
        buttonText: "Search",
        buttonAriaLabel: "Search"
      }
    };
    const translate = createSearchTranslate(defaultTranslations);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("button", {
        type: "button",
        class: "DocSearch DocSearch-Button",
        "aria-label": unref(translate)("button.buttonAriaLabel")
      }, [
        createBaseVNode("span", _hoisted_2$b, [
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vp-icon DocSearch-Search-Icon" }, null, -1)),
          createBaseVNode("span", _hoisted_3$6, toDisplayString(unref(translate)("button.buttonText")), 1)
        ]),
        _cache[1] || (_cache[1] = createBaseVNode("span", { class: "DocSearch-Button-Keys" }, [
          createBaseVNode("kbd", { class: "DocSearch-Button-Key" }),
          createBaseVNode("kbd", { class: "DocSearch-Button-Key" }, "K")
        ], -1))
      ], 8, _hoisted_1$i);
    };
  }
});
const _hoisted_1$h = { class: "VPNavBarSearch" };
const _hoisted_2$a = { id: "local-search" };
const _hoisted_3$5 = {
  key: 1,
  id: "docsearch"
};
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSearch",
  setup(__props) {
    const VPLocalSearchBox = defineAsyncComponent(() => __vitePreload(() => import("./VPLocalSearchBox.C8ojjcK8.js"), true ? __vite__mapDeps([0,1]) : void 0));
    const VPAlgoliaSearchBox = () => null;
    const { theme: theme2 } = useData();
    const loaded = ref(false);
    const actuallyLoaded = ref(false);
    onMounted(() => {
      {
        return;
      }
    });
    function load() {
      if (!loaded.value) {
        loaded.value = true;
        setTimeout(poll, 16);
      }
    }
    function poll() {
      const e = new Event("keydown");
      e.key = "k";
      e.metaKey = true;
      window.dispatchEvent(e);
      setTimeout(() => {
        if (!document.querySelector(".DocSearch-Modal")) {
          poll();
        }
      }, 16);
    }
    function isEditingContent(event) {
      const element = event.target;
      const tagName = element.tagName;
      return element.isContentEditable || tagName === "INPUT" || tagName === "SELECT" || tagName === "TEXTAREA";
    }
    const showSearch = ref(false);
    {
      onKeyStroke("k", (event) => {
        if (event.ctrlKey || event.metaKey) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
      onKeyStroke("/", (event) => {
        if (!isEditingContent(event)) {
          event.preventDefault();
          showSearch.value = true;
        }
      });
    }
    const provider = "local";
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1$h, [
        unref(provider) === "local" ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
          showSearch.value ? (openBlock(), createBlock(unref(VPLocalSearchBox), {
            key: 0,
            onClose: _cache[0] || (_cache[0] = ($event) => showSearch.value = false)
          })) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_2$a, [
            createVNode(_sfc_main$o, {
              onClick: _cache[1] || (_cache[1] = ($event) => showSearch.value = true)
            })
          ])
        ], 64)) : unref(provider) === "algolia" ? (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          loaded.value ? (openBlock(), createBlock(unref(VPAlgoliaSearchBox), {
            key: 0,
            algolia: ((_a = unref(theme2).search) == null ? void 0 : _a.options) ?? unref(theme2).algolia,
            onVnodeBeforeMount: _cache[2] || (_cache[2] = ($event) => actuallyLoaded.value = true)
          }, null, 8, ["algolia"])) : createCommentVNode("", true),
          !actuallyLoaded.value ? (openBlock(), createElementBlock("div", _hoisted_3$5, [
            createVNode(_sfc_main$o, { onClick: load })
          ])) : createCommentVNode("", true)
        ], 64)) : createCommentVNode("", true)
      ]);
    };
  }
});
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarSocialLinks",
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return unref(theme2).socialLinks ? (openBlock(), createBlock(VPSocialLinks, {
        key: 0,
        class: "VPNavBarSocialLinks",
        links: unref(theme2).socialLinks
      }, null, 8, ["links"])) : createCommentVNode("", true);
    };
  }
});
const VPNavBarSocialLinks = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__scopeId", "data-v-0394ad82"]]);
const _hoisted_1$g = ["href", "rel", "target"];
const _hoisted_2$9 = ["innerHTML"];
const _hoisted_3$4 = { key: 2 };
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTitle",
  setup(__props) {
    const { site, theme: theme2 } = useData();
    const { hasSidebar } = useSidebar();
    const { currentLang } = useLangs();
    const link = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? theme2.value.logoLink : (_a = theme2.value.logoLink) == null ? void 0 : _a.link;
      }
    );
    const rel = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? void 0 : (_a = theme2.value.logoLink) == null ? void 0 : _a.rel;
      }
    );
    const target = computed(
      () => {
        var _a;
        return typeof theme2.value.logoLink === "string" ? void 0 : (_a = theme2.value.logoLink) == null ? void 0 : _a.target;
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPNavBarTitle", { "has-sidebar": unref(hasSidebar) }])
      }, [
        createBaseVNode("a", {
          class: "title",
          href: link.value ?? unref(normalizeLink$1)(unref(currentLang).link),
          rel: rel.value,
          target: target.value
        }, [
          renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true),
          unref(theme2).logo ? (openBlock(), createBlock(VPImage, {
            key: 0,
            class: "logo",
            image: unref(theme2).logo
          }, null, 8, ["image"])) : createCommentVNode("", true),
          unref(theme2).siteTitle ? (openBlock(), createElementBlock("span", {
            key: 1,
            innerHTML: unref(theme2).siteTitle
          }, null, 8, _hoisted_2$9)) : unref(theme2).siteTitle === void 0 ? (openBlock(), createElementBlock("span", _hoisted_3$4, toDisplayString(unref(site).title), 1)) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
        ], 8, _hoisted_1$g)
      ], 2);
    };
  }
});
const VPNavBarTitle = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__scopeId", "data-v-1168a8e4"]]);
const _hoisted_1$f = { class: "items" };
const _hoisted_2$8 = { class: "title" };
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  __name: "VPNavBarTranslations",
  setup(__props) {
    const { theme: theme2 } = useData();
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    return (_ctx, _cache) => {
      return unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createBlock(VPFlyout, {
        key: 0,
        class: "VPNavBarTranslations",
        icon: "vpi-languages",
        label: unref(theme2).langMenuLabel || "Change language"
      }, {
        default: withCtx(() => [
          createBaseVNode("div", _hoisted_1$f, [
            createBaseVNode("p", _hoisted_2$8, toDisplayString(unref(currentLang).label), 1),
            (openBlock(true), createElementBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
              return openBlock(), createBlock(VPMenuLink, {
                key: locale.link,
                item: locale
              }, null, 8, ["item"]);
            }), 128))
          ])
        ]),
        _: 1
      }, 8, ["label"])) : createCommentVNode("", true);
    };
  }
});
const VPNavBarTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-88af2de4"]]);
const _hoisted_1$e = { class: "wrapper" };
const _hoisted_2$7 = { class: "container" };
const _hoisted_3$3 = { class: "title" };
const _hoisted_4$3 = { class: "content" };
const _hoisted_5$3 = { class: "content-body" };
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "VPNavBar",
  props: {
    isScreenOpen: { type: Boolean }
  },
  emits: ["toggle-screen"],
  setup(__props) {
    const props = __props;
    const { y } = useWindowScroll();
    const { hasSidebar } = useSidebar();
    const { frontmatter } = useData();
    const classes = ref({});
    watchPostEffect(() => {
      classes.value = {
        "has-sidebar": hasSidebar.value,
        "home": frontmatter.value.layout === "home",
        "top": y.value === 0,
        "screen-open": props.isScreenOpen
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPNavBar", classes.value])
      }, [
        createBaseVNode("div", _hoisted_1$e, [
          createBaseVNode("div", _hoisted_2$7, [
            createBaseVNode("div", _hoisted_3$3, [
              createVNode(VPNavBarTitle, null, {
                "nav-bar-title-before": withCtx(() => [
                  renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
                ]),
                "nav-bar-title-after": withCtx(() => [
                  renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
                ]),
                _: 3
              })
            ]),
            createBaseVNode("div", _hoisted_4$3, [
              createBaseVNode("div", _hoisted_5$3, [
                renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true),
                createVNode(_sfc_main$n, { class: "search" }),
                createVNode(VPNavBarMenu, { class: "menu" }),
                createVNode(VPNavBarTranslations, { class: "translations" }),
                createVNode(VPNavBarAppearance, { class: "appearance" }),
                createVNode(VPNavBarSocialLinks, { class: "social-links" }),
                createVNode(VPNavBarExtra, { class: "extra" }),
                renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true),
                createVNode(VPNavBarHamburger, {
                  class: "hamburger",
                  active: __props.isScreenOpen,
                  onClick: _cache[0] || (_cache[0] = ($event) => _ctx.$emit("toggle-screen"))
                }, null, 8, ["active"])
              ])
            ])
          ])
        ]),
        _cache[1] || (_cache[1] = createBaseVNode("div", { class: "divider" }, [
          createBaseVNode("div", { class: "divider-line" })
        ], -1))
      ], 2);
    };
  }
});
const VPNavBar = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__scopeId", "data-v-6aa21345"]]);
const _hoisted_1$d = {
  key: 0,
  class: "VPNavScreenAppearance"
};
const _hoisted_2$6 = { class: "text" };
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenAppearance",
  setup(__props) {
    const { site, theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return unref(site).appearance && unref(site).appearance !== "force-dark" && unref(site).appearance !== "force-auto" ? (openBlock(), createElementBlock("div", _hoisted_1$d, [
        createBaseVNode("p", _hoisted_2$6, toDisplayString(unref(theme2).darkModeSwitchLabel || "Appearance"), 1),
        createVNode(VPSwitchAppearance)
      ])) : createCommentVNode("", true);
    };
  }
});
const VPNavScreenAppearance = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__scopeId", "data-v-b44890b2"]]);
const _hoisted_1$c = ["innerHTML"];
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuLink",
  props: {
    item: {}
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$U, {
        class: "VPNavScreenMenuLink",
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, {
        default: withCtx(() => [
          createBaseVNode("span", {
            innerHTML: __props.item.text
          }, null, 8, _hoisted_1$c)
        ]),
        _: 1
      }, 8, ["href", "target", "rel", "no-icon", "onClick"]);
    };
  }
});
const VPNavScreenMenuLink = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__scopeId", "data-v-df37e6dd"]]);
const _hoisted_1$b = ["innerHTML"];
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupLink",
  props: {
    item: {}
  },
  setup(__props) {
    const closeScreen = inject("close-screen");
    return (_ctx, _cache) => {
      return openBlock(), createBlock(_sfc_main$U, {
        class: "VPNavScreenMenuGroupLink",
        href: __props.item.link,
        target: __props.item.target,
        rel: __props.item.rel,
        "no-icon": __props.item.noIcon,
        onClick: unref(closeScreen)
      }, {
        default: withCtx(() => [
          createBaseVNode("span", {
            innerHTML: __props.item.text
          }, null, 8, _hoisted_1$b)
        ]),
        _: 1
      }, 8, ["href", "target", "rel", "no-icon", "onClick"]);
    };
  }
});
const VPNavScreenMenuGroupLink = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-3e9c20e4"]]);
const _hoisted_1$a = { class: "VPNavScreenMenuGroupSection" };
const _hoisted_2$5 = {
  key: 0,
  class: "title"
};
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroupSection",
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$a, [
        __props.text ? (openBlock(), createElementBlock("p", _hoisted_2$5, toDisplayString(__props.text), 1)) : createCommentVNode("", true),
        (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
          return openBlock(), createBlock(VPNavScreenMenuGroupLink, {
            key: item.text,
            item
          }, null, 8, ["item"]);
        }), 128))
      ]);
    };
  }
});
const VPNavScreenMenuGroupSection = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-8133b170"]]);
const _hoisted_1$9 = ["aria-controls", "aria-expanded"];
const _hoisted_2$4 = ["innerHTML"];
const _hoisted_3$2 = ["id"];
const _hoisted_4$2 = {
  key: 0,
  class: "item"
};
const _hoisted_5$2 = {
  key: 1,
  class: "item"
};
const _hoisted_6$2 = {
  key: 2,
  class: "group"
};
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenuGroup",
  props: {
    text: {},
    items: {}
  },
  setup(__props) {
    const props = __props;
    const isOpen = ref(false);
    const groupId = computed(
      () => `NavScreenGroup-${props.text.replace(" ", "-").toLowerCase()}`
    );
    function toggle() {
      isOpen.value = !isOpen.value;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["VPNavScreenMenuGroup", { open: isOpen.value }])
      }, [
        createBaseVNode("button", {
          class: "button",
          "aria-controls": groupId.value,
          "aria-expanded": isOpen.value,
          onClick: toggle
        }, [
          createBaseVNode("span", {
            class: "button-text",
            innerHTML: __props.text
          }, null, 8, _hoisted_2$4),
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vpi-plus button-icon" }, null, -1))
        ], 8, _hoisted_1$9),
        createBaseVNode("div", {
          id: groupId.value,
          class: "items"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
            return openBlock(), createElementBlock(Fragment, {
              key: JSON.stringify(item)
            }, [
              "link" in item ? (openBlock(), createElementBlock("div", _hoisted_4$2, [
                createVNode(VPNavScreenMenuGroupLink, { item }, null, 8, ["item"])
              ])) : "component" in item ? (openBlock(), createElementBlock("div", _hoisted_5$2, [
                (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({ ref_for: true }, item.props, { "screen-menu": "" }), null, 16))
              ])) : (openBlock(), createElementBlock("div", _hoisted_6$2, [
                createVNode(VPNavScreenMenuGroupSection, {
                  text: item.text,
                  items: item.items
                }, null, 8, ["text", "items"])
              ]))
            ], 64);
          }), 128))
        ], 8, _hoisted_3$2)
      ], 2);
    };
  }
});
const VPNavScreenMenuGroup = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-b9ab8c58"]]);
const _hoisted_1$8 = {
  key: 0,
  class: "VPNavScreenMenu"
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenMenu",
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return unref(theme2).nav ? (openBlock(), createElementBlock("nav", _hoisted_1$8, [
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(theme2).nav, (item) => {
          return openBlock(), createElementBlock(Fragment, {
            key: JSON.stringify(item)
          }, [
            "link" in item ? (openBlock(), createBlock(VPNavScreenMenuLink, {
              key: 0,
              item
            }, null, 8, ["item"])) : "component" in item ? (openBlock(), createBlock(resolveDynamicComponent(item.component), mergeProps({
              key: 1,
              ref_for: true
            }, item.props, { "screen-menu": "" }), null, 16)) : (openBlock(), createBlock(VPNavScreenMenuGroup, {
              key: 2,
              text: item.text || "",
              items: item.items
            }, null, 8, ["text", "items"]))
          ], 64);
        }), 128))
      ])) : createCommentVNode("", true);
    };
  }
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenSocialLinks",
  setup(__props) {
    const { theme: theme2 } = useData();
    return (_ctx, _cache) => {
      return unref(theme2).socialLinks ? (openBlock(), createBlock(VPSocialLinks, {
        key: 0,
        class: "VPNavScreenSocialLinks",
        links: unref(theme2).socialLinks
      }, null, 8, ["links"])) : createCommentVNode("", true);
    };
  }
});
const _hoisted_1$7 = { class: "list" };
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreenTranslations",
  setup(__props) {
    const { localeLinks, currentLang } = useLangs({ correspondingLink: true });
    const isOpen = ref(false);
    function toggle() {
      isOpen.value = !isOpen.value;
    }
    return (_ctx, _cache) => {
      return unref(localeLinks).length && unref(currentLang).label ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["VPNavScreenTranslations", { open: isOpen.value }])
      }, [
        createBaseVNode("button", {
          class: "title",
          onClick: toggle
        }, [
          _cache[0] || (_cache[0] = createBaseVNode("span", { class: "vpi-languages icon lang" }, null, -1)),
          createTextVNode(" " + toDisplayString(unref(currentLang).label) + " ", 1),
          _cache[1] || (_cache[1] = createBaseVNode("span", { class: "vpi-chevron-down icon chevron" }, null, -1))
        ]),
        createBaseVNode("ul", _hoisted_1$7, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(localeLinks), (locale) => {
            return openBlock(), createElementBlock("li", {
              key: locale.link,
              class: "item"
            }, [
              createVNode(_sfc_main$U, {
                class: "link",
                href: locale.link
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(locale.text), 1)
                ]),
                _: 2
              }, 1032, ["href"])
            ]);
          }), 128))
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const VPNavScreenTranslations = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-858fe1a4"]]);
const _hoisted_1$6 = { class: "container" };
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "VPNavScreen",
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const screen = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, {
        name: "fade",
        onEnter: _cache[0] || (_cache[0] = ($event) => isLocked.value = true),
        onAfterLeave: _cache[1] || (_cache[1] = ($event) => isLocked.value = false)
      }, {
        default: withCtx(() => [
          __props.open ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: "VPNavScreen",
            ref_key: "screen",
            ref: screen,
            id: "VPNavScreen"
          }, [
            createBaseVNode("div", _hoisted_1$6, [
              renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true),
              createVNode(_sfc_main$d, { class: "menu" }),
              createVNode(VPNavScreenTranslations, { class: "translations" }),
              createVNode(VPNavScreenAppearance, { class: "appearance" }),
              createVNode(_sfc_main$c, { class: "social-links" }),
              renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
            ])
          ], 512)) : createCommentVNode("", true)
        ]),
        _: 3
      });
    };
  }
});
const VPNavScreen = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-f2779853"]]);
const _hoisted_1$5 = {
  key: 0,
  class: "VPNav"
};
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "VPNav",
  setup(__props) {
    const { isScreenOpen, closeScreen, toggleScreen } = useNav();
    const { frontmatter } = useData();
    const hasNavbar = computed(() => {
      return frontmatter.value.navbar !== false;
    });
    provide("close-screen", closeScreen);
    watchEffect(() => {
      if (inBrowser) {
        document.documentElement.classList.toggle("hide-nav", !hasNavbar.value);
      }
    });
    return (_ctx, _cache) => {
      return hasNavbar.value ? (openBlock(), createElementBlock("header", _hoisted_1$5, [
        createVNode(VPNavBar, {
          "is-screen-open": unref(isScreenOpen),
          onToggleScreen: unref(toggleScreen)
        }, {
          "nav-bar-title-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
          ]),
          "nav-bar-title-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
          ]),
          "nav-bar-content-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
          ]),
          "nav-bar-content-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
          ]),
          _: 3
        }, 8, ["is-screen-open", "onToggleScreen"]),
        createVNode(VPNavScreen, { open: unref(isScreenOpen) }, {
          "nav-screen-content-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
          ]),
          "nav-screen-content-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
          ]),
          _: 3
        }, 8, ["open"])
      ])) : createCommentVNode("", true);
    };
  }
});
const VPNav = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-ae24b3ad"]]);
const _hoisted_1$4 = ["role", "tabindex"];
const _hoisted_2$3 = {
  key: 1,
  class: "items"
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarItem",
  props: {
    item: {},
    depth: {}
  },
  setup(__props) {
    const props = __props;
    const {
      collapsed,
      collapsible,
      isLink,
      isActiveLink,
      hasActiveLink: hasActiveLink2,
      hasChildren,
      toggle
    } = useSidebarControl(computed(() => props.item));
    const sectionTag = computed(() => hasChildren.value ? "section" : `div`);
    const linkTag = computed(() => isLink.value ? "a" : "div");
    const textTag = computed(() => {
      return !hasChildren.value ? "p" : props.depth + 2 === 7 ? "p" : `h${props.depth + 2}`;
    });
    const itemRole = computed(() => isLink.value ? void 0 : "button");
    const classes = computed(() => [
      [`level-${props.depth}`],
      { collapsible: collapsible.value },
      { collapsed: collapsed.value },
      { "is-link": isLink.value },
      { "is-active": isActiveLink.value },
      { "has-active": hasActiveLink2.value }
    ]);
    function onItemInteraction(e) {
      if ("key" in e && e.key !== "Enter") {
        return;
      }
      !props.item.link && toggle();
    }
    function onCaretClick() {
      props.item.link && toggle();
    }
    return (_ctx, _cache) => {
      const _component_VPSidebarItem = resolveComponent("VPSidebarItem", true);
      return openBlock(), createBlock(resolveDynamicComponent(sectionTag.value), {
        class: normalizeClass(["VPSidebarItem", classes.value])
      }, {
        default: withCtx(() => [
          __props.item.text ? (openBlock(), createElementBlock("div", mergeProps({
            key: 0,
            class: "item",
            role: itemRole.value
          }, toHandlers(
            __props.item.items ? { click: onItemInteraction, keydown: onItemInteraction } : {},
            true
          ), {
            tabindex: __props.item.items && 0
          }), [
            _cache[1] || (_cache[1] = createBaseVNode("div", { class: "indicator" }, null, -1)),
            __props.item.link ? (openBlock(), createBlock(_sfc_main$U, {
              key: 0,
              tag: linkTag.value,
              class: "link",
              href: __props.item.link,
              rel: __props.item.rel,
              target: __props.item.target
            }, {
              default: withCtx(() => [
                (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
                  class: "text",
                  innerHTML: __props.item.text
                }, null, 8, ["innerHTML"]))
              ]),
              _: 1
            }, 8, ["tag", "href", "rel", "target"])) : (openBlock(), createBlock(resolveDynamicComponent(textTag.value), {
              key: 1,
              class: "text",
              innerHTML: __props.item.text
            }, null, 8, ["innerHTML"])),
            __props.item.collapsed != null && __props.item.items && __props.item.items.length ? (openBlock(), createElementBlock("div", {
              key: 2,
              class: "caret",
              role: "button",
              "aria-label": "toggle section",
              onClick: onCaretClick,
              onKeydown: withKeys(onCaretClick, ["enter"]),
              tabindex: "0"
            }, [..._cache[0] || (_cache[0] = [
              createBaseVNode("span", { class: "vpi-chevron-right caret-icon" }, null, -1)
            ])], 32)) : createCommentVNode("", true)
          ], 16, _hoisted_1$4)) : createCommentVNode("", true),
          __props.item.items && __props.item.items.length ? (openBlock(), createElementBlock("div", _hoisted_2$3, [
            __props.depth < 5 ? (openBlock(true), createElementBlock(Fragment, { key: 0 }, renderList(__props.item.items, (i) => {
              return openBlock(), createBlock(_component_VPSidebarItem, {
                key: i.text,
                item: i,
                depth: __props.depth + 1
              }, null, 8, ["item", "depth"]);
            }), 128)) : createCommentVNode("", true)
          ])) : createCommentVNode("", true)
        ]),
        _: 1
      }, 8, ["class"]);
    };
  }
});
const VPSidebarItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-b3fd67f8"]]);
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebarGroup",
  props: {
    items: {}
  },
  setup(__props) {
    const disableTransition = ref(true);
    let timer = null;
    onMounted(() => {
      timer = setTimeout(() => {
        timer = null;
        disableTransition.value = false;
      }, 300);
    });
    onBeforeUnmount(() => {
      if (timer != null) {
        clearTimeout(timer);
        timer = null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(true), createElementBlock(Fragment, null, renderList(__props.items, (item) => {
        return openBlock(), createElementBlock("div", {
          key: item.text,
          class: normalizeClass(["group", { "no-transition": disableTransition.value }])
        }, [
          createVNode(VPSidebarItem, {
            item,
            depth: 0
          }, null, 8, ["item"])
        ], 2);
      }), 128);
    };
  }
});
const VPSidebarGroup = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-c40bc020"]]);
const _hoisted_1$3 = {
  class: "nav",
  id: "VPSidebarNav",
  "aria-labelledby": "sidebar-aria-label",
  tabindex: "-1"
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "VPSidebar",
  props: {
    open: { type: Boolean }
  },
  setup(__props) {
    const { sidebarGroups, hasSidebar } = useSidebar();
    const props = __props;
    const navEl = ref(null);
    const isLocked = useScrollLock(inBrowser ? document.body : null);
    watch(
      [props, navEl],
      () => {
        var _a;
        if (props.open) {
          isLocked.value = true;
          (_a = navEl.value) == null ? void 0 : _a.focus();
        } else isLocked.value = false;
      },
      { immediate: true, flush: "post" }
    );
    const key = ref(0);
    watch(
      sidebarGroups,
      () => {
        key.value += 1;
      },
      { deep: true }
    );
    return (_ctx, _cache) => {
      return unref(hasSidebar) ? (openBlock(), createElementBlock("aside", {
        key: 0,
        class: normalizeClass(["VPSidebar", { open: __props.open }]),
        ref_key: "navEl",
        ref: navEl,
        onClick: _cache[0] || (_cache[0] = withModifiers(() => {
        }, ["stop"]))
      }, [
        _cache[2] || (_cache[2] = createBaseVNode("div", { class: "curtain" }, null, -1)),
        createBaseVNode("nav", _hoisted_1$3, [
          _cache[1] || (_cache[1] = createBaseVNode("span", {
            class: "visually-hidden",
            id: "sidebar-aria-label"
          }, " Sidebar Navigation ", -1)),
          renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true),
          (openBlock(), createBlock(VPSidebarGroup, {
            items: unref(sidebarGroups),
            key: key.value
          }, null, 8, ["items"])),
          renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
        ])
      ], 2)) : createCommentVNode("", true);
    };
  }
});
const VPSidebar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-319d5ca6"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "VPSkipLink",
  setup(__props) {
    const { theme: theme2 } = useData();
    const route = useRoute();
    const backToTop = ref();
    watch(() => route.path, () => backToTop.value.focus());
    function focusOnTargetAnchor({ target }) {
      const el = document.getElementById(
        decodeURIComponent(target.hash).slice(1)
      );
      if (el) {
        const removeTabIndex = () => {
          el.removeAttribute("tabindex");
          el.removeEventListener("blur", removeTabIndex);
        };
        el.setAttribute("tabindex", "-1");
        el.addEventListener("blur", removeTabIndex);
        el.focus();
        window.scrollTo(0, 0);
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createBaseVNode("span", {
          ref_key: "backToTop",
          ref: backToTop,
          tabindex: "-1"
        }, null, 512),
        createBaseVNode("a", {
          href: "#VPContent",
          class: "VPSkipLink visually-hidden",
          onClick: focusOnTargetAnchor
        }, toDisplayString(unref(theme2).skipToContentLabel || "Skip to content"), 1)
      ], 64);
    };
  }
});
const VPSkipLink = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-0b0ada53"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  setup(__props) {
    const {
      isOpen: isSidebarOpen,
      open: openSidebar,
      close: closeSidebar
    } = useSidebar();
    const route = useRoute();
    watch(() => route.path, closeSidebar);
    useCloseSidebarOnEscape(isSidebarOpen, closeSidebar);
    const { frontmatter } = useData();
    const slots = useSlots();
    const heroImageSlotExists = computed(() => !!slots["home-hero-image"]);
    provide("hero-image-slot-exists", heroImageSlotExists);
    return (_ctx, _cache) => {
      const _component_Content = resolveComponent("Content");
      return unref(frontmatter).layout !== false ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["Layout", unref(frontmatter).pageClass])
      }, [
        renderSlot(_ctx.$slots, "layout-top", {}, void 0, true),
        createVNode(VPSkipLink),
        createVNode(VPBackdrop, {
          class: "backdrop",
          show: unref(isSidebarOpen),
          onClick: unref(closeSidebar)
        }, null, 8, ["show", "onClick"]),
        createVNode(VPNav, null, {
          "nav-bar-title-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-title-before", {}, void 0, true)
          ]),
          "nav-bar-title-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-title-after", {}, void 0, true)
          ]),
          "nav-bar-content-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-content-before", {}, void 0, true)
          ]),
          "nav-bar-content-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-bar-content-after", {}, void 0, true)
          ]),
          "nav-screen-content-before": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-screen-content-before", {}, void 0, true)
          ]),
          "nav-screen-content-after": withCtx(() => [
            renderSlot(_ctx.$slots, "nav-screen-content-after", {}, void 0, true)
          ]),
          _: 3
        }),
        createVNode(VPLocalNav, {
          open: unref(isSidebarOpen),
          onOpenMenu: unref(openSidebar)
        }, null, 8, ["open", "onOpenMenu"]),
        createVNode(VPSidebar, { open: unref(isSidebarOpen) }, {
          "sidebar-nav-before": withCtx(() => [
            renderSlot(_ctx.$slots, "sidebar-nav-before", {}, void 0, true)
          ]),
          "sidebar-nav-after": withCtx(() => [
            renderSlot(_ctx.$slots, "sidebar-nav-after", {}, void 0, true)
          ]),
          _: 3
        }, 8, ["open"]),
        createVNode(VPContent, null, {
          "page-top": withCtx(() => [
            renderSlot(_ctx.$slots, "page-top", {}, void 0, true)
          ]),
          "page-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "page-bottom", {}, void 0, true)
          ]),
          "not-found": withCtx(() => [
            renderSlot(_ctx.$slots, "not-found", {}, void 0, true)
          ]),
          "home-hero-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-before", {}, void 0, true)
          ]),
          "home-hero-info-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-before", {}, void 0, true)
          ]),
          "home-hero-info": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info", {}, void 0, true)
          ]),
          "home-hero-info-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-info-after", {}, void 0, true)
          ]),
          "home-hero-actions-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-actions-after", {}, void 0, true)
          ]),
          "home-hero-image": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-image", {}, void 0, true)
          ]),
          "home-hero-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-hero-after", {}, void 0, true)
          ]),
          "home-features-before": withCtx(() => [
            renderSlot(_ctx.$slots, "home-features-before", {}, void 0, true)
          ]),
          "home-features-after": withCtx(() => [
            renderSlot(_ctx.$slots, "home-features-after", {}, void 0, true)
          ]),
          "doc-footer-before": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-footer-before", {}, void 0, true)
          ]),
          "doc-before": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-before", {}, void 0, true)
          ]),
          "doc-after": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-after", {}, void 0, true)
          ]),
          "doc-top": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-top", {}, void 0, true)
          ]),
          "doc-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "doc-bottom", {}, void 0, true)
          ]),
          "aside-top": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-top", {}, void 0, true)
          ]),
          "aside-bottom": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-bottom", {}, void 0, true)
          ]),
          "aside-outline-before": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-outline-before", {}, void 0, true)
          ]),
          "aside-outline-after": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-outline-after", {}, void 0, true)
          ]),
          "aside-ads-before": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-ads-before", {}, void 0, true)
          ]),
          "aside-ads-after": withCtx(() => [
            renderSlot(_ctx.$slots, "aside-ads-after", {}, void 0, true)
          ]),
          _: 3
        }),
        createVNode(VPFooter),
        renderSlot(_ctx.$slots, "layout-bottom", {}, void 0, true)
      ], 2)) : (openBlock(), createBlock(_component_Content, { key: 1 }));
    };
  }
});
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-5d98c3a5"]]);
const theme = {
  Layout,
  enhanceApp: ({ app }) => {
    app.component("Badge", _sfc_main$$);
  }
};
const _hoisted_1$2 = {
  class: "page-redirect",
  style: { "text-align": "center", "padding": "100px 20px" }
};
const _hoisted_2$2 = ["href"];
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "PageRedirect",
  setup(__props) {
    const { frontmatter } = useData$1();
    const redirectTarget = computed(() => {
      const rawTarget = String(frontmatter.value.redirectTo || "").trim();
      if (!rawTarget) {
        return withBase("/docs/");
      }
      return rawTarget.startsWith("/") ? withBase(rawTarget) : withBase(`/${rawTarget}`);
    });
    const normalizedRedirectTarget = computed(() => redirectTarget.value);
    function isSameTarget(current, target) {
      return current === target || decodeURI(current) === decodeURI(target);
    }
    function replaceWithTarget(target) {
      window.location.replace(target);
    }
    onMounted(() => {
      if (!inBrowser) {
        return;
      }
      const encodedTarget = normalizedRedirectTarget.value;
      const current = window.location.pathname + window.location.search + window.location.hash;
      if (isSameTarget(current, encodedTarget)) {
        return;
      }
      replaceWithTarget(encodedTarget);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[0] || (_cache[0] = createBaseVNode("p", null, "Redirecting to content page...", -1)),
        createBaseVNode("p", null, [
          createBaseVNode("a", {
            href: normalizedRedirectTarget.value,
            target: "_self"
          }, "If you are not redirected automatically, click here", 8, _hoisted_2$2)
        ])
      ]);
    };
  }
});
const _hoisted_1$1 = {
  class: "vp-image-viewer__btn vp-image-viewer__actions",
  role: "toolbar",
  "aria-label": "Image actions"
};
const _hoisted_2$1 = { class: "vp-image-viewer__actions-inner" };
const _hoisted_3$1 = ["disabled"];
const _hoisted_4$1 = ["disabled"];
const _hoisted_5$1 = ["disabled"];
const _hoisted_6$1 = {
  key: 0,
  viewBox: "0 0 1024 1024",
  "aria-hidden": "true"
};
const _hoisted_7$1 = {
  key: 1,
  viewBox: "0 0 1024 1024",
  "aria-hidden": "true"
};
const _hoisted_8$1 = ["disabled"];
const _hoisted_9$1 = ["disabled"];
const _hoisted_10$1 = { class: "vp-image-viewer__canvas" };
const _hoisted_11 = ["src", "alt"];
const zoomRate = 1.2;
const minScale = 0.2;
const maxScale = 7;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "ImageViewer",
  props: {
    src: {},
    alt: {}
  },
  emits: ["close"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const wrapper = ref(null);
    const image = ref(null);
    const visible = ref(false);
    const loading = ref(true);
    const containMode = ref(true);
    const scale = ref(1);
    const rotation = ref(0);
    const offsetX = ref(0);
    const offsetY = ref(0);
    const transitionEnabled = ref(false);
    let previousBodyOverflow = "";
    let closeTimer = null;
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragOriginX = 0;
    let dragOriginY = 0;
    const imageStyle = computed(() => {
      let translateX = offsetX.value / scale.value;
      let translateY = offsetY.value / scale.value;
      const radian = rotation.value * Math.PI / 180;
      const cosRadian = Math.cos(radian);
      const sinRadian = Math.sin(radian);
      const originalTranslateX = translateX;
      translateX = translateX * cosRadian + translateY * sinRadian;
      translateY = translateY * cosRadian - originalTranslateX * sinRadian;
      return {
        maxWidth: containMode.value ? "100%" : void 0,
        maxHeight: containMode.value ? "100%" : void 0,
        transform: `scale(${scale.value}) rotate(${rotation.value}deg) translate(${translateX}px, ${translateY}px)`,
        transition: transitionEnabled.value ? "transform .3s" : ""
      };
    });
    function resetTransform() {
      scale.value = 1;
      rotation.value = 0;
      offsetX.value = 0;
      offsetY.value = 0;
      transitionEnabled.value = false;
    }
    function zoom(direction, animated = true) {
      if (loading.value) {
        return;
      }
      const nextScale = direction === "in" ? scale.value * zoomRate : scale.value / zoomRate;
      scale.value = Number.parseFloat(Math.min(maxScale, Math.max(minScale, nextScale)).toFixed(3));
      transitionEnabled.value = animated;
    }
    function rotate(degrees) {
      if (loading.value) {
        return;
      }
      rotation.value += degrees;
      transitionEnabled.value = true;
    }
    function toggleMode() {
      if (loading.value) {
        return;
      }
      containMode.value = !containMode.value;
      resetTransform();
    }
    function requestClose() {
      if (!visible.value || closeTimer !== null) {
        return;
      }
      visible.value = false;
      closeTimer = window.setTimeout(() => {
        closeTimer = null;
        emit("close");
      }, 300);
    }
    function handleKeydown(event) {
      switch (event.code) {
        case "Escape":
          requestClose();
          break;
        case "Space":
          event.preventDefault();
          toggleMode();
          break;
        case "ArrowUp":
          event.preventDefault();
          zoom("in");
          break;
        case "ArrowDown":
          event.preventDefault();
          zoom("out");
          break;
      }
    }
    function handleWheel(event) {
      event.preventDefault();
      zoom(event.deltaY < 0 ? "in" : "out", false);
    }
    function handlePointerDown(event) {
      if (loading.value || event.button !== 0 || !image.value) {
        return;
      }
      activePointerId = event.pointerId;
      dragStartX = event.pageX;
      dragStartY = event.pageY;
      dragOriginX = offsetX.value;
      dragOriginY = offsetY.value;
      transitionEnabled.value = false;
      image.value.setPointerCapture(event.pointerId);
      event.preventDefault();
    }
    function handlePointerMove(event) {
      if (event.pointerId !== activePointerId) {
        return;
      }
      offsetX.value = dragOriginX + event.pageX - dragStartX;
      offsetY.value = dragOriginY + event.pageY - dragStartY;
    }
    function handlePointerUp(event) {
      var _a;
      if (event.pointerId !== activePointerId) {
        return;
      }
      if ((_a = image.value) == null ? void 0 : _a.hasPointerCapture(event.pointerId)) {
        image.value.releasePointerCapture(event.pointerId);
      }
      activePointerId = null;
    }
    function handleImageLoad() {
      loading.value = false;
    }
    function handleImageError() {
      loading.value = false;
    }
    onMounted(() => {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeydown);
      nextTick(() => {
        var _a;
        visible.value = true;
        (_a = wrapper.value) == null ? void 0 : _a.focus({ preventScroll: true });
      });
    });
    onBeforeUnmount(() => {
      if (closeTimer !== null) {
        window.clearTimeout(closeTimer);
      }
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousBodyOverflow;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Teleport, { to: "body" }, [
        createVNode(Transition, {
          name: "viewer-fade",
          appear: ""
        }, {
          default: withCtx(() => [
            visible.value ? (openBlock(), createElementBlock("div", {
              key: 0,
              ref_key: "wrapper",
              ref: wrapper,
              class: "vp-image-viewer__wrapper",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": "Image preview",
              tabindex: "-1",
              onWheel: handleWheel
            }, [
              _cache[13] || (_cache[13] = createBaseVNode("div", {
                class: "vp-image-viewer__mask",
                "aria-hidden": "true"
              }, null, -1)),
              createBaseVNode("button", {
                type: "button",
                class: "vp-image-viewer__btn vp-image-viewer__close",
                "aria-label": "Close image preview",
                title: "Close (Esc)",
                onClick: requestClose
              }, [..._cache[4] || (_cache[4] = [
                createBaseVNode("svg", {
                  viewBox: "0 0 1024 1024",
                  "aria-hidden": "true"
                }, [
                  createBaseVNode("path", {
                    fill: "currentColor",
                    d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                  })
                ], -1)
              ])]),
              createBaseVNode("div", _hoisted_1$1, [
                createBaseVNode("div", _hoisted_2$1, [
                  createBaseVNode("button", {
                    type: "button",
                    "aria-label": "Zoom out",
                    title: "Zoom out (scroll down)",
                    disabled: loading.value,
                    onClick: _cache[0] || (_cache[0] = ($event) => zoom("out"))
                  }, [..._cache[5] || (_cache[5] = [
                    createBaseVNode("svg", {
                      viewBox: "0 0 1024 1024",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704M352 448h256a32 32 0 0 1 0 64H352a32 32 0 0 1 0-64"
                      })
                    ], -1)
                  ])], 8, _hoisted_3$1),
                  createBaseVNode("button", {
                    type: "button",
                    "aria-label": "Zoom in",
                    title: "Zoom in (scroll up)",
                    disabled: loading.value,
                    onClick: _cache[1] || (_cache[1] = ($event) => zoom("in"))
                  }, [..._cache[6] || (_cache[6] = [
                    createBaseVNode("svg", {
                      viewBox: "0 0 1024 1024",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704m-32-384v-96a32 32 0 0 1 64 0v96h96a32 32 0 0 1 0 64h-96v96a32 32 0 0 1-64 0v-96h-96a32 32 0 0 1 0-64z"
                      })
                    ], -1)
                  ])], 8, _hoisted_4$1),
                  _cache[11] || (_cache[11] = createBaseVNode("i", {
                    class: "vp-image-viewer__actions-divider",
                    "aria-hidden": "true"
                  }, null, -1)),
                  createBaseVNode("button", {
                    type: "button",
                    "aria-label": "Toggle fit / original size",
                    title: "Fit / Original (space)",
                    disabled: loading.value,
                    onClick: toggleMode
                  }, [
                    containMode.value ? (openBlock(), createElementBlock("svg", _hoisted_6$1, [..._cache[7] || (_cache[7] = [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "m160 96.064 192 .192a32 32 0 0 1 0 64l-192-.192V352a32 32 0 0 1-64 0V96h64zm0 831.872V928H96V672a32 32 0 1 1 64 0v191.936l192-.192a32 32 0 1 1 0 64zM864 96.064V96h64v256a32 32 0 1 1-64 0V160.064l-192 .192a32 32 0 1 1 0-64l192-.192zm0 831.872-192-.192a32 32 0 0 1 0-64l192 .192V672a32 32 0 1 1 64 0v256h-64z"
                      }, null, -1)
                    ])])) : (openBlock(), createElementBlock("svg", _hoisted_7$1, [..._cache[8] || (_cache[8] = [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "M813.176 180.706a60.235 60.235 0 0 1 60.236 60.235v481.883a60.235 60.235 0 0 1-60.236 60.235H210.824a60.235 60.235 0 0 1-60.236-60.235V240.94a60.235 60.235 0 0 1 60.236-60.235h602.352zm0-60.235H210.824A120.47 120.47 0 0 0 90.353 240.94v481.883a120.47 120.47 0 0 0 120.47 120.47h602.353a120.47 120.47 0 0 0 120.471-120.47V240.94a120.47 120.47 0 0 0-120.47-120.47zm-120.47 180.705a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 0 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118zm-361.412 0a30.118 30.118 0 0 0-30.118 30.118v301.177a30.118 30.118 0 1 0 60.236 0V331.294a30.118 30.118 0 0 0-30.118-30.118M512 361.412a30.118 30.118 0 0 0-30.118 30.117v30.118a30.118 30.118 0 0 0 60.236 0V391.53A30.118 30.118 0 0 0 512 361.412M512 512a30.118 30.118 0 0 0-30.118 30.118v30.117a30.118 30.118 0 0 0 60.236 0v-30.117A30.118 30.118 0 0 0 512 512"
                      }, null, -1)
                    ])]))
                  ], 8, _hoisted_5$1),
                  _cache[12] || (_cache[12] = createBaseVNode("i", {
                    class: "vp-image-viewer__actions-divider",
                    "aria-hidden": "true"
                  }, null, -1)),
                  createBaseVNode("button", {
                    type: "button",
                    "aria-label": "Rotate left",
                    title: "Rotate left",
                    disabled: loading.value,
                    onClick: _cache[2] || (_cache[2] = ($event) => rotate(-90))
                  }, [..._cache[9] || (_cache[9] = [
                    createBaseVNode("svg", {
                      viewBox: "0 0 1024 1024",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "M289.088 296.704h92.992a32 32 0 0 1 0 64H232.96a32 32 0 0 1-32-32V179.712a32 32 0 0 1 64 0v50.56a384 384 0 0 1 643.84 282.88 384 384 0 0 1-383.936 384 384 384 0 0 1-384-384h64a320 320 0 1 0 640 0 320 320 0 0 0-555.712-216.448z"
                      })
                    ], -1)
                  ])], 8, _hoisted_8$1),
                  createBaseVNode("button", {
                    type: "button",
                    "aria-label": "Rotate right",
                    title: "Rotate right",
                    disabled: loading.value,
                    onClick: _cache[3] || (_cache[3] = ($event) => rotate(90))
                  }, [..._cache[10] || (_cache[10] = [
                    createBaseVNode("svg", {
                      viewBox: "0 0 1024 1024",
                      "aria-hidden": "true"
                    }, [
                      createBaseVNode("path", {
                        fill: "currentColor",
                        d: "M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
                      })
                    ], -1)
                  ])], 8, _hoisted_9$1)
                ])
              ]),
              createBaseVNode("div", _hoisted_10$1, [
                createBaseVNode("img", {
                  ref_key: "image",
                  ref: image,
                  class: "vp-image-viewer__img image-viewer__img",
                  src: props.src,
                  alt: props.alt || "",
                  style: normalizeStyle(imageStyle.value),
                  draggable: "false",
                  onLoad: handleImageLoad,
                  onError: handleImageError,
                  onPointerdown: handlePointerDown,
                  onPointermove: handlePointerMove,
                  onPointerup: handlePointerUp,
                  onPointercancel: handlePointerUp
                }, null, 44, _hoisted_11)
              ])
            ], 544)) : createCommentVNode("", true)
          ]),
          _: 1
        })
      ]);
    };
  }
});
const _hoisted_1 = {
  key: 0,
  class: "feedback-widget__panel",
  "aria-label": "Submit a question"
};
const _hoisted_2 = { class: "feedback-widget__upload" };
const _hoisted_3 = { class: "feedback-widget__upload-button" };
const _hoisted_4 = { class: "feedback-widget__upload-meta" };
const _hoisted_5 = {
  key: 0,
  class: "feedback-widget__file-list",
  "aria-label": "Selected images"
};
const _hoisted_6 = { class: "feedback-widget__file-name" };
const _hoisted_7 = { class: "feedback-widget__file-size" };
const _hoisted_8 = ["aria-label", "onClick"];
const _hoisted_9 = ["disabled"];
const _hoisted_10 = ["aria-expanded"];
const maxImageCount = 3;
const maxImageSize = 5 * 1024 * 1024;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "FeedbackWidget",
  setup(__props) {
    const feedbackApiUrl = "https://www.hiwonder.net/english-course-feedback";
    const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];
    const isOpen = ref(false);
    const status = ref("idle");
    const statusMessage = ref("");
    const imageInput = ref(null);
    const images = ref([]);
    const form = reactive({
      name: "",
      email: "",
      message: "",
      website: ""
    });
    const canSubmit = computed(() => {
      return form.name.trim() && form.email.trim() && form.message.trim() && status.value !== "submitting";
    });
    function resetForm() {
      form.name = "";
      form.email = "";
      form.message = "";
      form.website = "";
      images.value = [];
      if (imageInput.value) {
        imageInput.value.value = "";
      }
    }
    function togglePanel() {
      isOpen.value = !isOpen.value;
      if (isOpen.value && status.value !== "submitting") {
        status.value = "idle";
        statusMessage.value = "";
      }
    }
    function onImageChange(event) {
      const input = event.target;
      const selectedFiles = Array.from(input.files || []);
      if (!selectedFiles.length) {
        return;
      }
      const nextImages = [...images.value];
      for (const file of selectedFiles) {
        if (nextImages.length >= maxImageCount) {
          status.value = "error";
          statusMessage.value = `You can upload up to ${maxImageCount} images.`;
          break;
        }
        if (!allowedImageTypes.includes(file.type)) {
          status.value = "error";
          statusMessage.value = "Please upload JPG, PNG, or WEBP images only.";
          continue;
        }
        if (file.size > maxImageSize) {
          status.value = "error";
          statusMessage.value = "Each image must be 5MB or smaller.";
          continue;
        }
        nextImages.push(file);
      }
      images.value = nextImages;
      input.value = "";
    }
    function removeImage(index) {
      images.value = images.value.filter((_, fileIndex) => fileIndex !== index);
      if (status.value !== "submitting") {
        status.value = "idle";
        statusMessage.value = "";
      }
    }
    function formatFileSize(size) {
      return size >= 1024 * 1024 ? `${(size / 1024 / 1024).toFixed(1)}MB` : `${Math.ceil(size / 1024)}KB`;
    }
    function getDocsVersion() {
      var _a;
      if (typeof window === "undefined") {
        return "";
      }
      return ((_a = window.location.pathname.match(/\/projects\/JetHexa\/en\/([^/]+)/)) == null ? void 0 : _a[1]) || "";
    }
    async function submitFeedback() {
      if (!canSubmit.value) {
        status.value = "error";
        statusMessage.value = "Please complete all fields.";
        return;
      }
      status.value = "submitting";
      statusMessage.value = "";
      try {
        const payload = new FormData();
        payload.append("name", form.name.trim());
        payload.append("email", form.email.trim());
        payload.append("message", form.message.trim());
        payload.append("website", form.website);
        payload.append("source", "JetHexa docs");
        payload.append("pageTitle", document.title);
        payload.append("pageUrl", window.location.href);
        payload.append("version", getDocsVersion());
        images.value.forEach((file) => {
          payload.append("images[]", file);
        });
        const response = await fetch(feedbackApiUrl, {
          method: "POST",
          body: payload
        });
        const result = await response.json().catch(() => null);
        if (!response.ok || !result || ![1, 200].includes(Number(result.code))) {
          throw new Error((result == null ? void 0 : result.msg) || "Submit failed. Please try again later.");
        }
        status.value = "success";
        statusMessage.value = "Thanks for reaching out. We've received your question and will get back to you as soon as possible.";
        resetForm();
      } catch (error) {
        status.value = "error";
        statusMessage.value = error instanceof Error ? error.message : "Submit failed. Please try again later.";
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["feedback-widget", { "is-open": isOpen.value }])
      }, [
        isOpen.value ? (openBlock(), createElementBlock("section", _hoisted_1, [
          createBaseVNode("div", { class: "feedback-widget__header" }, [
            _cache[4] || (_cache[4] = createBaseVNode("h2", { class: "feedback-widget__title" }, "Ask a Question", -1)),
            createBaseVNode("button", {
              class: "feedback-widget__close",
              type: "button",
              "aria-label": "Close feedback form",
              onClick: togglePanel
            }, " x ")
          ]),
          createBaseVNode("form", {
            class: "feedback-widget__form",
            onSubmit: withModifiers(submitFeedback, ["prevent"])
          }, [
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.name = $event),
              class: "feedback-widget__input",
              type: "text",
              name: "name",
              placeholder: "Your Name",
              autocomplete: "name",
              maxlength: "100",
              required: ""
            }, null, 512), [
              [vModelText, form.name]
            ]),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.email = $event),
              class: "feedback-widget__input",
              type: "email",
              name: "email",
              placeholder: "Your Email",
              autocomplete: "email",
              maxlength: "160",
              required: ""
            }, null, 512), [
              [vModelText, form.email]
            ]),
            withDirectives(createBaseVNode("textarea", {
              "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.message = $event),
              class: "feedback-widget__textarea",
              name: "message",
              placeholder: "Your Question",
              maxlength: "2000",
              required: ""
            }, null, 512), [
              [vModelText, form.message]
            ]),
            createBaseVNode("div", _hoisted_2, [
              createBaseVNode("label", _hoisted_3, [
                createBaseVNode("input", {
                  ref_key: "imageInput",
                  ref: imageInput,
                  class: "feedback-widget__file-input",
                  type: "file",
                  name: "images",
                  accept: "image/jpeg,image/png,image/webp",
                  multiple: "",
                  onChange: onImageChange
                }, null, 544),
                _cache[5] || (_cache[5] = createBaseVNode("span", null, "Attach Images", -1))
              ]),
              createBaseVNode("span", _hoisted_4, toDisplayString(images.value.length) + "/" + toDisplayString(maxImageCount), 1)
            ]),
            images.value.length ? (openBlock(), createElementBlock("ul", _hoisted_5, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(images.value, (image, index) => {
                return openBlock(), createElementBlock("li", {
                  key: `${image.name}-${image.size}-${index}`,
                  class: "feedback-widget__file-item"
                }, [
                  createBaseVNode("span", _hoisted_6, toDisplayString(image.name), 1),
                  createBaseVNode("span", _hoisted_7, toDisplayString(formatFileSize(image.size)), 1),
                  createBaseVNode("button", {
                    class: "feedback-widget__file-remove",
                    type: "button",
                    "aria-label": `Remove ${image.name}`,
                    onClick: ($event) => removeImage(index)
                  }, " x ", 8, _hoisted_8)
                ]);
              }), 128))
            ])) : createCommentVNode("", true),
            withDirectives(createBaseVNode("input", {
              "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.website = $event),
              class: "feedback-widget__honeypot",
              type: "text",
              name: "website",
              tabindex: "-1",
              autocomplete: "off"
            }, null, 512), [
              [vModelText, form.website]
            ]),
            statusMessage.value ? (openBlock(), createElementBlock("p", {
              key: 1,
              class: normalizeClass(["feedback-widget__message", `is-${status.value}`]),
              role: "status"
            }, toDisplayString(statusMessage.value), 3)) : createCommentVNode("", true),
            createBaseVNode("button", {
              class: "feedback-widget__submit",
              type: "submit",
              disabled: !canSubmit.value
            }, toDisplayString(status.value === "submitting" ? "Submitting..." : "Submit"), 9, _hoisted_9)
          ], 32)
        ])) : createCommentVNode("", true),
        createBaseVNode("button", {
          class: "feedback-widget__trigger",
          type: "button",
          "aria-expanded": isOpen.value,
          "aria-label": "Open feedback form",
          onClick: togglePanel
        }, [..._cache[6] || (_cache[6] = [
          createBaseVNode("span", {
            class: "feedback-widget__icon",
            "aria-hidden": "true"
          }, [
            createBaseVNode("svg", {
              viewBox: "0 0 24 24",
              focusable: "false"
            }, [
              createBaseVNode("path", { d: "M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7A8.4 8.4 0 0 1 4 11.5 8.5 8.5 0 0 1 12.5 3 8.5 8.5 0 0 1 21 11.5Z" })
            ])
          ], -1),
          createBaseVNode("span", null, "Chat", -1)
        ])], 8, _hoisted_10)
      ], 2);
    };
  }
});
const logoTargetUrl = "https://www.hiwonder.net/";
const lazyImagePlaceholder = "data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%229%22 viewBox=%220 0 16 9%22%3E%3C/svg%3E";
const lazyImageRootMargin = "160px 0px 420px";
const lazyImagePreloadMinAhead = 320;
const lazyImagePreloadMaxAhead = 900;
const lazyImageHighPriorityDistance = 220;
const lazyImageAutoPriorityDistance = 520;
const lazyImagePreloadScanInterval = 160;
const imageEnhanceBatchSize = 32;
const imageEnhanceBatchDelay = 16;
const levelOneStorageKey = "hiwonder-doc-module-level-one";
const levelTwoStorageKey = "hiwonder-doc-module-level-two";
const standaloneLevelTwoStorageKey = "hiwonder-doc-module-level-two-standalone";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Layout",
  setup(__props) {
    const { frontmatter } = useData$1();
    const route = useRoute();
    const ALL_VERSIONS = ["24JetsonNano", "JetsonOrinNX", "JetsonNano", "RaspberryPi", "JetsonOrinNano"];
    const VERSION_LABELS = {
      "24JetsonNano": "24-Jetson Nano",
      JetsonOrinNX: "Jetson Orin NX",
      JetsonNano: "Jetson Nano",
      RaspberryPi: "Raspberry Pi",
      JetsonOrinNano: "Jetson Orin Nano"
    };
    function detectCurrentVersion() {
      if (!inBrowser) return ALL_VERSIONS[0];
      for (const version of ALL_VERSIONS) {
        if (location.pathname.includes(`/en/${version}/`)) return version;
      }
      return ALL_VERSIONS[0];
    }
    function injectVersionSwitcher() {
      if (!inBrowser) return;
      const navList = document.querySelector(".VPNavBarMenu");
      if (!navList || navList.querySelector(".version-switcher")) return;
      const current = detectCurrentVersion();
      const switcher = document.createElement("div");
      switcher.className = "version-switcher";
      const itemsHtml = ALL_VERSIONS.map(
        (version) => `<li class="version-switcher__item ${current === version ? "is-selected" : ""}" data-version="${version}" role="menuitem">${VERSION_LABELS[version]}</li>`
      ).join("");
      switcher.innerHTML = `
    <span class="version-switcher__label">Version</span>
    <button type="button" class="version-switcher__trigger" aria-haspopup="menu" aria-expanded="false">
      <span class="version-switcher__name">${VERSION_LABELS[current]}</span>
    </button>
    <ul class="version-switcher__menu" role="menu" hidden>
      ${itemsHtml}
    </ul>
  `;
      const trigger = switcher.querySelector(".version-switcher__trigger");
      const menu = switcher.querySelector(".version-switcher__menu");
      const closeMenu = () => {
        menu.hidden = true;
        trigger.setAttribute("aria-expanded", "false");
      };
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        menu.hidden = !menu.hidden;
        trigger.setAttribute("aria-expanded", String(!menu.hidden));
      });
      document.addEventListener("click", (event) => {
        if (!switcher.contains(event.target)) closeMenu();
      });
      switcher.querySelectorAll(".version-switcher__item").forEach((item) => {
        item.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          const targetVersion = item.dataset.version;
          if (targetVersion !== current) {
            const versionRootPattern = new RegExp(`/en/${current}(?:/.*)?$`);
            const targetPath = location.pathname.replace(versionRootPattern, `/en/${targetVersion}/`);
            window.location.replace(targetPath);
          }
          closeMenu();
        });
      });
      navList.insertBefore(switcher, navList.firstChild);
    }
    function decodePath(path) {
      try {
        return decodeURI(path);
      } catch {
        return path;
      }
    }
    function getPathWithoutBase(path) {
      const candidates = [withBase("/"), decodePath(withBase("/"))];
      const decodedPath = decodePath(path);
      for (const base of candidates) {
        if (path === base || decodedPath === base) {
          return "/";
        }
        if (path.startsWith(base)) {
          return `/${path.slice(base.length)}`;
        }
        if (decodedPath.startsWith(base)) {
          return `/${decodedPath.slice(base.length)}`;
        }
      }
      return decodedPath;
    }
    const isRedirectEntryRoute = computed(() => {
      const currentPath = inBrowser ? window.location.pathname : route.path;
      const pathWithoutBase = getPathWithoutBase(currentPath);
      return pathWithoutBase === "/" || pathWithoutBase === "/index.html" || pathWithoutBase === "/docs/" || pathWithoutBase === "/docs/index.html";
    });
    const isRedirectPage = computed(() => frontmatter.value.layout === "page-redirect" && isRedirectEntryRoute.value);
    let imageObserver = null;
    let lazyImageObserver = null;
    let scheduledEnhanceTask = null;
    let scheduledPreloadTask = null;
    let scheduledEnhanceBatchTask = null;
    let activeLazyImageLoads = 0;
    let lazyImageQueue = [];
    let activeLazyImages = /* @__PURE__ */ new Set();
    let lastScrollY = 0;
    let lastScrollAt = 0;
    let scrollPixelsPerMs = 0;
    let lastPreloadScanAt = 0;
    let lazyImageRuntimeId = 0;
    const lightboxSrc = ref("");
    const lightboxAlt = ref("");
    let lightboxTrigger = null;
    let logoLinkPatched = false;
    function patchLogoLink() {
      if (!inBrowser || logoLinkPatched) return;
      const logoImg = document.querySelector("img.VPImage.logo");
      const link = logoImg == null ? void 0 : logoImg.closest("a");
      if (!link) return;
      logoLinkPatched = true;
      link.setAttribute("href", logoTargetUrl);
      link.setAttribute("target", "_self");
      link.addEventListener(
        "click",
        (e) => {
          e.preventDefault();
          window.location.href = logoTargetUrl;
        },
        { once: false }
      );
    }
    function getDocRoot() {
      return document.querySelector(".vp-doc");
    }
    function getModuleOptions(blocks, level) {
      const options = /* @__PURE__ */ new Map();
      for (const block of blocks) {
        const id = level === 1 ? block.dataset.docLevelOneId : block.dataset.docLevelTwoId;
        const label = level === 1 ? block.dataset.docLevelOneLabel : block.dataset.docLevelTwoLabel;
        if (id && !options.has(id)) {
          options.set(id, {
            id,
            label: label || id
          });
        }
      }
      return Array.from(options.values());
    }
    function getSavedOptionId(storageKey, options) {
      var _a, _b;
      if (!inBrowser) {
        return ((_a = options[0]) == null ? void 0 : _a.id) || "";
      }
      const saved = window.localStorage.getItem(storageKey);
      const selectedId = options.some((option) => option.id === saved) ? saved || "" : ((_b = options[0]) == null ? void 0 : _b.id) || "";
      if (selectedId) {
        window.localStorage.setItem(storageKey, selectedId);
      }
      return selectedId;
    }
    function getNestedLevelTwoBlocksForSelection(docRoot, selectedLevelOneId) {
      return Array.from(docRoot.querySelectorAll(".doc-level-two-block")).filter((block) => {
        const parentLevelOne = block.closest(".doc-level-one-block");
        return (parentLevelOne == null ? void 0 : parentLevelOne.dataset.docLevelOneId) === selectedLevelOneId;
      });
    }
    function getStandaloneLevelTwoBlocks(docRoot) {
      return Array.from(docRoot.querySelectorAll(".doc-level-two-block")).filter(
        (block) => !block.closest(".doc-level-one-block")
      );
    }
    function createSwitcherRow(labelText, level, options, selectedId, storageKey) {
      const row = document.createElement("div");
      row.className = "doc-variant-switcher__row";
      if (labelText) {
        row.setAttribute("role", "group");
        row.setAttribute("aria-label", labelText);
        const label = document.createElement("span");
        label.className = "doc-variant-switcher__label";
        label.textContent = labelText;
        row.appendChild(label);
      }
      for (const option of options) {
        const button = document.createElement("button");
        const isSelected = option.id === selectedId;
        button.className = "doc-variant-switcher__button";
        button.type = "button";
        button.dataset.docModuleLevel = String(level);
        button.dataset.docModuleOption = option.id;
        button.dataset.docModuleStorageKey = storageKey;
        button.classList.toggle("is-selected", isSelected);
        button.setAttribute("aria-pressed", String(isSelected));
        const name = document.createElement("span");
        name.className = "doc-variant-switcher__button-name";
        name.textContent = option.label;
        button.appendChild(name);
        row.appendChild(button);
      }
      return row;
    }
    function bindModuleSwitcherEvents(switcher) {
      switcher.querySelectorAll("[data-doc-module-option]").forEach((button) => {
        button.onclick = () => {
          const nextOptionId = button.dataset.docModuleOption || "";
          const storageKey = button.dataset.docModuleStorageKey || levelOneStorageKey;
          window.localStorage.setItem(storageKey, nextOptionId);
          applyModuleFilter();
        };
      });
    }
    function ensureModuleSwitcher(docRoot, levelOneBlocks, levelOneOptions, selectedLevelOneId, levelTwoOptions, selectedLevelTwoId) {
      var _a;
      const hasOptions = levelOneOptions.length > 0 || levelTwoOptions.length > 0;
      let switcher = docRoot.querySelector(".doc-variant-switcher--nested");
      if (!hasOptions) {
        switcher == null ? void 0 : switcher.remove();
        return;
      }
      if (!switcher) {
        switcher = document.createElement("div");
        switcher.className = "doc-variant-switcher doc-variant-switcher--nested";
        switcher.setAttribute("role", "group");
        switcher.setAttribute("aria-label", "Select document version");
        const firstBlock = levelOneBlocks[0];
        (_a = firstBlock.parentElement) == null ? void 0 : _a.insertBefore(switcher, firstBlock);
      }
      const rows = [];
      if (levelOneOptions.length > 0) {
        rows.push(createSwitcherRow("Current version", 1, levelOneOptions, selectedLevelOneId, levelOneStorageKey));
      }
      if (levelTwoOptions.length > 0) {
        rows.push(createSwitcherRow("", 2, levelTwoOptions, selectedLevelTwoId, levelTwoStorageKey));
      }
      switcher.replaceChildren(...rows);
      bindModuleSwitcherEvents(switcher);
    }
    function ensureStandaloneModuleSwitcher(docRoot, standaloneLevelTwoBlocks, standaloneLevelTwoOptions, selectedStandaloneLevelTwoId) {
      var _a;
      let switcher = docRoot.querySelector(".doc-variant-switcher--standalone");
      if (standaloneLevelTwoOptions.length === 0) {
        switcher == null ? void 0 : switcher.remove();
        return;
      }
      if (!switcher) {
        switcher = document.createElement("div");
        switcher.className = "doc-variant-switcher doc-variant-switcher--standalone";
        switcher.setAttribute("role", "group");
        switcher.setAttribute("aria-label", "Select document content");
        const firstBlock = standaloneLevelTwoBlocks[0];
        (_a = firstBlock.parentElement) == null ? void 0 : _a.insertBefore(switcher, firstBlock);
      }
      switcher.replaceChildren(
        createSwitcherRow(
          "",
          2,
          standaloneLevelTwoOptions,
          selectedStandaloneLevelTwoId,
          standaloneLevelTwoStorageKey
        )
      );
      bindModuleSwitcherEvents(switcher);
    }
    function applyModuleFilter() {
      if (!inBrowser) {
        return;
      }
      const docRoot = getDocRoot();
      if (!docRoot) {
        return;
      }
      const levelOneBlocks = Array.from(docRoot.querySelectorAll(".doc-level-one-block"));
      const allLevelTwoBlocks = Array.from(docRoot.querySelectorAll(".doc-level-two-block"));
      if (levelOneBlocks.length === 0 && allLevelTwoBlocks.length === 0) {
        docRoot.querySelectorAll(".doc-variant-switcher").forEach((switcher) => switcher.remove());
        return;
      }
      const levelOneOptions = getModuleOptions(levelOneBlocks, 1);
      const selectedLevelOneId = getSavedOptionId(levelOneStorageKey, levelOneOptions);
      const nestedLevelTwoBlocks = getNestedLevelTwoBlocksForSelection(docRoot, selectedLevelOneId);
      const standaloneLevelTwoBlocks = getStandaloneLevelTwoBlocks(docRoot);
      const levelTwoOptions = getModuleOptions(nestedLevelTwoBlocks, 2);
      const standaloneLevelTwoOptions = getModuleOptions(standaloneLevelTwoBlocks, 2);
      const selectedLevelTwoId = getSavedOptionId(levelTwoStorageKey, levelTwoOptions);
      const selectedStandaloneLevelTwoId = getSavedOptionId(
        standaloneLevelTwoStorageKey,
        standaloneLevelTwoOptions
      );
      ensureModuleSwitcher(
        docRoot,
        levelOneBlocks,
        levelOneOptions,
        selectedLevelOneId,
        levelTwoOptions,
        selectedLevelTwoId
      );
      ensureStandaloneModuleSwitcher(
        docRoot,
        standaloneLevelTwoBlocks,
        standaloneLevelTwoOptions,
        selectedStandaloneLevelTwoId
      );
      for (const block of levelOneBlocks) {
        block.hidden = Boolean(selectedLevelOneId) && block.dataset.docLevelOneId !== selectedLevelOneId;
      }
      for (const block of allLevelTwoBlocks) {
        const parentLevelOne = block.closest(".doc-level-one-block");
        if (!parentLevelOne) {
          block.hidden = Boolean(selectedStandaloneLevelTwoId) && block.dataset.docLevelTwoId !== selectedStandaloneLevelTwoId;
          continue;
        }
        const isInSelectedLevelOne = parentLevelOne.dataset.docLevelOneId === selectedLevelOneId;
        const isSelectedLevelTwo = !selectedLevelTwoId || block.dataset.docLevelTwoId === selectedLevelTwoId;
        block.hidden = !(isInSelectedLevelOne && isSelectedLevelTwo);
      }
      scheduleImageEnhancement();
      scheduleNearViewportPreload();
    }
    function scheduleModuleEnhancement() {
      if (!inBrowser) {
        return;
      }
      window.setTimeout(() => {
        applyModuleFilter();
      }, 0);
    }
    function releaseLazyImageResources(root) {
      const releaseTargets = /* @__PURE__ */ new Set([...lazyImageQueue, ...activeLazyImages]);
      root == null ? void 0 : root.querySelectorAll("img[data-lazy-src]").forEach((img) => {
        releaseTargets.add(img);
      });
      releaseTargets.forEach((img) => {
        lazyImageObserver == null ? void 0 : lazyImageObserver.unobserve(img);
        delete img.dataset.lazyObserved;
        delete img.dataset.lazyUrgent;
        if (img.dataset.lazyLoaded === "true") {
          return;
        }
        img.dataset.lazyLoading = "false";
        img.removeAttribute("srcset");
        img.removeAttribute("sizes");
        img.src = lazyImagePlaceholder;
      });
    }
    function resetLazyImageRuntime(root = null) {
      lazyImageRuntimeId += 1;
      imageObserver == null ? void 0 : imageObserver.disconnect();
      imageObserver = null;
      releaseLazyImageResources(root);
      lazyImageObserver == null ? void 0 : lazyImageObserver.disconnect();
      lazyImageObserver = null;
      lazyImageQueue = [];
      activeLazyImages.clear();
      activeLazyImageLoads = 0;
      scrollPixelsPerMs = 0;
      lastPreloadScanAt = 0;
      if (scheduledEnhanceTask !== null) {
        window.clearTimeout(scheduledEnhanceTask);
        scheduledEnhanceTask = null;
      }
      if (scheduledEnhanceBatchTask !== null) {
        window.clearTimeout(scheduledEnhanceBatchTask);
        scheduledEnhanceBatchTask = null;
      }
      if (scheduledPreloadTask !== null) {
        window.cancelAnimationFrame(scheduledPreloadTask);
        scheduledPreloadTask = null;
      }
    }
    function isPendingLazyImage(img) {
      return Boolean(img.dataset.lazySrc) && img.dataset.lazyLoaded !== "true";
    }
    function isImageInHiddenModule(img) {
      return Boolean(img.closest(".doc-level-one-block[hidden], .doc-level-two-block[hidden]"));
    }
    function updateImageLightboxEligibility(img) {
      const source = img.currentSrc || img.getAttribute("src") || img.dataset.lazySrc || "";
      const eligible = img.complete && img.naturalWidth > 0 && (img.naturalWidth >= 320 || img.naturalHeight >= 240) && !img.classList.contains("inline-icon") && !img.closest("a") && !source.startsWith("data:image");
      img.classList.toggle("vp-lightbox-trigger", eligible);
      if (eligible) {
        img.setAttribute("tabindex", "0");
        img.setAttribute("role", "button");
        img.setAttribute("aria-label", img.alt ? `Click to enlarge: ${img.alt}` : "Click to enlarge image");
      } else {
        img.removeAttribute("tabindex");
        img.removeAttribute("role");
        img.removeAttribute("aria-label");
      }
    }
    function openLightbox(img) {
      if (lightboxSrc.value || isImageInHiddenModule(img)) {
        return;
      }
      lightboxTrigger = img;
      lightboxSrc.value = img.currentSrc || img.src;
      lightboxAlt.value = img.alt.trim();
    }
    function closeLightbox() {
      const trigger = lightboxTrigger;
      lightboxSrc.value = "";
      lightboxAlt.value = "";
      lightboxTrigger = null;
      if (trigger == null ? void 0 : trigger.isConnected) {
        nextTick(() => trigger.focus({ preventScroll: true }));
      }
    }
    function getLightboxTrigger(target) {
      var _a;
      if (!(target instanceof HTMLImageElement) || !target.classList.contains("vp-lightbox-trigger")) {
        return null;
      }
      return ((_a = getDocRoot()) == null ? void 0 : _a.contains(target)) ? target : null;
    }
    function handleLightboxDocumentClick(event) {
      const img = getLightboxTrigger(event.target);
      if (img) {
        event.preventDefault();
        openLightbox(img);
      }
    }
    function handleLightboxDocumentKeydown(event) {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }
      const img = getLightboxTrigger(event.target);
      if (img) {
        event.preventDefault();
        openLightbox(img);
      }
    }
    function ensureImageAspectRatio(img) {
      if (img.style.aspectRatio) {
        return;
      }
      const width = Number(img.getAttribute("width"));
      const height = Number(img.getAttribute("height"));
      if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
        return;
      }
      img.style.aspectRatio = `${width} / ${height}`;
    }
    function markImageState(img, state) {
      img.classList.remove("is-pending", "is-loaded", "is-error");
      img.classList.add(`is-${state}`);
      updateImageLightboxEligibility(img);
    }
    function bindImageState(img) {
      if (img.dataset.imageStateBound === "true") {
        return;
      }
      img.dataset.imageStateBound = "true";
      img.addEventListener("load", () => {
        if (isPendingLazyImage(img)) {
          return;
        }
        markImageState(img, "loaded");
      });
      img.addEventListener("error", () => {
        if (isPendingLazyImage(img)) {
          return;
        }
        markImageState(img, "error");
      });
    }
    function finishLazyImageLoad(img, state) {
      img.dataset.lazyLoaded = "true";
      img.dataset.lazyLoading = "false";
      activeLazyImages.delete(img);
      markImageState(img, state);
      activeLazyImageLoads = Math.max(0, activeLazyImageLoads - 1);
      processLazyImageQueue();
    }
    function loadLazyImage(img) {
      const lazySrc = img.dataset.lazySrc;
      if (!lazySrc || img.dataset.lazyLoaded === "true" || img.dataset.lazyLoading === "true") {
        return;
      }
      img.dataset.lazyLoading = "true";
      activeLazyImages.add(img);
      activeLazyImageLoads += 1;
      const runtimeId = lazyImageRuntimeId;
      let finished = false;
      const finish = (state) => {
        if (finished) {
          return;
        }
        finished = true;
        if (runtimeId !== lazyImageRuntimeId || !img.isConnected) {
          activeLazyImages.delete(img);
          return;
        }
        finishLazyImageLoad(img, state);
      };
      img.addEventListener("load", () => finish(img.naturalWidth > 0 ? "loaded" : "error"), { once: true });
      img.addEventListener("error", () => finish("error"), { once: true });
      if (img.dataset.lazySizes) {
        img.sizes = img.dataset.lazySizes;
      }
      if (img.dataset.lazySrcset) {
        img.srcset = img.dataset.lazySrcset;
      }
      promoteLoadingPriority(img);
      img.src = lazySrc;
      window.setTimeout(() => {
        if (img.complete) {
          finish(img.naturalWidth > 0 ? "loaded" : "error");
        }
      }, 0);
    }
    function processLazyImageQueue() {
      if (lazyImageQueue.length > 1) {
        lazyImageQueue.sort((first, second) => getLazyImageQueueRank(first) - getLazyImageQueueRank(second));
      }
      while (activeLazyImageLoads < getLazyImageConcurrency() && lazyImageQueue.length > 0) {
        const img = lazyImageQueue.shift();
        if (!img || isImageInHiddenModule(img) || img.dataset.lazyLoaded === "true" || img.dataset.lazyLoading === "true") {
          continue;
        }
        loadLazyImage(img);
      }
    }
    function getLazyImageConcurrency() {
      var _a, _b;
      const connection = navigator.connection;
      if ((connection == null ? void 0 : connection.saveData) || ((_a = connection == null ? void 0 : connection.effectiveType) == null ? void 0 : _a.includes("2g"))) {
        return 1;
      }
      if ((_b = connection == null ? void 0 : connection.effectiveType) == null ? void 0 : _b.includes("3g")) {
        return 1;
      }
      return scrollPixelsPerMs > 1.2 ? 2 : 1;
    }
    function getImageDistanceToViewport(img) {
      if (!inBrowser || !img.isConnected || isImageInHiddenModule(img)) {
        return Number.POSITIVE_INFINITY;
      }
      const rect = img.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom >= 0 && rect.top <= viewportHeight) {
        return 0;
      }
      if (rect.top > viewportHeight) {
        return rect.top - viewportHeight;
      }
      return Math.abs(rect.bottom);
    }
    function isUrgentLazyImage(img) {
      return img.dataset.lazyUrgent === "true" || getImageDistanceToViewport(img) <= lazyImageHighPriorityDistance;
    }
    function getLazyImageQueueRank(img) {
      return (isUrgentLazyImage(img) ? 0 : 1) * 1e5 + getImageDistanceToViewport(img);
    }
    function promoteLoadingPriority(img) {
      const distance = getImageDistanceToViewport(img);
      img.setAttribute("loading", "eager");
      if (img.dataset.lazyUrgent === "true" || distance <= lazyImageHighPriorityDistance) {
        img.setAttribute("fetchpriority", "high");
      } else if (distance <= lazyImageAutoPriorityDistance) {
        img.setAttribute("fetchpriority", "auto");
      } else {
        img.setAttribute("fetchpriority", "low");
      }
    }
    function getLazyImagePreloadAhead() {
      const velocityBoost = Math.min(
        lazyImagePreloadMaxAhead - lazyImagePreloadMinAhead,
        Math.round(scrollPixelsPerMs * 360)
      );
      return lazyImagePreloadMinAhead + velocityBoost;
    }
    function queueLazyImage(img, priority = false) {
      if (isImageInHiddenModule(img) || !img.dataset.lazySrc || img.dataset.lazyLoaded === "true" || img.dataset.lazyLoading === "true") {
        return;
      }
      if (priority) {
        img.dataset.lazyUrgent = "true";
      }
      if (lazyImageQueue.includes(img)) {
        processLazyImageQueue();
        return;
      }
      if (priority) {
        lazyImageQueue.unshift(img);
      } else {
        lazyImageQueue.push(img);
      }
      processLazyImageQueue();
    }
    function preloadImagesNearViewport() {
      if (!inBrowser) {
        return;
      }
      const now = window.performance.now();
      if (lastPreloadScanAt > 0 && now - lastPreloadScanAt < lazyImagePreloadScanInterval) {
        return;
      }
      lastPreloadScanAt = now;
      const docRoot = getDocRoot();
      if (!docRoot) {
        return;
      }
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const preloadAhead = getLazyImagePreloadAhead();
      const images = Array.from(docRoot.querySelectorAll("img[data-lazy-src]"));
      for (const img of images) {
        if (isImageInHiddenModule(img) || img.dataset.lazyLoaded === "true" || img.dataset.lazyLoading === "true") {
          continue;
        }
        const rect = img.getBoundingClientRect();
        if (rect.bottom < -180 || rect.top > viewportHeight + preloadAhead) {
          continue;
        }
        const isUrgent = rect.bottom >= -80 && rect.top <= viewportHeight + 180;
        queueLazyImage(img, isUrgent);
      }
    }
    function scheduleNearViewportPreload() {
      if (!inBrowser || scheduledPreloadTask !== null) {
        return;
      }
      scheduledPreloadTask = window.requestAnimationFrame(() => {
        scheduledPreloadTask = null;
        preloadImagesNearViewport();
      });
    }
    function handleViewportScroll() {
      const now = window.performance.now();
      const scrollY = window.scrollY;
      if (lastScrollAt > 0) {
        const elapsed = Math.max(16, now - lastScrollAt);
        scrollPixelsPerMs = Math.min(4, Math.abs(scrollY - lastScrollY) / elapsed);
      }
      lastScrollY = scrollY;
      lastScrollAt = now;
      scheduleNearViewportPreload();
    }
    function getLazyImageObserver() {
      if (!inBrowser || !("IntersectionObserver" in window)) {
        return null;
      }
      if (!lazyImageObserver) {
        lazyImageObserver = new IntersectionObserver(
          (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) {
                continue;
              }
              const img = entry.target;
              lazyImageObserver == null ? void 0 : lazyImageObserver.unobserve(img);
              queueLazyImage(img);
            }
          },
          {
            rootMargin: lazyImageRootMargin,
            threshold: 0.01
          }
        );
      }
      return lazyImageObserver;
    }
    function observeLazyImage(img) {
      if (isImageInHiddenModule(img)) {
        return;
      }
      const observer = getLazyImageObserver();
      if (!observer) {
        queueLazyImage(img);
        return;
      }
      if (img.dataset.lazyObserved === "true") {
        return;
      }
      img.dataset.lazyObserved = "true";
      observer.observe(img);
    }
    function enhanceImage(img, shouldAssignPriority) {
      const isInlineIcon = img.classList.contains("inline-icon");
      const currentSrc = img.currentSrc || "";
      const sourceSrc = img.getAttribute("src") || "";
      const lazySrc = img.dataset.lazySrc || "";
      const isDataImage = lazySrc ? lazySrc.startsWith("data:image") : currentSrc.startsWith("data:image") || sourceSrc.startsWith("data:image");
      const isInsideTable = Boolean(img.closest("table"));
      img.setAttribute("decoding", "async");
      if (isInlineIcon || isDataImage) {
        if (img.complete && img.naturalWidth > 0) {
          img.classList.add("is-loaded");
        }
        return false;
      }
      img.classList.add("vp-lazy-image");
      img.classList.toggle("is-table-image", isInsideTable);
      ensureImageAspectRatio(img);
      const isPriorityImage = shouldAssignPriority && !isInsideTable;
      if (isPriorityImage) {
        img.setAttribute("loading", "eager");
        img.setAttribute("fetchpriority", "high");
        img.classList.add("is-priority-image");
        img.dataset.lazyPriority = "true";
      } else {
        img.setAttribute("loading", "lazy");
        img.setAttribute("fetchpriority", "low");
        img.classList.remove("is-priority-image");
        img.dataset.lazyPriority = "false";
      }
      bindImageState(img);
      if (lazySrc && img.dataset.lazyLoaded !== "true") {
        markImageState(img, "pending");
        if (isPriorityImage) {
          queueLazyImage(img, true);
        } else {
          observeLazyImage(img);
        }
      } else if (img.complete) {
        markImageState(img, img.naturalWidth > 0 ? "loaded" : "error");
      } else {
        markImageState(img, "pending");
      }
      return isPriorityImage;
    }
    function enhanceImages() {
      if (!inBrowser) {
        return;
      }
      const docRoot = getDocRoot();
      if (!docRoot) {
        return;
      }
      const images = Array.from(docRoot.querySelectorAll("img"));
      let index = 0;
      let priorityAssigned = Array.from(
        docRoot.querySelectorAll("img.is-priority-image")
      ).some((img) => !isImageInHiddenModule(img));
      if (scheduledEnhanceBatchTask !== null) {
        window.clearTimeout(scheduledEnhanceBatchTask);
        scheduledEnhanceBatchTask = null;
      }
      const runBatch = () => {
        scheduledEnhanceBatchTask = null;
        const limit = Math.min(index + imageEnhanceBatchSize, images.length);
        for (; index < limit; index += 1) {
          const img = images[index];
          if (!img.isConnected || !docRoot.contains(img) || isImageInHiddenModule(img)) {
            continue;
          }
          priorityAssigned = enhanceImage(img, !priorityAssigned) || priorityAssigned;
        }
        if (index < images.length) {
          scheduledEnhanceBatchTask = window.setTimeout(runBatch, imageEnhanceBatchDelay);
          return;
        }
        scheduleNearViewportPreload();
      };
      runBatch();
    }
    function observeDocChanges() {
      imageObserver == null ? void 0 : imageObserver.disconnect();
      const docRoot = getDocRoot();
      if (!docRoot) {
        return;
      }
      imageObserver = new MutationObserver((mutations) => {
        const hasNewModule = mutations.some(
          (mutation) => Array.from(mutation.addedNodes).some(
            (node) => node instanceof HTMLElement && (node.matches(".doc-level-one-block, .doc-level-two-block") || Boolean(node.querySelector(".doc-level-one-block, .doc-level-two-block")))
          )
        );
        const hasNewImage = mutations.some(
          (mutation) => Array.from(mutation.addedNodes).some((node) => node instanceof HTMLImageElement || node instanceof HTMLElement && node.querySelector("img"))
        );
        if (hasNewModule) {
          applyModuleFilter();
        }
        if (hasNewImage) {
          enhanceImages();
        }
      });
      imageObserver.observe(docRoot, {
        childList: true,
        subtree: true
      });
    }
    function scheduleImageEnhancement() {
      if (!inBrowser) {
        return;
      }
      if (scheduledEnhanceTask !== null) {
        window.clearTimeout(scheduledEnhanceTask);
      }
      scheduledEnhanceTask = window.setTimeout(() => {
        scheduledEnhanceTask = null;
        enhanceImages();
        observeDocChanges();
      }, 16);
    }
    onMounted(() => {
      lastScrollY = window.scrollY;
      lastScrollAt = window.performance.now();
      window.addEventListener("scroll", handleViewportScroll, { passive: true });
      window.addEventListener("resize", scheduleNearViewportPreload);
      document.addEventListener("click", handleLightboxDocumentClick);
      document.addEventListener("keydown", handleLightboxDocumentKeydown);
      patchLogoLink();
      injectVersionSwitcher();
      scheduleImageEnhancement();
      scheduleModuleEnhancement();
    });
    watch(
      () => route.path,
      async () => {
        closeLightbox();
        resetLazyImageRuntime(getDocRoot());
        await nextTick();
        patchLogoLink();
        injectVersionSwitcher();
        scheduleImageEnhancement();
        scheduleModuleEnhancement();
      }
    );
    onBeforeUnmount(() => {
      closeLightbox();
      imageObserver == null ? void 0 : imageObserver.disconnect();
      resetLazyImageRuntime(getDocRoot());
      window.removeEventListener("scroll", handleViewportScroll);
      window.removeEventListener("resize", scheduleNearViewportPreload);
      document.removeEventListener("click", handleLightboxDocumentClick);
      document.removeEventListener("keydown", handleLightboxDocumentKeydown);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        isRedirectPage.value ? (openBlock(), createBlock(_sfc_main$3, { key: 0 })) : (openBlock(), createBlock(resolveDynamicComponent(unref(theme).Layout), { key: 1 })),
        renderSlot(_ctx.$slots, "layout-bottom"),
        lightboxSrc.value ? (openBlock(), createBlock(_sfc_main$2, {
          key: 2,
          src: lightboxSrc.value,
          alt: lightboxAlt.value,
          onClose: closeLightbox
        }, null, 8, ["src", "alt"])) : createCommentVNode("", true),
        createVNode(_sfc_main$1)
      ], 64);
    };
  }
});
function collectLockedLinks(items, links = /* @__PURE__ */ new Set()) {
  for (const item of items || []) {
    if ((item == null ? void 0 : item.class) === "is-preview-locked" && (item == null ? void 0 : item.link)) {
      links.add(item.link);
    }
    collectLockedLinks((item == null ? void 0 : item.items) || [], links);
  }
  return links;
}
function isLockedHref(href, lockedLinks) {
  if (!href || lockedLinks.size === 0) {
    return false;
  }
  const pathname = new URL(href, window.location.origin).pathname;
  return [...lockedLinks].some((lockedLink) => {
    const lockedPath = new URL(lockedLink, window.location.origin).pathname;
    return pathname.endsWith(lockedPath);
  });
}
function markLockedSidebarItems(sidebar) {
  if (typeof window === "undefined") {
    return;
  }
  const lockedLinks = collectLockedLinks(sidebar);
  document.querySelectorAll(".VPSidebarItem > .item > a.link").forEach((link) => {
    var _a;
    const href = link.getAttribute("href") || "";
    (_a = link.closest(".VPSidebarItem")) == null ? void 0 : _a.classList.toggle("is-preview-locked", isLockedHref(href, lockedLinks));
  });
  document.querySelectorAll(".pager-link").forEach((link) => {
    const href = link.getAttribute("href") || "";
    link.classList.toggle("is-preview-locked", isLockedHref(href, lockedLinks));
  });
}
function getLockedMarkerObserverRoots() {
  return Array.from(document.querySelectorAll(".VPSidebar, .VPDocFooter"));
}
const LockedSidebarMarker = defineComponent({
  setup() {
    const { theme: theme2 } = useData$1();
    const route = useRoute();
    let observer = null;
    let pending = false;
    const scheduleMark = () => {
      if (typeof window === "undefined" || pending) {
        return;
      }
      pending = true;
      window.requestAnimationFrame(() => {
        pending = false;
        markLockedSidebarItems(theme2.value.sidebar || []);
      });
    };
    watch(
      () => [route.path, theme2.value.sidebar],
      async () => {
        await nextTick();
        scheduleMark();
      },
      { immediate: true }
    );
    onMounted(() => {
      scheduleMark();
      observer = new MutationObserver(() => {
        scheduleMark();
      });
      for (const root of getLockedMarkerObserverRoots()) {
        observer.observe(root, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ["href"]
        });
      }
    });
    onBeforeUnmount(() => {
      observer == null ? void 0 : observer.disconnect();
      observer = null;
    });
    return () => null;
  }
});
const RawTheme = {
  ...theme,
  Layout: () => h(_sfc_main, null, { "layout-bottom": () => h(LockedSidebarMarker) })
};
export {
  RawTheme as R,
  createSearchTranslate as c,
  useData as u
};
