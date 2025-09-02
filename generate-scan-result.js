const puppeteer = require('puppeteer');
const fs = require('fs');

async function generateScanResult() {
  const browser = await puppeteer.launch({ 
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    console.log('5-4_스캔결과.html 생성 중...');
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Next.js 서버에서 스캔 결과 페이지 가져오기
    await page.goto('http://localhost:3000/test/scan/result', { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    // 페이지 로드 대기
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let html = await page.content();
    
    // 링크 수정
    html = html.replace(/href="\/test\/scan"/g, 'href="5-1_스캔시험.html"');
    html = html.replace(/href="\/test\/scan\/setup"/g, 'href="5-2_스캔설정.html"');
    html = html.replace(/href="\/test\/scan\/execute"/g, 'href="5-3_시험실행.html"');
    html = html.replace(/href="\/dashboard"/g, 'href="2-1_대시보드.html"');
    html = html.replace(/href="\/project"/g, 'href="4-1_통합프로젝트.html"');
    html = html.replace(/href="\/notifications"/g, 'href="13-1_알림.html"');
    html = html.replace(/href="\/announcement"/g, 'href="3-1_공지사항.html"');
    html = html.replace(/href="\/report\/generate"/g, 'href="9-1_보고서생성.html"');
    
    // Next.js 스크립트 제거
    html = html.replace(/<script[^>]*src="[^"]*\/_next[^"]*"[^>]*><\/script>/g, '');
    html = html.replace(/<link[^>]*href="[^"]*\/_next[^"]*"[^>]*>/g, '');
    
    // Tailwind CDN 추가
    const tailwindCDN = `
<script src="https://cdn.tailwindcss.com"></script>
<style>
  .text-primary-600 { color: #2563eb; }
  .bg-primary-600 { background-color: #2563eb; }
  .hover\\:text-primary-600:hover { color: #2563eb; }
  .hover\\:bg-primary-700:hover { background-color: #1d4ed8; }
</style>
`;
    html = html.replace('</head>', tailwindCDN + '</head>');
    
    fs.writeFileSync('5-4_스캔결과.html', html);
    console.log('✓ 5-4_스캔결과.html 생성 완료');
    
  } catch (error) {
    console.error('오류 발생:', error);
    
    // 오류 시 기본 HTML 생성
    const fallbackHTML = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>스캔 결과 - COONTEC 사이버복원력 시험도구</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="min-h-screen bg-gray-50">
    <header class="bg-white border-b">
      <div class="container mx-auto px-4 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-bold text-blue-600">COONTEC</h1>
          <nav class="flex gap-4">
            <a href="2-1_대시보드.html" class="hover:text-blue-600">대시보드</a>
            <a href="4-1_통합프로젝트.html" class="hover:text-blue-600">프로젝트</a>
          </nav>
        </div>
      </div>
    </header>
    
    <main class="container mx-auto px-4 py-8">
      <div class="mb-6">
        <a href="5-1_스캔시험.html" class="text-blue-600 hover:underline">← 스캔시험 목록으로</a>
      </div>
      
      <h1 class="text-3xl font-bold mb-6">스캔 결과</h1>
      
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">스캔 요약</h2>
        <div class="grid grid-cols-4 gap-4">
          <div class="bg-blue-50 p-4 rounded">
            <p class="text-sm text-gray-600">전체 호스트</p>
            <p class="text-2xl font-bold">254</p>
          </div>
          <div class="bg-green-50 p-4 rounded">
            <p class="text-sm text-gray-600">활성 호스트</p>
            <p class="text-2xl font-bold">47</p>
          </div>
          <div class="bg-yellow-50 p-4 rounded">
            <p class="text-sm text-gray-600">열린 포트</p>
            <p class="text-2xl font-bold">382</p>
          </div>
          <div class="bg-red-50 p-4 rounded">
            <p class="text-sm text-gray-600">발견 취약점</p>
            <p class="text-2xl font-bold text-red-600">23</p>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">취약점 분석</h2>
        <div class="space-y-4">
          <div class="flex items-center justify-between p-4 border rounded">
            <div>
              <span class="px-2 py-1 bg-red-100 text-red-800 rounded text-sm">치명적</span>
              <span class="ml-2 font-medium">CVE-2024-1234: 원격 코드 실행 취약점</span>
            </div>
            <span class="text-sm text-gray-600">192.168.1.100</span>
          </div>
          <div class="flex items-center justify-between p-4 border rounded">
            <div>
              <span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm">높음</span>
              <span class="ml-2 font-medium">CVE-2024-5678: 권한 상승 취약점</span>
            </div>
            <span class="text-sm text-gray-600">192.168.1.101</span>
          </div>
          <div class="flex items-center justify-between p-4 border rounded">
            <div>
              <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-sm">중간</span>
              <span class="ml-2 font-medium">CVE-2024-9012: 정보 노출 취약점</span>
            </div>
            <span class="text-sm text-gray-600">192.168.1.102</span>
          </div>
        </div>
      </div>
      
      <div class="flex justify-end gap-2">
        <button class="px-4 py-2 border rounded hover:bg-gray-50">CSV 내보내기</button>
        <a href="9-1_보고서생성.html" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          보고서 생성
        </a>
      </div>
    </main>
  </div>
</body>
</html>`;
    
    fs.writeFileSync('5-4_스캔결과.html', fallbackHTML);
    console.log('✓ 5-4_스캔결과.html 기본 템플릿으로 생성 완료');
  } finally {
    await browser.close();
  }
}

generateScanResult();