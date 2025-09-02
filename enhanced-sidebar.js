// Enhanced sidebar with project quick access and expanded hierarchy
const menuStructure = [
  {
    id: 'dashboard',
    name: '대시보드',
    icon: 'layout-dashboard',
    href: '2-1_메인대시보드(관리자).html'
  },
  {
    id: 'notice',
    name: '공지사항',
    icon: 'megaphone',
    href: '3-1_공지사항.html'
  },
  {
    id: 'projects',
    name: '프로젝트 관리',
    icon: 'folder-open',
    href: '4-1_통합프로젝트.html'
  },
  {
    id: 'tests',
    name: '시험 관리',
    icon: 'file-search',
    submenu: [
      { name: '스캔시험', href: '5-1_스캔시험.html' },
      { name: '부하시험', href: '6-1_부하시험.html' }
    ]
  },
  {
    id: 'licenses',
    name: '라이선스',
    icon: 'credit-card',
    submenu: [
      { name: '발급관리', href: '7-1_발급관리.html' },
      { name: '라이선스 발급', href: '7-2_라이선스발급.html' }
    ]
  },
  {
    id: 'data',
    name: '데이터 관리',
    icon: 'database',
    submenu: [
      { name: '시험데이터', href: '8-1_시험데이터.html' },
      { name: '백업/복구', href: '8-5_백업복구.html' }
    ]
  },
  {
    id: 'reports',
    name: '보고서',
    icon: 'file-text',
    submenu: [
      { name: '보고서 생성', href: '9-1_보고서생성.html' },
      { name: '사설보고서', href: '9-10_사설보고서.html' }
    ]
  },
  {
    id: 'users',
    name: '사용자 관리',
    icon: 'users',
    submenu: [
      { name: '사용자 관리', href: '10-1_사용자관리.html' },
      { name: '권한관리', href: '10-4_권한관리.html' }
    ]
  },
  {
    id: 'settings',
    name: '시스템 설정',
    icon: 'settings',
    href: '11-1_시스템설정.html'
  },
  {
    id: 'logs',
    name: '감사/로그',
    icon: 'shield',
    submenu: [
      { name: '감사로그', href: '12-1_감사로그.html' },
      { name: '운영로그', href: '12-7_운영로그.html' }
    ]
  },
  {
    id: 'notifications',
    name: '알림',
    icon: 'bell',
    href: '13-1_알림.html'
  },
  {
    id: 'help',
    name: '도움말',
    icon: 'help-circle',
    submenu: [
      { name: '사용자 가이드', href: '14-1_사용자가이드.html' },
      { name: 'FAQ', href: '14-4_FAQ.html' }
    ]
  }
];

// Project data with ships, zones, and test results
const projectData = [
  {
    id: 'hanla',
    name: '한라호',
    status: 'active',
    ships: [
      {
        id: 'hanla-main',
        name: '한라호',
        imo: '9876543',
        zones: [
          {
            id: 'bridge',
            name: '브릿지 네트워크',
            scanResult: 'completed',
            loadResult: 'in_progress',
            lastTest: '2024-08-18'
          },
          {
            id: 'engine',
            name: '엔진제어 시스템',
            scanResult: 'completed',
            loadResult: 'pending',
            lastTest: '2024-08-17'
          },
          {
            id: 'cargo',
            name: '화물관리 시스템',
            scanResult: 'in_progress',
            loadResult: 'pending',
            lastTest: '2024-08-19'
          }
        ]
      }
    ]
  },
  {
    id: 'baekdu',
    name: '백두산호',
    status: 'active',
    ships: [
      {
        id: 'baekdu-main',
        name: '백두산호',
        imo: '9876544',
        zones: [
          {
            id: 'navigation',
            name: '항해 시스템',
            scanResult: 'completed',
            loadResult: 'completed',
            lastTest: '2024-08-16'
          },
          {
            id: 'communication',
            name: '통신 시스템',
            scanResult: 'in_progress',
            loadResult: 'pending',
            lastTest: '2024-08-19'
          }
        ]
      }
    ]
  },
  {
    id: 'dokdo',
    name: '독도호',
    status: 'completed',
    ships: [
      {
        id: 'dokdo-main',
        name: '독도호',
        imo: '9876545',
        zones: [
          {
            id: 'bridge',
            name: '브릿지 네트워크',
            scanResult: 'completed',
            loadResult: 'completed',
            lastTest: '2024-08-15'
          },
          {
            id: 'safety',
            name: '안전 시스템',
            scanResult: 'completed',
            loadResult: 'completed',
            lastTest: '2024-08-14'
          }
        ]
      }
    ]
  }
];

