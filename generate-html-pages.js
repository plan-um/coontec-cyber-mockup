const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 페이지 정보 매핑
const pages = [
  { file: '1_dashboard', path: '/dashboard', name: '대시보드' },
  { file: '2_project', path: '/projects', name: '프로젝트' },
  { file: '3_test_scan', path: '/test/scan', name: '스캔시험' },
  { file: '3_1_test_scan_setup', path: '/test/scan/new', name: '스캔시험 설정' },
  { file: '3_2_test_scan_execute', path: '/test/scan/1/execute', name: '스캔시험 실행' },
  { file: '3_3_test_scan_result', path: '/test/scan/1/result', name: '스캔시험 결과' },
  { file: '3_4_test_scan_report', path: '/test/scan/1/report', name: '스캔시험 보고서' },
  { file: '4_test_load', path: '/test/load', name: '부하시험' },
  { file: '4_1_test_load_setup', path: '/test/load/new', name: '부하시험 설정' },
  { file: '4_2_test_load_execute', path: '/test/load/1/execute', name: '부하시험 실행' },
  { file: '4_3_test_load_result', path: '/test/load/1/result', name: '부하시험 결과' },
  { file: '4_4_test_load_report', path: '/test/load/1/report', name: '부하시험 보고서' },
  { file: '5_report_generate', path: '/reports/generate', name: '보고서 생성' },
  { file: '5_1_report_history', path: '/reports/history', name: '보고서 이력' },
  { file: '5_2_report_view', path: '/reports/1', name: '보고서 보기' },
  { file: '6_license', path: '/licenses', name: '라이선스 관리' },
  { file: '6_1_license_issue', path: '/licenses/issue', name: '라이선스 발급' },
  { file: '6_2_license_renew', path: '/licenses/renew', name: '라이선스 갱신' },
  { file: '6_3_license_history', path: '/licenses/history', name: '라이선스 이력' },
  { file: '7_customers', path: '/customers', name: '고객사 관리' },
  { file: '7_1_customers_register', path: '/customers/new', name: '고객사 등록' },
  { file: '8_users', path: '/users', name: '사용자 관리' },
  { file: '8_1_users_register', path: '/users/new', name: '사용자 등록' },
  { file: '8_2_users_permissions', path: '/users/permissions', name: '권한 관리' },
  { file: '9_data_backup', path: '/data/backup', name: '백업/복원' },
  { file: '9_1_data_test', path: '/data/test', name: '테스트 데이터' },
  { file: '10_settings', path: '/settings', name: '시스템 설정' },
  { file: '10_1_settings_integration', path: '/settings/integration', name: '연동 설정' },
  { file: '10_2_settings_tools', path: '/settings/tools', name: '도구 설정' },
  { file: '11_logs_audit', path: '/logs/audit', name: '감사 로그' },
  { file: '11_1_logs_operation', path: '/logs/operation', name: '작업 로그' },
  { file: '11_2_logs_archive', path: '/logs/archive', name: '로그 보관' },
  { file: '12_notifications', path: '/notifications', name: '알림' },
  { file: '13_help_guide', path: '/help/guide', name: '사용자 가이드' },
  { file: '13_1_help_faq', path: '/help/faq', name: 'FAQ' },
  { file: '13_2_help_faq_manage', path: '/help/faq/manage', name: 'FAQ 관리' },
  { file: '14_announcement', path: '/announcements', name: '공지사항' },
  { file: '14_1_announcement_create', path: '/announcements/new', name: '공지사항 작성' }
];

