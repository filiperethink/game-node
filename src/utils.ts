export function getRandomIntInclusive() {
  const numbers = [0, 50, 100, 150, 200, 250, 300, 350];
  const randomNumber = Math.round(Math.random() * (7 - 0));
  const sorted = numbers[randomNumber];
  return sorted;
}
