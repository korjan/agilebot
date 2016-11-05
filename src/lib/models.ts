const schedule = (channel, schedule, message, nextOccurence) => {
    return {
      channel,
      message,
      schedule,
      nextOccurence
    }
}

module.exports = {
  schedule
}
