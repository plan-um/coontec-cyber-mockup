// 사이드바 메뉴 구조 및 기능
const menuStructure = [
  {
    id: 'dashboard',
    name: '대시보드',
    icon: 'layout-dashboard',
    href: '2-1_대시보드.html'
  },
  {
    id: 'projects',
    name: '프로젝트 관리',
    icon: 'folder-open',
    href: '4-1_통합프로젝트.html'
  },
  {
    id: 'tests',
    name: '시험 관리',
    icon: 'file-search',
    submenu: [
      { name: '스캔시험', href: '5-1_스캔시험.html' },
      { name: '스캔설정', href: '5-2_스캔설정.html' },
      { name: '시험실행', href: '5-3_시험실행.html' },
      { name: '스캔결과', href: '5-4_스캔결과.html' },
      { name: '사설보고서(스캔)', href: '5-6_사설보고서_스캔.html' },
      { name: '부하시험', href: '6-1_부하시험.html' },
      { name: '부하설정', href: '6-2_부하설정.html' },
      { name: '시험실행(부하)', href: '6-3_시험실행_부하.html' },
      { name: '부하결과', href: '6-4_부하결과.html' },
      { name: '사설보고서(부하)', href: '6-6_사설보고서_부하.html' }
    ]
  },
  {
    id: 'licenses',
    name: '라이선스',
    icon: 'credit-card',
    submenu: [
      { name: '발급관리', href: '7-1_발급관리.html' },
      { name: '라이선스 발급', href: '7-2_라이선스발급.html' },
      { name: '라이선스 갱신', href: '7-3_라이선스갱신.html' },
      { name: '검증이력', href: '7-4_검증이력.html' },
      { name: '요청할당', href: '7-5_요청할당.html' },
      { name: '요청승인', href: '7-6_요청승인.html' },
      { name: '사용자할당', href: '7-7_사용자할당.html' },
      { name: '오프라인인증', href: '7-9_오프라인인증.html' }
    ]
  },
  {
    id: 'data',
    name: '데이터 관리',
    icon: 'database',
    submenu: [
      { name: '시험데이터', href: '8-1_시험데이터.html' },
      { name: '데이터조회', href: '8-2_데이터조회.html' },
      { name: '데이터편집', href: '8-4_데이터편집.html' },
      { name: '백업복구', href: '8-5_백업복구.html' },
      { name: '백업실행', href: '8-6_백업실행.html' },
      { name: '복구실행', href: '8-7_복구실행.html' }
    ]
  },
  {
    id: 'reports',
    name: '보고서',
    icon: 'file-text',
    submenu: [
      { name: '보고서 생성', href: '9-1_보고서생성.html' },
      { name: '보고서 출력', href: '9-6_보고서출력.html' },
      { name: '보고서 이력', href: '9-7_보고서이력.html' },
      { name: '보고서 검색', href: '9-8_보고서검색.html' },
      { name: '버전관리', href: '9-9_버전관리.html' },
      { name: '사설보고서', href: '9-10_사설보고서.html' },
      { name: '사설보고서 관리', href: '9-11_사설보고서관리.html' },
      { name: '사설보고서 출력', href: '9-12_사설보고서출력.html' }
    ]
  },
  {
    id: 'users',
    name: '사용자 관리',
    icon: 'users',
    submenu: [
      { name: '사용자 관리', href: '10-1_사용자관리.html' },
      { name: '사용자 등록', href: '10-2_사용자등록.html' },
      { name: '사용자 상세', href: '10-3_사용자상세.html' },
      { name: '권한관리', href: '10-4_권한관리.html' },
      { name: '고객사 관리', href: '10-7_고객사관리.html' },
      { name: '고객사 등록', href: '10-8_고객사등록.html' },
      { name: '고객사 상세', href: '10-9_고객사상세.html' }
    ]
  },
  {
    id: 'settings',
    name: '시스템 설정',
    icon: 'settings',
    submenu: [
      { name: '시스템 설정', href: '11-1_시스템설정.html' },
      { name: '연동관리', href: '11-7_연동관리.html' },
      { name: '현장시험도구 관리', href: '11-10_현장시험도구관리.html' }
    ]
  },
  {
    id: 'logs',
    name: '감사/로그',
    icon: 'shield',
    submenu: [
      { name: '감사로그', href: '12-1_감사로그.html' },
      { name: '운영로그', href: '12-7_운영로그.html' },
      { name: '로그보관', href: '12-8_로그보관.html' }
    ]
  },
  {
    id: 'notifications',
    name: '알림',
    icon: 'bell',
    href: '13-1_알림.html'
  },
  {
    id: 'help',
    name: '도움말',
    icon: 'circle-question-mark',
    submenu: [
      { name: '사용자 가이드', href: '14-1_사용자가이드.html' },
      { name: 'FAQ', href: '14-4_FAQ.html' }
    ]
  }
];

