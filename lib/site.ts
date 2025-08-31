export function getSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export function getSiteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME || "Personal Blog";
}

export function getSiteDescription() {
  return process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "A minimal personal blog.";
}

export function getSiteInitials() {
  const name = getSiteName();
  const parts = name.split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map(w => w[0]).join('').toLowerCase();
  return initials || 'pb';
}

