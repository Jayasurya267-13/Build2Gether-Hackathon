# Emergency Shelter Management System - Component & Navigation Reference Guide

## Quick Component Specifications

### Color Codes & Aliases

| Color Name | Hex Value | Light Theme | Dark Theme | Usage |
|-----------|----------|------------|-----------|-------|
| Primary | #1976D2 | Button, Links | Same | Main actions, headings |
| Primary Light | #42A5F5 | Hover, Focus | Same | Hover states, lighter overlays |
| Primary Dark | #1565C0 | Pressed, Active | Same | Active buttons, dark overlays |
| Success | #4CAF50 | ✓ Safe, Green bars | Same | Safe occupancy (0-70%) |
| Warning | #FF9800 | ⚠ Caution, Yellow bars | Same | Caution occupancy (70-90%) |
| Danger | #f44336 | 🔴 Critical, Red bars | Same | Critical occupancy (90%+) |
| Info | #2196F3 | ℹ Messages | Same | Informational alerts |
| Background | #F5F5F5 | Light gray | #121212 | Page backgrounds |
| Surface | #FFFFFF | White | #1E1E1E | Cards, panels, dialogs |
| Border | #E0E0E0 | Dividers | #424242 | Lines between elements |
| Text Main | #212121 | Black text | #F5F5F5 | Primary text |
| Text Secondary | #757575 | Gray text | #BDBDBD | Secondary, captions |

---

## Typography Quick Reference

```
H1: 28px Bold     → Emergency alerts, critical titles
H2: 24px Bold     → Dashboard main titles
H3: 18px SemiBold → Card titles, subtitles  
H4: 14px SemiBold → Form labels, headers
Body: 14px Normal → Regular content
Caption: 12px     → Helper text, timestamps
Label: 11px Bold  → Section headers (uppercase)
```

---

## Button Specifications

### Primary Button (CTA)
```
Padding:      14px 20px
Min Width:    120px
Min Height:   48dp
Background:   #1976D2
Text Color:   #FFFFFF
Border:       None
Border-Radius: 8px
Font Size:    14px Bold
Font Style:   UPPERCASE
Letter Spacing: 0.5px

States:
- Normal:   #1976D2 (no shadow)
- Hover:    #1565C0 + drop shadow (0 4px 12px rgba(0,0,0,0.3))
- Focus:    Border with focus ring + shadow
- Active:   Darker shade, pressed effect
- Disabled: 50% opacity, no shadow, no cursor
```

### Large Primary Button (Action Buttons)
```
Padding:      16px 24px
Min Height:   56dp
Font Size:    16px Bold
Drop Shadow:  0 4px 12px rgba(0,0,0,0.2)
```

### Secondary Button
```
Padding:      14px 20px
Background:   #F5F5F5 (light) / #2A2A2A (dark)
Border:       1px solid #E0E0E0
Text Color:   #212121 (light) / #F5F5F5 (dark)
Border-Radius: 8px

States:
- Hover:    Background #E0E0E0
- Active:   Background #D0D0D0, text darker
```

### Icon Button
```
Padding:      8px
Size:         20px-28px icons
Background:   None
Border:       None
Hover State:  10% opacity fade
```

---

## Form Elements

### Input Field / Text Box
```
Padding:        12px 14px
Height:         48dp (minimum)
Border:         1px solid #E0E0E0 (light) / #424242 (dark)
Border-Radius:  8px
Font Size:      14px
Background:     #FFFFFF (light) / #1E1E1E (dark)

Focus State:
- Border Color: #1976D2
- Box Shadow:   0 0 0 3px rgba(25, 118, 210, 0.1)

Error State:
- Border Color: #f44336
- Box Shadow:   0 0 0 3px rgba(244, 67, 54, 0.1)
- Helper Text:  Red, 12px, italic
```

### Select / Dropdown
```
Styling:    Same as text input
Arrow Icon: Right side, 16px, color: #757575
Dropdown:   Material Design dropdown menu
Max Height: 300px (scrollable beyond that)
Items:      48dp min height each
```

