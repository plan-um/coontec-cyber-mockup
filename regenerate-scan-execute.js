const puppeteer = require('puppeteer');
const fs = require('fs');

async function regenerateScanExecutePage() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('스캔시험 실행 페이지 재생성 중...');
    
    // 실제 존재하는 페이지로 이동
    const url = 'http://localhost:3000/test/scan/setup';
    console.log(`페이지 로딩: ${url}`);
    
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // HTML 추출
    const htmlContent = await page.content();
    
    // HTML 파일로 저장 (5-3_test-scan-execute.html로 저장)
    const outputFile = '5-3_test-scan-execute.html';
    fs.writeFileSync(outputFile, htmlContent);
    
    console.log(`✓ ${outputFile} 생성 완료`);
    
    // 제목과 내용 일부 확인
    const title = await page.title();
    console.log(`  페이지 제목: ${title}`);
    
    const hasContent = await page.evaluate(() => {
      return document.querySelector('main') !== null;
    });
    console.log(`  메인 콘텐츠 존재: ${hasContent ? '예' : '아니오'}`);
    
  } catch (error) {
    console.error('오류 발생:', error);
  } finally {
    await browser.close();
  }
}

// 실행
regenerateScanExecutePage();