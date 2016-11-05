var Observable = require('rx').Observable;
function test(person) {
    var source = Observable
        .interval(500 /* ms */)
        .timeInterval()
        .take(3);
    var onCompleted = function () {
        console.log('Completed');
    };
    var onNext = function (v) {
        console.log('Next: ' + v);
    };
    var subscription = source.subscribe(onNext, function (err) {
        console.log('Error: ' + err);
    }, onCompleted);
}
module.exports = {
    test: test
};
