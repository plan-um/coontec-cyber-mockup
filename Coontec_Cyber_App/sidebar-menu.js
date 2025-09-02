// 사이드바 메뉴 정의
const sidebarMenuHTML = `
<div class="mb-4">
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
      <span class="text-white font-bold">C</span>
    </div>
    <div>
      <h1 class="text-white font-bold">COONTEC</h1>
      <p class="text-gray-400 text-xs">현대중공업</p>
    </div>
  </div>
</div>

<nav class="space-y-1 flex-1">
  <a href="2-1_메인대시보드.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-dashboard">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect width="7" height="9" x="3" y="3" rx="1"></rect>
      <rect width="7" height="5" x="14" y="3" rx="1"></rect>
      <rect width="7" height="9" x="14" y="12" rx="1"></rect>
      <rect width="7" height="5" x="3" y="16" rx="1"></rect>
    </svg>
    <span class="text-sm">대시보드</span>
  </a>
  
  <div>
    <button class="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" onclick="toggleSubmenu('project-submenu')">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 10.189V14"></path>
          <path d="M12 2v3"></path>
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path>
        </svg>
        <span class="text-sm">프로젝트 관리</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="rotate-90">
        <path d="m9 18 6-6-6-6"></path>
      </svg>
    </button>
    <div class="ml-8 mt-2 space-y-1" id="project-submenu">
      <a href="4-2_프로젝트생성.html" class="block px-3 py-1 text-xs text-gray-400 hover:text-white">프로젝트 생성</a>
      <a href="4-3_프로젝트상세.html" class="block px-3 py-1 text-xs text-gray-400 hover:text-white">프로젝트 상세</a>
      <a href="4-6_선박목록.html" class="block px-3 py-1 text-xs text-gray-400 hover:text-white">선박 목록</a>
    </div>
  </div>

  <a href="7-8_라이선스관리.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-license">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect width="20" height="14" x="2" y="5" rx="2"></rect>
      <path d="M2 10h20"></path>
    </svg>
    <span class="text-sm">라이선스 관리</span>
  </a>

  <a href="8-1_시험데이터.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-data">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
      <path d="M14 2v6h6"></path>
      <path d="M16 13H8"></path>
      <path d="M16 17H8"></path>
      <path d="M10 9H8"></path>
    </svg>
    <span class="text-sm">데이터 관리</span>
  </a>

  <a href="9-1_보고서생성.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-report">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M9 11H3"></path>
      <path d="M21 11h-6"></path>
      <path d="M12 8v6"></path>
      <path d="M12 2v3"></path>
      <path d="M12 19v3"></path>
    </svg>
    <span class="text-sm">보고서 관리</span>
  </a>

  <a href="10-10_사용자관리.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-user">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
      <circle cx="9" cy="7" r="4"></circle>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
    </svg>
    <span class="text-sm">사용자 관리</span>
  </a>

  <a href="11-10_현장시험도구관리.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-system">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
    <span class="text-sm">시스템 설정</span>
  </a>

  <a href="14-1_사용자가이드.html" class="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700" id="menu-help">
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <path d="M12 16v-4"></path>
      <path d="M12 8h.01"></path>
    </svg>
    <span class="text-sm">도움말</span>
  </a>
</nav>
`;

// 페이지 로드 시 사이드바 삽입
document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = sidebarMenuHTML;
    
    // 현재 페이지에 해당하는 메뉴 항목 활성화
    const currentPage = window.location.pathname.split('/').pop();
    setActiveMenu(currentPage);
  }
});

// 서브메뉴 토글 함수
function toggleSubmenu(submenuId) {
  const submenu = document.getElementById(submenuId);
  if (submenu) {
    submenu.classList.toggle('hidden');
  }
}

// 현재 페이지에 따라 메뉴 활성화
function setActiveMenu(pageName) {
  // 모든 메뉴 항목에서 활성화 클래스 제거
  document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('bg-purple-600', 'text-white');
    link.classList.add('text-gray-300');
  });
  
  // 현재 페이지 메뉴 활성화
  let activeMenuId = '';
  
  if (pageName.includes('대시보드')) {
    activeMenuId = 'menu-dashboard';
  } else if (pageName.includes('프로젝트') || pageName.includes('선박')) {
    activeMenuId = 'menu-project';
    // 프로젝트 서브메뉴 열기
    const submenu = document.getElementById('project-submenu');
    if (submenu) submenu.classList.remove('hidden');
  } else if (pageName.includes('라이선스')) {
    activeMenuId = 'menu-license';
  } else if (pageName.includes('데이터') || pageName.includes('백업')) {
    activeMenuId = 'menu-data';
  } else if (pageName.includes('보고서')) {
    activeMenuId = 'menu-report';
  } else if (pageName.includes('사용자관리')) {
    activeMenuId = 'menu-user';
  } else if (pageName.includes('시험도구') || pageName.includes('시스템')) {
    activeMenuId = 'menu-system';
  } else if (pageName.includes('가이드') || pageName.includes('도움말')) {
    activeMenuId = 'menu-help';
  }
  
  // 활성화된 메뉴에 스타일 적용
  const activeMenu = document.getElementById(activeMenuId);
  if (activeMenu) {
    activeMenu.classList.remove('text-gray-300');
    activeMenu.classList.add('bg-purple-600', 'text-white');
  }
}