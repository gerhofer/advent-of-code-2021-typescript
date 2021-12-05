import * as fileSystem from 'fs';

function partTwo(filePath: string) {
    const paths = parsePaths(filePath);

    const maxX = Math.max(...paths.flatMap(path => [path.from.x, path.to.x]))+1;
    const maxY = Math.max(...paths.flatMap(path => [path.from.y, path.to.y]))+1;

    const pointOccurances : number[][] = Array.from(Array(maxX), () => new Array(maxY).fill(0));

    for (const { from, to } of paths) {
        const xDiff = Math.abs(from.x - to.x);
        const yDiff = Math.abs(from.y - to.y);
        var x = from.x;
        var y = from.y;
        for (let i = 0; i <= Math.max(xDiff, yDiff); i++) {
            pointOccurances[y][x] = pointOccurances[y][x] + 1;
            if (from.x < to.x) {
                x++;
            } else if (from.x > to.x) {
                x--;
            }

            if (from.y < to.y) {
                y++;
            } else if (from.y > to.y) {
                y--;
            }
        }
    }

    var countMultipleOccurances = 0;
    for (let x = 0; x < maxX; x++) {
        for (let y = 0; y < maxY; y++) {
            if (pointOccurances[y][x] > 1) {
                countMultipleOccurances++;
            }
        }
    }

    console.log(countMultipleOccurances)
}

function parsePaths(filePath: string): Path[] {
    return fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')
        .map(line => {
            let [from, to] = line.split('->');
            let [fromX, fromY] = from.split(',').map(nr => parseInt(nr))
            let [toX, toY] = to.split(',').map(nr => parseInt(nr))
            return {
                from: { x: fromX, y: fromY },
                to: { x: toX, y: toY }
            }
        });
}

type Path = {
    from: Point,
    to: Point
};

type Point = {
    x: number,
    y: number
};

partTwo('day5.txt');