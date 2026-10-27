export const NEW_UPDATE_DAYS = 30;
const dayMilliseconds = 86400000;
const knoxvilleDate = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});

export function getKnoxvilleDay(now = new Date()) {
  const parts = Object.fromEntries(
    knoxvilleDate.formatToParts(now).map(({ type, value }) => [type, value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function getVisibleUpdates(updates, today = getKnoxvilleDay()) {
  return updates
    .filter(
      (update) =>
        update.publishedOn <= today &&
        (update.showFrom ?? update.publishedOn) <= today &&
        (!update.showUntil || today <= update.showUntil)
    )
    .toSorted((a, b) => b.publishedOn.localeCompare(a.publishedOn));
}

export function isNewUpdate(update, today = getKnoxvilleDay()) {
  // UTC subtraction counts calendar days without DST adding/removing an hour.
  const age =
    (Date.parse(`${today}T00:00:00Z`) -
      Date.parse(`${update.publishedOn}T00:00:00Z`)) /
    dayMilliseconds;
  return age >= 0 && age < NEW_UPDATE_DAYS;
}

export function formatUpdateDate(day) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  }).format(new Date(`${day}T00:00:00Z`));
}
