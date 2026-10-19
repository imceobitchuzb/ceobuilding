/* ==========================================================================
   CEOBUILDING — КАТАЛОГ РЕЗИДЕНЦИЙ И АРХИТЕКТУРНЫХ ПЛАНИРОВОК
   Структурированная база данных: 14 этажей, 87 резиденций,
   расчет стоимости, ипотеки и планировочные решения.
   Поддержка двух языков: Русский (RU) и Английский (EN).
   ========================================================================== */

const APARTMENTS_CATALOG = (() => {
  // Базовая ставка стоимости квадратного метра (в узбекских сумах UZS)
  // Верхние этажи и пентхаусы имеют повышенную стоимость из-за панорамных видов
  const getBaseMeterPrice = (floor) => {
    if (floor === 14) return 18500000; // Sky Penthouses
    if (floor >= 10) return 15800000; // Верхние этажи
    if (floor >= 5)  return 14200000; // Средние этажи
    return 13200000;                  // Нижние этажи
  };

  // Типовые планировочные решения для жилых этажей (со 2 по 13 этаж)
  const typicalUnitTemplates = [
    {
      unitSuffix: '01',
      rooms: 2,
      area: 64.2,
      balconyArea: 4.8,
      view: {
        ru: "Парк Tashkent City и фонтаны",
        en: "Tashkent City Central Park & Fountains"
      },
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
      balconyArea: 3.5,
      view: {
        ru: "Восточная панорама города",
        en: "Eastern City Skyline"
      },
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
      balconyArea: 6.2,
      view: {
        ru: "Центральный бульвар и парк",
        en: "Central Boulevard & Park Panorama"
      },
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
      balconyArea: 5.0,
      view: {
        ru: "Приватный тихий японский сад",
        en: "Quiet Private Courtyard Garden"
      },
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
      balconyArea: 3.8,
      view: {
        ru: "Внутренний зеленый атриум",
        en: "Interior Green Atrium"
      },
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
      balconyArea: 7.0,
      view: {
        ru: "Южная солнечная сторона и аллея",
        en: "Southern Sunlit Promenade"
      },
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
      balconyArea: 5.4,
      view: {
        ru: "Западная сторона и закат над городом",
        en: "Western Sunset & City Skyline"
      },
      roomsBreakdown: {
        living: 25.5,
        bedroom1: 18.0,
        kitchen: 14.5,
        bath: 5.8,
        corridor: 8.7
      }
    }
  ];

  // Эксклюзивные Sky Penthouses на 14 этаже с открытыми террасами
  const penthouseTemplates = [
    {
      unitSuffix: '01',
      rooms: 4,
      area: 146.5,
      balconyArea: 28.5,
      view: {
        ru: "Круговая 360° панорама Tashkent City",
        en: "360° Panoramic View of Tashkent City"
      },
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
      balconyArea: 22.0,
      view: {
        ru: "Восточные горы и утренний город",
        en: "Eastern Mountain Range & Morning Sun"
      },
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
      balconyArea: 32.0,
      view: {
        ru: "Юго-западный парк и закатные виды",
        en: "South-Western Park & Sunset Skyline"
      },
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

  // Генерация полного каталога резиденций (87 квартир на 14 этажах)
  const allApartments = [];

  // 1 этаж: Гранд Лобби, ресепшн и спа (без жилых апартаментов)
  // 2–13 этажи: Резиденции
  for (let floor = 2; floor <= 13; floor++) {
    typicalUnitTemplates.forEach((tmpl, idx) => {
      const unitNumber = `A-${floor}${tmpl.unitSuffix}`;
      const meterPrice = getBaseMeterPrice(floor);
      const totalPrice = Math.round(tmpl.area * meterPrice);

      // Сбалансированный статус доступности
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
        view: tmpl.view,
        roomsBreakdown: tmpl.roomsBreakdown,
        isPenthouse: false,
        ceilingHeight: '3.30 м'
      });
    });
  }

  // 14 этаж: Sky Penthouses
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
      view: tmpl.view,
      roomsBreakdown: tmpl.roomsBreakdown,
      isPenthouse: true,
      ceilingHeight: '3.80 м'
    });
  });

  // Получение сводки по конкретному этажу
  const getFloorStats = (floorNumber) => {
    const floorUnits = allApartments.filter(a => a.floor === floorNumber);
    const total = floorUnits.length;
    const available = floorUnits.filter(a => a.status === 'available').length;
    const reserved = floorUnits.filter(a => a.status === 'reserved').length;
    const sold = floorUnits.filter(a => a.status === 'sold').length;

    let floorName = {
      ru: `${floorNumber} этаж`,
      en: `Floor ${floorNumber}`
    };

    if (floorNumber === 1) {
      floorName = {
        ru: "1 этаж: Гранд Лобби & Велнес",
        en: "Floor 1: Grand Lobby & Wellness"
      };
    } else if (floorNumber === 14) {
      floorName = {
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

  // Общая статистика жилого комплекса
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

  // Расчет аннуитетного платежа ипотеки / рассрочки
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

  // Форматирование суммы в узбекских сумах (UZS) с пробелами
  const formatUZS = (amount) => {
    return new Intl.NumberFormat('ru-RU').format(amount) + " UZS";
  };

  return {
    allApartments,
    getFloorStats,
    getComplexOverview,
    calculateMortgage,
    formatUZS
  };
})();

window.APARTMENTS_CATALOG = APARTMENTS_CATALOG;
