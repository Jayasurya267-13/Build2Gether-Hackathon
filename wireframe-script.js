/* ============================================
   Emergency Shelter Management System
   Wireframe Navigation Script
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initializeNavigation();
    initializeInteractivity();
});

// ============================================
// NAVIGATION SYSTEM
// ============================================

function initializeNavigation() {
    // Get all navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const screenId = this.getAttribute('data-screen');
            if (screenId) {
                navigateToScreen(screenId);
                
                // Update active nav button
                navButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
}

function navigateToScreen(screenId) {
    // Hide all screens
    const allScreens = document.querySelectorAll('.screen');
    allScreens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        
        // Scroll to top of phone content
        const phoneContent = targetScreen.querySelector('.phone-content');
        if (phoneContent) {
            phoneContent.scrollTop = 0;
        }
    }
}

// ============================================
// INTERACTIVE ELEMENTS
// ============================================

function initializeInteractivity() {
    // Back buttons
    document.querySelectorAll('.back-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            navigateToPreviousScreen();
        });
    });
    
    // Login form
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        const submitBtn = loginForm.querySelector('.btn-primary');
        submitBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('Login successful! Please select a role or navigate using the sidebar.');
        });
    }
    
    // Role buttons
    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const roleText = this.textContent;
            if (roleText.includes('Field Responder')) {
                navigateToScreen('responder-dashboard');
            } else if (roleText.includes('Shelter Admin')) {
                navigateToScreen('admin-dashboard');
            } else if (roleText.includes('Command Officer')) {
                navigateToScreen('command-dashboard');
            }
            updateActiveNavButton(this.textContent);
        });
    });
    
    // Nearby Shelters buttons
    document.querySelectorAll('.shelter-card').forEach(card => {
        const allocateBtn = card.querySelector('.btn-secondary, .btn-primary');
        if (allocateBtn && allocateBtn.textContent.includes('Allocate')) {
            allocateBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const shelterName = card.querySelector('h3').textContent;
                navigateToScreen('responder-allocate');
                // Store shelter name for context
                const shelterBox = document.querySelector('.shelter-info-box h4');
                if (shelterBox) {
                    shelterBox.textContent = shelterName;
                }
            });
        }
    });
    
    // Allocate Evacuee form
    const allocateForm = document.querySelector('.form-section + .form-section + .form-section');
    if (allocateForm) {
        const confirmBtn = allocateForm.querySelector('.btn-primary');
        if (confirmBtn) {
            confirmBtn.addEventListener('click', function(e) {
                e.preventDefault();
                const name = document.querySelector('.form-section .input-field').value || 'Evacuee';
                showAlert(`✓ Allocation successful!\n${name} has been assigned to a shelter.`);
                // Reset form
                resetForm(allocateForm);
            });
        }
    }
    
    // Admin Check-in form
    const checkinConfirm = document.querySelector('.form-section:nth-last-of-type(3) .btn-primary');
    if (checkinConfirm) {
        checkinConfirm.addEventListener('click', function(e) {
            e.preventDefault();
            const name = document.querySelector('#admin-checkin .input-field').value || 'Person';
            showAlert(`✓ Check-in successful!\n${name} has been registered.`);
        });
    }
    
    // Action buttons
    document.querySelectorAll('.action-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent.trim();
            if (action.includes('Check-In')) {
                navigateToScreen('admin-checkin');
            } else if (action.includes('Reports')) {
                navigateToScreen('command-analytics');
            } else if (action.includes('Facilities')) {
                navigateToScreen('admin-facilities');
            }
        });
    });
    
    // Filter tabs
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            showAlert(`Filtering by: ${this.textContent}`);
        });
    });
    
    // Facility toggles
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const facilityName = this.closest('.facility-card').querySelector('.facility-title').textContent;
            if (this.checked) {
                showAlert(`✓ ${facilityName} is now Active`);
            } else {
                showAlert(`⊘ ${facilityName} is now Inactive`);
            }
        });
    });
    
    // Alert actions
    document.querySelectorAll('.alert-action').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const alertTitle = this.closest('.alert-card').querySelector('h4').textContent;
            showAlert(`Action initiated for:\n${alertTitle}`);
        });
    });
    
    // Recommendation apply buttons
    document.querySelectorAll('.recommendation-action .btn-primary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const evacuees = this.parentElement.querySelector('.action-stat strong').textContent;
            showAlert(`✓ Redistribution applied!\n${evacuees} evacuees scheduled for transfer`);
        });
    });
    
    // Download report button
    const downloadBtn = document.querySelector('.analytics-card:last-of-type .btn-secondary');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAlert('📥 Report downloading...\nFile: Shelter_Analytics_Report.pdf');
        });
    }
    
    // Quick stat buttons
    document.querySelectorAll('.quick-stats .btn-primary, .quick-view .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.textContent.includes('Nearby')) {
                navigateToScreen('responder-nearby');
            } else if (this.textContent.includes('Map')) {
                navigateToScreen('command-dashboard');
            } else if (this.textContent.includes('Shelters')) {
                navigateToScreen('command-alerts');
            }
        });
    });
    
    // Offline mode buttons
    document.querySelectorAll('#responder-offline .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const action = this.textContent;
            if (action.includes('Map')) {
                showAlert('📍 Offline map loaded\nLast synced: Today 2:30 PM');
            } else if (action.includes('Queue')) {
                showAlert('📝 3 pending allocations\nWaiting for sync...');
            } else if (action.includes('SMS')) {
                showAlert('📱 SMS Compose Ready\nConfigure message and recipient');
            }
        });
    });
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function navigateToPreviousScreen() {
    // Simple back navigation - would need stack implementation for real app
    const currentScreen = document.querySelector('.screen.active');
    const screenId = currentScreen.id;
    
    // Define back navigation paths
    const backPaths = {
        'responder-nearby': 'responder-dashboard',
        'responder-allocate': 'responder-nearby',
        'responder-offline': 'responder-dashboard',
        'admin-checkin': 'admin-dashboard',
        'admin-occupancy': 'admin-dashboard',
        'admin-facilities': 'admin-dashboard',
        'command-alerts': 'command-dashboard',
        'command-analytics': 'command-dashboard',
        'command-redistribution': 'command-dashboard'
    };
    
    if (backPaths[screenId]) {
        navigateToScreen(backPaths[screenId]);
        updateActiveNavButton(backPaths[screenId]);
    }
}

function updateActiveNavButton(screenIdOrText) {
    const navButtons = document.querySelectorAll('.nav-btn');
    let targetButton = null;
    
    // Try to find by data-screen attribute
    targetButton = document.querySelector(`[data-screen="${screenIdOrText}"]`);
    
    // Or find by partial text match
    if (!targetButton) {
        navButtons.forEach(btn => {
            if (btn.getAttribute('data-screen') === screenIdOrText || 
                btn.textContent.toLowerCase().includes(screenIdOrText.toLowerCase())) {
                targetButton = btn;
            }
        });
    }
    
    if (targetButton) {
        navButtons.forEach(btn => btn.classList.remove('active'));
        targetButton.classList.add('active');
    }
}

function resetForm(formElement) {
    const inputs = formElement.querySelectorAll('.input-field');
    const checkboxes = formElement.querySelectorAll('input[type="checkbox"]');
    
    inputs.forEach(input => input.value = '');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}

function showAlert(message) {
    // Create alert modal
    const alert = document.createElement('div');
    alert.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 24px;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        max-width: 300px;
        z-index: 10000;
        text-align: center;
        font-size: 14px;
        line-height: 1.6;
        color: #212121;
    `;
    
    alert.innerHTML = `
        <p style="margin: 0; white-space: pre-line;">${message}</p>
        <button style="
            margin-top: 16px;
            padding: 10px 24px;
            background: #1976D2;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 12px;
        ">OK</button>
    `;
    
    document.body.appendChild(alert);
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 9999;
    `;
    document.body.appendChild(overlay);
    
    // Close alert
    const closeAlert = () => {
        alert.remove();
        overlay.remove();
    };
    
    alert.querySelector('button').addEventListener('click', closeAlert);
    overlay.addEventListener('click', closeAlert);
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // ESC to go back
    if (e.key === 'Escape') {
        navigateToPreviousScreen();
    }
    
    // Number keys for quick navigation (1-9 for first nav items)
    if (e.key >= '1' && e.key <= '9') {
        const navButtons = document.querySelectorAll('.nav-btn');
        const index = parseInt(e.key) - 1;
        if (index < navButtons.length) {
            navButtons[index].click();
        }
    }
});

// ============================================
// THEME SUPPORT
// ============================================

// Detect system theme preference
function initializeTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Update app based on system preference
    if (prefersDark) {
        document.documentElement.style.colorScheme = 'dark';
    } else {
        document.documentElement.style.colorScheme = 'light';
    }
}

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', initializeTheme);

// Initialize theme on load
initializeTheme();

// ============================================
// ANALYTICS SIMULATION
// ============================================

// Simulate real-time updates on occupancy
function simulateOccupancyUpdates() {
    const capacityBars = document.querySelectorAll('.capacity-bar .capacity-fill');
    setInterval(() => {
        capacityBars.forEach(bar => {
            const currentWidth = parseFloat(bar.style.width);
            const newWidth = Math.max(0, Math.min(100, currentWidth + (Math.random() - 0.5) * 5));
            bar.style.width = newWidth + '%';
        });
    }, 5000);
}

// Start simulations after a delay
setTimeout(simulateOccupancyUpdates, 2000);

// ============================================
// ACCESSIBILITY
// ============================================

// Add ARIA labels for screen readers
function addAccessibilityFeatures() {
    document.querySelectorAll('.screen').forEach((screen, index) => {
        screen.setAttribute('role', 'main');
        screen.setAttribute('aria-label', `Screen ${index + 1}`);
    });
    
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
}

addAccessibilityFeatures();

// ============================================
// RESPONSIVE SIDEBAR TOGGLE
// ============================================

function setupResponsiveSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const container = document.querySelector('.wireframe-container');
    
    // Check window size
    const updateLayout = () => {
        if (window.innerWidth <= 1400) {
            sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'flex';
        }
    };
    
    window.addEventListener('resize', updateLayout);
    updateLayout();
}

setupResponsiveSidebar();
