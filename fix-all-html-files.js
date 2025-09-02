const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// 문제가 있는 파일 목록
const problematicFiles = [
  '1-1_로그인.html',
  '1-2_비밀번호재설정.html', 
  '1-3_e-class_SSO.html',
  '1-4_KR-DAON_SSO.html',
  '1-5_회원가입.html',
  '10-1_사용자관리.html',
  '10-2_사용자등록.html',
  '10-3_사용자상세.html',
  '11-1_시스템설정.html',
  '12-1_감사로그.html',
  '13-1_알림.html',
  '2-1_대시보드.html',
  '3-1_공지사항.html',
  '3-2_공지사항작성.html',
  '4-1_통합프로젝트.html',
  '4-3_프로젝트상세.html',
  '4-4_관리영역.html',
  '4-5_토폴로지.html',
  '5-1_스캔시험.html',
  '5-2_스캔설정.html',
  '5-3_시험실행.html',
  '5-4_스캔결과.html',
  '5-6_사설보고서_스캔.html',
  '6-1_부하시험.html',
  '6-2_부하설정.html',
  '6-3_시험실행_부하.html',
  '6-4_부하결과.html',
  '6-6_사설보고서_부하.html',
  '7-1_발급관리.html',
  '7-2_라이선스발급.html',
  '7-3_라이선스갱신.html',
  '7-4_검증이력.html',
  '7-5_요청할당.html',
  '7-6_요청승인.html',
  '7-7_사용자할당.html',
  '7-9_오프라인인증.html',
  '8-1_시험데이터.html',
  '8-2_데이터조회.html',
  '8-4_데이터편집.html',
  '8-5_백업복구.html',
  '8-6_백업실행.html',
  '8-7_복구실행.html',
  '9-10_사설보고서.html',
  '9-11_사설보고서관리.html',
  '9-12_사설보고서출력.html',
  '9-1_보고서생성.html',
  '9-6_보고서출력.html',
  '9-7_보고서이력.html',
  '9-8_보고서검색.html',
  '9-9_버전관리.html',
  'index.html',
  'sidebar-complete.html',
  'sidebar-original.html',
  'test-sidebar.html'
];

// Next.js URL 매핑
const urlMapping = {
  '1-1_로그인.html': '/login',
  '1-2_비밀번호재설정.html': '/reset-password',
  '1-3_e-class_SSO.html': '/sso/e-class',
  '1-4_KR-DAON_SSO.html': '/sso/kr-daon',
  '1-5_회원가입.html': '/signup',
  '2-1_대시보드.html': '/dashboard',
  '3-1_공지사항.html': '/announcement',
  '3-2_공지사항작성.html': '/announcement/create',
  '4-1_통합프로젝트.html': '/project',
  '4-3_프로젝트상세.html': '/project/detail',
  '4-4_관리영역.html': '/project/zone',
  '4-5_토폴로지.html': '/project/topology',
  '5-1_스캔시험.html': '/test/scan',
  '5-2_스캔설정.html': '/test/scan/setup',
  '5-3_시험실행.html': '/test/scan/execute',
  '5-4_스캔결과.html': '/test/scan/result',
  '5-6_사설보고서_스캔.html': '/test/scan/report',
  '6-1_부하시험.html': '/test/load',
  '6-2_부하설정.html': '/test/load/setup',
  '6-3_시험실행_부하.html': '/test/load/execute',
  '6-4_부하결과.html': '/test/load/result',
  '6-6_사설보고서_부하.html': '/test/load/report',
  '7-1_발급관리.html': '/license',
  '7-2_라이선스발급.html': '/license/issue',
  '7-3_라이선스갱신.html': '/license/renew',
  '7-4_검증이력.html': '/license/history',
  '7-5_요청할당.html': '/license/request',
  '7-6_요청승인.html': '/license/approve',
  '7-7_사용자할당.html': '/license/assign',
  '7-9_오프라인인증.html': '/license/offline',
  '8-1_시험데이터.html': '/data',
  '8-2_데이터조회.html': '/data/search',
  '8-4_데이터편집.html': '/data/edit',
  '8-5_백업복구.html': '/data/backup',
  '8-6_백업실행.html': '/data/backup/execute',
  '8-7_복구실행.html': '/data/restore',
  '9-1_보고서생성.html': '/report/generate',
  '9-6_보고서출력.html': '/report/print',
  '9-7_보고서이력.html': '/report/history',
  '9-8_보고서검색.html': '/report/search',
  '9-9_버전관리.html': '/report/version',
  '9-10_사설보고서.html': '/report/custom',
  '9-11_사설보고서관리.html': '/report/custom/manage',
  '9-12_사설보고서출력.html': '/report/custom/print',
  '10-1_사용자관리.html': '/user',
  '10-2_사용자등록.html': '/user/register',
  '10-3_사용자상세.html': '/user/detail',
  '11-1_시스템설정.html': '/system',
  '12-1_감사로그.html': '/audit',
  '13-1_알림.html': '/notifications'
};

