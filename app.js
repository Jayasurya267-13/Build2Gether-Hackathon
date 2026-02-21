/* ========================================
   AI-Driven Emergency Shelter Management
   Dashboard Interactivity & Data Simulation
   ======================================== */

// ========= DATETIME =========
function updateDateTime() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-IN', { 
        day: '2-digit', month: 'short', year: 'numeric' 
    });
    const timeStr = now.toLocaleTimeString('en-IN', { 
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false 
    });
    const el = document.getElementById('datetime');
    if (el) el.innerHTML = `${dateStr}<br>${timeStr} IST`;
}
updateDateTime();
setInterval(updateDateTime, 1000);

// ========= ALERT BANNER =========
function dismissAlert() {
    document.getElementById('alertBanner').classList.add('dismissed');
}

// ========= SHELTER DATA =========
const shelters = [
    { name: "Govt. High School", type: "School Building", capacity: 400, current: 312, status: "normal" },
    { name: "Community Hall A", type: "Community Center", capacity: 250, current: 155, status: "normal" },
    { name: "Sports Complex", type: "Indoor Stadium", capacity: 600, current: 534, status: "critical" },
    { name: "Temple Grounds", type: "Religious Facility", capacity: 300, current: 135, status: "normal" },
    { name: "Municipal School", type: "School Building", capacity: 350, current: 249, status: "normal" },
    { name: "Relief Camp B", type: "Temporary Shelter", capacity: 200, current: 182, status: "critical" },
    { name: "Town Hall", type: "Government Building", capacity: 450, current: 297, status: "warning" },
    { name: "Anganwadi Center", type: "Community Center", capacity: 150, current: 78, status: "normal" }
];

function getOccupancyColor(pct) {
    if (pct >= 90) return '#dc2626';
    if (pct >= 75) return '#f59e0b';
    if (pct >= 50) return '#3b82f6';
    return '#10b981';
}

