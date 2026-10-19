/* ==========================================================================
   CEOBUILDING — REAL ESTATE USER INTERFACE CONTROLLER & LOCALIZATION
   Multi-lingual dictionary (UZ, RU, EN), 3D synchronization,
   Floor-by-Floor Selector, SVG Floor Plan, Filters, Gallery & Inquiry Flow.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. СЛОВАРЬ ЛОКАЛИЗАЦИИ (UZ, RU, EN)
  const translations = {
    uz: {
      nav_concept: "KONSEPT",
      nav_architecture: "ARXITEKTURA",
      nav_apartments: "KVARTIRALAR",
      nav_plans: "PLANLAR",
      nav_amenities: "QULAYLIKLAR",
      nav_gallery: "GALEREYA",
      nav_location: "LOKATSIYA",
      nav_timeline: "BOSQICHLAR",
      nav_contact: "ALOQA",
      btn_choose_apt: "KVARTIRANI TANLASH",

      hero_badge: "TOSHKENT CITY // PREMIUM RESIDENTIAL RESIDENCES // 2026 ARCHITECTURE",
      hero_title_1: "Biz hayratlanarli",
      hero_title_2: "makonlarni",
      hero_title_3: "loyihalashtiramiz.",
      hero_desc: "Toshkent City markazidagi monumental arxitektura va zamonaviy hashamat uyg'unligi. 14 qavatli eksklyuziv bino, panoramik shisha fasad va shaxsiy xiyobonlar sizga qulaylikning yangi standartini taqdim etadi.",
      hero_btn_select: "KVARTIRANI TANLASH",
      hero_btn_explore: "LOYIHA BILAN TANISHISH",
      hero_coords_title: "OBYEKT KOORDINATALARI",
      scroll_hint: "PASTGA SILJITING",

      metric_floors: "Qavatlar soni",
      metric_residences: "Rezidensiyalar",
      metric_ceiling: "Shift balandligi",
      metric_handover: "Topshirish muddati",

      concept_tag: "ARXITEKTURA FALSAFASI",
      concept_title: "Kelajak me'morchiligi va inson qulayligi birlashgan makon.",
      concept_desc1: "CEOBUILDING — bu shunchaki bino emas, balki shahar markazida yashashning yangi falsafasidir. Biz monumental temir-beton karkasni energiya tejovchi panoramik oyna bilan birlashtirib, poytaxtning eng nufuzli manzilida osoyishta va xavfsiz muhit yaratdik.",
      concept_desc2: "Har bir xonadonda quyosh nuri, ovoz izolyatsiyasi va shamollatish tizimi 4D BIM muhandislik tahlillari asosida mukammallashtirilgan.",
      cc1_title: "Monolit M450 & Seysmik 9.0",
      cc1_desc: "9 ballik seysmik chidamlilikka ega mustahkam poydevor va quyma temir-beton karkas.",
      cc2_title: "Termo-shisha fasad",
      cc2_desc: "Quyoshdan himoyalovchi va shovqinni 42 dB gacha kamaytiruvchi ikki kamerali shisha paketlar.",
      cc3_title: "Smart Building tizimi",
      cc3_desc: "Xonadonlarda harorat, yoritish va xavfsizlikni smartfon orqali avtomatlashtirilgan boshqaruvi.",
      cc4_title: "Shaxsiy landshaft bog'i",
      cc4_desc: "Faqatgina rezidentlar uchun mo'ljallangan yopiq yashil hovli, favvoralar va bolalar maydoni.",

      arch_tag: "3D BINO VA QAVATLARNI KO'RISH",
      arch_title: "Interaktiv 3D Arxitektura Modeli",
      arch_desc: "Binoning istalgan qavatini tanlang yoki 3D model ustiga bosing. Siz qavatlar balandligi, balkonlar va fasad konstruksiyasini har tomondan ko'rishingiz mumkin.",
      btn_view_floor_units: "USHBU QAVAT KVARTIRALARINI TANLASH →",

      selector_tag: "ASOSIY TANLOV TIZIMI",
      selector_title: "Kvartira va Qavatni Tanlang",
      selector_desc: "Qavatlar ro'yxatidan kerakli qavatni belgilang, 2D reja chizmasidan kvartira ustiga bosing va narx, maydon hamda ipoteka hisob-kitobini o'rganing.",
      stat_available: "Mavjud xonadonlar",
      stat_reserved: "Band qilingan",

      filter_rooms: "Xonalar soni:",
      filter_price: "Maksimal narx (mln UZS):",
      filter_area: "Maydoni (m²):",
      filter_available_only: "Faqat sotuvdagi kvartiralar",
      btn_reset_filters: "FILTRLARNI TOZALASH",

      fsc_header: "QAVATLARNI TANLASH",
      status_available: "Mavjud",
      status_reserved: "Band",
      status_sold: "Sotilgan",

      apt_select_prompt: "Kvartirani tanlang",
      apt_select_prompt_sub: "Planing ustidagi istalgan xonadon ustiga bosing va to'liq ma'lumotni oling.",
      param_floor: "Qavat:",
      param_area: "Umumiy maydon:",
      param_balcony: "Balkon / Terrasa:",
      param_ceiling: "Shift balandligi:",
      param_view: "Derazadan ko'rinish:",
      param_price: "Kvartira narxi:",
      mortgage_title: "Ipoteka & To'lov rejasi",
      btn_book_apt: "USHBU KVARTIRANI BAND QILISH",
      btn_view_blueprint: "2D ARXITEKTURA CHIZMASI",

      plans_tag: "NAMUNAVIY PLANLAR",
      plans_title: "Funktsional va Qulay Planlar",
      plans_desc: "Har bir metr kvadrat unumli foydalanilgan. Keng mehmonxona, shinam yotoqxonalar va panoramik oynali balkonlar.",

      amenities_tag: "INFRATUZILMA VA SERVIS",
      amenities_title: "Besh Yulduzli Qulayliklar Standarti",
      amenities_desc: "CEOBUILDING rezidensiyalarida yashash barcha kundalik ehtiyojlaringizni bino hududidan chiqmasdan qondirish imkonini beradi.",
      am1_title: "24/7 Grand Concierge",
      am1_desc: "Rezidentlar xizmatidagi shaxsiy konsyerj, mehmonlarni kutib olish va bron qilish xizmati.",
      am2_title: "2 Qavatli Avtoturargoh",
      am2_desc: "Elektromobillar uchun zaryadlash stansiyalari va avtomatlashtirilgan raqamni aniqlash tizimi.",
      am3_title: "Wellness & Spa Majmuasi",
      am3_desc: "25 metrli yopiq panoramik basseyn, fin saunasi va zamonaviy TechnoGym trenajyor zali.",
      am4_title: "Yopiq Yapon Bog'i",
      am4_desc: "Mashinalardan xoli xavfsiz ichki hovli, favvoralar va bolalar maydonchasi.",
      am5_title: "Tezyurar Otis Liftlari",
      am5_desc: "Sekundiga 2.5 metr tezlikda harakatlanuvchi shovqinsiz va shaxsiy kartochkali liftlar.",
      am6_title: "Ko'p Bosqichli Xavfsizlik",
      am6_desc: "Yuzni aniqlash Face-ID tizimi, 24/7 video-kuzatuv va xususiy qorovullik xizmati.",

      gallery_tag: "QURILISH VA ARXITEKTURA GALEREYASI",
      gallery_title: "Loyiha Fotoxronikasi va Vizualizatsiyasi",
      gallery_desc: "Qurilish maydonidagi real ish jarayonlari, kranlar, monolit poydevor va bo'lajak hashamatli interyerlar bilan tanishing.",
      gtab_all: "Barchasi",
      gtab_site: "Qurilish maydoni",
      gtab_facade: "Fasad va bino",
      gtab_interior: "Interyer & Bog'",
      g_site_badge: "QURILISH MAYDONI",
      g_facade_badge: "FASAD",
      g_interior_badge: "INTERYER",
      g1_title: "Monolit Karkas va Minora Kranlar",
      g1_sub: "Toshkent City markazidagi 14 qavatli majmua qurilishi",
      g2_title: "Panoramik Oynali Fasad",
      g2_sub: "Ikki kamerali termo-shisha va bronza kompozit panellar",
      g3_title: "Poydevor va Qavatlar Quyilishi",
      g3_sub: "B40 mustahkam beton va A500C armatura konstruksiyalari",
      g4_title: "24/7 Grand Concierge Lobbisi",
      g4_sub: "Marmar qoplamalar, iliq me'moriy yoritish va kutish zallari",
      g5_title: "Shaxsiy Yapon Bog'i va Favvoralar",
      g5_sub: "Mashinasiz xavfsiz hovli va rezidentlar saylgohi",
      g6_title: "Sky Penthouse Ochiq Terrasasi",
      g6_sub: "14-qavatdan shahar va bog'ning 360° panoramik manzarasi",

      location_tag: "STRATEGIK JOYLASHUV",
      location_title: "Toshkent City: Poytaxtning Eng Nufuzli Manzili",
      location_desc: "Bino Toshkent shahrining ishbilarmonlik va madaniy markazida joylashgan bo'lib, eng yaxshi parklar, biznes markazlar va restoranlarga bir necha daqiqalik masofada.",

      timeline_tag: "QURILISH JARAYONI VA MUDDATLAR",
      timeline_title: "Qurilish Bosqichlari va Tayyorlik Holati",
      timeline_desc: "Barcha qurilish ishlari xalqaro sifat standartlariga muvofiq o'z vaqtida bajarilmoqda. Quyida amaldagi bosqichlar keltirilgan.",
      t1_title: "Kotlovan va Poydevor",
      t1_desc: "12 metrli temir-beton svayalar va B40 monolit plita quyildi.",
      t2_title: "Monolit Karkas Qavatlar",
      t2_desc: "14 qavatli bino karkasi va ustunlar to'liq qad rostladi.",
      t3_title: "Fasad va Oynalash",
      t3_desc: "Termo-izolyatsiyalangan oynaviy konstruksiyalar montaji.",
      t4_title: "Ichki Muhandislik va Pardoz",
      t4_desc: "Liftlar, ventilyatsiya, elektr va vestibyul marmar qoplamalari.",
      t5_title: "Kalitlarni Topshirish",
      t5_desc: "Majmuani foydalanishga topshirish va rezidentlarni ko'chishi.",

      contact_tag: "SOTUV BO'LIMI VA BOG'LANISH",
      contact_title: "Orzungizdagi Rezidensiyani Tanlang",
      contact_desc: "Mutaxassislarimiz sizga loyiha, narxlar, to'lov shartlari va ipoteka dasturlari bo'yicha to'liq ma'lumot beradi.",
      form_title: "Bepul Maslahat va Bron Qilish",
      form_desc: "Telefon raqamingizni qoldiring, mutaxassisimiz 15 daqiqada bog'lanadi.",
      label_name: "Ismingiz *",
      label_phone: "Telefon raqamingiz *",
      label_unit: "Tanlangan kvartira (agar mavjud bo'lsa):",
      label_lang: "Muloqot tili:",
      btn_submit: "YUBORISH VA HISOB-KITOB OLISH"
    },
    ru: {
      nav_concept: "КОНЦЕПТ",
      nav_architecture: "АРХИТЕКТУРА",
      nav_apartments: "КВАРТИРЫ",
      nav_plans: "ПЛАНИРОВКИ",
      nav_amenities: "УДОБСТВА",
      nav_gallery: "ГАЛЕРЕЯ",
      nav_location: "ЛОКАЦИЯ",
      nav_timeline: "ХОД СТРОЙКИ",
      nav_contact: "КОНТАКТЫ",
      btn_choose_apt: "ВЫБРАТЬ КВАРТИРУ",

      hero_badge: "TASHKENT CITY // ПРЕМИАЛЬНЫЙ ЖИЛОЙ КОМПЛЕКС // 2026 ARCHITECTURE",
      hero_title_1: "Мы проектируем",
      hero_title_2: "впечатляющие",
      hero_title_3: "пространства.",
      hero_desc: "Синтез монументальной архитектуры и приватной роскоши в самом сердце Tashkent City. 14-этажный премиальный дом с панорамным остеклением, приватными террасами и благоустроенным парком.",
      hero_btn_select: "ВЫБРАТЬ КВАРТИРУ",
      hero_btn_explore: "О ПРОЕКТЕ",
      hero_coords_title: "КООРДИНАТЫ ОБЪЕКТА",
      scroll_hint: "ПРОКРУТИТЕ ВНИЗ",

      metric_floors: "Этажность",
      metric_residences: "Резиденции",
      metric_ceiling: "Высота потолков",
      metric_handover: "Срок сдачи",

      concept_tag: "ФИЛОСОФИЯ АРХИТЕКТУРЫ",
      concept_title: "Архитектура будущего и абсолютный комфорт для жизни.",
      concept_desc1: "CEOBUILDING — это не просто здание, а новый стандарт городской жизни. Мы объединили монолитный каркас с энергосберегающими панорамными фасадами, создав безопасную и гармоничную атмосферу в престижной локации столицы.",
      concept_desc2: "Инсоляция, шумоизоляция и циркуляция воздуха оптимизированы с помощью 4D BIM моделирования.",
      cc1_title: "Монолит M450 и сейсмика 9.0",
      cc1_desc: "Свайный фундамент и монолитный каркас с сейсмостойкостью до 9 баллов.",
      cc2_title: "Панорамный термофасад",
      cc2_desc: "Двухкамерные стеклопакеты со снижением уличного шума до 42 дБ и защитой от перегрева.",
      cc3_title: "Система Smart Building",
      cc3_desc: "Автоматизированное управление климатом, освещением и доступом через смартфон.",
      cc4_title: "Приватный ландшафтный парк",
      cc4_desc: "Закрытый двор без машин с фонтанами, японским садом и развивающими детскими зонами.",

      arch_tag: "3D МОДЕЛЬ И ЭТАЖИ",
      arch_title: "Интерактивная 3D Модель Здания",
      arch_desc: "Выберите этаж на 3D модели или переключайтесь между ракурсами. Изучайте высоту этажей, балконы и силуэт здания со всех сторон.",
      btn_view_floor_units: "ВЫБРАТЬ КВАРТИРЫ НА ЭТОМ ЭТАЖЕ →",

      selector_tag: "ОСНОВНОЙ ИНСТРУМЕНТ ВЫБОРА",
      selector_title: "Интерактивный Подбор Квартиры",
      selector_desc: "Выберите этаж слева, нажмите на квартиру на поэтажном плане и ознакомьтесь с параметрами, ценой и расчетом рассрочки.",
      stat_available: "Квартир в продаже",
      stat_reserved: "Забронировано",

      filter_rooms: "Количество комнат:",
      filter_price: "Максимальная цена (млн UZS):",
      filter_area: "Площадь (м²):",
      filter_available_only: "Только в продаже",
      btn_reset_filters: "СБРОСИТЬ ФИЛЬТРЫ",

      fsc_header: "ВЫБОР ЭТАЖА",
      status_available: "В продаже",
      status_reserved: "Бронь",
      status_sold: "Продано",

      apt_select_prompt: "Выберите квартиру",
      apt_select_prompt_sub: "Кликните на любую квартиру на плане для просмотра полной информации.",
      param_floor: "Этаж:",
      param_area: "Общая площадь:",
      param_balcony: "Балкон / Терраса:",
      param_ceiling: "Высота потолков:",
      param_view: "Вид из окон:",
      param_price: "Стоимость квартиры:",
      mortgage_title: "Ипотека и график платежей",
      btn_book_apt: "ЗАБРОНИРОВАТЬ ЭТУ КВАРТИРУ",
      btn_view_blueprint: "2D АРХИТЕКТУРНЫЙ ЧЕРТЕЖ",

      plans_tag: "ТИПОВЫЕ ПЛАНИРОВКИ",
      plans_title: "Продуманные Планировочные Решения",
      plans_desc: "Каждый квадратный метр спланирован с максимальной пользой. Просторные гостиные, изолированные спальни и панорамные балконы.",

      amenities_tag: "ИНФРАСТРУКТУРА И СЕРВИС",
      amenities_title: "Стандарт Пятизвездочного Комфорта",
      amenities_desc: "Проживание в CEOBUILDING дает доступ ко всем удобствам премиум-класса прямо на территории комплекса.",
      am1_title: "24/7 Гранд-Консьерж",
      am1_desc: "Персональный консьерж-сервис, прием гостей, доставка и бронирование сервисов.",
      am2_title: "2-уровневый паркинг",
      am2_desc: "Подземная парковка со станциями зарядки электромобилей и распознаванием номеров.",
      am3_title: "Велнес и Спа-центр",
      am3_desc: "25-метровый панорамный бассейн, финская сауна и тренажерный зал с оборудованием TechnoGym.",
      am4_title: "Японский сад во дворе",
      am4_desc: "Безопасный двор без машин с ландшафтным озеленением, беседками и детским клубом.",
      am5_title: "Скоростные лифты Otis",
      am5_desc: "Бесшумные скоростные лифты (2.5 м/с) с биометрическим доступом к этажу.",
      am6_title: "Многоуровневая безопасность",
      am6_desc: "Система распознавания лиц Face-ID, круглосуточное видеонаблюдение и служба охраны.",

      gallery_tag: "ГАЛЕРЕЯ СТРОИТЕЛЬСТВА И АРХИТЕКТУРЫ",
      gallery_title: "Фотохроника и Визуализация Проекта",
      gallery_desc: "Познакомьтесь с реальными процессами на стройплощадке, работой кранов, монолитным каркасом и будущими интерьерами.",
      gtab_all: "Все",
      gtab_site: "Стройплощадка",
      gtab_facade: "Фасад и здание",
      gtab_interior: "Интерьер и сад",
      g_site_badge: "СТРОЙПЛОЩАДКА",
      g_facade_badge: "ФАСАД",
      g_interior_badge: "ИНТЕРЬЕР",
      g1_title: "Монолитный каркас и башенные краны",
      g1_sub: "Строительство 14-этажного комплекса в центре Tashkent City",
      g2_title: "Панорамный остекленный фасад",
      g2_sub: "Двухкамерные стеклопакеты и бронзовые композитные панели",
      g3_title: "Фундамент и заливка перекрытий",
      g3_sub: "Высокопрочный бетон B40 и арматурные каркасы A500C",
      g4_title: "24/7 Гранд-лобби и консьерж",
      g4_sub: "Мраморная отделка, теплое архитектурное освещение и зоны отдыха",
      g5_title: "Приватный японский сад и фонтаны",
      g5_sub: "Безопасный двор без машин и прогулочные аллеи",
      g6_title: "Открытая терраса Sky Penthouse",
      g6_sub: "Круговая 360° панорама города и парка с 14 этажа",

      location_tag: "СТРАТЕГИЧЕСКАЯ ЛОКАЦИЯ",
      location_title: "Tashkent City: Самый Престижный Район",
      location_desc: "Комплекс расположен в главном деловом районе Ташкента в пешей доступности от парков, отелей и культурных объектов.",

      timeline_tag: "ХОД СТРОИТЕЛЬСТВА",
      timeline_title: "Этапы и Готовность Объекта",
      timeline_desc: "Строительные работы ведутся строго по графику с соблюдением международных норм качества.",
      t1_title: "Котлован и фундамент",
      t1_desc: "Забиты 12-метровые железобетонные сваи и залита монолитная плита B40.",
      t2_title: "Монолитный каркас этажей",
      t2_desc: "14 этажей каркаса здания и несущие колонны полностью возведены.",
      t3_title: "Фасад и остекление",
      t3_desc: "Монтаж панорамных термоизоляционных стеклопакетов.",
      t4_title: "Внутренняя инженерия и отделка",
      t4_desc: "Монтаж лифтов, вентиляции, электрики и отделка лобби мрамором.",
      t5_title: "Передача ключей",
      t5_desc: "Ввод комплекса в эксплуатацию и заселение резидентов.",

      contact_tag: "ОФИС ПРОДАЖ И КОНТАКТЫ",
      contact_title: "Выберите Свою Резиденцию",
      contact_desc: "Наши специалисты предоставят детальную информацию по планировкам, ценам и условиям рассрочки.",
      form_title: "Бесплатная Консультация и Бронь",
      form_desc: "Оставьте номер телефона, и старший специалист свяжется с вами в течение 15 минут.",
      label_name: "Ваше имя *",
      label_phone: "Номер телефона *",
      label_unit: "Выбранная квартира:",
      label_lang: "Язык общения:",
      btn_submit: "ОТПРАВИТЬ И ПОЛУЧИТЬ РАСЧЕТ"
    },
    en: {
      nav_concept: "CONCEPT",
      nav_architecture: "ARCHITECTURE",
      nav_apartments: "APARTMENTS",
      nav_plans: "FLOOR PLANS",
      nav_amenities: "AMENITIES",
      nav_gallery: "GALLERY",
      nav_location: "LOCATION",
      nav_timeline: "PROGRESS",
      nav_contact: "CONTACT",
      btn_choose_apt: "SELECT APARTMENT",

      hero_badge: "TASHKENT CITY // LUXURY RESIDENCES // 2026 ARCHITECTURE",
      hero_title_1: "We engineer",
      hero_title_2: "extraordinary",
      hero_title_3: "spaces.",
      hero_desc: "A harmonious synthesis of monumental architecture and private luxury in the heart of Tashkent City. 14 floors of refined residences, panoramic curtain glass and a secluded private botanical garden.",
      hero_btn_select: "SELECT APARTMENT",
      hero_btn_explore: "EXPLORE PROJECT",
      hero_coords_title: "SITE COORDINATES",
      scroll_hint: "SCROLL DOWN",

      metric_floors: "Total Floors",
      metric_residences: "Residences",
      metric_ceiling: "Ceiling Height",
      metric_handover: "Handover Date",

      concept_tag: "ARCHITECTURAL PHILOSOPHY",
      concept_title: "Where Monumental Design Meets Personal Sanctuary.",
      concept_desc1: "CEOBUILDING is not merely a residence; it is an architectural statement. We integrated monolithic engineering with energy-efficient glass facades, creating a tranquil retreat in Uzbekistan's most coveted business address.",
      concept_desc2: "Solar gain, acoustics and natural ventilation are perfected using advanced 4D BIM computational design.",
      cc1_title: "M450 Monolith & 9.0 Seismic",
      cc1_desc: "Engineered pile foundations and cast-in-place frame certified to withstand 9.0 magnitude seismic loads.",
      cc2_title: "High-Performance Facade",
      cc2_desc: "Double-glazed acoustic glass assemblies dampening street noise by up to 42 dB with solar heat shielding.",
      cc3_title: "Smart Building Automation",
      cc3_desc: "Integrated smartphone control for climate, lighting, and biometric access in every residence.",
      cc4_title: "Private Botanical Sanctuary",
      cc4_desc: "Car-free landscaped courtyard with cascading water features and private children's creative play zones.",

      arch_tag: "3D MODEL & FLOOR VIEWER",
      arch_title: "Interactive 3D Architectural Model",
      arch_desc: "Inspect the residential tower from any perspective. Click any floor to reveal its architectural height, balconies, and floor plate details.",
      btn_view_floor_units: "EXPLORE RESIDENCES ON THIS FLOOR →",

      selector_tag: "RESIDENCE SELECTOR SUITE",
      selector_title: "Interactive Apartment Selector",
      selector_desc: "Select a floor on the left, click any residence on the 2D architectural plate, and inspect unit specifications, pricing, and mortgage terms.",
      stat_available: "Available Units",
      stat_reserved: "Reserved Units",

      filter_rooms: "Bedrooms:",
      filter_price: "Max Price (mln UZS):",
      filter_area: "Area (m²):",
      filter_available_only: "Available units only",
      btn_reset_filters: "RESET FILTERS",

      fsc_header: "SELECT FLOOR",
      status_available: "Available",
      status_reserved: "Reserved",
      status_sold: "Sold",

      apt_select_prompt: "Select an Apartment",
      apt_select_prompt_sub: "Click on any apartment unit on the architectural floor plan to view full specifications.",
      param_floor: "Floor:",
      param_area: "Total Area:",
      param_balcony: "Balcony / Terrace:",
      param_ceiling: "Ceiling Height:",
      param_view: "Window Orientation:",
      param_price: "Total Price:",
      mortgage_title: "Mortgage & Payment Breakdown",
      btn_book_apt: "INQUIRE ABOUT THIS APARTMENT",
      btn_view_blueprint: "2D ARCHITECTURAL BLUEPRINT",

      plans_tag: "CURATED FLOOR PLANS",
      plans_title: "Thoughtful & Ergonomic Layouts",
      plans_desc: "Every square meter is maximized for natural illumination and comfortable living. Spacious entertaining rooms, master suites and panoramic terraces.",

      amenities_tag: "AMENITIES & CONCIERGE",
      amenities_title: "Five-Star Residential Living",
      amenities_desc: "Living at CEOBUILDING means enjoying luxury hotel-grade conveniences within your own building.",
      am1_title: "24/7 Grand Concierge",
      am1_desc: "Dedicated resident concierge, valet assistance, parcel reception, and private service bookings.",
      am2_title: "2-Level Subterranean Garage",
      am2_desc: "Underground parking with high-capacity EV charging bays and automated license-plate recognition.",
      am3_title: "Wellness & Panoramic Spa",
      am3_desc: "25-meter indoor heated pool, Finnish sauna, and state-of-the-art TechnoGym fitness center.",
      am4_title: "Zen Courtyard Garden",
      am4_desc: "Car-free tranquil courtyard with Japanese stone gardens, fountains, and dedicated play areas.",
      am5_title: "Otis High-Speed Elevators",
      am5_desc: "Ultra-quiet passenger elevators travelling at 2.5 m/s with private keycard destination dispatch.",
      am6_title: "Multi-Tiered Security",
      am6_desc: "Biometric Face-ID access, perimeter monitoring, and round-the-clock security personnel.",

      gallery_tag: "CONSTRUCTION & ARCHITECTURE GALLERY",
      gallery_title: "Project Photo Chronicles & Imagery",
      gallery_desc: "Explore ongoing construction site processes, tower cranes, monolithic works, and future luxury interiors.",
      gtab_all: "All",
      gtab_site: "Construction Site",
      gtab_facade: "Facade & Tower",
      gtab_interior: "Interior & Courtyard",
      g_site_badge: "CONSTRUCTION SITE",
      g_facade_badge: "FACADE",
      g_interior_badge: "INTERIOR",
      g1_title: "Monolithic Skeleton & Tower Cranes",
      g1_sub: "Construction of the 14-story residential complex in Tashkent City",
      g2_title: "Panoramic Glazed Facade",
      g2_sub: "Double-glazed high-efficiency curtain wall and bronze panels",
      g3_title: "Foundation & Concrete Works",
      g3_sub: "B40 high-strength concrete and A500C steel framework",
      g4_title: "24/7 Grand Concierge Lobby",
      g4_sub: "Marble finishes, warm ambient illumination and resident lounge",
      g5_title: "Private Zen Courtyard Garden & Fountains",
      g5_sub: "Car-free secured garden and walking paths for residents",
      g6_title: "Open-Air Sky Penthouse Terrace",
      g6_sub: "360° panoramic city and park skyline view from the 14th floor",

      location_tag: "STRATEGIC LOCATION",
      location_title: "Tashkent City: The Capital's Prestigious Core",
      location_desc: "Situated right in Tashkent's premier financial and cultural district, steps away from central park fountains, five-star hotels and fine dining.",

      timeline_tag: "CONSTRUCTION PROGRESS",
      timeline_title: "Development Milestones & Schedule",
      timeline_desc: "Construction is progressing strictly on schedule according to rigorous international structural codes.",
      t1_title: "Excavation & Foundation",
      t1_desc: "12-meter reinforced concrete piles driven and B40 foundation slab poured.",
      t2_title: "Monolithic Concrete Frame",
      t2_desc: "All 14 floors of structural columns and slabs fully cast.",
      t3_title: "Facade & Glazing",
      t3_desc: "Installation of high-performance thermal curtain wall glazing.",
      t4_title: "MEP Systems & Interior Fit-Out",
      t4_desc: "Elevators, HVAC, electrical infrastructure and marble lobby finishes.",
      t5_title: "Handover & Keys",
      t5_desc: "Commissioning of the residence complex and move-in.",

      contact_tag: "SALES GALLERY & INQUIRIES",
      contact_title: "Select Your Residence Today",
      contact_desc: "Our senior sales advisors will guide you through floor selections, custom fit-outs, and flexible financing arrangements.",
      form_title: "Request Private Consultation",
      form_desc: "Leave your phone number, and our senior advisor will contact you within 15 minutes.",
      label_name: "Full Name *",
      label_phone: "Phone Number *",
      label_unit: "Selected Residence:",
      label_lang: "Preferred Language:",
      btn_submit: "SUBMIT INQUIRY & GET ESTIMATE"
    }
  };

  window.currentLanguage = 'uz';
  window.currentPlanType = '2b';

  function applyLanguage(lang) {
    window.currentLanguage = lang;
    const t = translations[lang] || translations.uz;

    // 1. Обновляем все элементы с data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.textContent = t[key];
      }
    });

    // 2. Активная кнопка языка
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });

    // 3. Обновляем список этажей без сброса выбора
    updateFloorSelectorUI();

    // 4. Обновляем поэтажный план
    if (window.currentFloorPlan) {
      window.currentFloorPlan.renderFloor(
        window.activeFloorNumber, 
        window.activeApartment ? window.activeApartment.number : null
      );
    }

    // 5. Обновляем карточку выбранной квартиры в новом языке
    if (window.activeApartment) {
      selectApartment(window.activeApartment);
    }

    // 6. Обновляем демонстрационную планировку
    showFeaturedPlan(window.currentPlanType || '2b');

    // 7. Обновляем плашку 3D HUD
    update3DHud(window.activeFloorNumber || 12);
  }

  // Слушатель переключения языков
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const lang = e.currentTarget.getAttribute('data-lang');
      applyLanguage(lang);
    });
  });

  // 2. ИНИЦИАЛИЗАЦИЯ 3D ЗДАНИЯ (THREE.JS)
  let building3D = null;
  const canvasContainer = document.getElementById('building-3d-canvas');
  if (canvasContainer) {
    building3D = new Residential3DBuilding('building-3d-canvas', {
      onFloorClick: (floorNumber) => {
        selectFloor(floorNumber, true);
      },
      onFloorHover: (floorNumber) => {
        update3DHud(floorNumber);
      }
    });
  }

  // Режимы 3D камеры
  document.querySelectorAll('.cam-pill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mode = btn.getAttribute('data-mode');
      document.querySelectorAll('.cam-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (building3D) building3D.setCameraMode(mode);
    });
  });

  // Плашка 3D HUD
  const fhudFloorName = document.getElementById('fhud-floor-name');
  const fhudFloorInfo = document.getElementById('fhud-floor-info');
  const fhudJumpBtn = document.getElementById('fhud-jump-btn');

  function update3DHud(floorNumber) {
    if (!floorNumber) return;
    const stats = window.APARTMENTS_CATALOG.getFloorStats(floorNumber);
    if (fhudFloorName) fhudFloorName.textContent = stats.name[window.currentLanguage || 'uz'];
    if (fhudFloorInfo) {
      if (floorNumber === 1) {
        fhudFloorInfo.textContent = "Grand Lobby, Wellness & Concierge";
      } else {
        const availText = window.currentLanguage === 'ru' ? 'квартир в продаже' : (window.currentLanguage === 'en' ? 'available units' : 'ta kvartira mavjud');
        fhudFloorInfo.textContent = `Shift: 3.30 m • ${stats.available} ${availText}`;
      }
    }
  }

  if (fhudJumpBtn) {
    fhudJumpBtn.addEventListener('click', () => {
      const targetFloor = building3D ? building3D.selectedFloor : 12;
      selectFloor(targetFloor, true);
      const el = document.getElementById('apartments');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 3. СЕЛЕКТОР КВАРТИР (APARTMENT SELECTOR CORE)
  window.activeFloorNumber = 12;
  window.activeApartment = null;

  // Инициализация рендера поэтажного плана
  const floorPlanRenderer = new FloorPlanRenderer('interactive-floorplan-container', (selectedApt) => {
    selectApartment(selectedApt);
  });
  window.currentFloorPlan = floorPlanRenderer;

  // Генерация кнопок этажей (от 14 до 1)
  const floorButtonsList = document.getElementById('floor-buttons-list');
  function updateFloorSelectorUI() {
    if (!floorButtonsList) return;
    floorButtonsList.innerHTML = '';

    for (let f = 14; f >= 1; f--) {
      const stats = window.APARTMENTS_CATALOG.getFloorStats(f);
      const isActive = (f === window.activeFloorNumber);

      const btn = document.createElement('button');
      btn.className = `btn-floor-row ${isActive ? 'active' : ''}`;
      btn.setAttribute('data-floor', f);

      let badgeHtml = `<span class="bfr-badge">${stats.available} ta</span>`;
      if (f === 1) badgeHtml = `<span class="bfr-badge">Lobby</span>`;

      btn.innerHTML = `
        <span class="bfr-num">${f}F</span>
        <span class="bfr-name">${stats.name[window.currentLanguage || 'uz']}</span>
        ${badgeHtml}
      `;

      btn.addEventListener('click', () => {
        selectFloor(f);
      });

      floorButtonsList.appendChild(btn);
    }
  }

  // Выбор этажа
  function selectFloor(floorNumber, scrollIntoView = false) {
    window.activeFloorNumber = floorNumber;

    // Синхронизация с 3D
    if (building3D) {
      building3D.selectFloor(floorNumber, false);
      update3DHud(floorNumber);
    }

    // Подсветка кнопок этажей
    document.querySelectorAll('.btn-floor-row').forEach(b => {
      const f = parseInt(b.getAttribute('data-floor'), 10);
      b.classList.toggle('active', f === floorNumber);
    });

    // Отрисовка плана этажа
    floorPlanRenderer.renderFloor(floorNumber, window.activeApartment ? window.activeApartment.number : null);

    if (scrollIntoView) {
      const aptSec = document.getElementById('apartments');
      if (aptSec) aptSec.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 4. ДЕТАЛИ ВЫБРАННОЙ КВАРТИРЫ
  const aptCardPlaceholder = document.getElementById('apt-card-placeholder');
  const aptCardData = document.getElementById('apt-card-data');
  const cardNumber = document.getElementById('card-number');
  const cardStatusBadge = document.getElementById('card-status-badge');
  const cardRoomsTitle = document.getElementById('card-rooms-title');
  const cardFloor = document.getElementById('card-floor');
  const cardArea = document.getElementById('card-area');
  const cardBalcony = document.getElementById('card-balcony');
  const cardCeiling = document.getElementById('card-ceiling');
  const cardView = document.getElementById('card-view');
  const cardPrice = document.getElementById('card-price');
  const cardMeterPrice = document.getElementById('card-meter-price');
  const cardMonthlyPayment = document.getElementById('card-monthly-payment');
  const cardThumbImg = document.getElementById('card-thumb-img');
  const formSelectedAptInput = document.getElementById('form-selected-apt');

  function selectApartment(apt) {
    window.activeApartment = apt;
    if (!apt) return;

    if (aptCardPlaceholder) aptCardPlaceholder.classList.add('hidden');
    if (aptCardData) aptCardData.classList.remove('hidden');

    if (cardNumber) cardNumber.textContent = apt.number;

    // Обновляем превью-фотографию (для пентхаусов — терраса, для обычных — фасад башни)
    if (cardThumbImg) {
      cardThumbImg.src = apt.isPenthouse 
        ? 'assets/images/penthouse-terrace.webp' 
        : 'assets/images/tower-facade.webp';
    }

    if (cardStatusBadge) {
      cardStatusBadge.className = `apt-status-badge ${apt.status}`;
      const statusTexts = {
        available: { uz: 'MAVJUD', ru: 'В ПРОДАЖЕ', en: 'AVAILABLE' },
        reserved: { uz: 'BAND', ru: 'БРОНЬ', en: 'RESERVED' },
        sold: { uz: 'SOTILGAN', ru: 'ПРОДАНО', en: 'SOLD' }
      };
      cardStatusBadge.textContent = statusTexts[apt.status][window.currentLanguage || 'uz'];
    }

    if (cardRoomsTitle) {
      let roomWord = `${apt.rooms} xonali Rezidensiya`;
      if (apt.isPenthouse) {
        roomWord = window.currentLanguage === 'ru' ? 'Видовой Sky Penthouse' : (window.currentLanguage === 'en' ? 'Panoramic Sky Penthouse' : 'Ko\'rkam Sky Penthouse');
      } else if (window.currentLanguage === 'ru') {
        roomWord = `${apt.rooms}-комнатная Резиденция`;
      } else if (window.currentLanguage === 'en') {
        roomWord = `${apt.rooms}-Bedroom Residence`;
      }
      cardRoomsTitle.textContent = roomWord;
    }

    if (cardFloor) cardFloor.textContent = `${apt.floor}-qavat`;
    if (cardArea) cardArea.textContent = `${apt.area} m²`;
    if (cardBalcony) cardBalcony.textContent = `${apt.balconyArea} m²`;
    if (cardCeiling) cardCeiling.textContent = apt.ceilingHeight;
    if (cardView) cardView.textContent = apt.view[window.currentLanguage || 'uz'];

    if (cardPrice) cardPrice.textContent = window.APARTMENTS_CATALOG.formatUZS(apt.totalPrice);
    if (cardMeterPrice) cardMeterPrice.textContent = window.APARTMENTS_CATALOG.formatUZS(apt.meterPrice) + " / m²";

    // Расчет ипотеки
    const mortgage = window.APARTMENTS_CATALOG.calculateMortgage(apt.totalPrice, 30, 10);
    if (cardMonthlyPayment) {
      cardMonthlyPayment.textContent = window.APARTMENTS_CATALOG.formatUZS(mortgage.monthlyPayment);
    }

    // Авто-заполнение формы заявки
    if (formSelectedAptInput) {
      formSelectedAptInput.value = `${apt.number} (${apt.rooms} xonali, ${apt.area} m² - ${window.APARTMENTS_CATALOG.formatUZS(apt.totalPrice)})`;
    }
  }

  // Кнопка "Band qilish" (В карточке деталей)
  const btnInquireSelected = document.getElementById('btn-inquire-selected');
  if (btnInquireSelected) {
    btnInquireSelected.addEventListener('click', () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const nameInput = document.getElementById('form-user-name');
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
    });
  }

  // Кнопка "2D Chizmani ko'rish" (Модальное окно чертежа)
  const btnViewBlueprint = document.getElementById('btn-view-blueprint');
  const blueprintModal = document.getElementById('blueprint-modal');
  const blueprintModalBody = document.getElementById('blueprint-modal-body');
  const btnCloseBlueprint = document.getElementById('btn-close-blueprint');

  if (btnViewBlueprint && blueprintModal && blueprintModalBody) {
    btnViewBlueprint.addEventListener('click', () => {
      if (!window.activeApartment) return;
      blueprintModalBody.innerHTML = FloorPlanRenderer.renderApartmentBlueprint(window.activeApartment);
      blueprintModal.classList.add('open');
    });
  }

  if (btnCloseBlueprint && blueprintModal) {
    btnCloseBlueprint.addEventListener('click', () => {
      blueprintModal.classList.remove('open');
    });
  }

  if (blueprintModal) {
    blueprintModal.addEventListener('click', (e) => {
      if (e.target === blueprintModal) {
        blueprintModal.classList.remove('open');
      }
    });
  }

  // 5. ФИЛЬТРАЦИЯ КВАРТИР
  let filterRooms = 'all';
  let filterMaxPrice = 3000;
  let filterMaxArea = 160;
  let filterAvailableOnly = true;

  const roomChips = document.querySelectorAll('.room-chip');
  const priceRange = document.getElementById('filter-price-range');
  const priceVal = document.getElementById('filter-price-val');
  const areaRange = document.getElementById('filter-area-range');
  const areaVal = document.getElementById('filter-area-val');
  const availCheckbox = document.getElementById('filter-available-only');
  const btnReset = document.getElementById('btn-reset-filters');

  roomChips.forEach(chip => {
    chip.addEventListener('click', () => {
      roomChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      filterRooms = chip.getAttribute('data-rooms');
      applyFilters();
    });
  });

  if (priceRange && priceVal) {
    priceRange.addEventListener('input', (e) => {
      filterMaxPrice = parseInt(e.target.value, 10);
      priceVal.textContent = `${filterMaxPrice.toLocaleString()} mln`;
      applyFilters();
    });
  }

  if (areaRange && areaVal) {
    areaRange.addEventListener('input', (e) => {
      filterMaxArea = parseInt(e.target.value, 10);
      areaVal.textContent = `${filterMaxArea} m² gacha`;
      applyFilters();
    });
  }

  if (availCheckbox) {
    availCheckbox.addEventListener('change', (e) => {
      filterAvailableOnly = e.target.checked;
      applyFilters();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      filterRooms = 'all';
      filterMaxPrice = 3000;
      filterMaxArea = 160;
      filterAvailableOnly = true;

      roomChips.forEach(c => c.classList.toggle('active', c.getAttribute('data-rooms') === 'all'));
      if (priceRange) priceRange.value = 3000;
      if (priceVal) priceVal.textContent = "3,000 mln";
      if (areaRange) areaRange.value = 160;
      if (areaVal) areaVal.textContent = "160 m² gacha";
      if (availCheckbox) availCheckbox.checked = true;

      applyFilters();
    });
  }

  function applyFilters() {
    const all = window.APARTMENTS_CATALOG.allApartments;
    const filtered = all.filter(apt => {
      if (filterRooms !== 'all') {
        const r = parseInt(filterRooms, 10);
        if (r === 4) {
          if (apt.rooms < 4) return false;
        } else {
          if (apt.rooms !== r) return false;
        }
      }
      const priceMln = apt.totalPrice / 1000000;
      if (priceMln > filterMaxPrice) return false;
      if (apt.area > filterMaxArea) return false;
      if (filterAvailableOnly && apt.status !== 'available') return false;

      return true;
    });

    if (filtered.length > 0) {
      const matchOnCurrent = filtered.some(a => a.floor === window.activeFloorNumber);
      if (!matchOnCurrent) {
        selectFloor(filtered[0].floor);
      } else {
        floorPlanRenderer.renderFloor(window.activeFloorNumber);
      }
    }
  }

  // 6. СЕКЦИЯ ПЛАНИРОВОК (PLANLAR SHOWCASE)
  const planTabs = document.querySelectorAll('.plan-tab');
  const featuredPlanDisplay = document.getElementById('featured-plan-display');

  const sampleApts = {
    '1b': { number: 'TYPE-1B (44.5 m²)', rooms: 1, area: 44.5, balconyArea: 3.5, roomsBreakdown: { living: 18.5, bedroom1: 0, kitchen: 12.5, bath: 4.5, corridor: 5.5 } },
    '2b': { number: 'TYPE-2B (64.2 m²)', rooms: 2, area: 64.2, balconyArea: 4.8, roomsBreakdown: { living: 22.4, bedroom1: 16.8, kitchen: 12.0, bath: 5.2, corridor: 7.8 } },
    '3b': { number: 'TYPE-3B (88.6 m²)', rooms: 3, area: 88.6, balconyArea: 6.2, roomsBreakdown: { living: 28.0, bedroom1: 18.2, bedroom2: 15.4, kitchen: 14.0, bath: 6.5, corridor: 6.5 } },
    'ph': { number: 'SKY PENTHOUSE (146.5 m²)', rooms: 4, area: 146.5, balconyArea: 28.5, roomsBreakdown: { living: 45.0, bedroom1: 24.0, bedroom2: 19.5, bedroom3: 16.0, kitchen: 20.0, bath: 12.0, corridor: 10.0 } }
  };

  function showFeaturedPlan(type) {
    window.currentPlanType = type;
    const apt = sampleApts[type] || sampleApts['2b'];
    if (featuredPlanDisplay) {
      featuredPlanDisplay.innerHTML = FloorPlanRenderer.renderApartmentBlueprint(apt);
    }
  }

  planTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      planTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      showFeaturedPlan(tab.getAttribute('data-type'));
    });
  });

  // 7. СЕКЦИЯ ГАЛЕРЕИ (ИНТЕРАКТИВНАЯ ФИЛЬТРАЦИЯ КАТЕГОРИЙ)
  const galleryFilterTabs = document.querySelectorAll('#gallery-filter-tabs .g-tab');
  const galleryItems = document.querySelectorAll('.gallery-item');

  galleryFilterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      galleryFilterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 8. ФОРМА ЗАЯВКИ (DEMO SUBMISSION & VALIDATION)
  const inquiryForm = document.getElementById('main-inquiry-form');
  const formStatusBox = document.getElementById('form-status-box');

  if (inquiryForm) {
    inquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-user-name').value.trim();
      const phone = document.getElementById('form-user-phone').value.trim();
      const unit = document.getElementById('form-selected-apt').value;
      const lang = document.getElementById('form-user-lang').value;

      if (!name || !phone) return;

      const submitBtn = document.getElementById('btn-submit-form');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "...";
      }

      setTimeout(() => {
        if (formStatusBox) {
          formStatusBox.className = 'form-status-alert success';
          formStatusBox.innerHTML = `
            <strong>Rahmat, ${name}!</strong> Zayavkangiz qabul qilindi.<br>
            Tanlangan: <em>${unit}</em>.<br>
            Mutaxassisimiz tez orada ${phone} raqamingizga qo'ng'iroq qiladi.
          `;
          formStatusBox.classList.remove('hidden');
        }

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = translations[window.currentLanguage || 'uz'].btn_submit;
        }

        inquiryForm.reset();
      }, 700);
    });
  }

  // 9. МОБИЛЬНОЕ МЕНЮ
  const mobileToggle = document.getElementById('mobile-toggle');
  const mainNav = document.getElementById('main-nav');
  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isVisible = mainNav.style.display === 'flex';
      mainNav.style.display = isVisible ? 'none' : 'flex';
    });

    document.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 992) {
          mainNav.style.display = 'none';
        }
      });
    });
  }

  // 10. СТАРТОВАЯ ИНИЦИАЛИЗАЦИЯ
  updateFloorSelectorUI();
  selectFloor(12);

  // Выбираем по умолчанию квартиру A-1204
  const defaultApt = window.APARTMENTS_CATALOG.allApartments.find(a => a.number === 'A-1204');
  if (defaultApt) selectApartment(defaultApt);

  showFeaturedPlan('2b');
});
