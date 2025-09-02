const puppeteer = require('puppeteer');
const fs = require('fs');

// 404 에러 페이지들의 URL 매핑
const pagesToRegenerate = {
  '7-5_요청할당.html': { url: '/license/request', title: '라이선스 요청/할당' },
  '7-6_요청승인.html': { url: '/license/approve', title: '라이선스 요청 승인' },
  '7-7_사용자할당.html': { url: '/license/assign', title: '라이선스 사용자 할당' },
  '7-9_오프라인인증.html': { url: '/license/offline', title: '오프라인 인증' },
  '8-1_시험데이터.html': { url: '/data', title: '시험 데이터 관리' },
  '8-2_데이터조회.html': { url: '/data/search', title: '데이터 조회' },
  '8-6_백업실행.html': { url: '/data/backup/execute', title: '백업 실행' },
  '8-7_복구실행.html': { url: '/data/restore', title: '복구 실행' },
  '9-6_보고서출력.html': { url: '/report/print', title: '보고서 출력' },
  '9-8_보고서검색.html': { url: '/report/search', title: '보고서 검색' },
  '9-9_버전관리.html': { url: '/report/version', title: '보고서 버전 관리' },
  '9-10_사설보고서.html': { url: '/report/custom', title: '사설 보고서' },
  '9-11_사설보고서관리.html': { url: '/report/custom/manage', title: '사설 보고서 관리' },
  '9-12_사설보고서출력.html': { url: '/report/custom/print', title: '사설 보고서 출력' },
  '10-2_사용자등록.html': { url: '/user/register', title: '사용자 등록' },
  '10-3_사용자상세.html': { url: '/user/detail', title: '사용자 상세' },
  '11-1_시스템설정.html': { url: '/system', title: '시스템 설정' },
  '12-1_감사로그.html': { url: '/audit', title: '감사 로그' },
  '4-3_프로젝트상세.html': { url: '/project/detail', title: '프로젝트 상세' },
  '4-4_관리영역.html': { url: '/project/zone', title: '관리영역(Zone)' },
  '4-5_토폴로지.html': { url: '/project/topology', title: '네트워크 토폴로지' }
};

// 링크 매핑
const linkMapping = {
  'href="/login"': 'href="1-1_로그인.html"',
  'href="/reset-password"': 'href="1-2_비밀번호재설정.html"',
  'href="/signup"': 'href="1-5_회원가입.html"',
  'href="/dashboard"': 'href="2-1_대시보드.html"',
  'href="/announcement"': 'href="3-1_공지사항.html"',
  'href="/project"': 'href="4-1_통합프로젝트.html"',
  'href="/test/scan"': 'href="5-1_스캔시험.html"',
  'href="/test/scan/setup"': 'href="5-2_스캔설정.html"',
  'href="/test/scan/execute"': 'href="5-3_시험실행.html"',
  'href="/test/scan/result"': 'href="5-4_스캔결과.html"',
  'href="/test/load"': 'href="6-1_부하시험.html"',
  'href="/license"': 'href="7-1_발급관리.html"',
  'href="/data"': 'href="8-1_시험데이터.html"',
  'href="/report/generate"': 'href="9-1_보고서생성.html"',
  'href="/user"': 'href="10-1_사용자관리.html"',
  'href="/system"': 'href="11-1_시스템설정.html"',
  'href="/audit"': 'href="12-1_감사로그.html"',
  'href="/notifications"': 'href="13-1_알림.html"'
};

