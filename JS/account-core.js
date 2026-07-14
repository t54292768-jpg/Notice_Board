// [/account-core.js] 가계부 데이터를 관리하는 연동 엔진

// 1. 초기 예산 및 지출 내역 가져오기
function getAccountData() {
    const savedData = localStorage.getItem('houseLinkAccount');
    if (savedData) return JSON.parse(savedData);
    
    // 초기 기본 샘플 세팅
    const defaultData = {
        budget: 1000000, // 한 달 목표 금액 (기본 100만 원)
        expenses: [
            { id: 1, date: "2026-07-10", category: "외식", title: "가족 동반 저녁 외식", amount: 85000 },
            { id: 2, date: "2026-07-11", category: "생필품", title: "마트 주말 장보기", amount: 43200 }
        ]
    };
    saveAccountData(defaultData);
    return defaultData;
}

// 2. 가계부 데이터 저장하기
function saveAccountData(data) {
    localStorage.setItem('houseLinkAccount', JSON.stringify(data));
}

// 3. 목표 예산 설정/변경하기
function updateBudget(newBudget) {
    const data = getAccountData();
    data.budget = parseInt(newBudget) || 0;
    saveAccountData(data);
}

// 4. 새로운 지출 추가하기
function addExpenseItem(date, category, title, amount) {
    const data = getAccountData();
    const newExpense = {
        id: Date.now(),
        date: date,
        category: category,
        title: title,
        amount: parseInt(amount) || 0
    };
    data.expenses.unshift(newExpense); // 최신 지출이 위로 오도록
    saveAccountData(data);
    return newExpense;
}

// 5. 지출 삭제하기
function deleteExpenseItem(id) {
    const data = getAccountData();
    data.expenses = data.expenses.filter(item => item.id != id);
    saveAccountData(data);
}