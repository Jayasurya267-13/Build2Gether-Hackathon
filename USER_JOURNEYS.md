# User Journeys & Critical Workflows - Emergency Shelter Management System

## Table of Contents

1. [Field Responder Journey](#field-responder-journey)
2. [Shelter Administrator Journey](#shelter-administrator-journey)
3. [District Command Officer Journey](#district-command-officer-journey)
4. [Cross-Role Scenarios](#cross-role-scenarios)
5. [Error Recovery Flows](#error-recovery-flows)
6. [Mobile Optimization Notes](#mobile-optimization-notes)

---

## Field Responder Journey

### Primary Goal: Evacuate person to safe shelter quickly

### Typical Workflow: Finding & Allocating Evacuees

```
┌─────────────────────────────────────────────────────────────────┐
│ FIELD RESPONDER - PRIMARY WORKFLOW: EVACUEE ALLOCATION          │
└─────────────────────────────────────────────────────────────────┘

1️⃣  ARRIVE AT FIELD (Disaster Zone)
   ├─ Phone already unlocked in responder pocket
   ├─ App already in responder-dashboard screen
   ├─ Live map shows evacuation zone + nearby shelters
   └─ Green dots show available shelters within 5km
     
2️⃣  ENCOUNTER EVACUEE(S)
   ├─ Evacuee needs immediate shelter
   ├─ May have special needs (elderly, medical, child)
   ├─ Responder must act decisively without mobile data
   └─ Time pressure: 2-3 minutes max per person

3️⃣  FIND NEAREST AVAILABLE SHELTER
   ├─ Quick tap on map for nearest shelter
   ├─ OR tap "View Nearby Shelters" button
   └─ System shows 3-5 closest shelters with distance + capacity

4️⃣  CHECK SHELTER AVAILABILITY
   ├─ Green bar (<70%): ✓ Can allocate
   ├─ Orange bar (70-90%): ⚠ Nearly full - risky
   ├─ Red bar (>90%): 🔴 Full - choose different shelter
   └─ Shows:"320 / 500 (64%)" with live update

5️⃣  TAP "ALLOCATE EVACUEE"
   ├─ Opens form with shelter pre-selected
   ├─ Fields: Name, Age, ID (ID optional), Special needs
   ├─ Checkboxes: Elderly, Disabled, Medical, Child, Pregnant
   ├─ Text area: Any special notes
   └─ Two buttons:[✓ Confirm] [Cancel]

6️⃣  RAPID DATA ENTRY (< 60 seconds)
   ├─ Name*: "Rajesh Kumar" (required)
   ├─ Age: "45" (recommendation - auto-fill if verbal)
   ├─ ID: [skip for now - not mandatory]
   ├─ Tags: None (quick case)
   ├─ Notes: [empty]
   └─ [✓ CONFIRM ALLOCATION]

7️⃣  SUCCESS CONFIRMATION
   ├─ Toast: "✓ Allocation Successful"
   ├─ Confirmation ID: "ALLOC-2024-0234-567"
   ├─ Shelter: "Central High School, Building A, Room A-201"
   ├─ Responder can take photo for records
   ├─ If offline: "✓ Queued locally - will sync when online"
   └─ [← Back to Map View]

8️⃣  PREPARE FOR NEXT EVACUEE
   ├─ Map refreshed with latest occupancy
   ├─ Verify another shelter isn't full now
   ├─ Find next available shelter on map
   └─ REPEAT from step 3
```

### Scenario A: Complex Case - Elderly Evacuee with Medical Needs

```
ENCOUNTER: 73-year-old woman with diabetic condition, mobility issues

ALLOCATION FORM - FILLED:
├─ Name: "Meera Singh"
├─ Age: "73"
├─ ID: "1234-5678-9012"
├─ Tags: ✓ Elderly, ✓ Disabled/Mobility, ✓ Medical Condition
├─ Notes: "Diabetic, needs insulin 3x daily, mobility aid required"
└─ Select Shelter: "Community Center West (Medical available)"

SYSTEM RESPONSE:
├─ Validates special needs tags
├─ Routes to shelter WITH medical facility
├─ Notifies shelter admin: 👴 Medical case incoming
├─ Suggests shelter: "Community Center West" (has doctors)
├─ Confirmation: "Meera has been assigned to Medical Wing"

OFFLINE BEHAVIOR:
├─ If no internet: Still allocates successfully
├─ Display: "📱 Offline - Queued for sync"
├─ Data saved locally with timestamp
├─ When connection returns → Auto-sync to server
└─ Shelter admin notified within 2 minutes of sync
```

### Scenario B: Offline Mode - No Network

```
SITUATION: In disaster zone with no internet/mobile signal

FIELD RESPONDER ACTIONS:
1. App detects no connection
2. Offline mode banner shows: 🔴 "No Internet - Data will sync later"
3. Map displays cached shelters from last sync
4. Allocations still possible - stored locally
5. When connection returns → Auto-sync to server

OFFLINE ALLOCATION PROCESS:
├─ Same form as online
├─ Shows: "Connected to local database"
├─ Submission: "✓ Added to offline queue (3 pending)"
├─ Data stored in encrypted SQLite
├─ Sync history logged

SMS FALLBACK (if cellular available):
├─ Open "Offline Mode" → "SMS Fallback"
├─ Pre-filled SMS template:
│  "SHELTER_ALLOC|Central High|Rajesh Kumar|45|No|OK"
├─ Send to shelter admin number
├─ Gets SMS confirmation reply
└─ Record kept in app
```

### Scenario C: High-Stress Emergency - 20+ Evacuees at Once

```
MASS ALLOCATION WORKFLOW:
(Responder needs to allocate large group quickly)

PREP PHASE:
1. View map → See all available shelters at once
2. Identify 3-4 adequate shelters within 2km
3. Distribute evacuees efficiently

ALLOCATION PHASE:
1. Allocate 5-7 people to Shelter A
2. Allocate 5-7 people to Shelter B
3. Allocate 3-4 people to Shelter C (medical)

SPEED OPTIMIZATION:
├─ Pre-filled form (shelter already selected)
├─ Name field gets focus immediately
├─ Tab key navigates between fields NOT buttons
├─ Swipe right → Save & next evacuee
├─ Swipe left → Cancel & previous
├─ Shortcuts: Elder=E, Medical=M, Child=C (keyboard)

RATE: One allocations per 45-60 seconds
```

---

## Shelter Administrator Journey

### Primary Goal: Manage occupancy, welcome arrivals, maintain operations

### Typical Daily Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ SHELTER ADMIN - DAILY OPERATIONS WORKFLOW                       │
└─────────────────────────────────────────────────────────────────┘

🌅 MORNING SHIFT (6:00 AM) - Initial Assessment
├─ Open app → Authenticates with biometric
├─ Dashboard shows: Current occupancy = 320/500 (64%)
├─ Status: Green ✓ "Healthy"
├─ Facility Status: ✓ All normal
├─ Task: Verify food & medical preparation
└─ Action: [+New Check-In] for incoming arrivals

⏰ CHECKPOINT 1 (9:00 AM) - Increased Occupancy
├─ Occupancy now: 380/500 (76%) — Yellow alert ⚠
├─ Trend: 15 people/hour increasing
├─ ETA to full capacity: ~4 hours
├─ Action: Contact command center
├─ Prepare: Activate additional rest areas
└─ System: Automatic alert sent to command

📋 CHECK-IN PROCESS (Throughout Day)
├─ Evacuee arrives at shelter
├─ Admin opens "New Check-In" form
├─ Fills quick form:
│  ├─ Name (required)
│  ├─ Age (recommended)
│  ├─ ID scan (optional)
│  ├─ Family size
│  ├─ Special needs checkboxes
│  └─ Assigned building (auto-suggested)
├─ Result: "Check-in completed, Room: A-201"
├─ Print: Wristband with ID for evacuee
└─ Register: Entered into system

🏢 FACILITY MANAGEMENT (Every 2 Hours)
├─ Open Facilities tab
├─ Verify all services active/available
│  ├─ 🍽️ Food: ✓ Active - 960 meals prepared
│  ├─ 🧼 Sanitation: ✓ Active - 15/20 toilets ok
│  ├─ ⚕️ Medical: ✓ Active - 1 doctor on duty
│  ├─ ♿ Accessible: ✓ Active - 2 ramps operational
│  └─ 💤 Rest: ⚠ Limited - Only 20 cots left
├─ Actions: Toggle status, call support
└─ Report: Any maintenance issues

⏰ CHECKPOINT 2 (12:00 PM) - Critical Level Approaching
├─ Occupancy: 430/500 (86%) — Orange alert ⚠⚠
├─ Trend: Still increasing
├─ ETA to overflow: ~1 hour
├─ Action: URGENT call to command center
├─ Coordinate: Prepare for redistribution
└─ Community: Inform occupants of possible relocation

🔴 CHECKPOINT 3 (1:30 PM) - AT CAPACITY
├─ Occupancy: 485/500 (97%) — Red alert 🔴
├─ System: CRITICAL - blocks new allocations
├─ Action: Command initiates redistribution
├─ Process:
│  ├─ Move 50 people to neighboring shelter
│  ├─ Buses arrive, verified transfers begin
│  ├─ Cancel wristbands for transferred persons
│  └─ Update system: Removed from manifest
├─ New status: 435/500 (87%) — Back to caution
└─ Admin helps organize evacuation logistics

📊 HOURLY REPORTING
├─ Database auto-captures:
│  ├─ Current occupancy
│  ├─ Check-ins this hour
│  ├─ Vulnerability tags recorded
│  └─ Facility status snapshot
├─ Admin reviews: Monthly trends
├─ Reports: Sent to district command
└─ Audit trail: Complete record maintained

🌆 EVENING WIND DOWN (6:00 PM)
├─ Review day's activities
├─ Outstanding issues resolved
├─ Handoff notes for night staff
├─ Close: App auto-locks session
└─ Secure: All data encrypted locally
```

### Scenario: Facility Problem - Medical Staff Shortage

```
SITUATION: Medical clinic reports two nurses absent

WORKFLOW:
1. Admin sees facility alert: "⚠️ Medical staff shortage"
2. Opens Facilities tab → Medical Clinic
3. Current: Shows "Doctor: 1, Nurses: 1 (BELOW TARGET: 2)"
4. Taps [Report Issue / Manage Staff]
5. Form opens:
   ├─ Issue: Medical staff shortage
   ├─ Current staff: 1 doctor, 1 nurse
   ├─ Required: 1 doctor, 2 nurses minimum
   ├─ Action: "Request additional staff"
   └─ SMS to district: Auto-sends urgent request
6. System: Auto-escalates to command center
7. Status: "PENDING APPROVAL - 8 min"
8. Result: Within 30 min, additional nurse arrives
9. Admin updates: "Staff: 1 doctor, 2 nurses" → Status: ✓ Active
10. Command notified: Issue resolved
```

### Scenario: Check-Out & Discharging Evacuee

```
WORKFLOW - EVACUEE LEAVING (All-Clear or Safe to Return Home):

1. Evacuee approaches admin, says: "Ready to leave"
2. Admin opens Check-Out function
3. Enters: Evacuee name or wristband ID
4. System retrieves: Check-in record and details
5. Confirmation:
   ├─ Name: Rajesh Kumar
   ├─ Check-in: Feb 19, 6:35 AM
   ├─ Duration: 12 hours, 35 minutes
   ├─ Room: A-201
   └─ Family: 3 persons (all accounted for)
6. Discharge:
   ├─ Taps [✓ Approve Discharge]
   ├─ System triggers data sync
   ├─ Wristband scanned and invalidated
   └─ Occupancy updates: 319/500 (63.8%)
7. Documentation: Receipt printed for evacuee
8. Record: Check-out timestamp logged for audit
```

---

## District Command Officer Journey

### Primary Goal: Monitor all shelters, predict overcrowding, coordinate relief

### Typical Command Center Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│ COMMAND OFFICER - OPERATIONAL OVERSIGHT WORKFLOW               │
└─────────────────────────────────────────────────────────────────┘

🎯 START OF SHIFT (8:00 AM) - Situation Assessment

1. OPEN COMMAND DASHBOARD
   ├─ Real-time metrics appear:
   │  ├─ Total Evacuees: 2,847 (↑145 since midnight)
   │  ├─ Average Occupancy: 71% (↑ 5% last 8 hrs)
   │  ├─ Active Shelters: 12 (All normal)
   │  └─ Alerts: 1 in yellow, 0 in red
   └─ MAP: Shows all 12 shelters with color coding

2. REVIEW OVERNIGHT CHANGES
   ├─ Tap "Alerts & Predictions"
   ├─ Review: Any evacuee movements night-time
   ├─ Check: Any facility issues reported
   ├─ Decisions made: Log of manual overrides
   └─ Status: All night activations stable

3. CHECK PREDICTIONS (AI System)
   ├─ "Next 2 Hours Forecast"
   ├─ Schools sports complex: 380 → (projected) 410 (82%)
   ├─ Community center west: 340 → (projected) 375 (94%) ⚠️
   ├─ Central high school: 320 → (projected) 350 (70%) ✓
   └─ INSIGHT: Community center approaching caution

4. FLAG POTENTIAL ISSUES
   ├─ System suggests: Monitor community center closely
   ├─ Preventive action: Prepare redistribution plan
   ├─ Recommendation: Move 20 from community → college (capacity available)
   └─ Status: PREPARED but not yet executed (wait for 80% trigger)

💼 OPERATIONAL DECISIONS (9:00 AM - 12:00 PM)

5. MONITOR REAL-TIME DASHBOARD
   ├─ Updates every 30 seconds
   ├─ Watch capacity bars change
   ├─ Alert system flags at 80%, 90% thresholds
   ├─ Receive SMS alerts if app backgrounded
   └─ React within 5 minutes of alert

6. COMMUNITY CENTER HITS 80%
   ├─ Alert appears: "📊 Community Center - 320/400 (80%)"
   ├─ Recommendation card shows:
   │  ├─ Current trend: +30 persons/hour
   │  ├─ Time to capacity: 45 minutes
   │  ├─ Suggested action: Move 50 → College Library
   │  ├─ Buses needed: 2
   │  ├─ ETA: 15 minutes
   │  └─ Confidence: 96%
   ├─ Officer taps: [Apply Recommendation]
   ├─ System auto-notifies:
   │  ├─ SMS to Community Center admin
   │  ├─ SMS to College Library admin
   │  ├─ Logistics team for buses
   │  └─ Ground coordinator
   └─ Status: Redistribution initiated

7. EXECUTION MONITORING
   ├─ Tap "Redistribution Panel"
   ├─ See: Real-time progress
   │  ├─ "Bus 1: En route to Community Center (8 min ETA)"
   │  ├─ "Bus 2: En route to Community Center (11 min ETA)"
   │  ├─ "Community Center: 50 evacuees ready for transfer"
   │  └─ "College: Prepared reception area"
   ├─ Updates: Every 2 minutes
   └─ Completion: Estimated 30 min

🎯 CRITICAL INCIDENT (12:15 PM) - Manual Intervention

8. UNEXPECTED SURGE - 100 NEW EVACUEES ARRIVING
   ├─ Alert: "⚠️ MASS ARRIVAL at Central High School"
   ├─ System calculates impact: +100 → 420/500 (84%)
   ├─ Prediction: Will reach 95% in 1 hour if no action
   ├─ Automatic recommendation: Distribute to 3 shelters
   ├─ Officer manually:
   │  ├─ Tap [Redistribution Panel]
   │  ├─ Override auto-recommendation
   │  ├─ Create custom plan:
   │  │  ├─ Central → College: 40 people
   │  │  ├─ Central → Church Hall: 35 people
   │  │  └─ Central → Keep reserve: 25 people
   │  ├─ Sends requests to 3 shelter admins
   │  └─ Monitors: Real-time status updates

📊 REPORTING & ANALYSIS (2:00 PM - 4:00 PM)

9. ANALYTICS REVIEW
   ├─ Tap "Analytics" tab
   ├─ View: Historical analysis
   │  ├─ Allocation efficiency: 4.8 min avg (Goal: <5 min)
   │  ├─ Occupancy stability: 71% with 8% swing
   │  ├─ Demographics:
   │  │  ├─ Families: 70% of population
   │  │  ├─ Elderly: 18% (medical support needed)
   │  │  └─ Children: 22% (school coordination needed)
   │  └─ Peak hour: 2:00-3:00 PM with 450 arrivals
   ├─ Time frame: Last 8 hours / Last 24 hours / Last 7 days
   └─ Export: [Download Report] for district admin

10. RESOURCE PLANNING
    ├─ Based on trends, anticipate future needs:
    │  ├─ Food: Current 2,800 meals/day adequate for 3,500 evacuees
    │  ├─ Medical: Shortage developing - request 2 more doctors
    │  ├─ Water: Consumption rising - increase supply
    │  └─ Beds: Some shelters at risk - stage ready inventory
    ├─ Sends requests up to district
    └─ Status: Tracking for next 24 hours

👥 COORDINATION (4:00 PM - 6:00 PM)

11. INTER-AGENCY COMMUNICATION
    ├─ Video call with NGO coordinators
    ├─ Share: Analytics dashboard (screenshare)
    ├─ Discuss: Predicted needs for evening peak
    ├─ Coordinate: Food preparation, medical staffing
    ├─ Plan: Evening shift transitions
    └─ Record: Meeting notes for handoff

12. ESCALATION READINESS
    ├─ Prepare: Contingency plans if occupancy >95%
    ├─ Options:
    │  ├─ Open emergency shelter (school gym)
    │  ├─ Request additional buses
    │  ├─ Arrange tents for overflow
    │  └─ Request National Guard support
    ├─ Authority given to activate (pre-approved)
    └─ Status: Standby mode

🌆 END OF SHIFT (6:00 PM) - Handoff

13. SHIFT HANDOFF
    ├─ Night command officer logs in
    ├─ Share: Current situation briefing
    ├─ Pass: Outstanding issues & decisions
    ├─ Alerts: Critical items to watch
    ├─ System: Auto-syncs all data
    └─ Status: Smooth transition
```

### Critical Decision Point Scenario: Hospital Overflow

```
SITUATION: City hospital overflows → 100 medical cases arrive at shelters

COMMAND RESPONSE:
1. Alert: "🏥 Medical surge: 100 patients arriving"
2. System recommends: Route to shelter WITH medical facility
3. Officer decision:
   ├─ Current: Community Center West has 1 doctor (insufficient)
   ├─ Option A: Route to hospital (not available - full)
   ├─ Option B: Route to community center + request medical staff
   ├─ Option C: Set up field medical clinic in central area
   ├─ DECISION: Combination of B+C
4. Actions:
   ├─ Request: 3 additional doctors + 5 nurses from district
   ├─ Coordinate: Mobile medical unit -> Central High School
   ├─ Distribute: 50 medical → Community Center, 50 → Mobile unit
   ├─ Alert: All admins of incoming medical cases
   └─ Monitor: 24/7 medical readiness
5. Result: All medical cases accommodated within 45 minutes
```

---

## Cross-Role Scenarios

### Scenario 1: Complete Evacuation Workflow (A-to-Z)

```
TIMELINE: One evacuee's journey through the system (6:00 AM - 6:00 PM)

6:00 AM - FIELD RESPONDER DISCOVERS EVACUEE
├─ Situation: Elderly woman stranded in flood area
├─ Action: Field responder locates via map
├─ Status: Needs immediate shelter
└─ App: Open to nearby shelters screen

6:05 AM - ALLOCATION
├─ Field Responder: Selects "Central High School"
├─ Form: Name=Meera, Age=73, Special=Elderly+Disabled
├─ Submit: [✓ Confirm]
├─ Confirmation: "ALLOC-2024-0234-567"
├─ System: Occupancy updates 319→320 (64.2%)
├─ Shelter Admin: SMS alert "1 incoming: Meera (73, Elderly)"
└─ Status: Allocated

6:15 AM - CHECK-IN AT SHELTER
├─ Admin: Sees arriving evacuee, open form
├─ Entry: Full details (name, age, family, building assignment)
├─ Assignment: Building B (Elderly), Room B-105
├─ Output: Wristband printed for Meera
└─ Status: Checked-in, occupancy 320/500 (64%)

6:30 AM - THROUGHOUT DAY
├─ Medical: Clinic staff monitors Meera's medications
├─ Food: 3 meals provided per day
├─ Comfort: Extra support due to mobility issues
├─ Record: All interactions logged
└─ Status: Cooperative, stable

3:00 PM - OCCUPANCY CRITICAL (90%)
├─ Command: Decides redistribution needed
├─ Decision: Move 25 people, including non-medical cases
├─ Admin: Reviews roster for candidates
├─ Meera: NOT selected (medical priority, specialized care)
├─ Status: Remains at Central High School
└─ Occupancy: Drops to 450/500 (90%) after 25 transfers

6:00 PM - DATABASE CAPTURE
├─ End-of-shift: 12-hour record for Meera captured
├─ History:
│  ├─ Check-in: 6:15 AM (allocated 6:05 AM)
│  ├─ Duration: Ongoing (no checkout yet)
│  ├─ Building: B-105
│  ├─ Needs: Medical monitoring (diabetes)
│  ├─ Staff interactions: 3 (meals + medical check)
│  └─ Status: Comfortable, stable
├─ Analytics: Used for reporting
└─ Audit: Complete trail logged
```

### Scenario 2: Data Sync - Offline to Online Transition

```
SITUATION: Field responder loses signal during allocations

6:00 PM - LOSES CONNECTION
├─ Location: Rural flood area
├─ Signal: Drops from 4G to No Service
├─ App Alert: "📡 No Internet - Offline mode enabled"
├─ Queue: 0 pending allocations

6:05 PM - 1ST ALLOCATION (OFFLINE)
├─ Evacuee: Raj Kumar
├─ Responder: Uses form normally
├─ Submit: [✓ Confirm Allocation]
├─ System: "✓ Queued locally - will sync when online"
├─ Queue: Now 1 pending

6:15 PM - 2ND ALLOCATION (OFFLINE)
├─ Evacuee: Priya Sharma
├─ Responder: Another allocation
├─ Status: "✓ Queued locally (2 pending)"
├─ Queue: Now 2 pending

6:30 PM - SIGNAL RETURNS
├─ Location: Back to main shelter area
├─ Signal: Returns to 4G
├─ App Alert: "📱 Connection restored - syncing..."
├─ Status: Automatic sync begins

6:31 PM - SYNC PROCESS
├─ Upload: 2 pending allocations to server
├─ Check: Conflicts? None (both shelters had capacity)
├─ Server actions:
│  ├─ Record Raj Kumar: Allocated to Central HS
│  ├─ Record Priya Sharma: Allocated to Community Center
│  └─ Update occupancy: Both shelters +1 each
├─ Send alerts: Both shelter admins receive SMS
└─ Status: "✓ Sync complete - All 2 entries uploaded"

6:32 PM - CONFIRMATION
├─ App: Clears offline queue
├─ Screen: Shows sync summary:
│  ├─ Synced: 2 allocations
│  ├─ Errors: 0
│  ├─ Time: 1 minute 2 seconds
│  └─ Status: All caught up
└─ Ready: Next allocation available immediately
```

### Scenario 3: Multiple Role Coordination - Alert Response

```
SITUATION: Command Center Alert Triggers Multi-Role Coordination

12:00 PM - ALERT TRIGGERED
├─ Command System: Detects Community Center at 85% capacity
├─ Prediction: Will reach 95% in 45 minutes
├─ Action: Auto-sends redistribution recommendation
└─ Officer: Reviews and approves plan

12:02 PM - SMS NOTIFICATIONS SENT
├─ To Shelter Admin (Community Center):
│   "⚠️ ALERT: Occupancy 85%. Prepare 30 evacuees for transfer to Central HS. "
│   "Buses ETA 15 min."
│   "Confirm receipt: Y/N"
│
├─ To Shelter Admin (Central HS):
│   "📊 Incoming: 30 evacuees from Community Center. "
│   "ETA: 12:20 PM. Prepare receiving area."
│
├─ To Field Responders:
│   "⚠️ Community Center reaching capacity. "
│   "Route new evacuees to Central HS or Church Hall."
│
└─ To District Logistics:
    "🚌 Request: 2 buses Community Center → Central HS. "
    "Pickup time: 12:15 PM. 30 persons."

12:05 PM - SHELTER ADMIN RESPONSE (Community Center)
├─ Admin: Sees alert on phone
├─ Action: Opens "Redistribution Panel"
├─ Reviews: 30 people selected for transfer (mostly families, no medical)
├─ Confirms: "Y" via SMS reply
├─ Status: Prepares evacuation room with belongings pre-organized
└─ Note: "Ready, buses confirmed"

12:10 PM - SHELTER ADMIN RESPONSE (Central HS)
├─ Admin: Confirms room availability
├─ PrepAction: Moves cots to receiving area
├─ Status: "RM:B-101:B-115 available for 30 arrivals"
└─ Note: "Ready to receive"

12:15 PM - LOGISTICS COORDINATION
├─ Buses: Depart central depot with drivers & paramedics
├─ Status: "En route to Community Center, ETA 12:20"
├─ Communication: Via SMS for status updates
└─ Tracking: Driver phones sent GPS location

12:20 PM - EVACUATION BEGINS
├─ Admin (Community Center): Calls out 30 numbers
├─ Evacuees: Gather belongings, board buses
├─ Admin: Scans wristbands for checkout (occupancy decreases)
├─ System: Occupancy drops 320→290 (72.5%)
└─ Alert: Immediately clears, no longer at risk

12:25 PM - COMMAND MONITORING
├─ Officer: Watches real-time status dashboard
├─ Update: "Community Center: 290/400 (72.5%) ✓"
├─ Status: Back in healthy green zone
├─ Action taken: Successfully prevented overflow
└─ Log: Entire incident documented for audit

12:35 PM - ARRIVAL AT DESTINATION
├─ Buses: Arrive at Central HS
├─ Admin (Central HS): Receives evacuees
├─ Processing: 30 check-ins (quick, 2 min each)
├─ Assignment: Rooms B-101 through B-115 filled
├─ System: Occupancy increases 320→350 (70%)
└─ Status: Still in healthy green

1:00 PM - INCIDENT CONCLUSION
├─ Command: Confirms all 30 persons accounted for
├─ Report: 
│  ├─ Incident: Redistribution execution
│  ├─ Duration: 1 hour from alert to completion
│  ├─ Persons moved: 30
│  ├─ Success rate: 100%
│  └─ Issues: None
├─ Status: All systems nominal
└─ System: Return to normal monitoring
```

---

## Error Recovery Flows

### Error 1: Invalid Shelter Selection

```
SITUATION: Field responder tries to allocate to shelter at 99% capacity

USER ACTION:
├─ Responder: Views nearby shelters
├─ Sees: "Sports Complex - 485/500 (97%)"
├─ Taps: "Allocate Evacuee" button
└─ System: Validates shelter capacity

SYSTEM RESPONSE:
├─ Check: Sports Complex is 97% full
├─ Decision: Cannot allocate (exceeds 90% threshold)
├─ Error message appears:
│  "🔴 CANNOT ALLOCATE
│   Sports Complex is at capacity (485/500)
│   
│  ALTERNATIVES:
│  • Central High School: 320/500 (64%) ← RECOMMENDED
│  • Church Hall: 180/300 (60%)
│  
│  [Choose Alternative]  [Back]"
└─ Responder: Either selects alternative or goes back

RESOLUTION:
├─ User: Taps "Central High School"
├─ System: Redirects to Central HS allocation form
├─ Status: Form re-opens with correct shelter
└─ Result: Allocation proceeds normally
```

### Error 2: Form Validation - Missing Required Field

```
SITUATION: Responder forgets to enter evacuee name

USER ACTION:
├─ Responder: Fills form
│  ├─ Name: [BLANK]
│  ├─ Age: 35
│  └─ Tags: [None]
├─ Taps: [✓ Confirm Allocation]
└─ System: Validates form

SYSTEM RESPONSE:
├─ Validation check: Name field is required
├─ Error appears (red highlight):
│  "⚠️ MISSING REQUIRED FIELD
│   
│   Full Name is required
│   
│  [OK]"
├─ Name field: Glows red with focus
└─ Cursor: Auto-placed in name field

RECOVERY:
├─ Responder: Enters name "Suresh Kumar"
├─ Visual: Red highlight disappears, field turns green
├─ System: Allows form submission
├─ Taps: [✓ Confirm Allocation]
└─ Result: Allocation succeeds
```

### Error 3: Network Timeout - Sync Failure

```
SITUATION: Admin's form submission times out (poor signal)

USER ACTION:
├─ Admin: Completes check-in form
├─ Taps: [✓ Complete Check-In]
├─ System: Attempts to upload to server
└─ Result: Connection timeout after 5 seconds

SYSTEM RESPONSE:
├─ Error message:
│  "⏱️ SYNC FAILED
│   
│   Server connection timeout.
│   
│  Offline mode has saved your data.
│  
│  [RETRY]  [OFFLINE SAVE]"
├─ Data: Preserved locally
└─ Status: Form still filled, ready for retry

RECOVERY OPTIONS:

OPTION A - RETRY:
├─ Admin: Taps [RETRY]
├─ System: Attempts upload again (after 2 sec wait)
├─ Network improves: Server responds
├─ Upload: Succeeds
├─ Message: "✓ Check-in saved successfully"
└─ Status: Proceeds to next person

OPTION B - OFFLINE SAVE:
├─ Admin: Taps [OFFLINE SAVE]
├─ System: Creates local record
├─ Message: "✓ Saved offline - will sync when connected"
├─ Queue count: "+1 pending entry (4 total)"
├─ Status: Admin continues with next person
└─ Later: Auto-syncs when signal returns
```

### Error 4: Duplicate Allocation - Person Allocated Twice

```
SITUATION: Same person allocated to two shelters by different responders (offline bug)

DETECTION:
├─ System: During sync, detects duplicate
├─ Alert: "⚠️ DUPLICATE DETECTED"
├─ Details:
│  ├─ Person: Rajesh Kumar (Age 45)
│  ├─ Allocation 1: Central HS (6:05 AM, by Responder 001)
│  ├─ Allocation 2: Community Center (6:08 AM, by Responder 002)
│  └─ Shelters: Different locations

RESOLUTION PROCESS:
├─ System: Analysis
│  ├─ Both allocations: Valid at time of creation
│  ├─ Cause: Offline allocation, both responders had stale data
│  ├─ Decision: Keep first allocation (by timestamp)
│  └─ Action: Reverse second allocation
│
├─ Notifications:
│  ├─ To Responder 002: "Allocation canceled - duplicate detected"
│  ├─ To Community Center Admin: "Incoming person allocation canceled"
│  ├─ To Central HS Admin: "Allocation confirmed (primary location)"
│  └─ To Command: "Duplicate resolved, Rajesh → Central HS only"
│
└─ Status: "✓ Duplicate resolved - person at Central HS"

LEARNING:
├─ Incident: Logged for analysis
├─ Improvement: Responders notified of sync issue
├─ Future: Better offline conflict detection
└─ System: Prevents recurrence with better logic
```

---

## Mobile Optimization Notes

### Gesture-Based Navigation

```
SWIPE GESTURES:
├─ Swipe Right: Back/Previous screen
├─ Swipe Left: Forward/Next screen
├─ Swipe Up: Scroll up within screen
├─ Swipe Down: Scroll down within screen
├─ Long Press: Context menu (Copy address, etc.)
├─ Double Tap: Zoom on map
└─ Pinch: Zoom in/out on map

BACK BUTTON:
├─ Android hardware back: Standard back navigation
├─ On-screen back (←): Shows on most screens
├─ Behavior: Returns to previous screen in stack
└─ Stack size: Max 10 screens (older ones cleared)
```

### Touch Target Optimization

```
MINIMUM SIZES (for emergency stress):
├─ Primary actions: 56dp x 56dp (Large, easy to miss)
├─ Standard buttons: 48dp x 48dp (Comfortable)
├─ Secondary actions: 44dp x 44dp (Smaller)
├─ Spacing between: 8dp minimum gap
└─ Exception: Form fields can be 40dp height (keyboard appears)

STRESS-TESTING NOTES:
├─ Shaking hands: Larger buttons reduce mis-hits
├─ Time pressure: Fewer options per screen
├─ Anxiety: Clear, visible feedback on every action
└─ Fatigue: High contrast, large text prevents errors
```

### Performance Optimization

```
LOADING PRIORITIES:
├─ Map loads FIRST (critical for field responder)
├─ Text fields: Pre-focus on name input
├─ Capacity bars: Show with skeleton first
├─ Occupancy data: Async load (show placeholder)
└─ Contact info: Last to load (less critical)

CACHING STRATEGY:
├─ Shelter data: 1 hour cache (or manual refresh)
├─ Map tiles: 7 days cache (offline access)
├─ Occupancy: 5 minute cache (with background refresh)
├─ User session: 30 minute cache (auto-logout after)
└─ Allocations: Real-time (no cache, always fresh)
```

### Battery & Data Saving

```
LOW-BATTERY MODE:
├─ Trigger: <20% battery
├─ Actions:
│  ├─ Disable real-time updates (every 5 min instead)
│  ├─ Reduce map detail (lower quality tiles)
│  ├─ Disable background sync (manual only)
│  └─ Dim screen (respects user settings)
└─ Message: "📱 Low battery mode enabled"

LOW-DATA MODE:
├─ Trigger: <100MB/month remaing OR 2G/3G
├─ Actions:
│  ├─ Compress images (20% quality)
│  ├─ Remove avatars/photos
│  ├─ Disable video content
│  ├─ Use text-only alerts
│  └─ Queue data for batch sync
└─ Status: Shows data saving indicator

DATA USAGE CAPS:
├─ Normal operation: ~2-5 MB/hour
├─ Map download (offline): ~20 MB per district
├─ Daily database sync: ~1-2 MB
├─ With images/video: +10 MB per day
└─ Data saver mode: <1 MB/hour
```

---

**Document Version**: 1.0  
**Purpose**: User Journey & Workflow Documentation  
**Audience**: Designers, Product Managers, QA Testers  
**Last Updated**: February 19, 2026

**Usage Notes**:
- Share with testers for scenario-based testing
- Reference for user acceptance testing (UAT)
- Use as training material for end users
- Include critical path workflows in onboarding docs