### Checkbox
```
Size:           18px x 18px
Accent Color:   #1976D2
Checked:        Blue fill with white checkmark
Unchecked:      Empty box, border #BDBDBD
Disabled:       Grayed out state
Touch Target:   48dp (larger touch area)

Label:
- Font Size:  14px
- Margin:     10px between box and text
- Click:      Entire label is clickable area
```

### Toggle Switch
```
Width:          40px
Height:         24px
Track Color:    
  - Off: #BDBDBD
  - On:  #81C784
Toggle Color:
  - Off: #FFFFFF
  - On:  #1976D2
Animation:      Smooth slide (200ms)
```

### Capacity Bar (Component)
```
Height Variants:
- Normal:   12px
- Detailed: 18px
- Large:    40px

Border-Radius: 6px
Background:     #E0E0E0
Overflow:       hidden

Fill Colors:
- 0-70%:    #4CAF50 (Green)
- 70-90%:   #FF9800 (Orange)
- 90%+:     #f44336 (Red)

Animation:
- Width change: 0.3s ease
- Label shows: Current / Total (Percentage%)
```

---

## Card Component

```
Background:     #FFFFFF (light) / #1E1E1E (dark)
Border:         1px solid #E0E0E0 (light) / #424242 (dark)
Border-Radius:  8px
Padding:        12px-16px
Box Shadow:     0 4px 6px rgba(0, 0, 0, 0.1)
Elevation:      2dp (Material Design)

Variants:
- Elevated:     Higher shadow (4px 12px)
- Flat:         No shadow
- Outlined:     Visible border, no shadow
- Tonal:        Subtle background color tint

States:
- Hover:        Elevation increases, shadow grows
- Active:       Subtle highlight color
- Disabled:     50% opacity
```

---

## Badge Collection

### Service Badges
```
Display:        Inline-block
Padding:        4px 8px
Border-Radius:  4px
Font Size:      11px Bold
Background:     #F5F5F5 (light) / #2A2A2A (dark)
Border:         1px solid #E0E0E0

Examples:
- 🍽️ Food
- 🏥 Medical
- ♿ Accessible
- 🛏️ Bed Available
- 🔋 Power Available
```

### Status Badges
```
Colors:
- Active:       #4CAF50 on transparent
- Inactive:     #BDBDBD on transparent
- Warning:      #FF9800 on rgba(255,152,0,0.1)
- Critical:     #f44336 on rgba(244,67,54,0.1)

Text:
- Font Size:    11px
- Font Weight:  600
- Background:   Colored 10% opacity
- Border:       Optional colored border (1px)
```

---

## Tab Component

```
Padding:            8px 12px
Font Size:          12px Medium
Height:             Min 44dp (include padding)
Border-Radius:      0 (flush style)
Background:         Transparent
Border Bottom:      2px solid transparent

Active State:
- Border Color:     #1976D2
- Text Color:       #1976D2
- Font Weight:      600

Inactive State:
- Border Color:     transparent
- Text Color:       #757575

Hover State:
- Text Color:       #1976D2
- Slight background: 5% opacity
```

---

## Alert / Notification Styles

### Alert Container
```
Padding:        12px 15px
Border-Radius:  8px
Border Left:    4px solid (severity color)
Margin Bottom:  12px
Font Size:      12px
Line Height:    1.6
```

### Alert Types

**Critical (Red)**
```
Background:     rgba(244, 67, 54, 0.1)
Border Color:   #f44336
Text Color:     #c62828
Icon:           🚨 or ⚠️ (red)
```

**Warning (Orange)**
```
Background:     rgba(255, 152, 0, 0.1)
Border Color:   #FF9800
Text Color:     #e65100
Icon:           ⚠️ (orange)
```

**Info (Blue)**
```
Background:     rgba(33, 150, 243, 0.1)
Border Color:   #2196F3
Text Color:     #1565c0
Icon:           ℹ️ (blue)
```

**Success (Green)**
```
Background:     rgba(76, 175, 80, 0.1)
Border Color:   #4CAF50
Text Color:     #2e7d32
Icon:           ✓ (green)
```

---

## Occupancy Status Indicators

