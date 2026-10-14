import os
import re
import subprocess
import io
import markdown
import pypdf
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors

DOC_PATH = "COMPLETE_PROJECT_DOCUMENTATION.md"
HTML_OUTPUT = "complete_project_documentation.html"
RAW_PDF_OUTPUT = "complete_project_documentation_raw.pdf"
FINAL_PDF_OUTPUT = "Skill_Link_Complete_Documentation.pdf"

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
if not os.path.exists(EDGE_PATH):
    EDGE_PATH = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

print(f"Using browser at: {EDGE_PATH}")

def read_and_clean_markdown():
    with open(DOC_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Remove the redundant top header and metadata block since we have a dedicated executive cover page
    content = re.sub(
        r"^#\s+Skill Link.*?\n---\s*\n",
        "",
        content,
        flags=re.DOTALL
    )

    # 2. Ensure blank line before tables so Python-Markdown parses them as tables
    lines = content.split("\n")
    processed_lines = []
    for i, line in enumerate(lines):
        if line.strip().startswith("|") and i > 0 and not lines[i-1].strip().startswith("|") and lines[i-1].strip() != "":
            processed_lines.append("")
        processed_lines.append(line)
    content = "\n".join(processed_lines)

    return content

def get_optimized_arch_mermaid():
    return """graph TB
    subgraph Client Tier [Frontend Layer — React 19 + TypeScript + Vite]
        UI_Landing[Master 3D Landing Page]
        UI_Student[Student Portal — 16 Views]
        UI_Recruiter[Recruiter Portal — 8 Views]
        Canvas3D[Three.js WebGL Journey Canvas]
        Router[React Router DOM v7]
        AuthCtx[Auth Context & JWT Token Storage]
        ToastCtx[Toast Notification Context]
        ApiClient[Typed API Client with Offline Fallback]
        UI_Landing & UI_Student & UI_Recruiter --> Router
        Router --> AuthCtx & ToastCtx
        AuthCtx & ToastCtx --> ApiClient
    end

    subgraph Gateway Tier [API Gateway & Reverse Proxy]
        ViteProxy[Vite Dev Server Proxy :5173]
        CORS[FastAPI CORS Middleware]
        ViteProxy --> CORS
    end

    subgraph Backend Tier [Application Layer — FastAPI & Python 3.13]
        subgraph Auth_Module [Identity & Profiles]
            AuthRouter[Auth & RBAC Router]
            StudentRouter[Student Profiles Router]
            RecruiterRouter[Recruiter Pipeline Router]
        end

        subgraph Career_Module [Career & Matching]
            CareerRouter[Careers & Gaps Router]
            RoadmapRouter[Dynamic Roadmaps Router]
            JobRouter[Jobs & Matching Router]
            AppRouter[Applications Router]
        end

        subgraph AI_Module [AI Diagnostics & Mentorship]
            ResumeRouter[Resume Diagnostics Router]
            InterviewRouter[Mock Interviews Router]
            AssistantRouter[Grounded Assistant Router]
            AnalyticsRouter[Market Trends Router]
        end

        subgraph Services [Core AI Engines & Business Services]
            CI_Service[CareerIntelligenceService]
            ME_Engine[JobMatchingEngine]
            AI_Service[Resume NLP & Interview Evaluators]
            RM_Service[Roadmap & Assistant Services]
        end
    end

    subgraph Data Tier [Persistence Layer]
        SQLAlchemy[SQLAlchemy 2.0 ORM Engine]
        Alembic[Alembic Migrations Engine]
        SQLite[(Local SQLite: careerbridge.db)]
        PostgreSQL[(Production PostgreSQL)]
        SQLAlchemy --> SQLite & PostgreSQL
    end

    ApiClient --> ViteProxy
    CORS --> Auth_Module & Career_Module & AI_Module
    Career_Module --> CI_Service & ME_Engine
    AI_Module --> AI_Service & RM_Service
    Services --> SQLAlchemy
    Alembic -.-> SQLAlchemy"""

def get_optimized_erd_mermaid():
    return """erDiagram
    USERS {
        int id PK
        string email UK
        string hashed_password
        enum role
        boolean is_active
        datetime created_at
    }
    STUDENT_PROFILES {
        int id PK
        int user_id FK
        string full_name
        string university
        string degree
        float readiness_score
    }
    RECRUITER_PROFILES {
        int id PK
        int user_id FK
        int company_id FK
        string full_name
        string job_title
    }
    COMPANIES {
        int id PK
        string name UK
        string industry
        string location
        boolean is_verified
    }
    SKILLS {
        int id PK
        string name UK
        string category
    }
    STUDENT_SKILLS {
        int id PK
        int student_id FK
        int skill_id FK
        int proficiency
        boolean is_verified
    }
    CAREER_ROLES {
        int id PK
        string title
        string slug UK
        string category
    }
    ROLE_SKILL_REQUIREMENTS {
        int id PK
        int role_id FK
        int skill_id FK
        int required_proficiency
        float weight
    }
    ROADMAPS {
        int id PK
        int student_id FK
        string target_role
        int progress_percent
    }
    ROADMAP_MILESTONES {
        int id PK
        int roadmap_id FK
        int step_number
        string status
    }
    JOBS {
        int id PK
        int recruiter_id FK
        string title
        string workplace_type
        boolean is_active
    }
    APPLICATIONS {
        int id PK
        int job_id FK
        int student_id FK
        enum status
        datetime applied_at
    }
    INTERVIEW_SESSIONS {
        int id PK
        int student_id FK
        string target_role
        float overall_score
    }
    INTERVIEW_QUESTIONS {
        int id PK
        int session_id FK
        float score
    }
    ASSISTANT_CONVERSATIONS {
        int id PK
        int user_id FK
        string title
    }
    ASSISTANT_MESSAGES {
        int id PK
        int conversation_id FK
        string sender
    }

    USERS ||--o| STUDENT_PROFILES : "has"
    USERS ||--o| RECRUITER_PROFILES : "has"
    USERS ||--o{ ASSISTANT_CONVERSATIONS : "initiates"

    RECRUITER_PROFILES }o--|| COMPANIES : "employed by"
    RECRUITER_PROFILES ||--o{ JOBS : "posts"

    STUDENT_PROFILES ||--o{ STUDENT_SKILLS : "holds"
    STUDENT_PROFILES ||--o{ ROADMAPS : "follows"
    STUDENT_PROFILES ||--o{ APPLICATIONS : "submits"
    STUDENT_PROFILES ||--o{ INTERVIEW_SESSIONS : "attends"

    SKILLS ||--o{ STUDENT_SKILLS : "master of"
    SKILLS ||--o{ ROLE_SKILL_REQUIREMENTS : "governs"
    CAREER_ROLES ||--o{ ROLE_SKILL_REQUIREMENTS : "specifies"

    ROADMAPS ||--o{ ROADMAP_MILESTONES : "contains"
    JOBS ||--o{ APPLICATIONS : "receives"
    INTERVIEW_SESSIONS ||--o{ INTERVIEW_QUESTIONS : "evaluates"
    ASSISTANT_CONVERSATIONS ||--o{ ASSISTANT_MESSAGES : "stores" """

def process_markdown_to_html(md_content):
    # Separate mermaid blocks
    mermaid_blocks = []
    def save_mermaid(match):
        idx = len(mermaid_blocks)
        mermaid_code = match.group(1).strip()
        mermaid_blocks.append(mermaid_code)
        return f"\n\n<!-- MERMAID_BLOCK_{idx} -->\n\n"

    content_clean = re.sub(r"```mermaid\s*\n(.*?)\n```", save_mermaid, md_content, flags=re.DOTALL)

    # Convert markdown to html using python-markdown with extensions
    md_extensions = [
        'extra',
        'tables',
        'fenced_code',
        'codehilite',
        'toc',
        'sane_lists',
    ]
    html_body = markdown.markdown(content_clean, extensions=md_extensions)

    # Restore mermaid blocks with optimized print layouts
    for idx, code in enumerate(mermaid_blocks):
        placeholder = f"<!-- MERMAID_BLOCK_{idx} -->"
        
        if "erDiagram" in code:
            title = "Entity Relationship Diagram — 15 Relational Tables & Schema Cardinality"
            diagram_code = get_optimized_erd_mermaid()
            card_class = "mermaid-card erd-card"
        else:
            title = "High-Level System Architecture Diagram — 4-Tier Full-Stack Decomposition"
            diagram_code = get_optimized_arch_mermaid()
            card_class = "mermaid-card arch-card"

        escaped_code = diagram_code.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")

        mermaid_html = f'''
        <div class="{card_class}">
            <div class="mermaid-header">{title}</div>
            <div class="mermaid">{escaped_code}</div>
        </div>
        '''
        html_body = html_body.replace(f"<p>{placeholder}</p>", mermaid_html)
        html_body = html_body.replace(placeholder, mermaid_html)

    # Style Table of Contents specifically
    html_body = re.sub(
        r'<h2 id="table-of-contents">Table of Contents</h2>\s*<ol>',
        r'<div class="toc-container"><h2 class="toc-title">Table of Contents</h2><ol class="toc-list">',
        html_body
    )
    # Close the toc container before the next h2
    html_body = re.sub(
        r'(<ol class="toc-list">.*?</ol>)\s*(<h2)',
        r'\1</div>\2',
        html_body,
        flags=re.DOTALL
    )

    # Build full HTML template with KaTeX math rendering
    html_template = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Skill Link — Complete Architecture, Design, and UI Specification</title>
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@500;600;700;800&display=swap" rel="stylesheet">
    
    <!-- KaTeX CDN for mathematical formulas -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {{delimiters: [{{left: '$$', right: '$$', display: true}}, {{left: '$', right: '$', display: false}}]}});"></script>

    <!-- Mermaid CDN -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <script>
        mermaid.initialize({{
            startOnLoad: true,
            theme: 'base',
            themeVariables: {{
                fontFamily: 'Inter, -apple-system, sans-serif',
                fontSize: '11px',
                primaryColor: '#e0e7ff',
                primaryTextColor: '#0f172a',
                primaryBorderColor: '#6366f1',
                lineColor: '#6366f1',
                secondaryColor: '#f8fafc',
                tertiaryColor: '#ffffff',
                clusterBkg: '#f8fafc',
                clusterBorder: '#cbd5e1'
            }},
            flowchart: {{
                curve: 'basis',
                htmlLabels: true,
                rankSpacing: 25,
                nodeSpacing: 18
            }},
            er: {{
                useMaxWidth: true,
                fontSize: 10
            }}
        }});
    </script>

    <style>
        /* ================= PAGE SETUP ================= */
        @page {{
            size: A4 portrait;
            margin: 18mm 15mm 18mm 15mm;
        }}

        * {{
            box-sizing: border-box;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }}

        body {{
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            font-size: 9.5pt;
            line-height: 1.55;
            color: #1e293b;
            background-color: #ffffff;
            margin: 0;
            padding: 0;
        }}

        /* ================= COVER PAGE ================= */
        .cover-page {{
            page-break-after: always;
            break-after: page;
            height: 252mm;
            max-height: 252mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10mm 6mm 4mm 6mm;
            box-sizing: border-box;
            overflow: hidden;
        }}

        .cover-top-accent {{
            height: 5px;
            background: linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%);
            border-radius: 3px;
            margin-bottom: 18mm;
        }}

        .cover-brand {{
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 10mm;
        }}

        .cover-logo-icon {{
            width: 42px;
            height: 42px;
            background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
            border-radius: 9px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #ffffff;
            font-weight: 800;
            font-size: 19px;
            box-shadow: 0 4px 10px rgba(99, 102, 241, 0.35);
        }}

        .cover-logo-text {{
            font-family: 'Outfit', sans-serif;
            font-size: 20pt;
            font-weight: 700;
            color: #0f172a;
            letter-spacing: -0.5px;
        }}

        .cover-logo-badge {{
            background: #ede9fe;
            color: #6d28d9;
            font-size: 8pt;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}

        .cover-title {{
            font-family: 'Outfit', sans-serif;
            font-size: 26pt;
            font-weight: 800;
            color: #0f172a;
            line-height: 1.2;
            letter-spacing: -0.7px;
            margin: 0 0 6mm 0;
        }}

        .cover-subtitle {{
            font-size: 12pt;
            color: #475569;
            font-weight: 500;
            line-height: 1.5;
            margin-bottom: 4mm;
        }}

        .cover-tagline {{
            font-size: 10.5pt;
            font-style: italic;
            color: #6366f1;
            font-weight: 600;
            margin-bottom: 12mm;
        }}

        .cover-pills {{
            display: flex;
            flex-wrap: wrap;
            gap: 7px;
            margin-bottom: 16mm;
        }}

        .cover-pill {{
            background: #f1f5f9;
            color: #334155;
            border: 1px solid #e2e8f0;
            font-size: 8pt;
            font-weight: 600;
            padding: 4px 10px;
            border-radius: 5px;
        }}

        .cover-pill.highlight {{
            background: #eef2ff;
            color: #4338ca;
            border-color: #c7d2fe;
        }}

        .cover-meta-grid {{
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 14px 18px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px 20px;
            margin-bottom: 10mm;
        }}

        .cover-meta-item {{
            display: flex;
            flex-direction: column;
        }}

        .cover-meta-label {{
            font-size: 7pt;
            text-transform: uppercase;
            font-weight: 600;
            color: #64748b;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
        }}

        .cover-meta-value {{
            font-size: 9pt;
            font-weight: 600;
            color: #0f172a;
        }}

        .cover-footer {{
            border-top: 1px solid #e2e8f0;
            padding-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 7.5pt;
            color: #64748b;
        }}

        /* ================= TABLE OF CONTENTS ================= */
        .toc-container {{
            page-break-after: always;
            break-after: page;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 16px 20px;
            margin: 0 0 20px 0;
        }}

        .toc-title {{
            font-family: 'Outfit', sans-serif;
            font-size: 14pt;
            font-weight: 700;
            color: #0f172a;
            border-bottom: 2px solid #6366f1;
            padding-bottom: 6px;
            margin-top: 0;
            margin-bottom: 14px;
        }}

        .toc-list {{
            padding-left: 18px;
            margin: 0;
            columns: 2;
            column-gap: 24px;
        }}

        .toc-list > li {{
            font-size: 8.5pt;
            font-weight: 600;
            margin-bottom: 7px;
            break-inside: avoid;
        }}

        .toc-list > li > a {{
            color: #1e293b;
            text-decoration: none;
        }}

        .toc-list ul {{
            padding-left: 14px;
            margin: 3px 0 6px 0;
            columns: 1;
        }}

        .toc-list ul li {{
            font-size: 8pt;
            font-weight: 400;
            margin-bottom: 3px;
        }}

        .toc-list ul li a {{
            color: #475569;
            text-decoration: none;
        }}

        /* ================= HEADINGS ================= */
        h1, h2, h3, h4, h5, h6 {{
            font-family: 'Outfit', sans-serif;
            color: #0f172a;
            font-weight: 700;
            margin-top: 1.6em;
            margin-bottom: 0.5em;
            page-break-after: avoid;
            break-after: avoid;
        }}

        h1 {{
            font-size: 18pt;
            border-bottom: 1.5px solid #e2e8f0;
            padding-bottom: 6px;
            letter-spacing: -0.4px;
        }}

        /* Major chapters start on fresh pages */
        h2 {{
            font-size: 14pt;
            color: #0f172a;
            border-bottom: 1.5px solid #cbd5e1;
            padding-bottom: 5px;
            margin-top: 2em;
            page-break-before: always;
            break-before: page;
            letter-spacing: -0.2px;
        }}

        /* Subsections */
        h3 {{
            font-size: 11.5pt;
            color: #1e293b;
            margin-top: 1.3em;
            letter-spacing: -0.1px;
        }}

        h4 {{
            font-size: 10pt;
            color: #334155;
            font-weight: 600;
            margin-top: 1.1em;
        }}

        /* ================= PARAGRAPHS & LISTS ================= */
        p {{
            margin-top: 0;
            margin-bottom: 0.75em;
            text-align: justify;
        }}

        ul, ol {{
            margin-top: 0;
            margin-bottom: 0.85em;
            padding-left: 20px;
        }}

        li {{
            margin-bottom: 0.3em;
        }}

        li > p {{
            margin-bottom: 0.2em;
        }}

        /* ================= BLOCKQUOTES & CALLOUTS ================= */
        blockquote {{
            margin: 12px 0;
            padding: 8px 14px;
            background: #f8fafc;
            border-left: 3.5px solid #6366f1;
            border-radius: 0 6px 6px 0;
            color: #334155;
            font-size: 9pt;
            page-break-inside: avoid;
            break-inside: avoid;
        }}

        blockquote p {{
            margin-bottom: 0.3em;
        }}

        blockquote p:last-child {{
            margin-bottom: 0;
        }}

        /* ================= TABLES ================= */
        table {{
            width: 100%;
            border-collapse: collapse;
            margin: 12px 0 16px 0;
            font-size: 8pt;
            page-break-inside: auto;
            border: 1px solid #cbd5e1;
            border-radius: 5px;
            overflow: hidden;
        }}

        thead {{
            display: table-header-group;
        }}

        tr {{
            page-break-inside: avoid;
            break-inside: avoid;
        }}

        th {{
            background: #f1f5f9;
            color: #0f172a;
            font-weight: 700;
            text-align: left;
            padding: 7px 9px;
            border: 1px solid #cbd5e1;
            font-family: 'Outfit', sans-serif;
            font-size: 8pt;
            letter-spacing: 0.1px;
        }}

        td {{
            padding: 6px 9px;
            border: 1px solid #e2e8f0;
            color: #334155;
            vertical-align: top;
            word-break: break-word;
        }}

        tbody tr:nth-child(even) {{
            background: #f8fafc;
        }}

        /* ================= CODE & ASCII ART ================= */
        pre {{
            background: #0f172a;
            color: #e2e8f0;
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 7.4pt;
            line-height: 1.4;
            padding: 10px 12px;
            border-radius: 5px;
            border: 1px solid #1e293b;
            overflow-x: auto;
            margin: 10px 0;
            page-break-inside: avoid;
            break-inside: avoid;
            white-space: pre;
        }}

        code {{
            font-family: 'Fira Code', 'Consolas', monospace;
            font-size: 8pt;
            background: #f1f5f9;
            color: #4338ca;
            padding: 1px 4px;
            border-radius: 3px;
            border: 1px solid #e2e8f0;
        }}

        pre code {{
            background: transparent;
            color: inherit;
            padding: 0;
            border: none;
            font-size: inherit;
        }}

        /* ================= MERMAID DIAGRAMS ================= */
        .mermaid-card {{
            background: #ffffff;
            border: 1px solid #cbd5e1;
            border-radius: 7px;
            padding: 12px 14px;
            margin: 16px 0;
            page-break-inside: avoid;
            break-inside: avoid;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
            text-align: center;
        }}

        .mermaid-header {{
            font-family: 'Outfit', sans-serif;
            font-size: 8pt;
            font-weight: 700;
            color: #475569;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 4px;
        }}

        .mermaid {{
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: visible;
        }}

        .mermaid svg {{
            max-width: 100% !important;
            height: auto !important;
        }}

        /* Links */
        a {{
            color: #4f46e5;
            text-decoration: none;
        }}

        hr {{
            border: none;
            border-top: 1px solid #e2e8f0;
            margin: 18px 0;
        }}
    </style>
</head>
<body>

    <!-- EXECUTIVE COVER PAGE (PAGE 1) -->
    <div class="cover-page">
        <div>
            <div class="cover-top-accent"></div>
            <div class="cover-brand">
                <div class="cover-logo-icon">CB</div>
                <div class="cover-logo-text">Skill Link</div>
                <span class="cover-logo-badge">Enterprise Edition</span>
            </div>
            
            <h1 class="cover-title">Complete Architecture, Design, & UI Specification</h1>
            <div class="cover-subtitle">AI-Powered Career Intelligence, Educational Guidance, and Full-Cycle Recruitment Ecosystem</div>
            <div class="cover-tagline">"Bridge Your Skills. Build Your Tomorrow."</div>

            <div class="cover-pills">
                <span class="cover-pill highlight">FastAPI v1 Architecture</span>
                <span class="cover-pill highlight">React 19 + TypeScript</span>
                <span class="cover-pill highlight">Three.js 3D WebGL Canvas</span>
                <span class="cover-pill highlight">Deterministic 70/30 Match Engine</span>
                <span class="cover-pill">SQLAlchemy 2.0 ORM</span>
                <span class="cover-pill">15 Relational Entities</span>
                <span class="cover-pill">100% Offline AI Intelligence</span>
                <span class="cover-pill">17/17 Automated Tests Passing</span>
            </div>
        </div>

        <div>
            <div class="cover-meta-grid">
                <div class="cover-meta-item">
                    <span class="cover-meta-label">Course / Project Context</span>
                    <span class="cover-meta-value">AI Assisted Coding — Final Capstone Project</span>
                </div>
                <div class="cover-meta-item">
                    <span class="cover-meta-label">Document Release Version</span>
                    <span class="cover-meta-value">Version 2.0.0 (Production Release)</span>
                </div>
                <div class="cover-meta-item">
                    <span class="cover-meta-label">Release Date</span>
                    <span class="cover-meta-value">October 2026</span>
                </div>
                <div class="cover-meta-item">
                    <span class="cover-meta-label">Target Architecture</span>
                    <span class="cover-meta-value">Full-Stack Enterprise Web Application</span>
                </div>
            </div>

            <div class="cover-footer">
                <span>Skill Link Platform Documentation</span>
                <span>Confidential & Academic Release</span>
            </div>
        </div>
    </div>

    <!-- DOCUMENT CONTENT -->
    <div class="document-content">
        {html_body}
    </div>

</body>
</html>
"""
    return html_template

def convert_html_to_raw_pdf(html_file, raw_pdf_file):
    html_abs = os.path.abspath(html_file)
    pdf_abs = os.path.abspath(raw_pdf_file)
    
    cmd = [
        EDGE_PATH,
        "--headless=new",
        "--disable-gpu",
        "--no-sandbox",
        "--run-all-compositor-stages-before-draw",
        "--virtual-time-budget=14000",
        "--no-pdf-header-footer",
        f"--print-to-pdf={pdf_abs}",
        f"file:///{html_abs.replace(os.sep, '/')}"
    ]
    print(f"Generating PDF via headless browser...")
    res = subprocess.run(cmd, capture_output=True, text=True)
    if not os.path.exists(pdf_abs) or os.path.getsize(pdf_abs) == 0:
        raise RuntimeError(f"Browser PDF generation failed with code {res.returncode}: {res.stderr}")
    print(f"Raw PDF successfully created: {pdf_abs} ({os.path.getsize(pdf_abs)} bytes)")
    return pdf_abs

def add_header_footer_page_numbers(raw_pdf_path, final_pdf_path):
    print("Stamping running headers and footers with page numbers...")
    reader = pypdf.PdfReader(raw_pdf_path)
    writer = pypdf.PdfWriter()
    total_pages = len(reader.pages)
    print(f"Total document pages: {total_pages}")

    for idx, page in enumerate(reader.pages):
        page_num = idx + 1
        
        # Cover page (Page 1) has no headers or footers
        if page_num == 1:
            writer.add_page(page)
            continue

        # Create overlay canvas with ReportLab
        packet = io.BytesIO()
        c = canvas.Canvas(packet, pagesize=A4)
        width, height = A4

        # Page 2 is Table of Contents: no header rule, only footer
        is_toc_page = (page_num == 2)

        if not is_toc_page:
            # Header styling
            c.saveState()
            c.setFont("Helvetica-Bold", 7.5)
            c.setFillColor(colors.HexColor("#64748b"))
            c.drawString(42, height - 30, "SKILL LINK")
            c.setFont("Helvetica", 7.5)
            c.drawString(130, height - 30, "— Complete Architecture, Design, and UI Specification")
            
            # Subtle header rule
            c.setStrokeColor(colors.HexColor("#e2e8f0"))
            c.setLineWidth(0.6)
            c.line(42, height - 35, width - 42, height - 35)
            c.restoreState()

        # Footer styling
        c.saveState()
        c.setStrokeColor(colors.HexColor("#e2e8f0"))
        c.setLineWidth(0.6)
        c.line(42, 38, width - 42, 38)

        c.setFont("Helvetica", 7.5)
        c.setFillColor(colors.HexColor("#64748b"))
        if is_toc_page:
            c.drawString(42, 26, "Skill Link • Table of Contents & Executive Overview")
        else:
            c.drawString(42, 26, "AI Assisted Coding Capstone Project • October 2026")

        # Page number on right
        page_str = f"Page {page_num} of {total_pages}"
        c.drawRightString(width - 42, 26, page_str)
        c.restoreState()

        c.save()
        packet.seek(0)

        # Merge overlay onto page
        overlay_pdf = pypdf.PdfReader(packet)
        overlay_page = overlay_pdf.pages[0]
        page.merge_page(overlay_page)
        writer.add_page(page)

    with open(final_pdf_path, "wb") as f_out:
        writer.write(f_out)

    print(f"Final PDF stamped and written: {final_pdf_path} ({os.path.getsize(final_pdf_path)} bytes)")

def main():
    print("Step 1: Reading and cleaning Markdown documentation...")
    raw_md = read_and_clean_markdown()
    print(f"Read {len(raw_md)} characters.")

    print("Step 2: Processing Markdown to HTML with executive styling...")
    html_content = process_markdown_to_html(raw_md)
    with open(HTML_OUTPUT, "w", encoding="utf-8") as f:
        f.write(html_content)
    print(f"HTML written to {HTML_OUTPUT} ({len(html_content)} characters)")

    print("Step 3: Rendering HTML to Raw PDF using headless Edge/Chrome...")
    raw_pdf = convert_html_to_raw_pdf(HTML_OUTPUT, RAW_PDF_OUTPUT)

    print("Step 4: Overlaying headers, footers, and page numbers...")
    add_header_footer_page_numbers(raw_pdf, FINAL_PDF_OUTPUT)

    print("\nSUCCESS! Complete document PDF successfully generated at:")
    print(os.path.abspath(FINAL_PDF_OUTPUT))

if __name__ == "__main__":
    main()
