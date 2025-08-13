const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 전체 53개 페이지 정보 (메뉴구조도 기준)
const allPages = [
  // 인증/보안
  { file: '1-1_login', path: '/login', name: '로그인' },
  { file: '1-2_reset-password', path: '/reset-password', name: '비밀번호 재설정' },
  { file: '1-3_sso-eclass', path: '/sso/eclass', name: 'e-class SSO' },
  { file: '1-4_sso-krdaon', path: '/sso/krdaon', name: 'KR-DAON SSO' },
  { file: '1-5_signup', path: '/signup', name: '회원가입' },
  
  // 대시보드
  { file: '2-1_dashboard', path: '/dashboard', name: '대시보드' },
  
  // 공지사항
  { file: '3-1_announcement', path: '/announcements', name: '공지사항' },
  { file: '3-2_announcement-create', path: '/announcements/new', name: '공지 작성' },
  
  // 프로젝트 관리
  { file: '4-1_projects', path: '/projects', name: '프로젝트 관리' },
  
  // 시험 관리 - 스캔시험
  { file: '5-1_test-scan', path: '/test/scan', name: '스캔시험' },
  { file: '5-2_test-scan-setup', path: '/test/scan/new', name: '스캔시험 설정' },
  { file: '5-3_test-scan-execute', path: '/test/scan/1/execute', name: '스캔시험 실행' },
  { file: '5-4_test-scan-result', path: '/test/scan/1/result', name: '스캔시험 결과' },
  { file: '5-6_test-scan-report', path: '/test/scan/1/report', name: '스캔시험 보고서' },
  
  // 시험 관리 - 부하시험
  { file: '6-1_test-load', path: '/test/load', name: '부하시험' },
  { file: '6-2_test-load-setup', path: '/test/load/new', name: '부하시험 설정' },
  { file: '6-3_test-load-execute', path: '/test/load/1/execute', name: '부하시험 실행' },
  { file: '6-4_test-load-result', path: '/test/load/1/result', name: '부하시험 결과' },
  { file: '6-6_test-load-report', path: '/test/load/1/report', name: '부하시험 보고서' },
  
  // 라이선스 관리
  { file: '7-1_license-manage', path: '/licenses', name: '라이선스 관리' },
  { file: '7-2_license-issue', path: '/licenses/issue', name: '라이선스 발급' },
  { file: '7-3_license-renew', path: '/licenses/renew', name: '라이선스 갱신' },
  { file: '7-4_license-history', path: '/licenses/history', name: '검증 이력' },
  { file: '7-5_license-request', path: '/licenses/request', name: '요청/할당' },
  { file: '7-6_license-approve', path: '/licenses/approve', name: '요청 승인' },
  { file: '7-7_license-assign', path: '/licenses/assign', name: '사용자 할당' },
  { file: '7-9_license-offline', path: '/licenses/offline', name: '오프라인 인증' },
  
  // 데이터 관리
  { file: '8-1_data-test', path: '/data/test-data', name: '시험 데이터' },
  { file: '8-2_data-query', path: '/data/query', name: '데이터 조회' },
  { file: '8-4_data-edit', path: '/data/edit', name: '데이터 수정' },
  { file: '8-5_backup-recovery', path: '/data/backup-recovery', name: '백업/복구' },
  { file: '8-6_backup-execute', path: '/data/backup-execute', name: '백업 실행' },
  { file: '8-7_recovery-execute', path: '/data/recovery-execute', name: '복구 실행' },
  
  // 보고서 관리
  { file: '9-1_report-generate', path: '/reports/generate', name: '보고서 생성' },
  { file: '9-6_report-output', path: '/reports/output', name: '보고서 출력' },
  { file: '9-7_report-history', path: '/reports/history-list', name: '보고서 이력' },
  { file: '9-8_report-search', path: '/reports/search', name: '보고서 조회' },
  { file: '9-9_report-version', path: '/reports/version', name: '버전 관리' },
  { file: '9-10_report-private', path: '/reports/private', name: '사설 보고서' },
  { file: '9-11_report-private-manage', path: '/reports/private/manage', name: '보고서 관리' },
  { file: '9-12_report-private-output', path: '/reports/private/output', name: '보고서 출력' },
  
  // 사용자 관리
  { file: '10-1_users-manage', path: '/users', name: '사용자 관리' },
  { file: '10-2_users-register', path: '/users/new', name: '사용자 등록' },
  { file: '10-3_users-detail', path: '/users/1', name: '사용자 상세' },
  { file: '10-4_permission-manage', path: '/users/permissions', name: '권한 관리' },
  { file: '10-7_customers-manage', path: '/customers', name: '고객사 관리' },
  { file: '10-8_customers-register', path: '/customers/new', name: '고객사 등록' },
  { file: '10-9_customers-detail', path: '/customers/1', name: '고객사 상세' },
  
  // 시스템 설정
  { file: '11-1_system-settings', path: '/settings', name: '시스템 설정' },
  { file: '11-7_integration-manage', path: '/settings/integration', name: '연동 관리' },
  { file: '11-10_tools-manage', path: '/settings/tools', name: '현장시험도구 관리' },
  
  // 감사/로그
  { file: '12-1_audit-log', path: '/logs/audit', name: '감사 로그' },
  { file: '12-7_operation-log', path: '/logs/operation', name: '운영 로그' },
  { file: '12-8_log-archive', path: '/logs/archive', name: '로그 보관' },
  
  // 알림
  { file: '13-1_notifications', path: '/notifications', name: '알림' },
  
  // 도움말
  { file: '14-1_user-guide', path: '/help/guide', name: '사용자 가이드' },
  { file: '14-4_faq', path: '/help/faq', name: 'FAQ' },
  { file: '14-5_faq-manage', path: '/help/faq/manage', name: 'FAQ 관리' }
];