// 아이콘 SVG 맵
const iconSVGs = {
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
  'folder-open': '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>',
  'file-search': '<path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="m9 18-1.5-1.5"></path><circle cx="5" cy="14" r="3"></circle>',
  'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line>',
  'database': '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><path d="M16 3.128a4 4 0 0 1 0 7.744"></path><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><circle cx="9" cy="7" r="4"></circle>',
  'settings': '<path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"></path><circle cx="12" cy="12" r="3"></circle>',
  'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>',
  'bell': '<path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>',
  'circle-question-mark': '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>',
  'chevron-down': '<path d="m6 9 6 6 6-6"></path>',
  'chevron-right': '<path d="m9 18 6-6-6-6"></path>'
};

// 사이드바 HTML 생성 함수
function generateSidebarHTML(currentPage = '') {
  let html = '<nav class="flex-1 space-y-1 px-2 py-4">';
  
  menuStructure.forEach(menu => {
    const isActive = currentPage.includes(menu.id) || currentPage === menu.href;
    
    if (menu.submenu) {
      // 하위 메뉴가 있는 경우
      html += `
        <div class="menu-group">
          <button class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-primary-600' : 'text-gray-700'}" data-menu="${menu.id}">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${menu.icon} h-4 w-4">
                ${iconSVGs[menu.icon]}
              </svg>
              <span>${menu.name}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron h-4 w-4 transition-transform">
              ${iconSVGs['chevron-down']}
            </svg>
          </button>
          <div class="submenu ml-7 mt-1 space-y-1" style="display: none;">
            ${menu.submenu.map(sub => `
              <a href="${sub.href}" class="block px-3 py-2 text-sm ${currentPage === sub.href ? 'text-primary-600 font-medium' : 'text-gray-600'} hover:text-primary-600 hover:bg-gray-50 rounded-md">
                ${sub.name}
              </a>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      // 단독 메뉴인 경우
      html += `
        <a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-primary-600' : 'text-gray-700'}" href="${menu.href}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${menu.icon} h-4 w-4">
            ${iconSVGs[menu.icon]}
          </svg>
          <span>${menu.name}</span>
        </a>
      `;
    }
  });
  
  html += '</nav>';
  
  // 하단 공지사항 링크
  html += `
    <div class="border-t p-4">
      <a class="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600" href="3-1_공지사항.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-4 w-4">
          ${iconSVGs['file-text']}
        </svg>
        <span>공지사항</span>
      </a>
    </div>
  `;
  
  return html;
}

// 사이드바 초기화 함수
function initializeSidebar() {
  // 현재 페이지 파일명 가져오기
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // 사이드바 찾기
  const sidebar = document.querySelector('aside');
  if (sidebar) {
    // 사이드바 내용 교체
    sidebar.innerHTML = generateSidebarHTML(currentPage);
    
    // 이벤트 리스너 설정
    setupSidebarEvents();
    
    // 현재 페이지에 해당하는 메뉴 열기
    openCurrentMenu(currentPage);
  }
}

// 사이드바 이벤트 설정
function setupSidebarEvents() {
  const menuButtons = document.querySelectorAll('.menu-group > button');
  
  menuButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const menuGroup = this.parentElement;
      const submenu = menuGroup.querySelector('.submenu');
      const chevron = this.querySelector('.lucide-chevron');
      
      if (submenu) {
        const isOpen = submenu.style.display !== 'none';
        
        // 다른 모든 메뉴 닫기
        document.querySelectorAll('.submenu').forEach(otherSubmenu => {
          if (otherSubmenu !== submenu) {
            otherSubmenu.style.display = 'none';
            const otherChevron = otherSubmenu.parentElement.querySelector('.lucide-chevron');
            if (otherChevron) {
              otherChevron.style.transform = 'rotate(0deg)';
            }
          }
        });
        
        // 현재 메뉴 토글
        if (isOpen) {
          submenu.style.display = 'none';
          chevron.style.transform = 'rotate(0deg)';
        } else {
          submenu.style.display = 'block';
          chevron.style.transform = 'rotate(180deg)';
        }
      }
    });
  });
}

// 현재 페이지에 해당하는 메뉴 열기
function openCurrentMenu(currentPage) {
  // 현재 페이지가 속한 메뉴 찾기
  menuStructure.forEach(menu => {
    if (menu.submenu) {
      const hasCurrentPage = menu.submenu.some(sub => sub.href === currentPage);
      if (hasCurrentPage) {
        // 해당 메뉴 열기
        const button = document.querySelector(`button[data-menu="${menu.id}"]`);
        if (button) {
          const submenu = button.parentElement.querySelector('.submenu');
          const chevron = button.querySelector('.lucide-chevron');
          if (submenu) {
            submenu.style.display = 'block';
            if (chevron) {
              chevron.style.transform = 'rotate(180deg)';
            }
          }
        }
      }
    }
  });
  
  // 시험 관리 메뉴 기본으로 열기 (현재 페이지가 대시보드인 경우)
  if (currentPage === '2-1_대시보드.html' || currentPage === 'index.html') {
    const testButton = document.querySelector('button[data-menu="tests"]');
    if (testButton) {
      const submenu = testButton.parentElement.querySelector('.submenu');
      const chevron = testButton.querySelector('.lucide-chevron');
      if (submenu) {
        submenu.style.display = 'block';
        if (chevron) {
          chevron.style.transform = 'rotate(180deg)';
        }
      }
    }
  }
}

// DOM 로드 완료 시 실행
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeSidebar);
} else {
  initializeSidebar();
}