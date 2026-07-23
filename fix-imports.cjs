const fs = require('fs');
const files = [
  'src/app/admin/calls/page.tsx',
  'src/app/admin/consultations/page.tsx',
  'src/app/admin/dashboard/page.tsx',
  'src/app/admin/estimates/page.tsx',
  'src/app/admin/projects/page.tsx',
  'src/components/AtmosphericContextMenu.tsx',
  'src/components/BentoGrid.tsx',
  'src/components/Cursor.tsx',
  'src/components/DashboardDemo.tsx',
  'src/components/DeploymentCatalog.tsx',
  'src/components/EngineeringPrinciples.tsx',
  'src/components/FixedBottomBar.tsx',
  'src/components/Footer.tsx',
  'src/components/HomeClient.tsx',
  'src/components/LeadStatusActions.tsx',
  'src/components/Navbar.tsx',
  'src/components/ProductsShowcase.tsx',
  'src/components/TrustBar.tsx',
  'src/components/Workflow.tsx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/^import React from ['"]react['"];\r?\n/gm, '');
  content = content.replace(/^import React, {\s*/gm, 'import { ');
  
  // Custom fixes for unused icons
  if (f === 'src/components/BentoGrid.tsx') {
    content = content.replace(/ShieldCheck,\s*/g, '');
  }
  if (f === 'src/components/DashboardDemo.tsx') {
    content = content.replace(/Check,\s*/g, '');
    content = content.replace(/AlertCircle,\s*/g, '');
    content = content.replace(/ShieldAlert,\s*/g, '');
    content = content.replace(/ChevronRight,\s*/g, '');
  }
  if (f === 'src/components/EngineeringPrinciples.tsx') {
    content = content.replace(/Terminal,\s*/g, '');
    content = content.replace(/Sparkles,\s*/g, '');
  }
  if (f === 'src/components/FixedBottomBar.tsx') {
    content = content.replace(/ShieldCheck,\s*/g, '');
  }
  if (f === 'src/components/HomeClient.tsx') {
    content = content.replace(/Terminal,\s*/g, '');
  }
  if (f === 'src/components/Workflow.tsx') {
    content = content.replace(/ShieldCheck,\s*/g, '');
  }

  // Remove empty imports if any were left over like `import { } from 'lucide-react';`
  content = content.replace(/^import \{\s*\} from ['"].+['"];\r?\n/gm, '');

  fs.writeFileSync(f, content);
}
console.log('Done');
