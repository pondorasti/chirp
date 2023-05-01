export const shuffleArray = <T>(_array: Array<T>): Array<T> => {
  const array = [..._array]

  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }

  return array
}