function drawOccupancyRing(canvas, pct) {
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const size = 72;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = size + 'px';
    canvas.style.height = size + 'px';
    ctx.scale(dpr, dpr);

    const cx = size / 2, cy = size / 2, r = 28;
    const lw = 5;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (2 * Math.PI * pct / 100);
    const color = getOccupancyColor(pct);

    // Background ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.1)';
    ctx.lineWidth = lw;
    ctx.stroke();

    // Progress ring
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Glow
    ctx.beginPath();
    ctx.arc(cx, cy, r, startAngle, endAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = lw + 4;
    ctx.globalAlpha = 0.15;
    ctx.stroke();
    ctx.globalAlpha = 1;
}

function renderShelters() {
    const grid = document.getElementById('shelterGrid');
    grid.innerHTML = '';

    shelters.forEach((s, i) => {
        const pct = Math.round((s.current / s.capacity) * 100);
        const card = document.createElement('div');
        card.className = `shelter-card ${s.status === 'critical' ? 'critical' : ''}`;
        card.innerHTML = `
            <div class="shelter-name">${s.name}</div>
            <div class="shelter-type">${s.type}</div>
            <div class="occupancy-ring">
                <canvas id="ring-${i}"></canvas>
                <div class="occupancy-text">
                    <span class="occupancy-pct" style="color:${getOccupancyColor(pct)}">${pct}%</span>
                    <span class="occupancy-label">CAPACITY</span>
                </div>
            </div>
            <div class="shelter-stats">
                <span><strong>${s.current}</strong> / ${s.capacity}</span>
                <span>${s.capacity - s.current} available</span>
            </div>
            <div class="shelter-status ${s.status}">
                ${s.status === 'critical' ? '⚠ NEAR CAPACITY' : s.status === 'warning' ? '◆ FILLING' : '✓ OPERATIONAL'}
            </div>
        `;
        grid.appendChild(card);

        // Draw ring after DOM insert
        requestAnimationFrame(() => {
            const canvas = document.getElementById(`ring-${i}`);
            if (canvas) drawOccupancyRing(canvas, pct);
        });
    });
}

renderShelters();

// ========= MAP CANVAS =========
function drawMap() {
    const canvas = document.getElementById('mapCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    const w = rect.width, h = rect.height;

    // Grid lines
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.06)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Flood zones (transparent colored regions)
    const zones = [
        { x: 0.1, y: 0.2, rx: 0.3, ry: 0.25, color: 'rgba(239, 68, 68, 0.12)' },
        { x: 0.5, y: 0.5, rx: 0.25, ry: 0.3, color: 'rgba(239, 68, 68, 0.08)' },
        { x: 0.7, y: 0.3, rx: 0.2, ry: 0.2, color: 'rgba(245, 158, 11, 0.1)' },
        { x: 0.3, y: 0.7, rx: 0.22, ry: 0.18, color: 'rgba(245, 158, 11, 0.08)' },
    ];

    zones.forEach(z => {
        ctx.beginPath();
        ctx.ellipse(z.x * w, z.y * h, z.rx * w, z.ry * h, 0, 0, 2 * Math.PI);
        ctx.fillStyle = z.color;
        ctx.fill();
    });

    // Simulated river
    ctx.beginPath();
    ctx.moveTo(0, h * 0.4);
    ctx.bezierCurveTo(w * 0.2, h * 0.35, w * 0.4, h * 0.55, w * 0.6, h * 0.45);
    ctx.bezierCurveTo(w * 0.8, h * 0.35, w * 0.9, h * 0.5, w, h * 0.48);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.25)';
    ctx.lineWidth = 6;
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(0, h * 0.4);
    ctx.bezierCurveTo(w * 0.2, h * 0.35, w * 0.4, h * 0.55, w * 0.6, h * 0.45);
    ctx.bezierCurveTo(w * 0.8, h * 0.35, w * 0.9, h * 0.5, w, h * 0.48);
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Road network
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
    ctx.lineWidth = 1;
    const roads = [
        [[0.1, 0.1], [0.9, 0.9]],
        [[0.5, 0.05], [0.5, 0.95]],
        [[0.05, 0.6], [0.95, 0.6]],
        [[0.2, 0.05], [0.8, 0.95]],
        [[0.8, 0.05], [0.2, 0.95]],
    ];
    roads.forEach(r => {
        ctx.beginPath();
        ctx.moveTo(r[0][0] * w, r[0][1] * h);
        ctx.lineTo(r[1][0] * w, r[1][1] * h);
        ctx.stroke();
    });

    // Cyclone path indicator
    ctx.setLineDash([8, 6]);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w * 0.9, h * 0.05);
    ctx.bezierCurveTo(w * 0.75, h * 0.2, w * 0.6, h * 0.35, w * 0.45, h * 0.55);
    ctx.stroke();
    ctx.setLineDash([]);

    // Cyclone eye
    ctx.beginPath();
    ctx.arc(w * 0.9, h * 0.05, 12, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.3)';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(w * 0.9, h * 0.05, 6, 0, 2 * Math.PI);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.fill();

    // District boundary
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.15)';
    ctx.lineWidth = 2;
    ctx.setLineDash([12, 8]);
    ctx.strokeRect(w * 0.08, h * 0.08, w * 0.84, h * 0.84);
    ctx.setLineDash([]);

    // Compass
    const cx = w - 40, cy = 40;
    ctx.fillStyle = 'rgba(148, 163, 184, 0.3)';
    ctx.font = '10px JetBrains Mono';
    ctx.textAlign = 'center';
    ctx.fillText('N', cx, cy - 16);
    ctx.beginPath();
    ctx.moveTo(cx, cy - 10);
    ctx.lineTo(cx - 4, cy + 4);
    ctx.lineTo(cx + 4, cy + 4);
    ctx.closePath();
    ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
    ctx.fill();
}

drawMap();
window.addEventListener('resize', drawMap);

