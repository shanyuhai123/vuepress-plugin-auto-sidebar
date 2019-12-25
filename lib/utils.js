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

module.exports = {
  filterRootMarkdowns,
  filterDepthOneMarkdowns,
  filterDepthTwoMarkdowns,
  addDepthOne,
  addDepthTwo,
  genSidebar,
  genRoute
}