const fs = require('fs');
const path = require('path');

// 모든 HTML 파일 가져오기
const htmlFiles = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'))
  .sort();

console.log('🧹 모든 HTML 파일 강력 정리 시작...\n');

let cleanedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let modified = false;
  
  // Next.js 관련 모든 참조 제거 (더 강력한 패턴)
  const patterns = [
    // Next.js 스크립트
    /<script[^>]*>self\.__next[^<]*<\/script>/gi,
    /<script[^>]*src="[^"]*\/_next\/[^"]*"[^>]*><\/script>/gi,
    /<script[^>]*id="__NEXT_DATA__"[^>]*>[^<]*<\/script>/gi,
    /<script>window\.__NEXT[^<]*<\/script>/gi,
    
    // Next.js 링크와 스타일
    /<link[^>]*href="[^"]*\/_next\/[^"]*"[^>]*>/gi,
    /<link[^>]*href="[^"]*\/__nextjs_[^"]*"[^>]*>/gi,
    /<link[^>]*data-precedence="next"[^>]*>/gi,
    
    // Next.js 폰트 관련
    /<style[^>]*>@font-face\{font-family:'__[^']*'[^}]*\}[^<]*<\/style>/gi,
    /<style[^>]*data-href="[^"]*\/_next\/[^"]*"[^>]*>[^<]*<\/style>/gi,
    /style="font-family:'__[^']*'[^"]*"/gi,
    
    // 미디어 관련 잘못된 경로
    /<link[^>]*href="[^"]*\/\.\.\/media\/[^"]*"[^>]*>/gi,
    
    // Next.js 메타 태그
    /<meta[^>]*name="next-[^"]*"[^>]*>/gi,
    
    // 기타 Next.js 관련
    /<!--\$?-->/gi,
    /<!--\/?-->/gi
  ];
  
  patterns.forEach(pattern => {
    const before = content.length;
    content = content.replace(pattern, '');
    if (content.length !== before) {
      modified = true;
    }
  });
  
  // Tailwind CDN 추가 (없는 경우만)
  if (!content.includes('cdn.tailwindcss.com')) {
    const tailwindCDN = `<script src="https://cdn.tailwindcss.com"></script>
<style>
  .text-primary-600 { color: #2563eb; }
  .bg-primary-600 { background-color: #2563eb; }
  .hover\\:text-primary-600:hover { color: #2563eb; }
  .hover\\:bg-primary-700:hover { background-color: #1d4ed8; }
  .radio-group { display: flex; flex-wrap: wrap; gap: 0.75rem; }
  .radio-item { display: flex; align-items: center; padding: 0.5rem 1rem; }
</style>
`;
    content = content.replace('</head>', tailwindCDN + '\n</head>');
    modified = true;
  }
  
  // 파일 저장 (변경사항이 있는 경우만)
  if (modified) {
    fs.writeFileSync(file, content);
    console.log(`✅ ${file} 정리 완료`);
    cleanedCount++;
  }
});

console.log(`\n✨ 총 ${cleanedCount}개 파일 정리 완료!`);