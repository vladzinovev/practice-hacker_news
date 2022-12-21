export function converterDate (times:number) {
    return new Date(times * 1000)
      .toLocaleDateString("en-US", {
        hour: 'numeric' ,
        minute: 'numeric'
      })
  }