async function fixHtmlFile(browser, fileName) {
  const url = urlMapping[fileName];
  
  if (!url) {
    console.log(`⚠️  ${fileName}: URL 매핑 없음 - 기본 템플릿 사용`);
    return false;
  }

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Next.js 서버에서 페이지 가져오기
    await page.goto(`http://localhost:3000${url}`, { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    // 페이지 로드 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let html = await page.content();
    
    // 모든 링크 수정
    html = html.replace(/href="\/login"/g, 'href="1-1_로그인.html"');
    html = html.replace(/href="\/reset-password"/g, 'href="1-2_비밀번호재설정.html"');
    html = html.replace(/href="\/signup"/g, 'href="1-5_회원가입.html"');
    html = html.replace(/href="\/dashboard"/g, 'href="2-1_대시보드.html"');
    html = html.replace(/href="\/announcement"/g, 'href="3-1_공지사항.html"');
    html = html.replace(/href="\/project"/g, 'href="4-1_통합프로젝트.html"');
    html = html.replace(/href="\/test\/scan"/g, 'href="5-1_스캔시험.html"');
    html = html.replace(/href="\/test\/scan\/setup"/g, 'href="5-2_스캔설정.html"');
    html = html.replace(/href="\/test\/scan\/execute"/g, 'href="5-3_시험실행.html"');
    html = html.replace(/href="\/test\/scan\/result"/g, 'href="5-4_스캔결과.html"');
    html = html.replace(/href="\/test\/load"/g, 'href="6-1_부하시험.html"');
    html = html.replace(/href="\/license"/g, 'href="7-1_발급관리.html"');
    html = html.replace(/href="\/data"/g, 'href="8-1_시험데이터.html"');
    html = html.replace(/href="\/report\/generate"/g, 'href="9-1_보고서생성.html"');
    html = html.replace(/href="\/user"/g, 'href="10-1_사용자관리.html"');
    html = html.replace(/href="\/system"/g, 'href="11-1_시스템설정.html"');
    html = html.replace(/href="\/audit"/g, 'href="12-1_감사로그.html"');
    html = html.replace(/href="\/notifications"/g, 'href="13-1_알림.html"');
    
    // Next.js 스크립트 및 폰트 참조 제거
    html = html.replace(/<script[^>]*src="[^"]*\/_next[^"]*"[^>]*><\/script>/g, '');
    html = html.replace(/<link[^>]*href="[^"]*\/_next[^"]*"[^>]*>/g, '');
    html = html.replace(/<link[^>]*href="[^"]*\/__nextjs_font[^"]*"[^>]*>/g, '');
    html = html.replace(/<link[^>]*href="[^"]*\/\.\.\/media[^"]*"[^>]*>/g, '');
    
    // Tailwind CDN 추가 (없는 경우만)
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
</style>
`;
      html = html.replace('</head>', tailwindCDN + '</head>');
    }
    
    // 파일 저장
    fs.writeFileSync(fileName, html);
    await page.close();
    return true;
    
  } catch (error) {
    console.error(`❌ ${fileName} 처리 중 오류:`, error.message);
    return false;
  }
}

async function fixIndexFiles() {
  // index.html과 sidebar 파일들은 단순히 Tailwind CDN만 추가
  const indexFiles = ['index.html', 'sidebar-complete.html', 'sidebar-original.html', 'test-sidebar.html'];
  
  indexFiles.forEach(file => {
    if (fs.existsSync(file)) {
      let content = fs.readFileSync(file, 'utf8');
      
      if (!content.includes('cdn.tailwindcss.com')) {
        const tailwindCDN = `<script src="https://cdn.tailwindcss.com"></script>\n`;
        content = content.replace('</head>', tailwindCDN + '</head>');
        fs.writeFileSync(file, content);
        console.log(`✓ ${file}: Tailwind CDN 추가 완료`);
      }
    }
  });
}

async function main() {
  console.log('🔧 모든 문제 있는 HTML 파일 수정 시작...\n');
  console.log('총 ' + problematicFiles.length + '개 파일 처리 예정\n');
  
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  let successCount = 0;
  let failCount = 0;
  
  // HTML 파일들 처리
  for (const file of problematicFiles) {
    if (file.includes('index') || file.includes('sidebar')) {
      continue; // index와 sidebar 파일은 별도 처리
    }
    
    console.log(`처리 중: ${file}`);
    const success = await fixHtmlFile(browser, file);
    
    if (success) {
      console.log(`✅ ${file} 수정 완료`);
      successCount++;
    } else {
      console.log(`❌ ${file} 수정 실패`);
      failCount++;
    }
  }
  
  await browser.close();
  
  // index와 sidebar 파일 처리
  fixIndexFiles();
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 처리 결과:');
  console.log(`✅ 성공: ${successCount}개`);
  console.log(`❌ 실패: ${failCount}개`);
  console.log(`📝 index/sidebar 파일: 4개 (Tailwind CDN 추가)`);
  console.log('\n✨ 모든 파일 처리 완료!');
}

main().catch(console.error);