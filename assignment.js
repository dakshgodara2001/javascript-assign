function solution(D) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const daysOfWeekOrdered = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const result = {};
    const missingDays = [];
  
    for (let key in D) {
        const date = new Date(key);
        const dayOfWeek = daysOfWeek[date.getDay()];
    
        if (result[dayOfWeek] !== undefined) {
            result[dayOfWeek] += D[key];
        } 
        else {
            result[dayOfWeek] = D[key];
        }
    }
  
    daysOfWeek.forEach((day, index) => {
        if (result[day] === undefined) {
            missingDays.push(index);
        }
    });

    let i = 0;
    while (i < missingDays.length) {
        const index = missingDays[i];
        const prevDayIndex = index - 1;
        let nextDayIndex = index + 1;

        while (result[daysOfWeek[nextDayIndex]] === undefined) {
            nextDayIndex = nextDayIndex === 6 ? 0 : nextDayIndex + 1;
        }

        const daysBetween = ((nextDayIndex - prevDayIndex) + 7) % 7;
        const valueDifference = (result[daysOfWeek[nextDayIndex]] - result[daysOfWeek[prevDayIndex]]) / daysBetween;

        for (let j = prevDayIndex + 1; j !== nextDayIndex; j = (j === 6) ? 0 : j + 1) {
            result[daysOfWeek[j]] = result[daysOfWeek[j - 1 === -1 ? 6 : j - 1]] + valueDifference;
        }
        i += daysBetween - 1;
    }
    
    const orderedResult = {};
    daysOfWeekOrdered.forEach(day => {
        orderedResult[day] = result[day];
    });
    
    return orderedResult;
}
  
function testSolution() {
    const testCases = [
      {
        input: {
          '2020-01-01': 4,
          '2020-01-02': 4,
          '2020-01-03': 6,
          '2020-01-04': 8,
          '2020-01-05': 2,
          '2020-01-06': -6,
          '2020-01-07': 2,
          '2020-01-08': -2,
        },
        expectedOutput: {
          'Mon': -6,
          'Tue': 2,
          'Wed': 2,
          'Thu': 4,
          'Fri': 6,
          'Sat': 8,
          'Sun': 2,
        },
      },
      {
        input: {
          '2020-01-01': 6,
          '2020-01-04': 12,
          '2020-01-05': 14,
          '2020-01-06': 2,
          '2020-01-07': 4,
        },
        expectedOutput: {
          'Mon': 2,
          'Tue': 4,
          'Wed': 6,
          'Thu': 8,
          'Fri': 10,
          'Sat': 12,
          'Sun': 14,
        },
      },
    ];
  
    testCases.forEach((testCase, index) => {
      const result = solution(testCase.input);
      const isPass = JSON.stringify(result) === JSON.stringify(testCase.expectedOutput);
  
      if (isPass) {
        console.log(`Test case ${index + 1} - Passed`);
      } else {
        console.error(
          `Test case ${index + 1} - Failed. Expected ${JSON.stringify(
            testCase.expectedOutput,
          )} but got ${JSON.stringify(result)}`
        );
      }
    });
  }
  
  testSolution();