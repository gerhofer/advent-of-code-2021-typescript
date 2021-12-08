import * as fileSystem from 'fs';

function partTwo(filePath: string) {
    const signals = parseSignals(filePath);

    var sum = 0;
    for (let signal of signals) {
        let pattern = decodeSignal(signal.pattern);
        let value = decodeOutput(signal.output, pattern);
        sum += value;
    }

    console.log(sum);
}

function parseSignals(filePath: string): Signal[] {
    return fileSystem.readFileSync(filePath, 'utf8')
        .split('\r\n')
        .map(line => {
            let [rawPattern, rawOutput] = line.split(' | ');
            return {
                pattern: rawPattern.split(' '),
                output: rawOutput.split(' ')
            }
        });
}

function decodeSignal(pattern: string[]) : Map<string, string> {
    let shiftPattern = new Map<string, string>();
    let letters = pattern.join("").split('');
    let patternsByOccurance = getOccurances(letters);

    let onePattern = findPatternWithLength(pattern, 2).split('');
    let sevenPattern = findPatternWithLength(pattern, 3).split('');
    let fourPattern = findPatternWithLength(pattern, 4).split('');
    let eightPattern = findPatternWithLength(pattern, 7).split('');

    shiftPattern.set(sevenPattern.filter((letter) => !onePattern.includes(letter))[0], "a");
    shiftPattern.set(patternsByOccurance.get(6)!, "b");
    shiftPattern.set(onePattern.filter((letter) => !patternsByOccurance.get(9)?.includes(letter))[0], "c");
    shiftPattern.set(fourPattern.filter((letter) => !patternsByOccurance.get(6)?.includes(letter) && !onePattern.includes(letter))[0], "d");
    shiftPattern.set(patternsByOccurance.get(4)!, "e");
    shiftPattern.set(patternsByOccurance.get(9)!, "f");
    const lastLetter = eightPattern.filter((letter) => ![...shiftPattern.keys()].includes(letter))[0];
    shiftPattern.set(lastLetter, "g");

    return shiftPattern;
}

function getOccurances(letters: string[]) {
    let lettersWithOccurances: Map<string, number> = letters.reduce((occuranceMap : Map<string, number>, letter : string) => {
        let occurances = occuranceMap.get(letter) ?? 0;
        occuranceMap.set(letter, occurances + 1);
        return occuranceMap;
      }, new Map());
    let patternsByOccurance = new Map<number, string>();
    lettersWithOccurances.forEach((value, key) => patternsByOccurance.set(value, key));
    return patternsByOccurance;
}

function findPatternWithLength(pattern: string[], length: number) : string {
    return pattern.filter((it) => it.length === length)[0];
}

function decodeOutput(output: string[], pattern: Map<string, string>) : number {
    const numb = output.map((line) => decodeDigit(line, pattern)).join("");
    console.log(numb);
    return parseInt(numb);
}

function decodeDigit(digit: string, pattern: Map<string, string>) : number {
    let original = digit.split("").map((it : string) => pattern.get(it)!).sort().join("");

    console.log(original);

    switch (original) {
        case "abcefg": return 0;
        case "cf": return 1;
        case "acdeg": return 2;
        case "acdfg": return 3;
        case "bcdf": return 4;
        case "abdfg": return 5;
        case "abdefg": return 6;
        case "acf": return 7;
        case "abcdefg": return 8;
        case "abcdfg": return 9;
    }

    return -1;
}

type Signal = {
    pattern: string[],
    output: string[]
}

partTwo('day8-test.txt');