// URL 매핑 테이블 생성
const urlMapping = {};
allPages.forEach(page => {
  urlMapping[page.path] = page.file + '.html';
});

// 사이드바 메뉴 구조 (원본과 동일)
const sidebarMenuStructure = `
<nav class="sidebar-nav">
  <div class="menu-item">
    <a href="2-1_dashboard.html" class="menu-link">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="7" height="7"></rect>
        <rect x="14" y="3" width="7" height="7"></rect>
        <rect x="14" y="14" width="7" height="7"></rect>
        <rect x="3" y="14" width="7" height="7"></rect>
      </svg>
      <span>대시보드</span>
    </a>
  </div>
  
  <div class="menu-item">
    <a href="4-1_projects.html" class="menu-link">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
      </svg>
      <span>프로젝트 관리</span>
    </a>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="11" cy="11" r="8"></circle>
        <path d="m21 21-4.35-4.35"></path>
      </svg>
      <span>시험 관리</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="5-1_test-scan.html" class="submenu-link">스캔시험</a>
      <a href="5-4_test-scan-result.html" class="submenu-link">스캔시험 결과</a>
      <a href="6-1_test-load.html" class="submenu-link">부하시험</a>
      <a href="6-4_test-load-result.html" class="submenu-link">부하시험 결과</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="11" width="18" height="10" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0110 0v4"></path>
      </svg>
      <span>라이선스</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="7-1_license-manage.html" class="submenu-link">라이선스 관리</a>
      <a href="7-2_license-issue.html" class="submenu-link">라이선스 발급</a>
      <a href="7-3_license-renew.html" class="submenu-link">라이선스 갱신</a>
      <a href="7-4_license-history.html" class="submenu-link">검증 이력</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M3 12h18"></path>
        <path d="M3 6h18"></path>
        <path d="M3 18h18"></path>
      </svg>
      <span>데이터 관리</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="8-1_data-test.html" class="submenu-link">시험 데이터</a>
      <a href="8-5_backup-recovery.html" class="submenu-link">백업/복구</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <span>보고서</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="9-1_report-generate.html" class="submenu-link">보고서 생성</a>
      <a href="9-7_report-history.html" class="submenu-link">보고서 이력</a>
      <a href="9-8_report-search.html" class="submenu-link">보고서 조회</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
        <path d="M16 3.13a4 4 0 010 7.75"></path>
      </svg>
      <span>사용자 관리</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="10-1_users-manage.html" class="submenu-link">사용자 관리</a>
      <a href="10-2_users-register.html" class="submenu-link">사용자 등록</a>
      <a href="10-4_permission-manage.html" class="submenu-link">권한 관리</a>
      <a href="10-7_customers-manage.html" class="submenu-link">고객사 관리</a>
      <a href="10-8_customers-register.html" class="submenu-link">고객사 등록</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M12 1v6"></path>
        <path d="M12 17v6"></path>
        <path d="M4.93 4.93l4.24 4.24"></path>
        <path d="M14.83 14.83l4.24 4.24"></path>
        <path d="M1 12h6"></path>
        <path d="M17 12h6"></path>
        <path d="M4.93 19.07l4.24-4.24"></path>
        <path d="M14.83 9.17l4.24-4.24"></path>
      </svg>
      <span>시스템 설정</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="11-1_system-settings.html" class="submenu-link">시스템 설정</a>
      <a href="11-7_integration-manage.html" class="submenu-link">연동 관리</a>
      <a href="11-10_tools-manage.html" class="submenu-link">도구 관리</a>
    </div>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
      </svg>
      <span>감사/로그</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="12-1_audit-log.html" class="submenu-link">감사 로그</a>
      <a href="12-7_operation-log.html" class="submenu-link">운영 로그</a>
      <a href="12-8_log-archive.html" class="submenu-link">로그 보관</a>
    </div>
  </div>
  
  <div class="menu-item">
    <a href="13-1_notifications.html" class="menu-link">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
        <path d="M13.73 21a2 2 0 01-3.46 0"></path>
      </svg>
      <span>알림</span>
    </a>
  </div>
  
  <div class="menu-item has-submenu">
    <button class="menu-link menu-toggle" onclick="toggleSubmenu(this)">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
      </svg>
      <span>도움말</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
    <div class="submenu">
      <a href="14-1_user-guide.html" class="submenu-link">사용자 가이드</a>
      <a href="14-4_faq.html" class="submenu-link">FAQ</a>
    </div>
  </div>
  
  <div class="menu-divider"></div>
  
  <div class="menu-item">
    <a href="3-1_announcement.html" class="menu-link">
      <svg class="menu-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
      <span>공지사항</span>
    </a>
  </div>
</nav>
`;

