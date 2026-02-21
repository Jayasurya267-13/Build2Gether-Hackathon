# Emergency Shelter Management System - Android Wireframe Design Specification

## 📋 Table of Contents

1. [System Overview](#system-overview)
2. [Design Principles](#design-principles)
3. [Color Palette & Theming](#color-palette--theming)
4. [Typography](#typography)
5. [Component Library](#component-library)
6. [User Roles & Workflows](#user-roles--workflows)
7. [Screen Specifications](#screen-specifications)
8. [Navigation Architecture](#navigation-architecture)
9. [Offline-First Design](#offline-first-design)
10. [Accessibility Guidelines](#accessibility-guidelines)
11. [Performance Considerations](#performance-considerations)

---

## System Overview

### Application Purpose
The Emergency Shelter Availability Management System (ESAMS) is an Android mobile application designed to manage disaster response operations by coordinating evacuee allocation, shelter administration, and command center oversight across a disaster zone.

### Target Users
- **Field Responders**: First responders allocating evacuees to shelters
- **Shelter Administrators**: On-site staff managing shelter operations
- **District Command Officers**: Regional coordinators overseeing multiple shelters

### Key Statistics
- **Average Response Time Target**: < 5 minutes for evacuee allocation
- **Maximum Shelf Capacity**: Varies per shelter (300-500 beds typical)
- **Alert Response Window**: Critical alerts must reach decision-makers in < 2 minutes
- **Offline Duration Support**: 8+ hours without internet connection

---

## Design Principles

### 1. **Emergency Context Design**
- **Large Touch Targets**: Minimum 48dp for all interactive elements (accommodates trembling hands, stress)
- **High Contrast**: WCAG AA compliance for all text and buttons
- **Clear Visual Hierarchy**: Prioritizes information critical to decision-making
- **Minimal Cognitive Load**: Reduces options when under time pressure

### 2. **Disaster Response Optimization**
- **Offline-First Architecture**: All critical functions work without internet
- **Low-Bandwidth Mode**: Supports 2G connections for rural areas
- **SMS Fallback**: Critical communications via SMS when data unavailable
- **Redundancy**: Multiple ways to accomplish each task

### 3. **Usability Under Stress**
- **Large, Bright Buttons**: 56dp minimum for primary actions
- **Voice Feedback**: Haptic feedback on button press
- **Clear Error Messages**: Tells user exactly what went wrong and how to fix
- **Undo Capability**: Allocation changes can be reversed within 5 minutes

### 4. **Government Standards Compliance**
- **Accessibility**: WCAG 2.1 AAA compliance
- **Data Privacy**: AES-256 encryption for all personal data
- **Audit Trails**: Complete logging of all allocation decisions
- **Offline Data Verification**: QR code printing for records without internet

---

## Color Palette & Theming

### Primary Colors
```
Primary Blue:     #1976D2 (Material Design 500)
Primary Light:    #42A5F5 (Material Design 300)
Primary Dark:     #1565C0 (Material Design 700)
Accent Orange:    #FF6F00 (Emergency action indicator)
```

### Semantic Colors
```
Success Green:    #4CAF50  (✓ Allocation completed, safe capacity)
Warning Yellow:   #FF9800  (⚠ Caution zone 70-90% occupancy)
Danger Red:       #f44336  (🔴 Critical alerts, overflow >90%)
Info Blue:        #2196F3  (ℹ Informational messages)
```

### Neutral Colors
```
Background Light: #F5F5F5 (Light mode background)
Background Dark:  #121212 (Dark mode background)
Surface Light:    #FFFFFF (Light mode cards/panels)
Surface Dark:     #1E1E1E (Dark mode cards/panels)
Border:           #E0E0E0 (Light) / #424242 (Dark)
Text Primary:     #212121 (Light) / #F5F5F5 (Dark)
Text Secondary:   #757575 (Light) / #BDBDBD (Dark)
```

### Dark Mode Implementation
- Automatic detection based on system preference
- Reduces eye strain during night operations
- Better battery life on AMOLED phones
- Inverse contrast maintained

### Alert Color Coding
- **Green Bar (< 70%)**: Safe occupancy level
- **Yellow Bar (70-90%)**: Caution - monitor closely
- **Red Bar (> 90%)**: Critical - immediate action needed

---

## Typography

### Font Family
**Primary**: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif

### Type Scale
```
H1 Display:  28px, Weight 700 (Emergency alerts, critical info)
H2 Heading:  24px, Weight 700 (Dashboard titles)
H3 Subtitle: 18px, Weight 600 (Shelter names, card headers)
H4 Label:    14px, Weight 600 (Form labels, timestamps)
Body:        14px, Weight 400 (Main content)
Caption:     12px, Weight 400 (Helper text, metadata)
Overline:    11px, Weight 600 (Section headers, status labels)
```

### Line Height
- Headlines: 1.0
- Body: 1.6
- Lists: 1.4

### Letter Spacing
- Section headers: 0.3px (uppercase, more prominent)
- Body: normal (0px)
- Labels: 0.5px (uppercase button text)

---

## Component Library

### 1. **Buttons**

#### Primary Button (CTA)
```
Background:   #1976D2
Padding:      14px 20px
Border-Radius: 8px
Font Size:    14px, Weight 600
Text Transform: UPPERCASE
Letter Spacing: 0.5px
Min Width:    120px
Hover State:  Darker shade (#1565C0) + drop shadow
Disabled:     50% opacity
```

#### Secondary Button
```
Background:   Transparent / #F5F5F5
Border:       1px solid #E0E0E0
Padding:      14px 20px
Hover State:  Lighter background
```

#### Icon Button
```
Padding:    8px
Size:       20px-28px icons
No border
Hover:      Background color fade (10% opacity)
```

### 2. **Cards**

```
Background:    #FFFFFF (light) / #1E1E1E (dark)
Border-Radius: 8px
Padding:       12px-16px
Box-Shadow:    0 4px 6px rgba(0, 0, 0, 0.1)
Elevation:     2dp (Material Design)
```

### 3. **Input Fields**

```
Padding:      12px 14px
Border:       1px solid #E0E0E0
Border-Radius: 8px
Font Size:    14px
Focus State:  
  - Border color: #1976D2
  - Box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1)
Placeholder:  #757575
```

### 4. **Tabs**

```
Padding:      8px 12px
Font Size:    12px
Border-Radius: 0
Border-Bottom: 2px solid transparent
Active State: Border color #1976D2, text #1976D2
Hover State:  Text color #1976D2
```

### 5. **Badges**

```
Display:      Inline-block
Padding:      4px 8px
Border-Radius: 4px
Font Size:    11px
Font Weight:  600
Types:
  - Service badges  (🍽️, 🏥, ♿, etc.)
  - Status badges   (Active, At Capacity, Offline)
  - Warning badges  (⚠️ alerts)
```

### 6. **Capacity Bars**

```
Height:         12px (normal) / 18px (detailed) / 40px (large display)
Border-Radius:  6px
Background:     #E0E0E0
Colors:
  - 0-70%:    #4CAF50 (green)
  - 70-90%:   #FF9800 (orange)
  - 90%+:     #f44336 (red)
Animation:      Smooth width transition (0.3s)
```

### 7. **Dialog/Modal**

```
Background:     #FFFFFF (light) / #1E1E1E (dark)
Max-Width:      100% / 400px
Border-Radius:  12px
Padding:        24px
Box-Shadow:     0 10px 40px rgba(0, 0, 0, 0.3)
Overlay:        50% opacity black background
```

### 8. **Status Indicators**

```
Online:       🟢 Green dot + text "Online"
Offline:      🔴 Red dot + text "Offline"
At Capacity:  🔴 Red icon + "At Capacity"
Warning:      ⚠️  Orange icon + message
Success:      ✓ Green checkmark
Error:        ❌ Red X mark
```

---

## User Roles & Workflows

### 1. FIELD RESPONDER

#### Primary Responsibilities
- Locate evacuees in hazard zones
- Assess immediate needs
- Allocate evacuees to appropriate shelters
- Communicate via SMS if offline
- Track allocation in real-time

#### Key Screens
1. **Login & Role Selection** → Authenticates responder
2. **Live Hazard Map** → Shows disaster zone, shelters, hazard areas
3. **Nearby Shelters List** → Sorted by distance, shows capacity
4. **Allocate Evacuee Form** → Quick data entry for new arrivals
5. **Offline Mode Panel** → Queue management, SMS fallback

#### Typical Workflow
```
1. Login with ID/Badge
2. View live hazard map
3. Find nearby available shelters
4. Collect evacuee information (name, age, special needs)
5. Allocate to appropriate shelter
6. Get confirmation number
7. Proceed to next evacuation
```

#### Time-Critical Features
- Map loads in < 1 second
- Shelter list refreshes every 30 seconds
- Allocation submits in < 3 seconds
- Offline mode enables instant allocation

---

### 2. SHELTER ADMINISTRATOR

#### Primary Responsibilities
- Manage check-in/check-out of evacuees
- Monitor occupancy levels
- Maintain facility status (food, medical, sanitation)
- Update shelter availability
- Provide status reports to command center

#### Key Screens
1. **Administrator Dashboard** → Overview of shelter status
2. **Digital Check-In Form** → Register new arrivals
3. **Occupancy Status Panel** → Real-time occupancy chart
4. **Facility Management» → Toggle services on/off
5. **Occupancy Trends** → Forecast based on arrival patterns

#### Typical Workflow
```
1. Morning: Review occupancy and facility status
2. Check-in new arrivals (name, family size, needs)
3. Assign room/building based on vulnerability
4. Update food/medical capacity
5. Report hourly to command center
6. During overflow: Coordinate with command for redistribution
```

#### Critical Metrics
- Occupancy as % of capacity
- Occupancy trend (increasing/stable/decreasing)
- Expected time to capacity (ETA)
- Critical shortage alerts

---

### 3. DISTRICT COMMAND OFFICER

#### Primary Responsibilities
- Monitor all shelters in district
- Identify overcrowding issues
- Coordinate resource redistribution
- Generate operational reports
- Make strategic allocation decisions

#### Key Screens
1. **Command Center Dashboard** → District-wide overview
2. **Real-Time Alerts & Predictions** → AI-driven alerts
3. **Analytics & Reporting** → Historical trends
4. **Redistribution Planner** → Move evacuees between shelters

#### Typical Workflow
```
1. Monitor command dashboard (updates every 1 min)
2. Review AI predictions for next 2 hours
3. Set thresholds for automated alerts
4. When shelter reaches 80%: Prepare redistribution plan
5. When shelter reaches 90%: Execute redistribution
6. Generate reports for district authorities
```

#### Decision Support Features
- Predicted occupancy 2 hours ahead
- Redistribution recommendations with ETA
- Evacuation timing analysis
- Vulnerability distribution dashboard

---

## Screen Specifications

### SHARED SCREENS

#### 1. Login & Role Selection Screen

**Purpose**: Authenticate users and route to appropriate interface

**Components**:
- Government agency logo (🏥 ESAMS)
- Username/ID field
- Password field
- "Sign In" primary button
- "Select Role" secondary option with 3 role cards

**Data Validation**:
- Username: Min 4 characters, alphanumeric + underscore
- Password: Min 6 characters (no complexity for emergency use)
- Shows "Offline login available" indicator

**Security Features**:
- Face/Fingerprint biometric option
- Session timeout: 30 minutes of inactivity
- Auto-logout on app background
- No password recovery (must contact admin)

**Responsive Elements**:
- Form fields 100% width
- Stack buttons vertically
- Role cards responsive grid

---

#### 2. Navigation Header

**Present on**: All screens except login

**Components**:
- Back button (when applicable)
- Screen title (18px, Weight 700)
- Subtitle (12px, gray, secondary info)
- Settings/menu icon

**Behavior**:
- Back button enables drawer/modal functionality
- Settings icon shows role options + app preferences
- Subtitle updates context information

---

### FIELD RESPONDER SCREENS

#### 3. Live Hazard Map

**Purpose**: Provide geographic overview of disaster zone and shelters

**Key Elements**:
- **GIS Map Visualization**:
  - Hazard zones (flood areas, landslides) - Red dashed circles
  - Shelter markers - Colored dots (green, blue, orange)
  - User location - Blue dot with accuracy ring
  - Scale indicator
  - North arrow

- **Interaction**:
  - Pinch-to-zoom (double-tap to zoom)
  - Pan with finger drag
  - Tap shelter markers for details
  - Long-press to set destination

- **Legend**:
  - Flood zone (red)
  - Shelter (green/blue/orange)
  - User location (blue)
  - Offline indicator

- **Status Bar**:
  - Nearby shelters count
  - At-capacity warning count
  - Connection status (Online/Offline)

**Performance**:
- Map loads within 1 second
- Zoom transitions smooth (60fps)
- Marker updates every 30 seconds
- Offline tiles cached for viewing

---

#### 4. Nearby Shelters List

**Purpose**: Show available shelters sorted by proximity and capacity

**List Item Components** (per shelter):
- Shelter name (h3)
- Distance in km
- Current occupancy (e.g., "320 / 500")
- Capacity bar with color coding
- Service badges (🍽️ Food, 🏥 Medical, ♿ Accessible)
- Contact number (small text)
- "Allocate Evacuee" button

**Filtering Tabs**:
- All (Total shelters)
- Available (< 90% capacity)
- Medical (Has medical facilities)

**Sorting Options**:
- By distance (default)
- By occupancy (ascending)
- By name (alphabetical)

**Special States**:
- At-capacity shelters: Grayed out, button disabled
- Offline admin: Yellow warning badge
- Medical shortage: Red warning icon

---

#### 5. Allocate Evacuee Form

**Purpose**: Quickly register and assign new evacuee to shelter

**Form Sections**:

**1. Shelter Confirmation**
- Selected shelter name with available beds count
- Warning if nearly full (>80%)

**2. Evacuee Details**
- Full Name * (required)
- Age (optional but recommended)
- ID Number (Aadhar/Voter ID - optional)

**3. Vulnerability Tags** (Checkboxes)
- 👴 Elderly (>65 years)
- ♿ Disabled / Mobility Issues
- 🏥 Medical Condition
- 👶 Accompanied Child
- 🤰 Pregnant / Nursing Mother

**4. Special Notes** (Optional)
- Textarea for medical info, allergies, special requests
- Max 200 characters

**Actions**:
- ✓ Confirm Allocation (Primary)
- Cancel (Secondary)

**Validation**:
- Name required, min 2 characters
- Auto-save draft every 30 seconds
- Show allocation success with ID number
- Enable offline mode fallback if no internet

**Offline Behavior**:
- Queue allocations locally
- Show "Pending sync" indicator
- Retry sync when connection returns

---

#### 6. Offline Mode Panel

**Purpose**: Enable full functionality without internet connection

**Components**:

**Status Alert**:
- 🔴 Red indicator "No Internet Connection"
- "Data will sync when connection is restored"

**Available Actions**:

1. **Offline Map**
   - Last updated timestamp
   - Cached map of zone
   - Shelter locations

2. **Pending Allocations Queue**
   - Shows count of unsync'd entries
   - List of pending allocations
   - Option to resync manually

3. **SMS Fallback Communication**
   - Compose SMS to shelter
   - Pre-configured templates
   - Send via cellular network

4. **Guidance Box**
   - How to use offline mode
   - Decision-making with stale data
   - When to contact admin

**Sync Management**:
- Auto-retry every 2 minutes
- Manual sync button
- Visual progress indicator
- Sync history log

---

### SHELTER ADMINISTRATOR SCREENS

#### 7. Administrator Dashboard

**Purpose**: Overview of shelter operations

**Key Sections**:

**1. Current Status Card**
- Large occupancy number (e.g., "320")
- "Occupants" label
- Capacity bar (colored)
- Percentage display (64%)
- Last updated timestamp

**2. Quick Actions Grid** (2x2):
- 📋 Check-In
- 📊 Reports
- 🏥 Facilities
- 📞 Support

**3. Facility Services List**:
- 🍽️ Food Service - Status badge (Active/Limited/Unavailable)
- 🧼 Sanitation - Status with staff count
- ⚕️ Medical Clinic - Staff count
- 💤 Rest Quarters - Availability status

**4. Floating Action Button**:
- "+ New Check-In" - Primary button docked at bottom

---

#### 8. Digital Check-In Form

**Purpose**: Register new arrivals with full information

**Form Sections**:

**1. Personal Information**:
- Full Name * (required)
- ID Number (with camera icon for OCR)
- Age / Date of Birth

**2. Family Information**:
- Family Size (number of family members)
- Contact Number (phone)

**3. Special Needs** (Checkboxes):
- Elderly
- Disabled
- Medical Condition
- Pregnant/Nursing

**4. Room Assignment**:
- Assigned Building (dropdown)
  - Building A (Families)
  - Building B (Elderly)
  - Building C (General)
- Room Number (e.g., "A-201")

**Accessibility Features**:
- Camera integration for ID scanning
- Barcode generation for room assignment
- Voice input option for names
- Large buttons for older users

**Submission**:
- ✓ Complete Check-In (Primary, 56dp)
- Cancel (Secondary)

**Confirmation**:
- Success message with unique check-in ID
- Option to print wristband/receipt
- Auto-save for offline mode

---

#### 9. Occupancy Status Panel

**Purpose**: Detailed occupancy analytics and trends

**Components**:

**1. Overview Cards** (3 columns):
- Current: 320 occupants (green)
- Capacity: 500 (neutral)
- Available: 180 (blue)

**2. Status Display**:
- Large capacity bar (40px height)
- Percentage indicator: "320 / 500 (64% Capacity)"
- Status label: "HEALTHY (64%)" in green

**3. Status Range Legend**:
- 🟢 0-70% (Safe)
- 🟡 70-90% (Caution)
- 🔴 90%+ (Critical)

**4. Building Breakdown**:
- Building A (Families): 120/150 (80%) - Yellow
- Building B (Elderly): 80/100 (80%) - Yellow
- Building C (General): 120/250 (48%) - Green

**5. Trend Information**:
- "📈 Occupancy increasing at 15 persons/hour"
- "Estimated full capacity: 8:30 PM"

**Real-Time Updates**:
- Auto-refresh every 1 minute
- Visual animation when occupancy changes
- Sound alert at 80% and 90%

---

#### 10. Facility Management

**Purpose**: Toggle and manage shelter services

**Grid Layout** (2 columns):

Each facility card contains:
- Icon + Title (large, 28px)
- Toggle Switch (checked = enabled)
- Current status text
- Details (staff count, availability)
- Action button (Update/Report/Manage)

**Facilities Included**:
1. **Food Service**
   - Meals/Day (3x daily)
   - Staff count

2. **Sanitation**
   - Toilets available / total
   - Water status

3. **Medical Clinic**
   - Doctor count
   - Nurse count

4. **Accessibility**
   - Wheelchair ramps
   - Accessible toilets

5. **Power Supply**
   - Generator status
   - Fuel remaining (hours)

6. **Medical Ward**
   - Availability status
   - ETA for availability

**Alert System**:
- Shows critical maintenance issues
- Time-sensitive notifications
- Maintenance log history

---

### DISTRICT COMMAND CENTER SCREENS

#### 11. Command Center Dashboard

**Purpose**: High-level overview of all shelters in district

**Widgets**:

**1. Key Metrics** (Large cards):
- Total Evacuees: 2,847 (↑ 245 since 2 hrs ago)
- Average Occupancy: 78% (⚠️ High)
- Active Shelters: 12 (1 at critical)

**2. District Map View**:
- Mini GIS map (4:3 aspect ratio)
- Shelter markers color-coded:
  - 🟢 Green: Safe (< 70%)
  - 🟡 Orange: Caution (70-90%)
  - 🔴 Red: Critical (> 90%)
- Cluster view when zoomed out
- Tap to navigate to detailed shelter info

**3. Quick Navigation Buttons**:
- "View Detailed Map" (Secondary)
- "View All Shelters" (Primary)

**Action Items**:
- Quick access to alerts
- Direct link to analytics
- Redistribution planner shortcut

---

#### 12. Real-Time Alerts & Predictions

**Purpose**: Notify command of critical issues and forecast trends

**Alert Types**:

**Critical Alerts** (🔴):
- Shelter at/over capacity
- Admin offline for >5 minutes
- Medical staff shortage
- Resource critical (food, water)

**Warning Alerts** (🟡):
- Shelter approaching 80% capacity
- Unusual occupancy patterns
- Supply chain issues

**Informational Alerts** (🔵):
- Routine updates
- Successful reallocations
- System events

**Alert Card Structure**:
- Icon (🚨, 📡, ✓, etc.)
- Title
- Description with specifics
- Severity indicator with color
- Time stamp
- Action button (Initiate Redistribution, Contact Admin, etc.)

**Predictions Section**:
- AI-driven forecasts for next 2 hours
- Per shelter:
  - Current occupancy
  - Predicted occupancy
  - Occupancy bar with prediction line
  - Time when reaching capacity

**Sorting Options**:
- By severity (Critical → Warning → Info)
- By time (Most recent)
- By shelter

**Auto-Refresh**: Every 30-60 seconds

---

#### 13. Analytics & Reports

**Purpose**: Historical analysis and performance metrics

**Time Filters**:
- This Hour
- Today
- Last 7 Days
- Custom date range

**Analytics Cards**:

**1. Evacuation Timeline**
- Horizontal stacked bar chart
- Segments: Hour 1, Hour 2, Hour 3, Hour 4
- Colors represent phases
- Displays peak hour metrics
- "Peak: 820 evacuees/hour during Hour 2"

**2. Average Allocation Time**
- Large metric: 4.2 mins
- Goal indicator: "Target: < 5 mins"
- Progress bar showing performance
- Green indicator for on-target

**3. Occupancy Distribution**
- Stacked horizontal bars per demographic:
  - Families: 70%
  - Elderly: 45%
  - Medical needs: 38%
- Shows vulnerability distribution

**4. Occupancy Stability** (Trend)
- Line graph over time
- Smoothness indicates stability
- Sudden spikes trigger alerts

**Actions**:
- "Download Report" button generates PDF
- Export options (CSV, PDF, email)
- Share via WeChat/WhatsApp for rapid dissemination

---

#### 14. Redistribution Recommendation Panel

**Purpose**: AI-driven recommendations for balanced occupancy

**Alert Banner**:
- 🚨 Red header "Recommended Actions"
- "Optimize occupancy across shelters"

**Auto-Recommended Moves** (with confidence scores):

**Card 1: Priority Move**
- From: Sports Complex South
  - 475/500 (95% capacity - CRITICAL)
  - Distance: 4.5 km
- → To: Community Center West
  - 312/400 (78% capacity)
  - Can accept 50 more beds

- Recommendation Details:
  - 👥 Move: 50 evacuees
  - 🚌 Buses needed: 2
  - ⏱️ ETA: 15 minutes
  - 📊 Confidence: 98%

- Actions:
  - [Apply Recommendation] (Primary)
  - [Modify] (Secondary)
  - [Reject] (Tertiary)

**Manual Redistribution Section**:
- Source Shelter (dropdown)
- Destination Shelter (dropdown)
- Number of Evacuees (input)
- [Create Custom Plan] button

**Constraints Shown**:
- Available beds at destination
- Current occupancy levels
- Drive time estimates
- Vehicle availability

**Notification System**:
- Command receives recommendation
- Auto-notifies both shelter admins
- SMS sent if comms down
- Success/failure confirmation

---

## Navigation Architecture

### Information Architecture

```
Login Screen
│
├─ FIELD RESPONDER
│  ├─ Dashboard (Live Map)
│  │  ├─ Nearby Shelters
│  │  │  └─ Allocate Evacuee
│  │  └─ Offline Mode
│  └─ Settings/Logout
│
├─ SHELTER ADMIN
│  ├─ Dashboard
│  │  ├─ Check-In Form
│  │  ├─ Occupancy Status
│  │  └─ Facility Management
│  └─ Settings/Logout
│
└─ COMMAND OFFICER
   ├─ Command Dashboard
   │  ├─ Alerts & Predictions
   │  ├─ Analytics
   │  └─ Redistribution Planner
   └─ Settings/Logout
```

### Navigation Patterns

**Bottom Navigation** (Not shown but recommended):
- Would give quick access to main sections
- 3-5 icon tabs per role
- Suggested:
  - Home / Dashboard
  - Map (Responder) / List (Admin) / Analytics (Command)
  - Profile / Settings

**Deep Linking Support**:
- All screens should be deep-linkable
- Enables direct access via notifications
- Example: `esams://shelter/123/alerts`

**Back Button Behavior**:
- Standard Android back navigation
- Returns to previous screen in stack
- Long-press shows navigation history

---

## Offline-First Design

### Offline Capabilities

**Field Responder**:
- ✓ View cached map of last known shelters
- ✓ Create new allocation entries (queued)
- ✓ Send SMS for critical communications
- ✓ View pending allocations queue
- ✗ Search new shelters (no network)
- ✗ Real-time occupancy updates

**Shelter Admin**:
- ✓ Create check-in records (queued)
- ✓ View current occupancy (last synced)
- ✓ Update facility status (queued)
- ✓ Send SMS messages
- ✗ View latest command announcements
- ✗ Real-time shelter list updates

**Command Officer**:
- ✓ View cached district map
- ✓ View last-synced shelter data
- ✗ Real-time alerts (no sync)
- ✗ Predictions (requires current data)
- ✗ Redistribution planning

### Offline Data Management

**Local Storage**:
- SQLite database for structured data
- Shelters (id, name, location, capacity, address, contact)
- Occupancy snapshots (timestamp, occupancy, by_building)
- Allocations (draft entries)
- User session data

**Sync Strategy**:
- On connection restored: Identify conflicts
- Resolve conflicts: Server data prioritized for occupancy
- User allocations preserved (append with timestamp)
- Update UI with sync results

**Cache Expiration**:
- Map data: 7 days
- Shelter data: 24 hours
- Occupancy: 1 hour
- User session: 30 minutes

**Storage Quota**:
- Maps: 50 MB (offline tiles)
- Database: 20 MB (structure data)
- Allocations queue: 10 MB (text records)
- Total app: < 200 MB

---

## Accessibility Guidelines

### WCAG 2.1 Level AAA Compliance

**Color Contrast**:
- Normal text: 7:1 ratio (exceed 4.5:1 standard)
- Large text: 5:1 ratio
- Icon colors: Check visibility with Deutan & Protanopia simulators

**Text Alternatives**:
- All icons have aria-labels
- Images have alt text
- Charts described in adjacent text

**Keyboard Navigation**:
- Tab order: logical flow (top to bottom, left to right)
- Focus indicators: 3px blue border, high contrast
- Keyboard shortcuts:
  - ESC: Back/Close
  - 1-9: Quick nav to sidebar items
  - ENTER: Activate button

**Screen Reader Support**:
- Semantic HTML structure
- Section landmarks: `<main>`, `<nav>`, `<form>`
- Live regions for dynamic updates
- Status messages announced immediately

**Touch Accessibility**:
- Minimum touch target: 48dp x 48dp (≈1cm x 1cm)
- Primary actions: 56dp x 56dp
- Spacing: 8dp minimum between targets
- Large buttons reduce mis-taps during stress

**Text Accessibility**:
- Minimum font size: 14px
- Maximum line length: 75 characters
- Line height: ≥1.4
- Letter spacing: ≥0.12em

**Visual Feedback**:
- Focus states: Visible at all times
- Hover states: Color change + subtle animation
- Disabled states: Clear visual indication + explanation
- Loading states: Spinner + progress indicator

**Motion Accessibility**:
- Respect `prefers-reduced-motion` setting
- Fade instead of slide animations
- No auto-play of content
- Pause autoplay on user interaction

**Language & Clarity**:
- Simple sentences (< 15 words)
- Define technical term on first use
- Consistent terminology throughout
- Avoid idioms and phrases

---

## Performance Considerations

### Load Time Targets
- **App Launch**: < 2 seconds
- **Map View**: < 1 second
- **List Load**: < 500ms
- **Form Render**: < 300ms
- **Database Query**: < 100ms

### Optimization Strategies

**1. Code Splitting**
- Load only needed role interface
- Lazy-load analytics heavy components
- Tree-shake unused code

**2. Image Optimization**
- Use WebP with PNG fallback
- Responsive images (srcset)
- Placeholder while loading
- Max image size: 100KB

**3. Database Queries**
- Index frequently filtered columns
- Limit query results (pagination/infinite scroll)
- Cache read-heavy queries
- Batch write operations

**4. Network Usage**
- GraphQL for precise data fetching
- HTTP/2 for multiplexing
- Gzip compression
- CDN for static assets
- Request bundling (max 3 concurrent)

**5. Battery Life**
- Geolocation updates: 30-60 second intervals
- WiFi for map downloads (not cellular)
- Dim screen in emergency brightness mode
- Reduce refresh rates (30fps when not active)

**6. Memory Management**
- Release map tiles not on-screen
- Limit in-memory database queries
- Dispose listeners on screen exit
- Profile with Android Studio Profiler

---

## Data Model Examples

### Shelter Object
```json
{
  "id": "shelter_123",
  "name": "Central High School",
  "district": "Zone-5",
  "location": {
    "latitude": 28.5454,
    "longitude": 77.1623,
    "address": "123 Main St, New Delhi"
  },
  "contact": {
    "phone": "+91-9876543210",
    "admin_name": "S. Sharma",
    "email": "admin@shelter123.gov"
  },
  "capacity": {
    "total": 500,
    "building_a": 150,
    "building_b": 100,
    "building_c": 250
  },
  "current_occupancy": {
    "total": 320,
    "last_updated": "2024-02-19T09:41:00Z",
    "building_a": 120,
    "building_b": 80,
    "building_c": 120
  },
  "facilities": {
    "food": { "status": "active", "meals_per_day": 960 },
    "medical": { "status": "active", "doctors": 1, "nurses": 2 },
    "sanitation": { "status": "active", "toilets": 20 },
    "accessibility": { "status": "active", "ramps": 2 }
  },
  "is_accepting": true
}
```

### Evacuee Allocation Object
```json
{
  "id": "alloc_456",
  "evacuee": {
    "name": "Rajesh Kumar",
    "age": 45,
    "id_number": "1234-5678-9012"
  },
  "vulnerability_tags": ["None"],
  "assigned_shelter": "shelter_123",
  "assigned_building": "A",
  "assigned_room": "A-201",
  "family_size": 3,
  "contact": "+91-9999888877",
  "check_in_time": "2024-02-19T09:35:00Z",
  "status": "checked_in",
  "special_notes": "No medical conditions",
  "allocated_by": "responder_001",
  "allocation_confidence_score": 0.98
}
```

---

## Summary & Next Steps

### Implementation Priorities

**Phase 1 (MVP - Week 1-2)**:
- [ ] Login & role selection
- [ ] Field responder map + nearby shelters
- [ ] Admin dashboard + check-in form
- [ ] Command center dashboard
- [ ] Basic offline support

**Phase 2 (Core - Week 3-4)**:
- [ ] Occupancy analytics
- [ ] Facility management
- [ ] Detailed allocation forms
- [ ] Offline queueing system
- [ ] SMS fallback integration

**Phase 3 (Advanced - Week 5-6)**:
- [ ] AI-driven predictions
- [ ] Redistribution planner
- [ ] Advanced analytics
- [ ] Voice input support
- [ ] Barcode/QR integration

### Design System Deliverables

- [x] Wireframe screens (completed)
- [x] Component library (in CSS)
- [x] Color palette & tokens
- [ ] Design Figma file (next)
- [ ] Interactive prototype (next)
- [ ] Developer handoff guide (next)

### Testing Checklist

- [ ] Load test with 10,000 simultaneous allocations
- [ ] Offline sync conflict resolution
- [ ] Biometric auth performance
- [ ] Map rendering performance (200+ markers)
- [ ] Battery consumption at 25% battery mode
- [ ] Accessibility audit (WCAG 2.1 AAA)
- [ ] Usability testing with responders under time stress
- [ ] Network degradation testing (2G fallback)

---

**Document Version**: 1.0  
**Last Updated**: February 19, 2026  
**Maintained By**: Product & Design Team  
**Status**: Ready for Development Handoff
