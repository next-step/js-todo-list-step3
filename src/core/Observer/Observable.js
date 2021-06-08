export default class Observable {
  constructor(functionThatThrowsValues) {
    this._functionThatThrowsValues = functionThatThrowsValues
  }

  subscribe(next, error, complete) {
    if (typeof next === 'function') {
      return this._functionThatThrowsValues({
        next,
        error: error || function () {},
        complete: complete || function () {},
      })
    } else {
      return this._functionThatThrowsValues(next)
    }
  }

  map(projectionFunction) {
    return new Observable((observer) => {
      return this.subscribe({
        next(val) {
          observer.next(projectionFunction(val))
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })
    })
  }

  asyncMap(projectionFunction) {
    return new Observable((observer) => {
      return this.subscribe({
        async next(val) {
          observer.next(await projectionFunction(val))
        },
        error(e) {
          observer.error(e)
          observer.complete()
        },
        complete() {
          observer.complete()
        },
      })
    })
  }

  filter(projectionFunction) {
    return new Observable((observer) => {
      return this.subscribe({
        next(val) {
          if (projectionFunction(val)) {
            observer.next(val)
          }
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })
    })
  }

  mergeMap(anotherFunctionThatThrowsValues) {
    return new Observable((observer) => {
      return this.subscribe({
        next(val) {
          anotherFunctionThatThrowsValues(val).subscribe({
            next(val) {
              observer.next(val)
            },
            error(e) {
              observer.error(e)
            },
            complete() {
              observer.complete()
            },
          })
        },
        error(e) {
          observer.error(e)
        },
        complete() {
          observer.complete()
        },
      })
    })
  }

  static fromArray(array) {
    return new Observable((observer) => {
      array.forEach((val) => observer.next(val))
      observer.complete()
    })
  }

  static fromEvent(element, event) {
    return new Observable((observer) => {
      const handler = (e) => observer.next(e)
      element.addEventListener(event, handler)
      return () => {
        element.removeEventListener(event, handler)
      }
    })
  }

  static fromPromise(promise) {
    return new Observable((observer) => {
      promise
        .then((val) => {
          observer.next(val)
          observer.complete()
        })
        .catch((e) => {
          observer.error(val)
          observer.complete()
        })
    })
  }
}
