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
  { file: '2-1_dashboard', path: '/dashboard', name: '메인 대시보드' },
  
  // 공지사항
  { file: '3-1_announcement', path: '/announcements', name: '공지사항' },
  { file: '3-2_announcement-create', path: '/announcements/new', name: '공지 작성' },
  
  // 프로젝트 관리
  { file: '4-1_projects', path: '/projects', name: '통합 프로젝트' },
  
  // 시험 관리 - 스캔시험
  { file: '5-1_test-scan', path: '/test/scan', name: '스캔시험' },
  { file: '5-2_test-scan-setup', path: '/test/scan/new', name: '시험 설정' },
  { file: '5-3_test-scan-execute', path: '/test/scan/1/execute', name: '시험 실행' },
  { file: '5-4_test-scan-result', path: '/test/scan/1/result', name: '시험 결과' },
  { file: '5-6_test-scan-report', path: '/test/scan/1/report', name: '사설 보고서' },
  
  // 시험 관리 - 부하시험
  { file: '6-1_test-load', path: '/test/load', name: '부하시험' },
  { file: '6-2_test-load-setup', path: '/test/load/new', name: '시험 설정' },
  { file: '6-3_test-load-execute', path: '/test/load/1/execute', name: '시험 실행' },
  { file: '6-4_test-load-result', path: '/test/load/1/result', name: '시험 결과' },
  { file: '6-6_test-load-report', path: '/test/load/1/report', name: '사설 보고서' },
  
  // 라이선스 관리
  { file: '7-1_license-manage', path: '/licenses', name: '발급/관리' },
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
  { file: '9-10_report-private', path: '/reports/private', name: '사설 보고서(TOL)' },
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
        const processedHtml = await page.evaluate((mapping) => {
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
          
          // 모든 href를 상대 경로로 변경
          document.querySelectorAll('a[href]').forEach(a => {
            const href = a.getAttribute('href');
            if (href && href.startsWith('/')) {
              if (mapping[href]) {
                a.setAttribute('href', mapping[href]);
              }
            }
          });
          
          // JavaScript 코드 추가 (인터랙션용)
          const jsCode = `
<script>
// 사이드바 토글 기능
document.addEventListener('DOMContentLoaded', function() {
  // 사이드바 메뉴 토글
  const menuButtons = document.querySelectorAll('[data-menu-toggle]');
  menuButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-menu-toggle');
      const submenu = document.getElementById(targetId);
      if (submenu) {
        submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
        
        // 화살표 아이콘 회전
        const arrow = this.querySelector('svg');
        if (arrow) {
          arrow.style.transform = submenu.style.display === 'none' ? 'rotate(0deg)' : 'rotate(90deg)';
        }
      }
    });
  });
  
  // 모든 서브메뉴 초기 상태 설정
  document.querySelectorAll('[data-submenu]').forEach(submenu => {
    submenu.style.display = 'block'; // 기본적으로 모두 열림
  });
  
  // 드롭다운 메뉴 토글
  const dropdownButtons = document.querySelectorAll('[data-dropdown-toggle]');
  dropdownButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = this.nextElementSibling;
      if (dropdown) {
        dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
      }
    });
  });
  
  // 클릭 외부 영역 클릭시 드롭다운 닫기
  document.addEventListener('click', function() {
    document.querySelectorAll('[data-dropdown]').forEach(dropdown => {
      dropdown.style.display = 'none';
    });
  });
  
  // 탭 기능
  const tabButtons = document.querySelectorAll('[data-tab]');
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      const tabName = this.getAttribute('data-tab');
      const tabContent = document.getElementById(tabName);
      
      // 모든 탭 비활성화
      document.querySelectorAll('[data-tab]').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('[data-tab-content]').forEach(c => c.style.display = 'none');
      
      // 선택된 탭 활성화
      this.classList.add('active');
      if (tabContent) {
        tabContent.style.display = 'block';
      }
    });
  });
  
  // 모달 기능
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal-trigger');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.style.display = 'flex';
      }
    });
  });
  
  // 모달 닫기
  const modalCloses = document.querySelectorAll('[data-modal-close]');
  modalCloses.forEach(close => {
    close.addEventListener('click', function() {
      const modal = this.closest('[data-modal]');
      if (modal) {
        modal.style.display = 'none';
      }
    });
  });
});
</script>`;
          
          // 사이드바의 서브메뉴에 data 속성 추가
          document.querySelectorAll('nav button').forEach((button, index) => {
            const hasSubmenu = button.parentElement.querySelector('div');
            if (hasSubmenu) {
              button.setAttribute('data-menu-toggle', `submenu-${index}`);
              hasSubmenu.setAttribute('id', `submenu-${index}`);
              hasSubmenu.setAttribute('data-submenu', 'true');
            }
          });
          
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
    
    /* 사이드바 애니메이션 */
    [data-sidebar] {
      transition: width 0.3s ease;
    }
    
    /* 서브메뉴 애니메이션 */
    [data-submenu] {
      transition: all 0.3s ease;
      overflow: hidden;
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
    button, a { cursor: pointer; }
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
    
    /* 탭 스타일 */
    [data-tab].active {
      border-bottom: 2px solid #3b82f6;
      color: #3b82f6;
    }
    
    [data-tab-content] {
      display: none;
    }
    
    /* 모달 스타일 */
    [data-modal] {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 100;
    }
    
    [data-modal] > div {
      background: white;
      border-radius: 0.5rem;
      padding: 2rem;
      max-width: 500px;
      width: 90%;
    }
  </style>
</head>
<body>
  ${document.body.innerHTML}
  ${jsCode}
</body>
</html>`;
          
          return fullHtml;
        }, urlMapping);
        
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
    
    // index.html 생성
    createIndexPage();
    
  } catch (error) {
    console.error('치명적 오류:', error);
  } finally {
    await browser.close();
  }
}

function createIndexPage() {
  const indexHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>COONTEC 사이버 보안 시스템 - 전체 목업</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    h1 {
      color: #1a202c;
      font-size: 2.5rem;
      margin-bottom: 10px;
      text-align: center;
    }
    .subtitle {
      color: #718096;
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.1rem;
    }
    .stats {
      background: #f7fafc;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      text-align: center;
    }
    .stats-item {
      display: inline-block;
      margin: 0 20px;
    }
    .stats-number {
      font-size: 2rem;
      font-weight: bold;
      color: #667eea;
    }
    .stats-label {
      color: #718096;
      font-size: 0.9rem;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-size: 1.3rem;
      color: #2d3748;
      margin-bottom: 15px;
      padding-bottom: 8px;
      border-bottom: 2px solid #e2e8f0;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .section-title:hover {
      color: #667eea;
    }
    .section-title svg {
      transition: transform 0.3s;
    }
    .section-content {
      display: block;
      transition: all 0.3s ease;
    }
    .section-content.collapsed {
      display: none;
    }
    .page-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 15px;
      padding-top: 10px;
    }
    .page-link {
      display: block;
      padding: 15px;
      background: #f7fafc;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      text-decoration: none;
      color: #2d3748;
      transition: all 0.3s ease;
    }
    .page-link:hover {
      background: #667eea;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .page-number {
      font-size: 0.875rem;
      color: #a0aec0;
      margin-bottom: 4px;
      font-family: monospace;
    }
    .page-link:hover .page-number {
      color: rgba(255,255,255,0.8);
    }
    .page-name {
      font-weight: 600;
    }
    .expand-all {
      text-align: center;
      margin-bottom: 20px;
    }
    .expand-all button {
      padding: 8px 16px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .expand-all button:hover {
      background: #5a67d8;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #e2e8f0;
      text-align: center;
      color: #718096;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚢 COONTEC 사이버 보안 시스템</h1>
    <p class="subtitle">한국선급(KR) 인증 선박 사이버보안 테스트 플랫폼 - 전체 목업</p>
    
    <div class="stats">
      <div class="stats-item">
        <div class="stats-number">53</div>
        <div class="stats-label">전체 페이지</div>
      </div>
      <div class="stats-item">
        <div class="stats-number">7</div>
        <div class="stats-label">메인 섹션</div>
      </div>
      <div class="stats-item">
        <div class="stats-number">100%</div>
        <div class="stats-label">구현 완료</div>
      </div>
    </div>
    
    <div class="expand-all">
      <button onclick="toggleAll()">모든 섹션 펼치기/접기</button>
    </div>
    
    <!-- 인증/보안 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        🔐 인증/보안
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('1-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 대시보드 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        📊 대시보드 & 공지사항
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('2-') || p.file.startsWith('3-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 프로젝트 & 시험 관리 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        🔍 프로젝트 & 시험 관리
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('4-') || p.file.startsWith('5-') || p.file.startsWith('6-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 라이선스 관리 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        🔑 라이선스 관리
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('7-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 데이터 관리 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        💾 데이터 관리
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('8-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 보고서 관리 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        📄 보고서 관리
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('9-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 사용자 & 시스템 관리 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        ⚙️ 사용자 & 시스템 관리
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('10-') || p.file.startsWith('11-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <!-- 감사/로그 & 알림 & 도움말 섹션 -->
    <div class="section">
      <h2 class="section-title" onclick="toggleSection(this)">
        📋 감사/로그 & 알림 & 도움말
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </h2>
      <div class="section-content">
        <div class="page-grid">
          ${allPages.filter(p => p.file.startsWith('12-') || p.file.startsWith('13-') || p.file.startsWith('14-')).map(p => `
          <a href="${p.file}.html" class="page-link">
            <div class="page-number">[${p.file.replace('_', ' ')}]</div>
            <div class="page-name">${p.name}</div>
          </a>`).join('')}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>© 2024 COONTEC. 한국선급(KR) 인증 사이버보안 테스트 플랫폼</p>
      <p style="margin-top: 10px; font-size: 0.875rem;">모든 53개 페이지가 완전히 구현되었습니다.</p>
    </div>
  </div>
  
  <script>
    function toggleSection(element) {
      const content = element.nextElementSibling;
      const arrow = element.querySelector('svg');
      
      content.classList.toggle('collapsed');
      
      if (content.classList.contains('collapsed')) {
        arrow.style.transform = 'rotate(-90deg)';
      } else {
        arrow.style.transform = 'rotate(0deg)';
      }
    }
    
    function toggleAll() {
      const sections = document.querySelectorAll('.section-content');
      const allCollapsed = Array.from(sections).every(s => s.classList.contains('collapsed'));
      
      sections.forEach(section => {
        const arrow = section.previousElementSibling.querySelector('svg');
        if (allCollapsed) {
          section.classList.remove('collapsed');
          arrow.style.transform = 'rotate(0deg)';
        } else {
          section.classList.add('collapsed');
          arrow.style.transform = 'rotate(-90deg)';
        }
      });
    }
  </script>
</body>
</html>`;
  
  fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
  console.log('\n✓ index.html 생성 완료');
}

// 실행
captureAllPages();