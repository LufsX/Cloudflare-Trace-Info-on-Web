function fetchCloudflareTraceData() {
  return fetch("/cdn-cgi/trace")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failure to fetch Cloudflare trace data");
      }
      return response.text();
    })
    .then((text) => {
      const data = Object.fromEntries(
        text
          .trim()
          .split("\n")
          .map((line) => line.split("="))
      );
      return data;
    })
    .catch((error) => {
      return {};
    });
}

function display() {
  const info = document.getElementById("cloudflare-trace-info");
  if (!info) return;

  const hideIp = info.hasAttribute("data-hide-ip");
  const hideLoc = info.hasAttribute("data-hide-loc");

  const icaoCode = navigator.language.includes("zh")
    ? {
        AMS: "荷兰阿姆斯特丹",
        AMM: "约旦安曼",
        ADL: "澳大利亚阿德莱德",
        QWJ: "巴西阿美利加纳",
        ACC: "加纳阿克拉",
        AMD: "印度艾哈迈达巴德",
        IAD: "美国阿什本",
        AKL: "新西兰奥克兰",
        ATH: "希腊雅典",
        ARI: "智利阿里卡",
        ALG: "阿尔及利亚阿尔及尔",
        ALA: "哈萨克斯坦阿拉木图",
        LLK: "阿塞拜疆阿斯塔拉",
        ATL: "美国亚特兰大",
        BNE: "澳大利亚布里斯班",
        BCN: "西班牙巴塞罗那",
        BGW: "伊拉克巴格达",
        ASU: "巴拉圭亚松森",
        AAE: "阿尔及利亚安纳巴",
        BEG: "塞尔维亚贝尔格莱德",
        GYD: "阿塞拜疆巴库",
        BLR: "印度班加罗尔",
        TNR: "马达加斯加塔那那利佛",
        CBR: "澳大利亚堪培拉",
        BEL: "巴西贝伦",
        TXL: "德国柏林",
        BKK: "泰国曼谷",
        BOS: "美国波士顿",
        CPT: "南非开普敦",
        CNF: "巴西贝洛奥里藏特",
        BSR: "伊拉克巴士拉",
        CHC: "新西兰基督城新西兰",
        BEY: "黎巴嫩贝鲁特",
        CMN: "摩洛哥卡萨布兰卡",
        BUF: "美国纽约",
        BWN: "文莱斯里巴加湾市",
        BNU: "巴西布卢梅瑙",
        GUM: "关岛阿加尼亚",
        BTS: "斯洛伐克布拉迪斯拉发",
        BRU: "比利时布鲁塞尔",
        YYC: "加拿大艾伯塔卡尔加里",
        BOG: "哥伦比亚波哥大",
        DKR: "塞内加尔达喀尔",
        DMM: "沙特阿拉伯达曼",
        MEL: "澳大利亚墨尔本",
        DOH: "卡塔尔多哈",
        OTP: "罗马尼亚布加勒斯特",
        CLT: "美国夏洛特",
        DAR: "坦桑尼亚达累斯萨拉姆",
        BSB: "巴西巴西利亚",
        BBI: "印度布巴内斯瓦尔",
        ORD: "美国芝加哥",
        EZE: "阿根廷布宜诺斯艾利斯",
        DXB: "阿拉伯联合酋长国迪拜",
        JIB: "吉布提市",
        BUD: "匈牙利布达佩斯",
        CEB: "菲律宾宿务",
        NOU: "新喀里多尼亚努美阿",
        PER: "澳大利亚珀斯",
        DUR: "南非德班",
        KIV: "摩尔多瓦基希讷乌",
        CMH: "美国哥伦布",
        CFC: "巴西卡萨多尔",
        EBL: "伊拉克埃尔比勒",
        IXC: "印度昌迪加尔",
        DFW: "美国达拉斯",
        SYD: "澳大利亚悉尼",
        CPH: "丹麦哥本哈根",
        VCP: "巴西坎皮纳斯",
        CGD: "中国常德",
        HFA: "以色列海法",
        GBE: "博茨瓦纳哈博罗内",
        MAA: "印度金奈",
        DEN: "美国丹佛",
        ORK: "爱尔兰科克",
        HRE: "津巴布韦哈拉雷",
        JED: "沙特阿拉伯吉达",
        PPT: "法属波利尼西亚塔希提岛",
        JNB: "南非约翰内斯堡",
        KWI: "科威特科威特城",
        DUB: "都柏林爱尔兰",
        DTW: "美国底特律",
        COR: "阿根廷科尔多瓦",
        SUV: "斐济苏瓦",
        DUS: "德国杜塞尔多夫",
        BAH: "巴林麦纳麦",
        KGL: "卢旺达基加利",
        CGP: "孟加拉国吉大港",
        HNL: "美国夏威夷檀香山",
        CGB: "巴西库亚巴",
        HBA: "澳大利亚霍巴特",
        MCT: "阿曼马斯喀特",
        CMB: "斯里兰卡科伦坡",
        IAH: "美国休斯顿",
        EDI: "英国爱丁堡",
        LOS: "尼日利亚拉各斯",
        CWB: "巴西库里蒂巴",
        FRA: "德国法兰克福",
        LAD: "安哥拉罗安达",
        IND: "美国印第安纳波利斯",
        DAC: "孟加拉国达卡",
        FLN: "巴西弗洛里亚诺波利斯",
        NJF: "伊拉克纳杰夫",
        JAX: "美国杰克逊维尔",
        GVA: "瑞士日内瓦",
        FOR: "巴西福塔莱萨",
        MPM: "莫桑比克马普托",
        FUO: "中国佛山",
        XNH: "伊拉克纳西里耶",
        MBA: "肯尼亚蒙巴萨",
        MCI: "美国堪萨斯城",
        ZDM: "拉马拉",
        GOT: "瑞典哥德堡",
        GEO: "圭亚那乔治敦",
        FUK: "日本福冈",
        HAM: "德国汉堡",
        LAS: "美国拉斯维加斯",
        RUH: "沙特阿拉伯利雅得",
        NBO: "肯尼亚内罗毕",
        GYN: "巴西戈亚尼亚",
        FOC: "中国福州",
        LAX: "美国洛杉矶",
        CAN: "中国广州",
        HEL: "芬兰赫尔辛基",
        GUA: "危地马拉危地马拉城",
        ISU: "伊拉克苏莱曼尼亚",
        ORN: "阿尔及利亚奥兰",
        MFE: "美国麦卡伦",
        IST: "土耳其伊斯坦布尔",
        TLV: "以色列特拉维夫",
        GYE: "厄瓜多尔瓜亚基尔",
        HAK: "中国海口",
        OUA: "布基纳瓦加杜古布基纳法索",
        MRU: "毛里求斯路易港",
        MEM: "美国孟菲斯",
        HAN: "越南河内",
        ITJ: "巴西伊达雅伊",
        ADB: "土耳其伊兹密尔",
        KBP: "乌克兰基辅",
        MEX: "墨西哥墨西哥城",
        RUN: "法国留尼汪",
        SJW: "中国衡水",
        JOI: "巴西若茵维尔",
        MIA: "美国迈阿密",
        LIS: "葡萄牙里斯本",
        SGN: "越南胡志明市",
        TUN: "突尼斯突尼斯",
        JDO: "巴西北茹阿泽鲁",
        LHR: "英国伦敦",
        HKG: "中国香港",
        LIM: "秘鲁利马",
        MSP: "美国明尼阿波利斯",
        FIH: "刚果民主共和国金沙萨",
        LUX: "卢森堡市",
        MGM: "美国蒙哥马利",
        HYD: "印度海得拉巴",
        MAO: "巴西马瑙斯",
        CAI: "埃及开罗",
        MAD: "西班牙马德里",
        MDE: "哥伦比亚麦德林",
        YUL: "加拿大蒙特利尔",
        ISB: "巴基斯坦伊斯兰堡",
        WDH: "纳米比亚温得和克",
        MAN: "英国曼彻斯特",
        CGK: "印度尼西亚雅加达",
        NQN: "阿根廷内乌肯",
        BNA: "美国纳什维尔",
        ASK: "科特迪瓦亚穆苏克罗",
        EWR: "美国纽瓦克",
        MRS: "法国马赛",
        PTY: "巴拿马巴拿马城",
        JSR: "孟加拉国杰肖尔",
        ABJ: "科特迪瓦阿比让",
        MXP: "意大利米兰",
        TNA: "中国济南",
        ORF: "美国诺福克",
        PBM: "苏里南帕拉马里博",
        OMA: "美国奥马哈",
        POA: "巴西阿雷格里港",
        MSQ: "白俄罗斯",
        DME: "俄罗斯莫斯科",
        JHB: "马来西亚新山",
        YOW: "加拿大渥太华",
        UIO: "厄瓜多尔基多",
        MUC: "德国慕尼黑",
        PHL: "美国费城",
        KNU: "印度坎普尔",
        PHX: "美国凤凰城",
        LCA: "塞浦路斯尼科西亚",
        KHH: "中国台湾高雄",
        REC: "巴西累西腓",
        OSL: "挪威奥斯陆",
        PIT: "美国匹兹堡",
        KHI: "巴基斯坦卡拉奇",
        RAO: "巴西里贝朗普雷图",
        GIG: "巴西里约热内卢",
        PDX: "美国波特兰",
        KTM: "尼泊尔加德满都",
        PMO: "意大利巴勒莫",
        CDG: "法国巴黎",
        QRO: "墨西哥墨西哥克雷塔罗",
        PRG: "捷克共和国布拉格",
        RIC: "美国里士满",
        CCU: "印度加尔各答",
        SJO: "哥斯达黎加圣何塞",
        SCL: "智利圣地亚哥",
        KEF: "冰岛雷克雅未克",
        SMF: "美国萨克拉门托",
        KJA: "俄罗斯克拉斯诺亚尔斯克",
        KUL: "马来西亚吉隆坡",
        SLC: "美国盐湖城",
        RIX: "拉脱维亚里加",
        SDQ: "多米尼加共和国圣多明各",
        FCO: "意大利罗马",
        SAN: "美国圣地亚哥",
        LHE: "巴基斯坦拉合尔",
        SJP: "巴西普雷图河畔圣若泽",
        SJC: "美国圣何塞",
        LED: "俄罗斯圣彼得堡",
        PKX: "中国廊坊",
        SJK: "巴西圣若泽杜斯坎普斯",
        GRU: "巴西圣保罗",
        SOF: "保加利亚索非亚",
        YXE: "加拿大萨斯卡通",
        LHW: "中国兰州",
        SEA: "美国西雅图",
        ARN: "瑞典斯德哥尔摩",
        SOD: "巴西索罗卡巴",
        MFM: "澳门",
        FSD: "苏福尔斯",
        STR: "斯图加特德国",
        STL: "圣路易斯",
        TLL: "爱沙尼亚塔林",
        MLE: "马尔代夫马累",
        TGU: "洪都拉斯特古西加尔巴",
        TLH: "美国塔拉哈西",
        TBS: "格鲁吉亚第比利斯",
        MDL: "缅甸曼德勒",
        NVT: "巴西廷博",
        MNL: "菲律宾马尼拉",
        SKG: "希腊塞萨洛尼基",
        UDI: "巴西乌贝兰迪亚",
        YYZ: "加拿大多伦多",
        BOM: "印度孟买",
        TIA: "阿尔巴尼亚地拉那",
        VIX: "巴西维多利亚",
        YVR: "加拿大温哥华",
        NAG: "印度那格浦尔",
        KLD: "俄罗斯联邦特维尔",
        VIE: "奥地利维也纳",
        YWG: "加拿大温尼伯",
        OKA: "日本那霸",
        CAW: "巴西坎波斯多斯戈伊塔卡泽斯",
        DEL: "印度新德里",
        VNO: "立陶宛维尔纽斯",
        SFO: "美国旧金山",
        XAP: "巴西沙佩科",
        WAW: "波兰华沙",
        KIX: "日本大阪",
        KIN: "牙买加金斯敦",
        BGI: "巴巴多斯布里奇敦",
        SVX: "俄罗斯叶卡捷琳堡",
        PAT: "印度巴特那",
        BGR: "美国班戈",
        GND: "格林纳达圣乔治",
        ZAG: "克罗地亚萨格勒布",
        PNH: "柬埔寨金边",
        AUS: "美国奥斯汀",
        STI: "多米尼加共和国圣地亚哥",
        ZRH: "瑞士苏黎世",
        TAO: "中国青岛",
        ABQ: "美国阿尔伯克基",
        LPB: "玻利维亚拉巴斯",
        ICN: "韩国首尔",
        LYS: "法国里昂",
        GDL: "墨西哥瓜达拉哈拉",
        SHA: "中国上海",
        BOD: "法国波尔多",
        SAT: "美国圣安东尼奥",
        SJU: "波多黎各圣胡安",
        SIN: "新加坡",
        CLE: "美国克利夫兰",
        BAQ: "哥伦比亚巴兰基亚",
        SKP: "北马其顿斯科普里",
        URT: "素叻他尼泰国",
        RDU: "美国达勒姆",
        PMW: "巴西帕尔马斯",
        TPE: "中国台湾台北",
        OKC: "美国俄克拉荷马城",
        ARU: "巴西阿拉萨图巴",
        TAS: "乌兹别克斯坦塔什干",
        TPA: "美国坦帕",
        ANC: "美国安克雷奇",
        TSN: "中国天津",
        YHZ: "加拿大哈利法克斯",
        NRT: "日本东京",
        ULN: "蒙古乌兰巴托",
        VTE: "老挝万象",
        KHN: "中国新余",
        RGN: "缅甸仰光",
        EVN: "亚美尼亚埃里温",
        JOG: "印度尼西亚日惹",
        ZGN: "中国中山",
        CGY: "菲律宾卡加延德奥罗",
        WHU: "中国芜湖",
        HYN: "中国台州",
        COK: "印度科钦",
        DPS: "印度尼西亚登巴萨",
        CNN: "印度坎努尔",
        SZX: "中国深圳",
        KWE: "中国贵阳",
        HGH: "中国绍兴",
        CZX: "中国常州",
        KMG: "中国昆明",
        CNX: "泰国清迈",
        CGO: "中国郑州",
        TYN: "中国阳泉",
        CSX: "中国长沙",
        DLC: "中国大连",
        BHY: "中国北海",
        CKG: "重庆中国",
        HFE: "中国淮南",
        XFN: "中国襄阳",
        XNN: "中国西宁",
        DAD: "越南岘港",
        JXG: "中国嘉兴",
        CRK: "菲律宾塔拉克市",
        PBH: "不丹廷布",
        XIY: "中国宝鸡",
      }
    : {
        AMS: "Amsterdam, Netherlands",
        AMM: "Amman, Jordan",
        ADL: "Adelaide, SA, Australia",
        QWJ: "Americana, Brazil",
        ACC: "Accra, Ghana",
        AMD: "Ahmedabad, India",
        IAD: "Ashburn, VA, United States",
        AKL: "Auckland, New Zealand",
        ATH: "Athens, Greece",
        ARI: "Arica, Chile",
        ALG: "Algiers, Algeria",
        ALA: "Almaty, Kazakhstan",
        LLK: "Astara, Azerbaijan",
        ATL: "Atlanta, GA, United States",
        BNE: "Brisbane, QLD, Australia",
        BCN: "Barcelona, Spain",
        BGW: "Baghdad, Iraq",
        ASU: "Asunción, Paraguay",
        AAE: "Annaba, Algeria",
        BEG: "Belgrade, Serbia",
        GYD: "Baku, Azerbaijan",
        BLR: "Bangalore, India",
        TNR: "Antananarivo, Madagascar",
        CBR: "Canberra, ACT, Australia",
        BEL: "Belém, Brazil",
        TXL: "Berlin, Germany",
        BKK: "Bangkok, Thailand",
        BOS: "Boston, MA, United States",
        CPT: "Cape Town, South Africa",
        CNF: "Belo Horizonte, Brazil",
        BSR: "Basra, Iraq",
        CHC: "Christchurch, New Zealand",
        BEY: "Beirut, Lebanon",
        CMN: "Casablanca, Morocco",
        BUF: "Buffalo, NY, United States",
        BWN: "Bandar Seri Begawan, Brunei",
        BNU: "Blumenau, Brazil",
        GUM: "Hagatna, Guam",
        BTS: "Bratislava, Slovakia",
        BRU: "Brussels, Belgium",
        YYC: "Calgary, AB, Canada",
        BOG: "Bogotá, Colombia",
        DKR: "Dakar, Senegal",
        DMM: "Dammam, Saudi Arabia",
        MEL: "Melbourne, VIC, Australia",
        DOH: "Doha, Qatar",
        OTP: "Bucharest, Romania",
        CLT: "Charlotte, NC, United States",
        DAR: "Dar Es Salaam, Tanzania",
        BSB: "Brasilia, Brazil",
        BBI: "Bhubaneswar, India",
        ORD: "Chicago, IL, United States",
        EZE: "Buenos Aires, Argentina",
        DXB: "Dubai, United Arab Emirates",
        JIB: "Djibouti City, Djibouti",
        BUD: "Budapest, Hungary",
        CEB: "Cebu, Philippines",
        NOU: "Noumea, New Caledonia",
        PER: "Perth, WA, Australia",
        DUR: "Durban, South Africa",
        KIV: "Chișinău, Moldova",
        CMH: "Columbus, OH, United States",
        CFC: "Caçador, Brazil",
        EBL: "Erbil, Iraq",
        IXC: "Chandigarh, India",
        DFW: "Dallas, TX, United States",
        SYD: "Sydney, NSW, Australia",
        CPH: "Copenhagen, Denmark",
        VCP: "Campinas, Brazil",
        CGD: "Changde, China",
        HFA: "Haifa, Israel",
        GBE: "Gaborone, Botswana",
        MAA: "Chennai, India",
        DEN: "Denver, CO, United States",
        ORK: "Cork, Ireland",
        HRE: "Harare, Zimbabwe",
        JED: "Jeddah, Saudi Arabia",
        PPT: "Tahiti, French Polynesia",
        JNB: "Johannesburg, South Africa",
        KWI: "Kuwait City, Kuwait",
        DUB: "Dublin, Ireland",
        DTW: "Detroit, MI, United States",
        COR: "Córdoba, Argentina",
        SUV: "Suva, Fiji",
        DUS: "Düsseldorf, Germany",
        BAH: "Manama, Bahrain",
        KGL: "Kigali, Rwanda",
        CGP: "Chittagong, Bangladesh",
        HNL: "Honolulu, HI, United States",
        CGB: "Cuiabá, Brazil",
        HBA: "Hobart, Australia",
        MCT: "Muscat, Oman",
        CMB: "Colombo, Sri Lanka",
        IAH: "Houston, TX, United States",
        EDI: "Edinburgh, United Kingdom",
        LOS: "Lagos, Nigeria",
        CWB: "Curitiba, Brazil",
        FRA: "Frankfurt, Germany",
        LAD: "Luanda, Angola",
        IND: "Indianapolis, IN, United States",
        DAC: "Dhaka, Bangladesh",
        FLN: "Florianopolis, Brazil",
        NJF: "Najaf, Iraq",
        JAX: "Jacksonville, FL, United States",
        GVA: "Geneva, Switzerland",
        FOR: "Fortaleza, Brazil",
        MPM: "Maputo, Mozambique",
        FUO: "Foshan, China",
        XNH: "Nasiriyah, Iraq",
        MBA: "Mombasa, Kenya",
        MCI: "Kansas City, MO, United States",
        ZDM: "Ramallah",
        GOT: "Gothenburg, Sweden",
        GEO: "Georgetown, Guyana",
        FUK: "Fukuoka, Japan",
        HAM: "Hamburg, Germany",
        LAS: "Las Vegas, NV, United States",
        RUH: "Riyadh, Saudi Arabia",
        NBO: "Nairobi, Kenya",
        GYN: "Goiânia, Brazil",
        FOC: "Fuzhou, China",
        LAX: "Los Angeles, CA, United States",
        CAN: "Guangzhou, China",
        HEL: "Helsinki, Finland",
        GUA: "Guatemala City, Guatemala",
        ISU: "Sulaymaniyah, Iraq",
        ORN: "Oran, Algeria",
        MFE: "McAllen, TX, United States",
        IST: "Istanbul, Turkey",
        TLV: "Tel Aviv, Israel",
        GYE: "Guayaquil, Ecuador",
        HAK: "Haikou, China",
        OUA: "Ouagadougou, Burkina Faso",
        MRU: "Port Louis, Mauritius",
        MEM: "Memphis, TN, United States",
        HAN: "Hanoi, Vietnam",
        ITJ: "Itajaí, Brazil",
        ADB: "Izmir, Turkey",
        KBP: "Kyiv, Ukraine",
        MEX: "Mexico City, Mexico",
        RUN: "Réunion, France",
        SJW: "Hengshui, China",
        JOI: "Joinville, Brazil",
        MIA: "Miami, FL, United States",
        LIS: "Lisbon, Portugal",
        SGN: "Ho Chi Minh City, Vietnam",
        TUN: "Tunis, Tunisia",
        JDO: "Juazeiro do Norte, Brazil",
        LHR: "London, United Kingdom",
        HKG: "Hong Kong",
        LIM: "Lima, Peru",
        MSP: "Minneapolis, MN, United States",
        FIH: "Kinshasa, DR Congo",
        LUX: "Luxembourg City, Luxembourg",
        MGM: "Montgomery, AL, United States",
        HYD: "Hyderabad, India",
        MAO: "Manaus, Brazil",
        CAI: "Cairo, Egypt",
        MAD: "Madrid, Spain",
        MDE: "Medellín, Colombia",
        YUL: "Montréal, QC, Canada",
        ISB: "Islamabad, Pakistan",
        WDH: "Windhoek, Namibia",
        MAN: "Manchester, United Kingdom",
        CGK: "Jakarta, Indonesia",
        NQN: "Neuquén, Argentina",
        BNA: "Nashville, United States",
        ASK: "Yamoussoukro, Ivory Coast",
        EWR: "Newark, NJ, United States",
        MRS: "Marseille, France",
        PTY: "Panama City, Panama",
        JSR: "Jashore, Bangladesh",
        ABJ: "Abidjan, Ivory Coast",
        MXP: "Milan, Italy",
        TNA: "Jinan, China",
        ORF: "Norfolk, VA, United States",
        PBM: "Paramaribo, Suriname",
        OMA: "Omaha, NE, United States",
        POA: "Porto Alegre, Brazil",
        MSQ: "Minsk, Belarus",
        DME: "Moscow, Russia",
        JHB: "Johor Bahru, Malaysia",
        YOW: "Ottawa, Canada",
        UIO: "Quito, Ecuador",
        MUC: "Munich, Germany",
        PHL: "Philadelphia, United States",
        KNU: "Kanpur, India",
        PHX: "Phoenix, AZ, United States",
        LCA: "Nicosia, Cyprus",
        KHH: "Kaohsiung City, Taiwan",
        REC: "Recife, Brazil",
        OSL: "Oslo, Norway",
        PIT: "Pittsburgh, PA, United States",
        KHI: "Karachi, Pakistan",
        RAO: "Ribeirao Preto, Brazil",
        GIG: "Rio de Janeiro, Brazil",
        PDX: "Portland, OR, United States",
        KTM: "Kathmandu, Nepal",
        PMO: "Palermo, Italy",
        CDG: "Paris, France",
        QRO: "Queretaro, MX, Mexico",
        PRG: "Prague, Czech Republic",
        RIC: "Richmond, VA, United States",
        CCU: "Kolkata, India",
        SJO: "San José, Costa Rica",
        SCL: "Santiago, Chile",
        KEF: "Reykjavík, Iceland",
        SMF: "Sacramento, CA, United States",
        KJA: "Krasnoyarsk, Russia",
        KUL: "Kuala Lumpur, Malaysia",
        SLC: "Salt Lake City, UT, United States",
        RIX: "Riga, Latvia",
        SDQ: "Santo Domingo, Dominican Republic",
        FCO: "Rome, Italy",
        SAN: "San Diego, CA, United States",
        LHE: "Lahore, Pakistan",
        SJP: "São José do Rio Preto, Brazil",
        SJC: "San Jose, CA, United States",
        LED: "Saint Petersburg, Russia",
        PKX: "Langfang, China",
        SJK: "São José dos Campos, Brazil",
        GRU: "São Paulo, Brazil",
        SOF: "Sofia, Bulgaria",
        YXE: "Saskatoon, SK, Canada",
        LHW: "Lanzhou, China",
        SEA: "Seattle, WA, United States",
        ARN: "Stockholm, Sweden",
        SOD: "Sorocaba, Brazil",
        MFM: "Macau",
        FSD: "Sioux Falls, South Dakota",
        STR: "Stuttgart, Germany",
        STL: "St. Louis, MO, United States",
        TLL: "Tallinn, Estonia",
        MLE: "Malé, Maldives",
        TGU: "Tegucigalpa, Honduras",
        TLH: "Tallahassee, FL, United States",
        TBS: "Tbilisi, Georgia",
        MDL: "Mandalay, Myanmar",
        NVT: "Timbó, Brazil",
        MNL: "Manila, Philippines",
        SKG: "Thessaloniki, Greece",
        UDI: "Uberlândia, Brazil",
        YYZ: "Toronto, ON, Canada",
        BOM: "Mumbai, India",
        TIA: "Tirana, Albania",
        VIX: "Vitoria, Brazil",
        YVR: "Vancouver, BC, Canada",
        NAG: "Nagpur, India",
        KLD: "Tver, Russian Federation",
        VIE: "Vienna, Austria",
        YWG: "Winnipeg, MB, Canada",
        OKA: "Naha, Japan",
        CAW: "Campos dos Goytacazes, Brazil",
        DEL: "New Delhi, India",
        VNO: "Vilnius, Lithuania",
        SFO: "San Francisco, United States",
        XAP: "Chapeco, Brazil",
        WAW: "Warsaw, Poland",
        KIX: "Osaka, Japan",
        KIN: "Kingston, Jamaica",
        BGI: "Bridgetown, Barbados",
        SVX: "Yekaterinburg, Russia",
        PAT: "Patna, India",
        BGR: "Bangor, United States",
        GND: "St. George's, Grenada",
        ZAG: "Zagreb, Croatia",
        PNH: "Phnom Penh, Cambodia",
        AUS: "Austin, United States",
        STI: "Santiago de los Caballeros, Dominican Republic",
        ZRH: "Zürich, Switzerland",
        TAO: "Qingdao, China",
        ABQ: "Albuquerque, United States",
        LPB: "La Paz, Bolivia",
        ICN: "Seoul, South Korea",
        LYS: "Lyon, France",
        GDL: "Guadalajara, Mexico",
        SHA: "Shanghai, China",
        BOD: "Bordeaux, France",
        SAT: "San Antonio, United States",
        SJU: "San Juan, Puerto Rico",
        SIN: "Singapore, Singapore",
        CLE: "Cleveland, United States",
        BAQ: "Barranquilla, Colombia",
        SKP: "Skopje, North Macedonia",
        URT: "Surat Thani, Thailand",
        RDU: "Durham, United States",
        PMW: "Palmas, Brazil",
        TPE: "Taipei, Taiwan",
        OKC: "Oklahoma City, United States",
        ARU: "Aracatuba, Brazil",
        TAS: "Tashkent, Uzbekistan",
        TPA: "Tampa, United States",
        ANC: "Anchorage, United States",
        TSN: "Tianjin, China",
        YHZ: "Halifax, Canada",
        NRT: "Tokyo, Japan",
        ULN: "Ulaanbaatar, Mongolia",
        VTE: "Vientiane, Laos",
        KHN: "Xinyu, China",
        RGN: "Yangon, Myanmar",
        EVN: "Yerevan, Armenia",
        JOG: "Yogyakarta, Indonesia",
        ZGN: "Zhongshan, China",
        CGY: "Cagayan de Oro, Philippines",
        WHU: "Wuhu, China",
        HYN: "Taizhou, China",
        COK: "Kochi, India",
        DPS: "Denpasar, Indonesia",
        CNN: "Kannur, India",
        SZX: "Shenzhen, China",
        KWE: "Guiyang, China",
        HGH: "Shaoxing, China",
        CZX: "Changzhou, China",
        KMG: "Kunming, China",
        CNX: "Chiang Mai, Thailand",
        CGO: "Zhengzhou, China",
        TYN: "Yangquan, China",
        CSX: "Changsha, China",
        DLC: "Dalian, China",
        BHY: "Beihai, China",
        CKG: "Chongqing, China",
        HFE: "Huainan, China",
        XFN: "Xiangyang, China",
        XNN: "Xining, China",
        DAD: "Da Nang, Vietnam",
        JXG: "Jiaxing, China",
        CRK: "Tarlac City, Philippines",
        PBH: "Thimphu, Bhutan",
        XIY: "Baoji, China",
      };

  fetchCloudflareTraceData()
    .then((data) => {
      let template = info.getAttribute("data-template");

      if (template) {
        Object.keys(data).forEach((key) => {
          const value = data[key];
          template = template.replace(new RegExp(`\\$\\{${key}\\}`, "g"), value || "");
        });
        template = template.replace("${icao}", icaoCode[data.colo] || "");
      } else {
        template = `
              ${`[${data.colo}]${icaoCode[data.colo]}`}
              ${!hideIp ? ` · ${data.ip}` : ""}
              ${!hideLoc ? ` · ${data.loc} ` : ""}
            `;
      }

      info.innerHTML = template.trim();
    })
    .catch((error) => {
      info.innerHTML = "Unable to display info.";
    });
}

document.addEventListener("DOMContentLoaded", display);