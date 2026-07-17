// [/goal-core.js] 주간/월간/연간 목표 데이터를 관리하는 연동 엔진

// 1. 기존 데이터 가져오기 (없으면 기본 샘플 주입)
function getGoalData() {
    const savedData = localStorage.getItem('houseLinkGoals');
    if (savedData) return JSON.parse(savedData);
    
    const defaultData = [
        { id: 1, type: "weekly", text: "이번 주에 가계부 영수증 밀리지 말고 다 정리하기", checked: false },
        { id: 2, type: "monthly", text: "7월 한 달간 외식 비용 30만 원 이하로 방어하기", checked: true },
        { id: 3, type: "yearly", text: "2026년 가동 자산 2,000만 원 저축 및 투자 달성", checked: false }
    ];
    saveGoalData(defaultData);
    return defaultData;
}

// 2. 데이터 저장하기
function saveGoalData(data) {
    localStorage.setItem('houseLinkGoals', JSON.stringify(data));
}

// 3. 새로운 목표 추가하기
function addGoalItem(type, text) {
    const goals = getGoalData();
    const newItem = {
        id: Date.now(),
        type: type, // 'weekly', 'monthly', 'yearly'
        text: text,
        checked: false
    };
    goals.unshift(newItem); // 최신 목표가 위로 오도록
    saveGoalData(goals);
    return newItem;
}

// 4. 목표 달성 상태 토글
function toggleGoalItem(id) {
    const goals = getGoalData();
    const target = goals.find(item => item.id == id);
    if (target) {
        target.checked = !target.checked;
        saveGoalData(goals);
    }
}

// 5. 목표 삭제하기
function deleteGoalItem(id) {
    let goals = getGoalData();
    goals = goals.filter(item => item.id != id);
    saveGoalData(goals);
}