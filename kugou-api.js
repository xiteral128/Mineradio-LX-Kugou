// ====================================================================
// Kugou Music API 模块
// 支持酷狗概念版和普通版
// 从 Mineradio-Extended 提取和整合
// ====================================================================

let kugouCookie = '';
let kugouMusicCookie = '';

function saveKugouCookie(c) {
  try {
    kugouCookie = String(c || '');
  } catch (e) {
    kugouCookie = '';
  }
}

function saveKugouMusicCookie(c) {
  try {
    kugouMusicCookie = String(c || '');
  } catch (e) {
    kugouMusicCookie = '';
  }
}

const kugouAPI = {
  // 酷狗概念版
  concept: {
    getCookie: () => kugouCookie,
    setCookie: saveKugouCookie,
    
    // QR 码生成
    async getQrCode() {
      try {
        const resp = await fetch('https://conceptapi.kg.qq.com/user/login/qrcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}),
        });
        const data = await resp.json();
        return { ok: data.status === 0, data: data.data || {} };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    },
    
    // 查询 QR 码状态
    async checkQrCode(qrcodeKey) {
      try {
        const resp = await fetch('https://conceptapi.kg.qq.com/user/login/qrcode_check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrcodeKey }),
        });
        const data = await resp.json();
        if (data.status === 0 && data.data && data.data.cookie) {
          saveKugouCookie(data.data.cookie);
          return { ok: true, cookie: data.data.cookie };
        }
        return { ok: false, status: data.status };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    },
    
    // 搜索
    async search(keyword, page = 1, pageSize = 30) {
      try {
        const params = new URLSearchParams({
          keyword,
          page,
          pagesize: pageSize,
          kugou: 1,
        });
        const resp = await fetch(`https://conceptapi.kg.qq.com/musicsearch/search?${params}`, {
          headers: { Cookie: kugouCookie || '' },
        });
        const data = await resp.json();
        return { ok: data.status === 0, songs: data.data?.list || [] };
      } catch (err) {
        return { ok: false, error: err.message, songs: [] };
      }
    },
    
    // 获取用户歌单
    async getUserPlaylists() {
      try {
        const resp = await fetch('https://conceptapi.kg.qq.com/user/playlist/list', {
          headers: { Cookie: kugouCookie || '' },
        });
        const data = await resp.json();
        return { ok: data.status === 0, playlists: data.data || [] };
      } catch (err) {
        return { ok: false, error: err.message, playlists: [] };
      }
    },
    
    // 获取歌单详情
    async getPlaylistDetail(playlistId) {
      try {
        const resp = await fetch(`https://conceptapi.kg.qq.com/playlist/detail?playlistId=${playlistId}`, {
          headers: { Cookie: kugouCookie || '' },
        });
        const data = await resp.json();
        return { ok: data.status === 0, songs: data.data?.tracks || [] };
      } catch (err) {
        return { ok: false, error: err.message, songs: [] };
      }
    },
    
    // 获取播放 URL
    async getPlayUrl(songId, quality = 'high') {
      try {
        const params = new URLSearchParams({ songid: songId, quality });
        const resp = await fetch(`https://conceptapi.kg.qq.com/music/play?${params}`, {
          headers: { Cookie: kugouCookie || '' },
        });
        const data = await resp.json();
        return {
          ok: data.status === 0,
          url: data.data?.playUrl || '',
          quality: data.data?.quality || 'standard',
        };
      } catch (err) {
        return { ok: false, error: err.message, url: '' };
      }
    },
  },
  
  // 普通酷狗音乐
  music: {
    getCookie: () => kugouMusicCookie,
    setCookie: saveKugouMusicCookie,
    
    async getQrCode() {
      try {
        const resp = await fetch('https://m.kugou.com/api/user/login/qrcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        return { ok: data.code === 0, data: data.data || {} };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    },
    
    async checkQrCode(qrcodeKey) {
      try {
        const resp = await fetch('https://m.kugou.com/api/user/login/qrcode_check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ qrcodeKey }),
        });
        const data = await resp.json();
        if (data.code === 0 && data.data && data.data.cookie) {
          saveKugouMusicCookie(data.data.cookie);
          return { ok: true, cookie: data.data.cookie };
        }
        return { ok: false, code: data.code };
      } catch (err) {
        return { ok: false, error: err.message };
      }
    },
    
    async search(keyword, page = 1, pageSize = 30) {
      try {
        const params = new URLSearchParams({
          keyword,
          page,
          pagesize: pageSize,
        });
        const resp = await fetch(`https://m.kugou.com/api/musicsearch/search?${params}`, {
          headers: { Cookie: kugouMusicCookie || '' },
        });
        const data = await resp.json();
        return { ok: data.code === 0, songs: data.data?.list || [] };
      } catch (err) {
        return { ok: false, error: err.message, songs: [] };
      }
    },
  },
};

module.exports = kugouAPI;
