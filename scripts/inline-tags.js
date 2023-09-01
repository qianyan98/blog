'use strict';


const cosDomain = hexo.config.cosDomain;
const baseDomain = hexo.config.homePageUrl;

//友链
hexo.extend.tag.register('linklist', function(args, comment = '%') {
    const iconSrc = cosDomain + '/' + hexo.config.custom_page_path.links + '/';
    const jsonSrc = args + '.json';
    return `<div class="link-list" icon-src="${iconSrc}" json-src="${jsonSrc}"></div>`;
});

// 子页面列表
hexo.extend.tag.register('subpagebox', function ([delimiter = '|', comment = '%'], content) {
    const links = content.split('\n').filter(line => line.trim() !== '').map(line => {
        const item = line.split(delimiter).map(arg => arg.trim());
        const imageSource = cosDomain + '/' + 'images' + '/' + item[1];
        if (item[0][0] === comment) return '';
        return `
            <div class="subpage-box-cover">
                <a href="${baseDomain}/${item[2]}/" rel="noopener" target="_blank">
                    <img alt="${item[0]}" src="${imageSource}">
                    <p class="image-caption">${item[0]}</p>
                </a>
            </div>
        `;
    });
    return `<div class="subpage-box">${links.join('')}</div>`;
}, true);

