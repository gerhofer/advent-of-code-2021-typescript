import * as fileSystem from 'fs';

function partOne(filePath: string) {
    const lines = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n');

    const gamma = Array.from(Array(lines[0].length).keys())
        .map(index => getMostCommonBit(lines, index))
        .join("");
    const epsilon = invert(gamma);

    console.log(parseInt(epsilon, 2) * parseInt(gamma, 2))
}

function partTwo(filePath: string) {
    const lines = fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n');

    let oxygenCandidates = lines;
    var idx = 0;
    while (oxygenCandidates.length > 1) {
        let bit = getMostCommonBit(oxygenCandidates, idx);
        oxygenCandidates = oxygenCandidates.filter(code => code[idx] === bit);
        idx++;
    }

    let co2Candidates = lines;
    idx = 0;
    while (co2Candidates.length > 1) {
        let bit = getMostCommonBit(co2Candidates, idx);
        co2Candidates = co2Candidates.filter(code => code[idx] !== bit);
        idx++;
    }

    console.log(parseInt(oxygenCandidates[0], 2) * parseInt(co2Candidates[0], 2));
}

function getMostCommonBit(codes: String[], idx: number): '0' | '1' {
    let occurances = [0, 0];
    codes.forEach(code => occurances[parseInt(code[idx])]++);
    if (occurances[0] > occurances[1]) {
        return '0';
    } else {
        return '1';
    }
}

function invert(code: string): string {
    return Array.from(Array(code.length).keys())
        .map(index => {
            if (code[index] === '0') {
                return '1';
            } else {
                return '0';
            }
        }).join("")
}

partOne('day3.txt');
partTwo('day3.txt');