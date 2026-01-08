:root {
    --primary: #0f172a;
    --accent: #25d366;
    --blue: #3b82f6;
    --text-muted: #64748b;
    --bg-light: #f8fafc;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Plus Jakarta Sans', sans-serif; background: var(--bg-light); color: var(--primary); scroll-behavior: smooth; }
.container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

/* Header */
header { padding: 20px 0; background: white; border-bottom: 1px solid #e2e8f0; sticky; top: 0; z-index: 100; }
nav { display: flex; justify-content: space-between; align-items: center; }
.logo { font-weight: 800; font-size: 1.5rem; letter-spacing: -1px; }
.logo span { color: var(--blue); }
.btn-sm { padding: 10px 20px; background: var(--primary); color: white; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 0.9rem; }

/* Hero */
.hero { padding: 80px 0; text-align: center; }
.badge { background: #dbeafe; color: var(--blue); padding: 6px 16px; border-radius: 20px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; }
.hero h1 { font-size: 3.5rem; margin: 24px 0; letter-spacing: -2px; line-height: 1.1; }
.hero p { font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 40px; }
.stats { display: flex; justify-content: center; gap: 40px; color: var(--text-muted); }

/* Steps */
.steps-info { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 80px; }
.step-card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; }
.step-card span { font-weight: 800; color: var(--blue); font-size: 1.5rem; display: block; margin-bottom: 16px; }

/* Typeform Style */
.typeform-section { padding-bottom: 100px; }
.typeform-box { background: white; padding: 48px; border-radius: 24px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); min-height: 400px; display: flex; align-items: center; }
.step { display: none; width: 100%; }
.step.active { display: block; animation: fadeIn 0.5s ease; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.step-number { color: var(--blue); font-weight: 700; margin-bottom: 12px; display: block; }
h2 { font-size: 2rem; margin-bottom: 24px; letter-spacing: -1px; }
input, select, textarea { width: 100%; padding: 16px; font-size: 1.2rem; border: none; border-bottom: 2px solid #e2e8f0; outline: none; transition: 0.3s; margin-bottom: 32px; }
input:focus { border-color: var(--blue); }

.next-btn, #submitBtn { background: var(--blue); color: white; padding: 16px 40px; border: none; border-radius: 12px; font-size: 1.1rem; font-weight: 700; cursor: pointer; }
.prev-btn { background: none; border: none; color: var(--text-muted); cursor: pointer; font-weight: 600; margin-right: 20px; }
#submitBtn { background: var(--accent); }

@media (max-width: 768px) {
    .hero h1 { font-size: 2.5rem; }
    .typeform-box { padding: 32px 20px; }
}
