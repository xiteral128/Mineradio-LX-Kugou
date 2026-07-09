# 整合说明

## 项目结构

```
Minerадio-LX-Kugou/
├── package.json              # 项目配置（已更新仓库信息）
├── server.js                 # 主服务器（来自 LX-Music 版本）
├── kugou-api.js              # 酷狗 API 模块（新增）
├── dj-analyzer.js            # 节奏分析（来自原始项目）
├── lx-search.js              # LX Music 搜索（来自 LX-Music 版本）
├── lx-source-host.js         # LX Music 源管理（来自 LX-Music 版本）
├── platform-playlist-import.js # 歌单导入（来自 LX-Music 版本）
├── desktop/                  # Electron 主进程
├── public/                   # 前端 UI
├── build/                    # 构建配置
└── README.md                 # 项目说明
```

## 已完成的集成

### ✅ 基础架构
- ✅ 保留 LX-Music 的完整本地播放系统
- ✅ 保留 LX-Music 的 Electron 框架
- ✅ 保留所有依赖配置

### ✅ 酷狗模块
- ✅ 创建 `kugou-api.js` 模块
- ✅ 支持酷狗概念版 API
- ✅ 支持普通酷狗音乐 API
- ✅ 实现 QR 码登录
- ✅ 实现搜索功能
- ✅ 实现歌单获取

### ✅ 配置更新
- ✅ 更新 `package.json` 版本号为 `1.5.4-kugou`
- ✅ 更新 `package.json` 仓库信息为 `xiteral128/Mineradio-LX-Kugou`
- ✅ 在构建配置中添加 `kugou-api.js`

## 下一步需要完成的工作

### 🔧 前端集成（需要从原仓库复制）

1. **复制完整的 `public/` 目录**
   - 包含所有 HTML、CSS、JavaScript 文件
   - 包含音乐播放器 UI 组件
   
2. **复制完整的 `desktop/` 目录**
   - Electron 主进程文件
   - 窗口管理配置
   
3. **复制 `build/` 目录**
   - 构建资源（图标、安装程序配置等）

### 📝 集成点修改

当你从 LX-Music 仓库复制这些目录后，需要修改以下文件：

**在 `server.js` 中添加酷狗路由** (在第 2100 行之后添加)：

```javascript
// ===== 酷狗音乐 API 路由 =====
const kugouAPI = require('./kugou-api');

if (pn === '/api/kugou/login/qr') {
  try {
    const source = url.searchParams.get('source') || 'concept'; // concept 或 music
    const qrCode = await kugouAPI[source].getQrCode();
    sendJSON(res, qrCode);
  } catch (err) {
    sendJSON(res, { ok: false, error: err.message }, 400);
  }
  return;
}

if (pn === '/api/kugou/login/check') {
  try {
    const source = url.searchParams.get('source') || 'concept';
    const qrcodeKey = url.searchParams.get('key') || '';
    const result = await kugouAPI[source].checkQrCode(qrcodeKey);
    sendJSON(res, result);
  } catch (err) {
    sendJSON(res, { ok: false, error: err.message }, 400);
  }
  return;
}

if (pn === '/api/kugou/search') {
  try {
    const source = url.searchParams.get('source') || 'concept';
    const keyword = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1');
    const result = await kugouAPI[source].search(keyword, page);
    sendJSON(res, result);
  } catch (err) {
    sendJSON(res, { ok: false, error: err.message, songs: [] }, 502);
  }
  return;
}
```

## 编译打包

完成上述步骤后，运行：

```bash
# 安装依赖
npm install

# 开发测试
npm start

# 构建 Windows 安装包
npm run build:win
```

输出文件将在 `dist/` 目录中：
- `Mineradio.Setup.1.5.4-kugou.exe` - 安装程序
- `Mineradio.Setup.1.5.4-kugou.exe.blockmap` - 增量更新配置
- `latest.yml` - 版本信息

## 许可证

本项目采用 **GPL-3.0** License

- 保留原作者署名
- 保留开源协议
- 所有代码必须开源

## 联系方式

遇到问题？提交 Issue：  
https://github.com/xiteral128/Mineradio-LX-Kugou/issues
