// [/calendar-core.js] 캘린더 일정을 하나로 묶어주는 연동 엔진

// 1. 로컬 스토리지에서 일정 데이터 가져오기
function getCalendarData() {
    const savedData = localStorage.getItem('houseLinkSchedules');
    if (savedData) return JSON.parse(savedData);
    
    // 기본 샘플 데이터 (2026년 7월 기준)
    const defaultData = [
        { id: 1, date: "2026.7.6", hour: 14, text: "🏡 가계부 지난달 지출 영수증 정리", type: "schedule" },
        { id: 2, date: "2026.7.10", hour: 11, text: "💡 캘린더 페이지 좌우 화면 분할 완성하기", type: "plan" },
        { id: 3, date: "2026.7.10", hour: 19, text: "🍷 가족 동반 저녁 외식 예약", type: "schedule" }
    ];
    saveCalendarData(defaultData);
    return defaultData;
}

// 2. 로컬 스토리지에 일정 데이터 저장하기
function saveCalendarData(data) {
    localStorage.setItem('houseLinkSchedules', JSON.stringify(data));
}

// 3. 일정/계획 추가 기능
function addCalendarItem(dateStr, hour, text, type = 'schedule') {
    const schedules = getCalendarData();
    const newItem = {
        id: Date.now(),
        date: dateStr, // 포맷 예시: "2026.7.10"
        hour: parseInt(hour),
        text: text,
        type: type // 'plan' (계획) 또는 'schedule' (일정)
    };
    schedules.push(newItem);
    saveCalendarData(schedules);
    return newItem;
}