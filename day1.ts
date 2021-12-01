import * as fileSystem from 'fs';

function partOne(filePath: string) {
    const depths = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')
        .map(depth => parseInt(depth))

    var numberOfIncreases = 0;
    for (let i = 0; i < depths.length - 1; i++) {
        if (depths[i] < depths[i+1]) {
            numberOfIncreases++;
        }
    }

    console.log(numberOfIncreases)
}

function partTwo(filePath: string) {
    const depths = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')
        .map(depth => parseInt(depth))

    var numberOfIncreases = 0;
    var previousSum : number | null = null;
    for (let i = 0; i < depths.length - 2; i++) {
        let slidingWindowSum = depths[i] + depths[i+1] + depths[i+2];
         if (previousSum !== null && previousSum < slidingWindowSum) {
            numberOfIncreases++;
        }
        previousSum = slidingWindowSum;
    }

    console.log(numberOfIncreases)
}

partOne('day1.txt');
partTwo('day1.txt');