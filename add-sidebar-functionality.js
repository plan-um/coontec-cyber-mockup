const fs = require('fs');
const path = require('path');

// 사이드메뉴 JavaScript 코드
const sidebarScript = `
<script>
document.addEventListener('DOMContentLoaded', function() {
  // 모든 사이드메뉴 토글 버튼 찾기
  const toggleButtons = document.querySelectorAll('aside button');
  
  toggleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 버튼 내의 chevron 아이콘 찾기
      const chevron = button.querySelector('.lucide-chevron-down');
      
      // 버튼의 다음 형제 요소 (서브메뉴) 찾기
      const submenu = button.parentElement.nextElementSibling;
      
      if (submenu && submenu.tagName === 'DIV') {
        // 서브메뉴 토글
        if (submenu.style.display === 'none' || !submenu.style.display) {
          submenu.style.display = 'block';
          if (chevron) {
            chevron.style.transform = 'rotate(180deg)';
          }
        } else {
          submenu.style.display = 'none';
          if (chevron) {
            chevron.style.transform = 'rotate(0deg)';
          }
        }
      }
    });
  });
  
  // 시험 관리 메뉴는 기본적으로 열어놓기
  const testManagementButton = Array.from(toggleButtons).find(btn => 
    btn.textContent.includes('시험 관리')
  );
  
  if (testManagementButton) {
    const submenu = testManagementButton.parentElement.nextElementSibling;
    if (submenu) {
      submenu.style.display = 'block';
      const chevron = testManagementButton.querySelector('.lucide-chevron-down');
      if (chevron) {
        chevron.style.transform = 'rotate(180deg)';
      }
    }
  }
});
</script>
`;

// 모든 HTML 파일 가져오기
const htmlFiles = fs.readdirSync('.')
  .filter(f => f.endsWith('.html'))
  .filter(f => !f.includes('index') && !f.includes('sidebar-') && !f.includes('test-'))
  .sort();

console.log('🔧 사이드메뉴 기능 추가 중...\n');

let updatedCount = 0;

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  // 이미 스크립트가 있는지 확인
  if (!content.includes('document.addEventListener(\'DOMContentLoaded\'')) {
    // </body> 태그 직전에 스크립트 추가
    content = content.replace('</body>', sidebarScript + '\n</body>');
    
    // 초기 상태로 서브메뉴들을 숨김 처리 (시험 관리 제외)
    // rotate-180 클래스를 제거하여 초기 상태를 닫힌 상태로 설정
    content = content.replace(/rotate-180/g, '');
    
    fs.writeFileSync(file, content);
    console.log(`✅ ${file} 업데이트 완료`);
    updatedCount++;
  }
});

console.log(`\n✨ 총 ${updatedCount}개 파일에 사이드메뉴 기능 추가 완료!`);