### Visual Hierarchy

**Normal Mode (64% Occupancy)**
```
Color:        #4CAF50 (Green)
Message:      "Healthy"
Action:       Monitor
Status Bar:   2/3 filled, green color
```

**Caution Mode (78% Occupancy)**
```
Color:        #FF9800 (Orange)
Message:      "Caution - Getting Full"
Action:       Monitor Closely
Status Bar:   3/4 filled, orange color
Sound Alert:  Optional beep
Notification: Fire notification to command
```

**Critical Mode (95% Occupancy)**
```
Color:        #f44336 (Red)
Message:      "🔴 AT CAPACITY - Cannot Accept"
Action:       Initiate Redistribution
Status Bar:   99% filled, red color
Sound Alert:  Loud continuous alert
Notification: Urgent notification w/ sound to command
Popup:        Modal blocking further allocations
```

---

## Navigation Patterns

### Screen Stack / Back Navigation

```
Login → [Role Selection] → Dashboard
Dashboard → Page A → Page B → Back to Dashboard
Dashboard → [Bottom Tab 2] → Page C → Back to Dashboard

Back Button:
- Shows on all screens except root dashboards
- Position: Top-left
- Always returns to previous screen
- Keyboard: ESC key triggers back
```

### Tab Navigation (Future Addition)

```
Field Responder Tabs:
[Home Map] [Nearby Shelters] [Orders] [Profile]

Shelter Admin Tabs:
[Dashboard] [Check-In] [Status] [Profile]

Command Officer Tabs:
[Map] [Alerts] [Analytics] [Profile]
```

---

## Spacing System

### Padding & Margin Increments
```
4px   - Extra small gaps
8px   - Small gaps, button padding, icon spacing
12px  - Standard gaps between elements
16px  - Medium gaps, section padding
20px  - Large gaps, content padding
24px  - Extra large gaps, modal padding
```

### Grid Layout
```
Phone Width: 400px
Column Grid: 12 columns
Gutter: 16px
Margins: 16px left/right
Content Area: 368px
```

---

## Animation Specifications

### Standard Durations
```
Fast:     150ms (interaction feedback)
Standard: 300ms (screen transitions)
Slow:     500ms (emphasis animations)
```

### Easing Functions
```
Common:   ease (cubic-bezier(0.25, 0.1, 0.25, 1))
Entrance: ease-out (cubic-bezier(0, 0, 0.2, 1))
Exit:     ease-in (cubic-bezier(0.4, 0, 1, 1))
Sharp:    cubic-bezier(0.4, 0, 0.6, 1)
```

### Common Animations
```
Button Hover:       Slight scale (1.05) + color shift
Transition In:      Fade (0.3s) + slide-up (20px)
Transition Out:     Fade (0.2s) + slide-down (20px)
Loading Spinner:    Rotate 360° (1s, infinite)
Pulse Alert:        Scale 1.0 → 1.1 → 1.0 (1.5s, infinite)
Bar Fill:           Width 0% → Target% (0.3s)
```

---

## Touch Target Sizes

### Recommended Sizes
```
Standard Button:        48dp x 48dp
Primary Action Button:  56dp x 56dp
Icon Button:            48dp x 48dp
Tab:                    Min 48dp height
List Item:              Min 56dp height
Space Between:          8dp minimum
```

### Accessibility Touch Targets
```
Minimum:    44dp x 44dp (Android)
Better:     48dp x 48dp
Best:       56dp x 56dp
For Elderly: 64dp+ recommended
```

---

## Theming Variables

### Light Theme (Default)
```
--primary:          #1976D2
--bg-light:         #F5F5F5
--surface:          #FFFFFF
--text-dark:        #212121
--text-secondary:   #757575
--border:           #E0E0E0
```

### Dark Theme (Auto-detect)
```
--primary:          #1976D2 (same)
--bg-dark:          #121212
--surface-dark:     #1E1E1E
--text-light:       #F5F5F5
--text-secondary:   #BDBDBD
--border-dark:      #424242
```

---

## Icon Library Reference