async function regeneratePage(browser, fileName, pageInfo) {
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Next.js 서버에서 페이지 가져오기
    const fullUrl = `http://localhost:3000${pageInfo.url}`;
    console.log(`  Fetching: ${fullUrl}`);
    
    const response = await page.goto(fullUrl, { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    // 404 체크
    if (response.status() === 404) {
      console.log(`  ⚠️  404 에러 - 기본 템플릿 생성`);
      await page.close();
      return createFallbackPage(fileName, pageInfo);
    }
    
    // 페이지 로드 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let html = await page.content();
    
    // 모든 링크 수정
    Object.entries(linkMapping).forEach(([from, to]) => {
      html = html.replace(new RegExp(from, 'g'), to);
    });
    
    // Next.js 스크립트 및 폰트 참조 제거
    html = html.replace(/<script[^>]*>self\.__next[^<]*<\/script>/gi, '');
    html = html.replace(/<script[^>]*src="[^"]*\/_next\/[^"]*"[^>]*><\/script>/gi, '');
    html = html.replace(/<script[^>]*id="__NEXT_DATA__"[^>]*>[^<]*<\/script>/gi, '');
    html = html.replace(/<link[^>]*href="[^"]*\/_next\/[^"]*"[^>]*>/gi, '');
    html = html.replace(/<link[^>]*data-precedence="next"[^>]*>/gi, '');
    html = html.replace(/style="font-family:'__[^']*'[^"]*"/gi, '');
    html = html.replace(/<style[^>]*>@font-face\{[^}]*\}[^<]*<\/style>/gi, '');
    html = html.replace(/<!--\$?-->/gi, '');
    html = html.replace(/<!--\/?-->/gi, '');
    
    // Tailwind CDN 추가
    if (!html.includes('cdn.tailwindcss.com')) {
      const tailwindCDN = `
<script src="https://cdn.tailwindcss.com"></script>
<style>
  .text-primary-600 { color: #2563eb; }
  .bg-primary-600 { background-color: #2563eb; }
  .hover\\:text-primary-600:hover { color: #2563eb; }
  .hover\\:bg-primary-700:hover { background-color: #1d4ed8; }
  .radio-group { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .radio-item { display: flex; align-items: center; padding: 0.5rem 1rem; }
</style>`;
      html = html.replace('</head>', tailwindCDN + '\n</head>');
    }
    
    // 사이드메뉴 토글 스크립트 추가
    const sidebarScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  const toggleButtons = document.querySelectorAll('aside button');
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const chevron = button.querySelector('.lucide-chevron-down');
      const submenu = button.parentElement.nextElementSibling;
      if (submenu && submenu.tagName === 'DIV') {
        if (submenu.style.display === 'none' || !submenu.style.display) {
          submenu.style.display = 'block';
          if (chevron) chevron.style.transform = 'rotate(180deg)';
        } else {
          submenu.style.display = 'none';
          if (chevron) chevron.style.transform = 'rotate(0deg)';
        }
      }
    });
  });
  // 시험 관리 메뉴 기본 열기
  const testBtn = Array.from(toggleButtons).find(btn => btn.textContent.includes('시험 관리'));
  if (testBtn) {
    const submenu = testBtn.parentElement.nextElementSibling;
    if (submenu) {
      submenu.style.display = 'block';
      const chevron = testBtn.querySelector('.lucide-chevron-down');
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    }
  }
});
</script>`;
    
    if (!html.includes('document.addEventListener(\'DOMContentLoaded\'')) {
      html = html.replace('</body>', sidebarScript + '\n</body>');
    }
    
    fs.writeFileSync(fileName, html);
    await page.close();
    return true;
    
  } catch (error) {
    console.error(`  ❌ 오류: ${error.message}`);
    return createFallbackPage(fileName, pageInfo);
  }
}

function createFallbackPage(fileName, pageInfo) {
  // 기본 템플릿 생성
  const template = fs.readFileSync('2-1_대시보드.html', 'utf8');
  
  // 제목과 내용 변경
  let html = template.replace(/<title>[^<]*<\/title>/gi, `<title>${pageInfo.title} - COONTEC 사이버복원력 시험도구</title>`);
  html = html.replace(/<h1[^>]*>[^<]*<\/h1>/i, `<h1 class="text-3xl font-bold text-gray-900">${pageInfo.title}</h1>`);
  html = html.replace(/<p class="text-gray-600 mt-2">[^<]*<\/p>/i, `<p class="text-gray-600 mt-2">${pageInfo.title} 페이지</p>`);
  
  // 대시보드 특유의 콘텐츠 제거하고 기본 콘텐츠로 대체
  const mainContent = `
<main class="flex-1 p-6 bg-gray-50">
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-900">${pageInfo.title}</h1>
      <p class="text-gray-600 mt-2">${pageInfo.title} 페이지</p>
    </div>
    
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">${pageInfo.title}</h2>
      <p class="text-gray-600">이 페이지는 현재 개발 중입니다.</p>
      
      <div class="mt-6">
        <a href="2-1_대시보드.html" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          대시보드로 돌아가기
        </a>
      </div>
    </div>
  </div>
</main>`;
  
  // main 태그 교체
  html = html.replace(/<main[^>]*>[\s\S]*<\/main>/i, mainContent);
  
  fs.writeFileSync(fileName, html);
  console.log(`  ✓ 기본 템플릿 생성 완료`);
  return true;
}

async function checkAndRegenerate() {
  console.log('🔍 404 페이지 확인 및 재생성 시작...\n');
  
  // 모든 HTML 파일 검사
  const allFiles = fs.readdirSync('.')
    .filter(f => f.endsWith('.html'))
    .filter(f => !f.includes('index') && !f.includes('sidebar') && !f.includes('test-'));
  
  const filesToRegenerate = [];
  
  console.log('📋 파일 검사 중...');
  allFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('404: This page could not be found') || 
        content.includes('404</h1>') ||
        content.length < 5000) { // 너무 작은 파일도 체크
      filesToRegenerate.push(file);
      console.log(`  ❌ ${file} - 재생성 필요`);
    }
  });
  
  if (filesToRegenerate.length === 0) {
    console.log('\n✅ 모든 파일이 정상입니다!');
    return;
  }
  
  console.log(`\n📦 ${filesToRegenerate.length}개 파일 재생성 시작...\n`);
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  for (const file of filesToRegenerate) {
    console.log(`처리 중: ${file}`);
    
    const pageInfo = pagesToRegenerate[file];
    if (pageInfo) {
      await regeneratePage(browser, file, pageInfo);
    } else {
      console.log(`  ⚠️  URL 매핑 없음 - 스킵`);
    }
  }
  
  await browser.close();
  console.log('\n✨ 재생성 완료!');
}

checkAndRegenerate().catch(console.error);