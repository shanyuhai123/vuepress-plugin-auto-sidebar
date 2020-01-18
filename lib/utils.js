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

const genGroup = (title, children = [''], collapsable = false, sidebarDepth = 1) => ({
  title,
  collapsable,
  sidebarDepth,
  children
});

const genSidebar = (groups, options) => Object.keys(groups).reduce((acc, group) => {
  const defaultTitle = formatTitle(group.split("/").slice(-2, -1).toString(), options.titleMode, options.titleMap);
  const { above, default: defaultGroup, below } = divideMoreGroups(groups[group]);
  above.sort((a, b) => a.sort - b.sort >= 0 ? -1 : 1);
  below.sort((a, b) => a.sort - b.sort >= 0 ? 1 : -1);

  acc[group] = [
    ...above.map(a => genGroup(a.groupName, a.children)),
    genGroup(defaultTitle, defaultGroup),
    ...below.map(a => genGroup(a.groupName, a.children)),
  ];

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

// group
const divideReg = /autoGroup([+-])(\d*)/;

const divideMoreGroups = arr => arr.reduce((acc = {}, cur) => {
  const autoGroup = Object.keys(cur.frontmatter).find(f => divideReg.test(f));
  const filename = cur.filename === 'README' ? '' : cur.filename;

  if (!autoGroup) {
    acc.default.push(filename);
  } else {
    const autoGroupName = cur.frontmatter[autoGroup];
    const [, symbol, sort] = autoGroup.match(divideReg);

    if (symbol === '+') {
      const findGroup = acc.above.find(a => a.groupName === autoGroupName)
      findGroup ? findGroup.children.push(filename) : acc.above.push({
        groupName: autoGroupName,
        sort,
        children: [filename]
      })
    }
    if (symbol === '-') {
      const findGroup = acc.below.find(a => a.groupName === autoGroupName)
      findGroup ? findGroup.children.push(filename) : acc.below.push({
        groupName: autoGroupName,
        sort,
        children: [filename]
      })
    }
  }

  return acc;
}, {
  above: [],
  default: [],
  below: []
})

// nav
const genNav = sides => Object.keys(sides).reduce((acc, cur) => {
  const [, menu] = cur.split("/");
  const [{ title }] = sides[cur];
  const re = acc.find(a => a.text === menu);

  if (re) {
    re.items.push({ text: title, link: cur })
  } else {
    acc.push({ text: menu, items: [{ text: title, link: cur }] })
  }

  return acc;
}, [])

module.exports = {
  getMenuPath,
  getFilename,
  filterRootMarkdowns,
  groupBy,
  genSidebar,
  titleSort,
  sidebarSort,
  findGroupIndex,
  genNav
}