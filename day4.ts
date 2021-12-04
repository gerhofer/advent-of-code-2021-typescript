import * as fileSystem from 'fs';

function partOne(filePath: string) {
    const { drawnNumbers, players } = parseBingo(filePath);

    for (const drawnNumber of drawnNumbers) {
        for (const player of players) {
            mark(player, drawnNumber);
            if (hasWon(player)) {
                const score = getScore(player);
                console.log(`${drawnNumber} * ${score} = ${drawnNumber * score}`);
                return;
            }
        }
    }
}

function partTwo(filePath: string) {
    const { drawnNumbers, players } = parseBingo(filePath);
    const playersWhoWon: BingoCard[] = [];

    for (const drawnNumber of drawnNumbers) {
        for (const player of players.filter(player => !playersWhoWon.includes(player))) {
            mark(player, drawnNumber);
            if (hasWon(player)) {
                playersWhoWon.push(player);
                if (playersWhoWon.length == players.length) {
                    const score = getScore(player);
                    console.log(`${drawnNumber} * ${score} = ${drawnNumber * score}`);
                }
            }
        }
    }
}

function mark(player: BingoCard, toMark: number) {
    player.flat().forEach(cell => {
        if (cell.value === toMark) {
            cell.marked = true;
        }
    })
}

function hasWon(player: BingoCard): boolean {
    const anyRowCompleted = player.some(row => row.every(cell => cell.marked))
    const anyColumnCompleted = Array.from(Array(5).keys())
        .some(columnIdx => player.map(player => player[columnIdx]).every(cell => cell.marked))
    return anyRowCompleted || anyColumnCompleted;
}

function getScore(player: BingoCard): number {
    return player.flat()
        .filter(cell => !cell.marked)
        .reduce((a, b) => a + b.value, 0);
}

function parseBingo(filePath: string): ParsedInput {
    const [drawnNumbers, ...bingoFields] = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n\r\n');
    return {
        drawnNumbers: drawnNumbers.split(",").map(number => parseInt(number)),
        players: bingoFields
            .map(player =>
                player
                    .split("\r\n")
                    .map(
                        row => row.trim().split(/\s+/)
                            .map(element => {
                                return {
                                    value: parseInt(element),
                                    marked: false
                                };
                            })
                    )

            )
    }
}

function printBingo(player: BingoCard) {
    let output = "";
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            output += `${player[i][j].value}(${player[i][j].marked ? 'X' : ' '}) `;
        }
        output += "\n";
    }
    console.log(output);
}

type ParsedInput = {
    drawnNumbers: number[];
    players: BingoCard[];
};

type BingoCell = {
    value: number;
    marked: boolean;
}

type BingoCard = BingoCell[][];

partOne('day4.txt');
partTwo('day4.txt');