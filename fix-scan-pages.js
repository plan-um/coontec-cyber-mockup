const fs = require('fs');
const puppeteer = require('puppeteer');

async function fixScanPages() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    // 1. 5-2_스캔설정.html 생성 (설정 화면)
    console.log('5-2_스캔설정.html 생성 중...');
    const setupPage = await browser.newPage();
    await setupPage.setViewport({ width: 1920, height: 1080 });
    await setupPage.goto('http://localhost:3000/test/scan/setup', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let setupHtml = await setupPage.content();
    
    // 제목 수정
    setupHtml = setupHtml.replace('스캔시험 설정', '스캔 파라미터 설정');
    setupHtml = setupHtml.replace('선박 네트워크 취약점 스캔 파라미터를 설정합니다', '스캔 범위와 방법을 설정합니다');
    
    // 토스 스타일 수정 - 좀 더 격식있게
    setupHtml = setupHtml.replace('얼마나 자세히?', '스캔 깊이');
    setupHtml = setupHtml.replace('간단히', '기본 스캔');
    setupHtml = setupHtml.replace('아주 자세히', '정밀 스캔');
    setupHtml = setupHtml.replace('어떻게 스캔할까요?', '스캔 옵션 설정');
    
    // 링크 수정
    setupHtml = setupHtml.replace(/href="\/test\/scan"/g, 'href="5-1_스캔시험.html"');
    setupHtml = setupHtml.replace(/href="\/test\/scan\/execute"/g, 'href="5-3_시험실행.html"');
    setupHtml = setupHtml.replace(/href="\/dashboard"/g, 'href="2-1_대시보드.html"');
    setupHtml = setupHtml.replace(/href="\/project"/g, 'href="4-1_통합프로젝트.html"');
    setupHtml = setupHtml.replace(/href="\/notifications"/g, 'href="13-1_알림.html"');
    setupHtml = setupHtml.replace(/href="\/announcement"/g, 'href="3-1_공지사항.html"');
    
    // 버튼 텍스트 수정
    setupHtml = setupHtml.replace('스캔 실행', '설정 저장 및 다음');
    
    // Next.js 스크립트 제거
    setupHtml = setupHtml.replace(/<script[^>]*src="[^"]*\/_next[^"]*"[^>]*><\/script>/g, '');
    setupHtml = setupHtml.replace(/<link[^>]*href="[^"]*\/_next[^"]*"[^>]*>/g, '');
    
    fs.writeFileSync('5-2_스캔설정.html', setupHtml);
    console.log('✓ 5-2_스캔설정.html 생성 완료');
    await setupPage.close();
    
    // 2. 5-3_시험실행.html 수정 (실행 화면으로 변경)
    console.log('5-3_시험실행.html 수정 중...');
    const executePage = await browser.newPage();
    await executePage.setViewport({ width: 1920, height: 1080 });
    await executePage.goto('http://localhost:3000/test/scan/execute', { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let executeHtml = await executePage.content();
    
    // 링크 수정
    executeHtml = executeHtml.replace(/href="\/test\/scan"/g, 'href="5-1_스캔시험.html"');
    executeHtml = executeHtml.replace(/href="\/test\/scan\/setup"/g, 'href="5-2_스캔설정.html"');
    executeHtml = executeHtml.replace(/href="\/dashboard"/g, 'href="2-1_대시보드.html"');
    executeHtml = executeHtml.replace(/href="\/project"/g, 'href="4-1_통합프로젝트.html"');
    executeHtml = executeHtml.replace(/href="\/notifications"/g, 'href="13-1_알림.html"');
    executeHtml = executeHtml.replace(/href="\/announcement"/g, 'href="3-1_공지사항.html"');
    
    // Next.js 스크립트 제거
    executeHtml = executeHtml.replace(/<script[^>]*src="[^"]*\/_next[^"]*"[^>]*><\/script>/g, '');
    executeHtml = executeHtml.replace(/<link[^>]*href="[^"]*\/_next[^"]*"[^>]*>/g, '');
    
    fs.writeFileSync('5-3_시험실행.html', executeHtml);
    console.log('✓ 5-3_시험실행.html 수정 완료');
    await executePage.close();
    
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
  }
}

// 실행
fixScanPages();