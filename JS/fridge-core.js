// [/fridge-core.js] 냉장고 재료 데이터를 관리하는 연동 엔진

// 1. 기존 데이터 가져오기 (없으면 샘플 주입)
function getFridgeData() {
    const savedData = localStorage.getItem('houseLinkFridge');
    if (savedData) {
        const parsed = JSON.parse(savedData);
        // 항상 유통기한 순(오름차순)으로 정렬해서 반환
        return sortFridgeItems(parsed);
    }
    
    // 초기 기본 샘플 세팅 (현재 2026년 7월 기준 임박 데이터 포함)
    const defaultData = [
        { id: 1, name: "국산 99.9% 우유 1L", expiry: "2026-07-13" },
        { id: 2, name: "체다 슬라이스 치즈", expiry: "2026-08-25" },
        { id: 3, name: "찌개용 단단한 두부", expiry: "2026-07-12" },
        { id: 4, name: "싱싱한 한돈 삼겹살", expiry: "2026-07-16" }
    ];
    const sorted = sortFridgeItems(defaultData);
    saveFridgeData(sorted);
    return sorted;
}

// 2. 데이터 저장하기
function saveFridgeData(data) {
    localStorage.setItem('houseLinkFridge', JSON.stringify(data));
}

// 3. 유통기한 순 정렬 함수 (날짜 빠른 순)
function sortFridgeItems(items) {
    return items.sort((a, b) => new Date(a.expiry) - new Date(b.expiry));
}

// 4. 새로운 식재료 추가하기
function addFridgeItem(name, expiry) {
    let items = getFridgeData();
    const newItem = {
        id: Date.now(),
        name: name,
        expiry: expiry
    };
    items.push(newItem);
    items = sortFridgeItems(items); // 추가 후 재정렬
    saveFridgeData(items);
    return newItem;
}

// 5. 식재료 삭제하기
function deleteFridgeItem(id) {
    let items = getFridgeData();
    items = items.filter(item => item.id != id);
    saveFridgeData(items);
}