// Map layer toggle
document.querySelectorAll('.map-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.map-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// ========= FORECAST CHART =========
function drawForecastChart() {
    const canvas = document.getElementById('forecastChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.parentElement.getBoundingClientRect();
    const chartW = rect.width - 32;
    const chartH = 180;
    canvas.width = chartW * dpr;
    canvas.height = chartH * dpr;
    canvas.style.width = chartW + 'px';
    canvas.style.height = chartH + 'px';
    ctx.scale(dpr, dpr);

    const padding = { top: 20, right: 20, bottom: 30, left: 40 };
    const plotW = chartW - padding.left - padding.right;
    const plotH = chartH - padding.top - padding.bottom;

    // Grid
    ctx.strokeStyle = 'rgba(148, 163, 184, 0.06)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding.top + (plotH / 5) * i;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(chartW - padding.right, y);
        ctx.stroke();

        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.font = '9px JetBrains Mono';
        ctx.textAlign = 'right';
        ctx.fillText(`${100 - i * 20}%`, padding.left - 6, y + 3);
    }

    // Time labels
    const hours = ['Now', '+1h', '+2h', '+3h', '+4h', '+5h', '+6h', '+8h', '+10h', '+12h'];
    hours.forEach((h, i) => {
        const x = padding.left + (plotW / (hours.length - 1)) * i;
        ctx.fillStyle = 'rgba(148, 163, 184, 0.4)';
        ctx.font = '9px JetBrains Mono';
        ctx.textAlign = 'center';
        ctx.fillText(h, x, chartH - 8);
    });

    // Threshold line at 90%
    const threshY = padding.top + plotH * 0.1;
    ctx.setLineDash([6, 4]);
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padding.left, threshY);
    ctx.lineTo(chartW - padding.right, threshY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(239, 68, 68, 0.7)';
    ctx.font = '9px JetBrains Mono';
    ctx.textAlign = 'left';
    ctx.fillText('90% THRESHOLD', chartW - padding.right - 95, threshY - 4);

    // Data lines
    const datasets = [
        { 
            data: [67, 70, 74, 78, 82, 85, 84, 80, 76, 72],
            color: '#3b82f6', label: 'Overall District'
        },
        { 
            data: [89, 91, 94, 96, 95, 93, 90, 87, 83, 79],
            color: '#ef4444', label: 'Sports Complex'
        },
        { 
            data: [52, 55, 58, 62, 65, 68, 71, 74, 72, 70],
            color: '#10b981', label: 'Govt. High School'
        }
    ];

    datasets.forEach(ds => {
        ctx.beginPath();
        ds.data.forEach((val, i) => {
            const x = padding.left + (plotW / (ds.data.length - 1)) * i;
            const y = padding.top + plotH * (1 - val / 100);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Area fill
        const lastI = ds.data.length - 1;
        const lastX = padding.left + (plotW / lastI) * lastI;
        ctx.lineTo(lastX, padding.top + plotH);
        ctx.lineTo(padding.left, padding.top + plotH);
        ctx.closePath();
        ctx.fillStyle = ds.color.replace(')', ', 0.05)').replace('rgb', 'rgba');
        ctx.fill();
    });

    // Legend
    const legendY = padding.top + 6;
    datasets.forEach((ds, i) => {
        const lx = padding.left + 10 + i * 130;
        ctx.fillStyle = ds.color;
        ctx.fillRect(lx, legendY - 4, 12, 3);
        ctx.fillStyle = 'rgba(148, 163, 184, 0.6)';
        ctx.font = '9px Inter';
        ctx.textAlign = 'left';
        ctx.fillText(ds.label, lx + 16, legendY);
    });
}

drawForecastChart();
window.addEventListener('resize', drawForecastChart);

// ========= LIVE DATA SIMULATION =========
function randomFluctuation(value, range) {
    return value + (Math.random() - 0.5) * range;
}

function animateValues() {
    // Fluctuate meteorological values
    const rainfall = document.getElementById('rainfall');
    const windSpeed = document.getElementById('windSpeed');
    const riverLevel = document.getElementById('riverLevel');
    const temperature = document.getElementById('temperature');

    if (rainfall) rainfall.textContent = Math.round(randomFluctuation(187, 8));
    if (windSpeed) windSpeed.textContent = Math.round(randomFluctuation(142, 6));
    if (riverLevel) riverLevel.textContent = randomFluctuation(8.4, 0.3).toFixed(1);
    if (temperature) temperature.textContent = Math.round(randomFluctuation(31, 1));

    // Fluctuate evacuee count
    const evacuees = document.getElementById('totalEvacuees');
    if (evacuees) {
        const val = parseInt(evacuees.textContent.replace(/,/g, ''));
        const newVal = val + Math.round(Math.random() * 15);
        evacuees.textContent = newVal.toLocaleString();
    }

    // Fluctuate AI optimizations
    const aiOpt = document.getElementById('aiOptimizations');
    if (aiOpt) {
        const val = parseInt(aiOpt.textContent);
        aiOpt.textContent = val + Math.round(Math.random() * 3);
    }

    // Fluctuate shelter occupancies slightly
    shelters.forEach((s, i) => {
        const change = Math.round((Math.random() - 0.4) * 4);
        s.current = Math.max(0, Math.min(s.capacity, s.current + change));
        const pct = Math.round((s.current / s.capacity) * 100);

        // Update status based on new occupancy
        if (pct >= 90) s.status = 'critical';
        else if (pct >= 75) s.status = 'warning';
        else s.status = 'normal';
    });

    // Re-render shelters
    renderShelters();

    // Update avg capacity
    const avgCap = document.getElementById('avgCapacity');
    if (avgCap) {
        const avg = Math.round(shelters.reduce((sum, s) => sum + (s.current / s.capacity) * 100, 0) / shelters.length);
        avgCap.textContent = avg + '%';
    }

    // SMS count
    const sms = document.getElementById('smsSent');
    if (sms) {
        const val = parseInt(sms.textContent.replace(/,/g, ''));
        sms.textContent = (val + Math.round(Math.random() * 5)).toLocaleString();
    }

    // Checkins
    const checks = document.getElementById('checkins');
    if (checks) {
        const val = parseInt(checks.textContent.replace(/,/g, ''));
        checks.textContent = (val + Math.round(Math.random() * 3)).toLocaleString();
    }
}

// Run live simulation every 3 seconds
setInterval(animateValues, 3000);

// ========= ENTRY ANIMATIONS =========
function animateOnScroll() {
    const elements = document.querySelectorAll('.panel, .kpi-card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

animateOnScroll();

// ========= SHELTER MARKER TOOLTIPS =========
document.querySelectorAll('.shelter-marker').forEach(marker => {
    marker.addEventListener('mouseenter', (e) => {
        const name = marker.dataset.name;
        const cap = marker.dataset.capacity;
        const tooltip = document.createElement('div');
        tooltip.className = 'marker-tooltip';
        tooltip.innerHTML = `<strong>${name}</strong><br>${cap}% occupied`;
        tooltip.style.cssText = `
            position: absolute;
            bottom: calc(100% + 8px);
            left: 50%;
            transform: translateX(-50%);
            background: rgba(15, 23, 42, 0.95);
            color: #f1f5f9;
            padding: 6px 10px;
            border-radius: 6px;
            font-size: 11px;
            white-space: nowrap;
            border: 1px solid rgba(59, 130, 246, 0.3);
            pointer-events: none;
            z-index: 20;
            box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        `;
        marker.appendChild(tooltip);
    });

    marker.addEventListener('mouseleave', () => {
        const tooltip = marker.querySelector('.marker-tooltip');
        if (tooltip) tooltip.remove();
    });
});

console.log('🏛️ AI-Driven Emergency Shelter Availability Management System — Dashboard Active');
