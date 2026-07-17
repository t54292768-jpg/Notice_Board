// [header-loader.js] 모든 메뉴 자동 활성화(파란색) 기능이 탑재된 가변형 헤더
document.addEventListener("DOMContentLoaded", function() {
    if (!document.querySelector('link[href="style.css"]')) {
        const styleLink = document.createElement('link');
        styleLink.rel = 'stylesheet';
        styleLink.href = 'style.css';
        document.head.appendChild(styleLink);
    }

    const inlineStyle = document.createElement('style');
    inlineStyle.textContent = `
        .main-header {
            position: fixed !important;
            top: 0; left: 0; width: 100%;
            display: flex !important;           
            justify-content: space-between;
            align-items: center;
            padding: 10px clamp(15px, 2vw, 30px);
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            z-index: 9999;
            box-sizing: border-box;
            height: clamp(70px, 6vw, 85px);
        }
        
        .header-date { 
            min-width: 120px;
            width: 12%;
            font-size: clamp(0.75rem, 0.85vw, 0.95rem);
            color: #64748b; 
            font-weight: 500;
            white-space: nowrap; 
        }
        
        .header-center { 
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-width: 0;
            padding: 0 min(20px, 2vw);
        }
        .header-center h1 { 
            font-size: clamp(1.2rem, 1.5vw, 1.8rem);
            color: #1a1a1a; 
            margin: 0 0 4px 0; 
            font-weight: 800; 
        }
        
        .nav-slider-wrapper { 
            width: 100%; 
            max-width: 85%; 
            display: flex; 
            align-items: center; 
            position: relative; 
            padding: 0 clamp(20px, 2vw, 30px); 
            box-sizing: border-box;
        }
        .slide-btn { position: absolute; top: 50%; transform: translateY(-50%); width: 20px; height: 20px; background: transparent; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; z-index: 10; opacity: 0.4; }
        .slide-btn:hover { opacity: 1; }
        .slide-btn svg { width: clamp(14px, 1.2vw, 18px); height: clamp(14px, 1.2vw, 18px); fill: none; stroke: #1a1a1a; stroke-width: 2.5; }
        .slide-btn.left { left: 0px; } .slide-btn.right { right: 0px; }
        
        .nav-links { display: flex; align-items: center; overflow-x: auto; white-space: nowrap; padding: 4px 0; scroll-behavior: smooth; scroll-snap-type: x mandatory; scrollbar-width: none; width: 100%; }
        .nav-links::-webkit-scrollbar { display: none; }
        
        .menu-item-group { display: flex; align-items: center; justify-content: center; scroll-snap-align: start; flex-shrink: 0; padding: 0 clamp(6px, 1vw, 16px); }
        .nav-links a { 
            text-decoration: none; 
            color: #4a5568; 
            font-size: clamp(0.85rem, 0.95vw, 1.1rem); 
            font-weight: 500; 
            text-align: center; 
            transition: color 0.2s; 
        }
        .nav-links a:hover { color: #007bff; }
        
        .menu-item-group::after { content: '•'; color: #cbd5e1; font-size: 0.7rem; margin-left: clamp(10px, 1.2vw, 24px); }
        .menu-item-group:last-child::after { content: ''; margin-left: 0; }
        
        .header-right { 
            min-width: 120px;
            width: 12%;
            display: flex; 
            justify-content: flex-end;
            white-space: nowrap; 
        }
        .profile-link-wrapper { text-decoration: none; color: inherit; display: block; transition: transform 0.2s; }
        .profile-link-wrapper:hover { transform: scale(1.03); }
        .profile-section { display: flex; align-items: center; gap: clamp(6px, 0.8vw, 12px); }
        
        .profile-img { 
            width: clamp(38px, 3.5vw, 48px); 
            height: clamp(38px, 3.5vw, 48px); 
            border-radius: 50%; 
            background-color: #e2e8f0; 
            object-fit: cover; 
            border: 1px solid #edf2f7; 
        }
        .profile-name { font-size: clamp(0.8rem, 0.88vw, 1rem); color: #334155; font-weight: 600; }

        /* 모든 페이지 본문 겹침 방지 */
        body > main, .dashboard-container, .calendar-page-wrapper, .diary-page-container, .todo-page-container {
            margin-top: clamp(95px, 8vw, 115px) !important;
            box-sizing: border-box;
        }
    `;
    document.head.appendChild(inlineStyle);

    // 🛠️ 모든 메뉴 아이템에 추적용 고유 ID 추가
    const headerHtml = `
    <header class="main-header">
        <div class="header-date" id="current-date"></div>
        <div class="header-center">
            <a href="/Main/main_p.html" style="text-decoration: none; color: inherit;"><h1>House Link</h1></a>
            <div class="nav-slider-wrapper">
                <button class="slide-btn left" id="slide-left"><svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg></button>
                <nav class="nav-links" id="nav-links">
                    <div class="menu-item-group"><a href="/Calendar/calendar.html" id="nav-cal">캘린더</a></div>
                    <div class="menu-item-group"><a href="/Diary/diary_p.html" id="nav-diary">다이어리</a></div>
                    <div class="menu-item-group"><a href="/Travel/travel_p.html" id="nav-travel">여행 기록</a></div>
                    <div class="menu-item-group"><a href="/Account/account_p.html" id="nav-account">가계부</a></div>
                    <div class="menu-item-group"><a href="/Fridge/fridge_p.html" id="nav-fridge">냉장고 관리</a></div>
                    <div class="menu-item-group"><a href="/Todo_list/todo_list_p.html" id="nav-todo">To-Do List</a></div>
                    <div class="menu-item-group"><a href="/Goal/goal_p.html" id="nav-m-goal">목표</a></div>
                    <div class="menu-item-group" style="scroll-snap-align: end;"><a href="/Bucket/bucket_p.html" id="nav-bucket">개인 버킷리스트</a></div>
                </nav>
                <button class="slide-btn right" id="slide-right"><svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></button>
            </div>
        </div>
        <div class="header-right">
            <a href="/Profile/profile.html" class="profile-link-wrapper">
                <div class="profile-section">
                    <img class="profile-img" src="https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f464.png" alt="프로필">
                    <span class="profile-name">홍길동 님</span>
                </div>
            </a>
        </div>
    </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHtml);

    // 🛠️ [자동 활성화 엔진] 현재 주소 분석하여 매칭되는 탭만 파란색 칠하기
    const currentUrl = window.location.href;
    
    const pageMapping = [
        { key: '/Calendar/calendar.html', id: 'nav-cal' },
        { key: 'diary_p.html', id: 'nav-diary' },
        { key: 'travel_p.html', id: 'nav-travel' },
        { key: 'account_p.html', id: 'nav-account' },
        { key: 'fridge_p.html', id: 'nav-fridge' },
        { key: 'todo_list_p.html', id: 'nav-todo' },
        { key: 'monthly_p.html', id: 'nav-m-goal' },
        { key: 'yearly_p.html', id: 'nav-y-goal' },
        { key: 'bucket_p.html', id: 'nav-bucket' }
    ];

    pageMapping.forEach(page => {
        if (currentUrl.includes(page.key)) {
            const linkElement = document.getElementById(page.id);
            if (linkElement) {
                linkElement.style.color = '#007bff';
                linkElement.style.fontWeight = '700';
            }
        }
    });

    // 실시간 날짜 로직
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const weekMap = ['일', '월', '화', '수', '목', '금', '토'];
        dateElement.innerText = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, '0')}.${String(today.getDate()).padStart(2, '0')} (${weekMap[today.getDay()]})`;
    }

    // 슬라이더 바인딩 로직
    const navLinks = document.getElementById('nav-links');
    const slideRight = document.getElementById('slide-right');
    const slideLeft = document.getElementById('slide-left');
    if (navLinks && slideRight && slideLeft) {
        slideRight.addEventListener('click', () => { navLinks.scrollLeft += 150; });
        slideLeft.addEventListener('click', () => { navLinks.scrollLeft -= 150; });
    }
});