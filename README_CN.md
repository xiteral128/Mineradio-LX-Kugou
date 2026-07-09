# Mineradio LX-Kugou 整合版

这是一款融合 **LX Music 本地播放** 和 **酷狗音乐登录** 的沉浸式桌面音乐播放器。

基于：
- [`ww085213/Mineradio-LX-Music`](https://github.com/ww085213/Mineradio-LX-Music) - 本地播放和 LX Music 支持
- [`daaimengermengzhu/Mineradio-Extended`](https://github.com/daaimengermengzhu/Mineradio-Extended) - 酷狗音乐接入
- [`XxHuberrr/Mineradio`](https://github.com/XxHuberrr/Mineradio) - 原始项目

## 主要功能

✅ **本地音乐播放** - 支持导入本地文件夹，自动管理音乐库  
✅ **LX Music 兼容** - 导入 LX Music 歌单和音源脚本  
✅ **酷狗音乐登录** - 支持扫码登录酷狗账户  
✅ **歌单同步** - 从酷狗获取个人歌单和收藏  
✅ **歌词舞台** - 实时歌词显示和3D舞台效果  
✅ **粒子可视化** - 高级音乐可视化效果  
✅ **跨平台搜索** - 在多个音源中搜索歌曲  
✅ **音质识别** - 显示酷狗音质等级（Hi-Res、无损等）  

## 快速开始

### Windows 用户
1. 从 [Release](../../releases) 页面下载 `Mineradio.Setup.*.exe`
2. 运行安装程序
3. 从桌面快捷方式启动应用

### 开发者

```bash
# 安装依赖
npm install

# 开发模式
npm start

# 构建 Windows 安装包
npm run build:win

# 构建 macOS
npm run build:mac
```

## 功能对比

| 特性 | LX-Music | Extended | LX-Kugou |
|------|----------|----------|----------|
| 本地播放 | ✅ | ✅ | ✅ |
| LX Music | ✅ | ❌ | ✅ |
| 酷狗登录 | ❌ | ✅ | ✅ |
| 歌词舞台 | ✅ | ✅ | ✅ |
| 粒子可视化 | ✅ | ✅ | ✅ |
| 3D歌单架 | ✅ | ✅ | ✅ |

## 使用说明

### 第一次启动
1. 启动应用后，在左侧菜单选择 **本地播放** 或 **酷狗登录**
2. 如果选择 **本地播放**，点击导入本地文件夹
3. 如果选择 **酷狗**，扫描二维码进行账户登录

### 酷狗登录
- 点击 **酷狗** 选项卡
- 扫描二维码登录你的酷狗账户
- 成功后可以访问个人歌单和收藏

### 本地播放
- 点击 **本地** 选项卡
- 导入包含音乐文件的文件夹
- 支持导入 LX Music 歌单文件
- 支持导入音源脚本扩展播放源

## 版权说明

- 本项目采用 GPL-3.0 License
- 保留原项目作者的署名和致谢
- 酷狗音乐模块来自 Mineradio-Extended (Austin 维护)
- LX Music 模块来自 Mineradio-LX-Music (ww085213 维护)

## 使用限制

- 本项目不提供绕过付费、破解音质或其他违法功能
- 酷狗登录仅用于个人账户播放辅助
- 所有音乐内容来自用户自有账户或本地文件

## 常见问题

**Q: 需要同时安装 LX Music 吗？**  
A: 不需要。本地播放完全独立，LX Music 只用于歌单和脚本导入。

**Q: 酷狗登录安全吗？**  
A: 使用官方二维码登录，登录信息本地保存，不上传第三方服务器。

**Q: 能同时播放两个源吗？**  
A: 暂不支持，需要在本地和酷狗之间手动切换。

## 反馈

遇到问题？提交 Issue：  
https://github.com/xiteral128/Mineradio-LX-Kugou/issues

## 致谢

- Mineradio 原作者：XxHuberrr
- LX Music 版本维护：ww085213
- Extended 版本维护：daaimengermengzhu (Austin)
- 本整合版维护：xiteral128

---

**免责声明**：本项目仅供学习交流使用，不提供绕过付费、破解音质或其他违规功能。
