export function ErrorsList({
  errors,
}: {
  errors: { [key: string]: string[] }
}) {
  let errorsList: string[] = []
  for (let key in errors) {
    let msg = key
    for (let error of errors[key]) {
      msg += ' ' + error
    }
    errorsList.push(msg)
  }
  return (
    <ul className={`error-messages`}>
      {errorsList.map((error: string) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  )
}
