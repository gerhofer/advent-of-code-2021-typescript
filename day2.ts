import * as fileSystem from 'fs';

function partOne(filePath: string) {
    const lines = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')

    var depth = 0;
    var horizontal = 0;
    for (let line of lines) {
        let [direction, value] = line.split(' ');
        switch (direction) {
            case 'forward':
                horizontal += parseInt(value);
                break;
            case 'down':
                depth += parseInt(value);
                break;
            case 'up':
                depth -= parseInt(value);
                break;
        }
    }

    console.log(`${depth} * ${horizontal} = ${depth * horizontal} `);
}

function partTwo(filePath: string) {
    const lines = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')

    var depth = 0;
    var horizontal = 0;
    var aim = 0;
    for (let line of lines) {
        let [direction, value] = line.split(' ');
        switch (direction) {
            case 'forward':
                horizontal += parseInt(value);
                depth += aim * parseInt(value);
                break;
            case 'down':
                aim += parseInt(value);
                break;
            case 'up':
                aim -= parseInt(value);
                break;
        }
    }

    console.log(`${depth} * ${horizontal} = ${depth * horizontal} `);
}

partOne('day2.txt');
partTwo('day2.txt');