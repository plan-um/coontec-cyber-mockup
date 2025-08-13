const puppeteer = require('puppeteer');
const fs = require('fs');

async function extractSidebar() {
  const browser = await puppeteer.launch({ 
    headless: false, // 브라우저를 열어서 확인
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    
    console.log('대시보드 페이지 로딩...');
    await page.goto('http://localhost:3000/dashboard', { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    // 페이지가 완전히 로드될 때까지 대기
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // 시험 관리 메뉴 클릭해서 서브메뉴 펼치기
    await page.evaluate(() => {
      const buttons = document.querySelectorAll('aside button');
      buttons.forEach(button => {
        if (button.textContent.includes('시험 관리')) {
          button.click();
        }
      });
    });
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 사이드바의 실제 렌더링된 HTML과 스타일 추출
    const sidebarData = await page.evaluate(() => {
      const sidebar = document.querySelector('aside');
      if (!sidebar) return null;
      
      // 모든 computed styles 가져오기
      const getComputedStyles = (element) => {
        const styles = window.getComputedStyle(element);
        let cssText = '';
        for (let i = 0; i < styles.length; i++) {
          const prop = styles[i];
          const value = styles.getPropertyValue(prop);
          if (value && value !== 'initial' && value !== 'inherit') {
            cssText += `${prop}: ${value}; `;
          }
        }
        return cssText;
      };
      
      // 사이드바와 모든 자식 요소들의 스타일 수집
      const collectStyles = (element, selector) => {
        const styles = getComputedStyles(element);
        let result = `${selector} { ${styles} }\n`;
        
        const children = element.querySelectorAll('*');
        children.forEach((child, index) => {
          const childSelector = `${selector} > *:nth-child(${index + 1})`;
          result += `${childSelector} { ${getComputedStyles(child)} }\n`;
        });
        
        return result;
      };
      
      // 실제 사용되는 스타일시트 룰 수집
      const styleRules = [];
      for (const sheet of document.styleSheets) {
        try {
          const rules = sheet.cssRules || sheet.rules;
          for (const rule of rules) {
            if (rule.cssText && (
              rule.cssText.includes('aside') || 
              rule.cssText.includes('menu') || 
              rule.cssText.includes('hover') ||
              rule.cssText.includes('chevron') ||
              rule.cssText.includes('expanded')
            )) {
              styleRules.push(rule.cssText);
            }
          }
        } catch (e) {}
      }
      
      return {
        html: sidebar.outerHTML,
        styles: styleRules.join('\n'),
        expandedMenus: Array.from(sidebar.querySelectorAll('[style*="rotate(180deg)"]')).map(el => 
          el.closest('button')?.textContent?.trim()
        )
      };
    });
    
    if (sidebarData) {
      // 사이드바 HTML 저장
      fs.writeFileSync('sidebar-original.html', sidebarData.html);
      console.log('✓ sidebar-original.html 저장 완료');
      
      // 사이드바 스타일 저장
      fs.writeFileSync('sidebar-styles.css', sidebarData.styles);
      console.log('✓ sidebar-styles.css 저장 완료');
      
      console.log('\n펼쳐진 메뉴:', sidebarData.expandedMenus);
    }
    
    // 10초 대기 (브라우저에서 확인)
    console.log('\n브라우저에서 확인 중... (10초 후 종료)');
    await new Promise(resolve => setTimeout(resolve, 10000));
    
  } catch (error) {
    console.error('오류:', error);
  } finally {
    await browser.close();
  }
}

extractSidebar();