### Action Icons
```
Edit:           ✎ (pencil)
Delete:         🗑️ (trash)
Save:           💾 (floppy disk)
Cancel:         ❌ (cross)
Settings:       ⚙️ (gear)
Search:         🔍 (magnifying glass)
Filter:         ⊙ (circle with lines)
More:           ⋯ (three dots)
Back:           ← (left arrow)
Next:           → (right arrow)
Up:             ↑ (up arrow)
Down:           ↓ (down arrow)
```

### Status Icons
```
Online:         🟢 (green circle)
Offline:        🔴 (red circle)
At Capacity:    🔴 (red circle)
Available:      🟢 (green circle)
Warning:        ⚠️ (warning triangle)
Error:          ❌ (cross circle)
Success:        ✓ (checkmark)
Info:           ℹ️ (info circle)
Loading:        ⟳ (loading spinner)
```

### Feature Icons
```
Home / Map:     🏠 / 🗺️
People:         👥 / 👤
Shelter:        🏢 / 🏥
Medical:        🏥 / ⚕️
Food:           🍽️ / 🥘
Water:          💧 / 🚰
Accessibility:  ♿
Elderly:        👴 / 👵
Child:          👶 / 👧
Pregnant:       🤰
Disabled:       ♿ / 🦽
Phone:          📞 / ☎️
Message:        💬 / 📱
Export:         📥 / 📦
Location:       📍 / 🗺️
```

---

## Responsive Breakpoints

```
Phone (default):    < 600px
Tablet:             600px - 960px
Desktop:            > 960px

App Approach:
- Design for phone-first
- Test on 5.7" (typical)
- Support down to 4.5" screens (older phones)
- Tablet layout: Side-by-side when space available
```

---

## States & Interactions Quick Reference

### Form States
```
Empty:      Placeholder visible, border normal gray
Filled:     Value shown, border normal gray
Focused:    Border blue (#1976D2), shadow visible, cursor
Valid:      Border / icon green (#4CAF50)
Invalid:    Border / icon red (#f44336), error message
Disabled:   Grayed out, no interaction, no cursor
Loading:    Spinner icon, disabled state
```

### Button States
```
Enabled:    Normal background, pointer cursor
Hover:      Darker shade OR shadow increase
Pressed:    Active shade, feedback haptic
Disabled:   50% opacity, no shadow, default cursor
Focus:      Focus ring outline (3px, same color)
Active:     Darker shade persists
```

### List Item States
```
Normal:     Background surface color
Hover:      Slight background shade (5% opacity)
Selected:   Blue accent background OR left bar
Disabled:   Grayed out, text lighter
Loading:    Skeleton placeholder
Empty:      Center message "No items"
```

---

## Micro-interactions Checklist

- [ ] Button feedback on tap (color + shadow)
- [ ] Loading spinner during data fetch
- [ ] Success message after allocation
- [ ] Error message on validation failure
- [ ] Scroll-to-top animation
- [ ] Smooth capacity bar fill
- [ ] Tab switch fade animation
- [ ] Card hover elevation
- [ ] Notification toast slide-in
- [ ] Modal fade backdrop
- [ ] Keyboard open/close animation
- [ ] Pull-to-refresh spinner
- [ ] Skeleton screens while loading
- [ ] Haptic feedback on critical actions

---

## Accessibility Quick Checklist

- [ ] Color not sole indicator (use icons/patterns too)
- [ ] Text contrast ≥ 7:1 (AAA standard)
- [ ] Touch targets ≥ 48dp
- [ ] Links/buttons have visible focus state
- [ ] Form labels properly associated
- [ ] Alt text for all images
- [ ] Headings in semantic order (H1→H2→H3...)
- [ ] Skip links for navigation
- [ ] Keyboard navigation works fully
- [ ] Screen reader tested (TalkBack)
- [ ] Respects `prefers-reduced-motion`
- [ ] No flashing (> 3 per second)
- [ ] Estimated color-blind friendly
- [ ] Maximum reading level 8th grade

---

**Document Version**: 1.0  
**Quick Reference for**: Designers & Developers  
**Updated**: February 19, 2026