// Icon SVG mappings
const iconSVGs = {
  'layout-dashboard': '<rect width="7" height="9" x="3" y="3" rx="1"></rect><rect width="7" height="5" x="14" y="3" rx="1"></rect><rect width="7" height="9" x="14" y="12" rx="1"></rect><rect width="7" height="5" x="3" y="16" rx="1"></rect>',
  'megaphone': '<path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8c.8-1.4 1.4-3.1 1.4-4.8"></path>',
  'folder-open': '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"></path>',
  'file-search': '<path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"></path><path d="m9 18-1.5-1.5"></path><circle cx="5" cy="14" r="3"></circle>',
  'credit-card': '<rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line>',
  'database': '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path>',
  'file-text': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"></path><path d="M14 2v4a2 2 0 0 0 2 2h4"></path><path d="M10 9H8"></path><path d="M16 13H8"></path><path d="M16 17H8"></path>',
  'users': '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><circle cx="21" cy="11" r="4"></circle>',
  'settings': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle>',
  'shield': '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>',
  'bell': '<path d="M10.268 21a2 2 0 0 0 3.464 0"></path><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"></path>',
  'help-circle': '<circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><path d="M12 17h.01"></path>',
  'chevron-down': '<path d="m6 9 6 6 6-6"></path>',
  'chevron-right': '<path d="m9 18 6-6-6-6"></path>',
  'search': '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.35-4.35"></path>',
  'ship': '<path d="M12 10.189V14"></path><path d="M12 2v3"></path><path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"></path><path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76"></path><path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"></path>',
  'network': '<circle cx="12" cy="12" r="3"></circle><path d="M12 1v6m0 6v6"></path><path d="m21 12-6-6-6 6-6-6"></path>',
  'activity': '<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"></path>',
  'check-circle': '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><path d="m9 11 3 3L22 4"></path>',
  'clock': '<circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline>',
  'alert-circle': '<circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line>'
};

// Status icon and color mappings
const statusConfig = {
  completed: { icon: 'check-circle', color: 'text-green-600', bg: 'bg-green-100' },
  in_progress: { icon: 'activity', color: 'text-blue-600', bg: 'bg-blue-100' },
  pending: { icon: 'clock', color: 'text-gray-400', bg: 'bg-gray-100' },
  error: { icon: 'alert-circle', color: 'text-red-600', bg: 'bg-red-100' }
};

