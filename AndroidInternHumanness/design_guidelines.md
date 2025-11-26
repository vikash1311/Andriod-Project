# Design Guidelines: Audio Recording Tasks App

## Platform & Design System
- **Platform**: Android-first with Kotlin Multiplatform + Compose Multiplatform
- **Design Language**: Material Design 3 (Material You)
- **Bilingual Support**: English (primary) + Hindi (secondary/supporting text)

## Architecture Decisions

### Authentication
- **No authentication required** - This is a local-first, single-user utility app
- All data stored locally using AsyncStorage/local database
- No profile/settings screen needed for this prototype

### Navigation
- **Stack-Only Navigation** - Linear task flow
- Flow: Start → Noise Test → Task Selection → [Task Type] → Task History
- Back navigation allowed at any point
- "Task History" accessible via floating action button on Task Selection screen

## Color Palette

### Primary Colors
- **Primary**: #6200EE (Material Purple) - Action buttons, active mic button
- **Primary Variant**: #3700B3 - Header backgrounds
- **Secondary**: #03DAC6 (Teal) - Success states, validation checkboxes
- **Error**: #B00020 - Error messages, failed validations

### Neutral Colors
- **Surface**: #FFFFFF - Card backgrounds
- **Background**: #F5F5F5 - Screen backgrounds
- **On-Surface**: #000000 - Primary text
- **On-Surface Variant**: #757575 - Secondary text (Hindi translations)

### Status Colors
- **Success Green**: #4CAF50 - Noise test pass, valid recordings
- **Warning Amber**: #FF9800 - Noise test warning
- **Recording Red**: #F44336 - Active recording indicator

## Typography

### Primary Font: Roboto
- **Heading (H1)**: Roboto Medium, 24sp, Letter spacing 0
- **Heading (H2)**: Roboto Regular, 20sp
- **Body**: Roboto Regular, 16sp, Line height 24sp
- **Hindi Sub-text**: Roboto Regular, 14sp, Color: #757575
- **Button Text**: Roboto Medium, 14sp, All caps
- **Caption/Timestamp**: Roboto Regular, 12sp, Color: #9E9E9E

### Secondary Font (Hindi): Noto Sans Devanagari
- Use for Hindi text rendering for optimal readability

## Spacing System
- **xs**: 4dp
- **sm**: 8dp
- **md**: 16dp
- **lg**: 24dp
- **xl**: 32dp
- **xxl**: 48dp

## Screen Specifications

