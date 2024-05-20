const fizzBuzz = (n: number): void => {

  if (n < 1) {
    throw new Error ('please enter a number greater than 0');
  }

  for (let i = 1; i <= n; i++) {
    const divisibleByThree: boolean = i % 3 === 0;
    const divisibleByFive: boolean = i % 5 === 0;
    const output: string = `${divisibleByThree ? 'Fizz' : ''}${divisibleByFive ? 'Buzz' : ''}` || i.toString();
    console.log(output);
  }
};

fizzBuzz(15);