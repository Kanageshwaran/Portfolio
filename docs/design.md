# Portfolio Site Design (Supabase-backed)

## Goals and principles
- Present academic profile with room to grow as new subjects, courses, and assignments are added.
- Keep content structured so Supabase updates automatically flow into the UI.
- Provide clear navigation and back buttons to avoid dead ends.
- Use Times New Roman for all text with responsive sizing that scales down gracefully on small screens.

## Information architecture
1. **Landing / Profile**
   - Hero section with name, portrait, short bio, and quick stats (major, graduation year).
   - CTA buttons: *Download Resume*, *Contact*, *View Academic Work*.
   - Contact strip: email, phone (optional), location, LinkedIn, Handshake.
   - Secondary cards: research highlights, extracurriculars, and featured projects (pulled from Supabase spotlight flag).
2. **Academic Work (Subject picker)**
   - Intro text explaining how subjects are organized.
   - Grid/list of subjects fetched from Supabase (sorted alphabetically, supports empty states).
   - Each subject card shows subject name, degree/level tags, and course count; clicking opens subject detail.
3. **Subject Detail (Course list)**
   - Breadcrumbs: Home → Academic Work → Subject.
   - Description block for the subject (from Supabase) plus optional GPA/credits summary.
   - Course list with course code, title, brief description, tools/technologies used, and term.
   - Each course links to a course detail view.
4. **Course Detail (Assignments)**
   - Breadcrumbs: Home → Academic Work → Subject → Course.
   - Course hero: title, code, instructor, term, and tags for tools/technologies.
   - Assignments list: title, type (lab, paper, project), date, brief description, and links (GitHub repo, demo, PDF).
   - Expandable accordion or modal for full assignment details; include “Back to course.”
5. **Assignment Detail (optional dedicated page/modal)**
   - Full description, objectives, screenshots/media, outcome, tools, and GitHub/asset links.
   - Back links to course and subject.

## Supabase data model
Use row-level security with policies allowing anonymous read-only access (or gated behind auth if needed). Suggested tables:

- `profiles`
  - `id (uuid, PK)`, `full_name`, `bio`, `headline`, `portrait_url`, `resume_url`, `contact_email`, `location`, `linkedin_url`, `handshake_url`.
- `subjects`
  - `id (uuid, PK)`, `name`, `slug`, `description`, `level` (e.g., Major/Minor/General Ed), `order_index`.
- `courses`
  - `id (uuid, PK)`, `subject_id (fk subjects.id)`, `code`, `title`, `term`, `description`, `tools` (text[]), `highlight` (bool), `order_index`.
- `assignments`
  - `id (uuid, PK)`, `course_id (fk courses.id)`, `title`, `type`, `date`, `summary`, `details`, `github_url`, `asset_url`, `order_index`.
- `activities`
  - `id (uuid, PK)`, `title`, `description`, `category` (research/club/volunteering), `links` (jsonb), `order_index`.

All list queries should order by `order_index` then name/code to maintain stable display. Index `subject_id` on `courses` and `course_id` on `assignments` for fast filters.

## Component and layout guidelines
- Typography: Times New Roman across the site; use 32–40px for hero headings, 24px for section headers, 16–18px for body. Line-height ≥ 1.5 for readability.
- Color: neutral background (#f5f5f5) with deep navy accents for headings and buttons; ample white cards with subtle shadows.
- Layout: max-width container (1200px) with responsive grid. Cards should stack in one column on mobile; navigation and breadcrumbs collapse into a top bar with back button.
- Buttons: primary (navy) and secondary (outline) styles; include back buttons in subject, course, and assignment views.
- Media: circular portrait on landing; course/assignment images optional but reserve space for them in card layout.

## Navigation and flow
- Global top nav: Home, Academic Work, Activities, Contact, Resume (download).
- Back navigation mirrors breadcrumbs and uses browser history fallback.
- Empty states: "No subjects yet," "No courses for this subject yet," "Assignments coming soon." Provide CTA to view other sections.

## Figma file structure (suggested)
- Page 1: *Design System* (color styles, typography, buttons, cards, grid, breadcrumbs, back buttons).
- Page 2: *Landing / Profile* desktop & mobile frames.
- Page 3: *Academic Work (Subjects)* desktop & mobile frames.
- Page 4: *Subject Detail (Courses)* desktop & mobile frames.
- Page 5: *Course Detail (Assignments)* desktop & mobile frames (include accordion/modal interaction).
- Page 6: *Assignment Detail* (if dedicated page) and responsive examples.
- Components: nav bar, footer, subject card, course card, assignment card, breadcrumb, back button, tag/pill, CTA buttons, empty states.

## Data-driven rendering patterns
- **Subjects page**: fetch `subjects` ordered by `order_index`, map to cards. Each card links to `/subjects/[slug]`.
- **Subject detail**: server-side fetch subject by slug; client-side fetch courses filtered by `subject_id`. Show fallback if none.
- **Course detail**: fetch course metadata; nested fetch assignments. Use progressive loading with skeletons/spinners.
- **Featured content**: allow `highlight` flag on courses to show them on the landing page featured cards.

## Future extensibility
- Add tags for difficulty or grade per course/assignment.
- Add media gallery per assignment (Supabase storage buckets for images/videos).
- Add search and filters on subjects/courses (by tool, term, type).
- Add CMS-like admin page secured by Supabase Auth to add/edit subjects, courses, and assignments.

## Delivery checklist for build phase
- Implement Supabase client with env-based project URL and anon key.
- Build reusable components matching the Figma system (cards, nav, breadcrumbs, back buttons, pills, CTA buttons, empty states).
- Implement responsive layouts per frames with Times New Roman typography.
- Wire data fetching to Supabase tables; ensure ordering and empty states match design.
- Add analytics (optional) to understand which subjects/courses are most viewed.

