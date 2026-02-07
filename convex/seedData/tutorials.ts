// Tutorial seed data - easier to edit in a separate file
export const tutorialSeedData = [
  // COMPOSTING TUTORIALS
  {
    slug: "pit-composting-beginners",
    category: "composting",
    title: {
      en: "Pit Composting for Beginners",
      sw: "Kutengeneza Mboji kwa Shimo kwa Wanaoanza",
    },
    description: {
      en: "Learn the traditional pit composting method - simple, low-cost, and perfect for small farms.",
      sw: "Jifunze njia ya jadi ya kutengeneza mboji kwa shimo - rahisi, bei nafuu, na inafaa mashamba madogo.",
    },
    difficulty: "beginner",
    duration: "6-8 weeks",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Choose the Right Location", sw: "Chagua Mahali Pazuri" },
        content: {
          en: "Select a shaded area near your garden but away from water sources. The pit should be at least 3 meters from any well or borehole to prevent contamination.",
          sw: "Chagua eneo lenye kivuli karibu na bustani yako lakini mbali na vyanzo vya maji. Shimo linapaswa kuwa angalau mita 3 kutoka kisima chochote ili kuzuia uchafuzi.",
        },
        tipText: {
          en: "A spot under a tree provides natural shade and keeps the compost cool.",
          sw: "Mahali chini ya mti hutoa kivuli cha asili na kuweka mboji baridi.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Dig the Pit", sw: "Chimba Shimo" },
        content: {
          en: "Dig a pit about 1 meter deep, 1 meter wide, and 2 meters long. This size is manageable for one person and holds enough material for good decomposition.",
          sw: "Chimba shimo lenye kina cha mita 1, upana wa mita 1, na urefu wa mita 2. Ukubwa huu unaweza kushughulikiwa na mtu mmoja na kushikilia vifaa vya kutosha kwa kuoza vizuri.",
        },
        tipText: {
          en: "Save the topsoil separately - you'll use it to cover the compost layers.",
          sw: "Hifadhi udongo wa juu kando - utautumia kufunika tabaka za mboji.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Add Brown Materials First", sw: "Ongeza Vifaa vya Kahawia Kwanza" },
        content: {
          en: "Start with a 15cm layer of dry brown materials like maize stalks, dry leaves, or straw. These carbon-rich materials help with drainage and airflow.",
          sw: "Anza na safu ya sentimita 15 ya vifaa vikavu vya kahawia kama mashina ya mahindi, majani makavu, au majani. Vifaa hivi vyenye kaboni husaidia mifereji ya maji na mtiririko wa hewa.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Green Materials", sw: "Ongeza Vifaa vya Kijani" },
        content: {
          en: "Add a 10cm layer of green materials like fresh vegetable scraps, grass clippings, or manure. These nitrogen-rich materials speed up decomposition.",
          sw: "Ongeza safu ya sentimita 10 ya vifaa vya kijani kama mabaki ya mboga safi, nyasi zilizokatwa, au samadi. Vifaa hivi vyenye nitrojeni huharakisha kuoza.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Layer and Repeat", sw: "Weka Tabaka na Rudia" },
        content: {
          en: "Continue alternating brown and green layers until the pit is full. Add a thin layer of soil between each set of layers to introduce beneficial microorganisms.",
          sw: "Endelea kubadilisha tabaka za kahawia na kijani hadi shimo lijae. Ongeza safu nyembamba ya udongo kati ya kila seti ya tabaka kuingiza vijidudu vya manufaa.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Keep It Moist", sw: "Iweke Unyevu" },
        content: {
          en: "Water the pit lightly - the materials should feel like a wrung-out sponge. Too much water prevents air flow; too little slows decomposition.",
          sw: "Mwagilia shimo kidogo - vifaa vinapaswa kuhisi kama sifongo iliyokamuliwa. Maji mengi huzuia mtiririko wa hewa; maji kidogo hupunguza kasi ya kuoza.",
        },
        tipText: {
          en: "Check moisture weekly by squeezing a handful of material.",
          sw: "Angalia unyevu kila wiki kwa kukamua konzi ya vifaa.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Cover and Wait", sw: "Funika na Subiri" },
        content: {
          en: "Cover the pit with banana leaves, a tarp, or soil to retain moisture and heat. Check every 2 weeks and turn the pile if possible for faster results.",
          sw: "Funika shimo na majani ya ndizi, turubai, au udongo kuhifadhi unyevu na joto. Angalia kila wiki 2 na geuza rundo ikiwezekana kwa matokeo ya haraka.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Harvest Your Compost", sw: "Vuna Mboji Yako" },
        content: {
          en: "After 6-8 weeks, your compost is ready when it's dark, crumbly, and smells earthy. Use it to enrich your garden soil or as mulch around plants.",
          sw: "Baada ya wiki 6-8, mboji yako iko tayari inapokuwa nyeusi, inayovunjika, na kunuka udongo. Itumie kurutubisha udongo wa bustani yako au kama kufunika karibu na mimea.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "vegetable_trimmings", "cow_dung", "food_leftovers"],
    requiredResources: ["space", "water"],
    viewCount: 245,
    isPublished: true,
  },
  {
    slug: "heap-composting-method",
    category: "composting",
    title: {
      en: "Heap Composting Method",
      sw: "Njia ya Kutengeneza Mboji kwa Rundo",
    },
    description: {
      en: "Build a compost heap above ground - easier to turn and monitor than pit composting.",
      sw: "Jenga rundo la mboji juu ya ardhi - rahisi kugeuza na kufuatilia kuliko mboji ya shimo.",
    },
    difficulty: "beginner",
    duration: "4-6 weeks",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Select and Prepare the Site", sw: "Chagua na Andaa Mahali" },
        content: {
          en: "Choose a level, well-drained spot about 2x2 meters. Clear any grass or weeds. Place a layer of sticks or maize stalks as a base for air circulation.",
          sw: "Chagua mahali tambarare, penye mifereji mizuri ya maji takriban mita 2x2. Safisha nyasi au magugu yoyote. Weka safu ya vijiti au mashina ya mahindi kama msingi wa mzunguko wa hewa.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Build the First Layer", sw: "Jenga Safu ya Kwanza" },
        content: {
          en: "Add 20-30cm of coarse brown materials like maize stalks or dry branches. This creates air pockets at the bottom of your heap.",
          sw: "Ongeza sentimita 20-30 za vifaa vikubwa vya kahawia kama mashina ya mahindi au matawi makavu. Hii huunda nafasi za hewa chini ya rundo lako.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Add Green Materials", sw: "Ongeza Vifaa vya Kijani" },
        content: {
          en: "Add 10-15cm of nitrogen-rich green materials: fresh manure, vegetable scraps, or green plant materials. Spread evenly across the layer.",
          sw: "Ongeza sentimita 10-15 ya vifaa vya kijani vyenye nitrojeni: samadi safi, mabaki ya mboga, au vifaa vya mimea ya kijani. Sambaza sawasawa kwenye safu.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Soil Layer", sw: "Ongeza Safu ya Udongo" },
        content: {
          en: "Sprinkle a thin layer (2-3cm) of garden soil. This introduces beneficial decomposing organisms and helps reduce odors.",
          sw: "Nyunyiza safu nyembamba (sentimita 2-3) ya udongo wa bustani. Hii inaleta viumbe vya kuoza vya manufaa na husaidia kupunguza harufu.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Continue Layering", sw: "Endelea Kuweka Tabaka" },
        content: {
          en: "Repeat the brown-green-soil layers until your heap is about 1-1.5 meters high. Water each layer lightly as you build.",
          sw: "Rudia tabaka za kahawia-kijani-udongo hadi rundo lako liwe na urefu wa mita 1-1.5. Mwagilia kila safu kidogo unapojenga.",
        },
        tipText: {
          en: "Aim for a ratio of 3 parts brown to 1 part green materials.",
          sw: "Lenga uwiano wa sehemu 3 za kahawia kwa sehemu 1 ya vifaa vya kijani.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Turn the Heap Regularly", sw: "Geuza Rundo Mara kwa Mara" },
        content: {
          en: "Turn the heap every 1-2 weeks using a fork or jembe. Move outer materials to the center where it's hottest. This speeds up decomposition significantly.",
          sw: "Geuza rundo kila wiki 1-2 kwa kutumia uma au jembe. Hamisha vifaa vya nje kwenda katikati ambapo ni moto zaidi. Hii huharakisha kuoza kwa kiasi kikubwa.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Check Temperature and Moisture", sw: "Angalia Joto na Unyevu" },
        content: {
          en: "A healthy heap feels warm in the center (50-65°C). Squeeze test: material should feel moist but not dripping. Adjust by adding water or dry materials.",
          sw: "Rundo lenye afya linahisi joto katikati (50-65°C). Jaribio la kukamua: vifaa vinapaswa kuhisi unyevu lakini si kudondoka. Rekebisha kwa kuongeza maji au vifaa vikavu.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Harvest Ready Compost", sw: "Vuna Mboji Iliyoiva" },
        content: {
          en: "Compost is ready in 4-6 weeks with regular turning. It should be dark brown, crumbly, and smell like forest soil. Screen out large pieces to add back to a new heap.",
          sw: "Mboji huwa tayari katika wiki 4-6 na kugeuza mara kwa mara. Inapaswa kuwa ya kahawia iliyokolea, inayovunjika, na kunuka kama udongo wa msitu. Chuja vipande vikubwa kuongeza kwenye rundo jipya.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "wheat_straw", "vegetable_trimmings", "cow_dung", "chicken_manure"],
    requiredResources: ["space", "water", "labor"],
    viewCount: 189,
    isPublished: true,
  },

  // BIOGAS TUTORIALS
  {
    slug: "small-scale-biogas-digester",
    category: "biogas",
    title: {
      en: "Building a Small-Scale Biogas Digester",
      sw: "Kujenga Mtambo Mdogo wa Biogesi",
    },
    description: {
      en: "Create your own biogas system using locally available materials. Perfect for households with 2-3 cows.",
      sw: "Tengeneza mfumo wako wa biogesi kwa kutumia vifaa vinavyopatikana ndani. Inafaa kwa kaya zenye ng'ombe 2-3.",
    },
    difficulty: "intermediate",
    duration: "2-3 weeks to build",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Gather Materials", sw: "Kusanya Vifaa" },
        content: {
          en: "You'll need: 2 plastic drums (200L each), PVC pipes, a gas valve, rubber tubing, and basic tools. Ensure drums are food-grade and have no cracks.",
          sw: "Utahitaji: pipa 2 za plastiki (lita 200 kila moja), mabomba ya PVC, vali ya gesi, mirija ya mpira, na zana za msingi. Hakikisha pipa ni za chakula na hazina nyufa.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Prepare the Digester Tank", sw: "Andaa Tanki la Kusaga" },
        content: {
          en: "The larger drum is your digester. Cut an inlet hole (15cm) near the top for adding waste, and an outlet hole near the bottom for removing slurry.",
          sw: "Pipa kubwa ni kisaga chako. Kata shimo la kuingilia (sentimita 15) karibu na juu kwa kuongeza taka, na shimo la kutoa karibu na chini kwa kutoa tope.",
        },
        tipText: {
          en: "Seal all connections with silicone to prevent gas leaks.",
          sw: "Funga viunganishi vyote na silikoni kuzuia uvujaji wa gesi.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Install Gas Collection", sw: "Weka Mkusanyiko wa Gesi" },
        content: {
          en: "Attach a PVC pipe at the very top of the drum for gas outlet. Connect this to a gas valve and then to rubber tubing that leads to your stove.",
          sw: "Ambatisha bomba la PVC juu kabisa ya pipa kwa kutoa gesi. Unganisha hii na vali ya gesi na kisha na mirija ya mpira inayoelekea jikoni lako.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Create the Gas Holder", sw: "Tengeneza Kihifadhi cha Gesi" },
        content: {
          en: "Invert the smaller drum over a water-filled container. As gas is produced, it collects under this floating drum, which rises. This provides consistent pressure.",
          sw: "Geuza pipa ndogo juu ya chombo kilichojaa maji. Gesi inapozalishwa, inakusanyika chini ya pipa hii inayoelea, ambayo huinuka. Hii hutoa shinikizo la kudumu.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Start the Digester", sw: "Anza Kisaga" },
        content: {
          en: "Mix fresh cow dung with water (1:1 ratio) to make slurry. Fill the digester 3/4 full. Add a small amount of already-working slurry if available to speed up the process.",
          sw: "Changanya kinyesi kipya cha ng'ombe na maji (uwiano wa 1:1) kutengeneza tope. Jaza kisaga robo 3/4. Ongeza kiasi kidogo cha tope linalofanya kazi tayari ikiwa inapatikana kuharakisha mchakato.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Daily Feeding", sw: "Kulisha Kila Siku" },
        content: {
          en: "Add 2-3 kg of fresh manure mixed with equal water daily. Remove an equal amount of slurry from the outlet. This slurry is excellent liquid fertilizer!",
          sw: "Ongeza kilo 2-3 za samadi safi iliyochanganywa na maji sawa kila siku. Ondoa kiasi sawa cha tope kutoka kwenye mdomo. Tope hii ni mbolea bora ya kioevu!",
        },
        tipText: {
          en: "Never add antibiotics, chemicals, or soap - they kill the bacteria.",
          sw: "Kamwe usiongeze viuatilifu, kemikali, au sabuni - vinaaua bakteria.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "First Gas Production", sw: "Uzalishaji wa Kwanza wa Gesi" },
        content: {
          en: "Gas production begins in 2-4 weeks. The first gas contains more CO2, so release it for the first few days. Once the flame burns blue, your biogas is ready to use.",
          sw: "Uzalishaji wa gesi huanza katika wiki 2-4. Gesi ya kwanza ina CO2 zaidi, kwa hivyo itoe kwa siku chache za kwanza. Mara moto unapowaka bluu, biogesi yako iko tayari kutumika.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Maintenance Tips", sw: "Vidokezo vya Matengenezo" },
        content: {
          en: "Check for leaks monthly using soapy water. Keep the system warm (25-35°C is ideal). In cold weather, insulate with banana leaves or old blankets.",
          sw: "Angalia uvujaji kila mwezi kwa kutumia maji ya sabuni. Weka mfumo joto (25-35°C ni bora). Katika hali ya baridi, funga na majani ya ndizi au blanketi za zamani.",
        },
      },
    ],
    applicableWasteTypes: ["cow_dung", "pig_manure", "food_leftovers"],
    requiredResources: ["water", "containers", "shade"],
    viewCount: 312,
    isPublished: true,
  },

  // MULCHING TUTORIALS
  {
    slug: "mulching-with-crop-residues",
    category: "mulching",
    title: {
      en: "Mulching with Crop Residues",
      sw: "Kufunika Udongo na Mabaki ya Mazao",
    },
    description: {
      en: "Use your crop leftovers to protect soil, retain moisture, and suppress weeds naturally.",
      sw: "Tumia mabaki ya mazao yako kulinda udongo, kuhifadhi unyevu, na kuzuia magugu kwa asili.",
    },
    difficulty: "beginner",
    duration: "Immediate",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Collect and Prepare Materials", sw: "Kusanya na Andaa Vifaa" },
        content: {
          en: "Gather dry crop residues: maize stalks, wheat straw, bean vines, or rice husks. Chop larger pieces to 10-15cm lengths for easier application.",
          sw: "Kusanya mabaki ya mazao makavu: mashina ya mahindi, majani ya ngano, mizabibu ya maharagwe, au maganda ya mpunga. Kata vipande vikubwa kuwa urefu wa sentimita 10-15 kwa urahisi wa uwekaji.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Prepare the Planting Area", sw: "Andaa Eneo la Kupanda" },
        content: {
          en: "Clear weeds from around your plants. Water the soil well before mulching - mulch locks in existing moisture but can prevent light rain from reaching roots.",
          sw: "Safisha magugu karibu na mimea yako. Mwagilia udongo vizuri kabla ya kufunika - kufunika hufunga unyevu uliopo lakini kunaweza kuzuia mvua nyepesi kufika mizizi.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Apply Mulch Correctly", sw: "Weka Kifuniko kwa Usahihi" },
        content: {
          en: "Spread mulch 5-10cm thick around plants, keeping 5cm away from stems to prevent rot. Cover the entire root zone extending to the drip line of the plant.",
          sw: "Sambaza kifuniko kwa unene wa sentimita 5-10 karibu na mimea, ukiweka sentimita 5 mbali na mashina kuzuia kuoza. Funika eneo lote la mizizi linaloenea hadi mstari wa matone wa mmea.",
        },
        tipText: {
          en: "Thicker mulch (10cm) is better for dry season; thinner (5cm) in wet season.",
          sw: "Kifuniko kinene (sentimita 10) ni bora kwa msimu wa kiangazi; nyembamba (sentimita 5) katika msimu wa mvua.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Mulching Around Trees", sw: "Kufunika Karibu na Miti" },
        content: {
          en: "For fruit trees, apply mulch in a ring from 15cm from the trunk out to the canopy edge. This protects feeder roots and mimics natural forest floor conditions.",
          sw: "Kwa miti ya matunda, weka kifuniko katika pete kutoka sentimita 15 kutoka shina hadi ukingo wa dari. Hii inalinda mizizi ya kulisha na kuiga hali za sakafu ya msitu wa asili.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Maintain and Replenish", sw: "Tunza na Jaza" },
        content: {
          en: "Add more mulch as it decomposes - usually every 2-3 months. The decomposed material enriches the soil below, so you don't need to remove old mulch.",
          sw: "Ongeza kifuniko zaidi kinapooza - kawaida kila miezi 2-3. Vifaa vilivyooza hurutubisha udongo ulio chini, kwa hivyo huhitaji kuondoa kifuniko cha zamani.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "wheat_straw", "rice_husks", "sugarcane_bagasse"],
    requiredResources: ["space"],
    viewCount: 156,
    isPublished: true,
  },

  // ANIMAL FEED TUTORIALS
  {
    slug: "preparing-maize-stover-cattle",
    category: "animal_feed",
    title: {
      en: "Preparing Maize Stover for Cattle Feed",
      sw: "Kuandaa Mashina ya Mahindi kwa Chakula cha Ng'ombe",
    },
    description: {
      en: "Transform tough maize stalks into nutritious cattle feed using simple treatment methods.",
      sw: "Badilisha mashina magumu ya mahindi kuwa chakula chenye lishe kwa ng'ombe kwa njia rahisi za matibabu.",
    },
    difficulty: "beginner",
    duration: "1-3 days",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Harvest at the Right Time", sw: "Vuna kwa Wakati Unaofaa" },
        content: {
          en: "Collect maize stover soon after harvest while still slightly green. Stalks left in the field too long lose nutritional value and become tough.",
          sw: "Kusanya mashina ya mahindi mara baada ya mavuno wakati bado ni ya kijani kidogo. Mashina yaliyoachwa shambani muda mrefu hupoteza thamani ya lishe na kuwa magumu.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Chop into Small Pieces", sw: "Kata kuwa Vipande Vidogo" },
        content: {
          en: "Cut stalks into 2-5cm pieces using a panga or chaff cutter. Smaller pieces are easier for cattle to eat and digest, and they mix better with other feeds.",
          sw: "Kata mashina kuwa vipande vya sentimita 2-5 kwa kutumia panga au mashine ya kukata majani. Vipande vidogo ni rahisi kwa ng'ombe kula na kusaga, na huchanganyika vizuri na vyakula vingine.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Urea Treatment (Optional)", sw: "Matibabu ya Urea (Si Lazima)" },
        content: {
          en: "Mix 4kg urea in 100L water. Spray onto 100kg chopped stover, mixing thoroughly. This breaks down tough fibers and increases protein content by up to 9%.",
          sw: "Changanya kilo 4 za urea katika lita 100 za maji. Nyunyiza kwenye kilo 100 za mashina yaliyokatwa, ukichanganya vizuri. Hii huvunja nyuzi ngumu na kuongeza protini hadi 9%.",
        },
        tipText: {
          en: "Store treated stover in sealed bags for 3 weeks before feeding.",
          sw: "Hifadhi mashina yaliyotibiwa katika mifuko iliyofungwa kwa wiki 3 kabla ya kulisha.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Molasses Treatment Alternative", sw: "Njia Mbadala ya Matibabu ya Molasi" },
        content: {
          en: "For a simpler method, mix 1L molasses with 4L water and spray onto chopped stover. This improves taste and adds energy. Feed immediately or within a few days.",
          sw: "Kwa njia rahisi zaidi, changanya lita 1 ya molasi na lita 4 za maji na nyunyiza kwenye mashina yaliyokatwa. Hii inaboresha ladha na kuongeza nishati. Lisha mara moja au ndani ya siku chache.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Proper Storage", sw: "Uhifadhi Sahihi" },
        content: {
          en: "Store dry stover in a raised, covered area to prevent moisture and mold. Treated stover must be sealed in bags or pits. Check regularly for mold - never feed moldy material.",
          sw: "Hifadhi mashina makavu katika eneo lililoinuliwa, lililofunikwa kuzuia unyevu na ukungu. Mashina yaliyotibiwa lazima yafungwe katika mifuko au mashimo. Angalia mara kwa mara kuona ukungu - kamwe usilishe vifaa vyenye ukungu.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Feeding Guidelines", sw: "Miongozo ya Kulisha" },
        content: {
          en: "Stover should be 40-60% of the diet, supplemented with green fodder, concentrates, and minerals. A dairy cow can eat 8-10kg treated stover daily.",
          sw: "Mashina yanapaswa kuwa 40-60% ya mlo, yakiongezewa na lishe ya kijani, vyakula vilivyojilimbikizia, na madini. Ng'ombe wa maziwa anaweza kula kilo 8-10 za mashina yaliyotibiwa kila siku.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "wheat_straw", "bean_residue"],
    requiredResources: ["containers", "labor"],
    viewCount: 203,
    isPublished: true,
  },
  {
    slug: "making-silage-basics",
    category: "animal_feed",
    title: {
      en: "Making Silage: A Complete Guide",
      sw: "Kutengeneza Silaji: Mwongozo Kamili",
    },
    description: {
      en: "Preserve green fodder for dry season feeding through proper silage making techniques.",
      sw: "Hifadhi lishe ya kijani kwa kulisha msimu wa kiangazi kupitia mbinu sahihi za kutengeneza silaji.",
    },
    difficulty: "intermediate",
    duration: "3-4 weeks fermentation",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Choose the Right Material", sw: "Chagua Vifaa Vinavyofaa" },
        content: {
          en: "Best materials: Napier grass, maize at milk stage, sorghum, or sweet potato vines. Harvest when plants have 25-35% dry matter - not too wet, not too dry.",
          sw: "Vifaa bora: Nyasi ya Napier, mahindi katika hatua ya maziwa, mtama, au mizabibu ya viazi vitamu. Vuna wakati mimea ina 25-35% ya vifaa vikavu - si mvua sana, si kavu sana.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Chop the Material", sw: "Kata Vifaa" },
        content: {
          en: "Cut into 2-3cm pieces. Smaller pieces pack better, removing air pockets that cause spoilage. Use a chaff cutter or sharp panga.",
          sw: "Kata kuwa vipande vya sentimita 2-3. Vipande vidogo hujipanga vizuri, kuondoa nafasi za hewa zinazosababisha kuharibika. Tumia mashine ya kukata majani au panga kali.",
        },
        tipText: {
          en: "Wilt material for a few hours if too wet - squeeze test should show no dripping water.",
          sw: "Nyauka vifaa kwa masaa machache ikiwa ni mvua sana - jaribio la kukamua lisionyeshe maji yanayodondoka.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Prepare the Silage Pit or Bags", sw: "Andaa Shimo la Silaji au Mifuko" },
        content: {
          en: "For pit silage: dig a pit 1m deep, line with plastic sheeting. For bag silage: use heavy-duty 100kg bags. Both methods work well for small-scale farmers.",
          sw: "Kwa silaji ya shimo: chimba shimo kina cha mita 1, funga na karatasi za plastiki. Kwa silaji ya mfuko: tumia mifuko ya kilo 100 yenye nguvu. Njia zote mbili zinafanya kazi vizuri kwa wakulima wadogo.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Additives (Optional)", sw: "Ongeza Viongezeo (Si Lazima)" },
        content: {
          en: "Sprinkle 1-2% molasses to boost fermentation and add energy. Some farmers add salt (0.5%) to improve palatability. Mix thoroughly as you fill.",
          sw: "Nyunyiza 1-2% ya molasi kuongeza uchachushaji na kuongeza nishati. Baadhi ya wakulima huongeza chumvi (0.5%) kuboresha ladha. Changanya vizuri unapojaza.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Pack Tightly", sw: "Jipanga kwa Nguvu" },
        content: {
          en: "This is the most important step! Pack material in thin layers (15cm), stamping each layer thoroughly. Remove all air - air causes mold and spoilage.",
          sw: "Hii ni hatua muhimu zaidi! Jipanga vifaa katika tabaka nyembamba (sentimita 15), ukikanyaga kila safu vizuri. Ondoa hewa yote - hewa husababisha ukungu na kuharibika.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Seal Completely", sw: "Funga Kabisa" },
        content: {
          en: "Cover with plastic sheeting, then soil or old tires for weight. For bags, squeeze out all air and tie tightly. An airtight seal is essential for good fermentation.",
          sw: "Funika na karatasi za plastiki, kisha udongo au matairi ya zamani kwa uzito. Kwa mifuko, kamua hewa yote na funga kwa nguvu. Kufunga bila hewa ni muhimu kwa uchachushaji mzuri.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Wait for Fermentation", sw: "Subiri Uchachushaji" },
        content: {
          en: "Leave sealed for at least 3 weeks - 6-8 weeks is better. Good silage smells slightly sour (like pickles), is olive-green to brown, and has no mold.",
          sw: "Acha imefungwa kwa angalau wiki 3 - wiki 6-8 ni bora. Silaji nzuri ina harufu kidogo ya siki (kama achali), ni ya kijani ya zeituni hadi kahawia, na haina ukungu.",
        },
        tipText: {
          en: "Mark the sealing date on the pit or bags so you know when it's ready.",
          sw: "Weka alama ya tarehe ya kufunga kwenye shimo au mifuko ili ujue wakati iko tayari.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Feeding Silage", sw: "Kulisha Silaji" },
        content: {
          en: "Open from one end only, taking what you need and resealing. Introduce silage gradually to cattle over 1-2 weeks. Feed 15-25kg per cow daily.",
          sw: "Fungua kutoka upande mmoja tu, ukichukua unachohitaji na kufunga tena. Tambulisha silaji polepole kwa ng'ombe katika wiki 1-2. Lisha kilo 15-25 kwa ng'ombe kila siku.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "vegetable_trimmings"],
    requiredResources: ["containers", "labor", "space"],
    viewCount: 178,
    isPublished: true,
  },

  // VERMICOMPOST TUTORIAL
  {
    slug: "vermicomposting-small-scale",
    category: "vermicompost",
    title: {
      en: "Small-Scale Vermicomposting",
      sw: "Kutengeneza Mboji ya Minyoo kwa Kiwango Kidogo",
    },
    description: {
      en: "Use earthworms to create premium compost faster than traditional methods.",
      sw: "Tumia minyoo kutengeneza mboji bora haraka kuliko njia za jadi.",
    },
    difficulty: "intermediate",
    duration: "2-3 months",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Get Your Worms", sw: "Pata Minyoo Yako" },
        content: {
          en: "Red wigglers (Eisenia fetida) are best for composting. Start with 500g-1kg of worms. Buy from local vermiculture farms or collect from existing compost piles.",
          sw: "Minyoo wekundu (Eisenia fetida) ni bora kwa kutengeneza mboji. Anza na gramu 500-kilo 1 ya minyoo. Nunua kutoka mashamba ya minyoo ya ndani au kusanya kutoka kwenye marundo ya mboji yaliyopo.",
        },
        tipText: {
          en: "Don't use regular earthworms from the garden - they won't survive in bins.",
          sw: "Usitumie minyoo wa kawaida kutoka bustanini - hawataishi katika pipa.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Build Your Worm Bin", sw: "Jenga Pipa Lako la Minyoo" },
        content: {
          en: "Use a wooden box, plastic container, or old bathtub. Size: minimum 60x45x30cm for 500g worms. Drill small holes in bottom for drainage and sides for air.",
          sw: "Tumia sanduku la mbao, chombo cha plastiki, au beseni la zamani. Ukubwa: angalau sentimita 60x45x30 kwa gramu 500 za minyoo. Toboa mashimo madogo chini kwa mifereji na pembeni kwa hewa.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Prepare Bedding", sw: "Andaa Kitanda" },
        content: {
          en: "Fill bin with moist bedding: shredded newspaper, cardboard, or coconut coir. Add a handful of soil for grit. Bedding should be damp like a wrung-out sponge.",
          sw: "Jaza pipa na kitanda chenye unyevu: gazeti lililokatwakatwa, kadibodi, au kamba ya nazi. Ongeza konzi ya udongo kwa mchanga. Kitanda kinapaswa kuwa na unyevu kama sifongo iliyokamuliwa.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Your Worms", sw: "Ongeza Minyoo Yako" },
        content: {
          en: "Place worms on top of bedding and let them burrow in on their own. Keep the bin in a shaded, cool location (15-25°C is ideal). Cover with damp newspaper or cardboard.",
          sw: "Weka minyoo juu ya kitanda na waache wachimbe wenyewe. Weka pipa mahali penye kivuli, baridi (15-25°C ni bora). Funika na gazeti au kadibodi yenye unyevu.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Feed the Worms", sw: "Lisha Minyoo" },
        content: {
          en: "Start with small amounts of food scraps: vegetable peels, fruit scraps, coffee grounds, tea leaves. Bury food under bedding. Worms eat half their body weight daily.",
          sw: "Anza na kiasi kidogo cha mabaki ya chakula: maganda ya mboga, mabaki ya matunda, masalia ya kahawa, majani ya chai. Zika chakula chini ya kitanda. Minyoo hula nusu ya uzito wa mwili wao kila siku.",
        },
        tipText: {
          en: "Avoid meat, dairy, oily foods, citrus, and onions - they cause odors and harm worms.",
          sw: "Epuka nyama, maziwa, vyakula vyenye mafuta, machungwa, na vitunguu - vinasababisha harufu na kudhuru minyoo.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Maintain Proper Conditions", sw: "Dumisha Hali Sahihi" },
        content: {
          en: "Check moisture weekly - add water if too dry, dry bedding if too wet. Ensure good airflow. If bin smells bad, you're overfeeding or it's too wet.",
          sw: "Angalia unyevu kila wiki - ongeza maji ikiwa ni kavu sana, kitanda kavu ikiwa ni mvua sana. Hakikisha mtiririko mzuri wa hewa. Ikiwa pipa linasikika vibaya, unalisha kupita kiasi au ni mvua sana.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Harvest Vermicompost", sw: "Vuna Mboji ya Minyoo" },
        content: {
          en: "After 2-3 months, compost is ready when it's dark, crumbly, and smells earthy. Move finished compost to one side, add fresh bedding to empty side - worms will migrate.",
          sw: "Baada ya miezi 2-3, mboji iko tayari inapokuwa nyeusi, inayovunjika, na kunuka udongo. Hamisha mboji iliyokamilika upande mmoja, ongeza kitanda kipya upande tupu - minyoo watahamia.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Using Vermicompost", sw: "Kutumia Mboji ya Minyoo" },
        content: {
          en: "Use as potting mix (25% vermicompost + 75% soil), side dressing for vegetables, or make 'worm tea' by soaking in water for liquid fertilizer.",
          sw: "Tumia kama mchanganyiko wa kupandia (25% mboji ya minyoo + 75% udongo), kuweka pembeni kwa mboga, au tengeneza 'chai ya minyoo' kwa kuloweka katika maji kwa mbolea ya kioevu.",
        },
      },
    ],
    applicableWasteTypes: ["vegetable_peels", "fruit_peels", "coffee_pulp", "food_leftovers"],
    requiredResources: ["shade", "containers", "water"],
    viewCount: 134,
    isPublished: true,
  },
];
