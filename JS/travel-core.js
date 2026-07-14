// [/travel-core.js] 여행 기록 데이터를 관리하는 연동 엔진

// 1. 데이터 가져오기 (없으면 세련된 기본 샘플 주입)
function getTravelData() {
    const savedData = localStorage.getItem('houseLinkTravels');
    if (savedData) return JSON.parse(savedData);
    
    // 기본 샘플 데이터
    const defaultData = [
        {
            id: 1,
            title: "제주도 푸른 바다 가족 여행",
            date: "2026-05-15 ~ 2026-05-17",
            location: "제주 서귀포 & 애월",
            summary: "오랜만에 온 가족이 모여 맛있는 흑돼지도 먹고 에메랄드빛 함덕 해수욕장을 거닐었다. 날씨가 정말 완벽했던 여행.",
            image: "" // 공백일 경우 기본 일러스트/배경 처리
        },
        {
            id: 2,
            title: "부산 광안리 밤바다 힐링 주말",
            date: "2026-06-20 ~ 2026-06-21",
            location: "부산 수영구",
            summary: "광안대교 드론쇼를 직관했다! 돗자리 펴고 앉아 민락수변공원에서 먹은 회 맛은 평생 잊지 못할 것 같다.",
            image: ""
        }
    ];
    saveTravelData(defaultData);
    return defaultData;
}

// 2. 데이터 저장하기
function saveTravelData(data) {
    localStorage.setItem('houseLinkTravels', JSON.stringify(data));
}

// 3. 여행 기록 추가하기
function addTravelItem(title, date, location, summary, base64Image) {
    const travels = getTravelData();
    const newItem = {
        id: Date.now(),
        title: title,
        date: date,
        location: location,
        summary: summary,
        image: base64Image || ""
    };
    travels.unshift(newItem); // 최신 여행이 맨 앞으로 오도록
    saveTravelData(travels);
    return newItem;
}

// 4. 여행 기록 삭제하기
function deleteTravelItem(id) {
    let travels = getTravelData();
    travels = travels.filter(item => item.id != id);
    saveTravelData(travels);
}