// base 基础
const getMenuPath = path => padMenuPath(path.split("/").slice(0, -1).join("/"));
const getFilename = path => path.split("/").slice(-1).toString().replace(".md", "");
const padMenuPath = path => `${path.startsWith("/") ? "" : "/"}${path}${path.endsWith("/") ? "" : "/"}`;

const filterRootMarkdowns = page => page.menuPath !== "//";

const groupBy = (arr, fn) =>
  arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val, i) => {
    acc[val] = (acc[val] || []).concat(arr[i]);
    return acc;
  }, {});

const genGroup = (title, children = [''], collapsable = false, sidebarDepth = 1) => ([{
  title,
  collapsable,
  sidebarDepth,
  children
}]);

const genSidebar = (groups, options) => Object.keys(groups).reduce((acc, group) => {
  const title = formatTitle(group.split("/").slice(-2, -1).toString(), options.titleMode, options.titleMap);
  const children = groups[group].map(c => c.filename === 'README' ? '' : c.filename);

  acc[group] = genGroup(title, children);
  return acc;
}, {})

// title 相关函数
const toDefaultCase = str => str;
const toLowerCase = str => str.toLowerCase();
const toUpperCase = str => str.toUpperCase();
const toCapitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));
const toCamelCase = str => {
  let s =
    str &&
    str
      .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.charAt(0).toUpperCase() + x.slice(1))
    .join(' ');

const TITLE_MODE = {
  "default": toDefaultCase,
  "lowercase": toLowerCase,
  "uppercase": toUpperCase,
  "capitalize": toCapitalize,
  "camelcase": toCamelCase,
  "kebabcase": toKebabCase,
  "titlecase": toTitleCase,
};

const formatTitle = (title = "", mode = "default", map = {}) => map[title] || (TITLE_MODE[mode.toLowerCase()] || TITLE_MODE["default"])(title);

// 排序
const titleSort = (obj, key, mode) => Object.values(obj).forEach(s => s.sort((a, b) => a[key] > b[key] ? mode === 'asc' ? 1 : -1 : mode === 'asc' ? -1 : 1));
const sidebarSort = sidebar => Object.keys(sidebar).sort((a, b) => a.length > b.length ? -1 : 1).reduce((acc, cur) => (acc[cur] = sidebar[cur], acc), {})

const findGroupIndex = (cur, obj) => {
  const arr = obj[cur.menuPath];
  const prev = cur.frontmatter.autoPrev;
  const next = cur.frontmatter.autoNext;
  if (!arr) return -1;

  // 当两者均存在时，取 prev
  if (prev) {
    return arr.findIndex(item => item.filename === prev);
  } else if (next) {
    return arr.findIndex(a => a.filename === next);
  } else {
    return -1;
  }
}

module.exports = {
  getMenuPath,
  getFilename,
  filterRootMarkdowns,
  groupBy,
  genSidebar,
  titleSort,
  sidebarSort,
  findGroupIndex
}