async function captureAllPages() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('총 ' + allPages.length + '개 페이지를 HTML로 변환합니다...');
    console.log('='.repeat(50));
    
    let successCount = 0;
    let failCount = 0;
    
    for (const pageInfo of allPages) {
      const url = `http://localhost:3000${pageInfo.path}`;
      console.log(`\n[${pageInfo.file}] ${pageInfo.name} 처리 중...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // HTML 가져오기 및 처리
        const processedHtml = await page.evaluate((mapping, sidebarHtml) => {
          // 모든 스타일시트 수집
          const styles = [];
          document.querySelectorAll('style').forEach(style => {
            styles.push(style.innerHTML);
          });
          
          // 링크된 스타일시트 내용 수집
          document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            try {
              const sheet = Array.from(document.styleSheets).find(s => s.href === link.href);
              if (sheet) {
                const rules = Array.from(sheet.cssRules || sheet.rules || []);
                styles.push(rules.map(r => r.cssText).join('\n'));
              }
            } catch(e) {}
          });
          
          // Next.js 관련 스크립트 제거
          document.querySelectorAll('script').forEach(s => s.remove());
          document.querySelectorAll('link[rel="preload"]').forEach(l => l.remove());
          document.querySelectorAll('link[rel="stylesheet"]').forEach(l => l.remove());
          document.querySelectorAll('meta[name^="next"]').forEach(m => m.remove());
          
          // 기존 사이드바를 새로운 구조로 교체
          const sidebar = document.querySelector('aside');
          if (sidebar) {
            sidebar.innerHTML = sidebarHtml;
          }
          
          // 모든 href를 상대 경로로 변경
          document.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('/')) {
              if (mapping[href]) {
                a.setAttribute('href', mapping[href]);
              }
            }
          });
          
          // JavaScript 코드 추가 (원본과 동일한 동작)
          const jsCode = `
<script>
// 사이드바 서브메뉴 토글 기능
function toggleSubmenu(button) {
  const menuItem = button.closest('.menu-item');
  const submenu = menuItem.querySelector('.submenu');
  const chevron = button.querySelector('.chevron-icon');
  
  menuItem.classList.toggle('expanded');
  
  if (menuItem.classList.contains('expanded')) {
    submenu.style.display = 'block';
    chevron.style.transform = 'rotate(180deg)';
  } else {
    submenu.style.display = 'none';
    chevron.style.transform = 'rotate(0deg)';
  }
}

// 페이지 로드시 현재 페이지에 해당하는 메뉴 활성화
document.addEventListener('DOMContentLoaded', function() {
  const currentPath = window.location.pathname.split('/').pop();
  
  // 모든 링크를 검사하여 현재 페이지 하이라이트
  document.querySelectorAll('.menu-link, .submenu-link').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      
      // 서브메뉴 항목이면 부모 메뉴도 확장
      const parentMenu = link.closest('.submenu');
      if (parentMenu) {
        const parentItem = parentMenu.closest('.menu-item');
        parentItem.classList.add('expanded');
        parentMenu.style.display = 'block';
        const chevron = parentItem.querySelector('.chevron-icon');
        if (chevron) chevron.style.transform = 'rotate(180deg)';
      }
    }
  });
  
  // 드롭다운 메뉴 처리
  document.querySelectorAll('[data-dropdown-toggle]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      }
    });
  });
  
  // 외부 클릭시 드롭다운 닫기
  document.addEventListener('click', function() {
    document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  });
});
</script>`;
          
          const fullHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${document.title}</title>
  <style>
    ${styles.join('\n')}
    
    /* 추가 기본 스타일 */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    
    /* 사이드바 스타일 (원본과 동일) */
    .sidebar-nav {
      flex: 1;
      padding: 1rem 0.5rem;
    }
    
    .menu-item {
      margin-bottom: 0.25rem;
    }
    
    .menu-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.5rem 0.75rem;
      border-radius: 0.375rem;
      font-size: 0.875rem;
      font-weight: 500;
      color: #374151;
      text-decoration: none;
      transition: all 0.2s;
      cursor: pointer;
      width: 100%;
      background: none;
      border: none;
      text-align: left;
    }
    
    .menu-link:hover {
      background-color: #f3f4f6;
    }
    
    .menu-link.active {
      background-color: #f3f4f6;
      color: #2563eb;
    }
    
    .menu-toggle {
      justify-content: space-between;
    }
    
    .menu-toggle > div {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    
    .menu-icon {
      width: 1rem;
      height: 1rem;
      flex-shrink: 0;
    }
    
    .chevron-icon {
      width: 1rem;
      height: 1rem;
      transition: transform 0.2s;
    }
    
    .submenu {
      display: none;
      margin-left: 1.75rem;
      margin-top: 0.25rem;
      space-y: 0.25rem;
    }
    
    .submenu-link {
      display: block;
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      color: #6b7280;
      text-decoration: none;
      border-radius: 0.375rem;
      transition: all 0.2s;
    }
    
    .submenu-link:hover {
      background-color: #f3f4f6;
    }
    
    .submenu-link.active {
      background-color: #f3f4f6;
      color: #2563eb;
      font-weight: 500;
    }
    
    .menu-divider {
      height: 1px;
      background-color: #e5e7eb;
      margin: 1rem 0;
    }
    
    .menu-item.expanded .submenu {
      display: block;
    }
    
    .menu-item.expanded .chevron-icon {
      transform: rotate(180deg);
    }
    
    /* 드롭다운 스타일 */
    [data-dropdown] {
      position: absolute;
      background: white;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
      z-index: 50;
      min-width: 200px;
    }
    
    /* 버튼 상호작용 */
    button { cursor: pointer; }
    button:disabled { opacity: 0.5; cursor: not-allowed; }
    
    /* 폼 요소 스타일 */
    input, select, textarea {
      border: 1px solid #e5e7eb;
      padding: 0.5rem;
      border-radius: 0.375rem;
      width: 100%;
    }
    
    input:focus, select:focus, textarea:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
  </style>
</head>
<body>
  ${document.body.innerHTML}
  ${jsCode}
</body>
</html>`;
          
          return fullHtml;
        }, urlMapping, sidebarMenuStructure);
        
        // HTML 파일 저장
        const outputPath = path.join(__dirname, `${pageInfo.file}.html`);
        fs.writeFileSync(outputPath, processedHtml);
        console.log(`  ✓ ${pageInfo.file}.html 저장 완료`);
        successCount++;
        
      } catch (error) {
        console.error(`  ✗ 오류 발생: ${error.message}`);
        failCount++;
      }
    }
    
    console.log('\n' + '='.repeat(50));
    console.log(`변환 완료: 성공 ${successCount}개, 실패 ${failCount}개`);
    
  } catch (error) {
    console.error('치명적 오류:', error);
  } finally {
    await browser.close();
  }
}

// 실행
captureAllPages();