export const todaysDate = () => {
  const dateObj = new Date();

  // get the month in this format of 04, the same for months
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
  const day = ("0" + dateObj.getDate()).slice(-2);
  const year = dateObj.getFullYear();

  const shortDate = `${year}-${month}-${day}`;

  return shortDate;
};

export const splitBet = (bet) => {
  const name = bet.bet;

  const vals = {
    wager: bet.wager,
    odds: bet.odds,
    freeBet: bet.freeBet,
    payOut: bet.payOut,
    date: new Date(bet.date),
    race: bet.race,
    outcome: bet.outcome,
  };

  return [name, vals];
};
