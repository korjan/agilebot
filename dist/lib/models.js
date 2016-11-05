var schedule = function (channel, schedule, message, nextOccurence) {
    return {
        channel: channel,
        message: message,
        schedule: schedule,
        nextOccurence: nextOccurence
    };
};
module.exports = {
    schedule: schedule
};