// Generate project quick access section
function generateProjectQuickAccess() {
  const recentProjects = projectData.filter(p => p.status === 'active').slice(0, 3);
  
  return `
    <div class="px-2 py-4 border-b border-gray-200">
      <div class="px-3 mb-3">
        <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wider">프로젝트 바로가기</h3>
      </div>
      
      <!-- Search -->
      <div class="px-3 mb-3">
        <div class="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-search absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400">
            ${iconSVGs.search}
          </svg>
          <input 
            type="text" 
            placeholder="프로젝트, 선박 검색..." 
            class="w-full pl-7 pr-2 py-1 text-xs border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
            id="project-search"
          >
        </div>
      </div>
      
      <!-- Recent Projects -->
      <div class="space-y-3" id="recent-projects">
        ${recentProjects.map(project => `
          <div class="project-item mx-3">
            <button class="w-full text-left p-2 rounded-md hover:bg-gray-100 border border-gray-200" data-project="${project.id}">
              <div class="flex items-center justify-between mb-1">
                <div class="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ship h-3 w-3 text-blue-600">
                    ${iconSVGs.ship}
                  </svg>
                  <span class="text-xs font-medium text-gray-900">${project.name}</span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron h-3 w-3 text-gray-400 transition-transform project-chevron">
                  ${iconSVGs['chevron-right']}
                </svg>
              </div>
              
              <!-- Ships -->
              <div class="project-ships ml-5 space-y-1" style="display: none;">
                ${project.ships.map(ship => `
                  <div class="ship-item">
                    <div class="flex items-center justify-between text-xs text-gray-600 mb-1">
                      <span>${ship.name} (${ship.imo})</span>
                    </div>
                    
                    <!-- Zones -->
                    <div class="ml-3 space-y-1">
                      ${ship.zones.map(zone => {
                        const scanStatus = statusConfig[zone.scanResult];
                        const loadStatus = statusConfig[zone.loadResult];
                        return `
                          <div class="zone-item p-1 rounded border border-gray-100 bg-gray-50">
                            <div class="text-xs font-medium text-gray-700 mb-1">${zone.name}</div>
                            <div class="flex items-center justify-between gap-2 text-xs">
                              <div class="flex items-center gap-1 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 ${scanStatus.color}">
                                  ${iconSVGs[scanStatus.icon]}
                                </svg>
                                <span class="${scanStatus.color}">스캔 ${zone.scanResult === 'completed' ? '완료' : zone.scanResult === 'in_progress' ? '진행중' : '대기'}</span>
                              </div>
                              <div class="flex items-center gap-1 whitespace-nowrap">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-3 w-3 ${loadStatus.color}">
                                  ${iconSVGs[loadStatus.icon]}
                                </svg>
                                <span class="${loadStatus.color}">부하 ${zone.loadResult === 'completed' ? '완료' : zone.loadResult === 'in_progress' ? '진행중' : '대기'}</span>
                              </div>
                            </div>
                          </div>
                        `;
                      }).join('')}
                    </div>
                  </div>
                `).join('')}
              </div>
            </button>
          </div>
        `).join('')}
      </div>
      
      <div class="px-3 mt-3">
        <a href="4-1_통합프로젝트.html" class="text-xs text-blue-600 hover:text-blue-700 font-medium">전체 프로젝트 보기 →</a>
      </div>
    </div>
  `;
}

// Generate regular sidebar menu
function generateRegularMenu(currentPage = '') {
  let html = '<nav class="flex-1 space-y-1 px-2 py-4">';
  
  menuStructure.forEach(menu => {
    const isActive = currentPage === menu.href || (menu.submenu && menu.submenu.some(sub => sub.href === currentPage));
    
    if (menu.submenu) {
      html += `
        <div class="menu-group">
          <button class="w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-primary-600' : 'text-gray-700'}" data-menu="${menu.id}">
            <div class="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${menu.icon} h-4 w-4">
                ${iconSVGs[menu.icon]}
              </svg>
              <span>${menu.name}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron h-4 w-4 transition-transform">
              ${iconSVGs['chevron-down']}
            </svg>
          </button>
          <div class="submenu ml-7 mt-1 space-y-1" style="display: ${isActive ? 'block' : 'none'};">
            ${menu.submenu.map(sub => `
              <a href="${sub.href}" class="block px-3 py-2 text-sm ${currentPage === sub.href ? 'text-primary-600 font-medium' : 'text-gray-600'} hover:text-primary-600 hover:bg-gray-50 rounded-md">
                ${sub.name}
              </a>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      html += `
        <a class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-100 ${isActive ? 'bg-gray-100 text-primary-600' : 'text-gray-700'}" href="${menu.href}">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${menu.icon} h-4 w-4">
            ${iconSVGs[menu.icon]}
          </svg>
          <span>${menu.name}</span>
        </a>
      `;
    }
  });
  
  html += '</nav>';
  return html;
}

