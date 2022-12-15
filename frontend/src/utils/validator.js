export const validateMovie = (movieInfo) => {
  const { title, storyLine, language, releseDate, status, type, genres, tags, cast } = movieInfo;

  if (!title.trim()) return { error: "Title is missing!" }
  if (!storyLine.trim()) return { error: "Story Line is missing!" }
  if (!language.trim()) return { error: "Language is missing!" }
  if (!releseDate.trim()) return { error: "Relese Date is missing!" }
  if (!status.trim()) return { error: "Status is missing!" }
  if (!type.trim()) return { error: "Type is missing!" }

  if (!genres.length) return { error: "Genres is missing!" }
  for (let gen of genres) {
    if (!gen.trim()) return { error: "Invalid genres!" }
  }

  if (!tags.length) return { error: "Tags is missing!" }
  for (let tag of tags) {
    if (!tag.trim()) return { error: "Invalid tags!" }
  }

  if (!cast.length) return { error: "Cast & Crew are missing!" }
  for (let el of cast) {
    if (typeof el !== 'object') return { error: "Invalid cast!" }
  }
  return { error: null }
}