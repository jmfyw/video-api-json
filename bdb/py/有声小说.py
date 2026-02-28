# -*- coding: utf-8 -*-
import sys
import requests
import json
import re
import urllib.parse
sys.path.append('..')
from base.spider import Spider

class Spider(Spider):
    def getName(self):
        return "喜马拉雅"

    def init(self, extend=""):
        print("============喜马拉雅============")
        pass

    def homeContent(self, filter):
        result = {}
        cateManual = {
            "有声书": "youshengshu",
            "儿童": "ertong", 
            "音乐": "yinyue",
            "相声": "xiangsheng",
            "娱乐": "yule",
            "广播剧": "guangbojv",
            "历史": "lishi",
            "外语": "waiyu"
        }
        classes = []
        for k in cateManual:
            classes.append({
                'type_name': k,
                'type_id': cateManual[k]
            })
        result['class'] = classes
        return result

    def homeVideoContent(self):
        url = 'https://m.ximalaya.com/m-revision/page/category/queryCategoryAlbumsByPage?sort=0&pageSize=50&page=1&categoryCode=youshengshu'
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
        }
        rsp = self.fetch(url, headers=headers)
        content = rsp.text
        videos = self.get_list(content)
        result = {
            'list': videos
        }
        return result

    def categoryContent(self, tid, pg, filter, extend):
        result = {}
        url = 'https://m.ximalaya.com/m-revision/page/category/queryCategoryAlbumsByPage?sort=0&pageSize=50&page={0}&categoryCode={1}'.format(pg, tid)
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
        }
        rsp = self.fetch(url, headers=headers)
        content = rsp.text
        videos = self.get_list(content)
        result['list'] = videos
        result['page'] = pg
        result['pagecount'] = 9999
        result['limit'] = 90
        result['total'] = 999999
        return result

    def detailContent(self, array):
        tid = array[0]
        url = 'https://mobile.ximalaya.com/mobile/v1/album/track/ts-1720589105807?albumId={0}&pageId=1&pageSize=200&device=android&isAsc=true'.format(tid)
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
        }
        rsp = self.fetch(url, headers=headers)
        content = rsp.text
        data = json.loads(content)
        
        list_data = data['data']['list']
        maxPageId = data['data']['maxPageId']
        
        # 获取所有分页数据
        all_tracks = []
        for j in range(1, maxPageId + 1):
            page_url = url.replace('pageId=1', 'pageId={}'.format(j))
            try:
                page_rsp = self.fetch(page_url, headers=headers, timeout=2)
                page_data = json.loads(page_rsp.text)
                all_tracks.extend(page_data['data']['list'])
            except:
                continue
        
        # 构建播放列表
        playList = []
        for track in all_tracks:
            # 修复播放地址获取
            play_url = self.get_play_url(track['trackId'])
            if play_url:
                playList.append('{}${}'.format(track['title'], play_url))
        
        vod = {
            "vod_id": tid,
            "vod_name": list_data[0]['albumTitle'] if list_data else '',
            "vod_pic": list_data[0]['coverLarge'] if list_data else '',
            "vod_content": "暂无",
            "vod_play_from": "喜马拉雅",
            "vod_play_url": "#".join(playList)
        }
        
        result = {
            'list': [vod]
        }
        return result

    def get_play_url(self, track_id):
        """获取音频播放地址"""
        try:
            # 尝试获取播放地址
            play_url = f'https://www.ximalaya.com/revision/play/v1/audio?id={track_id}&ptype=1'
            headers = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36",
                "Referer": "https://www.ximalaya.com/"
            }
            rsp = self.fetch(play_url, headers=headers)
            data = json.loads(rsp.text)
            
            if data['ret'] == 200 and 'src' in data['data']:
                return data['data']['src']
            
            # 如果上面的方法失败，尝试备用方法
            return f"https://a.xmcdn.com/storages/audio/{track_id}.m4a"
            
        except Exception as e:
            print(f"获取播放地址失败: {e}")
            return f"https://a.xmcdn.com/storages/audio/{track_id}.m4a"

    def searchContent(self, key, quick):
        result = {}
        url = 'https://www.ximalaya.com/revision/search/main?core=album&page=1&rows=20&kw={}'.format(urllib.parse.quote(key))
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36"
        }
        rsp = self.fetch(url, headers=headers)
        content = rsp.text
        data = json.loads(content)['data']['album']['docs']
        
        videos = []
        for item in data:
            videos.append({
                "vod_id": item['albumId'],
                "vod_name": item['title'],
                "vod_pic": item['coverPath'],
                "vod_remarks": ''
            })
        
        result['list'] = videos
        return result

    def playerContent(self, flag, id, vipFlags):
        result = {}
        
        # 处理播放地址
        if re.search(r'm3u8|mp4|mp3|acc|m4a|wma|aac', id, re.IGNORECASE):
            result["parse"] = 0
            result["playUrl"] = ''
            result["url"] = id
            result["header"] = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36",
                "Referer": "https://www.ximalaya.com/"
            }
        else:
            # 如果id不是直接链接，尝试解析
            result["parse"] = 0
            result["playUrl"] = ''
            result["url"] = id
            result["header"] = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.6261.95 Safari/537.36",
                "Referer": "https://www.ximalaya.com/"
            }
        
        return result

    def get_list(self, content):
        videos = []
        data = json.loads(content)
        videoList = data['data']['albumBriefDetailInfos']
        
        for item in videoList:
            # 跳过付费内容
            if 'price' in item['albumInfo']:
                continue
            videos.append({
                "vod_id": item['id'],
                "vod_name": item['albumInfo']['title'],
                "vod_pic": 'https://imagev2.xmcdn.com/' + item['albumInfo']['cover'],
                "vod_remarks": ''
            })
        
        return videos

    def isVideoFormat(self, url):
        pass

    def manualVideoCheck(self):
        pass