// Generate complete enhanced sidebar
function generateEnhancedSidebar(currentPage = '') {
  return `
    ${generateProjectQuickAccess()}
    ${generateRegularMenu(currentPage)}
    <div class="border-t p-4">
      <a class="flex items-center gap-2 text-sm text-gray-600 hover:text-primary-600" href="3-1_공지사항.html">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text h-4 w-4">
          ${iconSVGs['file-text']}
        </svg>
        <span>공지사항</span>
      </a>
    </div>
  `;
}

// Initialize enhanced sidebar
function initializeEnhancedSidebar() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const sidebar = document.querySelector('aside');
  
  if (sidebar) {
    sidebar.innerHTML = generateEnhancedSidebar(currentPage);
    setupEnhancedSidebarEvents();
    openCurrentMenu(currentPage);
  }
}

// Setup enhanced sidebar events
function setupEnhancedSidebarEvents() {
  // Regular menu events
  const menuButtons = document.querySelectorAll('.menu-group > button');
  menuButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const menuGroup = this.parentElement;
      const submenu = menuGroup.querySelector('.submenu');
      const chevron = this.querySelector('.lucide-chevron');
      
      if (submenu) {
        const isOpen = submenu.style.display !== 'none';
        
        // Close other menus
        document.querySelectorAll('.submenu').forEach(otherSubmenu => {
          if (otherSubmenu !== submenu) {
            otherSubmenu.style.display = 'none';
            const otherChevron = otherSubmenu.parentElement.querySelector('.lucide-chevron');
            if (otherChevron) {
              otherChevron.style.transform = 'rotate(0deg)';
            }
          }
        });
        
        // Toggle current menu
        if (isOpen) {
          submenu.style.display = 'none';
          chevron.style.transform = 'rotate(0deg)';
        } else {
          submenu.style.display = 'block';
          chevron.style.transform = 'rotate(180deg)';
        }
      }
    });
  });

  // Project quick access events
  const projectButtons = document.querySelectorAll('.project-item button');
  projectButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      const shipsContainer = this.querySelector('.project-ships');
      const chevron = this.querySelector('.project-chevron');
      
      if (shipsContainer) {
        const isOpen = shipsContainer.style.display !== 'none';
        
        // Close other project expansions
        document.querySelectorAll('.project-ships').forEach(otherShips => {
          if (otherShips !== shipsContainer) {
            otherShips.style.display = 'none';
            const otherChevron = otherShips.parentElement.querySelector('.project-chevron');
            if (otherChevron) {
              otherChevron.style.transform = 'rotate(0deg)';
            }
          }
        });
        
        // Toggle current project
        if (isOpen) {
          shipsContainer.style.display = 'none';
          chevron.style.transform = 'rotate(0deg)';
        } else {
          shipsContainer.style.display = 'block';
          chevron.style.transform = 'rotate(90deg)';
        }
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById('project-search');
  if (searchInput) {
    searchInput.addEventListener('input', function(e) {
      const searchTerm = e.target.value.toLowerCase();
      const projectItems = document.querySelectorAll('.project-item');
      
      projectItems.forEach(item => {
        const projectName = item.querySelector('span').textContent.toLowerCase();
        const shipNames = Array.from(item.querySelectorAll('.ship-item')).map(ship => 
          ship.textContent.toLowerCase()
        ).join(' ');
        
        if (projectName.includes(searchTerm) || shipNames.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  }
}

// Open current menu based on page
function openCurrentMenu(currentPage) {
  menuStructure.forEach(menu => {
    if (menu.submenu) {
      const hasCurrentPage = menu.submenu.some(sub => sub.href === currentPage);
      if (hasCurrentPage) {
        const button = document.querySelector(`button[data-menu="${menu.id}"]`);
        if (button) {
          const submenu = button.parentElement.querySelector('.submenu');
          const chevron = button.querySelector('.lucide-chevron');
          if (submenu) {
            submenu.style.display = 'block';
            if (chevron) {
              chevron.style.transform = 'rotate(180deg)';
            }
          }
        }
      }
    }
  });
}

// DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeEnhancedSidebar);
} else {
  initializeEnhancedSidebar();
}