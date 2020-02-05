const { titleSort } = require("../lib/utils");

const sidebars = {
  '/exampleMenu1/exampleSubMenu1-2/': [
    {
      menuPath: '/exampleMenu1/exampleSubMenu1-2/',
      filename: '01-file2'
    },
    {
      menuPath: '/exampleMenu1/exampleSubMenu1-2/',
      filename: '11-README'
    },
    {
      menuPath: '/exampleMenu1/exampleSubMenu1-2/',
      filename: '09-file3'
    }
  ]
};

describe('sidebar sort', () => {
  it('should get ASCII ascending order', () => {
    const asc = {
      '/exampleMenu1/exampleSubMenu1-2/': [
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '01-file2'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '09-file3'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '11-README'
        }
      ]
    };

    titleSort(sidebars, "asc"); // sort
    expect(sidebars).toEqual(asc);
  });

  it('should get ASCII descending order', () => {
    const desc = {
      '/exampleMenu1/exampleSubMenu1-2/': [
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '11-README'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '09-file3'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '01-file2'
        }
      ]
    };

    titleSort(sidebars, "desc"); // sort
    expect(sidebars).toEqual(desc);
  });

  it('should sort by custom rules', () => {
    const fn = key => (a, b) => a[key].split("-")[1][length - 1] > b[key].split("-")[1][length - 1] ? 1 : -1;
    const fnResult = {
      '/exampleMenu1/exampleSubMenu1-2/': [
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '11-README'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '09-file3'
        },
        {
          menuPath: '/exampleMenu1/exampleSubMenu1-2/',
          filename: '01-file2'
        }
      ]
    };

    titleSort(sidebars, fn); // sort
    expect(sidebars).toEqual(fnResult);
  });
});