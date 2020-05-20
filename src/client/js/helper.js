function getCounterDays(startDate){
  const today = new Date();
  const time = startDate.getTime() - today.getTime();
  const days = time / (1000 * 3600 * 24);
  return Math.ceil(days);
}

function getTrippDuration(startDate, endDate){
  const time = endDate.getTime() - startDate.getTime();
  const days = time / (1000 * 3600 * 24);
  return Math.ceil(days+1);
}
export { getCounterDays, getTrippDuration }