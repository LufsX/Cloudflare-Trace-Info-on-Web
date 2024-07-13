import requests
import json

# 从 Cloudflare 节点状态中获取，目前共 329 个
url = "https://www.cloudflarestatus.com/api/v2/components.json"

response = requests.get(url)
data = response.json()

components = data.get("components", [])
exclude_ids = set()
for component in components:
    # 排除掉在  Cloudflare Sites and Services 中的内容
    if component.get("id") == "1km35smx8p41":
        exclude_ids = set(component.get("components", []))
        break

result = {}

for component in components:
    comp_id = component.get("id")
    name = component.get("name")

    # 跳过排除列表
    if comp_id in exclude_ids:
        continue

    # 除了排除列表的，有名字的且包含「-」的只有节点
    if name and "-" in name:
        parts = name.split("-")
        if len(parts) == 2:
            location = parts[0].strip()
            code = parts[1].strip().strip("()")
            result[code] = location

print(json.dumps(result, ensure_ascii=False, indent=4))

# 保存结果
with open("cloudflare-icao.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)
