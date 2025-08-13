const fs = require('fs');

// 2-1_dashboard.html에서 스타일 추출
const dashboardHtml = fs.readFileSync('2-1_dashboard.html', 'utf8');

// <style> 태그 내용 추출
const styleMatch = dashboardHtml.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) {
  console.error('대시보드 파일에서 스타일을 찾을 수 없습니다.');
  process.exit(1);
}

const styles = styleMatch[1];

// 5-3_test-scan-execute.html 읽기
let scanExecuteHtml = fs.readFileSync('5-3_test-scan-execute.html', 'utf8');

// 기존 스타일 제거하고 새 스타일 추가
scanExecuteHtml = scanExecuteHtml.replace(
  /<style>[\s\S]*?<\/style>/,
  `<style>${styles}</style>`
);

// Next.js 관련 스크립트와 링크 제거
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*src="[^"]*\/_next[^"]*"[^>]*><\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<link[^>]*href="[^"]*\/_next[^"]*"[^>]*>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*>self\.__next_f[\s\S]*?<\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*>\$RB[\s\S]*?<\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*>\$RC[\s\S]*?<\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*>requestAnimationFrame[\s\S]*?<\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<script[^>]*data-nextjs[\s\S]*?<\/script>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<nextjs-portal><\/nextjs-portal>/g, '');
scanExecuteHtml = scanExecuteHtml.replace(/<next-route-announcer[^>]*><\/next-route-announcer>/g, '');

// 사이드바 토글 JavaScript 추가
const sidebarScript = `
<script>
function toggleSubmenu(button) {
  const submenu = button.nextElementSibling;
  const chevron = button.querySelector('.chevron');
  
  if (submenu && submenu.classList.contains('submenu')) {
    if (submenu.style.display === 'none' || submenu.style.display === '') {
      submenu.style.display = 'block';
      if (chevron) chevron.style.transform = 'rotate(180deg)';
    } else {
      submenu.style.display = 'none';
      if (chevron) chevron.style.transform = 'rotate(0deg)';
    }
  }
}

// 페이지 로드시 시험 관리 메뉴 자동으로 열기
document.addEventListener('DOMContentLoaded', function() {
  // 사이드바 버튼에 onclick 추가
  document.querySelectorAll('aside button').forEach(button => {
    if (!button.onclick) {
      button.setAttribute('onclick', 'toggleSubmenu(this)');
    }
  });
  
  // submenu 클래스 추가
  document.querySelectorAll('aside button').forEach(button => {
    const nextSibling = button.nextElementSibling;
    if (nextSibling && nextSibling.tagName === 'DIV' && !nextSibling.classList.contains('border-t')) {
      nextSibling.classList.add('submenu');
      nextSibling.style.display = 'none';
    }
  });
  
  // chevron 클래스 추가
  document.querySelectorAll('aside button svg:last-child').forEach(svg => {
    if (svg.querySelector('path[d*="m6 9"]')) {
      svg.classList.add('chevron');
    }
  });
  
  // 시험 관리 메뉴 열기
  const testMenuButton = Array.from(document.querySelectorAll('aside button')).find(btn => 
    btn.textContent.includes('시험 관리')
  );
  if (testMenuButton) {
    toggleSubmenu(testMenuButton);
  }
});
</script>
`;

// </body> 태그 직전에 스크립트 추가
scanExecuteHtml = scanExecuteHtml.replace('</body>', sidebarScript + '</body>');

// 파일 저장
fs.writeFileSync('5-3_test-scan-execute.html', scanExecuteHtml);
console.log('✓ 5-3_test-scan-execute.html 스타일 수정 완료');