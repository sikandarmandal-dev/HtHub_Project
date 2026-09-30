const list = (v) => Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : String(v || '').split(',').map((x) => x.trim()).filter(Boolean);
function normalizeProfile(p = {}) {
  return { qualification: p.qualification, experience: Number(p.experience), subjects: list(p.subjects), classes: list(p.classes), location: typeof p.location === 'string' ? { city: p.location } : p.location, teachingMode: p.teachingMode || 'in-person', hourlyRate: Number(p.hourlyRate ?? p.fees), availability: list(p.availability), bio: p.bio || '', profileImage: p.profileImage || '' };
}
module.exports = { normalizeProfile, list };
