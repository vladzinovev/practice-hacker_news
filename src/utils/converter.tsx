export function converterDate (times:number | null | undefined) {
  if(times === null || times === undefined) return ''
  else{
    return new Date(times * 1000)
      .toLocaleDateString("ru-RU", {
        hour: 'numeric' ,
        minute: 'numeric'
      })
  }
    
}