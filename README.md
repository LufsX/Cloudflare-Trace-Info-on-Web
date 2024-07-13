# Cloudflare-Trace-Info-on-Web

自定义的在 HTML 中插入 Cloudflare 的网关跟踪信息～

默认展示 IATA 三字码，对应地区和 IP 信息

---

Customize inserting Cloudflare's gateway tracking information into HTML

Display default IATA three-letter codes corresponding to region and IP information

## 使用 Usage

在网页任意处插入以下内容

Insert the following content anywhere on the webpage

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/LufsX/Cloudflare-Trace-Info-on-Web/cftiw.min.js"></script>
<div id="cloudflare-trace-info"></div>
```

### 效果预览 Preview

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

### 可选参数 Optional

该脚本在页面加载完成 (`DOMContentLoaded`) 后将信息插入进 ID 为 `cloudflare-trace-info` 的元素中

参数有 data-hide-ip、data-hide-loc 和 data-template

- `data-hide-ip`
  - 在显示的内容中隐藏 IP 信息
- `data-hide-loc`
  - 在显示的内容中隐藏位置信息
- `data-template`
  - 自定义内容模版
  - 具体支持参数见 [/cdn-cgi/trace](https://www.cloudflare.com/cdn-cgi/trace)
  - 额外支持参数 `${iata}` IATA 地区信息

```html
<!-- 隐藏 IP 信息 -->
<div id="cloudflare-trace-info" data-hide-ip></div>
<!-- 隐藏位置信息 -->
<div id="cloudflare-trace-info" data-hide-loc></div>
<!-- 自定义内容模版 -->
<div id="cloudflare-trace-info" data-template="位置：${loc} · IP：${ip} · 数据中心：[${colo}]${iata} · TLS 版本：${tls} · 时间戳：${ts}"></div>
```

对应效果如下

```
[LHR]英国伦敦 · CN
[LHR]英国伦敦 · 114.51.4.191
位置：CN · IP：114.51.4.191 · 数据中心：[LHR]英国伦敦 · TLS 版本：TLSv1.3 · 时间戳：1720888408.335
```

当 data-template 有内容时，data-hide-ip 和 data-hide-loc 无法生效

---

The script inserts information into the element with ID `cloudflare-trace-info` after the page loads (`DOMContentLoaded`).

Parameters include `data-hide-ip`, `data-hide-loc`, and `data-template`:

- `data-hide-ip`: Hide IP information in the displayed content.
- `data-hide-loc`: Hide location information in the displayed content.
- `data-template`: Customize content template. Specific supported parameters can be found at [/cdn-cgi/trace](https://www.cloudflare.com/cdn-cgi/trace), with additional support for `${iata}` for IATA region information.

```html
<!-- Hide IP information -->
<div id="cloudflare-trace-info" data-hide-ip></div>
<!-- Hide location information -->
<div id="cloudflare-trace-info" data-hide-loc></div>
<!-- Custom content template -->
<div id="cloudflare-trace-info" data-template="Location: ${loc} · IP: ${ip} · Data Center: [${colo}]${iata} · TLS Version: ${tls} · Timestamp: ${ts}"></div>
```

Corresponding effects:

```
[LHR]London, United Kingdom · CN
[LHR]London, United Kingdom · 114.51.4.191
Location: CN · IP: 114.51.4.191 · Data Center: [LHR]London, United Kingdom · TLS Version: TLSv1.3 · Timestamp: 1720888408.335
```

When `data-template` has content, `data-hide-ip` and `data-hide-loc` cannot take effect.
