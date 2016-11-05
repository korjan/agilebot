const Observable = require('rx').Observable;

function test(person: string) {
    const source = Observable
      .interval(500 /* ms */)
      .timeInterval()
      .take(3);

    const onCompleted = () => {
      console.log('Completed');
    }

    const onNext = (v) => {
        console.log('Next: ' + v);
    }

    const subscription = source.subscribe(
      onNext,
      (err) => {
          console.log('Error: ' + err);
      },
      onCompleted
    );
}

module.exports = {
  test
}
