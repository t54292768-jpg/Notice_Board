// [/diary-core.js] 다이어리 데이터를 관리하는 연동 엔진

// 1. 로컬 스토리지에서 다이어리 데이터 가져오기
function getDiaryData() {
    const savedData = localStorage.getItem('houseLinkDiaries');
    if (savedData) return JSON.parse(savedData);
    
    // 초기 실행 시 보여줄 세련된 샘플 데이터
    const defaultData = {
        "2026.7.10": "오늘 House Link 대시보드와 캘린더 연동을 성공적으로 마쳤다! 버튼들이 부드럽게 작동하니 기분이 정말 좋다. 내일은 다이어리 페이지를 추가해 봐야지.",
        "2026.7.11": "가족들과 주말 저녁 외식을 다녀왔다. 맛있는 것을 먹으며 도란도란 이야기를 나누니 이게 바로 행복이구나 싶다. 가계부 정리도 미리 해두길 잘했다."
    };
    saveDiaryData(defaultData);
    return defaultData;
}

// 2. 로컬 스토리지에 다이어리 데이터 저장하기
function saveDiaryData(data) {
    localStorage.setItem('houseLinkDiaries', JSON.stringify(data));
}

// 3. 특정 날짜의 다이어리 저장/수정하기
function saveDiaryItem(dateStr, content) {
    const diaries = getDiaryData();
    diaries[dateStr] = content;
    saveDiaryData(diaries);
}