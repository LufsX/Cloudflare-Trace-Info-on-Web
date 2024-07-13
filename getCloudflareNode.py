import requests
import json

# 从 Cloudflare 节点状态中获取，目前（2024-07-13）共 329 个
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

# 保存结果
with open("cloudflare-icao.json", "w", encoding="utf-8", newline="\n") as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

# # 保存临时结果
# with open("test-cloudflare-icao-zh.txt", "w", encoding="utf-8", newline="\n") as f:
#     locations = [loc + "\n" for loc in result.values()]
#     f.writelines(locations)

# # 手动翻译后替换 test-cloudflare-icao-zh.txt 的内容
# # 然后注释保存临时结果的代码后运行以下部分（
# replaced_data = {}
# with open('test-cloudflare-icao-zh.txt', 'r', encoding='utf-8') as f:
#     cities = [line.strip() for line in f if line.strip()]
# for index, city in enumerate(cities):
#     code = list(result.keys())[index]
#     replaced_data[code] = city
# # 写入替换翻译后的
# with open('cloudflare-icao-zh.json', 'w', encoding='utf-8', newline="\n") as f:
#     json.dump(replaced_data, f, ensure_ascii=False, indent=2)
