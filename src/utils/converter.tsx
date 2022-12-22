export function converterDate (times:number) {
    return new Date(times * 1000)
      .toLocaleDateString("ru-RU", {
        hour: 'numeric' ,
        minute: 'numeric'
      })
  }