### 1. Start Screen
**Layout:**
- Content centered vertically and horizontally
- Top padding: 20% of screen height
- Background: White (#FFFFFF)

**Components:**
- **Heading**: "Let's start with a Sample Task for practice."
  - Typography: H1, color: On-Surface
  - Margin bottom: md
- **Hindi Sub-text**: "Pehele hum ek sample task karte hain."
  - Typography: Body, color: On-Surface Variant
  - Margin bottom: xl
- **Primary Button**: "Start Sample Task"
  - Background: Primary color
  - Corner radius: 8dp
  - Height: 48dp
  - Width: 280dp
  - Text: Button Text style, white

### 2. Noise Test Screen
**Layout:**
- Header: Custom with back button (left)
- Scrollable: No
- Content: Centered vertically

**Components:**
- **Decibel Meter**: 
  - Circular progress indicator (240dp diameter)
  - Range: 0-60 dB
  - Current value displayed in center (32sp, Medium)
  - Color: Primary (below 40), Warning Amber (40+)
  - Stroke width: 12dp
- **Status Text**: Below meter
  - "Good to proceed" (Success Green) or "Please move to a quieter place" (Warning Amber)
  - Typography: Body, margin top: lg
- **Start Test Button**: 
  - Fixed at bottom, margin: md
  - Full width minus 2x md padding
  - Height: 48dp

### 3. Task Selection Screen
**Layout:**
- Header: Default with title "Select Task Type"
- Floating Action Button (bottom-right): Task History icon
  - Size: 56dp, elevation: 6dp
  - Position: 16dp from bottom and right edges
  - Icon: List/History icon from Material Icons

**Components:**
- **Task Cards** (3 total):
  - Full width minus md padding on sides
  - Height: 120dp
  - Corner radius: 12dp
  - Elevation: 2dp
  - Margin bottom: md between cards
  - Card content:
    - Left: Icon (40dp, Primary color)
    - Center: Task name (H2) + brief description (Body, On-Surface Variant)
    - Right: Chevron icon (24dp)
  - Ripple effect on press

### 4. Text Reading Task Screen
**Layout:**
- Header: Default with back button
- Scrollable: Yes
- Bottom safe area inset: 80dp (for mic button)

**Components:**
- **Instruction Card**:
  - Background: Surface
  - Padding: md
  - Corner radius: 8dp
  - Margin: md
  - Text: "Read the passage aloud in your native language."
- **Text Passage Card**:
  - Background: #F5F5F5
  - Padding: md
  - Corner radius: 8dp
  - Margin: md
  - Text: Body style, selectable
- **Mic Button** (floating, centered horizontally, 24dp from bottom):
  - Size: 72dp diameter
  - Background: Error Red (when not recording), Primary (when pressed)
  - Icon: Microphone (32dp, white)
  - Shadow: shadowOffset (0, 4), shadowOpacity 0.20, shadowRadius 4
  - Animated scale on press (0.95x)
- **Recording Duration Indicator** (appears above mic when active):
  - Background: Error Red, corner radius: 16dp
  - Padding: xs (horizontal), xxs (vertical)
  - Text: "00:15" (white, caption style)
- **Error Message** (inline, below passage):
  - Typography: Caption, Error color
  - Examples: "Recording too short (min 10 s)." or "Recording too long (max 20 s)."
- **Playback Bar** (after recording):
  - Full width slider
  - Play/Pause button (left)
  - Timeline scrubber
  - Duration text (right)
- **Validation Checkboxes** (after recording):
  - 3 checkboxes stacked vertically
  - Checkbox size: 24dp
  - Text margin left: sm
  - Items:
    1. "No background noise"
    2. "No mistakes while reading"
    3. "Beech me koi galti nahi hai" (Hindi, On-Surface Variant color)
- **Action Buttons** (bottom):
  - "Record again" (Text button, left)
  - "Submit" (Filled button, right, disabled until all checkboxes checked)
  - Disabled state: Background #E0E0E0, text #9E9E9E

### 5. Image Description Task Screen
**Layout:**
- Similar to Text Reading, but with image instead of text

**Components:**
- **Image Display**:
  - Aspect ratio: 16:9
  - Width: Full width minus md padding
  - Corner radius: 12dp
  - Margin: md
- **Instruction**: Same as Text Reading
- **Mic Button**: Same press-and-hold behavior
- **Playback Controls**: Same as Text Reading
- **Submit Button**: No checkboxes required

### 6. Photo Capture Task Screen
**Layout:**
- Full-screen camera preview when active
- Form layout when photo captured

**Components:**
- **Camera Preview**: Full screen
- **Capture Button** (during camera mode):
  - Size: 80dp
  - Position: Centered horizontally, 32dp from bottom
  - Background: White with Primary border (4dp)
  - Inner circle: Primary (60dp)
- **Photo Preview** (after capture):
  - Same as Image Display above
- **Description Input**:
  - Text field OR Mic button
  - Label: "Describe the photo in your language."
  - Height: 120dp (text field) or 72dp (mic button)
- **Action Buttons**:
  - "Retake Photo" (Outlined button)
  - "Submit" (Filled button)
  - Horizontal arrangement, equal width

### 7. Task History Screen
**Layout:**
- Header: Custom with title "Task History"
- Scrollable list with stats header

**Components:**
- **Stats Header Card**:
  - Background: Primary Variant
  - Height: 80dp
  - Padding: md
  - Two columns:
    - Left: "Total Tasks" (white, caption) + count (white, H1)
    - Right: "Total Duration" (white, caption) + time (white, H1)
- **List Items**:
  - Card elevation: 1dp
  - Height: 96dp
  - Margin: sm (horizontal), xs (vertical)
  - Corner radius: 8dp
  - Layout:
    - Left: Task type icon (40dp) in colored circle
    - Center: 
      - Task type name (Body, Medium)
      - Duration + timestamp (Caption)
    - Right: Preview thumbnail (60x60dp, rounded 4dp) or text snippet

## Interaction Design

### Mic Button Behavior
- **Visual States**:
  - Default: Error Red background, microphone icon
  - Pressed: Slightly smaller (scale 0.95), Primary background, animated pulse
  - Recording: Pulsing animation (opacity 0.7-1.0, 1s cycle)
- **Audio Feedback**: Haptic feedback on press start and release
- **Duration Display**: Live counter updates every second during recording

### Validation Feedback
- **Error Messages**: Fade in with 200ms animation
- **Checkbox Selection**: Material ripple effect + checkmark animation
- **Button States**: Smooth transitions between enabled/disabled (300ms)

### Screen Transitions
- **Forward Navigation**: Slide in from right (300ms)
- **Back Navigation**: Slide out to right (300ms)
- **Modal Overlays**: Fade in with scale animation (250ms)

## Accessibility
- **Touch Targets**: Minimum 48dp x 48dp for all interactive elements
- **Color Contrast**: WCAG AA compliant (4.5:1 for normal text)
- **Content Descriptions**: All icons and images must have accessibility labels
- **Text Scaling**: Support dynamic type up to 200%
- **Screen Reader**: Proper focus order for all screens

## Assets Required
- **Icons**: Use Material Icons library
  - Microphone, Camera, Play, Pause, Check, List, Image, Text
- **Images**: Fetched from dummyjson.com API
- **Audio Files**: Stored locally in app-specific directory
- **No custom illustrations needed** - Rely on Material iconography