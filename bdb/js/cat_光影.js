import 'assets://js/lib/crypto-js.js';
let host = 'https://12gy.com';
let headers = {
    'User-Agent': 'Mozilla/5.0 (Linux; Android 13; M2102J2SC Build/TKQ1.221114.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/144.0.7559.31 Mobile Safari/537.36',
};

function md5(string) {
    return CryptoJS.MD5(string).toString();
}

function getList(html) {
    let videos = [];
    let selector = '';
    if (html.includes('<div class="public-list-box public-pic-b">')) selector = '.public-list-box';
    else if (html.includes('<div class="vod-detail style-detail cor4 search-list">')) selector = '.search-list';
    if (!selector) return videos;
    const list = pdfa(html, selector);
    list.forEach(it => {
        const id = pdfh(it, 'a&&href');
        const name = pdfh(it, 'a&&title') || pdfh(it, 'h3&&Text');
        const pic = pdfh(it, 'img&&data-src');
        const remark = pdfh(it, '.public-list-prb&&Text') || pdfh(it, '.slide-info-remarks&&Text');
        videos.push({
            vod_id: id,
            vod_name: name,
            vod_pic: host + pic,
            vod_remarks: remark
        });
    });
    return videos;
}
async function init(cfg) {}
async function home(filter) {
    return JSON.stringify({
        class: [{
                "type_id": "1",
                "type_name": "电影"
            },
            {
                "type_id": "2",
                "type_name": "剧集"
            },
            {
                "type_id": "5",
                "type_name": "综艺"
            },
            {
                "type_id": "4",
                "type_name": "动漫"
            },
            {
                "type_id": "59",
                "type_name": "短剧"
            }
        ],
        filters: {"1":[{"key":"cateId","name":"分类","value":[{"n":"分类","v":"1"},{"n":"预告片","v":"24"},{"n":"家庭片","v":"39"},{"n":"爱情片","v":"8"},{"n":"科幻片","v":"9"},{"n":"恐怖片","v":"10"},{"n":"剧情片","v":"11"},{"n":"战争片","v":"12"},{"n":"动作片","v":"6"},{"n":"动画片","v":"25"},{"n":"喜剧片","v":"7"},{"n":"其他片","v":"27"}]},{"key":"class_","name":"类型","value":[{"n":"类型","v":""},{"n":"喜剧","v":"喜剧"},{"n":"爱情","v":"爱情"},{"n":"恐怖","v":"恐怖"},{"n":"动作","v":"动作"},{"n":"科幻","v":"科幻"},{"n":"剧情","v":"剧情"},{"n":"战争","v":"战争"},{"n":"警匪","v":"警匪"},{"n":"犯罪","v":"犯罪"},{"n":"动画","v":"动画"},{"n":"奇幻","v":"奇幻"},{"n":"武侠","v":"武侠"},{"n":"冒险","v":"冒险"},{"n":"枪战","v":"枪战"},{"n":"悬疑","v":"悬疑"},{"n":"惊悚","v":"惊悚"},{"n":"经典","v":"经典"},{"n":"青春","v":"青春"},{"n":"文艺","v":"文艺"},{"n":"微电影","v":"微电影"},{"n":"古装","v":"古装"},{"n":"历史","v":"历史"},{"n":"运动","v":"运动"},{"n":"农村","v":"农村"},{"n":"儿童","v":"儿童"},{"n":"伦理","v":"伦理"},{"n":"福利","v":"福利"},{"n":"情色","v":"情色"},{"n":"两性","v":"两性"},{"n":"网络电影","v":"网络电影"}]},{"key":"area","name":"地区","value":[{"n":"地区","v":""},{"n":"大陆","v":"大陆"},{"n":"香港","v":"香港"},{"n":"台湾","v":"台湾"},{"n":"美国","v":"美国"},{"n":"法国","v":"法国"},{"n":"英国","v":"英国"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"德国","v":"德国"},{"n":"泰国","v":"泰国"},{"n":"印度","v":"印度"},{"n":"意大利","v":"意大利"},{"n":"西班牙","v":"西班牙"},{"n":"加拿大","v":"加拿大"},{"n":"其他","v":"其他"}]},{"key":"lang","name":"语言","value":[{"n":"语言","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"法语","v":"法语"},{"n":"德语","v":"德语"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"年份","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"}]},{"key":"letter","name":"首字母","value":[{"n":"首字母","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"排序","v":""},{"n":"按最新","v":"time"},{"n":"按最热","v":"hits"},{"n":"按评分","v":"score"}]}],"2":[{"key":"cateId","name":"分类","value":[{"n":"分类","v":"2"},{"n":"国产剧","v":"13"},{"n":"港台剧","v":"14"},{"n":"日韩剧","v":"15"},{"n":"欧美剧","v":"16"},{"n":"其他剧","v":"28"}]},{"key":"class_","name":"类型","value":[{"n":"类型","v":""},{"n":"古装","v":"古装"},{"n":"战争","v":"战争"},{"n":"青春偶像","v":"青春偶像"},{"n":"喜剧","v":"喜剧"},{"n":"家庭","v":"家庭"},{"n":"犯罪","v":"犯罪"},{"n":"动作","v":"动作"},{"n":"奇幻","v":"奇幻"},{"n":"剧情","v":"剧情"},{"n":"历史","v":"历史"},{"n":"经典","v":"经典"},{"n":"乡村","v":"乡村"},{"n":"情景","v":"情景"},{"n":"商战","v":"商战"},{"n":"网剧","v":"网剧"},{"n":"其他","v":"其他"}]},{"key":"area","name":"地区","value":[{"n":"地区","v":""},{"n":"大陆","v":"大陆"},{"n":"香港","v":"香港"},{"n":"台湾","v":"台湾"},{"n":"美国","v":"美国"},{"n":"法国","v":"法国"},{"n":"英国","v":"英国"},{"n":"日本","v":"日本"},{"n":"韩国","v":"韩国"},{"n":"德国","v":"德国"},{"n":"泰国","v":"泰国"},{"n":"印度","v":"印度"},{"n":"意大利","v":"意大利"},{"n":"西班牙","v":"西班牙"},{"n":"加拿大","v":"加拿大"},{"n":"其他","v":"其他"}]},{"key":"lang","name":"语言","value":[{"n":"语言","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"法语","v":"法语"},{"n":"德语","v":"德语"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"年份","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"}]},{"key":"letter","name":"首字母","value":[{"n":"首字母","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"排序","v":""},{"n":"按最新","v":"time"},{"n":"按最热","v":"hits"},{"n":"按评分","v":"score"}]}],"5":[{"key":"cateId","name":"分类","value":[{"n":"分类","v":"5"},{"n":"国产综艺","v":"17"},{"n":"日韩综艺","v":"18"},{"n":"港台综艺","v":"33"},{"n":"欧美综艺","v":"34"},{"n":"其他综艺","v":"52"}]},{"key":"area","name":"地区","value":[{"n":"地区","v":""},{"n":"内地","v":"内地"},{"n":"港台","v":"港台"},{"n":"日韩","v":"日韩"},{"n":"欧美","v":"欧美"}]},{"key":"lang","name":"语言","value":[{"n":"语言","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"法语","v":"法语"},{"n":"德语","v":"德语"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"年份","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"}]},{"key":"letter","name":"首字母","value":[{"n":"首字母","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"排序","v":""},{"n":"按最新","v":"time"},{"n":"按最热","v":"hits"},{"n":"按评分","v":"score"}]}],"4":[{"key":"cateId","name":"分类","value":[{"n":"分类","v":"4"},{"n":"国产动漫","v":"29"},{"n":"日韩动漫","v":"30"},{"n":"欧美动漫","v":"31"},{"n":"其他动漫","v":"32"}]},{"key":"class_","name":"类型","value":[{"n":"类型","v":""},{"n":"萝莉","v":"萝莉"},{"n":"校园","v":"校园"},{"n":"动作","v":"动作"},{"n":"机战","v":"机战"},{"n":"运动","v":"运动"},{"n":"战争","v":"战争"},{"n":"少年","v":"少年"},{"n":"少女","v":"少女"},{"n":"社会","v":"社会"},{"n":"原创","v":"原创"},{"n":"亲子","v":"亲子"},{"n":"益智","v":"益智"},{"n":"励志","v":"励志"},{"n":"情感","v":"情感"},{"n":"科幻","v":"科幻"},{"n":"热血","v":"热血"},{"n":"推理","v":"推理"},{"n":"搞笑","v":"搞笑"},{"n":"冒险","v":"冒险"},{"n":"其他","v":"其他"}]},{"key":"area","name":"地区","value":[{"n":"地区","v":""},{"n":"国产","v":"国产"},{"n":"日本","v":"日本"},{"n":"欧美","v":"欧美"},{"n":"其他","v":"其他"}]},{"key":"lang","name":"语言","value":[{"n":"语言","v":""},{"n":"国语","v":"国语"},{"n":"英语","v":"英语"},{"n":"粤语","v":"粤语"},{"n":"闽南语","v":"闽南语"},{"n":"韩语","v":"韩语"},{"n":"日语","v":"日语"},{"n":"法语","v":"法语"},{"n":"德语","v":"德语"},{"n":"其它","v":"其它"}]},{"key":"year","name":"年份","value":[{"n":"年份","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"}]},{"key":"letter","name":"首字母","value":[{"n":"首字母","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"排序","v":""},{"n":"按最新","v":"time"},{"n":"按最热","v":"hits"},{"n":"按评分","v":"score"}]}],"59":[{"key":"cateId","name":"类型","value":[{"n":"分类","v":"59"},{"n":"重生民国","v":"60"},{"n":"穿越年代","v":"61"},{"n":"现代言情","v":"62"},{"n":"反转爽文","v":"63"},{"n":"女恋总裁","v":"64"},{"n":"闪婚离婚","v":"65"},{"n":"都市脑洞","v":"66"},{"n":"古装仙侠","v":"67"}]},{"key":"year","name":"年份","value":[{"n":"年份","v":""},{"n":"2026","v":"2026"},{"n":"2025","v":"2025"},{"n":"2024","v":"2024"},{"n":"2023","v":"2023"},{"n":"2022","v":"2022"},{"n":"2021","v":"2021"},{"n":"2020","v":"2020"},{"n":"2019","v":"2019"},{"n":"2018","v":"2018"},{"n":"2017","v":"2017"},{"n":"2016","v":"2016"},{"n":"2015","v":"2015"},{"n":"2014","v":"2014"},{"n":"2013","v":"2013"},{"n":"2012","v":"2012"},{"n":"2011","v":"2011"},{"n":"2010","v":"2010"}]},{"key":"letter","name":"首字母","value":[{"n":"首字母","v":""},{"n":"A","v":"A"},{"n":"B","v":"B"},{"n":"C","v":"C"},{"n":"D","v":"D"},{"n":"E","v":"E"},{"n":"F","v":"F"},{"n":"G","v":"G"},{"n":"H","v":"H"},{"n":"I","v":"I"},{"n":"J","v":"J"},{"n":"K","v":"K"},{"n":"L","v":"L"},{"n":"M","v":"M"},{"n":"N","v":"N"},{"n":"O","v":"O"},{"n":"P","v":"P"},{"n":"Q","v":"Q"},{"n":"R","v":"R"},{"n":"S","v":"S"},{"n":"T","v":"T"},{"n":"U","v":"U"},{"n":"V","v":"V"},{"n":"W","v":"W"},{"n":"X","v":"X"},{"n":"Y","v":"Y"},{"n":"Z","v":"Z"},{"n":"0-9","v":"0-9"}]},{"key":"by","name":"排序","value":[{"n":"排序","v":""},{"n":"按最新","v":"time"},{"n":"按最热","v":"hits"},{"n":"按评分","v":"score"}]}]}
    });
}
async function homeVod() {
    let resp = await req(host + '/vodtype/2.html', {
        headers
    });
    return JSON.stringify({
        list: getList(resp.content)
    });
}

async function category(tid, pg, filter, extend) {
    let timestamp = new Date().getTime().toString();
    let key = md5("DS" + timestamp + "DCC147D11943AF75");
    const cateId = extend.cateId || tid;
    const class_ = extend.class_ || '';
    const area = extend.area || '';
    const lang = extend.lang || '';
    const letter = extend.letter || '';
    const year = extend.year || '';
    const by = extend.by || '';
    let url = `${host}/index.php/ds_api/vod?type=${cateId}&page=${pg}&time=${timestamp}&key=${key}&area=${area}&class=${class_}&by=${by}&lang=${lang}&letter=${letter}&year=${year}`;
    let opt = {
        headers: headers,
        method: 'POST'
    };
    let resp = await req(url, opt);
    let fdata = JSON.parse(resp.content);
    let videos = fdata.list.map(item => {
        return {
            vod_id: '/voddetail/' + item.vod_id + '.html',
            vod_name: item.vod_name,
            vod_pic: host + item.vod_pic,
            vod_remarks: item.vod_remarks
        };
    });
    return JSON.stringify({
        list: videos,
        page: parseInt(pg),
        pagecount: parseInt(pg) + 1
    });
}
async function detail(id) {
    const url = host + id;
    const resp = await req(url, {
        headers
    });
    const html = resp.content;
    let VOD = {};
    VOD.vod_id = id;
    VOD.vod_name = pdfh(html, 'h3&&Text');
    VOD.type_name = pdfh(html, '.slide-info:contains(类型)&&Text').replace('类型 :', '');
    VOD.vod_pic = pd(html, '.detail-pic&&img&&data-src', url);
    VOD.vod_remarks = pdfh(html, '.cor5&&Text');
    VOD.vod_year = pdfh(html, '.slide-info-remarks:eq(1)&&Text');
    VOD.vod_area = pdfh(html, '.slide-info-remarks:eq(2)&&Text');
    VOD.vod_director = pdfh(html, '.slide-info:contains(导演)&&Text').replace('导演 :', '').replace(/\//g, ' ');
    VOD.vod_actor = pdfh(html, '.slide-info:contains(演员)&&Text').replace('演员 :', '').replace(/\//g, ' ');
    VOD.vod_content = pdfh(html, '.text.cor3&&Text');

    let r_ktabs = pdfa(html, '.anthology-tab&&a');
    let ktabs = r_ktabs.map(it => pdfh(it, 'Text').replace(/\s*\d+$/, '').trim());
    VOD.vod_play_from = ktabs.join('$$$');
    let klists = [];
    let r_plists = pdfa(html, '.anthology-list-play');
    r_plists.forEach((rp) => {
        let klist = pdfa(rp, 'a').map((it) => {
            return pdfh(it, 'a&&Text') + '$' + pd(it, 'a&&href', url);
        }).filter(item => {
            return !item.includes('APP播放');
        });
        klist = klist.join('#');
        klists.push(klist);
    });
    VOD.vod_play_url = klists.join('$$$');
    return JSON.stringify({
        list: [VOD]
    });
}
async function search(wd, quick, pg) {
    let p = pg || 1;
    const url = `${host}/vodsearch/${wd}----------${p}---.html`;
    const resp = await req(url, {
        headers
    });
    return JSON.stringify({
        list: getList(resp.content),
        page: parseInt(p),
        pagecount: parseInt(p) + 1
    });
}
async function play(flag, id, flags) {
    try {
        let playUrl = !/^http/.test(id) ? `${host}${id}` : id;
        let resHtml = (await req(playUrl, {
            headers
        })).content;
        let kcode = null;
        let match = resHtml.match(/var\s+player_\w+\s*=\s*(\{[^]*?\})\s*</);
        if (match) {
            kcode = safeParseJSON(match[1]);
        }
        if (!kcode || !kcode.url) {
            let aaaaMatch = resHtml.split('aaaa=');
            if (aaaaMatch.length > 1) {
                kcode = safeParseJSON(aaaaMatch[1].split('<')[0]);
            }
        }
        let kurl = kcode?.url ?? '';
        let kp = /m3u8|mp4|mkv/i.test(kurl) ? 0 : 1;
        if (kp) {
            return JSON.stringify({
                jx: 0,
                parse: 1,
                url: playUrl,
                header: headers
            });
        } else {
            return JSON.stringify({
                jx: 0,
                parse: 0,
                url: kurl,
                header: {
                    'User-Agent': headers['User-Agent'],
                    'Referer': host
                }
            });
        }
    } catch (e) {
        return JSON.stringify({
            jx: 0,
            parse: 0,
            url: '',
            header: {}
        });
    }
}

function safeParseJSON(str) {
    try {
        return JSON.parse(str.trim().replace(/;+$/, ''));
    } catch {
        return null;
    }
}
export default {
    init,
    home,
    homeVod,
    category,
    detail,
    search,
    play
};