function scoreTutor(tutor, student) {
  const profile = tutor.profile || tutor;
  let score = 0;
  const subjects = (student.subjects || []).map((v) => v.toLowerCase());
  const classes = (student.classes || [student.class].filter(Boolean)).map((v) => String(v).toLowerCase());
  if (subjects.some((v) => (profile.subjects || []).some((s) => s.toLowerCase() === v))) score += 35;
  if (classes.some((v) => (profile.classes || []).some((c) => c.toLowerCase() === v))) score += 25;
  const city = (student.location?.city || student.preferredLocation?.city || '').toLowerCase();
  if (city && profile.location?.city?.toLowerCase() === city) score += 20;
  const mode = student.teachingMode || student.preferredTeachingMode;
  if (mode && (profile.teachingMode === mode || profile.teachingMode === 'both' || mode === 'both')) score += 8;
  if (student.hourlyRate && profile.hourlyRate <= student.hourlyRate) score += 6;
  if (profile.verificationStatus === 'verified') score += 4;
  return score;
}
module.exports = { scoreTutor };
