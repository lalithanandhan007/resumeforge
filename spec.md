# ResumeForge

## Current State
Backend has user and resume management. No analytics functions exist. Frontend has auth, builder, dashboard, and templates. No stats display on homepage.

## Requested Changes (Diff)

### Add
- Backend: `incrementVisitorCount()`, `incrementUserCount()`, `incrementResumeCount()`, `getAnalytics()` functions with stable counter storage
- Frontend: Call `incrementVisitorCount()` on app/homepage load (once per session)
- Frontend: Call `incrementUserCount()` after user is created
- Frontend: Call `incrementResumeCount()` after resume is created
- Frontend: Analytics stats section on the dashboard/homepage with Total Visitors, Total Users, Total Resumes Created in a card grid layout with icons and animated numbers

### Modify
- `createResume` flow: also call `incrementResumeCount()` after success
- `createUser` flow: also call `incrementUserCount()` after success
- Dashboard component: add analytics stats cards at the top
- App.tsx: call `incrementVisitorCount()` on first load (once per session using sessionStorage)

### Remove
- Nothing

## Implementation Plan
1. Add stable analytics counters + 4 functions to main.mo
2. Regenerate backend.d.ts with analytics types
3. Add analytics stats component to dashboard with card grid
4. Wire increment calls in App load, createUser, createResume flows
