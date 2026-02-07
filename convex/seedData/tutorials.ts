// Tutorial seed data
export const tutorialSeedData = [
  // COMPOSTING
  {
    slug: "pit-composting-beginners",
    category: "composting",
    title: {
      en: "Pit Composting for Beginners",
      sw: "Kutengeneza Mboji kwa Shimo kwa Wanaoanza",
    },
    description: {
      en: "The simplest way to turn farm waste into rich compost using a dug pit. No special tools needed.",
      sw: "Njia rahisi zaidi ya kubadilisha taka za shamba kuwa mboji tajiri kwa kutumia shimo. Hakuna zana maalum zinazohitajika.",
    },
    difficulty: "beginner",
    duration: "6-8 weeks",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Pick a Shaded Spot", sw: "Chagua Mahali Penye Kivuli" },
        content: {
          en: "Find a shaded area near your garden but at least 3 meters from any water source or borehole. Under a tree works well. Make sure the ground is not too rocky.",
          sw: "Tafuta eneo lenye kivuli karibu na bustani yako lakini angalau mita 3 kutoka chanzo chochote cha maji au kisima. Chini ya mti inafanya kazi vizuri. Hakikisha ardhi si ya mawe sana.",
        },
        tipText: {
          en: "Shade keeps the compost from drying out too fast in the sun.",
          sw: "Kivuli huzuia mboji kukauka haraka sana juani.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Dig Your Pit", sw: "Chimba Shimo Lako" },
        content: {
          en: "Dig a pit 1 meter deep, 1 meter wide, and about 2 meters long. One person can manage this size. Keep the topsoil on one side — you will need it later for covering layers.",
          sw: "Chimba shimo kina cha mita 1, upana mita 1, na urefu wa mita 2 hivi. Mtu mmoja anaweza kushughulikia ukubwa huu. Weka udongo wa juu upande mmoja — utauhitaji baadaye kwa kufunika tabaka.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Start with Dry Materials", sw: "Anza na Vifaa Vikavu" },
        content: {
          en: "Put a 15cm layer of dry brown materials at the bottom — maize stalks, dry leaves, straw, or dry bean vines. This layer helps air get in from below.",
          sw: "Weka safu ya sentimita 15 ya vifaa vikavu vya kahawia chini — mashina ya mahindi, majani makavu, au mizabibu ya maharagwe. Safu hii husaidia hewa kuingia kutoka chini.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Fresh Green Materials", sw: "Ongeza Vifaa Vibichi vya Kijani" },
        content: {
          en: "Add 10cm of fresh green materials on top — vegetable scraps, fresh grass, manure, or food leftovers. These have nitrogen that helps things break down faster.",
          sw: "Ongeza sentimita 10 ya vifaa vibichi vya kijani juu — mabaki ya mboga, nyasi safi, samadi, au mabaki ya chakula. Hivi vina nitrojeni inayosaidia vitu kuoza haraka.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Keep Layering", sw: "Endelea Kuweka Tabaka" },
        content: {
          en: "Keep alternating dry and green layers until the pit is full. Sprinkle a thin layer of soil between every 2-3 layers. This adds good bacteria that speed up the process.",
          sw: "Endelea kubadilisha tabaka kavu na kijani hadi shimo lijae. Nyunyiza safu nyembamba ya udongo kati ya kila tabaka 2-3. Hii inaongeza bakteria nzuri zinazoharakisha mchakato.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Water It Lightly", sw: "Mwagilia Kidogo" },
        content: {
          en: "Sprinkle water on each layer as you build. The materials should feel damp like a squeezed sponge — not dripping wet. Too much water kills the process.",
          sw: "Nyunyiza maji kwa kila safu unapojenga. Vifaa vinapaswa kuhisi unyevu kama sifongo iliyokamuliwa — si mvua kupita kiasi. Maji mengi sana huua mchakato.",
        },
        tipText: {
          en: "Grab a handful and squeeze — one or two drops of water is perfect.",
          sw: "Shika konzi na ukamue — tone moja au mbili za maji ni sawa.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Cover and Wait", sw: "Funika na Subiri" },
        content: {
          en: "Cover the pit with banana leaves, a plastic sheet, or soil to keep in heat and moisture. Check every 2 weeks — if it's dry, add a little water. If it smells bad, add more dry materials.",
          sw: "Funika shimo na majani ya ndizi, karatasi ya plastiki, au udongo kuhifadhi joto na unyevu. Angalia kila wiki 2 — ikiwa ni kavu, ongeza maji kidogo. Ikiwa inanuka vibaya, ongeza vifaa vikavu zaidi.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Harvest Your Compost", sw: "Vuna Mboji Yako" },
        content: {
          en: "After 6-8 weeks the compost is ready when it looks like dark soil, crumbles easily, and smells earthy. Spread it on your garden beds or around fruit trees.",
          sw: "Baada ya wiki 6-8 mboji iko tayari inapoonekana kama udongo mweusi, inavunjika kwa urahisi, na kunuka udongo. Isambaze kwenye matuta ya bustani au karibu na miti ya matunda.",
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
      en: "Heap Composting Above Ground",
      sw: "Kutengeneza Mboji kwa Rundo Juu ya Ardhi",
    },
    description: {
      en: "Build a compost heap above the ground — easier to turn and faster than pit composting.",
      sw: "Jenga rundo la mboji juu ya ardhi — rahisi kugeuza na haraka kuliko mboji ya shimo.",
    },
    difficulty: "beginner",
    duration: "4-6 weeks",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Clear a Flat Area", sw: "Safisha Eneo Tambarare" },
        content: {
          en: "Clear a spot about 2x2 meters on flat ground. Remove grass and weeds. Lay a base of sticks or maize stalks so air can move underneath the heap.",
          sw: "Safisha eneo la mita 2x2 hivi kwenye ardhi tambarare. Ondoa nyasi na magugu. Weka msingi wa vijiti au mashina ya mahindi ili hewa iweze kusogea chini ya rundo.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Build the Brown Layer", sw: "Jenga Safu ya Kahawia" },
        content: {
          en: "Add 20-30cm of dry brown materials — maize stalks, dry leaves, straw, or chopped branches. This creates air spaces at the bottom for good airflow.",
          sw: "Ongeza sentimita 20-30 za vifaa vikavu vya kahawia — mashina ya mahindi, majani makavu, au matawi yaliyokatwa. Hii huunda nafasi za hewa chini kwa mtiririko mzuri wa hewa.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Add Green Layer", sw: "Ongeza Safu ya Kijani" },
        content: {
          en: "Add 10-15cm of green materials — fresh manure, vegetable waste, green leaves, or kitchen scraps. Spread it evenly across the heap.",
          sw: "Ongeza sentimita 10-15 ya vifaa vya kijani — samadi safi, taka za mboga, majani ya kijani, au mabaki ya jikoni. Sambaza sawasawa kwenye rundo.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Sprinkle Soil", sw: "Nyunyiza Udongo" },
        content: {
          en: "Add a thin layer (2-3cm) of garden soil on top. This brings in the tiny organisms that do the actual work of breaking things down.",
          sw: "Ongeza safu nyembamba (sentimita 2-3) ya udongo wa bustani juu. Hii huleta viumbe vidogo vinavyofanya kazi halisi ya kuvunja vitu.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Repeat Until 1.5m High", sw: "Rudia Hadi Mita 1.5" },
        content: {
          en: "Keep repeating brown-green-soil layers until the heap is about 1-1.5 meters high. Water each layer lightly. Aim for 3 parts dry material to 1 part green.",
          sw: "Endelea kurudia tabaka za kahawia-kijani-udongo hadi rundo liwe mita 1-1.5. Mwagilia kila safu kidogo. Lenga sehemu 3 za vifaa vikavu kwa sehemu 1 ya kijani.",
        },
        tipText: {
          en: "Shape it like a mound with sloping sides so rain runs off instead of soaking in.",
          sw: "Tengeneza kama kilima chenye pande za mteremko ili mvua itiririke badala ya kuloweka.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Turn Every 1-2 Weeks", sw: "Geuza Kila Wiki 1-2" },
        content: {
          en: "Use a jembe or fork to turn the heap every 1-2 weeks. Move the outer material to the center where it's hottest. This is the secret to fast composting.",
          sw: "Tumia jembe au uma kugeuza rundo kila wiki 1-2. Hamisha vifaa vya nje kwenda katikati ambapo ni moto zaidi. Hii ndio siri ya mboji ya haraka.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Check Heat and Moisture", sw: "Angalia Joto na Unyevu" },
        content: {
          en: "Push your hand into the center — it should feel hot. If it's cold, add more green materials. If it's too wet and smells, add dry materials. If too dry, add water.",
          sw: "Ingiza mkono wako katikati — unapaswa kuhisi joto. Ikiwa ni baridi, ongeza vifaa vya kijani. Ikiwa ni mvua sana na kunuka, ongeza vifaa vikavu. Ikiwa ni kavu sana, ongeza maji.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Harvest in 4-6 Weeks", sw: "Vuna kwa Wiki 4-6" },
        content: {
          en: "With regular turning, compost is ready in 4-6 weeks. It should be dark, crumbly and smell like forest soil. Pick out any big pieces and throw them back into a new heap.",
          sw: "Kwa kugeuza mara kwa mara, mboji iko tayari kwa wiki 4-6. Inapaswa kuwa nyeusi, inavunjika na kunuka kama udongo wa msitu. Chagua vipande vikubwa na uvirudishe kwenye rundo jipya.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "wheat_straw", "vegetable_trimmings", "cow_dung", "chicken_manure"],
    requiredResources: ["space", "water", "labor"],
    viewCount: 189,
    isPublished: true,
  },
  {
    slug: "bokashi-kitchen-composting",
    category: "composting",
    title: {
      en: "Bokashi Composting for Kitchen Waste",
      sw: "Mboji ya Bokashi kwa Taka za Jikoni",
    },
    description: {
      en: "A quick fermentation method that works in a bucket — good for homes with small spaces.",
      sw: "Njia ya haraka ya uchachushaji inayofanya kazi katika ndoo — nzuri kwa nyumba zenye nafasi ndogo.",
    },
    difficulty: "beginner",
    duration: "2-4 weeks",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Get Two Buckets", sw: "Pata Ndoo Mbili" },
        content: {
          en: "Get two 20-liter buckets with tight lids. Drill small holes at the bottom of one bucket. Stack this one inside the other — the bottom bucket catches liquid that drains out.",
          sw: "Pata ndoo mbili za lita 20 zenye vifuniko vya kubana. Toboa mashimo madogo chini ya ndoo moja. Weka hii ndani ya nyingine — ndoo ya chini inashika maji yanayotoka.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Make the Bokashi Bran", sw: "Tengeneza Pumba ya Bokashi" },
        content: {
          en: "Mix 1kg wheat bran or rice husks with 2 tablespoons of molasses and 2 tablespoons of EM solution (available at agrovets). Add enough water to make it damp but not dripping. Store in a sealed bag for 2 weeks.",
          sw: "Changanya kilo 1 ya pumba za ngano au maganda ya mpunga na vijiko 2 vya molasi na vijiko 2 vya EM (inapatikana kwa agrovet). Ongeza maji ya kutosha kuifanya unyevu lakini isidondoke. Hifadhi katika mfuko uliofungwa kwa wiki 2.",
        },
        tipText: {
          en: "If you can't find EM solution, ask at any agrovet — some sell it as 'effective microorganisms'.",
          sw: "Ukishindwa kupata EM, uliza kwa agrovet yoyote — wengine wanauza kama 'vijidudu vya ufanisi'.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Layer Food Scraps and Bran", sw: "Weka Tabaka za Mabaki na Pumba" },
        content: {
          en: "Put kitchen scraps in the top bucket — vegetable peels, fruit scraps, ugali leftovers, anything except bones. After each layer of scraps, sprinkle 1-2 tablespoons of bokashi bran on top.",
          sw: "Weka mabaki ya jikoni kwenye ndoo ya juu — maganda ya mboga, mabaki ya matunda, ugali iliyobaki, chochote isipokuwa mifupa. Baada ya kila safu, nyunyiza vijiko 1-2 vya pumba ya bokashi juu.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Press Down and Seal", sw: "Bonyeza Chini na Funga" },
        content: {
          en: "Press the scraps down firmly to remove air pockets. Close the lid tight after every use. This is not like normal composting — bokashi works WITHOUT air.",
          sw: "Bonyeza mabaki chini kwa nguvu kuondoa nafasi za hewa. Funga kifuniko kwa nguvu baada ya kila matumizi. Hii si kama mboji ya kawaida — bokashi inafanya kazi BILA hewa.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Drain the Liquid", sw: "Toa Maji" },
        content: {
          en: "Every 2-3 days, drain the liquid from the bottom bucket. Dilute it 1:100 with water and use it to water your plants — it's a powerful fertilizer. Use it within 24 hours.",
          sw: "Kila siku 2-3, toa maji kutoka ndoo ya chini. Punguza 1:100 na maji na uitumie kumwagilia mimea yako — ni mbolea yenye nguvu. Itumie ndani ya masaa 24.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Bury the Fermented Waste", sw: "Zika Taka Zilizochachushwa" },
        content: {
          en: "After 2 weeks of fermenting, the bucket contents look pickled but not decomposed yet. Dig a trench in your garden and bury the contents 15cm deep. In 2 more weeks it becomes soil.",
          sw: "Baada ya wiki 2 za kuchachuka, vitu vya ndoo vinaonekana kama vimechachushwa lakini bado havijaoza. Chimba mfereji bustanini na uzike vitu sentimita 15 chini. Kwa wiki 2 zaidi vinakuwa udongo.",
        },
      },
    ],
    applicableWasteTypes: ["vegetable_peels", "fruit_peels", "food_leftovers"],
    requiredResources: ["containers"],
    viewCount: 87,
    isPublished: true,
  },

  // BIOGAS
  {
    slug: "small-scale-biogas-digester",
    category: "biogas",
    title: {
      en: "Building a Small Biogas Digester",
      sw: "Kujenga Mtambo Mdogo wa Biogesi",
    },
    description: {
      en: "Build a simple biogas system using plastic drums. Works for households with 2-3 cows.",
      sw: "Jenga mfumo rahisi wa biogesi kwa kutumia pipa za plastiki. Inafanya kazi kwa kaya zenye ng'ombe 2-3.",
    },
    difficulty: "intermediate",
    duration: "2-3 weeks to build",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Gather Materials", sw: "Kusanya Vifaa" },
        content: {
          en: "You need: 2 plastic drums (200L each), PVC pipes, a gas valve, rubber tubing, and basic tools. Make sure the drums have no cracks — food-grade drums work best.",
          sw: "Unahitaji: pipa 2 za plastiki (lita 200 kila moja), mabomba ya PVC, vali ya gesi, mirija ya mpira, na zana za msingi. Hakikisha pipa hazina nyufa — pipa za chakula zinafanya kazi vizuri.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Prepare the Digester Drum", sw: "Andaa Pipa ya Kusaga" },
        content: {
          en: "The bigger drum is your digester. Cut an inlet hole (15cm) near the top to add waste, and an outlet hole near the bottom to remove used slurry. Seal everything with silicone — gas leaks will ruin the whole system.",
          sw: "Pipa kubwa ni kisaga chako. Kata shimo la kuingilia (sentimita 15) karibu na juu kuongeza taka, na shimo la kutoa karibu na chini kuondoa tope. Funga kila kitu na silikoni — uvujaji wa gesi utaharibu mfumo mzima.",
        },
        tipText: {
          en: "Test for leaks by applying soapy water to all joints — bubbles mean there's a leak.",
          sw: "Jaribu uvujaji kwa kuweka maji ya sabuni kwenye viungo vyote — mapovu yanamaanisha kuna uvujaji.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Set Up Gas Collection", sw: "Weka Mkusanyiko wa Gesi" },
        content: {
          en: "Attach a PVC pipe at the very top of the drum for gas outlet. Connect it to a gas valve, then rubber tubing that goes to your stove. The gas rises naturally to the top.",
          sw: "Ambatisha bomba la PVC juu kabisa ya pipa kwa kutoa gesi. Iunganishe na vali ya gesi, kisha mirija ya mpira inayoenda jikoni lako. Gesi hupanda kwa asili hadi juu.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Make the Gas Holder", sw: "Tengeneza Kihifadhi cha Gesi" },
        content: {
          en: "Turn the smaller drum upside down over a container filled with water. As gas is produced, it pushes the drum up. This floating drum stores gas and gives steady pressure to your stove.",
          sw: "Geuza pipa ndogo juu chini juu ya chombo kilichojaa maji. Gesi inapozalishwa, inasukuma pipa juu. Pipa hii inayoelea huhifadhi gesi na kutoa shinikizo la kudumu kwa jiko lako.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Load and Start", sw: "Jaza na Anza" },
        content: {
          en: "Mix fresh cow dung with water 1:1 to make slurry. Fill the digester 3/4 full. If a neighbor has a working digester, get a bucket of their slurry to add — it kickstarts the process.",
          sw: "Changanya kinyesi kipya cha ng'ombe na maji 1:1 kutengeneza tope. Jaza kisaga robo 3/4. Jirani akiwa na kisaga kinachofanya kazi, chukua ndoo ya tope lao kuongeza — inazindua mchakato.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Feed It Daily", sw: "Lisha Kila Siku" },
        content: {
          en: "Add 2-3 kg of fresh manure mixed with equal water every day. Remove the same amount of slurry from the outlet. This slurry is excellent liquid fertilizer for your crops.",
          sw: "Ongeza kilo 2-3 za samadi safi iliyochanganywa na maji sawa kila siku. Ondoa kiasi sawa cha tope kutoka mdomo. Tope hii ni mbolea bora ya kioevu kwa mazao yako.",
        },
        tipText: {
          en: "Never add soap, chemicals, or antibiotics — they kill the bacteria that produce gas.",
          sw: "Kamwe usiongeze sabuni, kemikali, au viuatilifu — vinaua bakteria wanaozalisha gesi.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Wait for Gas", sw: "Subiri Gesi" },
        content: {
          en: "Gas starts in 2-4 weeks. The first gas has too much CO2, so let it escape for 2-3 days. When the flame burns blue instead of yellow, your biogas is clean and ready.",
          sw: "Gesi huanza kwa wiki 2-4. Gesi ya kwanza ina CO2 nyingi sana, kwa hivyo iache itoke kwa siku 2-3. Moto unapowaka bluu badala ya njano, biogesi yako ni safi na tayari.",
        },
      },
    ],
    applicableWasteTypes: ["cow_dung", "pig_manure", "food_leftovers"],
    requiredResources: ["water", "containers", "shade"],
    viewCount: 312,
    isPublished: true,
  },
  {
    slug: "biogas-from-kitchen-waste",
    category: "biogas",
    title: {
      en: "Biogas from Kitchen and Food Waste",
      sw: "Biogesi kutoka Taka za Jikoni na Chakula",
    },
    description: {
      en: "You don't need cows to make biogas. Kitchen waste and food scraps can produce cooking gas too.",
      sw: "Huhitaji ng'ombe kutengeneza biogesi. Taka za jikoni na mabaki ya chakula zinaweza kuzalisha gesi ya kupikia pia.",
    },
    difficulty: "intermediate",
    duration: "3-4 weeks to start producing",
    steps: [
      {
        stepNumber: 1,
        title: { en: "What Kitchen Waste Works", sw: "Taka Gani za Jikoni Zinafanya Kazi" },
        content: {
          en: "Best materials: vegetable peels, fruit waste, ugali and rice leftovers, spoiled food, tea leaves. Avoid: cooking oil, bones, large amounts of citrus peels, or anything with soap or chemicals.",
          sw: "Vifaa bora: maganda ya mboga, taka za matunda, ugali na wali uliosalia, chakula kilichoharibika, majani ya chai. Epuka: mafuta ya kupikia, mifupa, maganda mengi ya machungwa, au kitu chochote chenye sabuni au kemikali.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Build a Small Digester", sw: "Jenga Kisaga Kidogo" },
        content: {
          en: "Use a 100-liter drum with a sealed lid. Cut a small inlet at the top and an outlet at the side. Attach a gas pipe at the very top. This smaller size is enough for a family of 4-6 producing food waste daily.",
          sw: "Tumia pipa la lita 100 lenye kifuniko kilichofungwa. Kata mdomo mdogo juu na mwingine pembeni. Ambatisha bomba la gesi juu kabisa. Ukubwa huu mdogo unatosha kwa familia ya watu 4-6 wanaozalisha taka za chakula kila siku.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Blend the Waste", sw: "Saga Taka" },
        content: {
          en: "Kitchen waste decomposes faster when chopped small or blended. Mash everything with water into a thick soup consistency before adding to the digester. Big pieces take too long to break down.",
          sw: "Taka za jikoni huoza haraka zinapokatwa ndogo au kusagwa. Ponda kila kitu na maji hadi kiwe kama supu nzito kabla ya kuongeza kwenye kisaga. Vipande vikubwa vinachukua muda mrefu kuoza.",
        },
        tipText: {
          en: "A simple kitchen mortar and pestle works — no need for a blender.",
          sw: "Kinu na mchi wa jikoni wa kawaida vinafanya kazi — huhitaji blender.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Mix with a Starter", sw: "Changanya na Kianzishi" },
        content: {
          en: "For the first batch, add some cow dung slurry (even just 2-3 kg) to introduce the right bacteria. After the system is running, you won't need cow dung anymore — the bacteria multiply on their own.",
          sw: "Kwa mfuko wa kwanza, ongeza tope la kinyesi cha ng'ombe (hata kilo 2-3 tu) kuingiza bakteria sahihi. Mfumo ukianza kufanya kazi, hutahitaji kinyesi cha ng'ombe tena — bakteria wanazidisha wenyewe.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Feed Daily and Collect Gas", sw: "Lisha Kila Siku na Kusanya Gesi" },
        content: {
          en: "Add 1-2 kg of blended food waste daily mixed with equal water. Gas production starts in 3-4 weeks. A household producing 2kg food waste daily can cook one meal on the gas produced.",
          sw: "Ongeza kilo 1-2 za taka za chakula zilizosagwa kila siku zikichanganywa na maji sawa. Uzalishaji wa gesi huanza kwa wiki 3-4. Kaya inayozalisha kilo 2 za taka za chakula kila siku inaweza kupika mlo mmoja na gesi inayozalishwa.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Use the Leftover Slurry", sw: "Tumia Tope Lililosalia" },
        content: {
          en: "The slurry coming out of the digester is rich fertilizer. Dilute it with water and pour it on your vegetable garden. It has more nutrients than regular compost tea.",
          sw: "Tope linalotoka kwenye kisaga ni mbolea tajiri. Punguza na maji na umwage kwenye bustani ya mboga. Lina virutubisho zaidi kuliko chai ya mboji ya kawaida.",
        },
      },
    ],
    applicableWasteTypes: ["food_leftovers", "vegetable_peels", "fruit_peels"],
    requiredResources: ["containers", "water"],
    viewCount: 94,
    isPublished: true,
  },

  // MULCHING
  {
    slug: "mulching-with-crop-residues",
    category: "mulching",
    title: {
      en: "Mulching with Crop Residues",
      sw: "Kufunika Udongo na Mabaki ya Mazao",
    },
    description: {
      en: "Use your crop leftovers to keep soil moist, cool, and weed-free. The easiest recycling method.",
      sw: "Tumia mabaki ya mazao yako kuweka udongo unyevu, baridi, na bila magugu. Njia rahisi zaidi ya urejelezaji.",
    },
    difficulty: "beginner",
    duration: "Immediate",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Collect Your Materials", sw: "Kusanya Vifaa Vyako" },
        content: {
          en: "Gather dry crop residues after harvest: maize stalks, wheat straw, bean vines, rice husks, or sugarcane leaves. Chop larger pieces to 10-15cm lengths so they lie flat on the ground.",
          sw: "Kusanya mabaki ya mazao baada ya mavuno: mashina ya mahindi, majani ya ngano, mizabibu ya maharagwe, maganda ya mpunga, au majani ya miwa. Kata vipande vikubwa hadi urefu wa sentimita 10-15 ili vilale chini.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Water First, Then Mulch", sw: "Mwagilia Kwanza, Kisha Funika" },
        content: {
          en: "Always water your soil well before putting mulch. Mulch locks in moisture that's already there — but it can stop light rain from reaching the roots. So start with wet soil.",
          sw: "Mwagilia udongo wako vizuri kabla ya kuweka kifuniko. Kifuniko hufunga unyevu uliopo — lakini kinaweza kuzuia mvua nyepesi kufika mizizi. Kwa hivyo anza na udongo wenye maji.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Apply Around Plants", sw: "Weka Karibu na Mimea" },
        content: {
          en: "Spread mulch 5-10cm thick around your plants. Keep it 5cm away from plant stems to prevent rotting. Cover the whole area where roots grow — usually out to the edges of the leaves above.",
          sw: "Sambaza kifuniko kwa unene wa sentimita 5-10 karibu na mimea yako. Kiweke sentimita 5 mbali na mashina ya mimea kuzuia kuoza. Funika eneo lote ambapo mizizi inakua.",
        },
        tipText: {
          en: "Use thicker mulch (10cm) in dry season, thinner (5cm) in wet season to let some rain through.",
          sw: "Tumia kifuniko kinene (sentimita 10) wakati wa kiangazi, nyembamba (sentimita 5) wakati wa mvua kuruhusu mvua kupita.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Mulch Around Trees", sw: "Funika Karibu na Miti" },
        content: {
          en: "For fruit trees like mango or avocado, spread mulch in a wide ring from 15cm away from the trunk out to the edge of the canopy. This covers the feeding roots and keeps them cool.",
          sw: "Kwa miti ya matunda kama embe au parachichi, sambaza kifuniko katika pete pana kutoka sentimita 15 kutoka shina hadi ukingo wa dari. Hii inafunika mizizi ya kulisha na kuiweka baridi.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Top Up as It Breaks Down", sw: "Jaza Kinapooza" },
        content: {
          en: "Mulch slowly breaks down and feeds the soil — that's a bonus. Add more every 2-3 months. No need to remove the old layer, just pile new material on top.",
          sw: "Kifuniko huoza polepole na kulisha udongo — hiyo ni bonasi. Ongeza zaidi kila miezi 2-3. Huhitaji kuondoa safu ya zamani, weka tu vifaa vipya juu.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "wheat_straw", "rice_husks", "sugarcane_bagasse"],
    requiredResources: ["space"],
    viewCount: 156,
    isPublished: true,
  },
  {
    slug: "banana-stem-mulching",
    category: "mulching",
    title: {
      en: "Using Banana Stems and Leaves as Mulch",
      sw: "Kutumia Mashina na Majani ya Ndizi kama Kifuniko",
    },
    description: {
      en: "Banana plants produce a lot of waste material after harvest. Here's how to use every part as mulch.",
      sw: "Mimea ya ndizi huzalisha vifaa vingi vya taka baada ya mavuno. Hivi ndivyo unavyotumia kila sehemu kama kifuniko.",
    },
    difficulty: "beginner",
    duration: "Immediate",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Harvest Banana Waste", sw: "Vuna Taka za Ndizi" },
        content: {
          en: "After cutting a banana bunch, the whole pseudostem (the big trunk) is waste. Chop it into 30-50cm pieces. Also collect the large leaves — they're excellent for covering soil.",
          sw: "Baada ya kukata kishada cha ndizi, shina lote kubwa ni taka. Likatishe vipande vya sentimita 30-50. Pia kusanya majani makubwa — ni bora kwa kufunika udongo.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Split the Stems", sw: "Pasua Mashina" },
        content: {
          en: "Split the stem pieces lengthwise with a panga. This exposes the soft watery inside and helps them decompose faster. Lay them flat on the ground around your plants.",
          sw: "Pasua vipande vya mashina kwa urefu kwa panga. Hii inafunua ndani laini yenye maji na kusaidia kuoza haraka. Viweke tambarare chini karibu na mimea yako.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Layer Leaves on Top", sw: "Weka Tabaka ya Majani Juu" },
        content: {
          en: "Place banana leaves over the split stems. The stems hold moisture while the leaves block sunlight from reaching weeds. Together they make a very effective mulch layer.",
          sw: "Weka majani ya ndizi juu ya mashina yaliyopasuka. Mashina hushika unyevu wakati majani yanazuia mwanga wa jua kufika magugu. Pamoja yanafanya safu nzuri ya kifuniko.",
        },
        tipText: {
          en: "This works especially well around young banana suckers, coffee trees, and vegetable gardens.",
          sw: "Hii inafanya kazi vizuri karibu na machipukizi mapya ya ndizi, miti ya kahawa, na bustani za mboga.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Replace Every 4-6 Weeks", sw: "Badilisha Kila Wiki 4-6" },
        content: {
          en: "Banana material decomposes faster than dry stalks because it has lots of water. Check every month and add fresh material as needed. The decomposed material feeds the soil directly.",
          sw: "Vifaa vya ndizi huoza haraka kuliko mashina makavu kwa sababu vina maji mengi. Angalia kila mwezi na ongeza vifaa vipya inavyohitajika. Vifaa vilivyooza hulisha udongo moja kwa moja.",
        },
      },
    ],
    applicableWasteTypes: ["banana_stems", "banana_leaves"],
    requiredResources: ["space"],
    viewCount: 68,
    isPublished: true,
  },

  // ANIMAL FEED
  {
    slug: "preparing-maize-stover-cattle",
    category: "animal_feed",
    title: {
      en: "Treating Maize Stover for Cattle Feed",
      sw: "Kutibu Mashina ya Mahindi kwa Chakula cha Ng'ombe",
    },
    description: {
      en: "Turn the tough maize stalks left after harvest into good cattle feed with simple treatment methods.",
      sw: "Badilisha mashina magumu ya mahindi yanayobaki baada ya mavuno kuwa chakula kizuri cha ng'ombe kwa njia rahisi za matibabu.",
    },
    difficulty: "beginner",
    duration: "1-3 days (or 3 weeks for urea treatment)",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Collect Stalks Early", sw: "Kusanya Mashina Mapema" },
        content: {
          en: "Collect maize stover soon after harvest while it's still slightly green. Stalks left in the field too long dry out and lose nutrition. The leaves and husks have the most food value.",
          sw: "Kusanya mashina ya mahindi mara baada ya mavuno bado ni ya kijani kidogo. Mashina yaliyoachwa shambani muda mrefu hukauka na kupoteza lishe. Majani na maganda yana thamani kubwa ya chakula.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Chop Into Small Pieces", sw: "Kata Vipande Vidogo" },
        content: {
          en: "Cut stalks into 2-5cm pieces using a panga or chaff cutter. Small pieces are easier for cattle to chew and digest, and they mix better with molasses or urea solution.",
          sw: "Kata mashina kuwa vipande vya sentimita 2-5 kwa panga au mashine ya kukata. Vipande vidogo ni rahisi kwa ng'ombe kutafuna na kusaga, na vinachanganyika vizuri na molasi au urea.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Quick Method: Molasses Spray", sw: "Njia ya Haraka: Kunyunyiza Molasi" },
        content: {
          en: "Mix 1 liter molasses with 4 liters water. Spray onto a wheelbarrow full of chopped stover and mix well. Feed immediately. This improves taste and adds energy — cattle eat it much better.",
          sw: "Changanya lita 1 ya molasi na lita 4 za maji. Nyunyiza kwenye toroli moja ya mashina yaliyokatwa na uchanganye vizuri. Lisha mara moja. Hii inaboresha ladha na kuongeza nishati — ng'ombe wanakula vizuri zaidi.",
        },
        tipText: {
          en: "Buy molasses at any agrovet — a 20-liter jerry can costs about KSh 1,500 and lasts weeks.",
          sw: "Nunua molasi kwa agrovet yoyote — jerican ya lita 20 inagharimu KSh 1,500 hivi na inachukua wiki.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Better Method: Urea Treatment", sw: "Njia Bora: Matibabu ya Urea" },
        content: {
          en: "Mix 4kg urea in 100 liters water. Spray onto 100kg of chopped stover, mixing thoroughly. Pack tightly in plastic bags or a lined pit, squeezing out all air. Seal and leave for 21 days.",
          sw: "Changanya kilo 4 za urea katika lita 100 za maji. Nyunyiza kwenye kilo 100 za mashina yaliyokatwa, ukichanganya vizuri. Funga kwa nguvu katika mifuko ya plastiki, ukikamua hewa yote. Funga na uache kwa siku 21.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Air It Before Feeding", sw: "Iangazie Hewa Kabla ya Kulisha" },
        content: {
          en: "After 21 days, open the bags and spread the stover in the shade for a few hours so the ammonia smell escapes. If it still smells strong, leave it longer. Never feed it while it still smells of ammonia.",
          sw: "Baada ya siku 21, fungua mifuko na usambaze mashina kivulini kwa masaa machache ili harufu ya amonia itoke. Bado ikinuka kwa nguvu, iacha zaidi. Kamwe usiilishe bado ikinuka amonia.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "How Much to Feed", sw: "Kiasi cha Kulisha" },
        content: {
          en: "Treated stover should be 40-60% of your cow's daily diet. A dairy cow eats about 8-10kg per day. Always give clean water alongside it and supplement with greens, dairy meal, or mineral lick.",
          sw: "Mashina yaliyotibiwa yanapaswa kuwa 40-60% ya mlo wa kila siku wa ng'ombe wako. Ng'ombe wa maziwa anakula kilo 8-10 kwa siku. Toa maji safi daima pamoja nayo na ongezea na kijani, dairy meal, au madini.",
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
      en: "Making Silage for Dry Season",
      sw: "Kutengeneza Silaji kwa Msimu wa Kiangazi",
    },
    description: {
      en: "Preserve green fodder when it's plentiful so your cows have quality feed even in the driest months.",
      sw: "Hifadhi lishe ya kijani wakati inapatikana kwa wingi ili ng'ombe wako wawe na chakula bora hata miezi ya kiangazi.",
    },
    difficulty: "intermediate",
    duration: "3-4 weeks fermentation",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Pick the Right Fodder", sw: "Chagua Lishe Inayofaa" },
        content: {
          en: "Best for silage: Napier grass at 1 meter height, maize at milk stage, sweet potato vines, or sorghum. The material should be green and moist but not dripping wet.",
          sw: "Bora kwa silaji: Nyasi ya Napier ikiwa mita 1, mahindi katika hatua ya maziwa, mizabibu ya viazi vitamu, au mtama. Vifaa viwe kijani na unyevu lakini si mvua kupita kiasi.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Chop It Fine", sw: "Kata Kwa Undani" },
        content: {
          en: "Cut into 2-3cm pieces using a chaff cutter or sharp panga. Smaller pieces pack tighter, which pushes out air. Air inside the silage causes mold and spoilage.",
          sw: "Kata kuwa vipande vya sentimita 2-3 kwa mashine ya kukata au panga kali. Vipande vidogo hujipanga kwa nguvu, ambayo husukuma hewa nje. Hewa ndani ya silaji husababisha ukungu na kuharibika.",
        },
        tipText: {
          en: "If the material feels too wet, spread it in the sun for 2-3 hours to wilt slightly before packing.",
          sw: "Vifaa vikihisi mvua sana, visambaze juani kwa masaa 2-3 vinyauke kidogo kabla ya kufunga.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Prepare Your Pit or Bags", sw: "Andaa Shimo au Mifuko" },
        content: {
          en: "For pit silage: dig 1 meter deep and line with a plastic sheet. For bag silage: use heavy 100kg bags. Bags are easier for small-scale farmers — you can make 10-20 bags at a time.",
          sw: "Kwa silaji ya shimo: chimba mita 1 kina na funga na karatasi ya plastiki. Kwa silaji ya mfuko: tumia mifuko ya kilo 100. Mifuko ni rahisi kwa wakulima wadogo — unaweza kutengeneza mifuko 10-20 kwa wakati mmoja.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Molasses (Optional)", sw: "Ongeza Molasi (Si Lazima)" },
        content: {
          en: "Sprinkle 1-2% molasses (about 1 liter per 50kg) as you fill. Molasses boosts fermentation and adds energy to the feed. Some farmers also add a pinch of salt to improve taste.",
          sw: "Nyunyiza 1-2% ya molasi (karibu lita 1 kwa kilo 50) unapojaza. Molasi huongeza uchachushaji na nishati kwa chakula. Baadhi ya wakulima pia huongeza chumvi kidogo kuboresha ladha.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Pack as Tight as Possible", sw: "Funga kwa Nguvu Iwezekanavyo" },
        content: {
          en: "This is the most important step. Add material in thin layers (15cm) and stamp each layer hard with your feet. Get the whole family to help stamp it down. Every air pocket is an invitation for mold.",
          sw: "Hii ni hatua muhimu zaidi. Ongeza vifaa katika tabaka nyembamba (sentimita 15) na ukanyage kila safu kwa nguvu kwa miguu. Familia yote isaidie kukanyaga. Kila nafasi ya hewa ni mwaliko kwa ukungu.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Seal It Completely", sw: "Funga Kabisa" },
        content: {
          en: "Cover pit with a plastic sheet then pile soil or old tires on top. For bags, squeeze out all air, twist the top and tie with string. Write the date on each bag or pit.",
          sw: "Funika shimo na karatasi ya plastiki kisha weka udongo au matairi ya zamani juu. Kwa mifuko, kamua hewa yote, zungushia juu na ufunge na kamba. Andika tarehe kwenye kila mfuko au shimo.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Wait 3+ Weeks", sw: "Subiri Wiki 3+" },
        content: {
          en: "Leave sealed for at least 3 weeks — 6-8 weeks is better. Good silage smells slightly sour like pickles, is olive-green to brown, and has no mold. Bad silage smells rotten and is slimy — throw it away.",
          sw: "Acha imefungwa kwa angalau wiki 3 — wiki 6-8 ni bora. Silaji nzuri ina harufu kidogo ya siki, ni kijani hadi kahawia, na haina ukungu. Silaji mbaya inanuka kuoza na ni ya kunata — itupe.",
        },
        tipText: {
          en: "Open from one end only and take what you need for the day. Reseal immediately.",
          sw: "Fungua upande mmoja tu na uchukue unachohitaji kwa siku. Funga tena mara moja.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Introduce to Cows Slowly", sw: "Tambulisha kwa Ng'ombe Polepole" },
        content: {
          en: "Start with small amounts and increase over 1-2 weeks. Cows need time to adjust. Feed 15-25kg per cow per day. Always provide clean water — silage makes them thirsty.",
          sw: "Anza na kiasi kidogo na ongeze kwa wiki 1-2. Ng'ombe wanahitaji muda kuzoea. Lisha kilo 15-25 kwa ng'ombe kwa siku. Toa maji safi daima — silaji inawafanya wawe na kiu.",
        },
      },
    ],
    applicableWasteTypes: ["maize_stalks", "vegetable_trimmings"],
    requiredResources: ["containers", "labor", "space"],
    viewCount: 178,
    isPublished: true,
  },
  {
    slug: "drying-crop-residues-goat-feed",
    category: "animal_feed",
    title: {
      en: "Drying and Storing Crop Residues for Goat Feed",
      sw: "Kukausha na Kuhifadhi Mabaki ya Mazao kwa Chakula cha Mbuzi",
    },
    description: {
      en: "Simple methods to dry, store, and feed crop leftovers to goats year-round.",
      sw: "Njia rahisi za kukausha, kuhifadhi, na kulisha mabaki ya mazao kwa mbuzi mwaka mzima.",
    },
    difficulty: "beginner",
    duration: "3-5 days drying",
    steps: [
      {
        stepNumber: 1,
        title: { en: "What Goats Can Eat", sw: "Mbuzi Wanaweza Kula Nini" },
        content: {
          en: "Goats eat a wider range than cattle. Good crop residues for goats: bean vines and leaves, sweet potato vines, maize leaves (not hard stalks), groundnut tops, cowpea residues, and banana leaves.",
          sw: "Mbuzi wanakula aina nyingi zaidi kuliko ng'ombe. Mabaki mazuri ya mazao kwa mbuzi: mizabibu na majani ya maharagwe, mizabibu ya viazi vitamu, majani ya mahindi (si mashina magumu), majani ya njugu, mabaki ya kunde, na majani ya ndizi.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Dry in the Sun", sw: "Kausha Juani" },
        content: {
          en: "Spread materials on a raised platform or clean ground in direct sun. Turn them once or twice a day. They're ready when they rustle and snap easily — usually 3-5 days in good sun.",
          sw: "Sambaza vifaa kwenye jukwaa lililoinuliwa au ardhi safi juani moja kwa moja. Vigeuze mara moja au mbili kwa siku. Viko tayari vinapotoa sauti na kuvunjika kwa urahisi — kawaida siku 3-5 na jua nzuri.",
        },
        tipText: {
          en: "Don't dry directly on the ground during wet season — use a raised rack made of sticks.",
          sw: "Usikaushe moja kwa moja ardhini wakati wa mvua — tumia rafu iliyoinuliwa iliyotengenezwa na vijiti.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Store in a Dry Place", sw: "Hifadhi Mahali Pakavu" },
        content: {
          en: "Pack dried material loosely in old feed bags or gunny sacks. Store off the ground on pallets or a raised platform in a roofed area. Check every 2 weeks for moisture or mold.",
          sw: "Funga vifaa vilivyokaushwa kwa upole katika mifuko ya zamani ya chakula. Hifadhi juu ya ardhi kwenye jukwaa lililoinuliwa katika eneo lenye paa. Angalia kila wiki 2 kwa unyevu au ukungu.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Chop Before Feeding", sw: "Kata Kabla ya Kulisha" },
        content: {
          en: "Chop dried residues into 5-10cm pieces before feeding. Goats waste less when pieces are small. Mix different residues together for a balanced diet — variety is important for goat health.",
          sw: "Kata mabaki yaliyokaushwa kuwa vipande vya sentimita 5-10 kabla ya kulisha. Mbuzi wanapoteza kidogo vipande vikwa vidogo. Changanya mabaki tofauti pamoja kwa mlo kamili — utofauti ni muhimu kwa afya ya mbuzi.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Soak to Improve Appetite", sw: "Loweka Kuboresha Hamu" },
        content: {
          en: "If goats refuse very dry material, soak it in water with a splash of molasses for 30 minutes before feeding. This softens it and makes it tastier. Works especially well with old stored material.",
          sw: "Mbuzi wakikataa vifaa vikavu sana, viloweke kwenye maji na molasi kidogo kwa dakika 30 kabla ya kulisha. Hii inavilainisha na kuvifanya vitamu zaidi. Inafanya kazi vizuri na vifaa vya zamani vilivyohifadhiwa.",
        },
      },
    ],
    applicableWasteTypes: ["bean_residue", "maize_stalks", "sweet_potato_vines"],
    requiredResources: ["space", "labor"],
    viewCount: 62,
    isPublished: true,
  },

  // VERMICOMPOST
  {
    slug: "vermicomposting-small-scale",
    category: "vermicompost",
    title: {
      en: "Small-Scale Vermicomposting",
      sw: "Kutengeneza Mboji ya Minyoo kwa Kiwango Kidogo",
    },
    description: {
      en: "Use red worms to make premium compost faster than any other method. Great for selling to other farmers.",
      sw: "Tumia minyoo wekundu kutengeneza mboji bora haraka kuliko njia nyingine yoyote. Nzuri kwa kuuza kwa wakulima wengine.",
    },
    difficulty: "intermediate",
    duration: "2-3 months",
    steps: [
      {
        stepNumber: 1,
        title: { en: "Get Red Worms", sw: "Pata Minyoo Wekundu" },
        content: {
          en: "You need red wigglers (Eisenia fetida), not regular garden earthworms. Start with 500g to 1kg. Ask around at agrovets or farmer groups — someone nearby likely sells them. They cost about KSh 2,000-4,000 per kg.",
          sw: "Unahitaji minyoo wekundu (Eisenia fetida), si minyoo wa kawaida wa bustanini. Anza na gramu 500 hadi kilo 1. Uliza kwa agrovet au vikundi vya wakulima — mtu wa karibu labda anauza. Wanagharimu KSh 2,000-4,000 kwa kilo.",
        },
        tipText: {
          en: "Garden earthworms burrow deep and won't survive in bins. Red wigglers stay near the surface where the food is.",
          sw: "Minyoo wa bustani huchimba ndani na hawataishi katika pipa. Minyoo wekundu hubaki karibu na uso ambapo chakula kipo.",
        },
      },
      {
        stepNumber: 2,
        title: { en: "Build a Worm Bin", sw: "Jenga Pipa la Minyoo" },
        content: {
          en: "Use a wooden box, plastic tub, or old bathtub — minimum 60x45x30cm for 500g of worms. Drill small holes in the bottom for drainage and on the sides for air. Place in shade — worms hate heat and light.",
          sw: "Tumia sanduku la mbao, beseni la plastiki, au beseni la zamani — angalau sentimita 60x45x30 kwa gramu 500 za minyoo. Toboa mashimo madogo chini kwa mifereji na pembeni kwa hewa. Weka kivulini — minyoo hawapendi joto na mwanga.",
        },
      },
      {
        stepNumber: 3,
        title: { en: "Make the Bedding", sw: "Tengeneza Kitanda" },
        content: {
          en: "Fill the bin halfway with moist bedding: torn newspaper, cardboard strips, coconut fibre, or dry leaves. Add a handful of soil for grit. Wet it so it feels like a squeezed sponge — damp but not dripping.",
          sw: "Jaza pipa nusu na kitanda chenye unyevu: gazeti lililoraruliwa, vipande vya kadibodi, nyuzi za nazi, au majani makavu. Ongeza konzi ya udongo. Lowesha hadi kuhisi kama sifongo iliyokamuliwa — unyevu lakini si kudondoka.",
        },
      },
      {
        stepNumber: 4,
        title: { en: "Add Worms and First Food", sw: "Ongeza Minyoo na Chakula cha Kwanza" },
        content: {
          en: "Place worms on top of the bedding — they'll burrow down on their own. Wait 2-3 days, then add a small amount of food: vegetable peels, fruit scraps, coffee grounds, or tea leaves. Bury it under the bedding.",
          sw: "Weka minyoo juu ya kitanda — watachimba chini wenyewe. Subiri siku 2-3, kisha ongeza kiasi kidogo cha chakula: maganda ya mboga, mabaki ya matunda, masalia ya kahawa, au majani ya chai. Zika chini ya kitanda.",
        },
      },
      {
        stepNumber: 5,
        title: { en: "Feed Regularly", sw: "Lisha Mara kwa Mara" },
        content: {
          en: "Worms eat about half their body weight per day. Feed every 2-3 days by burying scraps in different spots. Avoid meat, dairy, oily food, onions, and citrus — these cause smell and harm worms.",
          sw: "Minyoo wanakula karibu nusu ya uzito wa mwili wao kwa siku. Lisha kila siku 2-3 kwa kuzika mabaki mahali tofauti. Epuka nyama, maziwa, vyakula vyenye mafuta, vitunguu, na machungwa — hivi husababisha harufu na kudhuru minyoo.",
        },
        tipText: {
          en: "If food is piling up uneaten, you're overfeeding. Reduce the amount and wait for worms to catch up.",
          sw: "Chakula kikijilimbikiza bila kuliwa, unalisha kupita kiasi. Punguza kiasi na usubiri minyoo wafike.",
        },
      },
      {
        stepNumber: 6,
        title: { en: "Check Moisture Weekly", sw: "Angalia Unyevu Kila Wiki" },
        content: {
          en: "The bin should stay moist but never waterlogged. If it's too dry, sprinkle water. If too wet, add dry newspaper or cardboard. A bad smell means too wet or too much food.",
          sw: "Pipa linapaswa kubaki na unyevu lakini kamwe lisilojaa maji. Ikiwa ni kavu sana, nyunyiza maji. Ikiwa ni mvua sana, ongeza gazeti kavu au kadibodi. Harufu mbaya inamaanisha mvua sana au chakula kingi.",
        },
      },
      {
        stepNumber: 7,
        title: { en: "Harvest After 2-3 Months", sw: "Vuna Baada ya Miezi 2-3" },
        content: {
          en: "When most of the bin is dark crumbly material, it's ready. Push finished compost to one side, add fresh bedding to the empty side. Worms will move to the fresh side within a week. Then scoop out the finished compost.",
          sw: "Sehemu kubwa ya pipa inapokuwa vifaa vya giza vinavyovunjika, iko tayari. Sukuma mboji iliyokamilika upande mmoja, ongeza kitanda kipya upande tupu. Minyoo watahamia upande mpya ndani ya wiki. Kisha chota mboji iliyokamilika.",
        },
      },
      {
        stepNumber: 8,
        title: { en: "Use or Sell It", sw: "Tumia au Iuze" },
        content: {
          en: "Vermicompost is 5-10x more nutritious than regular compost. Mix 25% vermicompost with 75% soil for planting. You can also soak it in water for 24 hours to make liquid fertilizer. Many coffee and flower farmers will buy it.",
          sw: "Mboji ya minyoo ina lishe mara 5-10 zaidi kuliko mboji ya kawaida. Changanya 25% mboji ya minyoo na 75% udongo kwa kupanda. Unaweza pia kulowesha kwenye maji kwa masaa 24 kutengeneza mbolea ya kioevu. Wakulima wengi wa kahawa na maua watanunua.",
        },
      },
    ],
    applicableWasteTypes: ["vegetable_peels", "fruit_peels", "coffee_pulp", "food_leftovers"],
    requiredResources: ["shade", "containers", "water"],
    viewCount: 134,
    isPublished: true,
  },
];
