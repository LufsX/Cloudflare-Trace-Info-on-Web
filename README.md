# Cloudflare-Trace-Info-on-Web

Customize inserting Cloudflare's gateway tracking information into HTML

自定义在 HTML 中插入 Cloudflare 的网关跟踪信息

Display default IATA three-letter codes corresponding to region and IP information

默认展示 IATA 三字码，对应地区和 IP 信息

## Usage 使用

Insert the following content anywhere on the webpage

在网页任意处引入以下内容

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/LufsX/Cloudflare-Trace-Info-on-Web/cftiw.min.js"></script>
<div id="cloudflare-trace-info"></div>
```

### Preview 效果预览

中文环境下：
In Chinese language:

```plaintext
[LHR]英国伦敦 · 114.51.4.191 · CN
```

其它环境下：
In other languages:

```plaintext
[LHR]London, United Kingdom · 114.51.4.191 · CN
```
