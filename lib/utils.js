const filterRootMarkdowns = page => page.split.length !== 1; // 过滤 docs 目录下的 md 文件
const filterDepthOneMarkdowns = page => page.split.length === 2; // 筛选出深度为 1 的 md 文件
const filterDepthTwoMarkdowns = page => page.split.length === 3; // 筛选出深度为 2 的 md 文件

const addDepthOne = pages => pages.reduce((acc = [], cur) => {
  const name = cur.split[0];
  const filename = cur.split[1];
  const findCur = acc.find(p => p.name === name);

  if (findCur) {
    findCur.children.push(filename);
  } else {
    acc.push({
      name,
      children: [filename]
    });
  }

  return acc;
}, []);

const addDepthTwo = pages => pages.reduce((acc = [], cur) => {
  const name = cur.split[0];
  const sub = cur.split[1];
  const filename = cur.split[2];
  const findCur = acc.find(p => p.name === name);

  if (findCur) {
    const findSub = findCur.children.find(p => p.name === sub);

    findSub ? findSub.children.push(filename) : findCur.children.push({ name: sub, children: [filename] })
  } else {
    acc.push({
      name,
      children: [{ name: sub, children: [filename] }]
    });
  }

  return acc;
}, []);

const genSidebar = (title, children = [''], collapsable = false, sidebarDepth = 1) => ([{
  title,
  collapsable,
  sidebarDepth,
  children
}]);

const genRoute = (...names) => {
  const joins = names.join("/");
  return `${joins.startsWith("/") ? '' : '/'}${joins}${joins.endsWith("/") ? '' : '/'}`;
}

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
const titleSortBy = (obj, fn, mode) => Object.entries(obj).forEach(([key, value]) => fn(value).sort((a, b) => a > b ? mode === 'asc' ? 1 : -1 : mode === 'asc' ? -1 : 1));

module.exports = {
  filterRootMarkdowns,
  filterDepthOneMarkdowns,
  filterDepthTwoMarkdowns,
  addDepthOne,
  addDepthTwo,
  genSidebar,
  genRoute,
  formatTitle,
  titleSortBy
}