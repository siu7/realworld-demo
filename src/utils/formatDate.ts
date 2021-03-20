export function formatDate(dateString: string) {
  const d = new Date(dateString)
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  return `${days[d.getDay()]} ${
    months[d.getMonth()]
  } ${d.getDate()} ${d.getFullYear()}`
}
