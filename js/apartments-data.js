/* ==========================================================================
   CEOBUILDING — APARTMENTS & RESIDENTIAL REAL ESTATE CATALOG DATA
   Contains structured data for 14 floors, ~90 apartment units,
   architectural floor plans, pricing, mortgage calculations & filters.
   (Marked clearly as Demonstration Data for CEOBUILDING)
   ========================================================================== */

const APARTMENTS_CATALOG = (() => {
  // Базовая стоимость квадратного метра по этажам (в сумах)
  // Чем выше этаж, тем более панорамный вид
  const getBaseMeterPrice = (floor) => {
    if (floor === 14) return 18500000; // Пентхаусы
    if (floor >= 10) return 15800000; // Верхние этажи
    if (floor >= 5) return 14200000;  // Средние этажи
    return 13200000;                  // Нижние этажи
  };

  // Шаблоны планировок квартир на типовом этаже (2–13)
  const typicalUnitTemplates = [
    {
      unitSuffix: '01',
      rooms: 2,
      area: 64.2,
      viewUz: "Tashkent City bog'i",
      viewRu: "Парк Tashkent City",
      viewEn: "Tashkent City Park",
      balconyArea: 4.8,
      planSvgId: 'plan-2b-a',
      roomsBreakdown: {
        living: 22.4,
        bedroom1: 16.8,
        kitchen: 12.0,
        bath: 5.2,
        corridor: 7.8
      }
    },
    {
      unitSuffix: '02',
      rooms: 1,
      area: 44.5,
      viewUz: "Shahar panoramasi (Sharq)",
      viewRu: "Панорама города (Восток)",
      viewEn: "City Panorama (East)",
      balconyArea: 3.5,
      planSvgId: 'plan-1b-a',
      roomsBreakdown: {
        living: 18.5,
        bedroom1: 0,
        kitchen: 12.5,
        bath: 4.5,
        corridor: 5.5
      }
    },
    {
      unitSuffix: '03',
      rooms: 3,
      area: 88.6,
      viewUz: "Tashkent City markazi va favvora",
      viewRu: "Центр Tashkent City и фонтан",
      viewEn: "Tashkent City Center & Fountain",
      balconyArea: 6.2,
      planSvgId: 'plan-3b-a',
      roomsBreakdown: {
        living: 28.0,
        bedroom1: 18.2,
        bedroom2: 15.4,
        kitchen: 14.0,
        bath: 6.5,
        corridor: 6.5
      }
    },
    {
      unitSuffix: '04',
      rooms: 2,
      area: 68.0,
      viewUz: "Yashil xiyobon va hovli",
      viewRu: "Зеленый бульвар и двор",
      viewEn: "Green Boulevard & Courtyard",
      balconyArea: 5.0,
      planSvgId: 'plan-2b-b',
      roomsBreakdown: {
        living: 24.0,
        bedroom1: 17.5,
        kitchen: 13.0,
        bath: 5.5,
        corridor: 8.0
      }
    },
    {
      unitSuffix: '05',
      rooms: 1,
      area: 48.2,
      viewUz: "Ichki sokin hovli bog'i",
      viewRu: "Тихий внутренний сад",
      viewEn: "Quiet Courtyard Garden",
      balconyArea: 3.8,
      planSvgId: 'plan-1b-b',
      roomsBreakdown: {
        living: 20.2,
        bedroom1: 0,
        kitchen: 13.5,
        bath: 4.8,
        corridor: 5.9
      }
    },
    {
      unitSuffix: '06',
      rooms: 3,
      area: 92.4,
      viewUz: "Janubiy quyoshli panorama",
      viewRu: "Южная солнечная панорама",
      viewEn: "Southern Sunny Panorama",
      balconyArea: 7.0,
      planSvgId: 'plan-3b-b',
      roomsBreakdown: {
        living: 30.5,
        bedroom1: 19.0,
        bedroom2: 16.5,
        kitchen: 13.4,
        bath: 6.8,
        corridor: 6.2
      }
    },
    {
      unitSuffix: '07',
      rooms: 2,
      area: 72.5,
      viewUz: "G'arbiy quyosh botishi",
      viewRu: "Западный закат",
      viewEn: "Western Sunset",
      balconyArea: 5.4,
      planSvgId: 'plan-2b-c',
      roomsBreakdown: {
        living: 25.5,
        bedroom1: 18.0,
        kitchen: 14.5,
        bath: 5.8,
        corridor: 8.7
      }
    }
  ];

  // Шаблоны пентхаусов на 14 этаже (Sky Penthouses)
  const penthouseTemplates = [
    {
      unitSuffix: '01',
      rooms: 4,
      area: 146.5,
      viewUz: "360° Tashkent City to'liq panoramasi",
      viewRu: "Круговая 360° панорама Tashkent City",
      viewEn: "360° Tashkent City Panoramic Skyline",
      balconyArea: 28.5, // Терраса на крыше
      planSvgId: 'plan-ph-a',
      roomsBreakdown: {
        living: 45.0,
        bedroom1: 24.0,
        bedroom2: 19.5,
        bedroom3: 16.0,
        kitchen: 20.0,
        bath: 12.0,
        corridor: 10.0
      }
    },
    {
      unitSuffix: '02',
      rooms: 3,
      area: 118.0,
      viewUz: "Sharqiy tog'lar va shahar osmoni",
      viewRu: "Восточные горы и панорама города",
      viewEn: "Eastern Mountains & City Skyline",
      balconyArea: 22.0,
      planSvgId: 'plan-ph-b',
      roomsBreakdown: {
        living: 38.0,
        bedroom1: 22.0,
        bedroom2: 18.0,
        kitchen: 18.0,
        bath: 11.0,
        corridor: 11.0
      }
    },
    {
      unitSuffix: '03',
      rooms: 4,
      area: 154.2,
      viewUz: "Janubiy-g'arbiy quyosh botishi va bog'",
      viewRu: "Юго-западный закат и парк",
      viewEn: "South-West Sunset & Park",
      balconyArea: 32.0,
      planSvgId: 'plan-ph-c',
      roomsBreakdown: {
        living: 48.0,
        bedroom1: 26.0,
        bedroom2: 20.0,
        bedroom3: 17.5,
        kitchen: 21.0,
        bath: 12.7,
        corridor: 9.0
      }
    }
  ];

  // Генерация всей базы данных квартир
  const allApartments = [];

  // Этаж 1: Лобби, Wellness, консьерж и бизнес-пространство (без жилых квартир)
  // Этажи 2–13: Типовые жилые
  for (let floor = 2; floor <= 13; floor++) {
    typicalUnitTemplates.forEach((tmpl, idx) => {
      const unitNumber = `A-${floor}${tmpl.unitSuffix}`;
      const meterPrice = getBaseMeterPrice(floor);
      const totalPrice = Math.round(tmpl.area * meterPrice);

      // Реалистичное распределение статусов (большинство продано/доступно)
      // Пример: несколько продано, несколько забронировано, большинство доступно
      let status = 'available';
      const hash = (floor * 7 + idx * 13) % 10;
      if (hash === 2 || hash === 6) status = 'sold';
      else if (hash === 4 || hash === 8) status = 'reserved';

      allApartments.push({
        id: unitNumber,
        number: unitNumber,
        floor: floor,
        rooms: tmpl.rooms,
        area: tmpl.area,
        balconyArea: tmpl.balconyArea,
        meterPrice: meterPrice,
        totalPrice: totalPrice,
        status: status, // 'available' | 'reserved' | 'sold'
        view: {
          uz: tmpl.viewUz,
          ru: tmpl.viewRu,
          en: tmpl.viewEn
        },
        planSvgId: tmpl.planSvgId,
        roomsBreakdown: tmpl.roomsBreakdown,
        isPenthouse: false,
        ceilingHeight: '3.30 m'
      });
    });
  }

  // Этаж 14: Sky Penthouses
  penthouseTemplates.forEach((tmpl, idx) => {
    const unitNumber = `PH-14${tmpl.unitSuffix}`;
    const meterPrice = getBaseMeterPrice(14);
    const totalPrice = Math.round(tmpl.area * meterPrice);

    let status = 'available';
    if (idx === 1) status = 'reserved';

    allApartments.push({
      id: unitNumber,
      number: unitNumber,
      floor: 14,
      rooms: tmpl.rooms,
      area: tmpl.area,
      balconyArea: tmpl.balconyArea,
      meterPrice: meterPrice,
      totalPrice: totalPrice,
      status: status,
      view: {
        uz: tmpl.viewUz,
        ru: tmpl.viewRu,
        en: tmpl.viewEn
      },
      planSvgId: tmpl.planSvgId,
      roomsBreakdown: tmpl.roomsBreakdown,
      isPenthouse: true,
      ceilingHeight: '3.80 m'
    });
  });

  // Получить статистику по этажу
  const getFloorStats = (floorNumber) => {
    const floorUnits = allApartments.filter(a => a.floor === floorNumber);
    const total = floorUnits.length;
    const available = floorUnits.filter(a => a.status === 'available').length;
    const reserved = floorUnits.filter(a => a.status === 'reserved').length;
    const sold = floorUnits.filter(a => a.status === 'sold').length;

    let floorName = {
      uz: `${floorNumber}-qavat`,
      ru: `${floorNumber} этаж`,
      en: `Floor ${floorNumber}`
    };

    if (floorNumber === 1) {
      floorName = {
        uz: "1-qavat: Grand Lobby & Wellness",
        ru: "1 этаж: Гранд Лобби & Велнес",
        en: "Floor 1: Grand Lobby & Wellness"
      };
    } else if (floorNumber === 14) {
      floorName = {
        uz: "14-qavat: Sky Penthouses & Terraces",
        ru: "14 этаж: Скай Пентхаусы и Террасы",
        en: "Floor 14: Sky Penthouses & Terraces"
      };
    }

    return {
      floor: floorNumber,
      name: floorName,
      total,
      available,
      reserved,
      sold,
      units: floorUnits
    };
  };

  // Получить общую статистику комплекса
  const getComplexOverview = () => {
    const total = allApartments.length;
    const available = allApartments.filter(a => a.status === 'available').length;
    const reserved = allApartments.filter(a => a.status === 'reserved').length;
    const sold = allApartments.filter(a => a.status === 'sold').length;

    const minPrice = Math.min(...allApartments.map(a => a.totalPrice));
    const maxPrice = Math.max(...allApartments.map(a => a.totalPrice));
    const minArea = Math.min(...allApartments.map(a => a.area));
    const maxArea = Math.max(...allApartments.map(a => a.area));

    return {
      totalFloors: 14,
      totalResidences: total,
      availableCount: available,
      reservedCount: reserved,
      soldCount: sold,
      minPrice,
      maxPrice,
      minArea,
      maxArea
    };
  };

  // Расчет примерного ежемесячного платежа (ипотека / рассрочка)
  // Формула аннуитета: PMT = P * r * (1+r)^n / ((1+r)^n - 1)
  const calculateMortgage = (totalPrice, downPaymentPercent = 30, years = 10, annualRatePercent = 17) => {
    const downPayment = Math.round(totalPrice * (downPaymentPercent / 100));
    const principal = totalPrice - downPayment;
    const monthlyRate = (annualRatePercent / 100) / 12;
    const months = years * 12;

    const monthlyPayment = Math.round(
      principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1)
    );

    return {
      totalPrice,
      downPaymentPercent,
      downPayment,
      loanAmount: principal,
      years,
      monthlyPayment,
      isDemo: true
    };
  };

  // Форматирование цены в сумах (узбекских)
  const formatUZS = (amount) => {
    return new Intl.NumberFormat('uz-UZ').format(amount) + " UZS";
  };

  return {
    allApartments,
    getFloorStats,
    getComplexOverview,
    calculateMortgage,
    formatUZS
  };
})();

// Экспорт в глобальную область видимости
window.APARTMENTS_CATALOG = APARTMENTS_CATALOG;
