async function fetchCloudflareTraceData() {
  try {
    const response = await fetch("/cdn-cgi/trace");
    if (!response.ok) throw new Error("Failed to fetch Cloudflare trace data");
    const text = await response.text();
    return Object.fromEntries(
      text
        .trim()
        .split("\n")
        .map((line) => line.split("="))
    );
  } catch (error) {
    console.error("Unexpected FFCTD error: ", error);
  }
}

async function fetchIATAData(colo, language) {
  try {
    const response = await fetch(`https://iata.isteed.cc/${language}/${colo}`);
    if (!response.ok) throw new Error("Failed to fetch IATA data");
    return response.text();
  } catch (error) {
    console.error("Unexpected FID error: ", error);
  }
}

async function display() {
  const elements = document.querySelectorAll(".cloudflare-trace-info");
  if (!elements.length) return;

  const language = navigator.language.includes("zh") ? "zh" : "en";

  try {
    const data = await fetchCloudflareTraceData();

    const iataPromises = Array.from(elements).map(async (info) => {
      const hideIp = info.hasAttribute("data-hide-ip");
      const hideLoc = info.hasAttribute("data-hide-loc");
      let template = info.getAttribute("data-template");

      if (template) {
        Object.entries(data).forEach(([key, value]) => {
          template = template.replace(new RegExp(`\\$\\{${key}\\}`, "g"), value || "");
        });
      } else {
        template = `[${data.colo}]\${iata}${!hideIp ? ` · ${data.ip}` : ""}${!hideLoc ? ` · ${data.loc}` : ""}`;
      }

      if (template.includes("${iata}")) {
        const iataData = await fetchIATAData(data.colo, language);
        template = template.replace("${iata}", iataData || "");
      }

      info.innerHTML = template.trim();
    });

    await Promise.all(iataPromises);
  } catch (error) {
    console.error("Unexpected DISPLAY error: ", error);
  }
}

document.addEventListener("DOMContentLoaded", display);