async function capturePageHTML() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('Fetching HTML content from running application...');
    
    for (const pageInfo of pages) {
      const url = `http://localhost:3000${pageInfo.path}`;
      console.log(`Processing ${pageInfo.name} (${pageInfo.file})...`);
      
      try {
        await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // HTML 가져오기
        const html = await page.content();
        
        // 상대 경로를 절대 경로로 변경하고 스타일 인라인화
        const processedHtml = await page.evaluate(() => {
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
              // 매핑 테이블 사용
              const mapping = {
                '/dashboard': '1_dashboard.html',
                '/projects': '2_project.html',
                '/test/scan': '3_test_scan.html',
                '/test/scan/new': '3_1_test_scan_setup.html',
                '/test/scan/1/execute': '3_2_test_scan_execute.html',
                '/test/scan/1/result': '3_3_test_scan_result.html',
                '/test/scan/1/report': '3_4_test_scan_report.html',
                '/test/load': '4_test_load.html',
                '/test/load/new': '4_1_test_load_setup.html',
                '/test/load/1/execute': '4_2_test_load_execute.html',
                '/test/load/1/result': '4_3_test_load_result.html',
                '/test/load/1/report': '4_4_test_load_report.html',
                '/reports/generate': '5_report_generate.html',
                '/reports/history': '5_1_report_history.html',
                '/reports/1': '5_2_report_view.html',
                '/licenses': '6_license.html',
                '/licenses/issue': '6_1_license_issue.html',
                '/licenses/renew': '6_2_license_renew.html',
                '/licenses/history': '6_3_license_history.html',
                '/customers': '7_customers.html',
                '/customers/new': '7_1_customers_register.html',
                '/users': '8_users.html',
                '/users/new': '8_1_users_register.html',
                '/users/permissions': '8_2_users_permissions.html',
                '/data/backup': '9_data_backup.html',
                '/data/test': '9_1_data_test.html',
                '/settings': '10_settings.html',
                '/settings/integration': '10_1_settings_integration.html',
                '/settings/tools': '10_2_settings_tools.html',
                '/logs/audit': '11_logs_audit.html',
                '/logs/operation': '11_1_logs_operation.html',
                '/logs/archive': '11_2_logs_archive.html',
                '/notifications': '12_notifications.html',
                '/help/guide': '13_help_guide.html',
                '/help/faq': '13_1_help_faq.html',
                '/help/faq/manage': '13_2_help_faq_manage.html',
                '/announcements': '14_announcement.html',
                '/announcements/new': '14_1_announcement_create.html'
              };
              
              if (mapping[href]) {
                a.setAttribute('href', mapping[href]);
              }
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
    
    /* Tailwind 기본 스타일 */
    .container { width: 100%; margin: 0 auto; padding: 0 1rem; }
    @media (min-width: 640px) { .container { max-width: 640px; } }
    @media (min-width: 768px) { .container { max-width: 768px; } }
    @media (min-width: 1024px) { .container { max-width: 1024px; } }
    @media (min-width: 1280px) { .container { max-width: 1280px; } }
    
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
  </style>
</head>
<body>
  ${document.body.innerHTML}
</body>
</html>`;
          
          return fullHtml;
        });
        
        // HTML 파일 저장
        const outputPath = path.join(__dirname, `${pageInfo.file}.html`);
        fs.writeFileSync(outputPath, processedHtml);
        console.log(`✓ Saved ${pageInfo.file}.html`);
        
      } catch (error) {
        console.error(`✗ Error processing ${pageInfo.name}:`, error.message);
      }
    }
    
    // index.html 생성
    const indexHtml = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>COONTEC 사이버 보안 시스템 - 목업</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
      padding: 20px;
    }
    .container {
      max-width: 1200px;
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
      margin-bottom: 40px;
      font-size: 1.1rem;
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
    }
    .page-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 15px;
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
    }
    .page-link:hover .page-number {
      color: rgba(255,255,255,0.8);
    }
    .page-name {
      font-weight: 600;
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
    <p class="subtitle">한국선급(KR) 인증 선박 사이버보안 테스트 플랫폼 목업</p>
    
    <div class="section">
      <h2 class="section-title">📊 메인</h2>
      <div class="page-grid">
        <a href="1_dashboard.html" class="page-link">
          <div class="page-number">1</div>
          <div class="page-name">대시보드</div>
        </a>
        <a href="2_project.html" class="page-link">
          <div class="page-number">2</div>
          <div class="page-name">프로젝트</div>
        </a>
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">🔍 시험 관리</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('test')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">📄 보고서 관리</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('report')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">🔑 라이선스</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('license')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">👥 사용자 및 고객사</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('customer') || p.file.includes('user')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">⚙️ 시스템 관리</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('data') || p.file.includes('setting') || p.file.includes('log')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="section">
      <h2 class="section-title">ℹ️ 기타</h2>
      <div class="page-grid">
        ${pages.filter(p => p.file.includes('notification') || p.file.includes('help') || p.file.includes('announcement')).map(p => `
        <a href="${p.file}.html" class="page-link">
          <div class="page-number">${p.file.replace(/_/g, '.')}</div>
          <div class="page-name">${p.name}</div>
        </a>`).join('')}
      </div>
    </div>
    
    <div class="footer">
      <p>© 2024 COONTEC. 한국선급(KR) 인증 사이버보안 테스트 플랫폼</p>
    </div>
  </div>
</body>
</html>`;
    
    fs.writeFileSync(path.join(__dirname, 'index.html'), indexHtml);
    console.log('✓ Created index.html');
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
}

capturePageHTML();