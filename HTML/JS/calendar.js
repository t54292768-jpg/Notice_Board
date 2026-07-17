// [calendar.js - 메인 대시보드 연동용]
document.addEventListener("DOMContentLoaded", function() {
    let currentDate = new Date(); 

    const monthTitle = document.getElementById('calendar-title');
    const calendarGrid = document.getElementById('calendar-grid');

    function renderMainCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        if (monthTitle) {
            monthTitle.innerText = `${year}년 ${String(month + 1).padStart(2, '0')}월`;
        }

        if (!calendarGrid) return;

        const firstDayIndex = new Date(year, month, 1).getDay(); 
        const lastDate = new Date(year, month + 1, 0).getDate(); 
        const prevLastDate = new Date(year, month, 0).getDate(); 

        let htmlContent = '';

        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
        weekDays.forEach(day => {
            htmlContent += `<div class="day-of-week">${day}</div>`;
        });

        let dayCounter = 1;
        let nextMonthCounter = 1;
        let totalCells = 42; 

        // 💡 저장소 엔진에서 등록된 캘린더 스케줄 로드
        const schedules = typeof getCalendarData === 'function' ? getCalendarData() : [];

        for (let i = 0; i < totalCells; i++) {
            if (dayCounter > lastDate && i % 7 === 0 && nextMonthCounter > 7) {
                break;
            }

            let cellClass = 'calendar-cell';

            if (i < firstDayIndex) {
                const prevDay = prevLastDate - (firstDayIndex - 1) + i;
                htmlContent += `<div class="${cellClass} other-month"><span class="cell-num">${prevDay}</span></div>`;
            } 
            else if (dayCounter <= lastDate) {
                const isToday = (year === new Date().getFullYear() && month === new Date().getMonth() && dayCounter === new Date().getDate());
                if (isToday) cellClass += ' today';

                htmlContent += `<div class="${cellClass}"><span class="cell-num">${dayCounter}</span>`;
                
                // 💡 상세 페이지에서 넣은 스케줄 검사 후 바둑판에 미니 텍스트 주입
                const thisCellKey = `${year}.${month + 1}.${dayCounter}`;
                const todayEvents = schedules.filter(s => s.date === thisCellKey);
                
                todayEvents.forEach(item => {
                    htmlContent += `<div class="event-bar">${item.text}</div>`;
                });
                
                htmlContent += `</div>`;
                dayCounter++;
            } 
            else {
                htmlContent += `<div class="${cellClass} other-month"><span class="cell-num">${nextMonthCounter}</span></div>`;
                nextMonthCounter++;
            }
        }
        calendarGrid.innerHTML = htmlContent;
    }

    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    const todayBtn = document.getElementById('btn-today');

    if (prevBtn) prevBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() - 1); renderMainCalendar(currentDate); });
    if (nextBtn) nextBtn.addEventListener('click', () => { currentDate.setMonth(currentDate.getMonth() + 1); renderMainCalendar(currentDate); });
    if (todayBtn) todayBtn.addEventListener('click', () => { currentDate = new Date(); renderMainCalendar(currentDate); });

    renderMainCalendar(currentDate);
});